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
	generate_model: function(res, model, atrs) {
		var model_file = {}
		model_file['iiiidiii'] = {
			'iiiuuu_descriptioniii': 'Id',
			'iiitypeiii': "integer",
			'iiiprimaryKeyiii': true,
			'iiiautoIncrementiii': true,
			'iiiuniqueiii': true
		}
		var atr = ''
		for (i=0; i< atrs.length; i++)
		{
			atr = 'iii' + atrs[i].attribute + 'iii'
			if (atr!='id')
			{
				model_file[atr] = {}
				model_file[atr].iiiuuu_descriptioniii = atrs[i].description
				if (atrs[i].textarea_cols > 0) 
				{
					model_file[atr].iiiuuu_textarea_colsiii = atrs[i].textarea_cols
					model_file[atr].iiiuuu_textarea_rowsiii = atrs[i].textarea_rows
				}
				if (atrs[i].hide) model_file[atr].iiiuuu_hideiii = true
				model_file[atr].iiitypeiii = atrs[i].type
				if (atrs[i].required) model_file[atr].iiirequirediii = true
				if (atrs[i].enum != '') 
				{
					model_file[atr].iiienumiii = atrs[i].enum.split(',')
					model_file[atr].iiiuuu_enumdesiii = atrs[i].enumdes.split(',')
					
					for (j=0; j < model_file[atr].iiienumiii.length; j++)
						model_file[atr].iiienumiii[j].trimLeft().trimRight()
					for (j=0; j < model_file[atr].iiiuuu_enumdesiii.length; j++)
						model_file[atr].iiiuuu_enumdesiii[j].trimLeft().trimRight()
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
		file = 'module.exports = {\n\t//migrate: "alter",' + file.substring(1, file.length) + ';'
		fs = require('fs')
		fs.writeFile('./api/models/'+model+'.js', file, function (err) {
			if (err) console.log(err);
			console.log('Generated Model '+model)
		})
		res.json({'response': model})
	}
};

