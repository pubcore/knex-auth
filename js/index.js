'use strict'
const getUser = require('./carrier/getUser').default,
	comparePassword = require('./lib/comparePassword').default,
	deactivateUser = require('./carrier/deactivateUser').default,
	addLoginFailed = require('./carrier/addLoginFailed').default,
	updateLastLogin = require('./carrier/updateLastLogin').default,
	resetLoginFailedCount = require('./carrier/addLoginFailedReset').default,
	changePassword = require('./carrier/changePassword').default,
	{dbTypes} = require('./lib/cols')

module.exports = {
	getUser, comparePassword, deactivateUser, addLoginFailed, updateLastLogin,
	resetLoginFailedCount, changePassword, dbTypes, default:getUser
}
