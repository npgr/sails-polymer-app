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
		pages.script_create += value
	if (crud.indexOf("r") > -1 && crud2.indexOf("r") > -1) 
		pages.script_display += value
	if (crud.indexOf("u") > -1 && crud2.indexOf("u") > -1)
		pages.script_edit += value
	if (crud.indexOf("d") > -1 && crud2.indexOf("d") > -1)
		pages.script_delete += value
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

function generate_controller(key) {
	// Generate new routes
	var routes =
		'/************  Routes ************/\n'+
		'"post /'+model+'/destroy/:id?": "'+model+'Controller.destroy",\n'+
		'"post /'+model+'/update/:'+key+'?": "'+model+'Controller.update",\n'+
		'"/'+model+'/exist/:'+key+'": "'+model+'Controller.exist"\n\n'
		
	var controller =
	'/********** Controller *******/\n'+
	'	exist: function(req, res, next) {\n'+
	'		var '+key+' = req.param("'+key+'")\n'
	
	if (key != 'id')
		controller += '\t\t'+model+'.findOneBy'+key+'('+key+')\n'
	 else
		controller += '\t\t'+model+'.findOne('+key+')\n'
		
	controller +=
	'			.exec(function(err, data) {\n'+
	'				if(err) res.json({ "exist": "error"})\n'+
	'				  else if (!data) res.json({ "exist": false})\n'+
	'					else res.json({ "exist": true})\n'+
	'			})\n'+
	'	},\n'+
	'	create: function(req, res, next) {\n'+
	'		var params = req.params.all();\n'+
	'		'+model+'.create(params, function(err, data) {\n'+
	'			if (err) return next(err);\n'+
	'			res.redirect("'+model+'/list")\n'+
	'		});\n'+
	'	},\n'+
	'	destroy: function(req, res, next) {\n'+
	'		var id = req.param("id")\n'
	
	if (key != 'id')
		controller +='\t\t'+model+'.findOneBy'+key+'('+key+')\n'
	 else
		controller += '\t\t'+model+'.findOne('+key+')\n'
		
	controller +=
	'				.exec(function(err, result) {\n'+
	'					if (err) res.serverError(err);\n'+
	'					if (!result) res.notFound();\n'+
	'						'+model+'.destroy(id, function (err) {\n'+
	'						if (err) return next (err);\n'+
	'						return res.redirect("'+model+'/list")\n'+
	'						//return res.json(result);\n'+
	'					});\n'+
	'				});\n'+
	'	},\n'+
	'	update: function (req, res, next) {\n'+
    '   	 var criteria = {};\n'+
    '    	criteria = _.merge({}, req.params.all(), req.body);\n'+
    '    	var '+key+' = req.param("'+key+'");\n'+
    '    	if (!'+key+') {\n'+
    '       	 return res.badRequest("No id provided.");\n'+
    '    	}\n'+
    '    	'+model+'.update('+key+', criteria, function (err, data) {\n'+
    '       	 if(data.length === 0) return res.notFound();\n'+
    '        	if (err) return next(err);\n'+
	'			res.redirect("'+model+'/list")\n'+
    '        	//res.json(data);\n'+
    '    	})\n'+
    '	},\n'+
	'	list : function (req, res) {\n'+
	'		'+model+'.find()\n'+
	'			.exec(function(err, data){\n'+
	'				res.render("'+model+'/list", {data: JSON.stringify(data)})\n'+
	'			})\n'+
	'	}\n'+
	'}\n'
	
	fs.writeFile('controller.js', routes+controller, function (err) {
			if (err) console.log(err);
			console.log('Created file "controller.js"')
		})
}

