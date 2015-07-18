
/************  Routes:  config/routes.js ************/

"/Task/exist/:id": "TaskController.exist"

/********** Controller: api/controllers/<<model_name>>Controller.js *******/

	exist: function(req, res, next) {
		var id = req.param("id")
		 Task.findOne(id)
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	},
	list : function (req, res) {
		Task.find()
			.exec(function(err, data){
				res.render("Task/list", {data: JSON.stringify(data)})
			})
	}
