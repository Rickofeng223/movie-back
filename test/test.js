import db from './tests/db.js'
import e2e from './tests/endToEnd/test.js'
import {should} from "chai";
should()
describe('tests',function (){
    describe('api tests',e2e)
    describe('db',db)

})