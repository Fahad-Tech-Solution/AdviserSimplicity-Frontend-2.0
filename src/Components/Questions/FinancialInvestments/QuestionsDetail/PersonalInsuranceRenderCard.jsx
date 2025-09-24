import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { CRState, QuestionDetail } from '../../../../Store/Store';
import { useRecoilValue } from 'recoil';

import incomeImg from "../../svgs/asd.png";
import traumaImg from "../../svgs/traumaimg.svg";
import lifeImg from "../../svgs/lifeimg.svg";
import TPDImg from "../../svgs/tpdimg.svg";

const PersonalInsuranceRenderCard = (props) => {
    let { OpenModal, arrayCount, jointClass, PartnerClass, elem, index, evenClass } = props;

    let questionDetail = useRecoilValue(QuestionDetail);
    let CRObject = useRecoilValue(CRState);

    let [renderFlag, setRenderFlag] = useState(false);

    let PersonalCards = [
        {
            title: "Life Insurance",
            key: "Life",
            img: lifeImg,
            inputKeys: {
                client: "clientLifeInsuranceTotal",
                partner: "partnerLifeInsuranceTotal",
            }
        },
        {
            title: "TPD",
            key: "TPD",
            img: TPDImg,
            inputKeys: {
                client: "clientTPDTotal",
                partner: "partnerTPDTotal",
            }
        },
        {
            title: "Trauma",
            key: "Trauma",
            img: traumaImg,
            inputKeys: {
                client: "clientTraumaTotal",
                partner: "partnerTraumaTotal",
            }
        },
        {
            title: "Income Protection",
            key: "IncomeProtection",
            img: incomeImg,
            inputKeys: {
                client: "clientIncomeProtectionTotal",
                partner: "partnerIncomeProtectionTotal",
            }
        },
    ];

    return (
        <React.Fragment>
            {PersonalCards.map((PersonalElem, Pindex) => {
                // Get the array of personal insurance
                let data = questionDetail?.personalInsurance?.PersonalInsurance || [];

                // Initialize an object to track the presence of each coverType
                let coverTypes = {
                    Life: false,
                    TPD: false,
                    Trauma: false,
                    IncomeProtection: false
                };

                // Check if data exists and process it
                if (data.length > 0) {
                    // Iterate over each insurance entry
                    data.forEach(entry => {
                        let sumInsuredArray = entry.sumInsured || [];

                        // Iterate through the sumInsured array to check for cover types
                        sumInsuredArray.forEach(sumInsuredEntry => {
                            switch (sumInsuredEntry.coverType) {
                                case "Life":
                                    coverTypes.Life = true;
                                    break;
                                case "TPD":
                                    coverTypes.TPD = true;
                                    break;
                                case "Trauma":
                                    coverTypes.Trauma = true;
                                    break;
                                case "Income protection":
                                    coverTypes.IncomeProtection = true;
                                    break;
                                default:
                                    break;
                            }
                        });
                    });
                }

                // console.log(questionDetail?.personalInsurance?.[PersonalElem.inputKeys.client], "ya value check karna k lea")

                // Now, conditionally render cards based on the coverTypes object
                return (
                    <React.Fragment key={Pindex}>
                        {coverTypes[PersonalElem.key] && (
                            <div className={`${evenClass ? "col-md-3" : "col-md-4"}  mb-4`}>
                                <Card className="py-4 shadow borderOverAll GoalsobjectiveCard" style={{ borderRadius: "20px", height: "100%" }}>
                                    <h5 className='text-center' onClick={() => { console.log(questionDetail[elem.key]) }}>{PersonalElem.title}
                                    </h5>
                                    <div className="QuestionIcon CardImg">
                                        <img className="img-fluid" src={PersonalElem.img} alt="" />
                                    </div>
                                    <div
                                        className="row justify-content-center align-items-center my-2"
                                    >
                                        <div className='col-12 p-0 '>
                                            <div className='d-flex flex-column-reverse justify-content-center align-items-center gap-2'>

                                                <label
                                                    className=" d-block "
                                                    htmlFor={"client" + PersonalElem.key}
                                                >{localStorage.getItem("UserName") || "You"}</label>

                                                <label
                                                    className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                    onClick={() => { OpenModal("Personal Insurance", "client", PersonalElem.key) }}
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
                                        id={"client" + PersonalElem.key}
                                        placeholder={PersonalElem.title}
                                        name={"client" + PersonalElem.key}
                                        value={questionDetail?.personalInsurance?.[PersonalElem.inputKeys.client] || ""}

                                    />
                                    <div
                                        className={`row justify-content-center align-items-center my-2 ${PartnerClass}`}
                                    >
                                        <div className='col-12 p-0 '>
                                            <div className='d-flex flex-column-reverse justify-content-center align-items-center gap-2'>
                                                <label
                                                    className=" d-block "
                                                    htmlFor={"partner" + PersonalElem.key}
                                                >{localStorage.getItem("PartnerName") || "Partner"}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="text"
                                        className={`form-control inputDesign ${PartnerClass}`}
                                        id={"partner" + PersonalElem.key}
                                        placeholder={PersonalElem.title}
                                        name={"partner" + PersonalElem.key}
                                        value={questionDetail?.personalInsurance?.[PersonalElem.inputKeys.partner] || ""}

                                    />
                                </Card>
                            </div>
                        )}

                    </React.Fragment>
                );
            })}
        </React.Fragment>
    );

}

export default PersonalInsuranceRenderCard
