import * as db from '../../../src/db.js'
import * as data from '../../fixtures/db/db-data.js'

import {movieTests, userTests, reviewTests,joinTests} from './apis/index.js'

import {assert} from 'chai'


/*

//reviews
res.should.have.property('movie')
res.should.have.property('user')
res.should.have.property('content')
res.should.have.property('likes')
res.should.have.property('dislikes')
res.should.have.property('visibility')
res.should.have.property('_id')

//mvoies
res.should.have.property('tmdb_id')
res.should.have.property('title')
res.should.have.property('homepage')
res.should.have.property('release_date')
res.should.have.property('overview')
res.should.have.property('poster_path')
res.should.have.property('vote_average')
res.should.have.property('_id')


// users
res.should.have.property('username')
res.should.have.property('first_name')
res.should.have.property('last_name')
res.should.have.property('email_id')
res.should.have.property('phone_no')
res.should.have.property('DOB')
res.should.have.property('__v')
res.should.have.property('_id')
*/

function tests(){

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


    describe('users', userTests)


    describe('movies', movieTests)


    describe('reviews', reviewTests)


    describe('join tests', joinTests)

}

export default tests