/**
 * ExpenseCategoryController
 *
 * @description :: Server-side logic for managing Expensecategories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	list : function (req, res) {
		res.locals.resources = req.session.resources
		res.locals.user = {user: req.session.user, name: req.session.username}
		res.locals.data = []
		res.view("ExpenseCategory/list")
	},
	get: function(req, res) {
		ExpenseCategory.find({user: req.session.userid})
			.exec(function(err, data){
				res.json(data)
			})
	},
	create: function(req, res, next) {
		var params = req.params.all();
		params.user = req.session.userid
		ExpenseCategory.create(params, function(err, data) {
			if (err) return next(err);
			return res.json(data)
			//return next()
		});
	},
	total: function(req, res) {
		var sql = 'select b.name as category, sum(a.amount) as amount from expense a, expensecategory b where a.category = b.id and a.date >= \'2015-09-01\' and date <= \'2015-09-30\' and a.user = '+req.session.userid+' group by b.name'
		
		ExpenseCategory.query(sql, function(err, data) {
			if (err) return res.serverError(err);
			return res.json(data.rows)
		})
	},
};

