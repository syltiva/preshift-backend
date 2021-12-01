const jwt = require('jsonwebtoken');

const generateJwt = (id) => {
    return new Promise((resolve, reject) => {
        jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: "4h"},
        (error, token) => {
            if (error) {
                reject (error);
            }   else {
                resolve(token);
            }
        })
    })
};

module.exports = { generateJwt }