export const dbTypes = {
	username:'string',
	created_time:'dateTime',
	last_login:'dateTime',
	type:'string',
	password:'string',
	password_secondary:'string',
	password_new:'string',
	last_login_failed:'dateTime',
	login_failed_count:'integer',
	password_expiry_date:'dateTime',
	deactivate:'string'
}

const cols = Object.keys(dbTypes)

export default cols
