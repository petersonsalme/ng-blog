const ARTICLES = require('./mock-articles.js');

module.exports = (app) => {

    app.get('/articles', (req, res) => {
        res.send(ARTICLES);
    });

    app.get('/articles/:key', (req, res) => {
        res.send(ARTICLES.filter(a => a.key === req.params.key)[0]);
    });

};