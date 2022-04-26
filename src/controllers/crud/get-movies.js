import {movieModel} from "../../database/schema-files.js";
import axios from "axios";

const createMovie = (raw) => {
    return movieModel.create({
        tmdb_id: raw.id,
        title: raw.title,
        homepage: raw.homepage,
        release_date: raw.release_date,
        overview: raw.overview,
        poster_path: raw.poster_path,
        genre_ids: raw.genre_ids,
        vote_average: raw.vote_average
    })
}

//        /movies/
//        /movies/:id
export const getMovie = async (req, res) => {
    const id = req.params.id
    try {
        let findBy = id ? movieModel.findById(id) : movieModel.find()
        res.json(await findBy)
    } catch (e) {
        res.status(500).send("Error:" + e.message)
    }
}

//        /movies/tid/:id

export async function getByTid(req, res) {
    try {
        const tid = req.params['tid']
        const result = await movieModel.find({tmdb_id: tid})
        if (result.length) {
            res.json(result[0])
        } else {
            const request = await axios.get(api(`/movie/${tid}`, ''))
            const movie = await createMovie(request.data)
            res.json(movie)
        }
    } catch (e) {

        res.status(500).send(e.message)
    }


}
