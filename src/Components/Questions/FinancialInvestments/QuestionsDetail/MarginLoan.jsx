import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { openNotificationSuccess, PatchAxios, PostAxios, RenderName, toCommaAndDollar } from '../../../Assets/Api/Api';
import axios from 'axios';
import DynamicTableRow from '../../../Assets/Dynamic/DynamicTableRow';
import { CreatableMultiSelectField } from './CreatableMultiSelectField';

const MarginLoan = (props) => {
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
            setFieldValue('owner', managedFundsLOC.owner || "");

            // Helper function to set multiple field values for client, partner, or joint
            const setLoanDetails = (prefix, data) => {
                if (data && Object.keys(data).length) {
                    setFieldValue(`${prefix}.lender`, data.lender || "");
                    setFieldValue(`${prefix}.loanBalance`, data.loanBalance || "");
                    setFieldValue(`${prefix}.monthlyContribution`, data.monthlyContribution || "");
                    setFieldValue(`${prefix}.annualLoan`, data.annualLoan || "");
                    setFieldValue(`${prefix}.interestRate`, data.interestRate || "");
                    setFieldValue(`${prefix}.loanTerm`, data.loanTerm || "");
                    setFieldValue(`${prefix}.loanTermRemaining`, data.loanTermRemaining || "");
                    setFieldValue(`${prefix}.deductibleLoanAmount`, data.deductibleLoanAmount || "");
                }
            };

            // Set client details if owner includes client
            if (
                // ["client", "client+partner", "client+partner+joint"].includes(managedFundsLOC.owner)
                managedFundsLOC.owner.includes("client")
            ) {
                setLoanDetails("client", managedFundsLOC.client);
            }

            // Set partner and joint details if user is married and owner includes partner/joint
            if (UserStatus === "Married") {
                if (
                    // ["partner", "client+partner", "client+partner+joint"].includes(managedFundsLOC.owner)
                    managedFundsLOC.owner.includes("partner")
                ) {
                    setLoanDetails("partner", managedFundsLOC.partner);
                }

                if (
                    // ["joint", "client+partner+joint"].includes(managedFundsLOC.owner)
                    managedFundsLOC.owner.includes("joint")
                ) {
                    setLoanDetails("joint", managedFundsLOC.joint);
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
            // Safely parse the value from joint.annualLoan if it exists
            let annualLoan = parseFloat(obj.joint?.annualLoan?.replace(/[^0-9.-]+/g, "")) || 0;

            // Calculate fifty percent if valid
            fiftyPercent = annualLoan ? annualLoan / 2 : 0;

        } catch (error) {
            // Handle unexpected errors during parsing
            console.error("Error calculating fiftyPercent:", error);
            fiftyPercent = 0;
        }

        // Handle clientTotal based on owner array structure
        if (values.owner.includes("client")) {
            obj.clientTotal = toCommaAndDollar(parseFloat(obj.client?.annualLoan?.replace(/[^0-9.-]+/g, "")) + fiftyPercent || 0);
        } else if (values.owner.includes("joint")) {
            obj.clientTotal = toCommaAndDollar(fiftyPercent);
        } else {
            obj.clientTotal = "";
            obj.client = {};
        }

        // Handle partnerTotal based on owner array and UserStatus
        if (UserStatus === "Married" && values.owner.includes("partner")) {
            obj.partnerTotal = toCommaAndDollar(parseFloat(obj.partner?.annualLoan?.replace(/[^0-9.-]+/g, "")) + fiftyPercent || 0);
        } else if (values.owner.includes("joint")) {
            obj.partnerTotal = toCommaAndDollar(fiftyPercent);
        } else {
            obj.partnerTotal = "";
            obj.partner = {};
        }

        // Ensure partnerTotal and partner fields are cleared if not Married
        if (UserStatus !== "Married") {
            obj.partnerTotal = "";
            obj.partner = {};
        }

        console.log(obj, "final obj");

        // Retrieve bank account data from managedFundsLOC
        const bankAccountArray = managedFundsLOC.clientFK || "";

        try {
            let res;

            if (!bankAccountArray) {
                // Post new data if bankAccountArray is empty
                res = await PostAxios(`${DefaultUrl}/api/${props.modalObject.index}/Add`, obj);
            } else {
                // Update existing data
                res = await PatchAxios(`${DefaultUrl}/api/${props.modalObject.index}/Update`, obj);
            }

            if (res) {
                // Update state with the returned data
                const updatedData = { ...questionDetail, [props.modalObject.index]: res };
                setQuestionDetail(updatedData);
            }

            openNotificationSuccess("success", "topRight", "Success Notification", `Data of "${props.modalObject.title}" is Saved`);

            // Reset the flag state if needed
            if (props.flagState) {
                props.setFlagState(false);
            }

        } catch (error) {
            console.error("Error occurred while making API call:", error);
            openNotificationSuccess("error", "topRight", "Error Notification", `Data of "${props.modalObject.title}" is not Saved. Please try again.`);
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
        { name: 'lender', type: 'select', options: lenderOption, placeholder: 'Lender', styleSet: { width: "15rem" }, },
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
                                                        <th>Monthly Contribution</th>
                                                        <th>Annual Loan Contributions</th>
                                                        <th>Interest Rate (p.a)</th>
                                                        <th>Loan Term</th>
                                                        <th>Loan Term Remaining</th>
                                                        <th>Deductible Loan Amount </th>
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

export default MarginLoan;
