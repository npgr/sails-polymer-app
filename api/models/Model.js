/**
* Model.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  //migrate: 'alter',

  attributes: {
	//_title: 'Model',
	//_card_width: '60em',
	//_btn_left: '30px',
	//_display: 'disabled',
	id: {
		//description: 'Id',
		//hide: true,
		type: "integer",
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	name: {
		//description: 'Name',
		type: 'string',
		required: true,
		unique: true
	},
	title: {
		//description: 'Title',
		type: 'string',
		required: true
	}
//End Attributes
  }
  ,afterCreate: function (values, next) {
	errorx = function errorx(err, data) {
		if (err) {
			console.log('Error After Create Model: ', err)
			return next(err);
		}
		//res.redirect("<%= model%>/list")
	}
	var functionx = {model: values.id, type:'list'}
	ModelFunction.create(functionx, errorx)
	functionx = {model: values.id, new: 'e', display: 'e', edit: 'e', delete: 'e', columns: 'e', print: 'e', download: 'e', ga: 'e', dialog_width: '30em', card_width: '86em', btn_left: '80px'}
	FunctionList.create(functionx, errorx)
	/*functionx = {model: values.id, name: values.name+'-new',type:'new', enable:true, width:'300px'}
	ModelFunction.create(functionx, errorx)
	functionx = {model: values.id, name: values.name+'-display',type:'display', enable:true, width:'300px'}
	ModelFunction.create(functionx, errorx)
	functionx = {model: values.id, name: values.name+'-edit',type:'edit', enable:true, width:'300px'}
	ModelFunction.create(functionx, errorx)
	functionx = {model: values.id, name: values.name+'-delete',type:'delete', enable:true, width:'300px'}
	ModelFunction.create(functionx, errorx)
	functionx = {model: values.id, name: values.name+'-columns',type:'columns', enable:true, width:'300px'}
	ModelFunction.create(functionx, errorx)
	functionx = {model: values.id, name: values.name+'-download',type:'download', enable:true, width:'300px'}
	ModelFunction.create(functionx, errorx)
	functionx = {model: values.id, name: values.name+'-print',type:'print', enable:true, width:'300px'}
	ModelFunction.create(functionx, errorx)
	functionx = {model: values.id, name: values.name+'-Google_Analytics',type:'ga', enable:true, width:'300px'}
	ModelFunction.create(functionx, errorx)*/
	next()
  }
};

