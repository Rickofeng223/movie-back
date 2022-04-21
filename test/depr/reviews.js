import * as data from "../fixtures/db/db-data.js";
import {assert} from "chai";
import * as db from "../../src/db.js";
import {request} from "../tests/util/util.js";
import dummy from "mongoose-dummy";

const reviews = request('reviews')
export default function test() {

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
}
 

