import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Card } from 'react-bootstrap';

const CashFlowCarsCardsTowInOne = (props) => {

    let { CashFlowElem, OpenModal, index } = props



    let ObjTowInOneArray = {
        "PersonalDebt": [
            {
                label: "Personal Debt",
                key: "PersonalDebt"
            },
            {
                label: "Credit Card",
                key: "CreditCard"
            }
        ]
    }


    console.log(ObjTowInOneArray[CashFlowElem.key])


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
                            {ObjTowInOneArray[CashFlowElem.key].map((elem, i) => {
                                return (<React.Fragment key={i}>

                                    <div className={'col-12 p-0 my-2'}>
                                        <div className='d-flex justify-content-center align-items-center gap-2'>

                                            <label
                                                className="d-block"
                                                htmlFor={"client" + elem.key}
                                            >
                                                {elem.key}
                                            </label>

                                            <label
                                                className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                onClick={() => { OpenModal(elem) }}
                                            >
                                                <div>
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    <input type="text"
                                        className="form-control inputDesign"
                                        id={"client" + elem.key}
                                        placeholder={elem.title}
                                        name={"client" + elem.key}
                                    />

                                </React.Fragment>)
                            })}

                        </div>
                        {/*
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
                            <input type="text"
                            className={`form-control inputDesign`}
                            id={"partner" + CashFlowElem.key}
                            placeholder={CashFlowElem.title}
                            name={"partner" + CashFlowElem.key}
                            />
                            */}
                    </div>
                </Card>
            </div>
        </React.Fragment>
    );
}

export default CashFlowCarsCardsTowInOne
