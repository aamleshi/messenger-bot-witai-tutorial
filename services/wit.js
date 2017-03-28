'use strict'

var Config = require('../config')
var FB = require('../connectors/facebook')
var Wit = require('node-wit').Wit
var request = require('request')


var firstEntityValue = function (entities, entity) {
	var val = entities && entities[entity] &&
		Array.isArray(entities[entity]) &&
		entities[entity].length > 0 &&
		entities[entity][0].value

	if (!val) {
		return null
	}
	return typeof val === 'object' ? val.value : val
}


var actions = {
	say (sessionId, context, message, cb) {
		// Bot testing mode, run cb() and return
		if (require.main === module) {
			cb()
			return
		}

		console.log('WIT WANTS TO TALK TO:', context._fbid_)
		console.log('WIT HAS SOMETHING TO SAY:', message)
		console.log('WIT HAS A CONTEXT:', context)

		if (checkURL(message)) {
			FB.newMessage(context._fbid_, message, true)
		} else {
			FB.newMessage(context._fbid_, message)
		}

		
		cb()
		
	},

	merge(sessionId, context, entities, message, cb) {
		// Retrive the location entity and store it in the context field
		var loc = firstEntityValue(entities, 'location')
		if (loc) {
			context.loc = loc
		} 

		var name = firstEntityValue(entities, 'name')
		if (name) {
			context.name = name
		} 

		cb(context)
	},


	error(sessionId, context, error) {
		console.log(error.message)
	},
}

// SETUP THE WIT.AI SERVICE
var getWit = function () {
	console.log('GRABBING WIT')
	return new Wit(Config.WIT_TOKEN, actions)
}

module.exports = {
	getWit: getWit,
}

// BOT TESTING MODE
if (require.main === module) {
	console.log('Bot testing mode!')
	var client = getWit()
	client.interactive()
}
