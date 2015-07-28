
/************  Routes:  config/routes.js ************/

"/Category/exist/:id": "CategoryController.exist"

/********** Controller: api/controllers/<<model_name>>Controller.js *******/

	exist: function(req, res, next) {
		var id = req.param("id")
		 Category.findOne(id)
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	},
	list : function (req, res) {
		Category.find()
			.exec(function(err, data){
				res.render("Category/list", {data: JSON.stringify(data)})
			})
	}
