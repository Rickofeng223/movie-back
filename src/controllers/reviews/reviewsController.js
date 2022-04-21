import {reviewDao as dao} from '../../db.js'

const getReview = async (req, res) => {
    const _id = req.params.id
    let rv
    if (_id) {
        rv = await dao.findById(_id)
    } else {
        rv = await dao.findAll()
    }
    res.json(rv)


}
const removeReview = async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.sendStatus(400)
        return
    }
    await  dao.deleteByID(id )
    res.sendStatus(200)
}

const updateReview = async (req, res) => {
     const id = req.params.id
    if (!id) {
 
        res.sendStatus(400)
        return
    }
 
    await dao.updateByID(id,req.body)
 
    res.sendStatus(200)
}


const createReview = async (req, res) => {
    const body = req.body
    if (!body) {
        res.sendStatus(400)
        return
    }

    res.json(await dao.create(body))

}

export default (app) => {
    app.post('/api/reviews', createReview);
    app.get('/api/reviews', getReview);
    app.get('/api/reviews/:id', getReview);
    app.put('/api/reviews/:id', updateReview);
    app.delete('/api/reviews/:id', removeReview);
}
