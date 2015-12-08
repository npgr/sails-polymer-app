/**
 * FunctionListController
 *
 * @description :: Server-side logic for managing Functionlists
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	get : function (req, res) {
		var model = req.body.id
		FunctionList.findOne({'model': model})
			.populate('model')
			.exec(function(err, data){
				res.json(data)
			})
	},
	generate: function(req, res) {
		FunctionList.findOne({model: req.body.model_id})
			.exec(function(err, func) {
				res.json({'function List': func})
		})
	}
};

