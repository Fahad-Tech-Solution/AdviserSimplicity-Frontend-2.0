import React, { useEffect, useState } from 'react'
import ModalComponent from '../../Components/Questions/FinancialInvestments/ModalComponent'
import Add from "../../Components/Questions/svgs/add-circle-solid-svgrepo-com.svg";
import { content } from '../../Content/Content';
import { QuestionShift } from '../../Store/Store';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import CFQModal from './CFQModal';
import CashFlowCarsCards from './CashFlowCarsCards';
import CashFlowOverseasPensions from '../Income&ExpenseComponents/CashFlowNew/CashFlowOverseasPensions';

const CashFlowCardSet = (props) => {

    let [QuestionChange, setQuestionChange] = useRecoilState(QuestionShift);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});
    let { cashFlow } = content;

    const componentMapping = {
        "CFQModal": <CFQModal />,
        "Overseas Pensions": <CashFlowOverseasPensions />,
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
        // Find the current item index based on the QuestionChange state
        const currentIndex = cashFlow.findIndex(item => item.route === `/${location.pathname.replace("/Cash-Flow/", "")}`);
        // alert("Current Index :" + currentIndex);
        // Find the next valid route by incrementing the index and checking the condition
        let nextIndex = currentIndex + 1;

        // console.log("Current Index :", cashFlow[nextIndex]);
        // while (nextIndex < cashFlow.length) {
        const nextItem = cashFlow[nextIndex];
        //     if (nextItem.condition(CRObject)) {
        //         // alert(nextItem.route);
        Navigation(`/Cash-Flow` + nextItem.route);
        //         break;
        //     }
        //     nextIndex++;
        // }

        // cashFlow[nextIndex]

        // Handle case where no next route is found (end of the list)
        // if (nextIndex >= cashFlow.length) {

        //     Navigation("/Goals-And-Objectives");

        //     console.log("End of navigation, no further steps.");
        // }
    };

    const BackHandle = () => {

        // Find the current item index based on the QuestionChange state
        const currentIndex = cashFlow.findIndex(item => item.route === `/${location.pathname.replace("/Cash-Flow/", "")}`);

        let nextIndex = currentIndex - 1;

        const nextItem = cashFlow[nextIndex];

        Navigation(`/Cash-Flow` + nextItem.route);

    };

    let OpenModal = (title, key) => {
        setFlagState(true);
        setModalObject({
            title: title,
            key: key,
        })
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
