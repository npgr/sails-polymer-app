module.exports = {
	//migrate: "alter",
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
         type: "string",
         required: true,
         enum:["a","b","c"],
         //enumdes:["activo","bloqueado","cerrado"]
      }
//End Attributes
	}
};