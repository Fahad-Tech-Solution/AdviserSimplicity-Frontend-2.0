import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl, QuestionDetail } from '../../../Store/Store';
import { openNotificationSuccess, PatchAxios, PostAxios, RenderName, toCommaAndDollar } from '../../Assets/Api/Api';
import axios from 'axios';
import DynamicTableRow from '../../Assets/Dynamic/DynamicTableRow';
import { CreatableMultiSelectField } from '../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField';

const OtherInvestmentsDynamic = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let bankDetailObj = useRecoilValue(BankDetail);


    let [lenderOption, setLenderOption] = useState(() => {

        if (!bankDetailObj?.FinancialInstitutions) return [];

        // Create an options array
        const optionsArray = bankDetailObj.FinancialInstitutions.map((elem) => ({
            value: elem._id,
            label: elem.platformName,
        }));

        return optionsArray;
    })



    let managedFundsLOC = Object.keys(questionDetail[props.modalObject.index] || {}).length > 0 ? questionDetail[props.modalObject.index] : {
        client: [],
        partner: [],
        joint: [],

    }; // Use an empty object as default if managedFundsLOC is undefined


    let initialValues = {
        investmentName: "",
        currentValue: "",
        costBase: "",
    };


    const fillInitialValues = (setFieldValue) => {

        console.log(managedFundsLOC);

        if (managedFundsLOC && managedFundsLOC._id) {

            // For client-related fields if "client" is included in the owner array
            if (managedFundsLOC && Object.keys(managedFundsLOC).length) {
                setFieldValue(`investmentName`, managedFundsLOC.investmentName || "");
                setFieldValue(`currentValue`, managedFundsLOC.currentValue || "");
                setFieldValue(`costBase`, managedFundsLOC.costBase || "");
            }
        }
    };

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {
        let obj = values;
        obj.clientFK = localStorage.getItem("UserID");
        obj.clientTotal = values.currentValue;

        console.log(obj, "final obj");

        // Check if managedFundsLOC and the array at props.modalObject.Input exist
        const bankAccountArray = managedFundsLOC.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                // Make a POST request if no bank account is found
                res = await PostAxios(`${DefaultUrl}/api/${props.modalObject.index}/Add`, obj);
            } else {
                // Make a PATCH request if a bank account is found
                res = await PatchAxios(`${DefaultUrl}/api/${props.modalObject.index}/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, [props.modalObject.index]: res };
                setQuestionDetail(updatedData);
            }
            openNotificationSuccess("success", "topRight", "Success Notification", `Data of "${props.modalObject.title}" is Saved`);

            // Reset flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);
            openNotificationSuccess("error", "topRight", "Error Notification", `Data of "${props.modalObject.title}" is not saved. Please try again!`);
        }
    };

    let optionsLender = [
        { value: "i/only", label: "i/only" },
        { value: "P&I", label: "P&I" },
    ]

    const rowConfig = [
        { name: 'investmentName', type: 'text', placeholder: 'Name of Investment', styleSet: { width: "20rem" }, },
        { name: 'currentValue', type: 'number-toComma', placeholder: 'Current Value', },
        { name: 'costBase', type: 'number-toComma', placeholder: 'Cost Base', },
    ]

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
                                <div className='row justify-content-center'>
                                    <div className='mt-4'>
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Name of Investment</th>
                                                    <th>Current Value</th>
                                                    <th>Cost Base</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <DynamicTableRow
                                                    rowConfig={rowConfig}
                                                    values={values}
                                                    setFieldValue={setFieldValue}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                />


                                            </tbody>
                                        </Table>
                                    </div>

                                </div>
                            </div>
                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default OtherInvestmentsDynamic;
