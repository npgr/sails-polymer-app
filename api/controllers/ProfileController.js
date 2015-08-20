/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	display: function(req, res) {
		res.render("Profile/display")
	},
	new: function (req, res) {
		res.render("Profile/new")
	},
	edit: function (req, res) {
		res.render("Profile/edit")
	},
	delete: function (req, res) {
		res.render("Profile/delete")
	},
	columns: function (req, res) {
		res.render("Profile/columns")
	},
	select: function (req, res) {
		res.render("Profile/select")
	},
	list : function (req, res) {
		Profile.find()
			.exec(function(err, data){
				res.render("Profile/list", {data: JSON.stringify(data)})
			})
	}
};

