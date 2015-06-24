//var colors = require('colors');
var fs = require('fs')
var jsonic = require('jsonic')
var format = require('string-template')
var crud1 = require('./crud1')
var crud2 = require('./crud2')
var crud3 = require('./crud3')

option = process.argv[2]

switch(option) {
	case '?':
        console.log('arguments for this commando are: ')
        break;
    case 'crud1':
		//node generate crud1 Matheads
        crud(1)
        break;
	case 'crud2':
        crud(2)
        break;
	case 'crud3':
        crud(3)
        break;
    default:
        console.log('arguments for this commando are: ')
}

function getInputType(type) {
	switch(type) {
		case 'string':
			return 'text'
			break
		case 'integer':
			return 'number'
			break
		default:
			return 'text'
	}
}

function get_model_par() {
	if (process.argv[3])
		return process.argv[3]
	else {
		console.log('Missing Model Name')
		return false
	}
}

function get_model(cb)
{
	model = get_model_par()
	if (model) {
		console.log('creating a create page for model '+ model)
		fs.readFile('api/models/'+model+'.js', 'utf-8', function (err, data) {
			if (err) {
				console.log(err)
				return false
			}
			else {
				var start = data.indexOf("attributes: {")
				var end = data.indexOf("};")
				data = data.substring(start+12, end-1)
				//jsondata = JSON.parse(data)
				// pending replace all //
				data = data.replace(/\//g, '')
				cb(jsonic(data))
			}
		})
	}
}

function crud(n)
{
	get_model(function(jsondat) { 
		if (jsondat) 
		  switch(n) {
			case 1:
				// basic html crud
				crud1.generate('crud', jsondat)
			break;
			case 2:
				// basic polymer crud
				crud2.generate('crud', jsondat)
			break;
			case 3:
				// complete polymer crud
				crud3.generate('crud', jsondat)	
			break;
		  }  
	})
}