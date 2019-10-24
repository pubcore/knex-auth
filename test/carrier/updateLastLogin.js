'use strict'
const {expect} = require('chai'),
	createTestDb = require('@pubcore/knex-create-test-db'),
	{dbTypes} = require('../../js/lib/cols'),
	updateLastLogin = require('../../js/carrier/updateLastLogin').default,
	defaultMap = require('../userDefaultMap').default,
	moment = require('moment-timezone'),
	table = 'user'

var before = moment.utc()

describe('updateLastLogin', () => {
	var knex = createTestDb({
			table, rows:defaultMap([{last_login:null}]), beforeEach, after, dbTypes
		}),
		db = {knex, table}

	it('returns promise', () => {
		expect(updateLastLogin(db, {username:''})).to.be.a('promise')
	})
	it('can reject an Error', () =>
		updateLastLogin(db, {}).then(
			() => expect(false).to.be.true,
			err => expect(err).to.be.an('Error')
		)
	)
	it('updates last_login field to now per default', () => {
		return updateLastLogin(db, {username:'eve'}).then(affectedRows => {
			expect(affectedRows).to.equal(1)
			return knex(table).where({username:'eve'}).first('last_login')
		}).then( ({last_login}) =>
			expect( moment.utc(last_login).isSameOrAfter(before.startOf('second'))).to.be.true
		)
	})
})
