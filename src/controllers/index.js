import userCtrl from './users/usersController.js'
import reviewCtrl from './reviews/reviewsController.js'
import movieCtrl from './movies/moviesController.js'

export default (app) => {
    userCtrl(app)
    reviewCtrl(app)
    movieCtrl(app)

}
export const id = () => Date.now().toString()

