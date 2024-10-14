import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Card } from 'react-bootstrap';
import { CRState, QuestionDetail } from '../../../Store/Store';
import { useRecoilValue } from 'recoil';

const TowInOneSwitch = (props) => {
    let { OpenModal, arrayCount, jointClass, PartnerClass, elem, index } = props;

    let questionDetail = useRecoilValue(QuestionDetail);
    let CRObject = useRecoilValue(CRState);

    let sets = {
        "personalLoans": [
            {
                title: "Credit Card",
                key: "creditCards",
            },
            {
                title: "Personal Loan",
                key: "personalLoans",
            }
        ],
        "investmentPropertyDetails": [
            {
                title: "Total  Market Value",
                key: "investmentPropertyDetails",
                defaultSetting: "2innerValues",
                totalValueKey: "client"
            },
            {
                title: "Total Loans",
                key: "investmentPropertyDetails",
                defaultSetting: "2innerValues",
                totalValueKey: "partner"
            }
        ],
    };


    return (
        <div className={`col-md-3 mb-4`} key={index}>
            <Card className="py-4 shadow borderOverAll GoalsobjectiveCard" style={{ borderRadius: "20px", height: "100%" }}>
                <h5 className='text-center' onClick={() => { console.log(questionDetail[elem.key]) }}>{elem.title}</h5>
                <div className="QuestionIcon w-25">
                    <img className="img-fluid" src={elem.img} alt="" />
                </div>
                {sets[elem.key].map((setsElem, setsIndex) => {

                    let totalValueKey = setsElem.totalValueKey || "client";

                    let defaultSetting = setsElem.defaultSetting || "";

                    return (
                        <React.Fragment>
                            <div className="row justify-content-center align-items-center my-2">
                                <div className='col-12 p-0 '>
                                    <div className='d-flex flex-column-reverse justify-content-center align-items-center gap-2'>
                                        <label
                                            className=" d-block "
                                            htmlFor={"client" + elem.key}
                                        >{setsElem.title}</label>

                                        <label
                                            className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                            onClick={() => {

                                                let Firstargument = setsElem.defaultSetting === "2innerValues" ? elem.title : setsElem.title;

                                                OpenModal(Firstargument, "client")
                                            }}
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
                                id={totalValueKey + elem.key}
                                placeholder={setsElem.title}
                                name={totalValueKey + elem.key}
                                value={questionDetail && questionDetail[setsElem?.key] && questionDetail[setsElem.key][`${totalValueKey}Total`] ? questionDetail[setsElem.key][`${totalValueKey}Total`] : ""}
                            />
                        </React.Fragment>)
                })}

            </Card>
        </div >
    );




}

export default TowInOneSwitch
