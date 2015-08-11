/**
* FunctionAttribute.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	migrate: 'alter',
  attributes: {
	//_title: 'Funcion Attributes',
	id: {
		//description: 'Id',
		//hide: true,
		type: 'integer',
		primaryKey: true,
		unique: true,
		autoIncrement: true
	},
	model: {
		//description: 'Model',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'Model'
	},
	functionx: {
		//description: 'Function',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'ModelFunction'
	},
	attribute: {
		//description: 'Attribute',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'Attribute'
	},
	display: {
		//description: 'Attribute',
		type: 'string',
		enum: ['Yes', 'ReadOnly', 'No']
		//,enumdes: ['Yes', 'ReadOnly', 'No']
	}
//End Attributes
	/*,toJSON: function () {
      var obj = this.toObject();

      var func = {id: obj.functionx.id, name: obj.functionx.name, model: obj.functionx.model }
	  var attr = {id: obj.attribute.id, name: obj.attribute.attribute, model: obj.attribute.model }
	  
	  delete obj.functionx;
	  delete obj.attribute;
	  delete obj.createdAt;
	  delete obj.updatedAt;
	  
	  obj.functionx = func
	  obj.attribute = attr

      return obj;
    }*/
  }
};

