import endToEnd from "./apis/test.js";
import testUtil from "./util/test-util.js";
import app,{url} from '../../../src/server.js'
import * as db  from '../../../src/db.js'
import {api as api_url}from '../../../src/controllers/api/tid.js'
import axios from "axios";
export default function tests() {
    before(async () => {
        this. server = await app()


    })
    after(async () => {

        await this.server.db.disconnect()
        await this.server.app.close()
    })
    describe('test-utils', testUtil)
    describe('end to end' ,endToEnd)
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


}
