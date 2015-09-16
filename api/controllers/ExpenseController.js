/**
 * ExpenseController
 *
 * @description :: Server-side logic for managing Expenses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	list : function (req, res) {
		res.locals.resources = req.session.resources
		res.locals.user = {user: req.session.user, name: req.session.username}
		res.locals.data = []
		res.view("Expense/list")
	},
	get: function(req, res) {
		Expense.find({user: req.session.userid})
			.populate('category')
			.exec(function(err, data){
				res.json(data)
			})
	},
	create: function(req, res, next) {
		var params = req.params.all();
		params.user = req.session.userid
		Expense.create(params, function(err, data) {
			if (err) return next(err);
			return res.json(data)
			//return next()
		});
	}
};

