'use strict'
const {expect} = require('chai'),
	hashPw = require('../../js/lib/hashPassword').default

describe('hash password', () => {
	it('returns a promise', () => {
		expect(hashPw('xyz')).to.be.a('promise')
	})
	it('creats 100 hashs below 500ms', () => {
		var t = process.hrtime(),
			list = []
		for(var i=0; i<100; i++){
			//random strings leading to no difference in exec time
			list.push(hashPw('x'))
		}
		return Promise.all(list).then(() => {
			var [s, ns] = process.hrtime(t)
			expect(s).below(1) && expect(ns).below(500000000)
		})
	})
})
