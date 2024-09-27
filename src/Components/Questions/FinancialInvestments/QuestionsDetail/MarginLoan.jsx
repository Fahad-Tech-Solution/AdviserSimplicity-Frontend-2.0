import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { openNotificationSuccess, PatchAxios, PostAxios, RenderName, toCommaAndDollar } from '../../../Assets/Api/Api';
import axios from 'axios';
import DynamicTableRow from '../../../Assets/Dynamic/DynamicTableRow';

const MarginLoan = (props) => {
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

        console.log(managedFundsLOC)

        if (managedFundsLOC && managedFundsLOC._id) {

            setFieldValue(`owner`, managedFundsLOC.owner || "");

            if (managedFundsLOC.owner === "client" || managedFundsLOC.owner === "client+partner" || managedFundsLOC.owner === "client+partner+joint") {
                if (managedFundsLOC?.client && Object.keys(managedFundsLOC?.client).length) {

                    setFieldValue(`client.lender`, managedFundsLOC.client.lender || "");
                    setFieldValue(`client.loanBalance`, managedFundsLOC.client.loanBalance || "");
                    setFieldValue(`client.monthlyContribution`, managedFundsLOC.client.monthlyContribution || "");
                    setFieldValue(`client.annualLoan`, managedFundsLOC.client.annualLoan || "");
                    setFieldValue(`client.interestRate`, managedFundsLOC.client.interestRate || "");
                    setFieldValue(`client.loanTerm`, managedFundsLOC.client.loanTerm || "");
                    setFieldValue(`client.loanTermRemaining`, managedFundsLOC.client.loanTermRemaining || "");
                    setFieldValue(`client.deductibleLoanAmount`, managedFundsLOC.client.deductibleLoanAmount || "");
                }
            }

            if (UserStatus === "Married") {

                if (managedFundsLOC.owner === "partner" || managedFundsLOC.owner === "client+partner" || managedFundsLOC.owner === "client+partner+joint") {
                    if (managedFundsLOC?.partner && Object.keys(managedFundsLOC?.partner).length) {

                        setFieldValue(`partner.lender`, managedFundsLOC.partner.lender || "");
                        setFieldValue(`partner.loanBalance`, managedFundsLOC.partner.loanBalance || "");
                        setFieldValue(`partner.monthlyContribution`, managedFundsLOC.partner.monthlyContribution || "");
                        setFieldValue(`partner.annualLoan`, managedFundsLOC.partner.annualLoan || "");
                        setFieldValue(`partner.interestRate`, managedFundsLOC.partner.interestRate || "");
                        setFieldValue(`partner.loanTerm`, managedFundsLOC.partner.loanTerm || "");
                        setFieldValue(`partner.loanTermRemaining`, managedFundsLOC.partner.loanTermRemaining || "");
                        setFieldValue(`partner.deductibleLoanAmount`, managedFundsLOC.partner.deductibleLoanAmount || "");

                    }
                }

                if (managedFundsLOC.owner === "joint" || managedFundsLOC.owner === "client+partner+joint") {
                    if (managedFundsLOC?.joint && Object.keys(managedFundsLOC?.joint).length) {

                        setFieldValue(`joint.lender`, managedFundsLOC.joint.lender || "");
                        setFieldValue(`joint.loanBalance`, managedFundsLOC.joint.loanBalance || "");
                        setFieldValue(`joint.monthlyContribution`, managedFundsLOC.joint.monthlyContribution || "");
                        setFieldValue(`joint.annualLoan`, managedFundsLOC.joint.annualLoan || "");
                        setFieldValue(`joint.interestRate`, managedFundsLOC.joint.interestRate || "");
                        setFieldValue(`joint.loanTerm`, managedFundsLOC.joint.loanTerm || "");
                        setFieldValue(`joint.loanTermRemaining`, managedFundsLOC.joint.loanTermRemaining || "");
                        setFieldValue(`joint.deductibleLoanAmount`, managedFundsLOC.joint.deductibleLoanAmount || "");

                    }
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
            let annualLoan = parseFloat(obj.joint.annualLoan.replace(/[^0-9.-]+/g, ""));

            // Check if the parsed value is a valid number
            if (isNaN(annualLoan) || annualLoan === undefined) {
                fiftyPercent = 0; // Set to 0 if invalid
            } else {
                fiftyPercent = annualLoan / 2; // Calculate fifty percent if valid
            }
        } catch (error) {
            // Handle any unexpected errors
            console.error("Error calculating fiftyPercent:", error);
            fiftyPercent = 0; // Set to 0 in case of error
        }


        if (values.owner === "client" || values.owner === "client+partner" || values.owner === "client+partner+joint") {
            obj.clientTotal = toCommaAndDollar(parseFloat(obj.client.annualLoan.replace(/[^0-9.-]+/g, "")) + fiftyPercent);
        }
        else if (values.owner === "joint") {
            obj.clientTotal = toCommaAndDollar(fiftyPercent);

        } else {
            obj.clientTotal = "";
            obj.client = {};
        }

        if (values.owner === "partner" || values.owner === "client+partner" || values.owner === "client+partner+joint") {
            obj.partnerTotal = toCommaAndDollar(parseFloat(obj.partner.annualLoan.replace(/[^0-9.-]+/g, "")) + fiftyPercent);
        }
        else if (values.owner === "joint") {
            obj.partnerTotal = toCommaAndDollar(fiftyPercent);

        }
        else {
            obj.partnerTotal = "";
            obj.partner = {};
        }

        if (UserStatus !== "Married") {
            obj.partnerTotal = "";
            obj.partner = {};
        }


        console.log(obj, "final obj")

        // Check if managedFundsLOC and the array at props.modalObject.Input exist
        // const bankAccountArray = managedFundsLOC[props.modalObject.Input] || [];
        const bankAccountArray = managedFundsLOC.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/${props.modalObject.index}/Add`, obj);
            } else {
                // obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/${props.modalObject.index}/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, [props.modalObject.index]: res };
                setQuestionDetail(updatedData);
            }

            openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved");
            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);
            openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved Please! try again");
        }
    };

    const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
        value: (i + 1).toString(),
        label: ("Year " + (i + 1)).toString(),
    }))


    function FormulaSetting(values, setFieldValue, current, stakeHolder) {
        // console.log(values, setFieldValue, current, stakeHolder)

        let monthlyContribution = parseFloat(current.value.replace(/[^0-9.-]+/g, "")) || 0;

        let annualLoan = toCommaAndDollar(monthlyContribution * 12);


        // console.log(monthlyContribution,annualLoan)

        let Parent = stakeHolder.replace(".", "")
        setFieldValue(`${Parent}.annualLoan`, annualLoan)




    }


    const rowConfig = [
        { name: 'lender', type: 'text', placeholder: 'Lender', styleSet: { width: "5rem" }, },
        { name: 'loanBalance', type: 'number-toComma', placeholder: 'Loan Balance', },
        {
            name: 'monthlyContribution',
            type: 'number-toComma',
            placeholder: 'Loan Type',
            callBack: true,
            func: FormulaSetting,
        },
        { name: 'annualLoan', type: 'text', placeholder: 'Repayments Amount', disabled: true },
        { name: 'interestRate', type: 'number-toPercent', placeholder: 'Interest Rate', },
        { name: 'loanTerm', type: 'select', options: loanTermOptions, placeholder: 'Loan Term', },
        { name: 'loanTermRemaining', type: 'select', options: loanTermOptions, placeholder: 'Loan Term Remaining', },
        { name: 'deductibleLoanAmount', type: 'number-toPercent', placeholder: 'Deductible Loan Amount', },
    ]


    function generateOptions() {
        const InstituteOptions = [];

        if (Array.isArray(bankDetailObj) && bankDetailObj.length > 0) {
            bankDetailObj.forEach((elem) => {
                InstituteOptions.push({ value: elem._id, label: elem.name });
            });
        }
        return InstituteOptions;
    };

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

                                            <div className='w-25'>
                                                <Field
                                                    as="select"
                                                    placeholder="Name of owner"
                                                    id={`owner`}
                                                    name={`owner`}
                                                    className="form-select inputDesignDoubleInput"
                                                >
                                                    <option value={""}>Select</option>

                                                    <option value={"client"}>  {RenderName("client")} </option>

                                                    {localStorage.getItem("UserStatus") !== "Single" &&
                                                        <React.Fragment>

                                                            <option value={"partner"}>{RenderName("partner")}</option>
                                                            <option value={"client+partner"}>{"Both (" + RenderName("client") + " , " + RenderName("partner") + ")"} </option>
                                                            <option value={"joint"}>{RenderName("joint")}</option>
                                                            <option value={"client+partner+joint"}>{RenderName("client") + " , " + RenderName("partner") + " & joint"} </option>

                                                        </React.Fragment>
                                                    }
                                                </Field>
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
                                                        <th>Monthly Contribution</th>
                                                        <th>Annual Loan Contributions</th>
                                                        <th>Interest Rate (p.a)</th>
                                                        <th>Loan Term</th>
                                                        <th>Loan Term Remaining</th>
                                                        <th>Deductible Loan Amount </th>
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

export default MarginLoan;
