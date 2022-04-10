const {expect,assert:{fail}} = require('chai')

const {
	search:searchMovie,
	searchTV,
	getMovieById,
	discover,
	discoverTV,
	_generate_api_url
	// ,
	// _generate_api_url
} = require('../../api');




// ;(async ()=> {
// 			const response = await getMovieById(20077)
// console.log(Object.keys(response))
// 				const {data:{original_title} ,status}= response

// 				// const [movie] = 
// 				// console.log(response)
// 				console.log((original_title))
// 								// expect(status).to.be.eq(200)
// 				// expect(movie.original_title).to.be.eq("The Batman vs. Dracula")
// 		})()

function trimApi(url,rest){
	rest = rest+'?'
	const base ='https://api.themoviedb.org/3'
	url = url
		.replace(rest,'')
		.replace(base,'')
		.replace(`api_key=${process.env.MOVIE_API_KEY}`)

	if (!url.length){
		return [];
	}else{
		return url.split('&')
			.filter(e=>e.length)
			// .map(e=>e.split('='))
	}
}
const base ='https://api.themoviedb.org/3'

const api_key = `api_key=${process.env.MOVIE_API_KEY}`
module.exports = ()=>{
	describe ('url tests',
		()=>{
			it("no params", ()=>{
				const rest ='/usr/local'
				const url = _generate_api_url(rest)
				expect(url).to.be.eq(`${base}${rest}?${api_key}`)

		})
			it("1 param", ()=>{
				const rest ='/usr/local'
				const param= {queryString:"parameter"}
				const url = _generate_api_url(rest,param)
				expect(url).to.be.eq(`${base}${rest}?queryString=parameter&${api_key}`)

 		})
			it("many params", ()=>{

	const rest ='/usr/local'
				const param= {queryString:"parameter",other:'x'}
				const url = _generate_api_url(rest,param)
				expect(url).to.be.eq(`${base}${rest
				}?queryString=parameter&other=x&${api_key}`)


		})
		})
	describe('live-tests' ,async()=>{
		it("discover" ,  async ()=>{
			const response = await discover()
				// .then(response =>{
			const {data ,status}= response
			expect(status).to.be.eq(200)
			// expect (data.total_results).to.be.eq(661568)
			// })
		})
	
	 


		it("discover_tv", async ()=>{

			const response = await discover()

			const {data ,status}= response
			expect(status).to.be.eq(200)
		})


		it("discover_with_page", async ()=>{
			const response = await discover({page:2})
				
			const {data ,status}= response
			expect(status).to.be.eq(200)
			expect(data.page).to.be.eq(2)

		})


			it("searchMovie", async ()=>{
				const response = await searchMovie("die hard")
				const {data ,status}= response
				const [diehard] = data.results
				expect(status).to.be.eq(200)
				expect(diehard.original_title).to.be.eq("Die Hard")

			})



it("searchTv", async ()=>{
			const response = await searchTV("ed sullivan")
			const {data ,status}= response
			const [show] = data.results
			expect(status).to.be.eq(200)
			expect(show.name).to.be.eq("The Ed Sullivan Show")

			})
	

		it("searchWithPage",async  ( )=>{

				const response = await searchMovie("batman",{page:2})
				const {data ,status}= response
				const [movie] = data.results
				expect(status).to.be.eq(200)
			const title = movie.original_title.toLowerCase() ; 
				expect(title).to.include('batman')

		
		})


		it("searchGetByID", async ()=>{
		const response = await getMovieById(20077)

				const {data:{original_title} ,status}= response

								expect(status).to.be.eq(200)
				expect(original_title).to.be.eq("The Batman vs. Dracula")

		})
	})
}