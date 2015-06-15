/**
 * MatheadsController
 *
 * @description :: Server-side logic for managing matheads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	def : function (req, res) {
		res.json(Matheads._attributes)
	},
	createForm : function (req, res) {
		res.render('Matheads/create')
	},
	changeForm : function (req, res) {
		//http://localhost:1337/matheads/changeForm?matnr=200
		var matnr = req.param('matnr')
		Matheads.findOneByMatnr(matnr)
				.exec(function(err, data){
					res.render('Matheads/change', data)
				})
	},
	display : function (req, res) {
		//res.render('Matheads/display', data)
	},
	list : function (req, res) {
		//res.render('Matheads/list', data)
	},
};

