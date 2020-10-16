module.exports = (app, sequelize) => {
    const crypto = require('crypto');

    app.post('/users', async (req, res) => {
        const { name, password } = req.body;
        const salt = crypto.randomBytes(16).toString('hex');
        
        const result = await sequelize.addUser({
            name: name,
            password: crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex'),
            salt: salt,
        });

        res.send( result );
    });

    app.post('/login', async (req, res) => {
        try {
            const { name, password } = req.body;
            res.send( await sequelize.login({ name, password }) );
        } catch (error) {
            res.status(401);
            res.send({ message: error.message });
        }
    });

    app.post('/auth', async (req, res) => {
        const jwtUtil = require('./../jwtUtil');
        const { token } = req.body;
        
        res.send(jwtUtil.verifyJwt(token).isValid);
    });

};