function generate_list(keys, title, key) {
	var list = {
		body: '', script: ''
	}
	// imports
	list.body = 
	'<head>\n'+ 
	'	<title>List '+title+'</title>\n'+
	'	<script src="/bower_components/webcomponentsjs/webcomponents.min.js"></script>\n'+
	'	<script src="/bower_components/lokijs/src/lokijs.js"></script>\n'+
	'	<link rel="stylesheet" href="/styles/app.css">\n'+
	'	<link rel="import" href="/bower_components/paper-material/paper-material.html">\n'+
	'	<link rel="import" href="/bower_components/paper-input/paper-input.html">\n'+
	'	<link rel="import" href="/bower_components/paper-fab/paper-fab.html">\n'+
	'	<link rel="import" href="/bower_components/iron-icons/iron-icons.html">\n'+
	'	<link rel="import" href="/bower_components/paper-icon-button/paper-icon-button.html">\n'+
	'	<link rel="import" href="/bower_components/paper-button/paper-button.html">\n'+
	'	<link rel="import" href="/components/'+model+'-new/'+model+'-new.html">\n'+
	'	<link rel="import" href="/components/'+model+'-display/'+model+'-display.html">\n'+
	'	<link rel="import" href="/components/'+model+'-edit/'+model+'-edit.html">\n'+
	'</head>\n'+
	'<dom-module id="model-list">\n'+
	'<template>\n'+
	'	<'+model+'-new id="'+model+'_new_dialog"></'+model+'-new>\n'+
	'	<'+model+'-display id="'+model+'_display_dialog"></'+model+'-display>\n'+
	'	<'+model+'-edit id="'+model+'_edit_dialog"></'+model+'-edit>\n'+
	'	<div class="card_title">'+title+'</div>\n'+
	'	<select id="filter" on-change="input_type">\n'

	// filter fields
	for (i=0; i < keys.length; i++)
		if (keys[i].substring(0,1) != '_') 
			list.body += '\t\t<option value="'+keys[i]+'">'+jsondata[keys[i]].description+'</option>\n'

	list.body += 
	'	</select>\n'+
	'	<select id="op">\n'+
	'		<option value="igual a">Igual a</option>\n'+
	'		<option value="contiene">Contiene</option>\n'+
	'		<option value="Mayor a">Mayor a</option>\n'+
	'		<option value="Menor a">Menor a</option>\n'+
	'	</select>\n'+
	'	<input id="filtro" type="{{tipo}}"></input>\n'+
	'	<select id="select" class="hide">\n'+ 
	'	  <template is="dom-repeat" items="{{opts}}">\n'+
	'		<option value="{{item.op}}">{{item.op}}</option>\n'+
	'	  </template>\n'+
	'	</select>\n'+
	'	<paper-button class="btn" on-click="filter" raised>Buscar</paper-button>\n'+
	'	<paper-fab id="btn_add" mini on-click="new" icon="add"></paper-fab>\n'+
	'	<table style="width:100%">\n'+
	'	<thead>\n'+
	'	  <tr>\n'+
	'		<th class="ops"></th>\n'
	
	// Table headers
	for (i=0; i < keys.length; i++)
		if (keys[i].substring(0,1) != '_') 
			list.body += '\t\t\t<th class"col_'+keys[i]+'">'+jsondata[keys[i]].description+'</th>\n'
		
	// Table footers	
	list.body += '\t</tr>\n\t</thead>\n\t<tfoot>\n\t\t<tr>\n\t\t\t<td></td>\n'
	for (i=0; i < keys.length; i++)
	   if (keys[i].substring(0,1) != '_') 
		if (i == keys.length-2)
			list.body += '\t\t\t<td>Total</td>\n'
		  else if ((i == keys.length-1))
			list.body += '\t\t\t<td><strong>{{regs}}</strong></td>\n'
		   else
			list.body += '\t\t\t<td></td>\n'
	list.body += 
	 '	</tr>\n'+
	'	</tfoot>\n'+
	'	<tbody>\n'+
    '	<template is="dom-repeat" items="{{filtered_data}}">\n'+
	'	<tr>\n'+
	'		<td class="ops">\n'+
	'			<paper-icon-button id="{{item.'+key+'}}" on-click="display" class="icon-op" icon="visibility"></paper-icon-button>\n'+
	'			<paper-icon-button id="{{item.'+key+'}}" on-click="edit" class="icon-op" icon="create"></paper-icon-button>\n'+
	'		  	<paper-icon-button id="{{item.'+key+'}}" on-click="delete" class="icon-op" icon="cancel"></paper-icon-button>\n'+
	'		</td>\n'
	// body column 
	for (i=0; i < keys.length; i++)
		if (keys[i].substring(0,1) != '_') 
			list.body += '\t\t<td class"col_'+keys[i]+'">{{item.'+keys[i]+'}}</td>\n'
	list.body +=
	'	</tr>\n'+	
    '	</template>\n'+
	'	</tbody>\n'+
	'</table>\n'+
	'</template>\n'+
	'<script>\n'+
    'Polymer({\n'+
    'is: "model-list",\n'+
	'	ready: function() {\n'+
	'		this.tipo = "number"\n'+
	'		var _model = ['
	var first = true
	for (i=0; i < keys.length; i++)
	{
		if (keys[i].substring(0,1) != '_')
		{ 
		  if (!first) 
			 list.body += '\t\t\t\t'
		   else	first = false
		  if (jsondata[keys[i]].enum)
			list.body += '{column: "'+keys[i]+'", enum: '+JSON.stringify(jsondata[keys[i]].enum)+'}'
		  else
			list.body += '{column: "'+keys[i]+'", type: "'+jsondata[keys[i]].type+'"}'
		  if (i < keys.length-1)
			list.body += ',\n'
		   else
			list.body += '\n'
		}
	}
	list.body +=
	'		]\n'+
	'		var _data = <%- data %>\n'+
	'		this.filtered_data = [{'+key+': ""}]\n'+
	'		var db = new loki()\n'+
	'		this.data = db.addCollection("data")\n'+
	'		this.model = db.addCollection("model")\n'+
	'		for (i=0; i< _data.length ; i++)\n'+
	'			this.data.insert(_data[i])\n'+
	'		for (i=0; i< _model.length ; i++)\n'+
	'			this.model.insert(_model[i])\n'+
	'		_data = {}\n'+
	'		_model = {}\n'+
    '	},\n'+
	'	filter: function() {\n'+
	'		var name = this.$.filter.value\n'+
	'		var filtro = {}\n'+
	'		if (this.$.filtro.getAttribute("class") != "hide")\n'+
	'			if (this.$.filtro.getAttribute("type") == "number") \n'+
	'				filtro[name] = Number(this.$.filtro.value)\n'+
	'		 	else\n'+
	'				filtro[name] = this.$.filtro.value\n'+
	'		else\n'+
	'		filtro[name] = this.$.select.value\n'+
	'		this.filtered_data = this.data.find(filtro)\n'+
	'		this.regs = this.filtered_data.length + " reg"\n'+
	'	},\n'+
	'	input_type: function() {\n'+
	'	this.$.filtro.value = ""\n'+
	'	var column = this.model.find({ "column": this.$.filter.value})\n'+
	'	if (column[0].type)\n'+
	'	{\n'+
	'		this.$.select.className = "hide"\n'+
	'		this.$.filtro.className = ""\n'+
	'		switch(column[0].type) {\n'+
	'		case "string":\n'+
	'			this.tipo = "text"\n'+
	'		break;\n'+
	'		case "integer":\n'+
	'			this.tipo = "number"\n'+
	'		break;\n'+
	'		default:\n'+
	'			this.tipo = "text"\n'+
	'		}\n'+
	'	}\n'+
	'	else\n'+
	'	{\n'+
	'		this.$.select.className = ""\n'+
	'		this.$.filtro.className = "hide"\n'+
	'		this.opts = []\n'+
	'		for (i=0; i< column[0].enum.length; i++)\n'+
	'			this.push("opts", {"op": column[0].enum[i]})\n'+
	'	}\n'+
	' },\n'+
	'  display: function(e) {\n'+
	'	var filtro = {"'+key+'": Number(e.toElement.offsetParent.id)}\n'+
	'	var item = this.data.find(filtro)[0]\n'+
	'	this.$.'+model+'_display_dialog.open_display_dialog(item)\n'+
	'	//window.open("/Matheads/display/"+e.toElement.offsetParent.id)\n'+
	'	//window.location.href = "/Matheads/display/"+e.toElement.offsetParent.id\n'+
	'  },\n'+
	'  edit: function(e) {\n'+
	'	var filtro = {"'+key+'": Number(e.toElement.offsetParent.id)}\n'+
	'	var item = this.data.find(filtro)[0]\n'+
	'	this.$.'+model+'_edit_dialog.open_dialog(item)\n'+
	'  },\n'+
	'  delete: function(e) {\n'+
	'	var filtro = {"'+key+'": Number(e.toElement.offsetParent.id)}\n'+
	'	var item = this.data.find(filtro)[0]\n'+
	'	this.$.'+model+'_display_dialog.open_delete_dialog(item)\n'+
	'  },\n'+
	'  new: function() {\n'+
	'	this.$.'+model+'_new_dialog.open_dialog()\n'+
	'  }\n'+
    '});\n'+
	'</script>\n'+
	'</dom-module>\n'+
	'<paper-material class="card" elevation="2">\n'+
	'	<model-list></model-list>\n'+
	'</paper-material>\n'
	
	// Create directory if not exist
	if (!fs.existsSync('./views/'+model))
		fs.mkdirSync('./views/'+model)

	fs.writeFile('views/'+model+'/list.ejs', list.body, function (err) {
			if (err) console.log(err);
			console.log('Created file "views/'+model+'/list.ejs"')
		})
}

