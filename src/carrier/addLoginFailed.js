export default ({knex, table}, {username}) => Promise.resolve(
	knex(table).where({username}).update({
		last_login_failed:new Date(),
		login_failed_count:knex.raw('login_failed_count + 1')
	}).catch(err => Promise.reject(err))
)
