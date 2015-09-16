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
		type: 'integer',
		max: 100,
		min: 0
	},
	ticket: {
		//description: 'Ticket',
		type: "string"
	},
	previous: {
		//description: 'Previous',
		type: 'integer'
	},
	order: {
		//description: 'Order',
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
		type: "string",
		enum: ["b", "m", "a", "c"]
		//,enumdes: ["Low", "Medium", "Hight", "Critic"]
	},
	requester: {
		//description: 'Requester',
		type: "string"
	},
	requestd: {
		//description: 'Request',
		type: "date"
	},
	start: {
		//description: 'Start',
		type: "date"
	},
	time: {
		//description: 'time',
		type: "string"
	},
	fcompromiso: {
		//description: 'Commit',
		type: "date"
	},
	end: {
		//description: 'End',
		//hide: true,
		type: "date"
	},
	responsable: {
		//description: 'Responsible',
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
	,toJSON: function () {
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
    }
  }
};

