
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
	}
	/*, display: function(req, res) {
		res.view("Task/display")
	},
	new: function (req, res) {
		res.view("Task/new")
	},
	edit: function (req, res) {
		res.view("Task/edit")
	},
	delete: function (req, res) {
		res.view("Task/delete")
	},
	columns: function (req, res) {
		res.view("Task/columns")
	},*/
	,select: function (req, res) {
		res.view("Task/select")
	},
	list : function (req, res) {
		Task.find()
			.exec(function(err, data){
				res.locals.user = {user: req.session.user, name: req.session.username}
				res.locals.data = JSON.stringify(data)
				res.view("Task/list")
			})
	}
	/*,byfield: function(req, res) {
		Task.query('SELECT field, count(*) FROM Task group by field order by count desc', function(err, data) {
			if (err) return res.serverError(err);
			//return res.ok(results);
			return res.json(data.rows)
		});
	}*/
