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
					  if (!fs.existsSync('./api/model/'+req.body.model_name+'.js'))
					  {
						var exec = require('child_process').exec
						
						run = exec('sails generate model '+req.body.model_name,
							function(error, stdout, stderr) {
								console.log('stdout: ' + stdout);
								console.log('stderr: ' + stderr);
								if (error !== null) {
									console.log('exec error: ' + error);
								}
							sails.controllers.modelfunction.model(res, req.body.model_name, atrs, funcs)
						})
					  }
					  else 
						sails.controllers.modelfunction.model(res, req.body.model_name, atrs, funcs)
					})
			})
		
	},
	model: function(res, model, atrs, funcs) {
		var model_file = {}
		for (i=0; i< funcs.length; i++)
		{
			if (funcs[i].type != 'list')
			{
				if (funcs[i].enable) 
					model_file['__'+funcs[i].type]= 'enabled'
				  else
					model_file['__'+funcs[i].type]= 'disabled'
			}
		}
		model_file['id'] = {
			'_description': 'Id',
			'type': "integer",
			'primaryKey': true,
			'autoIncrement': true,
			'unique': true
		}
		var atr = ''
		for (i=0; i< atrs.length; i++)
		{
			atr = atrs[i].attribute
			if (atr!='id')
			{
				model_file[atr] = {}
				model_file[atr]._description = atrs[i].description
				if (atrs[i].textarea_cols > 0) 
				{
					model_file[atr]._textarea_cols = atrs[i].textarea_cols
					model_file[atr]._textarea_rows = atrs[i].textarea_rows
				}
				if (atrs[i].hide) model_file[atr]._hide = true
				model_file[atr].type = atrs[i].type
				if (atrs[i].required) model_file[atr].required = true
				if (atrs[i].enum != '') 
				{
					model_file[atr].enum = atrs[i].enum.split(',')
					model_file[atr]._enumdes = atrs[i].enumdes.split(',')
				}
			}
		}
		console.log('model_file: ', model_file)
		var file = JSON.stringify({attributes: model_file}, null, 3)
		file = file.substring(0, file.length-6)
		file += '//End Attributes\n\t}\n}'
		
		file = file.replace(/"__/g, '//"_')
		file = file.replace(/"_/g, '//"')
		//file = file.replace(/\"$/g, "")
		//file = file.replace(/\$"/g, "")*/
		
		fs = require('fs')
		fs.writeFile('./prueba.txt', file, function (err) {
			if (err) console.log(err);
			console.log('Created file pueba.txt')
		})
		res.end(file)
	}
};

