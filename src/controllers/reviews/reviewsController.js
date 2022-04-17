
const getReview = async (req, res) => {
    const id = req.params.id
    console.log("GET:", id ? "id=" + id : '')

    res.json(id ? {_id: id} : {all: []})
}
const removeReview = async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.sendStatus(400)
        return
    }
    console.log("Delete: ", id)
    res.json({_id: id})
}

const updateReview = async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.sendStatus(400)
        return
    }
    console.log("Update: ", id)
    res.json({_id: id,...req.body})
}
const createReview = async (req, res) => {
    const body = req.body
    if (!body) {
        res.sendStatus(400)
        console.log("Post Error: No Body")

        return
    }
    const _body = {_id: Date.now().toString(), ...body}
    console.log("Post: Body", _body)

    res.json(_body)
}

 export default (app) => {
     app.post('/api/reviews', createReview);
     app.get('/api/reviews', getReview);
     app.get('/api/reviews/:id',  getReview);
     app.put('/api/reviews/:id',  updateReview);
     app.delete('/api/reviews/:id',  removeReview);
 }
