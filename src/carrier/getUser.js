import cols from '../lib/cols'

export {cols}
export default ({knex, table}, {username}) => Promise.resolve(
	knex(table).where({username}).first(cols)
		.catch(err => Promise.reject(err))
).then(val => val||null)
