/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	list: function (req, res) {
		//Task.find({user: req.session.userid})
		//	.exec(function(err, data){
				res.locals.resources = req.session.resources
				res.locals.user = {user: req.session.user, name: req.session.username}
		//		res.locals.data = JSON.stringify(data)
				res.locals.data = []
				res.view("Task/list")
		//	})
	},
	getStatusDes: function(req, status) {
		switch(status) {
			case "p": return req.__("Pending") 
			case "l": return req.__("Planning")
			case "e": return req.__("Working on")
			case "s": return req.__("Stand by")
			case "c": return req.__("Certificate")
			case "x": return req.__("Close")
			default: return ''
		}
	}, 
	getPriorityDes: function(req, priority) {
		switch(priority) {
			case "b": return req.__("Low") 
			case "m": return req.__("Medium")
			case "a": return req.__("Hight")
			case "c": return req.__("Critic")
			default: return ''
		}
	},
	getTypeDes: function(req, type) {
		switch(type) {
			case "i": return req.__("Incident") 
			case "t": return req.__("Task")
			case "p": return req.__("Project")
			case "c": return req.__("Change")
			default: return ''
		}
	},
	get: function(req, res) {
		Task.find({user: req.session.userid})
			.populate('parent')
			.exec(function(err, data){
				var status_des = ''
				var parent = {}
				//console.log('data: ', data)
				for (i=0; i < data.length; i++) 
				{
					if (data[i].parent)
					{
						parent = {}
						parent.id = data[i].parent.id
						parent.activity = data[i].parent.activity
	 
						delete data[i].parent

						data[i].parent = parent
					}
				  data[i].status_des = sails.controllers.task.getStatusDes(req, data[i].status)
				  data[i].prioridad_des = sails.controllers.task.getPriorityDes(req, data[i].prioridad)
				  data[i].type_des = sails.controllers.task.getTypeDes(req, data[i].type)
				}
				return res.json(data)
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
	dashboard: function(req, res) {
		res.locals.resources = req.session.resources
 		res.locals.user = {user: req.session.user, name: req.session.username}
 		res.locals.data = []
		res.view("Task/Dashboard")
	},
	getMes: function(params) {
		var date = new Date()
		var mes = date.getMonth() + 1
		var ano = date.getFullYear();
		if (params.mes) mes = Number(params.mes)
		if (params.ano) ano = Number(params.ano)
		
		var dia = 31
		if (mes == 4 || mes == 6 || mes == 9 || mes == 11)  
			dia = 30
		if (mes == 2)
		  if (ano % 4 != 0)
			dia = 28
		  else
			dia = 29

		return {ini: ano+'-'+mes+'-01', fin: ano+'-'+mes+'-'+dia}
	},
	cube: function(req, res) {
		
		var mes = sails.controllers.task.getMes(req.params.all())
		
		//console.log('Mes: ', mes)
		
		var sql = 'select type, status, prioridad as priority, responsable, count(*) as n from task a  where requestd >= \''+mes.ini+'\' and requestd <= \''+mes.fin+'\' and a.user = '+req.session.userid+' group by type, status, prioridad, Responsable' 
		
		Task.query(sql, function(err, data) {
			if (err) return res.serverError(err);
			for (i=0; i < data.rows.length; i++)
			{
				data.rows[i].status = sails.controllers.task.getStatusDes(req, data.rows[i].status)
				data.rows[i].priority = sails.controllers.task.getPriorityDes(req, data.rows[i].priority)
				data.rows[i].type = sails.controllers.task.getTypeDes(req, data.rows[i].type)
			}
			return res.json(data.rows)
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

