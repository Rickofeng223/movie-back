import * as db from '../../src/db.js'
import {connection, movieModel, reviewModel, userModel} from '../../src/db.js'
import * as data from '../fixtures/db/db-data.js'
import {expect, should} from "chai";

should()
let conn

describe('db', function () {
    before(async function () {
        conn = await connection()
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
    after(async function () {

        await db.userModel.deleteOne({_id: "9998c1789c28626a8e5e8999"})

        await db.movieModel.deleteOne({_id: "925db9998c4b8c1a2a9999dc"})
        await db.movieModel.deleteOne({_id: "69999cc08c4b8c1a2a36c9df"})

        await db.reviewModel.deleteOne({_id: "625dc88150fa5dc478985bdb"})
        await db.reviewModel.deleteOne({_id: "625dc88150fa5dc478985bdd"})
        await conn.disconnect()
    })
    describe('crud', function () {
        it('find', async function () {
            let res = await db.reviewModel.find()
            res = res[0]

            res.should.not.be.undefined
            res.should.have.property('movie')
            res.should.have.property('user')
            res.should.have.property('content')
            res.should.have.property('likes')
            res.should.have.property('dislikes')
            res.should.have.property('visibility')
            res.should.have.property('_id')
            res = await db.movieModel.find()
            res = res[0]
            res.should.have.property('tmdb_id')
            res.should.have.property('title')
            res.should.have.property('homepage')
            res.should.have.property('release_date')
            res.should.have.property('overview')
            res.should.have.property('poster_path')
            res.should.have.property('vote_average')
            res.should.have.property('_id')
            res = await db.userModel.find()
            res = res[0]
            res.should.have.property('username')
            res.should.have.property('first_name')
            res.should.have.property('last_name')
            res.should.have.property('email_id')
            res.should.have.property('phone_no')
            res.should.have.property('DOB')
            res.should.have.property('__v')
            res.should.have.property('_id')

        })

        it('find by id - user', async function () {
            const res = await userModel.findById(data.user._id)
            res.should.not.be.null
            for (let key in data.user) {
                res.should.have.property(key)
            }
        })

        it('find by id - movie - spider', async function () {
            const res = await movieModel.findById(data.spiderman)
            res.should.not.be.null
            for (let key in data.spiderman) {
                res.should.have.property(key)
            }
        })

        it('find by id - movie - war of the worlds', async function () {

            const res = await movieModel.findById(data.warworlds)
            res.should.not.be.null
            for (let key in data.warworlds) {
                res.should.have.property(key)
            }
        })

        it('find by id - review - spider', async function () {
            const res = await reviewModel.findById(data.spider_review)
            res.should.not.be.null
            for (let key in data.spider_review) {
                res.should.have.property(key)
            }
        })

        it('find by id - review - war of the worlds', async function () {

            const res = await reviewModel.findById(data.war_review)
            res.should.not.be.null
            for (let key in data.war_review) {
                res.should.have.property(key)
            }
        })

        it('update name', async function () {
            let res = await reviewModel.findById(data.war_review)
            const likes = res.likes
            await reviewModel.updateOne({_id: data.war_review._id}, {...data.war_review, likes: 100})
            res = await reviewModel.findById(data.war_review)
            res.likes.should.be.eq(100)

        })
        it('delete and re-add', async function () {
            let res = await reviewModel.findById(data.war_review)
            await reviewModel.deleteOne({_id: res._id})
            res = await reviewModel.findById(data.war_review)
            expect(res).to.be.null

        })
    })
    describe('joins', function () {

        it('find reviews of a movie', async function () {
            const res = await reviewModel.find({movie: data.spiderman._id})
            const mov_id = res[0].movie.toString()
            mov_id.should.be.eq(data.spiderman._id)
        })
        it('find reviews by a user', async function () {
            const res = await reviewModel.find({user: data.user._id})
            const uid = res[0].user.toString()
            uid.should.be.eq(data.user._id)
        });
    })

})