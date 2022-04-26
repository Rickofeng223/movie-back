import {connection, authModel, usersModel, reviewsModel, criticsModel, movieModel, ratingsModel} from '../../db.js'
import {createRequire} from 'module'
const OID = (x)=> new mongoose.Schema.Types.ObjectId(x)
const require = createRequire(import.meta.url)
let users, reviews, ratings, auth, critics
import faker from "faker"
import './drop.js'
import mongoose from "mongoose";

const {
    internet: {password, email},
    name: {firstName: first, lastName: last},
    date: {past: randomDate},
    lorem: {sentences, paragraph}
} = faker
let movies = require('../data/db/movies.json').map(e => {
    delete e._id;
    return e
})

const conn = await connection()


movies = await Promise.all(movies.map(movie => movieModel.create(movie)))

users = [
    {
        "username": "Ignacio_Crooks",
        "first_name": "Myra",
        "last_name": "Altenwerth",
        "email_id": "Liliane39@hotmail.com",
        "phone_no": "1-243-117-5863",
        "DOB": "2022-04-26T06:52:50.000Z",
        "role": "NORMAL",
        "__v": 0
    },
    {
        "username": "Andre.Smitham",
        "first_name": "Annabell",
        "last_name": "Mante",
        "email_id": "Joseph78@gmail.com",
        "phone_no": "654.853.6532",
        "DOB": "2022-04-25T15:21:56.000Z",
        "role": "NORMAL",
        "__v": 0
    },
    {
        "username": "Luigi.Braun91",
        "first_name": "Lyric",
        "last_name": "Schuster",
        "email_id": "Jace81@hotmail.com",
        "phone_no": "(430) 369-9874",
        "DOB": "2022-04-26T13:41:13.000Z",
        "role": "NORMAL",
        "__v": 0
    },

    {
        "username": "Gregg.Kiehn",
        "first_name": "Odie",
        "last_name": "O'Kon",
        "email_id": "Estrella_Weimann21@hotmail.com",
        "phone_no": "337-058-8144 x28295",
        "DOB": "2022-04-26T01:53:16.000Z",
        "role": "CRITIC",
        "__v": 0
    },
    {
        "username": "Elbert.Sipes87",
        "first_name": "Stephon",
        "last_name": "Jacobi",
        "email_id": "May.Lehner30@yahoo.com",
        "phone_no": "1-223-401-2629 x957",
        "DOB": "2022-04-25T17:43:32.000Z",
        "role": "CRITIC",
        "__v": 0
    }, {
        "username": "Amelie_Wisozk62",
        "first_name": "Stan",
        "last_name": "Johns",
        "email_id": "Mohammad.Lind28@hotmail.com",
        "phone_no": "(229) 154-2603 x041",
        "DOB": "2022-04-25T23:05:45.000Z",
        "role": "ADMIN",
        "__v": 0
    }
]

users = await Promise.all(users.map(e => usersModel.create(e)))
let criticUsers = users.filter(e => e.role === "CRITIC")



auth = [
    {
        "username": "Amelie_Wisozk62",
        "password": "Tthd7nt7xVkLHyO"
    },
    {
        "username": "Ignacio_Crooks",
        "password": "z580h8vsmbwof1Z"
    },
    {
        "username": "Gregg.Kiehn",
        "password": "esjyHUctLZbtaYE"
    },
    {
        "username": "Andre.Smitham",
        "password": "4saZHoEzlbY2ywd"
    },
    {
        "username": "Elbert.Sipes87",
        "password": "6qzVcOYbGo_q7BZ"
    },
    {
        "username": "Luigi.Braun91",
        "password": "GkYloWEUGWX0MgR"
    }
]
auth = await Promise.all(auth.map(e => authModel.create(e)))

await Promise.all(
    users.map(
        ({
             username, _id: user
         }) => authModel.updateOne({username}, {$set: {user}})))
auth = await authModel.find()

critics = [
    {
        user: criticUsers[0]._id,
        "experience": 74,
        "organisation": "Jovany.Schumm35",
        "__v": 0
    },
    {
        user: criticUsers[1]._id,
        "experience": 38,
        "organisation": "Korey_Grady13",
        "__v": 0
    }
]
critics = await Promise.all(critics.map(e => criticsModel.create(e)))


reviews = [
    {
        critic: critics[0]._id,
        movie:movies[0]._id,
        "content": "Non corporis atque. Qui saepe omnis ea hic pariatur blanditiis. Quos modi soluta sed molestias voluptatibus consectetur vel ducimus molestiae. Unde mollitia unde est at qui consequatur voluptatem earum odio. Quis cupiditate doloremque voluptatibus placeat. Tempora totam eum incidunt sint doloribus odio voluptatum rerum necessitatibus.",
        "rating": 41,
        "likes": 28,
        "dislikes": 49,
        "time": "2022-04-26T08:54:20.000Z",
        "visibility": "Renee_Rath26",
        "__v": 0
    },
    {
        critic: critics[1]._id,
        movie:movies[1]._id,
        "content": "Consequatur vitae quis. Sapiente vero ut ad a id ipsam aperiam iste tempore. Accusamus et harum sapiente eos cumque hic ex. Fuga maxime aut voluptates nulla qui. Reiciendis quibusdam quia unde facilis eum laboriosam in. Occaecati laborum rerum.",
        "rating": 1,
        "likes": 26,
        "dislikes": 56,
        "time": "2022-04-25T18:31:43.000Z",
        "visibility": "Rosie.Bins15",
        "__v": 0
    },
    {
        critic: critics[1]._id,
        movie:movies[2]._id,
        "content": "Quo dolor molestias laboriosam aliquam unde. Qui et cumque et voluptatibus ea eaque. Alias recusandae aut et sed ab recusandae.",
        "rating": 12,
        "likes": 74,
        "dislikes": 53,
        "time": "2022-04-26T03:31:17.000Z",
        "visibility": "Millie.Donnelly",
        "__v": 0
    }
]
reviews = await Promise.all(reviews.map(e => reviewsModel.create(e)))

ratings = [
    {
        user: users[0]._id,
        review: reviews[0]._id,
        "time": "2022-04-26T12:46:55.000Z",
        "liked": true,
        "disliked": true,
        "__v": 0
    },
    {
        user: users[1]._id,
        review: reviews[1]._id,
        "time": "2022-04-25T23:37:33.000Z",
        "liked": true,
        "disliked": true,
        "__v": 0
    },
    {
        user: users[2]._id,
        review: reviews[2]._id,
        "time": "2022-04-26T12:08:59.000Z",
        "liked": false,
        "disliked": true,
        "__v": 0
    },
    {
        user: users[3]._id,
        review: reviews[0]._id,
        "time": "2022-04-25T20:29:24.000Z",
        "liked": true,
        "disliked": true,
        "__v": 0
    },
    {
        user: users[4]._id,
        review: reviews[1]._id,
        "time": "2022-04-26T12:00:20.000Z",
        "liked": false,
        "disliked": true,
        "__v": 0
    },
    {
        user: users[5]._id,
        review: reviews[2]._id,
        "time": "2022-04-26T11:10:18.000Z",
        "liked": false,
        "disliked": false,
        "__v": 0
    },
    {
        user: users[0]._id,
        review: reviews[0]._id,
        "time": "2022-04-25T20:04:07.000Z",
        "liked": true,
        "disliked": true,
        "__v": 0
    }
]
ratings = await Promise.all(ratings.map(e => ratingsModel.create(e)))

await conn.disconnect()