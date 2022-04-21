import userCtrl from './users/usersController.js'
import reviewCtrl from './reviews/reviewsController.js'
import movieCtrl from './movies/moviesController.js'
import joins from './joins.js'
export default (app) => {
    userCtrl(app)
    reviewCtrl(app)
    movieCtrl(app)
    joins(app)
}
export const id = () => Date.now().toString()

