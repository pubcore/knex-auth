import {expect} from 'chai'
import createTestDb from '../../src/lib/createTestDb'
import deactivateUser from '../../src/carrier/deactivateUser'
import defaultMap from '../userDefaultMap'

const table = 'user'

describe('deactivateUser', () => {
	var knex = createTestDb({table, rows:defaultMap(), beforeEach, after}),
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
