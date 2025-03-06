"use cllient"

import React from 'react';
import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface PaypalButtonProps {
    amount: number;
    onSuccess: any;
    courseId: string;
}

const PaypalButton = ({ amount, courseId, onSuccess }: PaypalButtonProps) => {
  const { data: session } = useSession();

  return (
    <>
      <PayPalButtons 
          
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                  {
                      amount: { value: amount },
                      custom_id: `${session?.user?.id}-${courseId}`
                  },
              ],
            }); 
          }}
          onApprove={async (DataTransfer, actions) => {
              const order = await actions.order?.capture();
              console.log("Paypal order:", order)

              const paymentDetails = {
                order_id: order?.id,
                transaction_id: order?.purchase_units[0].payments?.captures[0].id,
                payer_email: order?.payer?.email_address,
                user_id: `${session?.user?.id}`,
                course_id: courseId,
                amount: order?.purchase_units[0].amount?.value,
                currency: order?.purchase_units[0].amount?.currency_code,
                payment_method: "Paypal",
                status: order?.status,
              }


            const response = await axios.post(`${process.env.NEXT_PUBLIC_APIURL}/payments/student/payment`, paymentDetails, {
                headers: {
                  'Authorization': `Token ${session?.accessToken}`,
                },
              });
              console.log("Payments done")
              console.log("Response: ", response)
              if(response.data == 201){
                onSuccess(order);
              }
              
          }}

          onCancel={(data) => {
            toast.error("Payment was cancelled. Please try again.")
          }}

          onError={(error) => {
            toast.error("Something went wrong with your payments. Please try again");
          }}
      />
      
      {/* Google Pay Button */}
      {/* <PayPalButtons fundingSource={FUNDING.GOOGLEPAY} /> */}

      {/* Apple Pay Button */}
      {/* <PayPalButtons fundingSource={FUNDING.APPLEPAY} /> */}
    </>
  );
}

export default PaypalButton