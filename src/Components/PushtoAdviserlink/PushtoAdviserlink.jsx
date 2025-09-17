import React, { useState } from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import agePension from "../Questions/svgs/Age-Pension-Image.jpg";
import LIHC from "../Questions/svgs/LIHC-Image.jpg";
import CSHC from "../Questions/svgs/CSHC-Imag.jpg";
import { Alert, Button, message, Result, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const PushtoAdviserlink = (props) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");

  const cardTitle = {
    color: "#080808ff",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "12px",
    fontSize: "18px",
  };

  const textStyle = {
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#495057",
    textAlign: "justify",
    marginBottom: "12px",
  };

  const ApiResponce = {
    adviserNotExist: {
      status: "403",
      respoonsTitle: "Account Not Found",
      buttonText: "Create your Account",
      message: "Click following button to create new Account on Adviser link",
    },
    adviserCreated: {
      status: "404",
      buttonText: "Create your Account",
    },
    subscriptionEnded: {
      status: "404",
      respoonsTitle: "Subscription Ended",
      message: (
        <p className="m-0">
          Your Subscription is ended on Adviser-link <br /> Please click on
          following button to renew your subscription
        </p>
      ),
      buttonText: "Renew Your Subscription",
    },
    clientNotExist: {
      status: "404",
      buttonText: "add your this client in Adviser link",
    },
    clientCreated: {
      status: "201",
      buttonText: "Create your Account",
    },
  };

  let load = async (calculator) => {
    setLoading(true);
    setAlert(null);
    try {
      await new Promise((_, reject) =>
        setTimeout(() => {
          const error = new Error("adviserNotExist");
          error.status = 404;
          reject(error);
        }, 1000)
      );
      // If no error, continue here
    } catch (error) {
      console.log(error);
      if (error.status === 404 && error.message === "adviserNotExist") {
        setAlert(error);
      }
    } finally {
      setLoading(false);
    }
  };

  let Nevigate = useNavigate();

  let respectiveAction = async (currentResponce) => {
    switch (currentResponce.status) {
      case "403":
      case "404":
        Nevigate("/buy-adviser-link");
        break;
      case "201":
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      {loading && (
        <div
          className="w-100 d-flex justify-content-center align-items-center"
          style={{ minHeight: "30vh" }}
        >
          <Spin size="large" tip="Loading workspaces..." />
        </div>
      )}

      {alert && (
        <Result
          status={ApiResponce?.[alert.message]?.status || "404"}
          title={ApiResponce?.[alert.message]?.respoonsTitle || "404"}
          subTitle={ApiResponce?.[alert.message]?.message || "no Key Matched"}
          extra={
            <Button
              type="primary"
              onClick={() => {
                respectiveAction(ApiResponce?.[alert.message]);
              }}
            >
              {ApiResponce?.[alert.message]?.buttonText || "no key Matched"}
            </Button>
          }
        />
      )}

      {!alert && !loading && (
        <Row className="g-4 align-items-stretch pushToAdviserlink">
          {/* Age Pension Card */}
          <Col lg={12} md={12} sm={12} className="">
            <h5>
              {props?.modalObject?.row?.client?.clientGivenName || "not Found"}{" "}
              ({props?.modalObject?.row?.client?.Email || "not Found"})
            </h5>
          </Col>

          <Col lg={4} md={4} sm={12} className="d-flex">
            <Card
              className="border-0 h-100"
              onClick={() => {
                load("Age-Pension");
              }}
            >
              <Card.Body style={{ padding: "25px" }}>
                <Image variant="top" src={agePension} fluid />
                <h4 style={cardTitle}>Age Pension</h4>

                <Button
                  className="w-100"
                  type="primary"
                  onClick={() => {
                    load("Age-Pension");
                  }}
                >
                  Get Started
                </Button>

                <div className="mt-3">
                  <p style={textStyle}>
                    The Age Pension is a fortnightly payment (as of 1 January
                    2023) paid by the government for those over 67 who meet the
                    required income and assets tests.
                  </p>
                  <p style={{ ...textStyle, marginBottom: "0" }}>
                    Retirees who qualify for the Age Pension automatically
                    receive the Pensioner Concession Card (PCC).
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Commonwealth Senior Health Care Card */}
          <Col lg={4} md={4} sm={12} className="d-flex">
            <Card
              className="border-0 h-100"
              onClick={() => {
                load("CSHC");
              }}
            >
              <Card.Body style={{ padding: "25px" }}>
                <Image variant="top" src={CSHC} fluid />
                <h4 style={cardTitle}>Commonwealth Senior Health Care</h4>

                <Button
                  className="w-100"
                  type="primary"
                  onClick={() => {
                    load("CSHC");
                  }}
                >
                  Get Started
                </Button>

                <div className="mt-3">
                  <p style={textStyle}>
                    The Commonwealth Seniors Health Card (CSHC) may be available
                    to self-funded retirees of Age Pension age who don't meet
                    the eligibility requirements for the Age Pension.
                  </p>
                  <p style={{ ...textStyle, marginBottom: "0" }}>
                    Retired clients who meet the income test criteria for the
                    CSHC can benefit from savings for medication, health care
                    and other services.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Low Income Health Care Card */}
          <Col lg={4} md={4} sm={12} className="d-flex">
            <Card
              className="border-0 h-100"
              onClick={() => {
                load("LIHC");
              }}
            >
              <Card.Body style={{ padding: "25px" }}>
                <Image variant="top" src={LIHC} fluid />
                <h4 style={cardTitle}>Low Income Health Care</h4>

                <Button
                  className="w-100"
                  type="primary"
                  onClick={() => {
                    load("LIHC");
                  }}
                >
                  Get Started
                </Button>

                <div className="mt-3">
                  <p style={textStyle}>
                    Retirees who aren't old enough for the Age Pension may be
                    able to receive the Low Income Health Care Card (LIHCC),
                    which gives them similar benefits as the Pensioner
                    Concession Card (PCC) and the Commonwealth Seniors Health
                    Care Card (CSHC).
                  </p>
                  <p style={{ ...textStyle, marginBottom: "0" }}>
                    To qualify, retirees must meet the income test.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PushtoAdviserlink;
