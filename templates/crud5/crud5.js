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
			return 'float'
			break
		case 'date':
			return 'date'
			break
		default:
			return 'text'
	}
}

function generate_controller(key) {
	var CONTROLLER_TEMPLATE = fs.readFileSync('./templates/crud5/controller.template', 'utf8');
	var compiled_Controller = _.template(CONTROLLER_TEMPLATE)
	
	var controller = compiled_Controller({ 'model': model, 'key': key})
				
	fs.writeFile('templates/crud5/controller.js', controller, function (err) {
			if (err) console.log(err);
			console.log('Created file templates/crud5/controller.js')
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
			if (!jsondata[keys[i]].model)
			{
				line_r += ' value="{{item.'+keys[i]+'}}"'
				line_u += ' value="{{item.'+keys[i]+'}}"'
				line_d += ' value="{{item.'+keys[i]+'}}"'
			}
			else  // model
			{
				if (jsondata[keys[i]].key_type != 'integer' && jsondata[keys[i]].key_type != 'float') 
				{
					line_c += ' key=""'
					line_u += ' key="{{item.'+keys[i]+'_id}}"'
				}
				else
				{
					line_c += ' key=0'
					line_u += ' key={{item.'+keys[i]+'_id}}'
				}
				line_r += ' value="{{item.'+keys[i]+'_'+ jsondata[keys[i]].display +'}}"'
				line_u += ' value="{{item.'+keys[i]+'_'+ jsondata[keys[i]].display +'}}"'
				line_d += ' value="{{item.'+keys[i]+'_'+ jsondata[keys[i]].display +'}}"'
			}
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
			if (jsondata[keys[i]].model)
			{
				line_c += ' on-click="select_field" readonly'
				line_u += ' on-click="select_field" readonly'
			}
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

function generate_new_form(keys, key, title) {
	var NEW_FORM_TEMPLATE = fs.readFileSync('./templates/crud5/new-form.template', 'utf8');
	var compiled_New_Form = _.template(NEW_FORM_TEMPLATE)
	
	var new_form = compiled_New_Form({'title':title,'model':model,'key':key,'keys':keys,'jsondata':jsondata})
	// Create Folder if not exist
	if (!fs.existsSync('assets/components/'+model+'-new'))
			fs.mkdirSync('assets/components/'+model+'-new')
	
	fs.writeFile('assets/components/'+model+'-new/'+model+'-new.html', new_form, function (err) {
			if (err) console.log(err);
			console.log('Created file assets/components/'+model+'-new/'+model+'-new.html')
		})
}

function generate_display_form(keys, key, title){
	var DISPLAY_FORM_TEMPLATE = fs.readFileSync('./templates/crud5/display-form.template', 'utf8');
	var compiled_Display_Form = _.template(DISPLAY_FORM_TEMPLATE)
	
	var display_form = compiled_Display_Form({'title':title,'model':model,'key':key,'keys':keys,'jsondata':jsondata})
	// Create Folder if not exist
	if (!fs.existsSync('assets/components/'+model+'-display'))
			fs.mkdirSync('assets/components/'+model+'-display')
	
	fs.writeFile('assets/components/'+model+'-display/'+model+'-display.html', display_form, function (err) {
			if (err) console.log(err);
			console.log('Created file assets/components/'+model+'-display/'+model+'-display.html')
		})
}

function generate_delete_form(keys, key, title) {
	var DELETE_FORM_TEMPLATE = fs.readFileSync('./templates/crud5/delete-form.template', 'utf8');
	var compiled_Delete_Form = _.template(DELETE_FORM_TEMPLATE)
	
	var delete_form = compiled_Delete_Form({'title':title,'model':model,'key':key,'keys':keys,'jsondata':jsondata})
	// Create Folder if not exist
	if (!fs.existsSync('assets/components/'+model+'-delete'))
			fs.mkdirSync('assets/components/'+model+'-delete')
			
	fs.writeFile('assets/components/'+model+'-delete/'+model+'-delete.html', delete_form, function (err) {
			if (err) console.log(err);
			console.log('Created file assets/components/'+model+'-delete/'+model+'-delete.html')
		})
}

function generate_edit_form(keys, key, title, IMPORT_FORM) {
	var EDIT_FORM_TEMPLATE = fs.readFileSync('./templates/crud5/edit-form.template', 'utf8');
	var compiled_Edit_Form = _.template(EDIT_FORM_TEMPLATE)
	
	var edit_form = compiled_Edit_Form({'title':title,'model':model,'key':key,'keys':keys,'jsondata':jsondata})
	// Create Folder if not exist
	if (!fs.existsSync('assets/components/'+model+'-edit'))
			fs.mkdirSync('assets/components/'+model+'-edit')	

	fs.writeFile('assets/components/'+model+'-edit/'+model+'-edit.html', edit_form, function (err) {
			if (err) console.log(err);
			console.log('Created file assets/components/'+model+'-edit/'+model+'-edit.html')
		})
}

function generate_list_columns(keys, title) {
	var LIST_COLUMNS_TEMPLATE = fs.readFileSync('./templates/crud5/list-columns.template', 'utf8');
	var compiled_List_Columns = _.template(LIST_COLUMNS_TEMPLATE)
	
	var list_columns = compiled_List_Columns({'title':title,'keys':keys})
	// Create Folder if not exist
	if (!fs.existsSync('assets/components/'+model+'-list-columns'))
			fs.mkdirSync('assets/components/'+model+'-list-columns')	

	fs.writeFile('assets/components/'+model+'-list-columns/'+model+'-list-columns.html', list_columns, function (err) {
			if (err) console.log(err);
			console.log('Created file assets/components/'+model+'-list-columns/'+model+'-list-columns.html')
		})
}

function generate_model_select(model, display, key, description) {
	if (!fs.existsSync('assets/components/'+model+'-select/'+model+'-select.html'))
	{
		var SELECT_MODEL_TEMPLATE = fs.readFileSync('./templates/crud5/select-model.template', 'utf8');
		var compiled_Select_Model = _.template(SELECT_MODEL_TEMPLATE)
	
		var select_model = compiled_Select_Model({'model':model,'display':display,'key':key,'description':description})
		// Create Folder if not exist
		if (!fs.existsSync('assets/components/'+model+'-select'))
			fs.mkdirSync('assets/components/'+model+'-select')	
	
		fs.writeFile('assets/components/'+model+'-select/'+model+'-select.html', select_model, function (err) {
			if (err) console.log(err);
			console.log('Created file assets/components/'+model+'-select/'+model+'-select.html')
		})
	}
	else  console.log('File assets/components/'+model+'-select/'+model+'-select.html already Exist')
}

function generate_list_page(keys, key, title, IMPORT_FORM) {
	var LIST_TEMPLATE = fs.readFileSync('./templates/crud5/list.template', 'utf8');
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
			attrs += '{column: "'+keys[i]+'", enum: '+JSON.stringify(jsondata[keys[i]].enum)+', enumdes: '+JSON.stringify(jsondata[keys[i]].enumdes)+', display: true}'
		  else
			attrs += '{column: "'+keys[i]+'", type: "'+jsondata[keys[i]].type+'", display: true}'
		  if (i < keys.length-1)
			attrs += ',\n'
		   else
			attrs += '\n'
		}
	}
	
	var list_template = compiled_List({ 'title': title , 'attrs': attrs, 'model': model, 'import_form': IMPORT_FORM,
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
	// Key
	var key= {}
	for (k=0; k < keys.length; k++ ) {
		if (jsondata[keys[k]].primaryKey) {
			key = jsondata[keys[k]]
			key.name = keys[k]
			break
		}
	}
	// Relations
	var relation = []
	var i = 0
	for (k=0; k < keys.length; k++ ) {
		if (jsondata[keys[k]].model) {
			relation[i] = {}
			relation[i].model = jsondata[keys[k]].model
			relation[i].description = jsondata[keys[k]].description
			relation[i].key = jsondata[keys[k]].key
			relation[i].display = jsondata[keys[k]].display
			i++
		}
	}
	// input field on form
	set_jsondata_lines(keys)
	
	//var IMPORT_FORM = fs.readFileSync('./templates/crud5/import-form.template', 'utf8');
	
	generate_new_form(keys, key, title)
	generate_display_form(keys, key, title)
	generate_delete_form(keys, key, title)	
	generate_edit_form(keys, key, title)
	//generate_list_columns(keys, title)
	
	for (i=0; i<relation.length; i++)
		generate_model_select(relation[i].model, relation[i].display, relation[i].key, relation[i].description)
	
	//generate_list_page(keys, key, title, IMPORT_FORM)

	//generate_controller(key)
}

