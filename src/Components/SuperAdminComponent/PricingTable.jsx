import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, Loading } from "../../Store/Store";
import { Skeleton, Card, Row, Col, Switch, Button } from "antd";
import { Container, Image } from "react-bootstrap";
import {
  GetAxios,
  openNotificationSuccess,
  PostAxios,
  toCommaAndDollar,
  toSentenceCase,
} from "../Assets/Api/Api";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

export default function PricingTable() {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useRecoilState(Loading);
  const [isYearly, setIsYearly] = useState(false);
  const [hasPurchasedSubscription, setHasPurchasedSubscription] =
    useState(false);
  let DefaultUrl = useRecoilValue(defaultUrl);
  let location = useLocation();

  useEffect(() => {
    setLoading(true);
    FetchData();
  }, []);

  let FetchData = async () => {
    try {
      setLoading(true);
      let res = await GetAxios(DefaultUrl + "/api/products-with-prices");

      if (!res?.products || !Array.isArray(res.products)) {
        throw new Error("Invalid response from pricing API.");
      }

      setPricingPlans(res.products);
      setHasPurchasedSubscription(res.hasPurchasedSubscription);
    } catch (error) {
      console.error("❌ Failed to fetch pricing plans:", error.message);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        error.message || "Failed to load pricing plans."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (priceId) => {
    try {
      const email = localStorage.getItem("loggedInEmail");

      if (!email) {
        throw new Error("User email is missing. Please log in.");
      }
      if (location.pathname === "/SuperAdmin/Adviser_Simplilcity_Packages") {
        openNotificationSuccess(
          "error",
          "topRight",
          "Error Notification",
          "You are not allowed to subscribe from here, please go to the client dashboard."
        );
        return;
      }

      const successUrl = `${window.location.origin}/stripe-redirect?status=${
        hasPurchasedSubscription ? "renew" : "success"
      }`;
      const cancelUrl = `${window.location.origin}/stripe-redirect?status=cancel`;

      const payload = { priceId, email, successUrl, cancelUrl };

      const res = await PostAxios(
        `${DefaultUrl}/api/create-checkout-session`,
        payload
      );

      if (!res?.checkoutUrl) {
        throw new Error("No checkout URL returned by server.");
      }

      window.location.href = res.checkoutUrl;
    } catch (error) {
      console.error("❌ Subscription failed:", error.message);
      openNotificationSuccess(
        "error",
        "topRight",
        "Subscription Error",
        error.message || "Failed to initiate subscription."
      );
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

          const monthlyTotal = monthlyPrice?.amount
            ? monthlyPrice.amount * 12
            : 0;
          const yearlyTotal = yearlyPrice?.amount || 0;
          const discount =
            monthlyTotal && yearlyTotal
              ? ((monthlyTotal - yearlyTotal) / monthlyTotal) * 100
              : 0;

          return (
            <Col
              key={plan?.id || Math.random()}
              xs={24}
              sm={12}
              md={8}
              className="d-flex"
            >
              <Card
                onClick={() =>
                  activePrice?.price_id
                    ? handleSubscribe(activePrice.price_id)
                    : null
                }
                role="button"
                className="slide-top d-flex flex-column w-100"
                bordered
                title={toSentenceCase(plan?.name || "--")}
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
                  flex: "1 1 auto",
                  height: "100%",
                }}
                cover={
                  <Image
                    src={plan?.images?.[0] || ""}
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
                <div className="d-flex flex-column justify-content-start align-items-center flex-grow-1 w-100">
                  {/* Price */}
                  <div className="d-flex justify-content-center align-items-center mb-3 w-100">
                    <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                      ${activePrice?.amount?.toFixed(2) || "--"}
                    </div>
                    <div
                      className="text-muted text-start ms-2"
                      style={{ fontSize: "14px", lineHeight: "1.2" }}
                    >
                      per <br /> {activePrice?.interval || "--"}
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
                        {toCommaAndDollar(monthlyTotal - yearlyTotal || 0) ||
                          "--"}
                      </strong>{" "}
                      compared to monthly
                    </div>
                  )}

                  {/* Features */}
                  <ul
                    className="feature-list w-100 mt-3"
                    style={{ paddingLeft: 0, listStyle: "none" }}
                  >
                    <li className="fw-bold">Features</li>
                    {Array.isArray(plan?.marketing_features) &&
                      plan.marketing_features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-muted mb-1"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <FaCheck
                            style={{ color: "#36b446", marginRight: "6px" }}
                          />
                          {feature || "--"}
                        </li>
                      ))}
                  </ul>

                  {/* Push content above */}
                  <div className="flex-grow-1" />

                  {/* Subscribe button */}
                  <Button
                    disabled={!activePrice?.price_id}
                    className="w-100 p-3"
                    type="primary"
                    onClick={() =>
                      activePrice?.price_id
                        ? handleSubscribe(activePrice.price_id)
                        : null
                    }
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
