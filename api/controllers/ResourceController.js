/**
 * ResourceController
 *
 * @description :: Server-side logic for managing resources
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	display: function(req, res) {
		res.render("Resource/display")
	},
	new: function (req, res) {
		res.render("Resource/new")
	},
	edit: function (req, res) {
		res.render("Resource/edit")
	},
	delete: function (req, res) {
		res.render("Resource/delete")
	},
	columns: function (req, res) {
		res.render("Resource/columns")
	},
	select: function (req, res) {
		res.render("Resource/select")
	},
	list : function (req, res) {
		Resource.find()
			.exec(function(err, data){
				res.render("Resource/list", {data: JSON.stringify(data)})
			})
	}
};

