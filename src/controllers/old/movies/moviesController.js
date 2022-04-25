


const removeMovie = async (req, res) => {
    const _id = req.params.id
    if (!_id) {
        res.sendStatus(400)
        return
    }
      await dao.deleteOne({_id})

     res.sendStatus(200 )
}

const updateMovie = async (req, res) => {
    const id = req.params.id
    if (!id) {
        res.sendStatus(400)
        return
    }
    try {
        const result = await dao.updateByID(id, req.body)
        res.sendStatus(200)

    } catch (e) {
        res.sendStatus(500)
    }
}
// const createMovie = async (req, res) => {
//     const body = req.body
//     if (!body) {
//         res.sendStatus(400)
//
//         return
//     }
//     const created = await dao.create(body)
//
//     res.json(created)
// }

export default (app) => {
    // app.post('/api/movies', createMovie);
    app.get('/api/movies', getMovie);
    app.get('/api/movies/:id', getMovie);
    app.put('/api/movies/:id', updateMovie);
    app.delete('/api/movies/:id', removeMovie);
}
