module.exports = (app, sequelize) => {

    app.get('/dashboard/overview', async (req, res) => {
        res.send( await sequelize.getDashboardArticles() );
    });

    app.post('/dashboard/article/publish', async (req, res) => {
        const { id, published } = req.body;
        res.send( await sequelize.updateArticlePublishState({ id, published }) );
    });

    app.get('/dashboard/article/:key', async (req, res) => {
        const { key } = req.params;
        res.send( await sequelize.getDashboardArticleByKey({ key }) );
    });

    app.put('/dashboard/article', async (req, res) => {
        const { id } = req.body;
        const article = req.body;
        res.send( await sequelize.putDashboardArticle({ id, article }) );
    });

    app.delete('/dashboard/article/:id', async (req, res) => {
        const { id } = req.params;

        const result = await sequelize.deleteDashboardArticleById({ id });
        if( !result ) {
            res.status(404).send({ message: `Dashboard Article ${id} Not Found` });    
            return;
        }
        res.status(204).send();
    });

    app.post('/dashboard/article', async (req, res) => {
        const article = req.body;
        res.send( await sequelize.createNewDashboardArticle({ article }) );
    });
};
