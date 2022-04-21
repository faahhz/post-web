const fs = require('fs')

class Post {
    constructor(id, title, content, category, created_date, updated_date, status) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.category = category;
        this.created_date = created_date 
        this.updated_date = updated_date 
        this.status = status;
    }

    static getAllPosts() {
        return new Promise((resolve, reject) => {
            fs.readFile('./json/posts.json', 'utf8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    let posts = JSON.parse(data);
                    posts = posts.map(post => {
                        const { id, title, content, category, created_date, updated_date, status } = post
                        return new Post(id, title, content, category, created_date, updated_date, status)
                    })
                    resolve(posts)
                }
            })
        })
    }

    static getInformation(id) {
        return new Promise((resolve, reject) => {
            this.getAllPosts()
                .then(result => {
                    let posts = result;
                    let findOnePost = posts.filter(post => post.id === id)

                    if (findOnePost.length !== 0) {
                        resolve(findOnePost[0])
                    } else {
                        throw {
                            messcategory: `Post with id ${id} not found!`
                        }
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static add(post) {
        return new Promise((resolve, reject) => {
            this.getAllPosts()
                .then(result => {
                    let posts = result;
                    const id = posts[posts.length - 1].id + 1;
                    const {title, content, category, created_date, updated_date, status } = post;
                    console.log(post)
                    let postClass = new Post(id, title, content, category, created_date, updated_date, status)
                    posts.push(postClass)

                    this.save(posts)
                    resolve(postClass)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    
    static getPublish() {
        return new Promise((resolve, reject) => {
            fs.readFile('./json/posts.json', 'utf8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    let posts = JSON.parse(data);
                    posts = posts.map(post => {
                        if(post.status==="publish"){
                            const { id, title, content, category, created_date, updated_date, status } = post
                            return new Post(id, title, content, category, created_date, updated_date, status)

                        }
                        
                    })
                    resolve(posts)
                }
            })
        })
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            this.getAllPosts()
                .then(result => {
                    let posts = result;
                    posts = posts.map(post => {
                        if(post.id === id){
                            post.status =  'trash';
                        }})

                    this.save(posts)
                    resolve(`Post with id ${id} has been deleted!`)
                })
                .catch(err => reject(err))
        })
    }

    static update(postID, post) {
        return new Promise((resolve, reject) => {
            this.getAllPosts()
                .then(result => {
                    let posts = result;
                    const { title, content, category, status } = post
                    posts = posts.map(post => {
                        if (post.id === postID) {
                            post.title = title;
                            post.category = category;
                            post.updated_date = new Date().toISOString().slice(0, 10);
                            post.content = content;
                            post.status =  status;
                            
                        }
                        return post
                    })

                    this.save(posts)

                    resolve(`Post with id ${postID} has been updated!`)
                })
                .catch(err => reject(err))
        })
    }


    static save(posts) {
        fs.writeFileSync('./json/posts.json', JSON.stringify(posts, null, 3))
    }
}

module.exports = Post;