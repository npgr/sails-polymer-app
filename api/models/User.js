/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  migrate: 'alter',

  attributes: {
	id: {
		//description: 'Id',
		type: "integer",
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	usr: {
		//description: "User",
		type: 'string',
		unique: true
	},
	name: {
		//description: "Name",
		type:'string',
		required: true
	},
	pwd: {
		//description: "Password",
		//hide: true,
		type: 'string'
	},
	profile: {
		//description: 'Profile',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'Profile'
	},
	email: {
		//description: 'email',
		type: 'string',
		email: true
    },
	photo: {
		//description: 'Photo',
		//hide: true,
		type: 'string',
		defaultsTo: '',
		url: true
    },
	status: {
		//description: "Status",
		type: 'string',
		enum: ['A', 'I']
		//,enumdes: ["Active","Inactive"]
    }
//End Attributes
	,toJSON: function () {
      var obj = this.toObject();

      //delete obj.pwd;

      return obj;
    }
  },
  beforeCreate: function (data, next) {
	// Modelo sails_app2  (/api/services)
    // TODO: replace with new cipher service
    //if (values.password) values.password = CipherService.create('bcrypt', values.password).hashSync();
    data.pwd = require('bcrypt').hashSync(data.pwd, 10);
	next();
  }
  //,beforeUpdate: function (values, next) {
    // TODO: replace with new cipher service
    //if (values.password) values.password = CipherService.create('bcrypt', values.password).hashSync();
    //next();
  //}
  /*
  email: {
      type: 'string',
      email: true,
      //required: true,
      //unique: true
    },
	photo: {
      type: 'string',
      defaultsTo: '',
      url: true
    },*/
};

