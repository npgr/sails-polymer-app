/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	select: function (req, res) {
		res.view("User/select")
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
	signout: function(req, res) {
		req.session.user = null
		res.redirect("/login")
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
						req.session.flash = { err: req.__('Username or Password incorrect')}
						res.redirect('login')
					}	
				  }
					else 
				  {
					req.session.flash = { err: req.__('Username or Password incorrect')}
					res.redirect('login')
				  }	
			})
	},
	list : function (req, res) {
		//User.find()
 			//.exec(function(err, data){
 				res.locals.user = {user: req.session.user, name: req.session.username}
 				res.locals.data = []
				res.view("User/list")
 			//})
 	}
};

