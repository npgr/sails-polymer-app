/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	exist: function(req, res, next) {
		var usr = req.param("usr")
		 User.findOneByUsr(usr) 
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	}
	, display: function(req, res) {
		res.render("User/display")
	},
	new: function (req, res) {
		res.render("User/new")
	},
	edit: function (req, res) {
		res.render("User/edit")
	},
	delete: function (req, res) {
		res.render("User/delete")
	},
	columns: function (req, res) {
		res.render("User/columns")
	},
	select: function (req, res) {
		res.render("User/select")
	},
	login: function(req, res) {
		if (req.session.flash) 
		{ 
			res.locals.flash = _.clone(req.session.flash)
			//res.locals.flash = _.clone(req.session.flash)
			req.session.flash = {}
		}
		  else  res.locals.flash = {}
		res.render("User/login")
	},
	validateLogin: function(req, res) {
		User.findOneByUsr(req.body.username)
			.exec(function(err, data) {
				if(err) res.json({ "error": err})
				  else if (data) {
					if (data.pwd== req.body.password)
					{
						req.session.user = req.body.username
						req.session.username = data.name
						res.redirect('Task/list');
					}
					else
					{
						req.session.flash = { err: 'username or password incorrect'}
						res.redirect('login')
					}	
				  }
					else 
				  {
					req.session.flash = { err: 'username or password incorrect'}
					res.redirect('login')
				  }	
			})
	},
	list : function (req, res) {
		//User.find()
			//.exec(function(err, data){
				//res.render("User/list", {data: JSON.stringify(data)})
				//res.render("User/list", {data: []})
				res.locals.data = []
				res.render("User/list")
		//})
	}
};

