const { verifyToken } = require('../helpers/generateToken');
const { Customer } = require('../../db');

module.exports = {

    checkAuth: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const tokenData = await verifyToken(token);
            if(tokenData.id) next();
            else{
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            
        }
    },

    checkRoleAuth: (roles) => async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const tokenData = await verifyToken(token);
            const userData = await Customer.findByPk(tokenData.id);
            if([].concat(roles).includes(userData.role)) next();
            else{
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
}