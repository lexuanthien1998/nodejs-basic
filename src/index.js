const express = require('express');
const app = express();

const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

app.use(express.static(path.join(__dirname, 'public'))); //http://localhost:3000/img/anh.jpg -- các link tĩnh

app.use(express.urlencoded()); //sử dụng cho route POST
app.use(express.json()); //sử dụng cho route POST với dữ liệu Json (trong js)

app.use(morgan('combined'));

//Template engine
app.engine('hbs', handlebars({
  extname: '.hbs',
}));
app.set('view engine', 'hbs'); //đặt ứng dụng là dùng handlebars
//Khi đặt extname là gì thì phần set và tên tên engine phải giống
app.set('views', path.join(__dirname, 'resources','views'));

//Kết nối DB MonggoDB
const db = require('./config/db');
db.connect();

//Kết nối DB MySQL
// const mysql = require('./config/db/mysql');
// mysql.connect_mysql();

//Kết nối DB MySQL use "sequelize"
// const db = require('./config/db/mysql');

//PHAN LOGIN
//Auth
const { forwardAuthenticated } = require('./config/auth');

//Express session
const session = require('express-session');
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}))

const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

//Khởi tạo passport
app.use(Passport.initialize());
app.use(Passport.session()); 

//flash
const flash = require("connect-flash");
app.use(flash());

//File route
const router = require('./routes');
router(app);

//Route Login
app.get('/user/login', forwardAuthenticated, (req, res) => {
  res.render('login-user', { message: req.flash('message') });
})
app.post('/login', Passport.authenticate('local', { successRedirect: '/post',
failureRedirect: '/login' }));

//Check Post Login
const User = require('../src/app/models/User');
const authenticateUser = async (email, password, done) => {
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    try {
      if (bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    } catch(e) {
      return done(e);
    }
  });
}

var isValidPassword = function(user, password){
  return bcrypt.compareSync(password, user.password);
}

const checkLogin = async function(email, password, done) {
  User.findOne({ 'email' :  email }, 
      function(err, user) {
        if (err)
          return done(err);
        if (!user){
          console.log('User Not Found with username '+ email);
          return done(null, false, { message: 'Incorrect email.' });                 
        }
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      }
    );
}

Passport.use(new LocalStrategy({
  usernameField: 'email',
  },
  async function(email, password, done ,req) {
    User.findOne({ 'email' :  email }, 
      function(err, user) {
        if (err)
          return done(err);
        if (!user){
          console.log('Không tìm thấy tài khoản có Email '+ email);
          return done(null, false, { message: 'Incorrect email.' });                 
        }
        if (!isValidPassword(user, password)){
          console.log('Mật khẩu không đúng !');
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      }
    );
  }
));

// Passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
// Passport.use(new LocalStrategy({ usernameField: 'email' }, checkLogin));

Passport.serializeUser((user, done) => done(null, user.id));

Passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
// End Login



const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
 
// Node js
// 1: Create và Install ExpressJs
// - Tạo forder chứa Project
// - npm init
// - npm install express --save (cài experssjs)
// - npm install nodemon --save-dev (cài nodemon)
// - vào package.json chèn vào mục scripts:
//   "start": "nodemon --inspect index.js"
// Để chạy nodemon, --inspect để chèn thêm phần debug ở trình duyệt, ko có cũng đc.
// - npm start (run project with nodemon)
// - npm istall morgan --save-dev (cài morgan)
// - npm install express-handlebars (template engines)
// - tạo các file main.js trong forder layouts của project

// 2. Form
// Sử dụng name input
// - GET: Query Faramater (req.query)
// - POST: Form Data (req.body)
//   app.use(express.urlencoded()); (sử dụng cho post url)
//   app.use(express.json()); (sử dụng cho post json - trong js)

// 3. Select
// - Khi chỉ lấy 1 (first)
// show(req, res, next) {
//   Post.findOne({slug: req.params.slug})    
//       .then(post => res.render('post/show', {post: post.toObject()}))
//       .catch(next);
// }
// - Khi lấy danh sách (list - get)
// list(req, res, next) {
  // Course.find({})
  //   .then(course => {
  //       course = course.map(course => course.toObject())
  //       res.render('home', {course});
  //   })
  //   .catch(next);
// }