import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { CashFlowData, CFQObject } from '../../Store/Store';
import CashFlowCarsCardsTowInOne from './CashFlowCarsCardsTowInOne';

const CashFlowCarsCards = (props) => {

    let CFObject = useRecoilValue(CFQObject);

    let { OpenModal } = props;

    let [renderFlag, setRenderFlag] = useState(false);
    let cashFlowData = useRecoilValue(CashFlowData);

    let [UserStatus] = useState(localStorage.getItem("UserStatus") !== "Single" && localStorage.getItem("UserStatus") !== "Widowed");

    let towInOneArray = ["cf_personalDebt", "cf_incomeFromEducation", "cf_incomeFromRegularLivingExpense", "cf_boat", "cf_caravan", "cf_familyHome"]

    return (
        <div className='row'>
            {props.Data.QuestionsArray.map((CashFlowElem, index) => {
                if (CFObject[CashFlowElem.key] === "Yes") {

                    let TowInOne = towInOneArray.includes(CashFlowElem.key) ? true : false;

                    if (TowInOne) {
                        return (<CashFlowCarsCardsTowInOne CashFlowElem={CashFlowElem} index={index} OpenModal={OpenModal} />)
                    }

                    return (
                        <React.Fragment key={index}>
                            <div className={`col-md-3 mb-4`}>

                                <Card className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex" style={{ borderRadius: "20px", height: "100%" }}>
                                    <h5 className='text-center' onClick={() => { console.log(questionDetail[CashFlowElem.key]) }}>{CashFlowElem.title}
                                    </h5>
                                    <div className='d-flex justify-content-center flex-column' style={{ marginTop: "auto" }}>
                                        <div className="QuestionIcon CardImg">
                                            <img className="img-fluid" src={CashFlowElem.img} alt="" />
                                        </div>
                                        <div
                                            className="row justify-content-center align-items-center my-2"
                                        >
                                            <div className='col-12 p-0 '>
                                                <div className='d-flex justify-content-center align-items-center gap-2'>

                                                    <label
                                                        className=" d-block "
                                                        htmlFor={"client" + CashFlowElem.key}
                                                    >
                                                        {localStorage.getItem("UserName") || "You"}
                                                    </label>

                                                    <label
                                                        className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                        onClick={() => { OpenModal(CashFlowElem) }}
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
                                            id={"client" + CashFlowElem.key}
                                            placeholder={CashFlowElem.title}
                                            name={"client" + CashFlowElem.key}
                                            value={
                                                (cashFlowData &&
                                                    cashFlowData[CashFlowElem.key] &&
                                                    cashFlowData[CashFlowElem.key].clientTotal) ||
                                                ""
                                            }
                                        />
                                        {UserStatus &&
                                            <React.Fragment>
                                                <div
                                                    className={`row justify-content-center align-items-center my-2`}
                                                >
                                                    <div className='col-12 p-0 '>
                                                        <div className='d-flex flex-column-reverse justify-content-center align-items-center gap-2'>
                                                            <label
                                                                className=" d-block "
                                                                htmlFor={"partner" + CashFlowElem.key}
                                                            >{localStorage.getItem("PartnerName") || "Partner"}</label>
                                                        </div>
                                                    </div>
                                                </div>
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
                                                        ""
                                                    }
                                                />

                                            </React.Fragment>}

                                    </div>
                                </Card>
                            </div>
                        </React.Fragment>
                    );
                }
            })}

        </div>
    );

}

export default CashFlowCarsCards
