/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	exist: function(req, res, next) {
		var id = req.param("id")
		 Product.findOne(id)
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	}/*, 
	create: function(req, res, next) {
		var params = req.params.all();
		Product.create(params, function(err, data) {
			if (err) return next(err);
			res.redirect("Product/list")
		});
	},
	destroy: function(req, res, next) {
		var id = req.param("id")
		 Product.findOne(id)
				.exec(function(err, result) {
					if (err) res.serverError(err);
					if (!result) res.notFound();
						Product.destroy(id, function (err) {
						if (err) return next (err);
						return res.redirect("Product/list")
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
    	Product.update(id, criteria, function (err, data) {
       	 if(data.length === 0) return res.notFound();
        	if (err) return next(err);
			res.redirect("Product/list")
        	//res.json(data);
    	})
	},
	list : function (req, res) {
		Product.find()
			.exec(function(err, data){
				res.render("Product/list", {data: JSON.stringify(data)})
			})
	}*/
};

