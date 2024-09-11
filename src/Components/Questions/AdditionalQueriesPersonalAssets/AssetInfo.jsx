import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, InputGroup, Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { PatchAxios, PostAxios, RenderName } from '../../Assets/Api/Api';
import DynamicTableRow from '../../Assets/Dynamic/DynamicTableRow';

const AssetInfo = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let [UserStatus] = useState(localStorage.getItem('UserStatus'));


    let superAnnuationIssues = Object.keys(questionDetail.superAnnuationIssues).length > 0 ? questionDetail.superAnnuationIssues : {
        client: [],
        partner: [],
        joint: [],

    };  // Use an empty object as default if superAnnuationIssues is undefined


    let initialValues = { owner: "" };



    const fillInitialValues = (setFieldValue) => {

        if (superAnnuationIssues[props.modalObject.Input] && superAnnuationIssues[props.modalObject.Input].length) {

            superAnnuationIssues[props.modalObject.Input].forEach((data, i) => {
                if (data) {
                    setFieldValue(`fundName${i}`, data.fundName || '');
                    setFieldValue(`memberNumber${i}`, data.memberNumber || '');
                    setFieldValue(`memberArray${i}`, data.memberArray || '');
                    setFieldValue(`portfolioValue${i}`, data.portfolioValue || '');
                    setFieldValue(`portfolioArray${i}`, data.portfolioArray || '');
                    setFieldValue(`groupInsurance${i}`, data.groupInsurance || '');
                    setFieldValue(`groupInsuranceArray${i}`, data.groupInsuranceArray || '');
                    setFieldValue(`contributions${i}`, data.contributions || '');
                    setFieldValue(`ContributionsArray${i}`, data.ContributionsArray || '');
                    setFieldValue(`nominatedBeneficiaries${i}`, data.nominatedBeneficiaries || '');
                    setFieldValue(`beneficiariesArray${i}`, data.beneficiariesArray || '');
                    setFieldValue(`annualAdvice${i}`, data.annualAdvice || '');
                    setFieldValue(`loginInPage${i}`, data.loginInPage || '');

                }
            });
        }
    };

    let DefaultUrl = useRecoilValue(defaultUrl)


    let onSubmit = async (values) => {
        // console.log(values);
        // return (false);
        // Extract the number of maps from the values
        const numberOfMaps = parseInt(values.NumberOfMap, 10);
        const newEntries = [];

        // Iterate through each map entry and create a new object
        for (let i = 0; i < numberOfMaps; i++) {
            const newEntry = {
                fundName: values[`fundName${i}`] || "",
                memberNumber: values[`memberNumber${i}`] || "",
                memberArray: values[`memberArray${i}`] || "",
                portfolioValue: values[`portfolioValue${i}`] || "",
                portfolioArray: values[`portfolioArray${i}`] || "",
                groupInsurance: values[`groupInsurance${i}`] || "",
                groupInsuranceArray: values[`groupInsuranceArray${i}`] || "",
                contributions: values[`contributions${i}`] || "",
                ContributionsArray: values[`ContributionsArray${i}`] || "",
                nominatedBeneficiaries: values[`nominatedBeneficiaries${i}`] || "",
                beneficiariesArray: values[`beneficiariesArray${i}`] || "",
                annualAdvice: values[`annualAdvice${i}`] || "",
                loginInPage: values[`loginInPage${i}`] || "",
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        let DataOf = props.modalObject.Input;

        // Create an object with additional fields
        let obj = {
            clientFK: localStorage.getItem("UserID"),
        };

        obj[DataOf] = newEntries

        // Calculate total currentBalance
        obj[DataOf + "Total"] = newEntries.reduce((total, entry) => total + entry.annualAdvice, 0);

        console.log(obj, "final obj")

        // Check if superAnnuationIssues and the array at props.modalObject.Input exist
        // const bankAccountArray = superAnnuationIssues[props.modalObject.Input] || [];
        const bankAccountArray = superAnnuationIssues.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/superAnnuationIssues/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/superAnnuationIssues/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, superAnnuationIssues: res };
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


    const rowConfig = (props.modalObject.title === "Car") ? [
        { name: 'modelOfCar', type: 'text', placeholder: 'Model of Car', styleSet: { width: "33%" }, },
        { name: 'annualPaymentAmount', type: 'number-toComma', placeholder: 'Annual Payment Amount', styleSet: { width: "33%" }, },
    ] : (props.modalObject.title === "Other Assets") ? [
        { name: 'discription', type: 'text', placeholder: 'Discription', styleSet: { width: "33%" }, },
        { name: 'annualPaymentAmount', type: 'number-toComma', placeholder: 'Annual Payment Amount', styleSet: { width: "33%" }, },
    ] : [
        { name: 'annualPaymentAmount', type: 'number-toComma', placeholder: 'Annual Payment Amount', styleSet: { width: "50%" }, },
    ]

    let onlyJoint = ["Boat", "Caravan", "House hold"];


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
                }, []);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">

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
                                        >
                                            <option value={""}>Select</option>

                                            {onlyJoint.includes(props.modalObject.title) ?
                                                <option value={"joint"}> {"Joint (" + RenderName("joint") + ")"}</option> :
                                                <React.Fragment>
                                                    <option value={"client"}>  {RenderName("client")} </option>

                                                    {localStorage.getItem("UserStatus") !== "Single" &&
                                                        <React.Fragment>

                                                            <option value={"partner"}>{RenderName("partner")}</option>
                                                            <option value={"client+partner"}>{"Both (" + RenderName("client") + " , " + RenderName("partner") + ")"} </option>
                                                            {/*
                                                                <option value={"client+partner+joint"}>{RenderName("client") + " , " + RenderName("partner") + " and Joint"} </option>
                                                                <option value={"joint"}> {"Joint (" + RenderName("joint") + ")"} </option>
                                                            */}

                                                        </React.Fragment>
                                                    }
                                                </React.Fragment>}
                                        </Field>
                                    </div>
                                </div>


                                {values.owner !== "" &&
                                    <div className='row justify-content-center'>
                                        <div className='mt-4'>
                                            <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th onClick={() => { console.log(values) }}>Owner</th>
                                                        {props.modalObject.title === "Car" &&
                                                            <th>Model of Car</th>
                                                        }
                                                        {props.modalObject.title === "Other Assets" &&
                                                            <th>Discription</th>
                                                        }
                                                        <th>Current Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(values.owner === "client" || values.owner === "client+partner" || values.owner === "client+partner+joint") &&
                                                        <DynamicTableRow
                                                            rowConfig={rowConfig}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            stakeHolder={"client."}
                                                        />
                                                    }
                                                    {((values.owner === "partner" || values.owner === "client+partner" || values.owner === "client+partner+joint") && (UserStatus === "Married")) &&
                                                        <DynamicTableRow
                                                            rowConfig={rowConfig}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            stakeHolder={"partner."}
                                                        />
                                                    }

                                                    {(values.owner === "joint" || values.owner === "client+partner+joint") &&
                                                        <DynamicTableRow
                                                            rowConfig={rowConfig}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            stakeHolder={"joint."}
                                                        />
                                                    }

                                                </tbody>
                                            </Table>
                                        </div>

                                    </div>
                                }

                            </div>
                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AssetInfo;
