/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	list : function (req, res) {
				res.locals.resources = req.session.resources
				res.locals.user = {user: req.session.user, name: req.session.username}
				res.locals.data = []
				res.view("Order/list")
	},
	salesCube: function(req, res) {
		Order.query('select c.name as seller, d.name as customer, e.name as product, b.quantity as units, (b.quantity * b.price) as amount from "order" a, orderdetail b, seller c, customer d, product e where a.id = b.order and a.seller=c.id and a.customer = d.id and b.product=e.id and date >= \'2015-09-01\' and date <= \'2015-09-30\'', function(err, data) {
			if (err) return res.serverError(err);
			//return res.ok(results);
			return res.json(data.rows)
		});
	},
	salesbyCustomer: function(req, res) {
		Order.query('select a.customer, c.name, sum(b.quantity) as units, sum(b.quantity * price) as amount from "order" a, orderdetail b, customer c where a.id = b.order and a.customer=c.id and date >= \'2015-09-01\' and date <= \'2015-09-30\' group by a.customer, c.name', function(err, data) {
			if (err) return res.serverError(err);
			//return res.ok(results);
			return res.json(data.rows)
		});
	},
	salesbySeller: function(req, res) {
		Order.query('select a.seller, c.name, sum(b.quantity) as units, sum(b.quantity * price) as amount from "order" a, orderdetail b, seller c where a.id = b.order and a.seller=c.id and date >= \'2015-09-01\' and date <= \'2015-09-30\' group by a.seller, c.name', function(err, data) {
			if (err) return res.serverError(err);
			//return res.ok(results);
			return res.json(data.rows)
		});
	}
};

