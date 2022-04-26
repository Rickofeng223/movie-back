import {authModel, usersModel} from "../database/schema-files.js";

export function logout(req, res) {
    req.session.destroy();
    res.sendStatus(200 )
}

