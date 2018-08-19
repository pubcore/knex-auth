export default (users=[{}]) => users.map(usr => ({...{
	username:'eve',
	type:'HUMAN',
	password_new:'xyz',
	deactivate:'no',
	login_failed_count:0,
	password_expiry_date:null
}, ...usr}))
