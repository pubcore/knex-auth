import {expect} from 'chai'
import createTestDb from '@pubcore/knex-create-test-db'
import {dbTypes} from '../../src/lib/cols'
import updateLastLogin from '../../src/carrier/updateLastLogin'
import defaultMap from '../userDefaultMap'
import moment from 'moment-timezone'
var before = moment.utc()
const table = 'user'

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
