
const getUser = async (req, res) => {
    const id = req.params.id
    console.log("GET:", id ? "id=" + id : ' All')

    res.json(id ? {_id: id} : {all: []})
}
const removeUser = async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.sendStatus(400)
        return
    }
    console.log("Delete: ", id)
    res.json({_id: id})
}

const updateUser = async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.sendStatus(400)
        return
    }
    console.log("Update: ", id, "with", req.body)
    res.json({_id: id,...req.body})
}
const createUser = async (req, res) => {
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
     app.post('/api/users', createUser);
     app.get('/api/users', getUser);
     app.get('/api/users/:id',  getUser);
     app.put('/api/users/:id',  updateUser);
     app.delete('/api/users/:id',  removeUser);
 }
