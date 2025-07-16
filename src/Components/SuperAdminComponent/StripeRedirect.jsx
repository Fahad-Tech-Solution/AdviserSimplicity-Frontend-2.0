import React from "react";
import { useSearchParams } from "react-router-dom";
import { Result, Button } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

const StripeRedirect = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  //   success_url: 'https://your-app.com/stripe-redirect?status=success',
  //   cancel_url: 'https://your-app.com/stripe-redirect?status=cancel',

  if (status === "success") {
    return (
      <Result
        status="success"
        title="Payment Successful!"
        subTitle="Thank you for your purchase. Your subscription is now active."
        icon={<SmileOutlined />}
        extra={
          <Button type="primary" href="/Dashboard">
            Next step
          </Button>
        }
      />
    );
  }

  if (status === "cancel") {
    return (
      <Result
        status="error"
        title="Payment Cancelled"
        subTitle="Your payment was cancelled. You can try again anytime."
        icon={<FrownOutlined />}
        extra={
          <Button type="primary" href="/PricingTable">
            Go Back to Pricing
          </Button>
        }
      />
    );
  }

  return (
    <Result
      status="info"
      title="Awaiting Payment Result..."
      subTitle="You will be redirected once the payment status is determined."
    />
  );
};

export default StripeRedirect;
