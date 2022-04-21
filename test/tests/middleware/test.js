import app from '../../../src/server.js'
import sessions from './sessions.js'

let server
describe('middleware etc', () => {
    before(() => server = app())
    after(() => server.close())
    describe('sessions', sessions)
})