module.exports = (app, sequelize) => {

    app.get('/dashboard/overview', async (req, res) => {
        res.send( await sequelize.getDashboardArticles() );
    });

    app.post('/dashboard/article/publish', async (req, res) => {
        const { id, published } = req.body;
        res.send( await sequelize.updateArticlePublishState({ id, published }) );
    });

};
