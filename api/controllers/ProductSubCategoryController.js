/**
 * ProductSubCategoryController
 *
 * @description :: Server-side logic for managing Productsubcategories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	list : function (req, res) {
	//	ProductSubCategory.find()
	//		.exec(function(err, data){
				res.locals.resources = req.session.resources
				res.locals.user = {user: req.session.user, name: req.session.username}
	//			res.locals.data = JSON.stringify(data)
				res.locals.data = []
				res.view("ProductSubCategory/list")
	//		})
	}
};

