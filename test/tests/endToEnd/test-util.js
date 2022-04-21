import {URL} from "./util.js";
const {url} = URL
export default function  tests (){
    const id = 'id3'

    it('users get', () => {
        const actual = URL('get', 'users')
        actual.should.be.eq(`${url}/api/users`)
    })
    it('users get id', () => {
        const actual = URL('get', 'users', id)
        actual.should.be.eq(`${url}/api/users/${id}`)
    })
    it('users put', () => {
        const actual = URL('put', 'users', id)
        actual.should.be.eq(`${url}/api/users/${id}`)
    })
    it('users post', () => {
        const actual = URL('post', 'users')
        actual.should.be.eq(`${url}/api/users`)

    })
    it('users delete', () => {
        const actual = URL('delete', 'users', id)
        actual.should.be.eq(`${url}/api/users/${id}`)

    })


    it('movies get', () => {
        const actual = URL('get', 'movies')
        actual.should.be.eq(`${url}/api/movies`)
    })
    it('movies get id', () => {
        const actual = URL('get', 'movies', id)
        actual.should.be.eq(`${url}/api/movies/${id}`)
    })
    it('movies put', () => {
        const actual = URL('put', 'movies', id)
        actual.should.be.eq(`${url}/api/movies/${id}`)
    })
    it('movies post', () => {
        const actual = URL('post', 'movies')
        actual.should.be.eq(`${url}/api/movies`)

    })
    it('movies delete', () => {
        const actual = URL('delete', 'movies', id)
        actual.should.be.eq(`${url}/api/movies/${id}`)

    })


    it('reviews get', () => {
        const actual = URL('get', 'reviews')
        actual.should.be.eq(`${url}/api/reviews`)
    })
    it('reviews get id', () => {
        const actual = URL('get', 'reviews', id)
        actual.should.be.eq(`${url}/api/reviews/${id}`)
    })
    it('reviews put', () => {
        const actual = URL('put', 'reviews', id)
        actual.should.be.eq(`${url}/api/reviews/${id}`)
    })
    it('reviews post', () => {
        const actual = URL('post', 'reviews')
        actual.should.be.eq(`${url}/api/reviews`)

    })
    it('reviews delete', () => {
        const actual = URL('delete', 'reviews', id)
        actual.should.be.eq(`${url}/api/reviews/${id}`)

    })
}

