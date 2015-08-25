
/************  Routes:  config/routes.js ************/

"/User/exist/:id": "UserController.exist"

/********** Controller: api/controllers/<<model_name>>Controller.js *******/

	exist: function(req, res, next) {
		var id = req.param("id")
		 User.findOne(id)
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	}
	/*, display: function(req, res) {
		res.view("User/display")
	},
	new: function (req, res) {
		res.view("User/new")
	},
	edit: function (req, res) {
		res.view("User/edit")
	},
	delete: function (req, res) {
		res.view("User/delete")
	},
	columns: function (req, res) {
		res.view("User/columns")
	},*/
	,select: function (req, res) {
		res.view("User/select")
	},
	list : function (req, res) {
		User.find()
			.exec(function(err, data){
				res.render("User/list", {data: JSON.stringify(data)})
			})
	}
	/*,byfield: function(req, res) {
		User.query('SELECT field, count(*) FROM User group by field order by count desc', function(err, data) {
			if (err) return res.serverError(err);
			//return res.ok(results);
			return res.json(data.rows)
		});
	}*/
