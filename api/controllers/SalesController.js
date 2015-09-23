/**
 * SalesController
 *
 * @description :: Server-side logic for managing sales
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	Dashboard: function(req, res) {
		res.locals.resources = req.session.resources
 		res.locals.user = {user: req.session.user, name: req.session.username}
 		res.locals.data = []
		res.view("Sales/Dashboard")
	},
	Cube: function(req, res) {
		// Seller, Customer, Product
		// Add SalesRegion & CustomerCategory & ProductCategory
		var sql = 'select c.name as seller, d.name as customer, f.name as region, g.name as custcategory, e.name as product, h.name as prodcategory, sum(b.quantity) as units, sum(b.quantity * b.price) as amount, avg(b.price) as priceavg from "order" a ,orderdetail b, seller c, customer d, product e, salesregion f, customercategory g, productcategory h where date >= \'2015-09-01\' and date <= \'2015-09-30\' and a.id = b.order and a.seller=c.id and a.customer = d.id and b.product=e.id and d.salesregion = f.id and d.category=g.id and e.category=h.id group by c.name, d.name, e.name, f.name, g.name, h.name'
		
		Order.query(sql, function(err, data) {
			if (err) return res.serverError(err);
			//return res.ok(results);
			//return res.json(data.rows)

			var dato = {items: []}
			for (i=0; i < data.rows.length; i++)
				dato.items.push(data.rows[i])
	
			var convert = require('data2xml')();

			res.set('Content-Type', 'text/xml');		
			return res.end(convert('top',dato));
		})
	},
	byRegionCustCategory: function(req, res) {
		var sql = 'select d.name as region, e.name as category, sum(b.quantity) as units, sum(b.quantity * b.price) as amount, avg(b.price) as priceavg from "order" a, orderdetail b, customer c, salesregion d, customercategory e where date >= \'2015-09-01\' and date <= \'2015-09-30\' and a.id = b.order and a.customer = c.id and c.salesregion = d.id and c.category=e.id group by d.name, e.name'
		
		Order.query(sql, function(err, data) {
			if (err) return res.serverError(err);
			return res.json(data.rows)
		})
	},
	byProdCategory: function(req, res) {
		var sql = 'select d.name as category,sum(b.quantity) as units, sum(b.quantity * b.price) as amount,avg(b.price) as priceavg from "order" a, orderdetail b, product c, productcategory d where date >= \'2015-09-01\' and date <= \'2015-09-30\' and a.id = b.order and b.product = c.id and c.category = d.id group by d.name'
		
		Order.query(sql, function(err, data) {
			if (err) return res.serverError(err);
			return res.json(data.rows)
		})
	},
	byCustomer: function(req, res) {
		var sql = 'select c.id, c.code, c.name as customer, d.name as region, e.name as category, sum(b.quantity) as units, sum(b.quantity * b.price) as amount, avg(b.price) as priceavg from "order" a, orderdetail b, customer c, salesregion d, customercategory e where date >= \'2015-09-01\' and date <= \'2015-09-30\' and a.id = b.order and a.customer = c.id and c.salesregion = d.id and c.category=e.id group by c.id, c.code, c.name, d.name, e.name'
	
		Order.query(sql, function(err, data) {
			if (err) return res.serverError(err);
			//return res.ok(results);
			return res.json(data.rows)
		});
	},
	bySeller: function(req, res) {
		var sql = 'select a.seller, c.name, sum(b.quantity) as units, sum(b.quantity * price) as amount from "order" a, orderdetail b, seller c where a.id = b.order and a.seller=c.id and date >= \'2015-09-01\' and date <= \'2015-09-30\' group by a.seller, c.name'
		
		Order.query(sql, function(err, data) {
			if (err) return res.serverError(err);
			//return res.ok(results);
			return res.json(data.rows)
		});
	}
};

