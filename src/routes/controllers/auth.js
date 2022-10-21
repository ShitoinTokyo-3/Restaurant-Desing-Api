const { Customer } = require('../../db');
const { generateToken } =require('../helpers/generateToken') ;

module.exports = {

    loginOrRegister: async (req, res) => {
        const { email } = req.body;
        if(!email) res.status(400).json({ message: 'Email is required' });
        else{
            try {
                const [customer, created] = await Customer.findOrCreate({
                    where: {
                        email
                    }
                });
                if (created) {
                    const token = await generateToken(customer);
                    res.status(200).json({
                        data: customer,
                        token
                    });
                }
                else {
                    const token = await generateToken(customer);
                    res.status(200).json({
                        data: customer,
                        token
                    });
                }
            } catch (error) {
                res.send(error);
            }
        }
    }

}