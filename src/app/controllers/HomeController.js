const Course = require('../models/Course');

class HomeController {
    // index(req, res) {
    //     // res.render('home');
    //     Course.find({}, function (err, course) {
    //         if(!err) {
    //             res.json(course);
    //         } else {
    //             res.status(400).json({error: 'LỖI !!!'}); 
    //         }
    //     });
    // }

    index(req, res, next) {
        // res.send(req.body);

        Course.find({})
            //Khi dữ liệu là 1 array (list users)
            .then(course => {
                course = course.map(course => course.toObject())
                res.render('home', {course});
            })
            .catch(next);

            // Khi dữ liệu chỉ có 1 (details user)
            // .then(course => res.render('home'))
            // .catch(next);
    }
}

module.exports = new HomeController;