exports.generate = function(crud) {
// ** Crud with Polymer
	var pages = {
		body_create: '', body_display: '', body_edit: '', body_delete: '', 
		script_create: '', script_display: '', script_edit: '', script_delete: '',
		body_list: '', script_list: ''
	}
	var keys = Object.keys(jsondata)
	var title = model
	if (keys.indexOf('_title') >= 0)	{
		title = jsondata._title
	}
	// ******   OJO se asume que keys[0] es la clave del archivo, omitiendo campos que comienzan con "_"
	var key = ''
	for (k=0; k < keys.length; k++) 
		if (keys[k].substring(0,1) != '_') {
			key = keys[k]
			k = keys.length
		}
	// generate list 
	generate_list(keys, title, key)
	// generate actions for Controller & Routes
	generate_controller(key)
	
	// Generate Crud: New, Edit and display (+delete)
	// imports
	pages = setBody(crud, 'cru', pages, 
			'<!--<link rel="stylesheet" href="/styles/app.css">-->\n'+
			'<link rel="import" href="/bower_components/polymer/polymer.html">\n'+
			'<link rel="import" href="/bower_components/iron-ajax/iron-ajax.html">\n'+
			'<!--<link rel="import" href="/bower_components/paper-button/paper-button.html">-->\n'+
			'<link rel="import" href="/bower_components/paper-dialog/paper-dialog.html">\n'+
			'<link rel="import" href="/bower_components/paper-dialog-scrollable/paper-dialog-scrollable.html">\n'+
			'<link rel="import" href="/bower_components/neon-animation/animations/scale-up-animation.html">\n'+
			'<link rel="import" href="/bower_components/neon-animation/animations/fade-out-animation.html">\n')
	// dom-module
	pages = setBody(crud, 'c', pages, '<dom-module id="'+model+'-new">\n')
	pages = setBody(crud, 'r', pages, '<dom-module id="'+model+'-display">\n')
	pages = setBody(crud, 'u', pages, '<dom-module id="'+model+'-edit">\n')
	pages = setBody(crud, 'cru', pages, '<template>\n')
	// iron-ajax
	pages = setBody(crud, 'c', pages,'\t<iron-ajax id="ajax" handle-as="json" on-response="validate_record" on-error="error_record"></iron-ajax>\n')
	//	paper-dialog		
	pages = setBody(crud, 'cru', pages, '\t<paper-dialog id="dialog" modal vertical layout entry-animation="scale-up-animation" 	exit-animation="fade-out-animation">\n')
	// title
	pages = setBody(crud, 'c', pages, '\t\t<h2 class="card_title">Crear '+title+'</h2>\n')
	pages = setBody(crud, 'r', pages, '\t\t<h2 class="card_title">{{title}}</h2>\n')
	pages = setBody(crud, 'u', pages, '\t\t<h2 class="card_title">Editar '+title+'</h2>\n')
	// form 
	pages = setBody(crud, 'c', pages, '\t\t<form id="form" action="/'+model+'/create" method="POST">\n')
	pages = setBody(crud, 'r', pages, '\t\t<form id="form">\n')
	pages = setBody(crud, 'u', pages, '\t\t<form id="form" action="/'+model+'/update/{{item.'+key+'}}" method="POST">\n')
	pages = setBody(crud, 'cru', pages, '\t\t\t<paper-dialog-scrollable>\n\t\t\t<div vertical layout>\n')
	
	pages = setScript(crud, 'cru', pages, '<script>\n\tPolymer({\n')
	
	pages = setScript(crud, 'c', pages, '\t\tis: "'+model+'-new",\n')
	pages = setScript(crud, 'r', pages, '\t\tis: "'+model+'-display",\n')
	pages = setScript(crud, 'u', pages, '\t\tis: "'+model+'-edit",\n')
	
	// script on new component
	pages = setScript(crud, 'c', pages, 
	'		open_dialog: function() {\n'+
	'			this.$.dialog.open()\n'+
	'		},\n'+
	'		create: function() {\n'+
	'			if (!isNaN(this.$.'+key+'.value))\n'+
	'			{\n'+
	'				if (this.$.'+key+'.value > 0)\n'+
	'				{\n'+ 
	'					this.$.ajax.url = "/'+model+'/exist/"+this.$.'+key+'.value\n'+
	'					this.$.ajax.generateRequest()\n'+
	'				}\n'+
	'				else this.$.submit_btn.click()\n'+
	'			} else\n'+
	'				this.$.submit_btn.click()\n'+
	'		},\n'+
	'		validate_record: function() {\n'+
	'			if (this.$.ajax.lastResponse.exist)\n'+
	'				alert("Registro ya Existe")\n'+
	'			else\n'+
	'				this.$.submit_btn.click()\n'+
	'		},\n'+
	'		error_record: function() {\n'+
	'			alert("Error Procesando Solicitud: ", this.$.ajax.lastError)\n'+
	'		}\n'+
	'	})\n'+
	'</script>\n'+
	'</dom-module>')
	
	// script on display components
	pages = setScript(crud, 'r', pages,
	'		open_display_dialog: function(item) {\n'+
	'			this.title = "Consultar '+title+'"\n'+
	'			this.$.form.setAttribute("action","")\n'+
	'			this.$.form.setAttribute("method","")\n'+
	'			this.$.delete_btn.className = "hide"\n'+
	'			this.item = item\n'+
	'			this.set_select_fields(item)\n'+
	'			this.$.dialog.open()\n'+
	'		},\n'+
	'		open_delete_dialog: function(item) {\n'+
	'			this.title = "Borrar '+model+'"\n'+
	'			this.$.form.setAttribute("action","/'+model+'/destroy/"+item.'+key+')\n'+
	'			this.$.form.setAttribute("method","POST")\n'+
	'			this.$.delete_btn.className = "btn"\n'+
	'			this.item = item\n'+
	'			this.set_select_fields(item)\n'+
	'			this.$.dialog.open()\n'+
	'		},\n'+
	'		borrar: function() {\n'+
	'			this.$.submit_delete.click()\n'+
	'		},\n'+
	'		set_select_fields(item) {\n')

	// script on edit component
	pages = setScript(crud, 'u', pages,
	'		open_dialog: function(item) {\n'+
	'			this.item = item\n'+
	'			this.$.form.setAttribute("action","/'+model+'/update/"+item.'+key+')\n'+
	'			this.set_select_fields(item)\n'+
	'			this.$.dialog.open()\n'+
	'		},\n'+
	'		cambiar: function() {\n'+
	'			this.$.submit_update.click()\n'+
	'		},\n'+
	'		set_select_fields(item) {\n')
	
	// fields
	var type= ''
	for (i=0; i < keys.length; i++)
	{
	  if (keys[i].substring(0,1) != '_')
	  {
		// Card Line
		pages = setBody(crud, 'cru', pages, '\t\t\t<div class="card_line">\n')
		// field description
		pages = setBody(crud, 'cru', pages,'\t\t\t\t<label class="left_label" for="'+keys[i]+'">'+jsondata[keys[i]].description+'</label>\n')
		if (jsondata[keys[i]].enum)
		{
			// select field
			pages = setBody(crud, 'cu', pages, '\t\t\t\t<select id="'+keys[i]+'" name="'+keys[i]+'">\n')
			pages = setBody(crud, 'r', pages, '\t\t\t\t<select id="'+keys[i]+'" name="'+keys[i]+'" disabled>\n')
			
			// asignar campo select
			pages = setScript(crud, 'ru', pages,'\t\t\tthis.$.'+keys[i]+'.value = item.'+keys[i]+'\n')
			
			for (j=0; j<jsondata[keys[i]].enum.length; j++)
				pages = setBody(crud, 'cru', pages, '\t\t\t\t\t<option value="'+jsondata[keys[i]].enum[j]+'">'+jsondata[keys[i]].enumdes[j]+'</option>\n')
			
			pages = setBody(crud, 'cru', pages, '\t\t\t\t</select>\n\t\t\t</div>\n')
		}
		else
		{
			type = getInputType(jsondata[keys[i]].type)
			// input field
			pages = setBody(crud, 'cru', pages, '\t\t\t\t<input id="'+keys[i]+'" type="'+ type +'" name="'+keys[i]+'"')
			// input values for rud
			pages = setBody(crud, 'ru', pages, ' value="{{item.'+keys[i]+'}}"')
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
			pages = setBody(crud, 'r', pages, ' disabled')
			pages = setBody(crud, 'cru', pages, '>\n\t\t\t</div>\n')
		}
	  } // end if field not starting with '_'
	}
	// submit Button
	pages = setBody(crud, 'cru', pages, '\t\t</div>\n\t\t</paper-dialog-scrollable>\n\t\t<div class="buttons">\n')
	
	pages = setBody(crud, 'c', pages, '\t\t\t<input id="submit_btn" class="hide" type="submit" value="CREAR">\n')
	pages = setBody(crud, 'r', pages, '\t\t\t<input id="submit_delete" class="hide" type="submit" value="BORRAR">\n')
	pages = setBody(crud, 'u', pages, '\t\t\t<input id="submit_update" class="hide" type="submit" value="CAMBIAR">\n')
	
	pages = setBody(crud, 'cru', pages, '\t\t\t<div class="card_line">\n')
	
	//Paper Button
	pages = setBody(crud, 'c', pages, '\t\t\t\t<paper-button id="create_btn" class="btn" on-click="create" raised>CREAR</paper-button>\n')
	pages = setBody(crud, 'r', pages, '\t\t\t\t<paper-button id="delete_btn" class="btn" on-click="borrar" raised>BORRAR</paper-button>\n')
	pages = setBody(crud, 'u', pages, '\t\t\t\t<paper-button id="update_btn" class="btn" on-click="cambiar" raised>CAMBIAR</paper-button>\n')
	
	pages = setBody(crud, 'cru', pages, '\t\t\t\t<paper-button id="exit_btn" class="btn" dialog-confirm raised>SALIR</paper-button>\n')
	
	// Fin html Template
	pages = setBody(crud, 'cru', pages, '\t\t\t</div>\n\t\t</div>\n\t\t</form>\n\t</paper-dialog>\n</template>\n')
	
	// fin de script
	pages = setScript(crud, 'ru', pages,	'\t\t}\n\t})\n</script>\n</dom-module>')
	
	// write file
	if (crud.indexOf("c") > -1)
	{
		// Create directory if not exist
		if (!fs.existsSync('assets/components/'+model+'-new'))
			fs.mkdirSync('assets/components/'+model+'-new')
		// Create file
		fs.writeFile('assets/components/'+model+'-new/'+model+'-new.html', pages.body_create+pages.script_create, function (err) {
			if (err) console.log(err);
			console.log('Created file "/assets/components/'+model+'-new.html"')
		})
	}
	if (crud.indexOf("r") > -1)
	{
		// Create directory if not exist
		if (!fs.existsSync('assets/components/'+model+'-display'))
			fs.mkdirSync('assets/components/'+model+'-display')
		// Create file
		fs.writeFile('assets/components/'+model+'-display/'+model+'-display.html', pages.body_display+pages.script_display, function (err) {
			if (err) console.log(err);
			console.log('Created file "/assets/components/'+model+'-display.html"')
		})
	}
	if (crud.indexOf("u") > -1)
	{
		// Create directory if not exist
		if (!fs.existsSync('assets/components/'+model+'-edit'))
			fs.mkdirSync('assets/components/'+model+'-edit')
		// Create file
		fs.writeFile('assets/components/'+model+'-edit/'+model+'-edit.html', pages.body_edit+pages.script_edit, function (err) {
			if (err) console.log(err);
			console.log('Created file "/assets/components/'+model+'-edit.html"')
		})
	}
}

