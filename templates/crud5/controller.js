
/************  Routes:  config/routes.js ************/

"/ProfileResource/exist/:id": "ProfileResourceController.exist",
"/ProfileResource/list": "ProfileResourceController.list"

/********** Controller: api/controllers/<<model_name>>Controller.js *******/

	exist: function(req, res, next) {
		var id = req.param("id")
		 ProfileResource.findOne(id)
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	}
	/*, display: function(req, res) {
		res.view("ProfileResource/display")
	},
	new: function (req, res) {
		res.view("ProfileResource/new")
	},
	edit: function (req, res) {
		res.view("ProfileResource/edit")
	},
	delete: function (req, res) {
		res.view("ProfileResource/delete")
	},
	columns: function (req, res) {
		res.view("ProfileResource/columns")
	},*/
	list : function (req, res) {
		ProfileResource.find()
			.exec(function(err, data){
				res.locals.resources = req.session.resources
				res.locals.user = {user: req.session.user, name: req.session.username}
				res.locals.data = JSON.stringify(data)
				res.view("ProfileResource/list")
			})
	}
	/*,byfield: function(req, res) {
		ProfileResource.query('SELECT field, count(*) FROM ProfileResource group by field order by count desc', function(err, data) {
			if (err) return res.serverError(err);
			//return res.ok(results);
			return res.json(data.rows)
		});
	}*/
