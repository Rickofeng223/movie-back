const {get:GET} = require('axios')

const API_PREFIX='https://api.themoviedb.org/3'

const API_KEY =process.env.MOVIE_API_KEY

const API_QueryString = `api_key=${API_KEY}`



function generateURL(rest,query){
	let url = `${API_PREFIX}${rest}`
	if (query){
		url += '?'+ Object.keys(query).map(q=>`${q}=${query[q]}&`)
		.reduce((e,r)=>e+r) 
	}else{
		url+= '?'
	}
	return `${url}${API_QueryString}` 
}

const get = (rest,query)=>GET (generateURL (rest,query))


const discover =  (query)=> get('/discover/movie',query)
const discoverTV =  (query)=> get('/discover/movie',query)


const getMovieById=(id,query)=> get(`/movie/${id}`,query)

const search=(search, query)=>get(`/search/movie`,{query:search,...query})
const searchTV=(search, query)=>get(`/search/tv`,{query:search,...query})


module.exports={
	search,
	searchTV,
	getMovieById,
	discover,
	discoverTV,
	_generate_api_url:generateURL
}







