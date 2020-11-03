class NewsController {
    index(req, res) {
        res.send('Page new');
    }

    show(req, res) {
        res.send('Page detail');
    }

    list(req,res) {
        res.render('home')
        // res.send('Page list');
    }
}

module.exports = new NewsController;