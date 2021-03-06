
export const setSession = (req, res) => {
    const name = req.params['name'];
    const value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}
export const getSession = (req, res) => {
    const name = req.params['name'];
    const value = req.session[name];
    res.send(value);
}
export const getSessionAll = (req, res) => {
    res.send(req.session);
}

export const resetSession = (req, res) => {
    req.session.destroy();
    res.send(200);
}


export default (app) => {
    app.get('/api/session/set/:name/:value', setSession);
    app.get('/api/session/get/:name', getSession);
    app.get('/api/session/get', getSessionAll);
    app.get('/api/session/reset', resetSession);
}
