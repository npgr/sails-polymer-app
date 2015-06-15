//var colors = require('colors');
var fs = require('fs')
var jsonic = require('jsonic')

option = process.argv[2]

switch(option) {
	case '?':
        console.log('arguments for this commando are: ')
        break;
    case 'create':
	//node generate create Matheads
        create()
        break;
    case 'change':
        change()
        break;
	case 'list':
        list()
        break;
	case 'crud':
        crud()
        break;
    default:
        console.log('arguments for this commando are: ')
}

function getmodel() {
	if (process.argv[3])
		return process.argv[3]
	else {
		console.log('Missing Model Name')
		return false
	}
}

function getInputType(type) {
	switch(type) {
		case 'string':
			return 'text'
			break
		case 'integer':
			return 'number'
			break
		default:
			return 'text'
	}
}

function create()
{
	model = getmodel()
	if (model) {
		console.log('creating a create page for model '+ model)
		fs.readFile('api/models/'+model+'.js', 'utf-8', function (err, data) {
			if (err) console.log(err)
			  else
			  {
				var start = data.indexOf("attributes: {")
				var end = data.indexOf("};")
				data = data.substring(start+12, end-1)
				//jsondata = JSON.parse(data)
				// pending replace all //
				data = data.replace(/\//g, '');
				create_form(jsonic(data))
			  }
		})
	}
}

function create_form(jsondata) {
	var keys = Object.keys(jsondata)
	var title = model
	if (keys[0] == 'title')	
	{
		title = jsondata.title
		keys = keys.slice(1)
	}
	var form = '<head><title>Crear '+title+'</title></head>\r'
	form += '<h2>Crear '+title+'</h2>\r'
	form += '<form action="/'+model+'/create" method="POST">\r'
	var type= ''
	for (i=0; i < keys.length; i++)
	{
		form += jsondata[keys[i]].description +' '
		if (jsondata[keys[i]].enum)
		{
			form += '<select id="'+keys[i]+'" name="'+keys[i]+'">\r'
			for (j=0; j<jsondata[keys[i]].enum.length; j++)
				form += '<option value="'+jsondata[keys[i]].enum[j]+'">'+jsondata[keys[i]].enumdes[j]+'</option>\r'
			form += '</select><br><br>\r'
		}
		else
		{
			type = getInputType(jsondata[keys[i]].type)
			form += '<input id="'+keys[i]+'" type="'+ type +'" name="'+keys[i]+'"'
			if (jsondata[keys[i]].maxLength)
				form += ' maxlength='+jsondata[keys[i]].maxLength
			if (jsondata[keys[i]].min)
				form += ' min='+jsondata[keys[i]].min
			if (jsondata[keys[i]].max)
				form += ' max='+jsondata[keys[i]].max
			if (jsondata[keys[i]].required)
				form += ' required'
			if (jsondata[keys[i]].defaultsTo) 
				form += ' value="'+jsondata[keys[i]].defaultsTo+'" disabled'
			form += '><br><br>\r'
		}
	}
	form += '<input id="create_btn" type="submit" value="CREAR"></form>'
	console.log(form)	
	fs.writeFile('views/'+model+'/create.ejs', form, function (err) {
		if (err) console.log(err);
		console.log('file "views/'+model+'/crear.ejs" created')
	})
}

function change()
{
	model = getmodel()
	if (model)
		console.log('creating a create page for model '+ model)
}

function list()
{
	model = getmodel()
	if (model)
		console.log('creating a create page for model '+ model)
}

function crud()
{
	model = getmodel()
	if (model)
		console.log('creating a create page for model '+ model)
}