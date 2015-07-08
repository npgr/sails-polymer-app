var fs = require('fs')
var jsonic = require('jsonic')
var _ = require('lodash')

function getInputType(type) {
	switch(type) {
		case 'string':
			return 'text'
			break
		case 'integer':
			return 'number'
			break
		case 'float':
			return 'number'
			break
		case 'date':
			return 'date'
			break
		default:
			return 'text'
	}
}

function generate_controller(key) {
	var CONTROLLER_TEMPLATE = fs.readFileSync('./templates/controller.template', 'utf8');
	var compiled_Controller = _.template(CONTROLLER_TEMPLATE)
	
	var controller = compiled_Controller({ 'model': model, 'key': key})
				
	fs.writeFile('templates/controller.js', controller, function (err) {
			if (err) console.log(err);
			console.log('Created file templates/controller.js')
		})
}

function set_jsondata_lines(keys) {
	var line_c = ''; var line_r = ''; var line_u = ''; var line_d = ''; var type= ''
	
	for (i=0; i < keys.length; i++)
	{
	  if (keys[i].substring(0,1) != '_')
	  {
		if (jsondata[keys[i]].enum)
		{
			// <select>
			line_c = '<select id="'+keys[i]+'" name="'+keys[i]+'">\n'
			line_u = line_c
			line_r = '<select id="'+keys[i]+'" name="'+keys[i]+'" disabled>\n'
			line_d = line_r
			// <option>
			for (j=0; j<jsondata[keys[i]].enum.length; j++)
			{
				line_c += '\t\t\t\t\t\t<option value="'+jsondata[keys[i]].enum[j]+'">'+jsondata[keys[i]].enumdes[j]+'</option>\n'
				line_r += '\t\t\t\t\t\t<option value="'+jsondata[keys[i]].enum[j]+'">'+jsondata[keys[i]].enumdes[j]+'</option>\n'
				line_u += '\t\t\t\t\t\t<option value="'+jsondata[keys[i]].enum[j]+'">'+jsondata[keys[i]].enumdes[j]+'</option>\n'
				line_d += '\t\t\t\t\t\t<option value="'+jsondata[keys[i]].enum[j]+'">'+jsondata[keys[i]].enumdes[j]+'</option>\n'
			}
			line_c += '\t\t\t\t\t</select>'
			line_r += '\t\t\t\t\t</select>'
			line_u += '\t\t\t\t\t</select>'
			line_d += '\t\t\t\t\t</select>'
		}
		else  // <input>
		{
			type = getInputType(jsondata[keys[i]].type)
			// input field
			line_c = '<input id="'+keys[i]+'" type="'+ type +'" name="'+keys[i]+'"'
			line_r = line_c
			line_u = line_c
			line_d = line_c
			// input values for rud
			line_r += ' value="{{item.'+keys[i]+'}}"'
			line_u += ' value="{{item.'+keys[i]+'}}"'
			line_d += ' value="{{item.'+keys[i]+'}}"'
			// maxLength
			if (jsondata[keys[i]].maxLength)
			{
				line_c += ' maxlength='+jsondata[keys[i]].maxLength
				line_u += ' maxlength='+jsondata[keys[i]].maxLength
			}
			// min 	
			if (jsondata[keys[i]].min)
			{
				line_c += ' min='+jsondata[keys[i]].min
				line_u += ' min='+jsondata[keys[i]].min
			}
			//max
			if (jsondata[keys[i]].max)
			{
				line_c += ' max='+jsondata[keys[i]].max
				line_u += ' max='+jsondata[keys[i]].max
			}
			// required
			if (jsondata[keys[i]].required)
			{
				line_c += ' required'
				line_u += ' required'
			}
			// DefaultTo (Fixed Value)
			if (jsondata[keys[i]].defaultsTo)
			{
				line_c += ' value="'+jsondata[keys[i]].defaultsTo+'" disabled'
				line_u += ' value="'+jsondata[keys[i]].defaultsTo+'" disabled'
			} else {
				if (jsondata[keys[i]].primaryKey) {
					line_u += ' disabled'
					if (jsondata[keys[i]].autoIncrement)
							line_c += ' disabled'
				}
			}
			//end of input field
			line_r += ' disabled'
			line_d += ' disabled'
			line_c += '>'
			line_r += '>'
			line_u += '>'
			line_d += '>'
		}
	  jsondata[keys[i]].line_c = line_c
	  jsondata[keys[i]].line_r = line_r
	  jsondata[keys[i]].line_u = line_u
	  jsondata[keys[i]].line_d = line_d
	  //console.log(jsondata[keys[i]].line_u)
	  }
	}
}

function generate_new_form(keys, key, title, IMPORT_FORM) {
	var NEW_FORM_TEMPLATE = fs.readFileSync('./templates/new_form.template', 'utf8');
	var compiled_New_Form = _.template(NEW_FORM_TEMPLATE)
	
	var new_form = compiled_New_Form({ 'title': title , 'import_form': IMPORT_FORM, 'model': model, 
										'key': key, 'keys': keys, 'jsondata': jsondata})
	// Create Folder if not exist
	if (!fs.existsSync('assets/components/'+model+'-new'))
			fs.mkdirSync('assets/components/'+model+'-new')
	
	fs.writeFile('assets/components/'+model+'-new/'+model+'-new.html', new_form, function (err) {
			if (err) console.log(err);
			console.log('Created file assets/components/'+model+'-new/'+model+'-new.html')
		})
}

