'use strict'
const {expect} = require('chai'),
	createTestDb = require('@pubcore/knex-create-test-db'),
	{dbTypes} = require('../../js/lib/cols'),
	defaultMap = require('../userDefaultMap').default,
	addLoginFailed = require('../../js/carrier/addLoginFailed').default,
	resetLoginFailed = require('../../js/carrier/addLoginFailedReset').default,
	moment = require('moment-timezone'),
	table = 'user'

var before = moment.utc()

describe('addLoginFailed', () => {
	var knex = createTestDb({table, rows:defaultMap([{login_failed_count:1}]), beforeEach, after, dbTypes}),
		db = {knex, table}
	it('returns a promise', () => {
		expect(addLoginFailed(db, {username:'-'})).to.be.a('promise')
	})
	it('can reject an Error', () => Promise.all([
		addLoginFailed(db, {}).then(
			() => expect(false).to.be.true,
			err => expect(err).to.be.an('Error')
		),
		resetLoginFailed(db, {}).then(
			() => expect(false).to.be.true,
			err => expect(err).to.be.an('Error')
		)
	]))
	it('increases login_failed_count by one', () =>
		addLoginFailed(db, {username:'eve'}).then(affectedRows => {
			expect(affectedRows).to.equal(1)
			return knex(table).where({username:'eve'}).first({lfc:'login_failed_count'})
		}).then(({lfc}) => expect(lfc).to.equal(2))
	)
	it('updates last_login_failed to current datetime', () =>
		addLoginFailed(db, {username:'eve'}).then(affectedRows => {
			expect(affectedRows).to.equal(1)
			return knex(table).where({username:'eve'}).first({llf:'last_login_failed'})
		}).then(({llf}) => expect( moment.utc(llf).isSameOrAfter(before.startOf('second'))).to.be.true)
	)
	it('reset to zero, if addLoginFailedReset called', () =>
		resetLoginFailed(db, {username:'eve'}).then(affectedRows => {
			expect(affectedRows).to.equal(1)
			return knex(table).where({username:'eve'}).first({lfc:'login_failed_count'})
		}).then(({lfc}) => expect(lfc).to.equal(0))
	)
})
