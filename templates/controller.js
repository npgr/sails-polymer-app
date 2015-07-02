/************  Routes:  config/routes.js ************/

"post /Matheads/destroy/:id?": "MatheadsController.destroy",
"post /Matheads/update/:?": "MatheadsController.update",
"/Matheads/exist/:": "MatheadsController.exist"

/********** Controller: api/controllers/<<model_name>>Controller.js *******/

	exist: function(req, res, next) {
		var  = req.param("")
		Matheads.findOneBy()
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	},
	create: function(req, res, next) {
		var params = req.params.all();
		Matheads.create(params, function(err, data) {
			if (err) return next(err);
			res.redirect("Matheads/list")
		});
	},
	destroy: function(req, res, next) {
		var id = req.param("id")
		Matheads.findOneBy()
				.exec(function(err, result) {
					if (err) res.serverError(err);
					if (!result) res.notFound();
						Matheads.destroy(id, function (err) {
						if (err) return next (err);
						return res.redirect("Matheads/list")
						//return res.json(result);
					});
				});
	},
	update: function (req, res, next) {
   	 var criteria = {};
    	criteria = _.merge({}, req.params.all(), req.body);
    	var  = req.param("");
    	if (!) {
       	 return res.badRequest("No id provided.");
    	}
    	Matheads.update(, criteria, function (err, data) {
       	 if(data.length === 0) return res.notFound();
        	if (err) return next(err);
			res.redirect("Matheads/list")
        	//res.json(data);
    	})
	},
	list : function (req, res) {
		Matheads.find()
			.exec(function(err, data){
				res.render("Matheads/list", {data: JSON.stringify(data)})
			})
	}
