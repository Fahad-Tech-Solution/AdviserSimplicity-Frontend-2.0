import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { CRState, QuestionDetail, QuestionShift } from '../../../Store/Store';
import { useRecoilState, useRecoilValue } from 'recoil';


import loan from "../svgs/loan.svg";
import Questions_Home from "../svgs/building-small-svgrepo-com.svg";

import property from "../svgs/property-value.svg";
import rent from "../svgs/rent.svg";

const SMSFInvestmentProperty = (props) => {
    let { OpenModal, arrayCount, jointClass, PartnerClass } = props;

    let questionDetail = useRecoilValue(QuestionDetail);
    let CRObject = useRecoilValue(CRState);

    let loopIndex = CRObject.numberOfSMSFInvestmentProperties || 0;

    let arrayState = [];

    let SMSFPropertySet = [
        {
            title: "Investment Home",
            key: "SMSFInvestmentProperties",
            img: property
        },
        {
            title: "Investment Home Loan",
            key: "SMSFInvestmentPropertiesLoan",
            img: loan
        },
        {
            title: "Investment Home Expanse",
            key: "SMSFInvestmentExpenses",
            img: rent
        },

    ]

    for (let i = 0; i < loopIndex; i++) {
        arrayState.push(
            SMSFPropertySet.map((elem, index) => {
                return (
                    <div className={`col-md-3 mb-4`} key={index}>
                        <Card className="py-4 shadow borderOverAll GoalsobjectiveCard" style={{ borderRadius: "20px", height: "100%" }}>
                            <h5 className='text-center' onClick={() => { console.log(questionDetail[elem.key][i]) }}>{elem.title} {i + 1}</h5>
                            <div className="QuestionIcon w-25">
                                <img className="img-fluid" src={elem.img} alt="" />
                            </div>
                            <div
                                className="row justify-content-center align-items-center my-2"
                            >
                                <div className='col-12 p-0 '>
                                    <div className='d-flex flex-column-reverse justify-content-center align-items-center gap-2'>

                                        <label
                                            className=" d-block "
                                            htmlFor={"client" + elem.key}
                                        >{localStorage.getItem("UserName") || "You"}</label>

                                        <label
                                            className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                            onClick={() => { OpenModal(elem.title, "client", i) }}
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
                                id={"client" + elem.key}
                                placeholder={elem.title}
                                name={"client" + elem.key}
                                value={questionDetail &&
                                    questionDetail[elem.key] &&
                                    Array.isArray(questionDetail[elem.key]) &&
                                    questionDetail[elem.key][i] &&
                                    questionDetail[elem.key][i].clientTotal
                                    ?  questionDetail[elem.key][i].clientTotal
                                    : ""}
                            />
                            <div
                                className={`row justify-content-center align-items-center my-2 ${PartnerClass}`}
                            >
                                <div className='col-12 p-0 '>
                                    <div className='d-flex flex-column-reverse justify-content-center align-items-center gap-2'>
                                        <label
                                            className=" d-block "
                                            htmlFor={"partner" + elem.key}
                                        >{localStorage.getItem("PartnerName") || "Partner"}</label>

                                        <label
                                            className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                            onClick={() => { OpenModal(elem.title, "partner", i) }}
                                        >
                                            <div>
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <input type="text"
                                className={`form-control inputDesign ${PartnerClass}`}
                                id={"partner" + elem.key}
                                placeholder={elem.title}
                                name={"partner" + elem.key}
                                value={questionDetail &&
                                    questionDetail[elem.key] &&
                                    Array.isArray(questionDetail[elem.key]) &&
                                    questionDetail[elem.key][i] &&
                                    questionDetail[elem.key][i].partnerTotal
                                    ?  questionDetail[elem.key][i].partnerTotal
                                    : ""}
                            />

                            <div
                                className={`row justify-content-center align-items-center my-2  ${jointClass} ${PartnerClass}`}
                            >
                                <div className='col-12 p-0 '>
                                    <div className='d-flex flex-column-reverse justify-content-center align-items-center gap-2'>
                                        <label
                                            className=" d-block "
                                            htmlFor={"joint" + elem.key}
                                        >{(localStorage.getItem("UserName") || "You") + " " + (localStorage.getItem("PartnerName") || "")}</label>

                                        <label
                                            className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                            onClick={() => { OpenModal(elem.title, "joint", i) }}
                                        >
                                            <div>
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <input type="text"
                                className={`form-control inputDesign ${jointClass} ${PartnerClass}`}
                                id={"joint" + elem.key}
                                placeholder={elem.title}
                                name={"joint" + elem.key}
                                value={questionDetail &&
                                    questionDetail[elem.key] &&
                                    Array.isArray(questionDetail[elem.key]) &&
                                    questionDetail[elem.key][i] &&
                                    questionDetail[elem.key][i].jointTotal
                                    ?  questionDetail[elem.key][i].jointTotal
                                    : ""}
                            />

                        </Card>
                    </div>
                )
            })
        );
    }

    return (<>{arrayState}</>);
}

export default SMSFInvestmentProperty
