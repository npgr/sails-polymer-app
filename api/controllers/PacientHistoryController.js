/**
 * PacientHistoryController
 *
 * @description :: Server-side logic for managing Pacienthistories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	list : function (req, res) {
		res.locals.resources = req.session.resources
		res.locals.user = {user: req.session.user, name: req.session.username}
		res.locals.data = []
		res.locals.pacient = JSON.stringify(req.body)
		res.view("PacientHistory/list")
	}
};

