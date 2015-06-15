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
	new : function (req, res) {
		res.render('Matheads/new')
	},
	edit : function (req, res) {
		//http://localhost:1337/matheads/edit?matnr=200
		var matnr = req.param('matnr')
		Matheads.findOneByMatnr(matnr)
				.exec(function(err, data){
					if (err) res.end(err)
					if (data) res.render('Matheads/edit', data)
						else res.end('Material '+matnr+' does not exist')
				})
	},
	display : function (req, res) {
		//http://localhost:1337/matheads/display?matnr=200
		var matnr = req.param('matnr')
		Matheads.findOneByMatnr(matnr)
				.exec(function(err, data){
					if (err) res.end(err)
					if (data) res.render('Matheads/display', data)
						else res.end('Material '+matnr+' does not exist')
				})
	},
	delete : function (req, res) {
		//http://localhost:1337/matheads/delete?matnr=200
		var matnr = req.param('matnr')
		Matheads.findOneByMatnr(matnr)
				.exec(function(err, data){
					if (err) res.end(err)
					if (data) res.render('Matheads/delete', data)
						else res.end('Material '+matnr+' does not exist')
				})
	},
	list : function (req, res) {
		res.end('Not Implemented Yet')
		//res.render('Matheads/list', data)
	},
};

