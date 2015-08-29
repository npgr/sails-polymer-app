/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	list: function (req, res) {
		Task.find({user: req.session.userid})
			.exec(function(err, data){
				res.locals.user = {user: req.session.user, name: req.session.username}
				res.locals.data = JSON.stringify(data)
				res.view("Task/list")
			})
	},
	get: function(req, res) {
		Task.find({user: req.session.userid})
			.exec(function(err, data){
				res.json(data)
			})
	},
	create: function(req, res, next) {
		var params = req.params.all();
		params.user = req.session.userid
		Task.create(params, function(err, data) {
			if (err) return next(err);
			return res.json(data)
			//return next()
		});
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

