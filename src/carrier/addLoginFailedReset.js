export default ({knex, table}, {username}) => Promise.resolve(
	knex(table).where({username}).update({login_failed_count:0})
		.catch(err => Promise.reject(err))
)
