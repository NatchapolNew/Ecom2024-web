import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../Api/Stipe";
import useEcomStore from "../../Store/ecom-store";
import CheckoutForm from "../../Components/Card/CheckoutForm";
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51QKX6YD6E763mSSr5zAnIjGdCdvxCn1YZgyv75W22y7lb3TgS1RwCSNS9CNuz9X1Ui4aEEaab3DUv3iC9gCl4Smm00Ul7JEexF");


const Payment = () => {
  const token = useEcomStore((state)=>state.token);
  const [clientSecret, setClientSecret] = useState("");
  
  useEffect(()=>{
    payment(token)
    .then((res)=>{
      console.log(res)
      setClientSecret(res.data.clientSecret)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';


  return (
    <div>
      {
        clientSecret && (
          <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
            <CheckoutForm/>
          </Elements>
        )
      }
    </div>
  )
}

export default Payment