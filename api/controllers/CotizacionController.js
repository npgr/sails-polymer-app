/**
 * CotizacionController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	cotizar: function (req, res) {
		Prima.find()
			.exec(function(err, data){
				res.locals.resources = req.session.resources
				res.locals.user = {user: req.session.user, name: req.session.username}
				for (i=0; i < data.length; i++)
				{
					delete data[i].id
					delete data[i].createdAt
					delete data[i].updatedAt
				}
				res.locals.data = JSON.stringify(data)
		//		res.locals.data = []
				res.view("Cotizacion/cotizar")
			})
	}
};

