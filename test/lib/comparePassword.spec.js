'use strict'
const comparePassword = require('../../js/lib/comparePassword').default,
	{expect} = require('chai'),
	hashPassword = require('../../js/lib/hashPassword').default

describe('compare bcrypted password', () => {
	it('returns a promise, because bcrypt is slow', () => {
		expect(comparePassword('', '')).to.be.a('promise')
	})
	it('resolves to true, if match', () => {
		return comparePassword('test', '$2y$04$RG9G38B8UD2zoHnP9MD2eunCc6hJxvmVly5r/1CRg9el3kfptw8Ra').then(
			res => expect(res).to.be.true
		)
	})
	it('resolves to false, if not match', () => {
		return comparePassword('wrong', '$2y$04$RG9G38B8UD2zoHnP9MD2eunCc6hJxvmVly5r/1CRg9el3kfptw8Ra').then(
			res => expect(res).to.be.false
		)
	})
	it('compares 100 times below 500ms', () => {
		var t = process.hrtime(),
			list = []
		for(var i=0; i<100; i++){
			//random strings leading to no difference in exec time
			list.push(comparePassword('wrong', '$2y$04$RG9G38B8UD2zoHnP9MD2eunCc6hJxvmVly5r/1CRg9el3kfptw8Ra'))
		}
		return Promise.all(list).then(() => {
			var [s, ns] = process.hrtime(t)
			expect(s).below(1) && expect(ns).below(500000000)
		})
	})
	it('is compatible to hashPassword function', () => {
		return hashPassword('test')
			.then(
				hash => comparePassword('test', hash)
			).then(
				isTrue => expect(isTrue).to.be.true
			)
	})
})
