'use strict'
const {expect} = require('chai'),
	randWord = require('../../js/lib/randomWord').default

describe('cration of random, readable and arbitrary word', () => {
	it('returns a random string, with default length 12', () => {
		expect(randWord().length).to.equal(12)
	})
	it('returns a random string with defined length', () => {
		expect(randWord(2).length).to.equal(2)
	})
	it('does not contain upper case letters and whitespace', () => {
		expect(randWord(20)).to.not.match(/[A-Z ]/)
	})
})
