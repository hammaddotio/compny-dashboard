import React, { useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { authHeaders, checkToken, PAYMENT_URL, URL } from '../constant';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { usePriceList } from '../context/PriceListContext';

const PaymentForm = () => {
    const { selectedPlanForPayment, setSelectedPlanForPayment } = usePriceList();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    console.log(selectedPlanForPayment)
    useEffect(() => {
        // console.log(selectedPlanForPayment);
        // setSelectedPlanForPayment(selectedPlanForPayment);
        const storedPlan = localStorage.getItem('selectedPlan');
        if (storedPlan) {
            setSelectedPlanForPayment(JSON.parse(storedPlan));
        }
    }, []);

    // Fetch and set the selected plan when the component mounts
    // useEffect(() => {
    //     const storedPlan = localStorage.getItem('selectedPlan');
    //     if (storedPlan) {
    //         setSelectedPlanForPayment(JSON.parse(storedPlan));
    //     }
    // }, []);

    console.log(selectedPlanForPayment)
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedPlanForPayment || !selectedPlanForPayment.price) {
            message.error("Selected plan or price is missing.");
            return;
        }

        const amountInCents = parseFloat(selectedPlanForPayment.price) * 100

        // Retrieve user ID from local storage
        const token = localStorage.getItem('token'); // Ensure this key matches how you store user data

        const planType = selectedPlanForPayment.name.split(' ')[0].toLowerCase()
        console.log(selectedPlanForPayment)
        try {
            // Step 1: Create the payment intent
            const { data } = await axios.post(`${URL}${PAYMENT_URL}`, {
                amount: amountInCents,
                isSubscription: true, // Indicate this is a subscription
                token: token, // Use the retrieved user ID
                planType: planType,// Pass the plan ID for subscription
                servicePlan: selectedPlanForPayment._id
            }, {
                headers: {
                    Authorization: checkToken
                }
            });
            console.log(data)

            // Step 2: Confirm the card payment using the client secret
            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                console.error(result.error.message);
                message.error(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // Payment successful, handle subscription creation here
                    const subscriptionId = data.subscriptionId; // Get subscription ID from response
                    if (subscriptionId) {
                        message.success(`Subscription created successfully!`);
                        localStorage.removeItem('selectedPlan')
                    } else {
                        message.success('Payment successful! You are now subscribed.');
                    }
                }
            }
            navigate('/plans'); // Redirect to the dashboard or another page
        } catch (error) {
            console.error('Error processing payment:', error);
            message.error('There was an issue with the payment. Please try again.');
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full md:w-4/5 lg:w-3/5">
                {/* Left Side - Plan Details */}
                <div className="flex-1 p-6">
                    <h2 className="text-2xl font-semibold mb-4">Plan Details</h2>
                    <h3 className="text-lg font-medium">Selected Plan:</h3>
                    <p className="text-xl font-bold">{selectedPlanForPayment?.time}</p>
                    <p className="text-2xl font-bold mb-2">{selectedPlanForPayment?.price}</p>
                    {selectedPlanForPayment?.cutPrice && (
                        <p className="line-through text-red-500">{selectedPlanForPayment?.cutPrice}</p>
                    )}
                    {selectedPlanForPayment?.sale && (
                        <p className="text-green-500">{selectedPlanForPayment?.sale}</p>
                    )}
                    <h4 className="mt-4 text-lg font-medium">Description:</h4>
                    <p className="text-gray-700">{selectedPlanForPayment?.description}</p>
                    <h4 className="mt-4 text-lg font-medium">Services Offered:</h4>
                    <ul className="list-disc ml-5">
                        {selectedPlanForPayment?.services?.map((service, index) => (
                            <li key={index} className="text-gray-800">{service}</li>
                        ))}
                    </ul>
                </div>

                {/* Right Side - Payment Form Card */}
                <div className="flex-shrink-0 w-full md:w-80 p-6 bg-white shadow-md rounded-lg border border-gray-300 mt-4 md:mt-0">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Payment Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="card-element" className="block text-sm font-medium text-gray-700">Credit or Debit Card</label>
                            <CardElement
                                id="card-element"
                                className="mt-1 p-2 border border-gray-300 rounded-md"
                                options={{
                                    hidePostalCode: true,
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!stripe}
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Pay
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default PaymentForm;
