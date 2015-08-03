/**
 * ModelController
 *
 * @description :: Server-side logic for managing models
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	exist: function(req, res, next) {
		var id = req.param("id")
		 Model.findOne(id)
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	}
	
};

