import {should} from 'chai'
import axios from 'axios'

should()

const {get: GET} = axios
const url = 'http://localhost:4000/api'
const sessionUrl = (rest) => `${url}/session${rest || ''}`
const session = {

    set: (key, val, cookie = {}) => GET(sessionUrl(`/set/${key}/${val}`), {
        headers: {...cookie, withCredentials: true}
    }),
    get: (key, cookie = {}) => GET(
        sessionUrl(`/get/${key}`), {
            headers: {...cookie, withCredentials: true}
        }),
    getAll: (cookie = {}) => GET(sessionUrl(`/get`), {
        headers: {...cookie, withCredentials: true}
    }),
    reset: (cookie = {}) => GET(sessionUrl(`/reset`), {
        headers: {...cookie, withCredentials: true}
    }),
}
const getCookie = async () => ({
    Cookie: (
        await session.get()
    ).headers['set-cookie'][0]
})


export default () => describe('simple session tests', () => {
    let cookie

    before(async () => cookie = await getCookie())
    it('GetOne', async () => {
        let response = await session.get(cookie)
        response.data.should.be.empty
    })
    it('getSet', async () => {
        let response = await session.get(cookie)
        response.data.should.be.empty
        response = await session.set('x', 'y', cookie)
        response.data.should.have.property('x', 'y')
    })
    it('Multi', async () => {
        const Cookie = (await session.getAll()).headers['set-cookie'][0]
        const cookie = {Cookie}
        await session.set('y', '4', cookie)
        await session.set('x', 3, cookie)


        let x = await session.get('x', cookie)
        x.data.should.be.eq(3)
        x = await session.get('y', cookie)
        x.data.should.be.eq(4)


        x = await session.getAll(cookie)
        x.data.should.have.property('x', '3')
        x.data.should.have.property('y', '4')

    })
})

