const middleware = require('./../middleware')

module.exports = (app, sequelize) => {

    app.get('/dashboard/overview', middleware, async (req, res) => {
        res.send( await sequelize.getDashboardArticles() );
    });

    app.post('/dashboard/article/publish', middleware, async (req, res) => {
        const { id, published } = req.body;
        res.send( await sequelize.updateArticlePublishState({ id, published }) );
    });

    app.get('/dashboard/article/:key', middleware, async (req, res) => {
        const { key } = req.params;
        res.send( await sequelize.getDashboardArticleByKey({ key }) );
    });

    app.put('/dashboard/article', middleware, async (req, res) => {
        const { id } = req.body;
        const article = req.body;
        res.send( await sequelize.putDashboardArticle({ id, article }) );
    });

    app.delete('/dashboard/article/:id', middleware, async (req, res) => {
        const { id } = req.params;

        const result = await sequelize.deleteDashboardArticleById({ id });
        if( !result ) {
            res.status(404).send({ message: `Dashboard Article ${id} Not Found` });    
            return;
        }
        res.status(204).send();
    });

    app.post('/dashboard/article', middleware, async (req, res) => {
        const article = req.body;
        res.send( await sequelize.createNewDashboardArticle({ article }) );
    });
};
