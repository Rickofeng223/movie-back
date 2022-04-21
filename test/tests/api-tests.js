import * as db from '../../src/db.js'
import * as data from '../fixtures/db/db-data.js'

import {should} from "chai";
import app, {url} from "../../src/server.js";
import dummy from "mongoose-dummy";
import {request} from "./util/util.js";
import axios from "axios";

should()
const users = request('users')
const movies = request('movies')
const reviews = request('reviews')
const {get} = axios
describe ('end-to-end', function tests() {
    before(async () => {
        this. server = await app()


    })
    after(async () => {

        await this.server.db.disconnect()
        await this.server.app.close()
    })
    beforeEach(async () => {

        let res

        res = await db.userModel.create(data.user)
        res = {...res, _id: res._id.toString()}
        res.should.have.property('_id', "9998c1789c28626a8e5e8999")
        res = await db.movieModel.create(data.spiderman)
        res = {...res, _id: res._id.toString()}
        res.should.have.property('_id', "925db9998c4b8c1a2a9999dc")
        res = await db.movieModel.create(data.warworlds)
        res = {...res, _id: res._id.toString()}
        res.should.have.property('_id', "69999cc08c4b8c1a2a36c9df")
        res = await db.reviewModel.create(data.war_review)
        res = {...res, _id: res._id.toString()}
        res.should.have.property('_id', "625dc88150fa5dc478985bdb")
        res = await db.reviewModel.create(data.spider_review)
        res = {...res, _id: res._id.toString()}
        res.should.have.property('_id', "625dc88150fa5dc478985bdd")
    })


    afterEach(async () => {
        await db.userModel.deleteOne({_id: "9998c1789c28626a8e5e8999"})

        await db.movieModel.deleteOne({_id: "925db9998c4b8c1a2a9999dc"})
        await db.movieModel.deleteOne({_id: "69999cc08c4b8c1a2a36c9df"})

        await db.reviewModel.deleteOne({_id: "625dc88150fa5dc478985bdb"})
        await db.reviewModel.deleteOne({_id: "625dc88150fa5dc478985bdd"})

    })


    describe('users',   () => {
            it('users - get all', async () => {
                const result = await users.get()
                const res = result.data[0]
                res.should.not.be.null
                res.should.have.property('username')
                res.should.have.property('first_name')
                res.should.have.property('last_name')
                res.should.have.property('email_id')
                res.should.have.property('phone_no')
                res.should.have.property('DOB')
                res.should.have.property('__v')
                res.should.have.property('_id')

            })
            it('users - get one', async () => {
                const result = await users.get(data.user._id)
                const res = result.data
                res.should.have.property('username')
                res.should.have.property('first_name')
                res.should.have.property('last_name')
                res.should.have.property('email_id')
                res.should.have.property('phone_no')
                res.should.have.property('DOB')
                res.should.have.property('__v')
                res.should.have.property('_id')
                res._id.toString().should.eql(data.user._id)
            })
            it('users - update', async () => {
                const update = (await users.put(data.user._id, {last_name: 'Theresa75'})).data
                const copy = JSON.parse(JSON.stringify(data.user))
                copy.last_name = 'Theresa75';
                (await users.get(data.user._id)).data
                    .should.be.eql(copy)


            })
            it('users - create', async () => {
                const mock = dummy(db.userModel, {})
                delete mock._id
                delete mock.__v
                const res = await users.post(mock)
                const {data} = res
                Object.keys(mock).forEach(key => data.should.have.property(key))
                const other = await users.get(data._id)
                other.data.should.be.eql(data)


            })
            it('users - delete', async () => {
                await users.delete(data.user._id)
                const result = await db.userModel.find({_id: data.user._id})
                result.should.be.empty;
                await db.userModel.create({_id: data.user._id, ...data.user})

                const getit = await users.get(data.user._id)

                getit.data.should.be.eql(data.user)

            })
        }
    )


    describe('movies', () => {
            it('movies - get all', async () => {
                const get = await movies.get()
                const res = get.data[0]
                res.should.have.property('tmdb_id')
                res.should.have.property('title')
                res.should.have.property('homepage')
                res.should.have.property('release_date')
                res.should.have.property('overview')
                res.should.have.property('poster_path')
                res.should.have.property('vote_average')
                res.should.have.property('_id')

            })
            it('movies - get one', async () => {

                const result = await movies.get(data.spiderman._id)
                const res = result.data
                res.should.have.property('tmdb_id')
                res.should.have.property('title')
                res.should.have.property('homepage')
                res.should.have.property('release_date')
                res.should.have.property('overview')
                res.should.have.property('poster_path')
                res.should.have.property('vote_average')
                res.should.have.property('_id')
                res.should.eql({__v: 0, ...data.spiderman})
                res._id.toString().should.eql(data.spiderman._id)
            })
            it('movies - update', async () => {
                const old_title = data.spiderman.title
                const resp1 = await movies.get(data.spiderman._id)
                await movies.put(data.spiderman._id, {title: 'not-spiderman'})
                resp1.data.title = 'not-spiderman'
                const resp2 = await movies.get(data.spiderman._id)
                resp2.data.should.be.eql(resp1.data)
            })
            it('movies - create', async () => {

                const mock = dummy(db.movieModel, {})
                delete mock._id
                delete mock.__v
                const res = await movies.post(mock)
                const {data} = res
                const get = await movies.get(data._id)
                let d2 = get.data
                data.should.eql(d2)


            })
            it('movies - delete', async () => {


                const pspiderman = (await movies.get(data.spiderman._id)).data
                await movies.delete(data.spiderman._id)
                const result = await db.movieModel.find({_id: data.spiderman._id})
                result.should.be.empty;
                await db.movieModel.create({_id: data.spiderman._id, ...data.spiderman})

                const getit = await movies.get(data.spiderman._id)
                getit.data.should.be.eql(pspiderman)

            })
        }
    )


    describe('reviews', function test() {

        it('reviews - get all', async () => {
            const get = await reviews.get()
            const res = get.data[0]
            res.should.have.property('movie')
            res.should.have.property('user')
            res.should.have.property('content')
            res.should.have.property('likes')
            res.should.have.property('dislikes')
            res.should.have.property('visibility')
            res.should.have.property('_id')
        })
        it('reviews - get one', async () => {


            const result = await reviews.get(data.war_review._id)
            const res = result.data

            res.should.eql({__v: 0, ...data.war_review})
            res._id.toString().should.be.eql(data.war_review._id)
        })
        it('reviews - update', async () => {


            const resp1 = await reviews.get(data.war_review._id)
            await reviews.put(data.war_review._id, {dislikes: 0})
            resp1.data.dislikes = 0
            const resp2 = await reviews.get(data.war_review._id)
            resp2.data.should.be.eql(resp1.data)


        })
        it('reviews - create', async () => {


            const mock = dummy(db.reviewModel, {})
            delete mock._id
            delete mock.__v
            const res = await reviews.post(mock)
            const {data} = res
            const get = await reviews.get(data._id)
            let d2 = get.data
            data.should.eql(d2)

        })
        it('reviews - delete', async () => {


            const war_review = await reviews.get(data.war_review._id)
            const wd = war_review.data
            await reviews.delete(data.war_review._id)
            const result = await db.reviewModel.find({_id: data.war_review._id})
            result.should.be.empty
            result.should.be.empty;
            await db.reviewModel.create({_id: data.war_review._id, ...data.war_review})

            const getit = await reviews.get(data.war_review._id)
            getit.data.should.be.eql(wd)

        })
    })

    describe('join tests', () => {
        it('movies rated by user', async () => {
            const req = await get(`${url}/api/movies/${data.user._id}/users`)

            const [war_of_worlds, spiderman] = req.data
            war_of_worlds.should.be.eql({__v: war_of_worlds.__v, ...data.warworlds})
            spiderman.should.be.eql({__v: spiderman.__v, ...data.spiderman})


        })

        it('reviews of a movie', async () => {
            const req = await get(`${url}/api/reviews/${data.spiderman._id}/movies`)
            req.data[0].should.be.eql({__v: 0, ...data.spider_review})

        })
        it('reviews by user', async () => {
            const req = await get(`${url}/api/reviews/${data.user._id}/users`)
            const [a, b] = req.data
            a.should.eql(data.war_review)
            b.should.eql(data.spider_review)
        })
        it('reviews of movie', async () => {
            const req = await get(`${url}/api/reviews/${data.spiderman._id}/movies`)
            const [review] = req.data
            review.should.be.eql(data.spider_review)

        })
    })
    describe('tid stuff' ,function () {

        it('',async ()=>{
            await db.movieModel.deleteOne({tmdb_id:3})
            let byTid = await db.movieDao.findByTID(3)
            byTid.should.be.empty
            const resp = await axios.get( `${url}/api/movies/tid/${3}`)
            const movie3=resp.data
            movie3.should.have.property('title',"Shadows in Paradise")
            movie3.should.have.property('tmdb_id',3)
            byTid = await db.movieDao.findByTID(3)
            byTid.should.not.be.empty

        })
    })

})

