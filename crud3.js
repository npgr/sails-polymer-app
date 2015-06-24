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
		//if (pages.script_create == '') pages.script_create = '<script>\r'
		pages.script_create += value
	}
	if (crud.indexOf("r") > -1 && crud2.indexOf("r") > -1) 
	{
		//if (pages.script_display == '') pages.script_display = '<script>\r'
		pages.script_display += value
	}
	if (crud.indexOf("u") > -1 && crud2.indexOf("u") > -1)
	{
		//if (pages.script_edit == '') pages.script_edit = '<script>\r'
		pages.script_edit += value
	}
	if (crud.indexOf("d") > -1 && crud2.indexOf("d") > -1)
	{
		//if (pages.script_delete == '') pages.script_delete = '<script>\r'
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

exports.generate = function(crud, jsondata) {
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
	// ******   OJO se asume que keys[0] es la clave del archivo, omitiendo campos que comienzan con "_"
	var key = ''
	for (k=0; k < keys.length; k++) 
		if (keys[k].substring(0,1) != '_') {
			key = keys[k]
			k = keys.length
		}
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
	'					this.$.ajax.url = "/'+model+'/existe/"+this.$.'+key+'.value\n'+
	'					this.$.ajax.generateRequest()\n'+
	'				}\n'+
	'				else this.$.submit_btn.click()\n'+
	'			} else\n'+
	'				this.$.submit_btn.click()\n'+
	'		},\n'+
	'		validate_record: function() {\n'+
	'			if (this.$.ajax.lastResponse.existe == "si")\n'+
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
	'			this.$.form.setAttribute("action","/Matheads/destroy/"+item.'+key+')\n'+
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
		/*if (pages.script_create != '') pages.script_create += '</script>' */
		fs.writeFile('assets/components/'+model+'-new/'+model+'-new.html', pages.body_create+pages.script_create, function (err) {
			if (err) console.log(err);
			console.log('Created file "/assets/components/'+model+'-new.html"')
		})
	}
	if (crud.indexOf("r") > -1)
	{
		/*if (pages.script_create != '') pages.script_create += '</script>' */
		fs.writeFile('assets/components/'+model+'-display/'+model+'-display.html', pages.body_display+pages.script_display, function (err) {
			if (err) console.log(err);
			console.log('Created file "/assets/components/'+model+'-display.html"')
		})
	}
	if (crud.indexOf("u") > -1)
	{
		/*if (pages.script_create != '') pages.script_create += '</script>' */
		fs.writeFile('assets/components/'+model+'-edit/'+model+'-edit.html', pages.body_edit+pages.script_edit, function (err) {
			if (err) console.log(err);
			console.log('Created file "/assets/components/'+model+'-edit.html"')
		})
	}
	
}