import session_vars from './session_variables.js'
import auth from './authentication.js'
export default (app)=>{
    session_vars(app)
    auth(app)
}



