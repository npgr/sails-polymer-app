/**
 * OrderDetailController
 *
 * @description :: Server-side logic for managing orderdetails
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	list : function (req, res) {
		//console.log("Header data: ",req.headers['app-post-data'])		
		res.locals.resources = req.session.resources
		res.locals.user = {user: req.session.user, name: req.session.username}
		res.locals.data = []
		res.locals.order = JSON.stringify(req.body)
		res.view("OrderDetail/list")
	}
};

