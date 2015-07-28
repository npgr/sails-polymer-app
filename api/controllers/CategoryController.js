/**
 * CategoryController
 *
 * @description :: Server-side logic for managing Categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	exist: function(req, res, next) {
		var id = req.param("id")
		 Category.findOne(id)
			.exec(function(err, data) {
				if(err) res.json({ "exist": "error"})
				  else if (!data) res.json({ "exist": false})
					else res.json({ "exist": true})
			})
	},
	list : function (req, res) {
		Category.find()
			.exec(function(err, data){
				res.render("Category/list", {data: JSON.stringify(data)})
			})
	}
};

