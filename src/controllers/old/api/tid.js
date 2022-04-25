import axios from "axios";
import {movieDao as dao, movieDao, movieModel} from '../../db.js'
export const api  =(api='',end='')=>`https://api.themoviedb.org/3${api}?api_key=${process.env.MOVIE_API_KEY}${end}`

