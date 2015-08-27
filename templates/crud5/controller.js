
/************  Routes:  config/routes.js ************/

"/Profile/exist/:id": "ProfileController.exist",
"/Profile/list": "ProfileController.list"

/********** Controller: api/controllers/<<model_name>>Controller.js *******/

	exist: function(req, res, next) {
		var id = req.param("id")
		 Profile.findOne(id)
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	}
	/*, display: function(req, res) {
		res.view("Profile/display")
	},
	new: function (req, res) {
		res.view("Profile/new")
	},
	edit: function (req, res) {
		res.view("Profile/edit")
	},
	delete: function (req, res) {
		res.view("Profile/delete")
	},
	columns: function (req, res) {
		res.view("Profile/columns")
	},*/
	list : function (req, res) {
		Profile.find()
			.exec(function(err, data){
				res.locals.user = {user: req.session.user, name: req.session.username}
				res.locals.data = JSON.stringify(data)
				res.view("Profile/list")
			})
	}
	/*,byfield: function(req, res) {
		Profile.query('SELECT field, count(*) FROM Profile group by field order by count desc', function(err, data) {
			if (err) return res.serverError(err);
			//return res.ok(results);
			return res.json(data.rows)
		});
	}*/
