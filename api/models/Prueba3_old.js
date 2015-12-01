/**
* Prueba3.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      //_new: "enabled",
      //_display: "enabled",
      //_edit: "enabled",
      //_columns: "enabled",
      //_download: "enabled",
      //_print: "enabled",
      //_ga: "disabled",
      //_delete: "disabled",
      id: {
         //description: "Id",
         type: "integer",
         primaryKey: true,
         autoIncrement: true,
         unique: true
      },
      name: {
         //description: "Name",
         //textarea_cols: 10,
         //textarea_rows: 10,
         //hide: true,
         type: "string",
         required: true,
         enum: ["a"," b"," c"],
         //enumdes: ["activo"," bloqueado "," cerrado"]
      }
//End Attributes
	}
};

