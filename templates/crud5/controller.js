
/************  Routes:  config/routes.js ************/

"/Attribute/exist/:id": "AttributeController.exist"

/********** Controller: api/controllers/<<model_name>>Controller.js *******/

	exist: function(req, res, next) {
		var id = req.param("id")
		 Attribute.findOne(id)
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	}/*,
	list : function (req, res) {
		Attribute.find()
			.exec(function(err, data){
				res.render("Attribute/list", {data: JSON.stringify(data)})
			})
	}*/
