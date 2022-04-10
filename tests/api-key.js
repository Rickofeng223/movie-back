import assert from 'assert'
import axios from 'axios'

const API_KEY= process.env.MOVIE_API_KEY;
 (async function (){
try{
	assert(API_KEY,'MOVIE_API_KEY Not found in environment variables')
	}catch(err){
console.log("something went wrong witth your environment varible exiting... ")
process.exit(1)
}
console.log(`Success! API Foubd in env. KEY IS: ${API_KEY}`)
 		

let res =  await axios.get(`http://www.omdbapi.com/?t=jaws&apikey=${API_KEY}`)
console.log(res.data.Title, res.data.Year)


})()