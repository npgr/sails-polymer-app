/**
 * CustomerCategoryController
 *
 * @description :: Server-side logic for managing Customercategories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	list : function (req, res) {
		CustomerCategory.find()
			.exec(function(err, data){
				res.locals.resources = req.session.resources
				res.locals.user = {user: req.session.user, name: req.session.username}
				res.locals.data = JSON.stringify(data)
				res.view("CustomerCategory/list")
			})
	}
};

