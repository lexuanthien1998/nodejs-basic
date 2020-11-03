const newsRoute = require('./news'); //export file router news
const userRoute = require('./user'); //export file router news
const homeRoute = require('./home');
const postRoute = require('./post');
const adminRoute = require('./admin');

//route index.js là file chung (file cha) của các file route khác
function routerOfProject(app) {
    // app.get('/', (req, res) => {
    //     res.render('home');
    // })
    // app.post('/', (req, res) => {
    //     res.send(req.body)
    // })

    //Route Home
    app.use('/', homeRoute);

    //Route News
    app.use('/news', newsRoute); //news.js

    //Route User
    app.use('/user', userRoute); //user.js

    //Route Post
    app.use('/post', postRoute);

    //Admin
    app.use('/admin', adminRoute);
}

module.exports = routerOfProject;
