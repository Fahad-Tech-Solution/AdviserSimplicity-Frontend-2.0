import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { openNotificationSuccess, PatchAxios, PostAxios, RenderName, toCommaAndDollar } from '../../../Assets/Api/Api';
import axios from 'axios';
import DynamicTableRow from '../../../Assets/Dynamic/DynamicTableRow';
import { CreatableMultiSelectField } from './CreatableMultiSelectField';

const InvestmentLoan = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
    let bankDetailObj = useRecoilValue(BankDetail)

    let [UserStatus] = useState(localStorage.getItem('UserStatus'));

    let [nameSet] = useState(() => {
        if (props.modalObject.Input === "client") {
            return (localStorage.getItem("UserName"))
        }
        else if (props.modalObject.Input === "partner") {
            return (localStorage.getItem("PartnerName"))
        }
        else if (props.modalObject.Input === "joint") {
            return (localStorage.getItem("UserName") + " & " + localStorage.getItem("PartnerName"))
        }
    })


    let managedFundsLOC = Object.keys(questionDetail[props.modalObject.index] || {}).length > 0 ? questionDetail[props.modalObject.index] : {
        client: [],
        partner: [],
        joint: [],

    }; // Use an empty object as default if managedFundsLOC is undefined


    let initialValues = { owner: "", };

    const [dynamicFields, setDynamicFields] = useState([]);

    useEffect(() => {
        if (managedFundsLOC[props.modalObject.Input] && managedFundsLOC[props.modalObject.Input].length) {

            let arr = []

            for (let i = 0; i < managedFundsLOC[props.modalObject.Input].length; i++) {
                arr.push("");
            }

            setDynamicFields(arr);
        }
    }, [])


    const fillInitialValues = (setFieldValue) => {

        console.log(managedFundsLOC);

        if (managedFundsLOC && managedFundsLOC._id) {

            // Set the owner field, which is now an array
            setFieldValue(`owner`, managedFundsLOC.owner || []);

            // For client-related fields if "client" is included in the owner array
            if (managedFundsLOC.owner.includes("client")) {
                if (managedFundsLOC?.client && Object.keys(managedFundsLOC?.client).length) {
                    setFieldValue(`client.lender`, managedFundsLOC.client.lender || "");
                    setFieldValue(`client.loanBalance`, managedFundsLOC.client.loanBalance || "");
                    setFieldValue(`client.loanType`, managedFundsLOC.client.loanType || "");
                    setFieldValue(`client.repaymentsAmount`, managedFundsLOC.client.repaymentsAmount || "");
                    setFieldValue(`client.frequency`, managedFundsLOC.client.frequency || "");
                    setFieldValue(`client.annualRepayments`, managedFundsLOC.client.annualRepayments || "");
                    setFieldValue(`client.serviceFeeType`, managedFundsLOC.client.serviceFeeType || "");
                    setFieldValue(`client.interestRate`, managedFundsLOC.client.interestRate || "");
                    setFieldValue(`client.loanTerm`, managedFundsLOC.client.loanTerm || "");
                    setFieldValue(`client.loanTermRemaining`, managedFundsLOC.client.loanTermRemaining || "");
                    setFieldValue(`client.deductibleLoanAmount`, managedFundsLOC.client.deductibleLoanAmount || "");
                }
            }

            // For partner-related fields if "partner" is included in the owner array and user status is "Married"
            if (UserStatus === "Married" && managedFundsLOC.owner.includes("partner")) {
                if (managedFundsLOC?.partner && Object.keys(managedFundsLOC?.partner).length) {
                    setFieldValue(`partner.lender`, managedFundsLOC.partner.lender || "");
                    setFieldValue(`partner.loanBalance`, managedFundsLOC.partner.loanBalance || "");
                    setFieldValue(`partner.loanType`, managedFundsLOC.partner.loanType || "");
                    setFieldValue(`partner.repaymentsAmount`, managedFundsLOC.partner.repaymentsAmount || "");
                    setFieldValue(`partner.frequency`, managedFundsLOC.partner.frequency || "");
                    setFieldValue(`partner.annualRepayments`, managedFundsLOC.partner.annualRepayments || "");
                    setFieldValue(`partner.serviceFeeType`, managedFundsLOC.partner.serviceFeeType || "");
                    setFieldValue(`partner.interestRate`, managedFundsLOC.partner.interestRate || "");
                    setFieldValue(`partner.loanTerm`, managedFundsLOC.partner.loanTerm || "");
                    setFieldValue(`partner.loanTermRemaining`, managedFundsLOC.partner.loanTermRemaining || "");
                    setFieldValue(`partner.deductibleLoanAmount`, managedFundsLOC.partner.deductibleLoanAmount || "");
                }
            }

            // For joint-related fields if "joint" is included in the owner array
            if (managedFundsLOC.owner.includes("joint")) {
                if (managedFundsLOC?.joint && Object.keys(managedFundsLOC?.joint).length) {
                    setFieldValue(`joint.lender`, managedFundsLOC.joint.lender || "");
                    setFieldValue(`joint.loanBalance`, managedFundsLOC.joint.loanBalance || "");
                    setFieldValue(`joint.loanType`, managedFundsLOC.joint.loanType || "");
                    setFieldValue(`joint.repaymentsAmount`, managedFundsLOC.joint.repaymentsAmount || "");
                    setFieldValue(`joint.frequency`, managedFundsLOC.joint.frequency || "");
                    setFieldValue(`joint.annualRepayments`, managedFundsLOC.joint.annualRepayments || "");
                    setFieldValue(`joint.serviceFeeType`, managedFundsLOC.joint.serviceFeeType || "");
                    setFieldValue(`joint.interestRate`, managedFundsLOC.joint.interestRate || "");
                    setFieldValue(`joint.loanTerm`, managedFundsLOC.joint.loanTerm || "");
                    setFieldValue(`joint.loanTermRemaining`, managedFundsLOC.joint.loanTermRemaining || "");
                    setFieldValue(`joint.deductibleLoanAmount`, managedFundsLOC.joint.deductibleLoanAmount || "");
                }
            }
        }
    };



    let DefaultUrl = useRecoilValue(defaultUrl)


    let onSubmit = async (values) => {
        let obj = values;
        obj.clientFK = localStorage.getItem("UserID");

        let fiftyPercent;

        try {
            // Safely parse the value after removing non-numeric characters
            let annualRepayments = parseFloat(obj.joint?.annualRepayments.replace(/[^0-9.-]+/g, "")) * parseFloat(obj.joint?.serviceFeeType.replace(/[^0-9.-]+/g, ""));

            // Check if the parsed value is a valid number
            if (isNaN(annualRepayments) || annualRepayments === undefined) {
                fiftyPercent = 0; // Set to 0 if invalid
            } else {
                fiftyPercent = annualRepayments / 2; // Calculate fifty percent if valid
            }

        } catch (error) {
            // Handle any unexpected errors
            console.error("Error calculating fiftyPercent:", error);
            fiftyPercent = 0; // Set to 0 in case of error
        }

        // For "client" related calculations
        if (values.owner.includes("client")) {
            obj.clientTotal = toCommaAndDollar(
                (parseFloat(obj.client.annualRepayments.replace(/[^0-9.-]+/g, "")) * parseFloat(obj.client.serviceFeeType.replace(/[^0-9.-]+/g, ""))) + fiftyPercent
            );
        } else if (values.owner.includes("joint")) {
            obj.clientTotal = toCommaAndDollar(fiftyPercent);
        } else {
            obj.clientTotal = "";
            obj.client = {};
        }

        // For "partner" related calculations
        if (values.owner.includes("partner") && UserStatus === "Married") {
            obj.partnerTotal = toCommaAndDollar(
                (parseFloat(obj.partner?.annualRepayments.replace(/[^0-9.-]+/g, "")) * parseFloat(obj.partner?.serviceFeeType.replace(/[^0-9.-]+/g, ""))) + fiftyPercent
            );
        } else if (values.owner.includes("joint")) {
            obj.partnerTotal = toCommaAndDollar(fiftyPercent);
        } else {
            obj.partnerTotal = "";
            obj.partner = {};
        }

        // If the user status is not married, reset partner-related data
        if (UserStatus !== "Married") {
            obj.partnerTotal = "";
            obj.partner = {};
        }

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
    let optionsFrequency = [
        { value: 52, label: "Weekly" },
        { value: 26, label: "Fortnightly"},
        { value: 12, label: "Monthly" },
        { value: 1, label: "Annually" },
    ]

    const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
        value: (i + 1).toString(),
        label: ("Year " + (i + 1)).toString(),
    }))

    const rowConfig = [
        { name: 'lender', type: 'select', options: generateOptions(), placeholder: 'Lender', styleSet: { width: "20rem" }, },
        { name: 'loanBalance', type: 'number-toComma', placeholder: 'Loan Balance', },
        { name: 'loanType', type: 'select', options: optionsLender, placeholder: 'Loan Type', },
        { name: 'repaymentsAmount', type: 'number-toComma', placeholder: 'Repayments Amount', },
        { name: 'frequency', type: 'select', options: optionsFrequency, placeholder: 'Frequency', },
        {
            name: 'annualRepayments',
            type: 'number-toComma-and-MultiSelect',
            placeholder: 'Annual Repayments',
            name2: 'serviceFeeType',
            placeholder2: "Service Fee Type",
            styleSet: { width: "20rem" },
        },
        { name: 'interestRate', type: 'number-toPercent', placeholder: 'Interest Rate', },
        { name: 'loanTerm', type: 'select', options: loanTermOptions, placeholder: 'Loan Term', },
        { name: 'loanTermRemaining', type: 'select', options: loanTermOptions, placeholder: 'Loan Term Remaining', },
        { name: 'deductibleLoanAmount', type: 'number-toPercent', placeholder: 'Deductible Loan Amount', },
    ]

    function generateOptions() {
        const InstituteOptions = [];

        if (Array.isArray(bankDetailObj) && bankDetailObj.length > 0) {
            bankDetailObj.forEach((elem) => {
                InstituteOptions.push({ value: elem._id, label: elem.platformName });
            });
        }
        return InstituteOptions;
    };

    const options = (UserStatus !== "Single") ? [
        { value: "client", label: RenderName("client") },
        { value: "partner", label: RenderName("partner") },
        { value: "joint", label: RenderName("joint") }] :
        [{ value: "client", label: RenderName("client") },];


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
                                    <div className='col-md-12'>
                                        <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                            <label htmlFor='' className='text-end '>
                                                Owner
                                            </label>

                                            <div style={{ minWidth: "25%" }}>
                                                <Field
                                                    name={`owner`}
                                                    component={CreatableMultiSelectField}
                                                    label="Multi Select Field"
                                                    options={options}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {values.owner !== "" && (
                                        <div className='mt-4'>
                                            <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th>Owner</th>
                                                        <th>Lender</th>
                                                        <th>Loan Balance</th>
                                                        <th>Loan Type</th>
                                                        <th>Repayments Amount</th>
                                                        <th>Frequency</th>
                                                        <th>Annual Repayments</th>
                                                        <th>Interest Rate (p.a)</th>
                                                        <th>Loan Term</th>
                                                        <th>Loan Term Remaining</th>
                                                        <th>Deductible Loan Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {(values.owner.includes("client")) && (
                                                        <DynamicTableRow
                                                            rowConfig={rowConfig}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            stakeHolder={"client."}
                                                        />
                                                    )}

                                                    {(values.owner.includes("partner") && UserStatus === "Married") && (
                                                        <DynamicTableRow
                                                            rowConfig={rowConfig}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            stakeHolder={"partner."}
                                                        />
                                                    )}

                                                    {(values.owner.includes("joint")) && (
                                                        <DynamicTableRow
                                                            rowConfig={rowConfig}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            stakeHolder={"joint."}
                                                        />
                                                    )}

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

export default InvestmentLoan;
