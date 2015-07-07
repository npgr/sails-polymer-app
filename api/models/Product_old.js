/**
* Matheads.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	migrate: 'alter',
	
  attributes: {
	//_title: 'Material - MATHEADS',
	id: {
		//description: 'Id',
		type: "integer",
		max: 999999,
		min: 10,
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	name: {
		//description: 'Nombre',
		type: 'string',
		required: true
	},
	stock: {
		//description: 'Existencia',
		type: 'integer'
	},
	price: {
		//description: 'Precio',
		type: 'float'
	},
	status: {
		//description: 'Status',
		type: 'string',
		enum: ['A', 'B', 'I']
		//,enumdes: ['Activo', 'Bloqueado', 'Inactivo']
	}/*,
	beforeCreate : function(item, cb){
        item.price = 10
		console.log('exito')
		//cb()
		//Auto increment 
        Enumerator.findOneby({"model_name": incModel}).exec(function(err, counter){
            if (err) return err;
            if(counter){
                var newAmount = counter.amount + 1;
                counter.amount = newAmount;

                counter.save(function(err, c){
                    //Error handling...
                    item.id = newAmount;
                    cb();
                });
            }else{
                cb();
            }
        });
    }*/
  }
};

