const jwtUtil = require('./jwtUtil');

module.exports = (req, res, next) => {
    const authorizationToken = req.get('Authorization');
    const verified = jwtUtil.verifyJwt(authorizationToken);
    
    if (verified.isValid) {
        next();
        return;
    }

    res.status(401).send(verified.error.message);
};

