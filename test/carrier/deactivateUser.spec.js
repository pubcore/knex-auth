'use strict'
const {expect} = require('chai'),
	createTestDb = require('@pubcore/knex-create-test-db'),
	{dbTypes} = require('../../js/lib/cols'),
	deactivateUser = require('../../js/carrier/deactivateUser').default,
	defaultMap = require('../userDefaultMap').default,
	table = 'user'

describe('deactivateUser', () => {
	var knex = createTestDb({table, rows:defaultMap(), beforeEach, after, dbTypes}),
		db = {knex, table}

	it('returns a promise', () => {
		expect(deactivateUser(db, {username:''})).to.be.a('promise')
	})
	it('can reject an Error', () =>
		deactivateUser(db, {}).then(
			() => expect(false).to.be.true,
			err => expect(err).to.be.an('Error')
		)
	)
	it('deactivates user', () =>
		deactivateUser(db, {username:'eve'}
		).then(affectedRowCount => {
			expect(affectedRowCount).to.equal(1)
			return knex(table).where({username:'eve'}).first('deactivate')
		}).then(user =>
			expect(user.deactivate).to.be.equal('yes')
		)
	)
	it('resolves to affected row count 0, if user not found', () =>
		deactivateUser(db, {username:'-'}).then(
			affectedRowCount => expect(affectedRowCount).to.equal(0)
		)
	)
})
