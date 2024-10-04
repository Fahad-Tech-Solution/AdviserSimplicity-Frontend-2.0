import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { PatchAxios, PostAxios, RenderName } from '../../Assets/Api/Api';
import DynamicYesNo from '../FinancialInvestments/QuestionsDetail/DynamicYesNo';
import DynamicTableRow from '../../Assets/Dynamic/DynamicTableRow';
import { Tooltip } from 'antd';
import { FaCircleQuestion } from 'react-icons/fa6';
import InnerModal from '../FinancialInvestments/QuestionsDetail/InnerModal';
import DynamicDescription from './DynamicDescription';

const EstatePlanningWill = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
    let [UserStatus] = useState(localStorage.getItem('UserStatus'));

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let will = Object.keys(questionDetail.will || {}).length > 0 ? questionDetail.will : {
        client: [],
        partner: [],
        joint: [],

    };  // Use an empty object as default if will is undefined

    let initialValues = { owner: "" };

    const fillInitialValues = (setFieldValue) => {
        console.log(will);
        if (will && will.clientFK) {
            setFieldValue("owner", will.owner)
            if (will.owner === "client" || will.owner === "client+partner" || will.owner === "together") {

                setFieldValue("client.yearSetUp", will.client.yearSetUp)
                setFieldValue("client.willsCurrent", will.client.willsCurrent)
                setFieldValue("client.executor", will.client.executor)
                setFieldValue("client.enduringGuardianship", will.client.enduringGuardianship)
                setFieldValue("client.testamentaryTrust", will.client.testamentaryTrust)
                setFieldValue("client.estatePlanningRadio", will.client.estatePlanningRadio)
                setFieldValue("client.estatePlanning", will.client.estatePlanning)

            }
            if (will.owner === "partner" || will.owner === "client+partner" || will.owner === "together") {
                setFieldValue("partner.yearSetUp", will.partner.yearSetUp)
                setFieldValue("partner.willsCurrent", will.partner.willsCurrent)
                setFieldValue("partner.executor", will.partner.executor)
                setFieldValue("partner.enduringGuardianship", will.partner.enduringGuardianship)
                setFieldValue("partner.testamentaryTrust", will.partner.testamentaryTrust)
                setFieldValue("partner.estatePlanningRadio", will.partner.estatePlanningRadio)
                setFieldValue("partner.estatePlanning", will.partner.estatePlanning)
            }

        }
    };

    let handleInnerModal = (title, values, key, stackHolder) => {
        setModalObject({
            title, values, key, stackHolder
        })
        setFlagState(true);
    }

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {
        console.log(values);
        // return (false);

        let DataOf = props.modalObject.Input;

        // Create an object with additional fields
        let obj = values;

        obj.clientFK = localStorage.getItem("UserID");


        if (values.owner === "client" || values.owner === "client+partner" || values.owner === "together") {
            obj.clientTotal = obj.client.yearSetUp.toString();
        } else {
            obj.clientTotal = "";
            obj.client = {};
        }

        if (values.owner === "partner" || values.owner === "client+partner" || values.owner === "together") {
            obj.partnerTotal = obj.partner.yearSetUp.toString();

        } else {
            obj.partnerTotal = "";
            obj.partner = {};
        }

        if (UserStatus !== "Married") {
            obj.partnerTotal = "";
            obj.partner = {};
        }

        console.log(obj, "final obj")

        // Check if will and the array at props.modalObject.Input exist
        // const bankAccountArray = will[props.modalObject.Input] || [];
        const bankAccountArray = will.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/will/Add`, obj);
            } else {
                res = await PatchAxios(`${DefaultUrl}/api/will/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, will: res };
                setQuestionDetail(updatedData);
            }

            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);
        }
    };

    let TBodyRender = (values, setFieldValue, handleChange, handleBlur, handleInnerModal) => {

        let storeInPartner = (values, setFieldValue, currentInput, stakeHolder) => {
            // console.log(values, setFieldValue, currentInput, stakeHolder)
            if (values.owner === "together") {

                let yearSetUp = "";

                switch (currentInput.name) {
                    case "client.yearSetUp":
                        yearSetUp = currentInput.value
                        break;
                    default:
                        console.log("noting selected")
                        break;
                }

                setFieldValue("partner.yearSetUp", yearSetUp || "")
            }
        }

        const rowConfig = [

            { name: 'yearSetUp', callBack: true, func: storeInPartner, type: 'number', placeholder: 'Year Set up', },
            { name: 'willsCurrent', type: 'yesno', },
            { name: 'executor', callBack: true, func: handleInnerModal, type: 'modal', placeholder: 'Executor', innerModalTitle: "Executor", key: "executor" },
            { name: 'enduringGuardianship', type: 'yesno', },
            { name: 'testamentaryTrust', type: 'yesno', },
            { name: 'estatePlanningRadio', callBack: true, func: handleInnerModal, type: 'yesnoModal', innerModalTitle: "Estate Planning", key: "estatePlanning" },
        ]
        const rowConfig2 = [
            { disabled: values.owner === "together", name: 'yearSetUp', type: 'number', placeholder: 'Year set up', },
            { disabled: values.owner === "together", name: 'willsCurrent', type: 'yesno', },
            { disabled: values.owner === "together", name: 'executor', callBack: true, func: handleInnerModal, type: 'modal', placeholder: 'Executor/s', innerModalTitle: "Executor", key: "executor" },
            { disabled: values.owner === "together", name: 'enduringGuardianship', type: 'yesno', },
            { disabled: values.owner === "together", name: 'testamentaryTrust', type: 'yesno', },
            { disabled: values.owner === "together", name: 'estatePlanningRadio', callBack: true, func: handleInnerModal, type: 'yesnoModal', innerModalTitle: "Estate Planning", key: "estatePlanning" },
        ]

        return (
            <React.Fragment>
                {(values.owner === "client" || values.owner === "client+partner" || values.owner === "together") &&
                    <DynamicTableRow
                        rowConfig={rowConfig}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        handleInnerModal={handleInnerModal}
                        stakeHolder={"client."}
                    />
                }
                {((values.owner === "partner" || values.owner === "client+partner" || values.owner === "together") && (UserStatus === "Married")) &&
                    <DynamicTableRow
                        rowConfig={rowConfig2}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleInnerModal={handleInnerModal}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        stakeHolder={"partner."}
                    />
                }
            </React.Fragment>
        )


    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({ values, setFieldValue, handleChange, handleBlur }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, [values.NumberOfMap]);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>

                                    <InnerModal modalObject={modalObject} setFieldValue={setFieldValue} setFlagState={setFlagState} flagState={flagState} >
                                        {
                                            modalObject.key === "executor" ? <DynamicDescription /> :
                                                modalObject.key === "estatePlanning" ? <DynamicDescription /> : ""
                                        }
                                    </InnerModal>

                                    <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                        <label htmlFor='' className='text-end '>
                                            Owner
                                        </label>

                                        <div className='w-25'>
                                            <Field
                                                as="select"
                                                placeholder="Name of owner"
                                                id={`owner`}
                                                name={`owner`}
                                                className="form-select inputDesignDoubleInput"
                                                onChange={(e) => {
                                                    setFieldValue(e.target.name, e.target.value)


                                                    if (e.target.value === "together") {
                                                        setFieldValue("partner.yearSetUp", values?.client.yearSetUp || "")
                                                        setFieldValue("partner.willsCurrent", values?.client.willsCurrent || "")
                                                        setFieldValue("partner.executor", values?.client.executor || "")
                                                        setFieldValue("partner.enduringGuardianship", values?.client.enduringGuardianship || "")
                                                        setFieldValue("partner.testamentaryTrust", values?.client.testamentaryTrust || "")
                                                        setFieldValue("partner.estatePlanningRadio", values?.client.estatePlanningRadio || "")
                                                    }
                                                }}
                                            >
                                                <option value={""}>Select</option>

                                                <option value={"client"}>  {RenderName("client")} </option>

                                                {localStorage.getItem("UserStatus") !== "Single" &&
                                                    <React.Fragment>

                                                        <option value={"partner"}>{RenderName("partner")}</option>
                                                        <option value={"client+partner"}>{"Both (" + RenderName("client") + " , " + RenderName("partner") + ")"} </option>
                                                        <option value={"together"}>{"Together (" + RenderName("client") + " , " + RenderName("partner") + ")"} </option>

                                                    </React.Fragment>
                                                }
                                            </Field>
                                        </div>
                                        {values.owner === "together" &&
                                            <label htmlFor='' className='text-end '>
                                                <Tooltip placement="top" title={"When yes is selected for Partner for Wills  and POA have an option to copy details from Client Answers for Will  and POA this will apply for when client and partner have a Will together."}>
                                                    <FaCircleQuestion style={{ fontSize: '18px', cursor: 'pointer' }} />
                                                </Tooltip>
                                            </label>
                                        }
                                    </div>

                                    {values.owner !== "" && (
                                        <div className='mt-4'>
                                            <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th onClick={() => { console.log(values) }}>No#</th>
                                                        <th>Year set up</th>
                                                        <th>Are Your Wills Current</th>
                                                        <th>Executor</th>
                                                        <th>Enduring Guardianship</th>
                                                        <th>Testamentary Trust</th>
                                                        <th>Any specific estate planning requirements/needs?</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {TBodyRender(values, setFieldValue, handleChange, handleBlur, handleInnerModal)}
                                                </tbody>
                                            </Table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default EstatePlanningWill;
