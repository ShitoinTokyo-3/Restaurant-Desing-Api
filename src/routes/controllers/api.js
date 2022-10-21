require('dotenv').config();
const {
    SECRET_KEY_STRIPE
} = process.env;

const Stripe = require('stripe');
const stripe = new Stripe(SECRET_KEY_STRIPE);


module.exports = {
    async post(req, res) {
        try {
            console.log(SECRET_KEY_STRIPE)
            const { id, amount } = req.body;
        
            const payment = await stripe.paymentIntents.create({
                amount,
                currency: 'USD',
                description: 'Example payment intent',
                payment_method: id,
                confirm: true,
            })
        
            console.log(payment);
            res.send( { message: 'Payment successful' } );
        } catch (error) {
            res.send( { message: error.raw.message } );
        }
    }
}