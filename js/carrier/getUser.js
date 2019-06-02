'use strict'
const columns = require('../lib/cols').default

module.exports = {
	cols: columns,
	default: ({knex, table, cols}, {username}) => Promise.resolve(
		knex(table).where({username}).first([...(cols||[]), ...columns])
			.catch(err => Promise.reject(err))
	).then(val => val||null)
}
