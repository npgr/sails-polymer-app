 /**
* Category.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	//migrate: "alter",
  attributes: {
	//_title: 'Product Category',
	//_card_width: '60em',
	id: {
		//description: 'Id',
		type: "integer",
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		//description: 'Category',
		type: "string",
		required: true
	}
//End Attributes
  }
};