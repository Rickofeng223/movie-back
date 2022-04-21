import endToEnd from "./apis/test.js";
import testUtil from "./util/test-util.js";
import app,{url} from '../../../src/server.js'

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


}
