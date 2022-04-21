import * as data from "../../../fixtures/db/db-data.js";
import dummy from "mongoose-dummy";
import * as db from "../../../../src/db.js";
import {request} from "../util/util.js";
const users = request('users')

export default   () => {
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
