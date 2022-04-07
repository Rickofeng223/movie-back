import axios from 'axios'
const API_KEY= process.env.MOVIE_API_KEY

const qURL = 'http://www.omdbapi.com/?'
const API_KEY_PARAM=`&apikey=${API_KEY}`

const generic_api_get = (query)=>`${qURL}${query}&apikey=${API_KEY}`


const by = async (searchKey , {type='',year=''})=> {
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
	return axios.get(by(`t=${title}`,params))
}


const searchTitles  = async (search)=> {}

