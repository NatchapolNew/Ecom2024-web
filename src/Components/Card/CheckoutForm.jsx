import React, { useState } from "react";
import { Link , useNavigate} from 'react-router-dom';
import '../../Stripe.css'
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { saveOrder } from "../../Api/user";
import useEcomStore from "../../Store/ecom-store";
import { toast } from "react-toastify";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = useEcomStore((state)=>state.token)
  const clearCart = useEcomStore((state)=>state.clearCart)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
    redirect:'if_required'
    });

    console.log('payload',payload)
    if (payload.error) {
      setMessage(payload.error.message);
      toast.error(payload.error.message)
      console.log('error')
    } 
    else if(payload.paymentIntent.status === "succeeded"){
      console.log('Ready or Saveorder')
       //create order
       saveOrder(token,payload)
       .then((res)=>{
        console.log(res)
        clearCart()
        toast.success('ชำระเงินสำเร็จ')
        navigate('/user/history')
       })
       .catch((err)=>{
        console.log(err)
       })
    }
    else {
      console.log('Something wrong!!!')
      toast.warning('ชำระเงินไม่สำเร็จ')
        //create order
      //  saveOrder(token,payload)
      //  .then((res)=>{
      //   console.log(res)
      //   toast.success('ชำระเงินสำเร็จ')
      //  })
      //  .catch((err)=>{
      //   console.log(err)
      //  })
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <>
      <form
      className="space-y-6" 
      id="payment-form" onSubmit={handleSubmit}>

        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit"
                className="stripe-button">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}