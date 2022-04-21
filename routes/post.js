const postRoute = require('express').Router()
const PostController = require('../controllers/postController')

postRoute.get('/', PostController.getposts)
postRoute.get('/allpost', PostController.getposts)
postRoute.get('/addnew', PostController.addPage)
postRoute.post('/addnew', PostController.add)
postRoute.get('/delete/:id', PostController.delete)
postRoute.get('/edit/:id', PostController.updatePage)
postRoute.post('/edit/:id', PostController.update)
postRoute.get('/preview', PostController.publishPage)


module.exports = postRoute