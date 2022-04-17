import { should} from 'chai'
import axios from 'axios'

should()

const {get: GET, put: PUT, post: POST, delete: DELETE} = axios
const url = 'http://localhost:4000/api'
const getOne = (api) => (id) => GET(`${url}/${api}/${id}`)
const getAll = (api) => () => GET(`${url}/${api}`)
const post = (api) => (body) => POST(`${url}/${api}`, body)
const del = (api) => (id) => DELETE(`${url}/${api}/${id}`)
const put = (api) => (id, body) => PUT(`${url}/${api}/${id}`, body)

const body = {x:5,a:'b'}

export default () => {


    it('get 1 user', async () => {
        const response = await getOne('users')('5')
        response.data.should.have.property('_id')
    })
    it('get 1 review', async () => {
        const response = await getOne('reviews')('5')
        response.data.should.have.property('_id')
    })
    it('get 1 movie', async () => {
        const response = await getOne('movies')('5')
        response.data.should.have.property('_id')
    })

    it('get all users', async () => {
        const response = await getAll('users')()
        response.data.should.have.property('all')

    })
    it('get all reviews', async () => {
        const response = await getAll('reviews')()
        response.data.should.have.property('all')

    })
    it('get all movies', async () => {
        const response = await getAll('movies')()
        response.data.should.have.property('all')

    })

    it('create user', async () => {
        const response = await post('users')(body)
        response.data.should.have.property('_id')
        Object.keys(body).forEach(e=>
            response.data.should.have.property(e,body[e]))        })
    it('create movie', async () => {
        const response = await post('movies')(body)
        response.data.should.have.property('_id')
        Object.keys(body).forEach(e=>
            response.data.should.have.property(e,body[e]))
    })
    it('create review', async () => {
        const response = await post('reviews')(body)
        response.data.should.have.property('_id')
        Object.keys(body).forEach(e=>
            response.data.should.have.property(e,body[e]))        })


    it('update user', async () => {
        const response = await put('users')('5',body)
        Object.keys(body).forEach(e=>
            response.data.should.have.property(e,body[e]))        })
    it('update movies', async () => {
        const response = await put('movies')('5',body)
        Object.keys(body).forEach(e=>
            response.data.should.have.property(e,body[e]))        })
    it('update review', async () => {
        const response = await put('reviews')('5',body)
        Object.keys(body).forEach(e=>
            response.data.should.have.property(e,body[e]))        })

    it('remove user', async () => {
        const response = await del('users')('5')
        response.data.should.have.property('_id')
    })
    it('remove movie', async () => {
        const response = await del('movies')('5')
        response.data.should.have.property('_id')
    })
    it('remove review', async () => {
        const response = await del('reviews')('5')
        response.data.should.have.property('_id')
    })

}