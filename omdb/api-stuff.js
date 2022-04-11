import  axios from 'axios'
import assert from 'assert'
const {get} = axios

import{ API_KEY} from './index.js'

assert(API_KEY)

console.log(`API KEY IS: ${API_KEY}`)



const qURL = 'http://www.omdbapi.com/?'
const API_KEY_PARAM=`&apikey=${API_KEY}`

const generic_api_get = (query)=>`${qURL}${query}&apikey=${API_KEY}`
console.log(generic_api_get('t=jaws'))

// const api_search_title = (title)=>`${URL}t=${title}`

//console.log(req_base)
// ;(async function() {
// 	let x= await get(generic_api_get(`t=${title}`)).data
// 	console.log(x)
// })()
// get(,(req,res)=>{
// 	console.log(res.data)
// }) 
async function print(){
let x = ( {res,  status, data:result}=	(await axios.get(generic_api_get(`s=${'jaws'}`))))
// if (status===200)
// console.log()
console.log(x)}

	module.exports = {
		searchTitle:async (title)=> await axios.get(generic_api_get(`t=${title}`)).data
	}
let a =module.exports.searchTitle('jaws')

print()