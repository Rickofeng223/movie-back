import { userDao as dao}from '../../db.js'

const getUser = async (req, res) => {
    const _id = req.params.id
    let data
    if (_id) {
        data = await dao.findById(_id)
    } else {
        data = await dao.findAll()
    }
    res.json(data)

}
 const removeUser = async (req, res) => {



    const id = req.params.id
    if (!id) {
        res.sendStatus(400)
        return
    }

   await dao.deleteOne(id)
   res.sendStatus(200)
}

const updateUser = async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.sendStatus(400)
        return
    }
    await dao.updateByID(id,req.body)
    res.sendStatus(200)

}
const createUser = async (req, res) => {
    const body = req.body
    if (!body) {

        res.sendStatus(400)
        return
    }


    const resp  = await dao.create( body)

    res.json(resp)
}

export default (app) => {
    app.post('/api/users', createUser);
    app.get('/api/users', getUser);
    app.get('/api/users/:id', getUser);
    app.put('/api/users/:id', updateUser);
    app.delete('/api/users/:id', removeUser);
}
