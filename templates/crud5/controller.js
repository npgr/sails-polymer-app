
/************  Routes:  config/routes.js ************/

"/Product/exist/:id": "ProductController.exist"

/********** Controller: api/controllers/<<model_name>>Controller.js *******/

	exist: function(req, res, next) {
		var id = req.param("id")
		 Product.findOne(id)
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	},
	list : function (req, res) {
		Product.find()
			.exec(function(err, data){
				res.render("Product/list", {data: JSON.stringify(data)})
			})
	}
