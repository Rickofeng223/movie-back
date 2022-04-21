import axios from 'axios'
import {movieModel as movies, reviewModel as reviews, userModel as users} from "../../src/db.js";

const func = (x) => {

}

// const models = {movies:db.movieModel,reviews:db.reviewModel,users:db.userModel,auth:authModel}

// import express_app, {url} from "../src/server.js";
//  const app = await express_app()
const userOwnsReview = async (user, review) => {
    let rev = await reviews.findById(review)
    return rev.user.toString() === user
}


export async function SessionMock(url) {
    let obj = {}
    obj.url = url
    //get and set cookie
    const opts = {headers: {withCredentials: true}}
    const s = `${url}/api/session/get`
    const {headers: {'set-cookie': cookies}} = await axios.get(s, opts)
    opts.headers.Cookie = cookies.find(e => e.startsWith('connect.sid'))
    obj.cookie = opts.headers.Cookie
    console.log(opts.headers.Cookie)
    //cookie requests
    obj.setSession = (key, val) => axios.get(`${url}/api/session/set/${key}/${val}`, opts)
    obj.getSession = async (key = '') => (await axios.get(`${url}/api/session/get/${key}`, opts)).data


    const create = (url) => ({
        get: (id = '') => axios.get(`${url}/${id}`, opts),
        post: (body) => axios.post(url, body, opts),
        put: (id, body) => axios.put(`${url}/${id}`, body, opts),
        delete: (id) => axios.delete(`${url}/${id}`, opts)
    })
    obj.addApi = (name, route) => obj[name] = create(`${url}/api${route}`)
    obj.addApi('users', '/users')
    obj.addApi('movies', '/movies')
    obj.addApi('reviews', '/reviews')

    return obj
}

// const mock = await SessionMock(url)

// console.log(await mock.get())