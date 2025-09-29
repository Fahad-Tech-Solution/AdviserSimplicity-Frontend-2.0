import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Card } from 'react-bootstrap';
import { CRState, QuestionDetail } from '../../../Store/Store';
import { useRecoilValue } from 'recoil';

const CombinedSwitch = (props) => {
    let { OpenModal, arrayCount, jointClass, PartnerClass, elem, index } = props;

    let questionDetail = useRecoilValue(QuestionDetail);
    let CRObject = useRecoilValue(CRState);


    let onlyJoint = ["Boat", "Caravan", "House hold",];
    let onlyClient = ["Other Assets",];


    if (onlyJoint.includes(elem.title)) {
        return (
            <div className={`col-md-3 mb-4`} key={index}>
                <Card className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex" style={{ borderRadius: "20px", height: "100%" }}>
                    <h5 className='text-center' onClick={() => { console.log(questionDetail[elem.key]) }}>{elem.title}</h5>
                    <div className="QuestionIcon CardImg">
                        <img className="img-fluid" src={elem.img} alt="" />
                    </div>
                    <div
                        className={`row justify-content-center align-items-center my-2`}
                    >
                        <div className='col-12 p-0 '>
                            <div className='d-flex flex-column-reverse justify-content-center align-items-center gap-2'>
                                <label
                                    className="d-block"
                                    htmlFor={"joint" + elem.key}
                                >{(localStorage.getItem("UserName") || "You")} {(localStorage.getItem('UserStatus') === "Married" && (" & " + (localStorage.getItem("PartnerName") || "")))} </label>

                                <label
                                    className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                    onClick={() => { OpenModal(elem.title, "client", elem.key) }}
                                >
                                    <div>
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <input type="text"
                        className={`form-control inputDesign`}
                        id={"joint" + elem.key}
                        placeholder={elem.title}
                        name={"joint" + elem.key}
                        value={questionDetail && questionDetail[elem.key]?.jointTotal ? questionDetail[elem.key].jointTotal : ""}
                    />
                </Card>
            </div>
        );
    }
    if (onlyClient.includes(elem.title)) {
        return (
            <div className={`col-md-3 mb-4`} key={index}>
                <Card className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex" style={{ borderRadius: "20px", height: "100%" }}>
                    <h5 className='text-center' onClick={() => { console.log(questionDetail[elem.key]) }}>{elem.title}</h5>
                    <div className="QuestionIcon CardImg">
                        <img className="img-fluid" src={elem.img} alt="" />
                    </div>
                    <div
                        className={`row justify-content-center align-items-center my-2`}
                    >
                        <div className='col-12 p-0 '>
                            <div className='d-flex flex-column-reverse justify-content-center align-items-center gap-2'>
                                <label
                                    className="d-block"
                                    htmlFor={"client" + elem.key}
                                >{(localStorage.getItem("UserName") || "You")} </label>

                                <label
                                    className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                    onClick={() => { OpenModal(elem.title, "client", elem.key) }}
                                >
                                    <div>
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <input type="text"
                        className={`form-control inputDesign`}
                        id={"client" + elem.key}
                        placeholder={elem.title}
                        name={"client" + elem.key}
                        value={questionDetail && questionDetail[elem.key]?.clientTotal ? questionDetail[elem.key].clientTotal : ""}
                    />
                </Card>
            </div>
        );
    }
    else if (elem.title === "Own a Family Home") {
        return (
            <div className={`col-md-3 mb-4`} key={index}>
                <Card className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex" style={{ borderRadius: "20px", height: "100%" }}>
                    <h5 className='text-center' onClick={() => { console.log(questionDetail[elem.key]) }}>{elem.title}
                    </h5>
                    <div className="QuestionIcon CardImg">
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
                                >Market Value</label>
                                <label
                                    className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                    onClick={() => { OpenModal(elem.title, "client", elem.key) }}
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
                        value={questionDetail && questionDetail[elem.key]?.currentValue ? questionDetail[elem.key].currentValue : ""}
                    />
                    <div
                        className={`row justify-content-center align-items-center my-2`}
                    >
                        <div className='col-12 p-0 '>
                            <div className='d-flex flex-column-reverse justify-content-center align-items-center gap-2'>
                                <label
                                    className=" d-block "
                                    htmlFor={"partner" + elem.key}
                                >Loan Balance </label>
                            </div>
                        </div>
                    </div>
                    <input type="text"
                        className={`form-control inputDesign`}
                        id={"partner" + elem.key}
                        placeholder={elem.title}
                        name={"partner" + elem.key}
                        value={questionDetail && questionDetail[elem.key]?.HomeLoanModal?.loanBalance ? questionDetail[elem.key].HomeLoanModal.loanBalance : ""}
                    />
                </Card>
            </div>
        );
    }
    else {
        return (
            <div className={`col-md-3 mb-4`} key={index}>

                <Card className="py-4 shadow borderOverAll GoalsobjectiveCard d-flex" style={{ borderRadius: "20px", height: "100%" }}>
                    <h5 className='text-center' onClick={() => { console.log(questionDetail[elem.key]) }}>{elem.title}
                    </h5>
                    <div className="QuestionIcon CardImg">
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
                                    onClick={() => { OpenModal(elem.title, "client", elem.key) }}
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
                        value={questionDetail && questionDetail[elem.key]?.clientTotal ? questionDetail[elem.key].clientTotal : ""}
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
                            </div>
                        </div>
                    </div>
                    <input type="text"
                        className={`form-control inputDesign ${PartnerClass}`}
                        id={"partner" + elem.key}
                        placeholder={elem.title}
                        name={"partner" + elem.key}
                        value={questionDetail && questionDetail[elem.key]?.partnerTotal ? questionDetail[elem.key].partnerTotal : ""}
                    />
                </Card>
            </div>
        );
    }



}

export default CombinedSwitch
