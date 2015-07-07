/**
 * EnumeratorController
 *
 * @description :: Server-side logic for managing Enumerators
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	exist: function(req, res, next) {
		var model = req.param("model")
		 Enumerator.findOneByModel(model) 
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	},
	/*create: function(req, res, next) {
		var params = req.params.all();
		Enumerator.create(params, function(err, data) {
			if (err) return next(err);
			res.redirect("Enumerator/list")
		});
	},
	destroy: function(req, res, next) {
		var id = req.param("id")
		 Enumerator.findOneByModel(id) 
				.exec(function(err, result) {
					if (err) res.serverError(err);
					if (!result) res.notFound();
						Enumerator.destroy(id, function (err) {
						if (err) return next (err);
						return res.redirect("Enumerator/list")
						//return res.json(result);
					});
				});
	},
	update: function (req, res, next) {
   	 var criteria = {};
    	criteria = _.merge({}, req.params.all(), req.body);
    	var model = req.param("model");
    	if (!model) {
       	 return res.badRequest("No id provided.");
    	}
    	Enumerator.update(model, criteria, function (err, data) {
       	 if(data.length === 0) return res.notFound();
        	if (err) return next(err);
			res.redirect("Enumerator/list")
        	//res.json(data);
    	})
	},*/
	list : function (req, res) {
		Enumerator.find()
			.exec(function(err, data){
				if (err) return next(err);
				res.render("Enumerator/list", {data: JSON.stringify(data)})
		})
	}
};

