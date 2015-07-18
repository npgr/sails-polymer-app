//var colors = require('colors');
var fs = require('fs')
var jsonic = require('jsonic')
//var format = require('string-template')
var crud1 = require('./templates/crud1')
var crud2 = require('./templates/crud2')
var crud3 = require('./templates/crud3')
var crud4 = require('./templates/crud4')
var crud5 = require('./templates/crud5/crud5')

option = process.argv[2]

switch(option) {
	case '?':
        console.log('arguments for this commando are: ')
        break;
    case 'crud1':
		//node generate crud1 Matheads
        crud(1)
        break;
	case 'crud2':
        crud(2)
        break;
	case 'crud3':
        crud(3)
        break;
	case 'crud4':
		crud(4)
	case 'crud5':
		crud(5)
    default:
        console.log('arguments for this commando are: ')
}

function get_model_par() {
	if (process.argv[3])
		return process.argv[3]
	else {
		console.log('Missing Model Name')
		return false
	}
}

function get_model(cb)
{
	//model: global variable
	model = get_model_par()
	if (model) {
		console.log('creating a create page for model '+ model)
		fs.readFile('api/models/'+model+'.js', 'utf-8', function (err, data) {
			if (err) {
				console.log(err)
				return false
			}
			else {
				var start = data.indexOf("attributes: {")
				var end = data.indexOf("};")
				data = data.substring(start+12, end-1)
				//jsondata = JSON.parse(data)
				// pending replace all //
				data = data.replace(/\//g, '')
				cb(jsonic(data))
			}
		})
	}
}

function crud(n)
{
	get_model(function(jsondat) { 
		// global variable jsondata
		jsondata = jsondat
		if (jsondata) 
		  switch(n) {
			case 1:
				// basic html crud
				crud1.generate('crud')
			break;
			case 2:
				// basic polymer crud
				crud2.generate('crud')
			break;
			case 3:
				// complete polymer crud + list
				crud3.generate('crud')	
			break;
			case 4:
				// using lodash templates
				crud4.generate('crud')
			case 5:
				// complex filter + date fields + select columns + item menu + download data
				crud5.generate('crud')
		  }  
	})
}