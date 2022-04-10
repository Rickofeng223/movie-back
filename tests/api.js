import 'mocha'
import {expect} from 'chai'
import * as api from '../omdb/api-functions.js'

describe('test get by title',()=>{
	it('test no extra params', async ()=>{
		const res = await api.getByTitle('jaws')
		const jaws= res.data
		expect(jaws.Title).to.eq('Jaws')
	})	
	it('test type', async ()=>{
		const res = await api.getByTitle('jaws',{type:'movie'})
		const jaws= res.data
		expect(jaws.Title).to.eq('Jaws')
	})	
	it('test year', async ()=>{
		const res = await api.getByTitle('jaws',{year:'1975'})
		const jaws= res.data
		expect(jaws.Title).to.eq('Jaws')
	})	
	it('test 2 params', async ()=>{
		const res = await api.getByTitle('jaws',{type:'movie',year:'1975'})
		console.log(res)
		const jaws= res.data
		expect(jaws.Title).to.eq('Jaws')
	})	
})
describe('test get by id',()=>{
	it('test no extra params', async ()=>{
		const res = await api.getByID('tt0073195')
		const jaws= res.data
		expect(jaws.imdbID).to.eq('tt0073195')
	})	

})
describe('search',()=>{

 it('search',async ()=>{
 	const res = await api.searchTitles('jaws',{},10)
 	console.log(res)
 	const data= res.data.Search
  	expect(data.length).to.be.eq(10)
 })
 it('search10',async ()=>{
 	const res = await api.searchTitles('jaws',{},10)
 	console.log(res)
 	const data= res.data.Search
  	expect(data.length).to.be.eq(10)
 }
 	)
})

