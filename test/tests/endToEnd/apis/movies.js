import * as data from "../../../fixtures/db/db-data.js";
import dummy from "mongoose-dummy";
import * as db from "../../../../src/db.js";
import {request} from "../util/util.js";
const movies = request('movies')

export default         () => {
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
