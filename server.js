const express = require('express');
const cors = require('cors');

var corsOptions = {
    origin: ['http://localhost:4000', 'http://localhost:4200']
};

const app = express();
app.use( cors(corsOptions) );

app.listen(8000, () => {
    console.log('Server started');
});

require('./articles.js')(app);