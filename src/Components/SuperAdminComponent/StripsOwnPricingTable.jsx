import { useEffect } from "react";

export default function StripsOwnPricingTable() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="p-2">
      <stripe-pricing-table
        pricing-table-id="prctbl_1RiZN5Q1Wy1AZlw0FGrPygMj"
        publishable-key="pk_test_51RiX6vQ1Wy1AZlw01EIMxbIqvnkm8Y9dO4nXYgQgJUsOazKp80ig15Pg8JiI8KaPT8WMVwyOVOM5uB9HvnBbXXLt006O5kzyWi"
      ></stripe-pricing-table>
    </div>
  );
}
