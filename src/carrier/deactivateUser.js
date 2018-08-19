//resolves to affected row count (integer)
export default ({knex, table}, {username}) => Promise.resolve(
	knex(table).where({username}).update({deactivate:'yes'})
		.catch(err => Promise.reject(err))
)
