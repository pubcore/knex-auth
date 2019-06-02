'use strict'
const comparePassword = require('../lib/comparePassword').default,
	hashPassword = require('../lib/hashPassword').default

exports.default = ({knex, table}, {username, password, passwordNew, passwordLifeTime}) => {
	if(isNaN(+passwordLifeTime)){
		//because new Date() does not throw any errors, we must check this here
		return Promise.reject(new TypeError('illegal passwordLifeTime'))
	}
	if(passwordNew.length <= 0){
		return Promise.reject(new TypeError('illegal passwordNew'))
	}

	return Promise.resolve(
		knex(table).where({username}).first(['password', 'password_new'])
			.then( user => !user ?
				false
				: user.password ?
					comparePassword(password, user.password)
					: user.password_new === password || false
			)
			.then( isEqual => isEqual ? hashPassword(passwordNew) : false)
			.then( pwHash => pwHash && knex(table).where({username}).update({
				password: pwHash,
				password_new: null,
				password_expiry_date:
					(new Date(new Date()).getTime() + passwordLifeTime)
			}))
			.then(res => res > 0 ? true : false, err => Promise.reject(err))
	)
}
