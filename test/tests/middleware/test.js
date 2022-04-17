import app from '../../../src/server.js'
import basicCRUD from './CRUD.js'
import sessions from './sessions.js'

let server
describe('middleware', () => {
    before(() => server = app())
    after(() => server.close())
    describe('basic CRUD routes', basicCRUD)
    describe('sessions', sessions)
})