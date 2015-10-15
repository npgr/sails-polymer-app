/**
 * FunctionController
 *
 * @description :: Server-side logic for managing functions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	list : function (req, res) {
		//ModelFunction.find()
		//	.exec(function(err, data){
				res.locals.resources = req.session.resources
				res.locals.user = {user: req.session.user, name: req.session.username}
		//		res.locals.data = JSON.stringify(data)
				res.locals.data = []
				res.locals.model = JSON.stringify(req.body)
				res.view("ModelFunction/list")
		//	})
	}
};

