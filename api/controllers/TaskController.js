/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	exist: function(req, res, next) {
		var id = req.param("id")
		 Task.findOne(id)
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	},
	/*display: function(req, res) {
		res.render("Task/display")
		//res.view("Task/display")
	},
	new: function (req, res) {
		res.render("Task/new")
	},
	edit: function (req, res) {
		res.render("Task/edit")
	},
	delete: function (req, res) {
		res.render("Task/delete")
	},
	columns: function (req, res) {
		res.render("Task/columns")
	},*/
	select: function (req, res) {
		res.view("Task/select")
	},
	list : function (req, res) {
		Task.find()
			.exec(function(err, data){
				res.locals.user = {user: req.session.user, name: req.session.username}
				res.locals.data = JSON.stringify(data)
				res.view("Task/list")
			})
	},
	bytype: function(req, res) {
		Task.query('SELECT type, count(*) FROM task group by type order by count desc', function(err, data) {
			if (err) return res.serverError(err);
			//return res.ok(results);
			return res.json(data.rows)
		});
	},
	bystatus: function(req, res) {
		Task.query('SELECT status, count(*) FROM task group by status order by count desc', function(err, data) {
			if (err) return res.serverError(err);
			//return res.ok(results);
			return res.json(data.rows)
		});
	},
	byprioridad: function(req, res) {
		Task.query('SELECT prioridad, count(*) FROM task group by prioridad order by count desc', function(err, data) {
			if (err) return res.serverError(err);
			//return res.ok(results);
			return res.json(data.rows)
		});
	},
	byrequester: function(req, res) {
		Task.query('SELECT requester, count(*) FROM task group by requester order by count desc', function(err, data) {
			if (err) return res.serverError(err);
			//return res.ok(results);
			return res.json(data.rows)
		});
	},
	byresponsable: function(req, res) {
		Task.query('SELECT responsable, count(*) FROM task group by responsable order by count desc', function(err, data) {
			if (err) return res.serverError(err);
			//return res.ok(results);
			return res.json(data.rows)
		});
	}
};

