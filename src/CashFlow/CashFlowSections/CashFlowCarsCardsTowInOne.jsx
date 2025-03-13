import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card } from "react-bootstrap";
import { CashFlowData } from "../../Store/Store";
import { useRecoilValue } from "recoil";
import { RenderName } from "../../Components/Assets/Api/Api";

const CashFlowCarsCardsTowInOne = (props) => {
  let cashFlowData = useRecoilValue(CashFlowData);

  let { CashFlowElem, OpenModal, index } = props;

  let ObjTowInOneArray = {
    cf_personalDebt: [
      {
        title: "Personal Loans",
        key: "cf_personalDebt",
        attribute: "clientTotal",
        discoveryKey: "personalLoans",
        ModalBtn: true,
        cal: true,
      },
      {
        title: "Credit Card",
        key: "cf_creditCard",
        attribute: "clientTotal",
        discoveryKey: "creditCards",
        ModalBtn: true,
        cal: true,
      },
    ],
    cf_incomeFromEducation: [
      {
        title: "Education Expenses",
        key: "cf_incomeFromEducation",
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_incomeFromRegularLivingExpense: [
      {
        title: "Regular Living Expenses",
        key: "cf_incomeFromRegularLivingExpense",
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_contents: [
      {
        title: "Contents",
        key: "cf_contents",
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_boat: [
      {
        title: "Boat",
        key: "cf_boat",
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_caravan: [
      {
        title: "Caravan",
        key: "cf_caravan",
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_otherAssets: [
      {
        title: "Other Assets",
        key: "cf_otherAssets",
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_familyHome: [
      {
        title: "Own a Family Home",
        SubTitle: "Market Value",
        key: "cf_familyHome",
        attribute: "clientTotal",
        ModalBtn: true,
      },
      {
        title: "Own a Family Home",
        SubTitle: "Loan Balance",
        key: "cf_familyHome",
        attribute: "partnerTotal",
        ModalBtn: false,
      },
    ],
    cf_investmentsProperty: [
      {
        title: "Investments Property",
        key: "cf_investmentsProperty",
        SubTitle: "Market Value",
        attribute: "clientTotal",
        ModalBtn: true,
      },
      {
        title: "Investments Property",
        key: "cf_investmentsProperty",
        SubTitle: "Loan Balance",
        attribute: "partnerTotal",
        ModalBtn: false,
      },
    ],
    cf_SMSFInvestmentProperties: [
      {
        title: "SMSF Investment Properties",
        key: "cf_SMSFInvestmentProperties",
        SubTitle: "Market Value",
        attribute: "clientTotal",
        ModalBtn: true,
        sourceKey: "SMSFInvestmentProperties",
      },
      {
        title: "SMSF Investment Properties",
        key: "cf_SMSFInvestmentProperties",
        SubTitle: "Loan Balance",
        attribute: "partnerTotal",
        ModalBtn: false,
        sourceKey: "SMSFInvestmentProperties",
      },
    ],
    cf_FamilyTrustInvestmentProperties: [
      {
        title: "Family Trust Investment Properties",
        key: "cf_FamilyTrustInvestmentProperties",
        SubTitle: "Market Value",
        attribute: "clientTotal",
        ModalBtn: true,
        sourceKey: "familyInvestmentProperties",
      },
      {
        title: "Family Trust Investment Properties",
        key: "cf_FamilyTrustInvestmentProperties",
        SubTitle: "Loan Balance",
        attribute: "partnerTotal",
        ModalBtn: false,
        sourceKey: "familyInvestmentProperties",
      },
    ],
    cf_annuities: [
      {
        SubTitle: RenderName("client"),
        title: "Annuities",
        key: "cf_annuities",
        attribute: "clientTotal",
        Input: "client",
        ModalBtn: true,
      },
      {
        SubTitle: RenderName("partner"),
        title: "Annuities",
        key: "cf_annuities",
        attribute: "partnerTotal",
        Input: "partner",
        ModalBtn: true,
      },
    ],
    //show only client in bellow
    cf_SMSFBank: [
      {
        title: "SMSF Bank",
        SubTitle: RenderName("client"),
        key: "cf_SMSFBank",
        sourceKey: "SMSFBank",
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_SMSFTermDeposit: [
      {
        title: "SMSF Term Deposit",
        SubTitle: RenderName("client"),
        key: "cf_SMSFTermDeposit",
        sourceKey: "SMSFTermDeposits",
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_SMSFAustralianShares: [
      {
        title: "SMSF Australian Shares",
        SubTitle: RenderName("client"),
        key: "cf_SMSFAustralianShares",
        sourceKey: "SMSFAustralianShares",
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_SMSFPlatformInvestment: [
      {
        title: "SMSF Platform Investment",
        SubTitle: RenderName("client"),
        key: "cf_SMSFPlatformInvestment",
        sourceKey: "SMSFManagedFunds",
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_SMSF: [
      {
        title: "SMSF",
        SubTitle: RenderName("client"),
        key: "cf_SMSF",
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_SMSFInvestmentLoan: [
      {
        title: "SMSF Investment Loan",
        SubTitle: RenderName("client"),
        key: "cf_SMSFInvestmentLoan",
        sourceKey: "SMSFInvestmentLoan",
        cal: true,
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_FamilyTrustBankAccount: [
      {
        title: "Family Trust Bank Account",
        SubTitle: RenderName("client"),
        key: "cf_FamilyTrustBankAccount",
        sourceKey: "familyBank",
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_WestFamilyTrustTermDeposits: [
      {
        title: "Family Trust Term Deposits",
        SubTitle: RenderName("client"),
        key: "cf_WestFamilyTrustTermDeposits",
        sourceKey: "familyTermDeposit",
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_FamilyTrustAustralianShares: [
      {
        title: "Family Trust Australian Shares",
        SubTitle: RenderName("client"),
        key: "cf_FamilyTrustAustralianShares",
        sourceKey: "familyAustralianShare",
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_FamilyTrustPlatformInvestment: [
      {
        title: "Family Trust Platform Investment",
        SubTitle: RenderName("client"),
        key: "cf_FamilyTrustPlatformInvestment",
        sourceKey: "familyMangedFunds",
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_FamilyTrust: [
      {
        title: "Family Trust",
        SubTitle: RenderName("client"),
        key: "cf_FamilyTrust",
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
    cf_FamilyTrustInvestmentLoan: [
      {
        title: "Family Trust Investment Loan",
        SubTitle: RenderName("client"),
        key: "cf_FamilyTrustInvestmentLoan",
        sourceKey: "familyInvestmentHomeLoan",
        cal: true,
        attribute: "clientTotal",
        ModalBtn: true,
      },
    ],
  };

  return (
    <React.Fragment key={index}>
      <div className={`col-md-3 mb-4`}>
        <Card
          className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex"
          style={{ borderRadius: "20px", height: "100%" }}
        >
          <h5
            className="text-center"
            onClick={() => {
              console.log(questionDetail[CashFlowElem.key]);
            }}
          >
            {CashFlowElem.title}
          </h5>
          <div
            className="d-flex justify-content-center flex-column"
            style={{
              marginTop:
                ObjTowInOneArray[CashFlowElem.key].length > 1 ? "auto" : "",
            }}
          >
            <div className="QuestionIcon CardImg">
              <img className="img-fluid" src={CashFlowElem.img} alt="" />
            </div>
            <div className="row justify-content-center align-items-center my-2">
              {ObjTowInOneArray[CashFlowElem.key].map((elem, i) => {
                return (
                  <React.Fragment key={i}>
                    <div className={"col-12 p-0 my-2"}>
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <label
                          className="d-block"
                          htmlFor={"client" + elem.key}
                        >
                          {elem.SubTitle ? elem.SubTitle : elem.title}
                        </label>
                        {elem?.ModalBtn && (
                          <label
                            className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                            onClick={() => {
                              OpenModal(elem);
                            }}
                          >
                            <div>
                              <FontAwesomeIcon
                                icon={faArrowUpRightFromSquare}
                              />
                            </div>
                          </label>
                        )}
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control inputDesign"
                      id={"client" + elem.key}
                      placeholder={elem.SubTitle ? elem.SubTitle : elem.title}
                      name={"client" + elem.key}
                      value={
                        (cashFlowData &&
                          cashFlowData[elem.key] &&
                          cashFlowData[elem.key][elem.attribute]) ||
                        ""
                      }
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default CashFlowCarsCardsTowInOne;
