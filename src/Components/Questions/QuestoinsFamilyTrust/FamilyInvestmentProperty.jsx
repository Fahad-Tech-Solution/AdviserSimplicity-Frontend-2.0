import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { CRState, QuestionDetail } from '../../../Store/Store';
import { useRecoilValue } from 'recoil';

import will from "../svgs/page-with-curl-svgrepo-com.svg";
import investmentCircle from "../svgs/investmentCircle.png";
import { toCommaAndDollar } from '../../Assets/Api/Api';


const FamilyInvestmentProperty = (props) => {
    let { OpenModal, arrayCount, jointClass, PartnerClass, elem, index, OpenReuseModal } = props;

    let questionDetail = useRecoilValue(QuestionDetail);
    let CRObject = useRecoilValue(CRState);

    let FamilyCards = {
        "familyDetails": [
            {
                title: "Family Details",
                key: "familyDetails",
                img: will
            },],
        "familyOtherInvestment": [
            {
                title: "Other Family Investments",
                key: "familyOtherInvestment",
                img: investmentCircle
            },
        ]
    };

    const FamilyDetailsSubmitted = (questionDetail.familyDetails && Object.keys(questionDetail.familyDetails).length > 0) ? true : false;

    let GetValue = () => {
        try {

            // Check if FamilyAccumulationDetails.FamilyTotal exists and parse it to a number
            const familyDetailsClientTotal = questionDetail?.FamilyAccumulationDetails?.clientTotal
                ? parseFloat(questionDetail.FamilyAccumulationDetails.clientTotal.replace(/[^0-9.-]+/g, ""))
                : 0;
            // Check if familyDetails.FamilyTotal exists and parse it to a number
            const familyBankClientTotal = questionDetail?.familyDetails?.partnerTotal
                ? parseFloat(questionDetail.familyDetails.partnerTotal.replace(/[^0-9.-]+/g, ""))
                : 0;
            // Check if familyBank.FamilyTotal exists and parse it to a number
            const familyTermDepositClientTotal = questionDetail?.familyBank?.jointTotal
                ? parseFloat(questionDetail.familyBank.jointTotal.replace(/[^0-9.-]+/g, ""))
                : 0;
            // Check if familyTermDeposit.FamilyTotal exists and parse it to a number
            const familyAustralianShareClientTotal = questionDetail?.familyTermDeposit?.clientTotal
                ? parseFloat(questionDetail.familyTermDeposit.clientTotal.replace(/[^0-9.-]+/g, ""))
                : 0;
            // Check if familyAustralianShare.FamilyTotal exists and parse it to a number
            const familyMangedFundsClientTotal = questionDetail?.familyAustralianShare?.partnerTotal
                ? parseFloat(questionDetail.familyAustralianShare.partnerTotal.replace(/[^0-9.-]+/g, ""))
                : 0;
            // Check if familyMangedFunds.FamilyTotal exists and parse it to a number
            const familyInvestmentHomeLoanClientTotal = questionDetail?.familyMangedFunds?.jointTotal
                ? parseFloat(questionDetail.familyMangedFunds.jointTotal.replace(/[^0-9.-]+/g, ""))
                : 0;
            // Check if familyInvestmentHomeLoan.FamilyTotal exists and parse it to a number
            const familyInvestmentPropertiesClientTotal = questionDetail?.familyInvestmentHomeLoan?.clientTotal
                ? parseFloat(questionDetail.familyInvestmentHomeLoan.clientTotal.replace(/[^0-9.-]+/g, ""))
                : 0;

            // Check if FamilyAccumulationDetails.FamilyTotal exists and parse it to a number
            const familyDetailsPartnerTotal = questionDetail?.FamilyAccumulationDetails?.partnerTotal
                ? parseFloat(questionDetail.FamilyAccumulationDetails.partnerTotal.replace(/[^0-9.-]+/g, ""))
                : 0;
            // Check if familyDetails.FamilyTotal exists and parse it to a number
            const familyBankPartnerTotal = questionDetail?.familyDetails?.partnerTotal
                ? parseFloat(questionDetail.familyDetails.partnerTotal.replace(/[^0-9.-]+/g, ""))
                : 0;
            // Check if familyBank.FamilyTotal exists and parse it to a number
            const familyTermDepositPartnerTotal = questionDetail?.familyBank?.jointTotal
                ? parseFloat(questionDetail.familyBank.jointTotal.replace(/[^0-9.-]+/g, ""))
                : 0;
            // Check if familyTermDeposit.FamilyTotal exists and parse it to a number
            const familyAustralianSharePartnerTotal = questionDetail?.familyTermDeposit?.partnerTotal
                ? parseFloat(questionDetail.familyTermDeposit.partnerTotal.replace(/[^0-9.-]+/g, ""))
                : 0;
            // Check if familyAustralianShare.FamilyTotal exists and parse it to a number
            const familyMangedFundsPartnerTotal = questionDetail?.familyAustralianShare?.partnerTotal
                ? parseFloat(questionDetail.familyAustralianShare.partnerTotal.replace(/[^0-9.-]+/g, ""))
                : 0;
            // Check if familyMangedFunds.FamilyTotal exists and parse it to a number
            const familyInvestmentHomeLoanPartnerTotal = questionDetail?.familyMangedFunds?.jointTotal
                ? parseFloat(questionDetail.familyMangedFunds.jointTotal.replace(/[^0-9.-]+/g, ""))
                : 0;
            // Check if familyInvestmentHomeLoan.FamilyTotal exists and parse it to a number
            const familyInvestmentPropertiesPartnerTotal = questionDetail?.familyInvestmentHomeLoan?.partnerTotal
                ? parseFloat(questionDetail.familyInvestmentHomeLoan.partnerTotal.replace(/[^0-9.-]+/g, ""))
                : 0;

            let allSums = familyDetailsClientTotal + familyBankClientTotal + familyTermDepositClientTotal + familyAustralianShareClientTotal + familyMangedFundsClientTotal + familyDetailsPartnerTotal + familyBankPartnerTotal + familyTermDepositPartnerTotal + familyAustralianSharePartnerTotal + familyMangedFundsPartnerTotal;

            let total = allSums + familyInvestmentPropertiesClientTotal - familyInvestmentHomeLoanClientTotal - familyInvestmentHomeLoanPartnerTotal - familyInvestmentPropertiesPartnerTotal;
                                //^ this is Property Values so it must be added to Total
            return toCommaAndDollar(total);

        } catch (error) {
            console.error("Error calculating Family totals:", error);
            return "$0";
        }
    };

    return (
        <React.Fragment>
            {FamilyCards[elem.key].map((FamilyElem, Pindex) => {
                const FamilyDetailsCard = FamilyElem.key === "familyDetails" ? true : false;
                const familyOtherInvestmentCard = FamilyElem.key === "familyOtherInvestment" ? true : false;

                if (FamilyDetailsCard) {
                    return (
                        <React.Fragment key={Pindex}>
                            <div className={`col-md-3 mb-4`}>
                                <Card className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex" style={{ borderRadius: "20px", height: "100%" }}>
                                    <h5 className='text-center' onClick={() => { console.log(questionDetail[FamilyElem.key]) }}>
                                        {FamilyDetailsSubmitted ? questionDetail.familyDetails.familyTrustOwner.trustName : FamilyElem.title}
                                    </h5>
                                    <div className="QuestionIcon CardImg">
                                        <img className="img-fluid" src={FamilyElem.img} alt="" />
                                    </div>
                                    <div
                                        className="row justify-content-center align-items-center my-2"
                                    >
                                        <div className='col-12 p-0 '>
                                            <div className='d-flex justify-content-center align-items-center gap-2'>

                                                <label
                                                    className=" d-block "
                                                    htmlFor={"client" + FamilyElem.key}
                                                >Total Fund Value</label>

                                                <label
                                                    className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                    onClick={() => { OpenModal(FamilyElem.title, "client", FamilyElem.key) }}
                                                >
                                                    <div>
                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="text"
                                        className="form-control inputDesign"
                                        id={"client" + FamilyElem.key}
                                        placeholder={FamilyElem.title}
                                        name={"client" + FamilyElem.key}
                                        value={GetValue()}
                                    />
                                </Card>
                            </div>
                        </React.Fragment>
                    );
                }
                else if (familyOtherInvestmentCard) {
                    if (CRObject[FamilyElem.key] === "Yes") {
                        return (<div className={`col-md-3 mb-4`} key={index}>
                            <Card className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex" style={{ borderRadius: "20px", height: "100%" }}>
                                <h5 className='text-center' onClick={() => { console.log(questionDetail[FamilyElem.key]) }}>{FamilyElem.title}</h5>

                                <div className="QuestionIcon CardImg">
                                    <img className="img-fluid" src={FamilyElem.img} alt="" />
                                </div>
                                <div
                                    className="row justify-content-center align-items-center my-2"
                                >
                                    <div className='col-12 p-0 '>
                                        <div className='d-flex flex-column-reverse justify-content-center align-items-center gap-2'>
                                            <label
                                                className=" d-block "
                                                htmlFor={"client" + FamilyElem.key}
                                            >{localStorage.getItem("UserName") || "You"}</label>

                                            <label
                                                className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                onClick={() => { OpenModal(FamilyElem.title, "client", FamilyElem.key) }}
                                            >
                                                <div>
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <input type="text"
                                    className="form-control inputDesign "
                                    id={"client" + FamilyElem.key}
                                    placeholder={FamilyElem.title}
                                    name={"client" + FamilyElem.key}
                                    value={questionDetail && questionDetail[FamilyElem.key]?.clientTotal ? questionDetail[FamilyElem.key].clientTotal : ""}
                                />
                            </Card>
                        </div>)
                    }
                }

            })}
        </React.Fragment>
    );

}

export default FamilyInvestmentProperty
