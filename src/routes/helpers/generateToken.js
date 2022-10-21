const jwt = require('jsonwebtoken');
const {
    SECRET_KEY_JWT
} = process.env;

module.exports = {

    generateToken: async(user) => {
        const token =  jwt.sign({
            id: user.id,
            role: user.role
        }, SECRET_KEY_JWT);
        return token;
    },
    
    verifyToken: async(token) => {
        try {
            return jwt.verify(token, SECRET_KEY_JWT);
        } catch (error) {
            return null;
        }
    }
}