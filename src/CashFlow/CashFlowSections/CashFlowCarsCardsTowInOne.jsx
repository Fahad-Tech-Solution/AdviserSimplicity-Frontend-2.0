import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Card } from 'react-bootstrap';
import { CashFlowData } from '../../Store/Store';
import { useRecoilValue } from 'recoil';

const CashFlowCarsCardsTowInOne = (props) => {

    let cashFlowData = useRecoilValue(CashFlowData);

    let { CashFlowElem, OpenModal, index } = props

    let ObjTowInOneArray = {
        "cf_personalDebt": [
            {
                title: "Persona Loans",
                key: "cf_personalDebt",
                attribute: "clientTotal",
                discoveryKey: "personalLoans",
                ModalBtn: true
            },
            {
                title: "Credit Card",
                key: "cf_creditCard",
                attribute: "clientTotal",
                discoveryKey: "creditCards",
                ModalBtn: true
            }
        ],
        "cf_incomeFromEducation": [
            {
                title: "Education Expenses",
                key: "cf_incomeFromEducation",
                attribute: "clientTotal",
                ModalBtn: true
            },
        ],
        "cf_incomeFromRegularLivingExpense": [
            {
                title: "Regular Living Expenses",
                key: "cf_incomeFromRegularLivingExpense",
                attribute: "clientTotal",
                ModalBtn: true
            },
        ],
        "cf_boat": [
            {
                title: "Boat",
                key: "cf_boat",
                attribute: "clientTotal",
                ModalBtn: true
            },
        ],
        "cf_caravan": [
            {
                title: "Caravan",
                key: "cf_caravan",
                attribute: "clientTotal",
                ModalBtn: true
            },
        ],
        "cf_familyHome": [
            {
                title: "Own a Family Home",
                SubTitle: "Market Value",
                key: "cf_familyHome",
                attribute: "clientTotal",
                ModalBtn: true
            },
            {
                title: "Own a Family Home",
                SubTitle: "Loan Balance",
                key: "cf_familyHome",
                attribute: "partnerTotal",
                ModalBtn: false
            }
        ]



    }

    return (
        <React.Fragment key={index}>
            <div className={`col-md-3 mb-4`}>
                <Card className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex" style={{ borderRadius: "20px", height: "100%" }}>
                    <h5 className='text-center' onClick={() => { console.log(questionDetail[CashFlowElem.key]) }}>{CashFlowElem.title}
                    </h5>
                    <div className='d-flex justify-content-center flex-column' style={{ marginTop: ObjTowInOneArray[CashFlowElem.key].length > 1 ? "auto" : "" }}>
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
                                                {elem.SubTitle ? elem.SubTitle : elem.title}
                                            </label>
                                            {elem?.ModalBtn &&

                                                <label
                                                    className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                                    onClick={() => { OpenModal(elem) }}
                                                >
                                                    <div>
                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                    </div>
                                                </label>

                                            }
                                        </div>
                                    </div>
                                    <input type="text"
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
                                </React.Fragment>)
                            })}
                        </div>
                    </div>
                </Card>
            </div>
        </React.Fragment>
    );
}

export default CashFlowCarsCardsTowInOne
