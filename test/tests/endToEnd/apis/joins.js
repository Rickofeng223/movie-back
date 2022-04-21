import {assert} from "chai";
import axios from 'axios'
import * as data from '../../../fixtures/db/db-data.js'

const get = axios.get
import {url} from '../../../../src/server.js'

export default () => {
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
}
