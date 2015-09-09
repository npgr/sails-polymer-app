/**
* TicketCategory.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	migrate: "alter",

  attributes: {
	//_title: 'Ticket Category',
	id: {
		//description: 'Id',
		type: "integer",
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	name: {
		//description: 'Category',
		type: "string",
		required: true
	},
	level: {
		//description: 'Level',
		type: "integer"
	},
	seq_id: {
		//description: 'Seq_id',
		type: "string"
	},
	parent: {
		//description: 'Parent',
		//key: id,
		//key_type: 'integer',
		//display: 'name',
		//type: 'string',
		model: 'TicketCategory'
	}
//End Attributes
	,toJSON: function () {
      var obj = this.toObject();

	  if (obj.seq_id)
	  {
		var arr = obj.seq_id.split(",")
	  
		console.log(arr)
	  }

      return obj;
    }
  },
  afterCreate: function (data, next) {
    
	if (data.parent == 0)
	{
		TicketCategory.update({id: data.id}, {level: 1, seq_id: data.id})
			.exec(function(err, updatedServers) {
                next()
			})
	}
	else
	  TicketCategory.find({id: data.parent})
		.exec(function(err, data2) { 
			var _level = 1
			var _seq_id = data.id
			//console.log("data2: ", data2)
			if (data2[0])
			{
				_level = data2[0].level + 1
				_seq_id = data2[0].seq_id+','+data.id
			}
			TicketCategory.update({id: data.id}, {level: _level, seq_id: _seq_id})
			.exec(function(err, updatedServers) {
                next()
			})
		})
  }
};

