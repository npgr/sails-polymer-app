/**
 * FunctionController
 *
 * @description :: Server-side logic for managing functions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	list : function (req, res) {
		var model = req.body.id
		ModelFunction.find({'model': model})
			.populate('model')
			.exec(function(err, data){
				res.locals.resources = req.session.resources
				res.locals.user = {user: req.session.user, name: req.session.username}
				res.locals.data = JSON.stringify(data)
				res.locals.model = JSON.stringify(req.body)
				//console.log('data: ', res.locals.data)
				res.view("ModelFunction/list")
			})
	},
	
	generate: function(req, res) {
		//console.log('generate: ', req.body)
		//var atrs = sails.controllers.Attribute.get({'model': req.body.model_id})
		//var funcs = sails.controllers.modelfunction.get({'model': req.body.model_id})
		ModelFunction.find({'model': req.body.model_id})
			.exec(function(err, funcs) {
				Attribute.find({'model': req.body.model_id})
					.exec(function(err2, atrs) {
					  var fs = require('fs')
					  var fileName = './api/model/'+req.body.model_name+'.js'
					  console.log('File Name: '+ fileName)
					  if (!fs.existsSync(fileName))
					  {
						var exec = require('child_process').exec
						
						run = exec('sails generate api '+req.body.model_name,
							function(error, stdout, stderr) {
								//console.log('stdout: ' + stdout);
								//console.log('stderr: ' + stderr);
								if (error !== null) {
									console.log('exec error: ' + error);
								}
							sails.controllers.modelfunction.generate_model(res, req.body.model_name, atrs, funcs)
						})
					  }
					  else 
						sails.controllers.modelfunction.generate_model(res, req.body.model_name, atrs, funcs)
					})
			})
	},
	generate_model: function(res, model, atrs, funcs) {
		var model_file = {}
		for (i=0; i< funcs.length; i++)
		{
			if (funcs[i].type != 'list')
			{
				if (funcs[i].enable) 
					model_file['iiiuuu__'+funcs[i].type+'iii']= 'enabled'
				  else
					model_file['iiiuuu__'+funcs[i].type+'iii']= 'disabled'
			}
		}
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
			console.log('Created file pueba.txt')
		})
		res.end('Generado archivo prueba.txt')
		
		var exec = require('child_process').exec

		run = exec('node generate crud6 '+model,
			function(error, stdout, stderr) {
				//console.log('stdout: ' + stdout);
				//console.log('stderr: ' + stderr);
				if (error !== null) {
						console.log('exec error: ' + error);
				}
		})
	}
};

