export default ({knex, table}, {username, date}) => Promise.resolve(
	knex(table).where({username}).update({last_login:date||(new Date())})
		.catch(err => Promise.reject(err))
)
