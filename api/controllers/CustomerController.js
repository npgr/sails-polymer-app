/**
 * CustomerController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	list : function (req, res) {
		Customer.find()
			.exec(function(err, data){
				res.locals.resources = req.session.resources
				res.locals.user = {user: req.session.user, name: req.session.username}
				res.locals.data = JSON.stringify(data)
				res.view("Customer/list")
			})
	}
	/*exist: function(req, res, next) {
		var id = req.param("id")
		 Customer.findOne(id)
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	},
	create: function(req, res, next) {
		var params = req.params.all();
		Customer.create(params, function(err, data) {
			if (err) return next(err);
			res.redirect("Customer/list")
		});
	},
	destroy: function(req, res, next) {
		var id = req.param("id")
		 Customer.findOne(id)
				.exec(function(err, result) {
					if (err) res.serverError(err);
					if (!result) res.notFound();
						Customer.destroy(id, function (err) {
						if (err) return next (err);
						return res.redirect("Customer/list")
						//return res.json(result);
					});
				});
	},
	update: function (req, res, next) {
   	 var criteria = {};
    	criteria = _.merge({}, req.params.all(), req.body);
    	var id = req.param("id");
    	if (!id) {
       	 return res.badRequest("No id provided.");
    	}
    	Customer.update(id, criteria, function (err, data) {
       	 if(data.length === 0) return res.notFound();
        	if (err) return next(err);
			res.redirect("Customer/list")
        	//res.json(data);
    	})
	},
	list : function (req, res) {
		Customer.find()
			.exec(function(err, data){
				res.render("Customer/list", {data: JSON.stringify(data)})
			})
	}*/
};

