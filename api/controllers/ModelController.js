/**
 * ModelController
 *
 * @description :: Server-side logic for managing models
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	exist: function(req, res, next) {
		var id = req.param("id")
		 Model.findOne(id)
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	},
	list : function (req, res) {
		//Model.find()
		//	.exec(function(err, data){
				res.locals.resources = req.session.resources
				res.locals.user = {user: req.session.user, name: req.session.username}
		//		res.locals.data = JSON.stringify(data)
				res.locals.data = []
				res.view("Model/list")
		//	})
	},
	generate: function(req, res) {
		Attribute.find({'model': req.body.model_id})
			.exec(function(err, atrs) {
				var fs = require('fs')
				var fileName = './api/model/'+req.body.model_name+'.js'
				//console.log('File Name: '+ fileName)
				if (!fs.existsSync(fileName))
				{
					var exec = require('child_process').exec
						
					run = exec('sails generate api '+req.body.model_name,
						function(error, stdout, stderr) {
							//console.log('stdout: ' + stdout);
							//console.log('stderr: ' + stderr);
							if (error !== null) 
								console.log('exec error: ' + error);
							sails.controllers.model.generate_model(res, req.body.model_name, atrs)
						})
				}
				else 
					sails.controllers.model.generate_model(res, req.body.model_name, atrs)
			})
	},
	generate_model: function(res, modelx, atrs) {
		var model_file = {}
		model_file['iiiidiii'] = {
			'iiiuuu_descriptioniii': 'Id',
			'iiitypeiii': "integer",
			'iiiprimaryKeyiii': true,
			'iiiautoIncrementiii': true,
			'iiiuniqueiii': true
		}
		jsondata = {}
		jsondata.id = {
			_description: 'Id',
			type: "integer",
			primaryKey: true,
			autoIncrement: true,
			unique: true
		}
		var atr = ''
		for (i=0; i< atrs.length; i++)
		{
			atr = atrs[i].attribute
			if (atr!='id')
			{
				model_file['iii'+atr+'iii'] = {}; jsondata[atr] = {}
				model_file['iii'+atr+'iii'].iiiuuu_descriptioniii = atrs[i].description
				jsondata[atr]._description = atrs[i].description
				if (atrs[i].textarea_cols > 0) 
				{
					model_file['iii'+atr+'iii'].iiiuuu_textarea_colsiii = atrs[i].textarea_cols
					model_file['iii'+atr+'iii'].iiiuuu_textarea_rowsiii = atrs[i].textarea_rows
					jsondata[atr]._textarea_cols = atrs[i].textarea_cols
					jsondata[atr]._textarea_rows = atrs[i].textarea_rows
				}
				if (atrs[i].hide) {
					model_file['iii'+atr+'iii'].iiiuuu_hideiii = true
					jsondata[atr]._hide = true
				} 
				model_file['iii'+atr+'iii'].iiitypeiii = atrs[i].type
				jsondata[atr].type = atrs[i].type
				if (atrs[i].required) {
					model_file['iii'+atr+'iii'].iiirequirediii = true
					jsondata[atr].required = true
				}
				if (atrs[i].enum != '') 
				{
					model_file['iii'+atr+'iii'].iiienumiii = atrs[i].enum.split(',')
					model_file['iii'+atr+'iii'].iiiuuu_enumdesiii = atrs[i].enumdes.split(',')
					jsondata[atr].enum = atrs[i].enum.split(',')
					jsondata[atr]._enumdes = atrs[i].enumdes.split(',')
					
					for (j=0; j < model_file['iii'+atr+'iii'].iiienumiii.length; j++)
						model_file['iii'+atr+'iii'].iiienumiii[j].trimLeft().trimRight()
					for (j=0; j < model_file['iii'+atr+'iii'].iiiuuu_enumdesiii.length; j++)
						model_file['iii'+atr+'iii'].iiiuuu_enumdesiii[j].trimLeft().trimRight()
				}
			}
		}
		var file = JSON.stringify({attributes: model_file}, null, 3)
		file = file.substring(0, file.length-6)
		file += '//End Attributes\n\t}\n}'
		
		file = file.replace(/\"iii/g, '')  //Remove starting " on attribute name
		file = file.replace(/iii\"/g, '')  //Remove ending " on attribute name
		file = file.replace(/uuu_/g, '//') // Add comments //
		file = file.replace(/\"attributes\"/, 'attributes')
		
		var start = file.indexOf('[')
		var end = file.indexOf(']')
		while (start > 0)
		{
			file = file.substring(0, start-1) + file.substring(start, end).replace(/\n|\t| /g,'') + file.substring(end, file.length)
			start = file.indexOf('[', start+1)
			end = file.indexOf(']', end + 1)
		}
		// Generar crud
			// Global variables 
			console.log('jsondata: ', jsondata)
			model = modelx
			//require('crud5').generate('crud6')
		//
		file = 'module.exports = {\n\tmigrate: "alter",' + file.substring(1, file.length) + ';'
		fs = require('fs')
		fs.writeFile('./api/models/'+modelx+'.js', file, function (err) {
			if (err) console.log(err);
			console.log('Generated Model '+modelx)
		})
		res.json({'response': 'Generated Model '+modelx})
	}
};

