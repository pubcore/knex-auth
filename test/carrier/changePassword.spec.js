import chai, {expect} from 'chai'
import chaiAsPromised from 'chai-as-promised'
import createTestDb from '../../src/lib/createTestDb'
import defaultMap from '../userDefaultMap'
import changePasswordTemp from '../../src/carrier/changePassword'
import comparePassword from '../../src/lib/comparePassword'
import hashPassword from '../../src/lib/hashPassword'

chai.use(chaiAsPromised)

const changePassword = (db, user) => changePasswordTemp(db, {
		passwordLifeTime:1000, passwordNew:'-', ...user
	}),
	table = 'user'

describe('changePassword of new user', () => {
	var knex = createTestDb({table, rows:defaultMap(), beforeEach, after}),
		db = {knex, table}
	it('returns a promise', () => {
		expect( changePassword(db, {username:'xy'}) ).to.be.a('promise')
	})
	it('rejects with TypeError or Error, if used wrong', () => Promise.all([
		expect(changePassword(db, {})).be.rejectedWith(Error),
		expect(changePassword(db, {passwordLifeTime:undefined})).be.rejectedWith(TypeError),
		expect(changePassword(db, {passwordLifeTime:1, passwordNew:''})).be.rejectedWith(TypeError)
	]))
	it('resolves to false if user does not exist', () => {
		return changePassword(db, {username:'x', password:'-'})
			.then(result => expect(result).to.be.false)
	})
	it('resolves to false if password (and new_password) does not match', () => {
		return changePassword(db, {username:'eve', password:'-'})
			.then(result => expect(result).to.be.false)
	})
	it('changes password for new users', () => {
		var passwordNew = 'np'
		return changePassword(db, {username:'eve', password:'xyz', passwordNew})
			.then(result => {
				expect(result).to.equal(true)
				return knex(table).where({username:'eve'}).first()
					.then(
						user => {
							expect(user.password_new).to.be.null
							expect(user.password_expiry_date).to.be.not.null
							return comparePassword(passwordNew, user.password).then(
								equals => expect(equals).to.be.true
							)
						}
					)
			}, err => {throw err})
	})
})

describe('change password of old user (password not null)', () => {
	var knex = createTestDb({
			table,
			rows: hashPassword('xyz').then(password => defaultMap([{password}])),
			beforeEach,
			after
		}),
		db = {knex, table}
	it('returns false, if current pw is wrong', () =>
		changePassword(db, {username:'eve', password:'wrong'})
			.then(result => expect(result).to.be.false)
	)
	it('returns true, if change pw succeeded', () =>
		changePassword(db, {username:'eve', password:'xyz', passwordNew:'zyx'})
			.then(result => {
				expect(result).to.be.true
				return knex(table).where({username:'eve'}).first()
					.then(
						user => {
							expect(user.password_new).to.be.null
							expect(user.password_expiry_date).to.be.not.null
							return comparePassword('zyx', user.password).then(
								equals => expect(equals).to.be.true
							)
						}
					)
			})
	)
})
