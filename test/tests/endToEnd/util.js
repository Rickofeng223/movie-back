import axios from "axios";
import {url} from "../../../src/server.js";


export const URL = (type, api, id='') => {

    switch (type.toUpperCase()) {
        case 'PUT':
        case 'DELETE':
            return `${url}/api/${api}/${id}`
        case 'GET':
            if (id) {
                return `${url}/api/${api}/${id}`
            }
        default:
            return `${url}/api/${api}`

    }
}
URL.url = url
const method = {
    GET: 'get',
    PUT:'put',
    POST:'post',
    DELETE:'delete'

}

export let request = (api) => {
    const api_req = (type) => (id = '', body = undefined) => {
        type = type.toUpperCase()
        const method = type.toLowerCase()
        return  axios[method](URL(method, api, id), body)
    }
   return  ({
        get: (id = '') => api_req(method.GET)(id),
        put: api_req(method.PUT),
        post: (body) => api_req(method.POST)('', body),
        delete: api_req(method.DELETE)
    })

}