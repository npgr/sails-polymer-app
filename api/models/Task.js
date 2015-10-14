/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	//migrate: "alter",
	//tableName: 'task',
	//adapter: 'postgresql',
  attributes: {
	//_title: 'Activity',
	//_dialog_width: '36em',
	//_card_width: '86em',  
	//_btn_left: '80px', 		
	//_columns: 'enabled', 	
	//_new: 'enabled',
	//_edit: 'enabled',
	//_display: 'enabled',
	//_delete: 'enabled',
	//_print: 'enabled',
	//_download: 'enabled',
	//_ga: 'enabled',
	id: {
		//description: 'Id',
		type: "integer",
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	user: {
		//description: 'user',
		//key: id,
		//key_type: 'integer',
		//display: 'usr',
		//type: 'string',
		model: 'User'
	},
	activity: {
		//description: 'Activity',
		type: "string",
		required: true
	},
	completed: {
		//description: 'Completed',
		//hide: true,
		type: 'integer',
		max: 100,
		min: 0
	},
	ticket: {
		//description: 'Ticket',
		//hide: true,
		type: "string"
	},
	previous: {
		//description: 'Previous',
		//hide: true,
		type: 'integer'
	},
	order: {
		//description: 'Order',
		//hide: true,
		type: "integer"
	},
	type: {
		//description: 'Type',
		type: "string",
		enum: ["i","t","c","p"]
		//,enumdes: ["Incident", "Task", "Change", "Project"]
	},
	status: {
		//description: 'Status',
		type: "string",
		enum: ["p", "l", "e", "s", "c", "x"]
		//,enumdes: ["Pending", "Planning", "Working on", "Stand by", "Certificate", "Close"]
	},
	parent: {
		//description: 'Parent',
		//key: id,
		//key_type: 'integer',
		//display: 'activity',
		//type: 'string',
		model: 'Task'
	},
	prioridad: {
		//description: 'Priority',
		//hide: true,
		type: "string",
		enum: ["b", "m", "a", "c"]
		//,enumdes: ["Low", "Medium", "Hight", "Critic"]
	},
	requester: {
		//description: 'Requester',
		//hide: true,
		type: "string"
	},
	requestd: {
		//description: 'Request',
		type: "date"
	},
	start: {
		//description: 'Start',
		//hide: true,
		type: "date"
	},
	time: {
		//description: 'time',
		//hide: true,
		type: "string"
	},
	fcompromiso: {
		//description: 'Commit',
		//hide: true,
		type: "date"
	},
	end: {
		//description: 'End',
		//hide: true,
		type: "date"
	},
	responsable: {
		//description: 'Responsible',
		//hide: true,
		type: "string"
	},
	ultseguimiento: {
		//description: 'Last Track',
		//hide: true,
		type: "date"
	}, 
	proxseguimiento: {
		//description: 'Next Track',
		//hide: true,
		type: "date"
	},
	observacion: {
		//description: 'Notes',
		//textarea_cols: 40,
		//textarea_rows: 3,
		type: "string"
	}
//End Attributes
	/*,toJSON: function () {
      var obj = this.toObject();

	  if (obj.parent)
	  {
		var parent = {}
		parent.id = obj.parent.id
		parent.activity = obj.parent.activity
	  
		delete obj.parent

		obj.parent = parent
	  }
      return obj;
    }*/
  }
};

