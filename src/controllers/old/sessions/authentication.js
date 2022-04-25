

export function signup(req, res) {
    const newUser = req.body;
    const {username, password, userData} = newUser
}

export function login(req, res) {
    const {username, password} = req.body

        if (login(username,password)){
            res.session.loggedIn=true

        }else{
            res.sendStatus(400)
        }

}

export function profile(req, res) {
    const profile = (req, res) =>
        res.json(req.session['profile']);
}

export function logout(req, res) {
    req.session.destroy();
}

export default (app)=>{
    app.post("/api/auth/signup", signup);
    app.post("/api/auth/login", login);
    app.post("/api/auth/profile", profile);
    app.post("/api/auth/logout", logout);
}