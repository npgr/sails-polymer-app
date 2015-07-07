
/************  Routes:  config/routes.js ************/

"/Matheads/exist/:matnr": "MatheadsController.exist"

/********** Controller: api/controllers/<<model_name>>Controller.js *******/

	exist: function(req, res, next) {
		var matnr = req.param("matnr")
		 Matheads.findOneByMatnr(matnr) 
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	},
	list : function (req, res) {
		Matheads.find()
			.exec(function(err, data){
				res.render("Matheads/list", {data: JSON.stringify(data)})
			})
	}
