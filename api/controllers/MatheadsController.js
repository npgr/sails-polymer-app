/**
 * MatheadsController
 *
 * @description :: Server-side logic for managing matheads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	prueba: function (req, res, next) {
		var id = req.param('id');
		var id2 = req.param('id2')
		res.end(id+' + '+id2)
	},
	def : function (req, res) {
		res.json(Matheads._attributes)
	},
	exist: function(req, res, next) {
		var matnr = req.param('matnr');
		Matheads.findOneByMatnr(matnr)
				.exec(function(err, data) {
					if(err) res.json({ 'exist': 'error'})
					  else if (!data) res.json({ 'exist': false})
						else res.json({ 'exist': true})
				})
	},
	create: function(req, res, next) {
		var params = req.params.all();
		Matheads.create(params, function(err, data) {
			if (err) return next(err);
			res.redirect('Matheads/list')
		});
	},
	destroy: function(req, res, next) {
		var id = req.param('id')
		Matheads.findOneByMatnr(id)
				.exec(function(err, result) {
					if (err) res.serverError(err);
					if (!result) res.notFound();
					Matheads.destroy(id, function (err) {
						if (err) return next (err);
						return res.redirect('Matheads/list')
						//return res.json(result);
					});
				});
	},
	update: function (req, res, next) {
        var criteria = {};
        criteria = _.merge({}, req.params.all(), req.body);
        var matnr = req.param('matnr');
        if (!matnr) {
            return res.badRequest('No id provided.');
        }
        Matheads.update(matnr, criteria, function (err, data) {
            if(data.length === 0) return res.notFound();
            if (err) return next(err);
			res.redirect('Matheads/list')
            //res.json(data);
        })
    },
	new : function (req, res) {
		res.render('Matheads/new')
	},
	edit : function (req, res) {
		//http://localhost:1337/matheads/edit?matnr=200
		var matnr = req.param('matnr')
		Matheads.findOneByMatnr(matnr)
				.exec(function(err, data){
					if (err) res.end(err)
					if (data) res.render('Matheads/edit', data)
						else res.end('Material '+matnr+' does not exist')
				})
	},
	display : function (req, res) {
		//http://localhost:1337/matheads/display?matnr=200
		var matnr = req.param('matnr')
		Matheads.findOneByMatnr(matnr)
				.exec(function(err, data){
					if (err) res.end(err)
					if (data) res.render('Matheads/display', data)
						else res.end('Material '+matnr+' does not exist')
				})
	},
	delete : function (req, res) {
		//http://localhost:1337/matheads/delete?matnr=200
		var matnr = req.param('matnr')
		Matheads.findOneByMatnr(matnr)
				.exec(function(err, data){
					if (err) res.end(err)
					if (data) res.render('Matheads/delete', data)
						else res.end('Material '+matnr+' does not exist')
				})
	},
	list : function (req, res) {
		//res.end('Not Implemented Yet')
		Matheads.find()
				.exec(function(err, data){
					res.render('Matheads/list', {data: JSON.stringify(data)})			
				})
	}
};

