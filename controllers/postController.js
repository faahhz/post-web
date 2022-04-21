const Post = require('../models/post')

class PostController {
    static getposts(req, res) {
        Post.getAllPosts()
            .then(result => {
                // res.send(result)   
                res.render('allPost.ejs', { Posts: result })
            })
            .catch(err => {
                res.send(err)
            })

    }
    static publishPage(req, res) {
        Post.getPublish()
            .then(result => {
                // res.send(result)   
                res.render('preview.ejs', { Posts: result })
            })
            .catch(err => {
                res.send(err)
            })

    }
  
    static addPage(req, res) {
        res.render('postAddPage.ejs')
    } 

    static add(req, res) {
        // res.send("Create post page")
        Post.add(req.body)
            .then(result => {
                res.redirect('/allPost')
                // res.send(result)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getInformation(req, res) {
        const id = Number(req.params.UserId)

        Post.getInformation(id)
            .then(result => {
                // res.send(result)
                res.render('postInformation.ejs', { post: result })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static delete(req, res) {
        const id = Number(req.params.id)

        Post.delete(id)
            .then(result => {
                // res.send(result)
                res.redirect('/allPost')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static updatePage(req, res) {
        const id = +req.params.id

        Post.getInformation(id)
            .then(result => {
                res.render('postEditPage.ejs', { post: result })
            })
            .catch(err => {
                res.send(err)
            })

    }

    static update(req, res) {
        const id = Number(req.params.id)

        Post.update(id, req.body)
            .then(result => {
                // res.send(result)
                res.redirect('/allPost')
            })
            .catch(err => {
                res.send(err)
            })
    }

}

module.exports = PostController