const express = require('express');
const cors = require('cors');
const sequelize = require('./sequelize');

const app = express();
app.use( 
    cors({
        origin: ['http://localhost:4000', 'http://localhost:4200']
    }) 
);

require('./articles.js')(app, sequelize);

app.listen(8000, () => {
    console.log('Server started');
    sequelize.init();
});
