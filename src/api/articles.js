module.exports = (app, sequelize) => {

    app.get('/articles', async (req, res) => {
        res.send( await sequelize.getArticles() );
    });

    app.get('/articles/:key', async (req, res) => {
        const { key } = req.params;
        res.send( await sequelize.getArticleByKey({ key }) );
    });

};
