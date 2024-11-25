import React, { useEffect, useState } from 'react';
import ModalComponent from '../../Components/Questions/FinancialInvestments/ModalComponent';
import Add from "../../Components/Questions/svgs/add-circle-solid-svgrepo-com.svg";

import { content } from '../../Content/Content';
import { QuestionShift } from '../../Store/Store';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import CFQModal from './CFQModal';

import CashFlowCarsCards from './CashFlowCarsCards';
import CashFlowOverseasPensions from '../Income&ExpenseComponents/CashFlowNew/CashFlowOverseasPensions';
import CashFlowOtherNoneTaxable from '../Income&ExpenseComponents/CashFlowNew/CashFlowOtherNoneTaxable';
import CashFlowBusinessIncome from '../Income&ExpenseComponents/CashFlowNew/CashFlowBusinessIncome';
import CashFlowRegulerLiving from '../Income&ExpenseComponents/CashFlowNew/CashFlowRegulerLiving';
import CashFlowLifetimeBenefit from '../Income&ExpenseComponents/CashFlowNew/CashFlowLifetimeBenefit';
import CashFlowPartnership from '../Income&ExpenseComponents/CashFlowNew/CashFlowPartnership';
import ChildeCashFlowEducationExpenses from '../Income&ExpenseComponents/CashFlowNew/CashFlowEducationExpenses';
import CashFlowSoleTradeIncome from '../Income&ExpenseComponents/CashFlowNew/CashFlowSoleTradeIncome';
import CashFlowCenterLink from '../Income&ExpenseComponents/CashFlowNew/CashFlowCenterLink';

import CashFlowOtherAsset from '../PersonalAssetsComponents/CashFlowNew/CashFlowOtherAsset';
import CashFlowFamilyHome from '../PersonalAssetsComponents/CashFlowNew/CashFlowFamilyHome';
import CashFlowEmploymentIncome from '../Income&ExpenseComponents/CashFlowNew/CashFlowEmploymentIncome';

const CashFlowCardSet = (props) => {

    let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});
    let { cashFlow } = content;

    const componentMapping = {
        "CFQModal": <CFQModal />,  // inner Modal just for Questions Yes/No

        //First Section Modals Income and Expanse 
        "Overseas Pensions": <CashFlowOverseasPensions />,
        "Other Non-Taxable": <CashFlowOtherNoneTaxable />,
        "Business Income": <CashFlowBusinessIncome />,
        "Regular Living Expenses": <CashFlowRegulerLiving />,
        "Lifetime Benefits": <CashFlowLifetimeBenefit />,
        "Partnership Income": <CashFlowPartnership />,
        "Sole Trader Income": <CashFlowSoleTradeIncome />,
        "Education Expenses": <ChildeCashFlowEducationExpenses />,
        "Employment Income": <CashFlowEmploymentIncome />,
        "Centrelink Payments/Benefits": <CashFlowCenterLink />,

        "Own a Family Home": <CashFlowFamilyHome />,
        "Contents": <CashFlowOtherAsset />,
        "Car": <CashFlowOtherAsset />,
        "Motor Vehicle 2": <CashFlowOtherAsset />,
        "Boat": <CashFlowOtherAsset />,
        "Caravan": <CashFlowOtherAsset />,
        "Other Assets": <CashFlowOtherAsset />,
        //personal Debit Left
    }

    const ModalContent = (obj) => {
        if (obj.key === "CFQ") {
            return componentMapping.CFQModal || null;
        }
        else {
            return componentMapping[obj.title] || null;
        }
    };

    let Navigation = useNavigate();

    const HandleSubmit = () => {
        console.log(QuestionChange)

        const currentIndex = cashFlow.findIndex(item => item.route === `/${location.pathname.replace("/Cash-Flow/", "")}`);
        let nextIndex = currentIndex + 1;

        const nextItem = cashFlow[nextIndex];

        Navigation(`/Cash-Flow` + nextItem.route);

    };

    const BackHandle = () => {

        // Find the current item index based on the QuestionChange state
        const currentIndex = cashFlow.findIndex(item => item.route === `/${location.pathname.replace("/Cash-Flow/", "")}`);

        let nextIndex = currentIndex - 1;

        const nextItem = cashFlow[nextIndex];

        Navigation(`/Cash-Flow` + nextItem.route);

    };

    let OpenModal = (props) => {
        // console.log(props);
        setFlagState(true);
        setModalObject(props)
    }

    return (
        <div className='container-fluid'>
            <ModalComponent modalObject={modalObject} setFlagState={setFlagState} flagState={flagState} >
                {ModalContent(modalObject)}
            </ModalComponent>

            <div className="row m-0">
                <div className="col-md-12">
                    <div className="pb-4 bg-white  borderOverAll  rounded text-center">

                        <div>
                            <div className="QuestionIcon p-3 curser-pointer" onClick={() => {
                                setFlagState(true);
                                setModalObject({
                                    title: props.Data.subTitle + " Questions",
                                    CashFlowQuestionSetKey: props.Data.key,
                                    QuestionsArray: props.Data.QuestionsArray,
                                    key: "CFQ",
                                })
                            }}>
                                <img className="img-fluid min-w-25" src={Add} alt="" />
                            </div>
                        </div>


                        <CashFlowCarsCards OpenModal={OpenModal} Data={props.Data} />


                        <div className="row mt-2">
                            <div className="col-md-12">
                                <button
                                    onClick={BackHandle}
                                    className="float-center btn w-25  btn-outline  backBtn mx-3">
                                    Back
                                </button>
                                <button
                                    onClick={HandleSubmit}
                                    className="float-center btn w-25  bgColor modalBtn"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CashFlowCardSet
