const { Customer } = require('../../db');

module.exports = {
    getAll: async (req, res) => {
        try {
            const customers = await Customer.findAll();
            res.status(200).json(customers);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
     
}