import columns from '../lib/cols'

export {columns as cols}
export default ({knex, table, cols}, {username}) => Promise.resolve(
	knex(table).where({username}).first([...(cols||[]), ...columns])
		.catch(err => Promise.reject(err))
).then(val => val||null)
