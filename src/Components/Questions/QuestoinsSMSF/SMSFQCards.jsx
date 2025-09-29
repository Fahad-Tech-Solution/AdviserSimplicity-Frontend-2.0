import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { CRState, QuestionDetail } from "../../../Store/Store";
import { useRecoilValue } from "recoil";

import will from "../svgs/page-with-curl-svgrepo-com.svg";
import investmentCircle from "../svgs/investmentCircle.png";
import property from "../svgs/property-value.svg";
import calender from "../svgs/calendar.png";
import BankImg from "../svgs/bank.svg";
import TermImg from "../svgs/TermDepositCanva.png";
import PortFolio from "../svgs/portfolio.svg";
import analytics from "../svgs/analytics.png";
import funds from "../svgs/funds.svg";
// import people from "../svgs/Questions_People.png";
import people from "../svgs/property-value.svg";

import SMSFInvestmentProperty from "./SMSFInvestmentProperty";
import { toCommaAndDollar } from "../../Assets/Api/Api";
import SampleOne from "../AdditionalQueriesPersonalAssets/SampleOne";

const SMSFQCards = (props) => {
  let {
    OpenModal,
    arrayCount,
    jointClass,
    PartnerClass,
    SmsFElem,
    index,
    OpenReuseModal,
    evenClass,
    open,
    setOpen,
    PopoverContent,
  } = props;

  let questionDetail = useRecoilValue(QuestionDetail);
  let CRObject = useRecoilValue(CRState);

  let [renderFlag, setRenderFlag] = useState(false);

  let SmsFCards = [
    {
      title: "SMSF Details",
      key: "SMSFDetails",
      img: will,
    },
    {
      title: "SMSF Accumulation Details",
      key: "SMSFAccumulationDetails",
      img: property,
    },
    {
      title: "SMSF Pension Phase",
      key: "SMSFPensionPhase",
      img: calender,
    },
    {
      title: "SMSF Bank Accounts",
      key: "SMSFBank",
      img: BankImg,
    },
    {
      title: "SMSF Term Deposits",
      key: "SMSFTermDeposits",
      img: TermImg,
    },
    {
      title: "SMSF Australian Shares/ETFs",
      key: "SMSFAustralianShares",
      img: PortFolio,
    },
    {
      title: "SMSF Platform Investments",
      key: "SMSFManagedFunds",
      img: funds,
    },

    {
      title: "SMSF Investment Loan",
      key: "SMSFInvestmentLoan",
      img: analytics,
    },
    {
      title: "SMSF Investment Properties",
      key: "SMSFInvestmentProperties",
      img: people,
    },
    {
      title: "Other Investments",
      key: "SMSFOtherInvestment",
      img: investmentCircle,
    },
  ];

  const SMSFDetailsSubmitted =
    questionDetail.SMSFDetails &&
    Object.keys(questionDetail.SMSFDetails || {}).length > 0
      ? true
      : false;

  let GetValue = () => {
    try {
      // Check if SMSFAccumulationDetails.SMSFTotal exists and parse it to a number
      const SMSFAccumulationDetailsClientTotal = questionDetail
        ?.SMSFAccumulationDetails?.clientTotal
        ? parseFloat(
            questionDetail.SMSFAccumulationDetails.clientTotal.replace(
              /[^0-9.-]+/g,
              ""
            )
          )
        : 0;
      // Check if SMSFAccumulationDetails.SMSFTotal exists and parse it to a number
      const SMSFAccumulationDetailsPartnerTotal = questionDetail
        ?.SMSFAccumulationDetails?.partnerTotal
        ? parseFloat(
            questionDetail.SMSFAccumulationDetails.partnerTotal.replace(
              /[^0-9.-]+/g,
              ""
            )
          )
        : 0;
      // Check if SMSFAccumulationDetails.SMSFTotal exists and parse it to a number
      const SMSFAccumulationDetailsJointTotal = questionDetail
        ?.SMSFAccumulationDetails?.jointTotal
        ? parseFloat(
            questionDetail.SMSFAccumulationDetails.jointTotal.replace(
              /[^0-9.-]+/g,
              ""
            )
          )
        : 0;

      // Check if SMSFAccumulationDetails.SMSFTotal exists and parse it to a number
      const SMSFPensionPhaseClientTotal = questionDetail?.SMSFPensionPhase
        ?.clientTotal
        ? parseFloat(
            questionDetail.SMSFPensionPhase.clientTotal.replace(
              /[^0-9.-]+/g,
              ""
            )
          )
        : 0;
      // Check if SMSFPensionPhase.SMSFTotal exists and parse it to a number
      const SMSFPensionPhasePartnerTotal = questionDetail?.SMSFPensionPhase
        ?.partnerTotal
        ? parseFloat(
            questionDetail.SMSFPensionPhase.partnerTotal.replace(
              /[^0-9.-]+/g,
              ""
            )
          )
        : 0;
      // Check if SMSFPensionPhase.SMSFTotal exists and parse it to a number
      const SMSFPensionPhaseJointTotal = questionDetail?.SMSFPensionPhase
        ?.jointTotal
        ? parseFloat(
            questionDetail.SMSFPensionPhase.jointTotal.replace(/[^0-9.-]+/g, "")
          )
        : 0;

      return toCommaAndDollar(
        SMSFAccumulationDetailsClientTotal +
          SMSFAccumulationDetailsPartnerTotal +
          SMSFAccumulationDetailsJointTotal +
          SMSFPensionPhaseClientTotal +
          SMSFPensionPhasePartnerTotal +
          SMSFPensionPhaseJointTotal
      );
    } catch (error) {
      console.error("Error calculating SMSF totals:", error);
      return "$0";
    }
  };

  const reuseModal = [
    "SMSFBank",
    "SMSFTermDeposits",
    "SMSFAustralianShares",
    "SMSFManagedFunds",
  ]; // add "Key" of Question on which you want to add Form in Cards only no pop ups

  return (
    <React.Fragment>
      {SmsFCards.map((SmsFElem, Pindex) => {
        const SMSFDetailsCard = SmsFElem.key === "SMSFDetails" ? true : false;

        const SMSFIP =
          SmsFElem.key === "SMSFInvestmentProperties" ? true : false;
        const SMSFReuse = reuseModal.includes(SmsFElem.key) ? true : false;
        const simpleWithOutJoin =
          SmsFElem.key === "SMSFInvestmentLoan" ? true : false;
        const SMSFOther = SmsFElem.key === "SMSFOtherInvestment" ? true : false;

        if (SMSFDetailsCard) {
          return (
            <React.Fragment key={Pindex}>
              <div className={`${evenClass ? "col-md-3" : "col-md-4"}  mb-4`}>
                <Card
                  className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex"
                  style={{ borderRadius: "20px", height: "100%" }}
                >
                  <h5 className="text-center">
                    {SMSFDetailsSubmitted
                      ? questionDetail.SMSFDetails.SMSFOwner.fundName
                      : SmsFElem.title}
                  </h5>
                  <div className="QuestionIcon CardImg">
                    <img className="img-fluid" src={SmsFElem.img} alt="" />
                  </div>
                  <div className="row justify-content-center align-items-center my-2">
                    <div className="col-12 p-0 ">
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <label
                          className=" d-block "
                          htmlFor={"client" + SmsFElem.key}
                        >
                          Total Fund Value {SmsFElem.title}
                        </label>

                        <label
                          className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                          onClick={() => {
                            OpenModal(SmsFElem.title, "client", SmsFElem.key);
                          }}
                          onMouseEnter={() => setOpen(true)}
                          onMouseLeave={() => setOpen(false)}
                        >
                          <div>
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control inputDesign"
                    id={"client" + SmsFElem.key}
                    placeholder={SmsFElem.title}
                    name={"client" + SmsFElem.key}
                    value={GetValue()}
                  />
                </Card>
              </div>
            </React.Fragment>
          );
        } else if (SMSFIP) {
          return (
            <SampleOne
              PartnerClass={PartnerClass}
              index={Pindex}
              jointClass={jointClass}
              elem={SmsFElem}
              OpenModal={OpenModal}
              arrayCount={arrayCount}
              evenClass={evenClass}
              open={open}
              setOpen={setOpen}
              PopoverContent={PopoverContent}
            />
          );
        } else if (SMSFDetailsSubmitted) {
          if (CRObject[SmsFElem.key] === "Yes") {
            if (SMSFReuse) {
              return (
                <div
                  className={`${evenClass ? "col-md-3" : "col-md-4"} mb-4`}
                  key={index}
                >
                  asda123
                  <Card
                    className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex"
                    style={{ borderRadius: "20px", height: "100%" }}
                  >
                    <h5
                      className="text-center"
                      onClick={() => {
                        console.log(questionDetail[SmsFElem.key]);
                      }}
                    >
                      {SmsFElem.title}
                    </h5>

                    <div className="QuestionIcon CardImg">
                      <img className="img-fluid" src={SmsFElem.img} alt="" />
                    </div>
                    <div className="row justify-content-center align-items-center my-2">
                      <div className="col-12 p-0 ">
                        <div className="d-flex flex-column-reverse justify-content-center align-items-center gap-2">
                          <label
                            className=" d-block "
                            htmlFor={"client" + SmsFElem.key}
                          >
                            {localStorage.getItem("UserName") || "You"}
                          </label>
                          <ButtonDrawer
                            title={SmsFElem.title}
                            placement="top"
                            height={300}
                            width={"70%"}
                            DrawerContent={PopoverContent(
                              SmsFElem.title,
                              "client",
                              SmsFElem.key
                            )}
                            setOpen={setOpen}
                            open={open}
                          >
                            <label
                              className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                              onClick={() => {
                                OpenReuseModal(
                                  SmsFElem.title,
                                  "client",
                                  SmsFElem.key
                                );
                              }}
                              onMouseEnter={() => setOpen(true)}
                              onMouseLeave={() => setOpen(false)}
                            >
                              <div>
                                <FontAwesomeIcon
                                  icon={faArrowUpRightFromSquare}
                                />
                              </div>
                            </label>
                          </ButtonDrawer>
                        </div>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control inputDesign "
                      id={"client" + SmsFElem.key}
                      placeholder={SmsFElem.title}
                      name={"client" + SmsFElem.key}
                      value={
                        questionDetail &&
                        questionDetail[SmsFElem.key]?.clientTotal
                          ? questionDetail[SmsFElem.key].clientTotal
                          : ""
                      }
                    />
                    <div
                      className={`row justify-content-center align-items-center my-2 ${PartnerClass}`}
                    >
                      <div className="col-12 p-0 ">
                        <div className="d-flex flex-column-reverse justify-content-center align-items-center gap-2">
                          <label
                            className=" d-block "
                            htmlFor={"partner" + SmsFElem.key}
                          >
                            {localStorage.getItem("PartnerName") || "Partner"}
                          </label>
                        </div>
                      </div>
                    </div>
                    <input
                      type="text"
                      className={`form-control inputDesign ${PartnerClass}`}
                      id={"partner" + SmsFElem.key}
                      placeholder={SmsFElem.title}
                      name={"partner" + SmsFElem.key}
                      value={
                        questionDetail &&
                        questionDetail[SmsFElem.key]?.partnerTotal
                          ? questionDetail[SmsFElem.key].partnerTotal
                          : ""
                      }
                    />
                  </Card>
                </div>
              );
            } else if (simpleWithOutJoin) {
              return (
                <div
                  className={`${evenClass ? "col-md-3" : "col-md-4"} mb-4`}
                  key={index}
                >
                  <Card
                    className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex"
                    style={{ borderRadius: "20px", height: "100%" }}
                  >
                    <h5
                      className="text-center"
                      onClick={() => {
                        console.log(questionDetail[SmsFElem.key]);
                      }}
                    >
                      {SmsFElem.title}
                    </h5>

                    <div className="QuestionIcon CardImg">
                      <img className="img-fluid" src={SmsFElem.img} alt="" />
                    </div>
                    <div className="row justify-content-center align-items-center my-2">
                      <div className="col-12 p-0 ">
                        <div className="d-flex flex-column-reverse justify-content-center align-items-center gap-2">
                          <label
                            className=" d-block "
                            htmlFor={"client" + SmsFElem.key}
                          >
                            {localStorage.getItem("UserName") || "You"}
                          </label>

                          <label
                            className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                            onClick={() => {
                              OpenModal(SmsFElem.title, "client", SmsFElem.key);
                            }}
                          >
                            <div>
                              <FontAwesomeIcon
                                icon={faArrowUpRightFromSquare}
                              />
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control inputDesign "
                      id={"client" + SmsFElem.key}
                      placeholder={SmsFElem.title}
                      name={"client" + SmsFElem.key}
                      value={
                        questionDetail &&
                        questionDetail[SmsFElem.key]?.clientTotal
                          ? questionDetail[SmsFElem.key].clientTotal
                          : ""
                      }
                    />
                    <div
                      className={`row justify-content-center align-items-center my-2 ${PartnerClass}`}
                    >
                      <div className="col-12 p-0 ">
                        <div className="d-flex flex-column-reverse justify-content-center align-items-center gap-2">
                          <label
                            className=" d-block "
                            htmlFor={"partner" + SmsFElem.key}
                          >
                            {localStorage.getItem("PartnerName") || "Partner"}
                          </label>
                        </div>
                      </div>
                    </div>
                    <input
                      type="text"
                      className={`form-control inputDesign ${PartnerClass}`}
                      id={"partner" + SmsFElem.key}
                      placeholder={SmsFElem.title}
                      name={"partner" + SmsFElem.key}
                      value={
                        questionDetail &&
                        questionDetail[SmsFElem.key]?.partnerTotal
                          ? questionDetail[SmsFElem.key].partnerTotal
                          : ""
                      }
                    />
                  </Card>
                </div>
              );
            } else if (SMSFOther) {
              return (
                <div
                  className={`${evenClass ? "col-md-3" : "col-md-4"} mb-4`}
                  key={index}
                >
                  <Card
                    className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex"
                    style={{ borderRadius: "20px", height: "100%" }}
                  >
                    <h5
                      className="text-center"
                      onClick={() => {
                        console.log(questionDetail[SmsFElem.key]);
                      }}
                    >
                      {SmsFElem.title}
                    </h5>

                    <div className="QuestionIcon CardImg">
                      <img className="img-fluid" src={SmsFElem.img} alt="" />
                    </div>
                    <div className="row justify-content-center align-items-center my-2">
                      <div className="col-12 p-0 ">
                        <div className="d-flex flex-column-reverse justify-content-center align-items-center gap-2">
                          <label
                            className=" d-block "
                            htmlFor={"client" + SmsFElem.key}
                          >
                            {localStorage.getItem("UserName") || "You"}
                          </label>

                          <label
                            className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                            onClick={() => {
                              OpenModal(SmsFElem.title, "client", SmsFElem.key);
                            }}
                          >
                            <div>
                              <FontAwesomeIcon
                                icon={faArrowUpRightFromSquare}
                              />
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control inputDesign "
                      id={"client" + SmsFElem.key}
                      placeholder={SmsFElem.title}
                      name={"client" + SmsFElem.key}
                      value={
                        questionDetail &&
                        questionDetail[SmsFElem.key]?.clientTotal
                          ? questionDetail[SmsFElem.key].clientTotal
                          : ""
                      }
                    />
                  </Card>
                </div>
              );
            } else {
              return (
                <React.Fragment key={Pindex}>
                  <div
                    className={`${evenClass ? "col-md-3" : "col-md-4"} mb-4`}
                  >
                    <Card
                      className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex"
                      style={{ borderRadius: "20px", height: "100%" }}
                    >
                      <h5
                        className="text-center"
                        onClick={() => {
                          console.log(questionDetail[SmsFElem.key]);
                        }}
                      >
                        {SmsFElem.title}
                      </h5>
                      <div
                        className="d-flex justify-content-center flex-column"
                        style={{ marginTop: "auto" }}
                      >
                        <div className="QuestionIcon CardImg">
                          <img
                            className="img-fluid"
                            src={SmsFElem.img}
                            alt=""
                          />
                        </div>
                        <div className="row justify-content-center align-items-center my-2">
                          <div className="col-12 p-0 ">
                            <div className="d-flex justify-content-center align-items-center gap-2">
                              <label
                                className=" d-block "
                                htmlFor={"client" + SmsFElem.key}
                              >
                                {localStorage.getItem("UserName") || "You"}
                              </label>

                              <label
                                className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                onClick={() => {
                                  OpenModal(
                                    SmsFElem.title,
                                    "client",
                                    SmsFElem.key
                                  );
                                }}
                              >
                                <div>
                                  <FontAwesomeIcon
                                    icon={faArrowUpRightFromSquare}
                                  />
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-control inputDesign "
                          id={"client" + SmsFElem.key}
                          placeholder={SmsFElem.title}
                          name={"client" + SmsFElem.key}
                          value={
                            questionDetail &&
                            questionDetail[SmsFElem.key]?.clientTotal
                              ? questionDetail[SmsFElem.key].clientTotal
                              : ""
                          }
                        />
                        <div
                          className={`row justify-content-center align-items-center my-2 ${PartnerClass}`}
                        >
                          <div className="col-12 p-0 ">
                            <div className="d-flex flex-column-reverse justify-content-center align-items-center gap-2">
                              <label
                                className=" d-block "
                                htmlFor={"partner" + SmsFElem.key}
                              >
                                {localStorage.getItem("PartnerName") ||
                                  "Partner"}
                              </label>
                            </div>
                          </div>
                        </div>
                        <input
                          type="text"
                          className={`form-control inputDesign ${PartnerClass}`}
                          id={"partner" + SmsFElem.key}
                          placeholder={SmsFElem.title}
                          name={"partner" + SmsFElem.key}
                          value={
                            questionDetail &&
                            questionDetail[SmsFElem.key]?.partnerTotal
                              ? questionDetail[SmsFElem.key].partnerTotal
                              : ""
                          }
                        />

                        <div
                          className={`row justify-content-center align-items-center my-2  ${jointClass} ${PartnerClass}`}
                        >
                          <div className="col-12 p-0 ">
                            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                              <label
                                className=" d-block "
                                htmlFor={"joint" + SmsFElem.key}
                              >
                                {(localStorage.getItem("UserName") || "You") +
                                  " " +
                                  (localStorage.getItem("PartnerName") || "")}
                              </label>
                            </div>
                          </div>
                        </div>

                        <input
                          type="text"
                          className={`form-control inputDesign ${jointClass} ${PartnerClass}`}
                          id={"joint" + SmsFElem.key}
                          placeholder={SmsFElem.title}
                          name={"joint" + SmsFElem.key}
                          value={
                            questionDetail &&
                            questionDetail[SmsFElem.key]?.jointTotal
                              ? questionDetail[SmsFElem.key].jointTotal
                              : ""
                          }
                        />
                      </div>
                    </Card>
                  </div>
                </React.Fragment>
              );
            }
          }
        }
      })}
    </React.Fragment>
  );
};

export default SMSFQCards;
