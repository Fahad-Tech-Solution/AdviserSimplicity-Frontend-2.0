import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { CRState, QuestionDetail } from '../../../Store/Store';
import { useRecoilValue } from 'recoil';



import will from "../svgs/page-with-curl-svgrepo-com.svg";
import property from "../svgs/property-value.svg";
import calender from "../svgs/calendar.png";
import BankImg from "../svgs/bank.svg";
import TermImg from "../svgs/TermDepositCanva.png";
import PortFolio from "../svgs/portfolio.svg";
import analytics from "../svgs/analytics.png";
import funds from "../svgs/funds.svg";
import people from "../svgs/Questions_People.png";
import SMSFInvestmentProperty from '../QuestoinsSMSF/SMSFInvestmentProperty';


const SMSFQCards = (props) => {
    let { OpenModal, arrayCount, jointClass, PartnerClass, elem, index } = props;

    let questionDetail = useRecoilValue(QuestionDetail);
    let CRObject = useRecoilValue(CRState);

    let [renderFlag, setRenderFlag] = useState(false);

    let SmsFCards = [
        {
            title: "SMSF Details",
            key: "SMSFDetails",
            img: will
        },
        {
            title: "SMSF Accumulation Details",
            key: "SMSFAccumulationDetails",
            img: property
        },
        {
            title: "SMSF Pension Phase",
            key: "SMSFPensionPhase",
            img: calender
        },
        {
            title: "SMSF Bank Accounts",
            key: "SMSFBank",
            img: BankImg
        },
        {
            title: "SMSF Term Deposits",
            key: "SMSFTermDeposits",
            img: TermImg
        },
        {
            title: "SMSF Australian Shares",
            key: "SMSFAustralianShares",
            img: PortFolio
        },
        {
            title: "SMSF Managed Funds",
            key: "SMSFManagedFunds",
            img: funds
        },
        {
            title: "SMSF Investment Loan",
            key: "SMSFInvestmentLoan",
            img: analytics
        },
        {
            title: "SMSF Investment Properties",
            key: "SMSFInvestmentProperties",
            img: people
        },
    ];

    return (
        <React.Fragment>
            {SmsFCards.map((SmsFElem, Pindex) => {
                const SMSFInP = SmsFElem.key === "SMSFInvestmentProperties" ? true : false;
                const SMSFDetailsCard = SmsFElem.key === "SMSFDetails" ? true : false;

                // if (Object.keys(questionDetail.SMSFDetails).length > 0 && questionDetail.SMSFDetails.client.fundName) {
                // if (questionDetail.SMSFDetails && questionDetail.SMSFDetails.length > 0) {
                //     console.log("i am In")
                // }


                if (SMSFInP) {
                    return <SMSFInvestmentProperty PartnerClass={PartnerClass} index={Pindex} jointClass={jointClass} elem={elem} OpenModal={OpenModal} arrayCount={arrayCount} />
                }
                else if (SMSFDetailsCard) {
                    return (
                        <React.Fragment key={Pindex}>

                            <div className={`col-md-3 mb-4`}>
                                <Card className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex" style={{ borderRadius: "20px", height: "100%" }}>
                                    <h5 className='text-center' onClick={() => { console.log(questionDetail[elem.key]) }}>
                                        {SmsFElem.title}
                                    </h5>
                                    <div className='d-flex justify-content-center flex-column align-item-center mt-4'>
                                        <div className="QuestionIcon CardImg">
                                            <img className="img-fluid" src={SmsFElem.img} alt="" />
                                        </div>
                                        <div
                                            className="row justify-content-center align-items-center my-2"
                                        >
                                            <div className='col-12 p-0 '>
                                                <div className='d-flex flex-column-reverse justify-content-center align-items-center gap-2'>

                                                    <label
                                                        className=" d-block "
                                                        htmlFor={"client" + SmsFElem.key}
                                                    >Total Fund Value</label>

                                                    <label
                                                        className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                        onClick={() => { OpenModal(SmsFElem.title, "client", SmsFElem.key) }}
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
                                            id={"client" + SmsFElem.key}
                                            placeholder={SmsFElem.title}
                                            name={"client" + SmsFElem.key}
                                            value={questionDetail && questionDetail[SmsFElem.key]?.clientTotal ? questionDetail[SmsFElem.key].clientTotal : ""}

                                        />
                                    </div>
                                </Card>
                            </div>


                        </React.Fragment>
                    );
                }
                else {
                    return (
                        <React.Fragment key={Pindex}>

                            <div className={`col-md-3 mb-4`}>
                                <Card className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex" style={{ borderRadius: "20px", height: "100%" }}>
                                    <h5 className='text-center' onClick={() => { console.log(questionDetail[elem.key]) }}>{SmsFElem.title}
                                    </h5>
                                    <div className='d-flex justify-content-center flex-column' style={{ marginTop: "auto" }}>
                                        <div className="QuestionIcon CardImg">
                                            <img className="img-fluid" src={SmsFElem.img} alt="" />
                                        </div>
                                        <div
                                            className="row justify-content-center align-items-center my-2"
                                        >
                                            <div className='col-12 p-0 '>
                                                <div className='d-flex flex-column-reverse justify-content-center align-items-center gap-2'>

                                                    <label
                                                        className=" d-block "
                                                        htmlFor={"client" + SmsFElem.key}
                                                    >{localStorage.getItem("UserName") || "You"}</label>

                                                    <label
                                                        className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                        onClick={() => { OpenModal(SmsFElem.title, "client", SmsFElem.key) }}
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
                                            id={"client" + SmsFElem.key}
                                            placeholder={SmsFElem.title}
                                            name={"client" + SmsFElem.key}
                                            value={questionDetail && questionDetail[SmsFElem.key]?.clientTotal ? questionDetail[SmsFElem.key].clientTotal : ""}

                                        />
                                        <div
                                            className={`row justify-content-center align-items-center my-2 ${PartnerClass}`}
                                        >
                                            <div className='col-12 p-0 '>
                                                <div className='d-flex flex-column-reverse justify-content-center align-items-center gap-2'>
                                                    <label
                                                        className=" d-block "
                                                        htmlFor={"partner" + SmsFElem.key}
                                                    >{localStorage.getItem("PartnerName") || "Partner"}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="text"
                                            className={`form-control inputDesign ${PartnerClass}`}
                                            id={"partner" + SmsFElem.key}
                                            placeholder={SmsFElem.title}
                                            name={"partner" + SmsFElem.key}
                                            value={questionDetail && questionDetail[SmsFElem.key]?.partnerTotal ? questionDetail[SmsFElem.key].partnerTotal : ""}


                                        />
                                    </div>

                                </Card>
                            </div>


                        </React.Fragment>
                    );
                }



            })}
        </React.Fragment>
    );

}

export default SMSFQCards
