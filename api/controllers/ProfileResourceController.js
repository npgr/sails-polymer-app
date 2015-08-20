/**
 * ProfileResourceController
 *
 * @description :: Server-side logic for managing profileresources
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	display: function(req, res) {
		res.render("ProfileResource/display")
	},
	new: function (req, res) {
		res.render("ProfileResource/new")
	},
	edit: function (req, res) {
		res.render("ProfileResource/edit")
	},
	delete: function (req, res) {
		res.render("ProfileResource/delete")
	},
	columns: function (req, res) {
		res.render("ProfileResource/columns")
	},
	select: function (req, res) {
		res.render("ProfileResource/select")
	},
	list : function (req, res) {
		ProfileResource.find()
			.exec(function(err, data){
				res.render("ProfileResource/list", {data: JSON.stringify(data)})
			})
	}
};

