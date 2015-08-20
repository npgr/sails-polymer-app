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
	list : function (req, res) {
		//User.find()
			//.exec(function(err, data){
				//res.render("User/list", {data: JSON.stringify(data)})
				res.render("User/list", {data: []})
		//})
	}
};

