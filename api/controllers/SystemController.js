/**
 * SystemController
 *
 * @description :: Server-side logic for managing systems
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	topBar: function (req, res) {
		var myuser = {user: req.session.user, name: req.session.username}
		res.render("System/topBar", {user: myuser})
		//res.locals.user = {user: req.session.user}
		//res.render("System/topBar")
		
	}
};

