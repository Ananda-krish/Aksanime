import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Stripe public key
const stripePromise = loadStripe('pk_test_51Qr1rnFVcK53BZ6pOREO2L5HPLRudMQOHfR64sqRplsdacTPUai990Bt6gxsTZ3GiDNkmOeL9eJJN64QioalGfZP00Am26NZUk');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { total } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    extractUserDataFromToken();
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/api/stripe/create-payment-intent',
        { amount: total },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setClientSecret(response.data.clientSecret);
    } catch (err) {
      setError('Failed to initialize payment');
      console.error(err);
    }
  };

  const extractUserDataFromToken = () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedToken = JSON.parse(window.atob(base64));

      setFormData({
        name: decodedToken.name || '',
        phone: decodedToken.phone_number || '',
        address: '',
      });
    } catch (err) {
      console.error('Error extracting user data:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements || !clientSecret) {
      return;
    }
  
    setProcessing(true);
    setError(null);
  
    try {
      // Step 1: Confirm the payment with Stripe
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: formData.name,
              phone: formData.phone,
              address: {
                line1: formData.address,
              },
            },
          },
        }
      );
  
      if (paymentError) {
        throw new Error(paymentError.message);
      }
  
      if (paymentIntent.status === 'succeeded') {
        // Step 2: Send order details to backend
        const token = localStorage.getItem('token');
        const orderResponse = await axios.post(
          'http://localhost:8000/api/stripe/complete-order',
          {
            name: formData.name,
            address: formData.address,
            phone: formData.phone
          },
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
  
        // Verify the backend response
        if (orderResponse.data.message === 'Order placed successfully') {
          setPaymentSuccess(true);
          setTimeout(() => navigate('/Productcart'), 3000);
        } else {
          throw new Error('Order creation failed on server');
        }
      }
    } catch (err) {
      setError(err.message || 'Payment processing failed');
      console.error('Payment error:', err);
      
      // Show detailed error to user
      if (err.response) {
        console.error('Server response:', err.response.data);
        setError(err.response.data.error || 'Payment failed');
      }
    } finally {
      setProcessing(false);
    }
  };

  // Success Message Component
  const SuccessMessage = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-8 text-center bg-white rounded-lg shadow-2xl">
        <svg 
          className="w-16 h-16 mx-auto mb-4 text-green-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h2 className="mb-4 text-2xl font-bold text-green-700">Payment Successful!</h2>
        <p className="text-gray-600">Your order has been processed successfully.</p>
        <p className="text-sm text-gray-500">Redirecting to cart...</p>
      </div>
    </div>
  );

  return (
    <>
      {paymentSuccess && <SuccessMessage />}
      <form onSubmit={handleSubmit} className="max-w-md p-6 mx-auto mt-8 rounded-lg shadow-lg bg-amber-100">
        <h2 className="mb-6 text-2xl font-bold text-amber-900">Complete Your Payment</h2>
        
        <div className="mb-4">
          <p className="text-lg font-semibold text-amber-900">Total Amount: ${total}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-amber-900">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded text-amber-900 border-amber-900"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-amber-900">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded text-amber-900 border-amber-900"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-amber-900">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded text-amber-900 border-amber-900"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-amber-900">Card Details</label>
            <div className="p-3 bg-white border-2 rounded border-amber-900">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#713f12',
                      '::placeholder': {
                        color: '#92400e',
                      },
                    },
                    invalid: {
                      color: '#9f1239',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 mt-4 text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || processing || !clientSecret}
          className="w-full px-6 py-3 mt-6 font-bold rounded-lg bg-amber-900 text-amber-50 hover:bg-amber-800 disabled:bg-amber-300 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </>
  );
};

const StripePaymentForm = () => {
  return (
    <div className="min-h-screen py-12 bg-amber-50">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default StripePaymentForm;