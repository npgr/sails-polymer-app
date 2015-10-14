/**
* ProductSubCategory.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {


	//migrate: "alter",
  attributes: {
	//_title: 'Product SubCategory',
	//_card_width: '60em',
	//_btn_left: '30px',
	//_ga: 'enabled',
	id: {
		//description: 'Id',
		type: "integer",
		primaryKey: true,
		autoIncrement: true
	},
	category: {
		//description: 'Category',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'ProductCategory'
	},
	name: {
		//description: 'SubCategory',
		type: "string",
		required: true
	}
//End Attributes
  }
};

