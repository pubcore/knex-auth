'use strict'
const bcrypt = require('bcryptjs'),
	hashes = require('jshashes'),
	sha1 = new hashes.SHA1()

exports.default = cleartext => bcrypt.hash(sha1.hex(cleartext), 5)
