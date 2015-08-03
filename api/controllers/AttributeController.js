/**
 * AttributeController
 *
 * @description :: Server-side logic for managing attributes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	exist: function(req, res, next) {
		/*var model = req.param("model")
		 Attribute.findOneByModel(model) 
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})*/
		res.json({ "exist": false})
	}
	
};

