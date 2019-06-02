'use strict'
const randInt = max => Math.floor(Math.random() * Math.floor(max))

exports.default = (length=12) => {
	var v = ['a', 'e', 'i', 'o', 'u', 'ae', 'ou', 'io', 'ea', 'ou', 'ia', 'ai'],
		c = ['b', 'c', 'd', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's',
			't', 'u', 'v', 'w', 'tr', 'cr', 'fr', 'dr', 'wr', 'pr', 'th', 'ch',
			'ph', 'st', 'sl', 'cl'],
		pw = ''

	for (var i = 0; i < length; i++) {
		pw += c[randInt(c.length)] + v[randInt(v.length)]
	}

	return pw.substring(0, length)
}
