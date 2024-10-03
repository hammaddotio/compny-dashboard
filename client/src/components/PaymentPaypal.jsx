import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaymentPaypal = () => {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = (orderID) => {
        // Call your backend to verify the order and store payment info
        setPaidFor(true);
        alert("Payment Successful! Your order ID is: " + orderID);
    };

    if (paidFor) {
        return <h1>Thank you for your payment!</h1>;
    }

    if (error) {
        return <h1>Something went wrong with the payment. Please try again.</h1>;
    }

    return (
        <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "100.00", // Replace this with the amount you want to charge
                                },
                            },
                        ],
                    });
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    handleApprove(order.id);
                }}
                onError={(err) => {
                    setError(err);
                    console.error("PayPal Checkout Error:", err);
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PaymentPaypal;
