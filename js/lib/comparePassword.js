'use strict'
const bcrypt = require('bcryptjs'),
	hashes = require('jshashes'),
	sha1 = new hashes.SHA1()

exports.default = (cleartext, hash) => {
	return bcrypt.compare(
		sha1.hex(cleartext),//keep backward compatibility regarding migration from sha1 to bcrypted passwords
		hash.substr(0, 3) === '$2y' ?
			hash.replace(/^\$2y(.+)$/i, '$2a$1')//compatibility to php created
			: hash
	)
}
