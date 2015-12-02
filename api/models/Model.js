/**
* Model.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  migrate: 'alter',

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
	},
	dialog_width: {
		//description: "Dialog Width",
		type: 'string'
	},
	card_width: {
		//description: "Card Width",
		type: 'string'
	},
	btn_left: {
		//description: "Button Left",
		type: 'string'
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
	var functionx = {model: values.id, name:'list',type:'list', enable:true, width:'300px'}
	ModelFunction.create(functionx, errorx)
	functionx = {model: values.id, name: values.name+'-new',type:'new', enable:true, width:'300px'}
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
	ModelFunction.create(functionx, errorx)
	next()
  }
};

