/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	//migrate: "alter",
	tableName: 'task2',
	//adapter: 'postgresql',
  attributes: {
	//_title: 'Activity',
	id: {
		//description: 'Id',
		type: "integer",
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	activity: {
		//description: 'Activity',
		type: "string",
		required: true
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
		enum: ["p", "e", "s", "c", "x"]
		//,enumdes: ["Pending", "Working on", "Stand by", "Certificate", "Close"]
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
		type: "string"
	}
//End Attributes
  }
};

