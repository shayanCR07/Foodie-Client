import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FaPaypal } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log("Price is not a number or less than 1");
      return;
    }
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      //console.log("[PaymentMethod]", paymentMethod);
    }
   const { paymentIntent, error: confirmError } =
  await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card,
      billing_details: {
        name: user?.displayName || "anonymous",
        email: user?.email || "unknown",
      },
    },
  });

if (confirmError) {
  console.error(confirmError);
  setCardError(confirmError.message);
  return; // ⛔ STOP EXECUTION HERE
}

if (!paymentIntent) {
  setCardError("Payment failed. No payment intent created.");
  return;
}

if (paymentIntent.status === "succeeded") {
  console.log(paymentIntent.id);
  setCardError(`Your transaction id is: ${paymentIntent.id}`);

  const paymentInfo = {
    email: user.email,
    transactionId: paymentIntent.id,
    price,
    quantity: cart.length,
    status: "Order Pending",
    itemName: cart.map(item => item.name),
    cartItems: cart.map(item => item._id),
    menuItems: cart.map(item => item.menuItemId),
  };

  axiosSecure.post("/payments", paymentInfo).then(res => {
    alert("Payment Successful!");
    navigate("/orders");
  });
}

      
  };
  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8 ">
      {/* left side */}
      <div className="md:w-1/2 w-full space-y-3 ">
        <h4 className="font-semibold text-lg text-black">Order Summary</h4>
        <p>Total Price:{price}</p>
        <p>Number of Item:{cart.length}</p>
      </div>
      {/* right side */}
      <div className="md:w-1/3 w-full space-y-5 card max-w-sm shrink-0 shadow-2xl px-4 py-8 bg-white">
        <h4 className="font-semibold text-lg text-black">
          Process your Payment!
        </h4>
        <h5 className="font-medium">Credit/Debit Card</h5>
        {/* Stripe form */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="btn btn-sm mt-5 bg-blue-800 w-full text-white border-none rounded-full"
          >
            Pay
          </button>
        </form>
        {cardError ? (
          <p className="text-red italic text-xs">{cardError}</p>
        ) : (
          ""
        )}

        {/* paypal */}
        <div className="mt-5 text-center">
          <hr />
          <button
            type="submit"
            className="btn btn-sm mt-5 bg-orange-500 text-white border-none rounded-full"
          >
            <FaPaypal />
            Pay with Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
