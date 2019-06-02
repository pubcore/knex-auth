'use strict'
//resolves to affected row count (integer)
exports.default = ({knex, table}, {username}) => Promise.resolve(
	knex(table).where({username}).update({deactivate:'yes'})
		.catch(err => Promise.reject(err))
)
