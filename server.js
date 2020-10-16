const express = require('express');
const cors = require('cors');
const sequelize = require('./sequelize');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use( 
    cors({
        origin: ['http://localhost:4000', 'http://localhost:4200']
    }) 
);

require('./api/articles')(app, sequelize);
require('./api/dashboard')(app, sequelize);
require('./api/user')(app, sequelize);

app.listen(8000, () => {
    console.log('Server started');
    sequelize.init();
});
