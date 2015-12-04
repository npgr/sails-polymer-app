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
			.exec(function(err, data){
				res.json(data)
			})
	},
};