function generate_display_form(keys, key, title, IMPORT_FORM){
	var DISPLAY_FORM_TEMPLATE = fs.readFileSync('./templates/display_form.template', 'utf8');
	var compiled_Display_Form = _.template(DISPLAY_FORM_TEMPLATE)
	
	var display_form = compiled_Display_Form({ 'title': title , 'import_form': IMPORT_FORM, 'model': model, 
										'key': key, 'keys': keys, 'jsondata': jsondata})
	// Create Folder if not exist
	if (!fs.existsSync('assets/components/'+model+'-display'))
			fs.mkdirSync('assets/components/'+model+'-display')
	
	fs.writeFile('assets/components/'+model+'-display/'+model+'-display.html', display_form, function (err) {
			if (err) console.log(err);
			console.log('Created file assets/components/'+model+'-display/'+model+'-display.html')
		})
}

function generate_delete_form(keys, key, title, IMPORT_FORM) {
	var DELETE_FORM_TEMPLATE = fs.readFileSync('./templates/delete_form.template', 'utf8');
	var compiled_Delete_Form = _.template(DELETE_FORM_TEMPLATE)
	
	var delete_form = compiled_Delete_Form({ 'title': title , 'import_form': IMPORT_FORM, 'model': model, 
										'key': key, 'keys': keys, 'jsondata': jsondata})
	// Create Folder if not exist
	if (!fs.existsSync('assets/components/'+model+'-delete'))
			fs.mkdirSync('assets/components/'+model+'-delete')
			
	fs.writeFile('assets/components/'+model+'-delete/'+model+'-delete.html', delete_form, function (err) {
			if (err) console.log(err);
			console.log('Created file assets/components/'+model+'-delete/'+model+'-delete.html')
		})
}

function generate_edit_form(keys, key, title, IMPORT_FORM) {
	var EDIT_FORM_TEMPLATE = fs.readFileSync('./templates/edit_form.template', 'utf8');
	var compiled_Edit_Form = _.template(EDIT_FORM_TEMPLATE)
	
	var edit_form = compiled_Edit_Form({ 'title': title , 'import_form': IMPORT_FORM, 'model': model, 
										'key': key, 'keys': keys, 'jsondata': jsondata})
	// Create Folder if not exist
	if (!fs.existsSync('assets/components/'+model+'-edit'))
			fs.mkdirSync('assets/components/'+model+'-edit')	

	fs.writeFile('assets/components/'+model+'-edit/'+model+'-edit.html', edit_form, function (err) {
			if (err) console.log(err);
			console.log('Created file assets/components/'+model+'-edit/'+model+'-edit.html')
		})
}

function generate_list_page(keys, key, title) {
	var LIST_TEMPLATE = fs.readFileSync('./templates/list.template', 'utf8');
	var compiled_List = _.template(LIST_TEMPLATE)
	
	var first = true
	var attrs = ''
	for (i=0; i < keys.length; i++)
	{
		if (keys[i].substring(0,1) != '_')
		{ 
		  if (!first) 
			 attrs += '\t\t\t\t'
		   else	first = false
		  if (jsondata[keys[i]].enum)
			attrs += '{column: "'+keys[i]+'", enum: '+JSON.stringify(jsondata[keys[i]].enum)+'}'
		  else
			attrs += '{column: "'+keys[i]+'", type: "'+jsondata[keys[i]].type+'"}'
		  if (i < keys.length-1)
			attrs += ',\n'
		   else
			attrs += '\n'
		}
	}
	
	var list_template = compiled_List({ 'title': title , 'attrs': attrs, 'model': model, 
										'key': key, 'keys': keys, 'jsondata': jsondata})
	
	list_template = list_template.replace('>%', '<%')
	list_template = list_template.replace('%<', '%>')
	
	// Create Folder if not exist
	if (!fs.existsSync('views/'+model))
			fs.mkdirSync('views/'+model)	

	fs.writeFile('views/'+model+'/list.ejs', list_template, function (err) {
			if (err) console.log(err);
			console.log('Created file views/'+model+'/list.ejs')
		})
}

exports.generate = function(crud) {
// ** Crud with Polymer & templates
	var keys = Object.keys(jsondata)
	var title = model
	if (keys.indexOf('_title') >= 0)	{
		title = jsondata._title
	}
	
	var key= {}
	for (k=0; k < keys.length; k++ ) {
		if (jsondata[keys[k]].primaryKey) {
			key = jsondata[keys[k]]
			key.name = keys[k]
			break
		}
	}
	// input field on form
	set_jsondata_lines(keys)
	
	var IMPORT_FORM = fs.readFileSync('./templates/import_form.template', 'utf8');
	
	generate_new_form(keys, key, title, IMPORT_FORM)
	generate_display_form(keys, key, title, IMPORT_FORM)
	generate_delete_form(keys, key, title, IMPORT_FORM)	
	generate_edit_form(keys, key, title, IMPORT_FORM)	
	
	generate_list_page(keys, key, title)

	generate_controller(key)
}

