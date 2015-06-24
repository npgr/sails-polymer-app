var fs = require('fs')
var jsonic = require('jsonic')

function setBody(crud, crud2, pages, value) {
	if (crud.indexOf("c") > -1 && crud2.indexOf("c") > -1) pages.body_create += value
	if (crud.indexOf("r") > -1 && crud2.indexOf("r") > -1) pages.body_display += value
	if (crud.indexOf("u") > -1 && crud2.indexOf("u") > -1) pages.body_edit += value
	if (crud.indexOf("d") > -1 && crud2.indexOf("d") > -1) pages.body_delete += value
	return pages
}

function setScript(crud, crud2, pages, value) {
	if (crud.indexOf("c") > -1 && crud2.indexOf("c") > -1) 
	{
		if (pages.script_create == '') pages.script_create = '<script>\r'
		pages.script_create += value
	}
	if (crud.indexOf("r") > -1 && crud2.indexOf("r") > -1) 
	{
		if (pages.script_display == '') pages.script_display = '<script>\r'
		pages.script_display += value
	}
	if (crud.indexOf("u") > -1 && crud2.indexOf("u") > -1)
	{
		if (pages.script_edit == '') pages.script_edit = '<script>\r'
		pages.script_edit += value
	}
	if (crud.indexOf("d") > -1 && crud2.indexOf("d") > -1)
	{
		if (pages.script_delete == '') pages.script_delete = '<script>\r'
		pages.script_delete += value
	}
	return pages
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

exports.generate = function(crud) {
// ** Crud with Polymer
	var pages = {
		body_create: '', body_display: '', body_edit: '', body_delete: '', 
		script_create: '', script_display: '', script_edit: '', script_delete: '', 
	}
	var keys = Object.keys(jsondata)
	var title = model
	if (keys.indexOf('_title') >= 0)	{
		title = jsondata._title
	}
	// title
	pages = setBody(crud, 'c', pages, '<head>\r<title>Crear '+title+'</title>\r')
	pages = setBody(crud, 'r', pages, '<head><title>Consultar '+title+'</title>\r')
	pages = setBody(crud, 'u', pages, '<head><title>Editar '+title+'</title>\r')
	pages = setBody(crud, 'd', pages, '<head><title>Borrar '+title+'</title>\r')
	//imports
	pages = setBody(crud, 'crud', pages, '<script src="/bower_components/webcomponentsjs/webcomponents.min.js"></script>\r')
	pages = setBody(crud, 'crud', pages, '<link rel="stylesheet" href="/styles/app.css">\r')
	pages = setBody(crud, 'crud', pages, '<link rel="import" href="/bower_components/paper-material/paper-material.html">\r')
	pages = setBody(crud, 'crud', pages, '<link rel="import" href="/bower_components/paper-button/paper-button.html">\r</head>\r')
	//card
	pages = setBody(crud, 'crud', pages, '<paper-material class="card" elevation="3" vertical layout>\r')
	//card title
	pages = setBody(crud, 'c', pages, '<h2 class="card_title">Crear '+title+'</h2>\r')
	pages = setBody(crud, 'r', pages, '<h2 class="card_title">Consultar '+title+'</h2>\r')
	pages = setBody(crud, 'u', pages, '<h2 class="card_title">Editar '+title+'</h2>\r')
	pages = setBody(crud, 'd', pages, '<h2 class="card_title">Borrar '+title+'</h2>\r')
	//form
	pages = setBody(crud, 'c', pages, '<form id="form" action="/'+model+'/create" method="POST">\r')
	pages = setBody(crud, 'r', pages, '<form id="form">')
	// ******   OJO se asume que keys[0] es la clave del archivo, omitiendo campos que comienzan con "_"
	var key = ''
	for (k=0; k < keys.length; k++) 
		if (keys[k].substring(0,1) != '_') {
			key = keys[k]
			k = keys.length
		}
	pages = setBody(crud, 'u', pages, '<form id="form" action="/'+model+'/update/<%='+key+'%>" method="PUT">\r')
	pages = setBody(crud, 'd', pages, '<form id="form" action="/'+model+'/destroy/<%='+key+'%>" method="DELETE">\r')
	
	pages = setBody(crud, 'crud', pages, '<div vertical layout>\r')
	
	var type= ''
	for (i=0; i < keys.length; i++)
	{
	  if (keys[i].substring(0,1) != '_')
	  {
		// Card Line
		pages = setBody(crud, 'crud', pages, '<div class="card_line">\r')
		// field description
		pages = setBody(crud, 'crud', pages,'<label class="left_label" for="'+keys[i]+'">'+jsondata[keys[i]].description+'</label>\r')
		if (jsondata[keys[i]].enum)
		{
			// select field
			pages = setBody(crud, 'cu', pages, '<select id="'+keys[i]+'" name="'+keys[i]+'">\r')
			pages = setBody(crud, 'rd', pages, '<select id="'+keys[i]+'" name="'+keys[i]+'" disabled>\r')
			
			pages = setScript(crud, 'urd', pages, 'document.getElementById("'+keys[i]+'").value = "<%= '+keys[i]+'%>";\r')
			
			for (j=0; j<jsondata[keys[i]].enum.length; j++)
				pages = setBody(crud, 'crud', pages, '<option value="'+jsondata[keys[i]].enum[j]+'">'+jsondata[keys[i]].enumdes[j]+'</option>\r')
			
			pages = setBody(crud, 'crud', pages, '</select>\r</div>\r')
		}
		else
		{
			type = getInputType(jsondata[keys[i]].type)
			// input field
			pages = setBody(crud, 'crud', pages, '<input id="'+keys[i]+'" type="'+ type +'" name="'+keys[i]+'"')
			// input values for rud
			pages = setBody(crud, 'rud', pages, ' value="<%= '+keys[i]+'%>"')
			// maxLength
			if (jsondata[keys[i]].maxLength)
				pages = setBody(crud, 'cu', pages, ' maxlength='+jsondata[keys[i]].maxLength)
			// min 	
			if (jsondata[keys[i]].min)
				pages = setBody(crud, 'cu', pages, ' min='+jsondata[keys[i]].min)
			//max
			if (jsondata[keys[i]].max)
				pages = setBody(crud, 'cu', pages, ' max='+jsondata[keys[i]].max)
			// required
			if (jsondata[keys[i]].required)
				pages = setBody(crud, 'cu', pages, ' required')
			// DefaultTo (Fixed Value)
			if (jsondata[keys[i]].defaultsTo) 
				pages = setBody(crud, 'cu', pages, ' value="'+jsondata[keys[i]].defaultsTo+'" disabled')
			//end of input field
			pages = setBody(crud, 'rd', pages, ' disabled')
			pages = setBody(crud, 'crud', pages, '>\r</div>\r')
		}
	  } // end if field not starting with '_'
	}
	// Action Button
	pages = setBody(crud, 'c', pages, '<input id="create_btn" type="submit" value="CREAR">\r')
	pages = setBody(crud, 'r', pages, '<input id="create_btn" type="submit" value="SALIR">\r')
	pages = setBody(crud, 'u', pages, '<input id="create_btn" type="submit" value="CAMBIAR">\r')
	pages = setBody(crud, 'd', pages, '<input id="create_btn" type="submit" value="BORRAR">\r')
	//Paper Button
	pages = setBody(crud, 'c', pages, '<div class="card_line"><paper-button id="btn1" class="btn" raised>CREAR</paper-button></div>\r')
	pages = setBody(crud, 'r', pages, '<div class="card_line"><paper-button id="btn1" class="btn" raised>SALIR</paper-button></div>\r')
	pages = setBody(crud, 'u', pages, '<div class="card_line"><paper-button id="btn1" class="btn" raised>CAMBIAR</paper-button></div>\r')
	pages = setBody(crud, 'd', pages, '<div class="card_line"><paper-button id="btn1" class="btn" raised>BORRAR</paper-button></div>\r')
	
	pages = setBody(crud, 'crud', pages, '</div>\r</form>\r</paper-material>\r')
	
	pages = setBody(crud, 'crud', pages, '<script>\rdocument.getElementById("btn1").addEventListener("click", function() {\r')
	
	pages = setBody(crud, 'crud', pages, 'document.getElementById("create_btn").click();\r});\r</script>\r')
	
	// write file
	if (crud.indexOf("c") > -1)
	{
		if (pages.script_create != '') pages.script_create += '</script>' 
		fs.writeFile('views/'+model+'/new.ejs', pages.body_create+pages.script_create, function (err) {
			if (err) console.log(err);
			console.log('Created file "views/'+model+'/new.ejs"')
		})
	}
	if (crud.indexOf("r") > -1)
	{
		if (pages.script_display != '') pages.script_display += '</script>' 
		fs.writeFile('views/'+model+'/display.ejs', pages.body_display+pages.script_display, function (err) {
			if (err) console.log(err);
			console.log('Created file "views/'+model+'/display.ejs"')
		})
	}
	if (crud.indexOf("u") > -1)
	{
		if (pages.script_edit != '') pages.script_edit += '</script>' 
		fs.writeFile('views/'+model+'/edit.ejs', pages.body_edit+pages.script_edit, function (err) {
			if (err) console.log(err);
			console.log('Created file "views/'+model+'/edit.ejs"')
		})
	}
	if (crud.indexOf("d") > -1)
	{
		if (pages.script_delete != '') pages.script_delete += '</script>' 
		fs.writeFile('views/'+model+'/delete.ejs', pages.body_delete+pages.script_delete, function (err) {
			if (err) console.log(err);
			console.log('Created file "views/'+model+'/delete.ejs"')
		})
	}
}