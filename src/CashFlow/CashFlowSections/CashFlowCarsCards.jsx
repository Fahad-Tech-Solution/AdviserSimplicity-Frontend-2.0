import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { CashFlowData, CFQObject } from "../../Store/Store";
import CashFlowCarsCardsTowInOne from "./CashFlowCarsCardsTowInOne";

const CashFlowCarsCards = (props) => {
  let CFObject = useRecoilValue(CFQObject);

  let { OpenModal } = props;

  let cashFlowData = useRecoilValue(CashFlowData);

  let [UserStatus] = useState(
    localStorage.getItem("UserStatus") !== "Single" &&
      localStorage.getItem("UserStatus") !== "Widowed"
  );

  let towInOneArray = [
    "cf_FamilyTrustInvestmentProperties",
    "cf_SMSFInvestmentProperties",
    "cf_investmentsProperty",
    "cf_personalDebt",
    "cf_incomeFromEducation",
    "cf_incomeFromRegularLivingExpense",
    "cf_contents",
    "cf_boat",
    "cf_caravan",
    "cf_otherAssets",
    "cf_familyHome",
    "cf_annuities",
    "cf_accountBasedPension",
    //show only client in bellow
    "cf_SMSFBank",
    "cf_SMSFTermDeposit",
    "cf_SMSFAustralianShares",
    "cf_SMSFPlatformInvestment",
    "cf_SMSF",
    "cf_SMSFInvestmentLoan",
    "cf_FamilyTrustBankAccount",
    "cf_WestFamilyTrustTermDeposits",
    "cf_FamilyTrustAustralianShares",
    "cf_FamilyTrustPlatformInvestment",
    "cf_FamilyTrust",
    "cf_FamilyTrustInvestmentLoan",
  ];

  return (
    <div className="row justify-content-center align-items-stretch px-3s">
      {props.Data.QuestionsArray.map((CashFlowElem, index) => {
        const visibleQuestions = props.Data.QuestionsArray.filter(
          (q, index) => {
            const baseVisible = !CFObject || CFObject[q.key] === "Yes";
            return baseVisible;
          }
        );

        const numberOfCards = visibleQuestions.length;

        const evenClass =
          numberOfCards <= 4 || numberOfCards === 7 || numberOfCards >= 8;

        if (CFObject[CashFlowElem.key] === "Yes") {
          let TowInOne = towInOneArray.includes(CashFlowElem.key)
            ? true
            : false;

          if (TowInOne) {
            return (
              <CashFlowCarsCardsTowInOne
                CashFlowElem={CashFlowElem}
                index={index}
                OpenModal={OpenModal}
                evenClass={evenClass}
              />
            );
          }

          return (
            <React.Fragment key={index}>
              <div className={`${evenClass ? "col-md-3" : "col-md-4"} mb-4`}>
                <div
                  className="card shadow px-4 py-4 borderOverAll GoalsobjectiveCard rounded-4"
                  style={{ height: "400px" }}
                >
                  <h5
                    className="text-center"
                    onClick={() => {
                      console.log(cashFlowData[CashFlowElem.key]);
                    }}
                  >
                    {CashFlowElem.title}
                  </h5>

                  <div
                    className="d-flex justify-content-center flex-column"
                    // style={{ marginTop: "auto" }}
                  >
                    <div className="QuestionIcon CardImg">
                      <img
                        className="img-fluid"
                        src={CashFlowElem.img}
                        alt=""
                        width={70}
                        height={70}
                        onClick={() => console.log(numberOfCards)}
                      />
                    </div>
                    <div className="row justify-content-center align-items-center my-2">
                      <div className="col-12 p-0 ">
                        <div className="d-flex flex-column  flex-column-reverse justify-content-center align-items-center gap-2">
                          <label
                            className=" d-block "
                            htmlFor={"client" + CashFlowElem.key}
                          >
                            {localStorage.getItem("UserName") || "You"}
                          </label>

                          <label
                            className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                            onClick={() => {
                              OpenModal(CashFlowElem);
                            }}
                            role="button"
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
                    <div className="d-flex justify-content-center">
                      <input
                        type="text"
                        className="form-control inputDesign "
                        id={"client" + CashFlowElem.key}
                        placeholder={CashFlowElem.title}
                        name={"client" + CashFlowElem.key}
                        value={
                          (cashFlowData &&
                            cashFlowData[CashFlowElem.key] &&
                            cashFlowData[CashFlowElem.key].clientTotal) ||
                          "$0"
                        }
                      />
                    </div>
                    {UserStatus && (
                      <React.Fragment>
                        <div
                          className={`row justify-content-center align-items-center my-2`}
                        >
                          <div className="col-12 p-0 ">
                            <div className="d-flex flex-column-reverse justify-content-center align-items-center gap-2">
                              <label
                                className=" d-block "
                                htmlFor={"partner" + CashFlowElem.key}
                              >
                                {localStorage.getItem("PartnerName") ||
                                  "Partner"}
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          <input
                            type="text"
                            className="form-control inputDesign"
                            id={"partner" + CashFlowElem.key}
                            placeholder={CashFlowElem.title}
                            name={"partner" + CashFlowElem.key}
                            value={
                              (cashFlowData &&
                                cashFlowData[CashFlowElem.key] &&
                                cashFlowData[CashFlowElem.key].partnerTotal) ||
                              "$0"
                            }
                          />
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        }
      })}
    </div>
  );
};

export default CashFlowCarsCards;
