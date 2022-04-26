import {usersModel} from "../database/schema-files.js";


export async function isAdmin(_id) {
    const user = await usersModel.findById(_id);
    return user.role === "ADMIN"
}

export async function isLoggedIn(req) {
    return req.session.user && await usersModel.findById(req.session.user);
}
