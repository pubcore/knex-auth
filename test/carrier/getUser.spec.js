import chai, {expect} from 'chai'
import chaiDatetime from 'chai-datetime'
import getUser from '../../src/carrier/getUser'
import createTestDb from '../../src/lib/createTestDb'
import defaultMap from '../userDefaultMap'
chai.use(chaiDatetime)

const table = 'user'

describe('get user', () => {
	var now = new Date(),
		users = [{created_time: now}],
		knex = createTestDb({table, rows:defaultMap(users), beforeEach, after}),
		db = {knex, table}

	it('returns a promise', () => {
		expect(getUser(db, {username:''})).to.be.a('promise')
	})
	it('can reject an Error', () =>
		getUser(db, {}).then(
			() => expect(false).to.be.true,
			err => expect(err).to.be.an('Error')
		)
	)
	it('resolves to user', () =>
		getUser(db, {username:'eve'}).then(user => {
			expect(user).to.include({username:'eve'})
			expect(user.created_time).to.equalDate(now)
		})
	)
	it('resolves to null, if not found', () =>
		getUser(db, {username:'-'}).then(user => {
			expect(user).to.be.null
		})
	)
})
