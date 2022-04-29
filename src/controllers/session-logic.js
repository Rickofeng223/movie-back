
export const setSession = (req, res) => {
    const name = req.params['name'];
    const value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}
export const getSession = (req, res) => {
    const name = req.params['name'];
    const value = req.session[name];
    if(value){

    res.send(value);
    }else{
        res.send(req.session)
    }

}


export const resetSession = (req, res) => {
    req.session.destroy();
    res.send(200);
}