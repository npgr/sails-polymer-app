/**
* Function.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	//migrate: 'alter',
	
  attributes: {
	//_title: 'Funcion',
	//_delete: 'disabled',
	//_new: 'disabled',
	//_display: 'disabled',
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
	type: {
		//description: 'Type',
		type: 'string',
		required: true,
		enum: ['list','display','edit','new','delete','columns','download','print','ga','https','relic','pingdom']
		//,enumdes: ['List','Display','Edit','New','Delete','Columns', 'Download','Print','Analytics','Https','NewRelic','pingdom']
	}
//End Attributes
	,toJSON: function () {
      var obj = this.toObject();
	  delete obj.model.createdAt;
	  delete obj.model.updatedAt;
	  delete obj.model.title;
	  delete obj.createdAt;
	  delete obj.updatedAt;

      return obj;
    }
  }
};

