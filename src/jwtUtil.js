const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = {
    signJwt: (username) => {
        const payload = { name: username };
        const privateKey = fs.readFileSync('./private.key', 'utf-8');
        const signOpts = {
            expiresIn: "12h",
            algorithm: "RS256"
        }

        return jwt.sign(payload, privateKey, signOpts);
    },

    verifyJwt: (token) => {
        const verification = {
            isValid: false,
            object: null,
            error: null
        };

        try {
            const publicKey = fs.readFileSync('./public.key', 'utf-8');
            const verifyOpts = {
                expiresIn: "12h",
                algorithm: "RS256"
            }
            
            verification.object = jwt.verify(token, publicKey, verifyOpts);;
            verification.isValid = true;
        } catch (error) {
            verification.error = error;
        }    

        return verification;
    }
};