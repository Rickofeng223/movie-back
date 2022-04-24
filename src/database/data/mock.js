import dummy from "mongoose-dummy";
import faker from "faker";

console.log(Object.keys(faker))

import * as models from '../../db.js'

const ignore = ['_id']
const ignore_crit = [...ignore, 'user']
const ignore_R = [...ignore_crit, 'movie']


const append = (prop, x = {}) => {
    return {...prop, ...x, __v: 0}
}

export const createUser = (role) => append(dummy(models.usersModel, {ignore}),{role})
export const createCrit = (user) => append(dummy(models.criticsModel, {
    ignore: ignore_crit
}), {
    user,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    phone_no:faker. phone.phoneNumber(),
    username: faker.internet.userName()
})
export const createReview = ({user, movie, critic}) => append(dummy(models.reviewsModel, {
    ignore: ['critic', ...ignore_R]
}), {user, movie, critic,content:faker.lorem.sentences()})

export const createRating = ({user, review}) => append(dummy(models.ratingsModel, {ignore: ['review', ...ignore_R]}), {
    review,
    user,

})
const user = createUser("NORMAL"),
    crit = createCrit('user')
    , review = createReview('user', 'movie', 'critic')
    , rating = createRating('user', 'movie', 'review')
console.log('user', user)
console.log('crit', crit)
console.log('rating', rating)
console.log('review', review)
const ignored = {ignore}

const betterUserMock = ()=>({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    phone_no:faker. phone.phoneNumber(),
    username: faker.internet.userName()
})
export     const ROLE= {NORMAL:"NORMAL",CRITIC:"CRITIC",ADMIN:"ADMIN"}
const {NORMAL,CRITIC,ADMIN}=ROLE










let createUserFoundation =   (role)=> models.usersModel.create ({
    ...dummy(models.usersModel, ignored),
    ...betterUserMock(),
    role:role || ROLE.NORMAL
})
const auth = async(role )=>{
    const user = await createUserFoundation(role)
    const auth = await ({user:user._id,username:user.username,password:faker.internet.password()})
    return [user,auth]
}
export function UserCreator() {


    let createNormal =  ()=>  auth(NORMAL)
    let createAdmin = async ()=>auth(ADMIN)
    let createCritUser = async ()=>{
        const [critic,authz] = await auth(CRITIC)
        const crit =await  models.criticsModel.create({
            ...dummy(models.criticsModel,ignored)
            ,user:critic._id
        })
        return [critic,authz,crit]
    }

    return {createNormal,createAdmin,createCritUser     }
}

// const createRating = async ()=>
// const createReview = async ()=>
// const createCritic = async ()=>
// const createUser = async ()=>
// const createMovie = async ()=>
