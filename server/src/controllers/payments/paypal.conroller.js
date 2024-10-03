import paypal from 'paypal-rest-sdk'

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'YOUR_PAYPAL_CLIENT_ID',
    'client_secret': 'YOUR_PAYPAL_CLIENT_SECRET'
});


export const payment_paypal = async (req, res) => {
    const { orderID } = req.body;

    paypal.payment.get(orderID, function (error, payment) {
        if (error) {
            console.error(error);
            res.status(500).send({ error: 'Payment retrieval failed' });
        } else {
            res.send({ payment });
        }
    });
};
