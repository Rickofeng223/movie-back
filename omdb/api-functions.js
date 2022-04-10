import axios from 'axios'
const API_KEY= process.env.MOVIE_API_KEY

const qURL = 'http://www.omdbapi.com/?'
const API_KEY_PARAM=`&apikey=${API_KEY}`

const generic_api_get = (query)=>`${qURL}${query}&apikey=${API_KEY}`


const by = (searchKey , args={})=> {
	const type   = args.type || ''
	const   year = args.year || ''

	return `${qURL}${
		searchKey
	}${
		type? "&type="+type :''+
		year? "&y="+year :''
	}${API_KEY_PARAM}`

}

export const getByTitle = async (title, params={})=> {
	return axios.get(by(`t=${title}`,params))
}

export const getByID = async (id, params={})=> {
	return axios.get(by(`i=${id}`))
}


export const searchTitles  = async (search, params={},qty=10)=> {
	const type   = params.type || ''
	const   year = params.year || ''
	console.log(qty)
	if (qty >100 || qty< 1){
		throw new Error("Quantity must be between 1-100")
	}
	return axios.get(`${qURL}s=${
			search
		}${
			type? "&type="+type :''+
			year? "&y="+year :''+
			 "&page="+qty 
		}${API_KEY_PARAM}`)
}

