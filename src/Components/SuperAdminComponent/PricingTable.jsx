import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import "./PricingTable.css"; // optional for custom styles
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, Loading } from "../../Store/Store";
import { Skeleton, Card, Row, Col, Switch, Button } from "antd";
import { Container, Image } from "react-bootstrap";

import pricingimage from "../Assets/Adviser-Simpilicity.png";
import { FaCheckSquare } from "react-icons/fa";
import { GetAxios, PostAxios, toCommaAndDollar } from "../Assets/Api/Api";
import { FaArrowRight, FaCheck } from "react-icons/fa6";

const stripePromise = loadStripe(
  "pk_test_51RiX6vQ1Wy1AZlw01EIMxbIqvnkm8Y9dO4nXYgQgJUsOazKp80ig15Pg8JiI8KaPT8WMVwyOVOM5uB9HvnBbXXLt006O5kzyWi"
);

const dummyPlans = [
  {
    monthly: {
      priceId: "price_monthly_starter",
      unit_amount: 1000,
    },
    yearly: {
      priceId: "price_yearly_starter",
      unit_amount: 10000,
    },
    nickname: "Starter",
    interval: "month",
    features: ["1 Project", "Email Support", "Basic Analytics"],
    image: pricingimage,
  },
  {
    monthly: {
      priceId: "price_monthly_pro",
      unit_amount: 2000,
    },
    yearly: {
      priceId: "price_yearly_pro",
      unit_amount: 18000,
    },
    nickname: "Pro",
    interval: "month",
    features: ["Unlimited Projects", "Priority Support", "Advanced Analytics"],
    image: pricingimage,
  },
  {
    monthly: {
      priceId: "price_monthly_enterprise",
      unit_amount: 5000,
    },
    yearly: {
      priceId: "price_yearly_enterprise",
      unit_amount: 45000,
    },
    nickname: "Enterprise",
    interval: "month",
    features: ["All Features", "Dedicated Manager", "Custom Integrations"],
    image: pricingimage,
  },
];

export default function PricingTable() {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useRecoilState(Loading);
  const [isYearly, setIsYearly] = useState(false);
  let DefaultUrl = useRecoilValue(defaultUrl);

  useEffect(() => {
    setLoading(true);
    FetchData();
  }, []);

  let FetchData = async () => {
    try {
      let res = await GetAxios(DefaultUrl + "/api/products-with-prices");
      if (res) {
        console.log(res.products);
        setPricingPlans(res.products);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (priceId) => {
    try {
      const email = sessionStorage.getItem("email");
      const successUrl =
        window.location.origin + "/stripe-redirect?status=success";
      const cancelUrl =
        window.location.origin + "/stripe-redirect?status=cancel";
      const Obj = {
        priceId,
        email,
        successUrl,
        cancelUrl,
      };
      console.log(Obj);
      const res = await PostAxios(
        DefaultUrl + "/api/create-checkout-session",
        Obj
      );
      if (res?.url) {
        window.location.href = res.url;
      } else {
        console.error("No checkout URL received");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Container>
        <Row gutter={[16, 16]} justify="center" style={{ padding: "2rem" }}>
          {[1, 2, 3].map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card
                cover={
                  <Skeleton.Image
                    active
                    style={{
                      width: "20.5rem",
                      height: "200px",
                    }}
                  />
                }
              >
                <Skeleton active title={false} paragraph={{ rows: 6 }} />
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  return (
    <Container className="pricingTable mt-5">
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <span
          className={!isYearly ? "fw-bold" : ""}
          style={{ marginRight: 8, color: !isYearly ? "#36b446" : undefined }}
        >
          Monthly
        </span>
        <Switch checked={isYearly} onChange={setIsYearly} />
        <span
          className={isYearly ? "fw-bold" : ""}
          style={{ marginLeft: 8, color: isYearly ? "#36b446" : undefined }}
        >
          Yearly
        </span>
      </div>
      <Row
        gutter={[16, 16]}
        justify="center"
        style={{ padding: "2rem", height: "100%" }}
      >
        {pricingPlans.map((plan) => {
          const monthlyPrice = Array.isArray(plan.prices)
            ? plan.prices.find((p) => p.interval === "month")
            : null;

          const yearlyPrice = Array.isArray(plan.prices)
            ? plan.prices.find((p) => p.interval === "year")
            : null;

          const activePrice = isYearly ? yearlyPrice : monthlyPrice;
          const monthlyTotal = monthlyPrice.amount * 12;
          const yearlyTotal = yearlyPrice.amount;
          const discount = ((monthlyTotal - yearlyTotal) / monthlyTotal) * 100;

          return (
            <Col key={plan.id} xs={24} sm={12} md={8} className="d-flex">
              <Card
                role="button"
                className="slide-top d-flex flex-column w-100"
                bordered
                title={plan.name}
                headStyle={{
                  fontSize: "20px",
                  textAlign: "center",
                  borderBottom: "0px",
                  fontWeight: "700",
                }}
                bodyStyle={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  flex: "1 1 auto", // necessary!
                  height: "100%", // ensure body stretches
                }}
                cover={
                  <Image
                    src={plan?.images[0] || ""}
                    alt="Pricing Table image"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "scale-down",
                      padding: "0px 20px",
                    }}
                  />
                }
              >
                {/* This wrapper ensures correct stretch */}
                <div className="d-flex flex-column justify-content-start align-items-center flex-grow-1 w-100">
                  {/* Price */}
                  <div className="d-flex justify-content-center align-items-center mb-3 w-100">
                    <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                      ${activePrice.amount.toFixed(2)}
                    </div>
                    <div
                      className="text-muted text-start ms-2"
                      style={{ fontSize: "14px", lineHeight: "1.2" }}
                    >
                      per <br /> {activePrice.interval}
                    </div>
                  </div>

                  {/* Discount */}
                  {isYearly && discount > 0 && (
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#36b446",
                        fontWeight: "500",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      Save{" "}
                      <strong>
                        {toCommaAndDollar(monthlyTotal - yearlyTotal)}{" "}
                      </strong>
                      compared to monthly
                    </div>
                  )}

                  {/* Features */}
                  <ul
                    className="feature-list w-100 mt-3"
                    style={{ paddingLeft: 0, listStyle: "none" }}
                  >
                    <li className="fw-bold">Features</li>
                    {plan.marketing_features?.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-muted mb-1"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <FaCheck
                          style={{ color: "#36b446", marginRight: "6px" }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Push content above */}
                  <div className="flex-grow-1" />

                  {/* Subscribe button */}
                  <Button
                    className="w-100 p-3"
                    type="primary"
                    onClick={() => handleSubscribe(activePrice.price_id)}
                  >
                    Subscribe <FaArrowRight />
                  </Button>

                  {/* Payment note */}
                  <p
                    className="text-muted mt-2 mb-0"
                    style={{ fontSize: "10px", textAlign: "center" }}
                  >
                    Payments are <strong>100% secure</strong>.<br />
                    Payment methods: Credit/Debit Card, Apple Pay, Google Pay
                  </p>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
