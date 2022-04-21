const route = require('express').Router()

route.get('/', (req, res) => {
   
    res.render('index.ejs')
})

const postRoutes = require('./post')
route.use('/', postRoutes)


module.exports = route