import axios from "axios";
import {movieDao, movieModel} from '../../db.js'
export const api  =(api='',end='')=>`https://api.themoviedb.org/3${api}?api_key=${process.env.MOVIE_API_KEY}${end}`


const createMovie = (raw)=>{
    let {id:tmdb_id,
        title,
        homepage,
        release_date,
        overview,
        poster_path,
        genre_ids,
        vote_average} = raw
    return movieModel.create( {tmdb_id,
        title,
        homepage,
        release_date,
        overview,
        poster_path,
        genre_ids,
        vote_average})
}

export default (app)=>{
    app.get('/api/movies/tid/:tid', getByTid)
}


async function getByTid(req,res){
    const tid=req.params['tid']
    const result = await movieDao.findByTID(tid)
    if (result.length){
        res.json( result[0])
    }else{
        const request = await axios.get(api(`/movie/${tid}`,''))
        const movie= await createMovie(request.data)
         res.json(movie)
    }

}