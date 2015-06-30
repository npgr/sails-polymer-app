/************  Routes ************/
"post /Matheads/destroy/:id?": "MatheadsController.destroy",
"post /Matheads/update/:matnr?": "MatheadsController.update",
"/Matheads/exist/:matnr": "MatheadsController.exist"

/********** Controller *******/
	exist: function(req, res, next) {
		var matnr = req.param("matnr")
		Matheads.findOneBymatnr(matnr)
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
		Matheads.findOneBymatnr(matnr)
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
    	var matnr = req.param("matnr");
    	if (!matnr) {
       	 return res.badRequest("No id provided.");
    	}
    	Matheads.update(matnr, criteria, function (err, data) {
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
}
