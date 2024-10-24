import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { openNotificationSuccess, PatchAxios, PostAxios, RenderName, toCommaAndDollar } from '../../Assets/Api/Api';
import DynamicTableRow from '../../Assets/Dynamic/DynamicTableRow';
import InnerModal from '../FinancialInvestments/QuestionsDetail/InnerModal';
import BankTermForm from '../FinancialInvestments/QuestionsDetail/BankTermForm';

import AustralianShares from '../FinancialInvestments/QuestionsDetail/AustralianShares';
import ManagedFunds from '../FinancialInvestments/QuestionsDetail/ManagedFunds';
import SuperFunds from '../FinancialInvestments/QuestionsDetail/SuperFunds';
import AccountBasedPension from '../FinancialInvestments/QuestionsDetail/AccountBasedPension';
import InvestedAnnuities from '../FinancialInvestments/QuestionsDetail/InvestedAnnuities';
import TradingCompany from '../BusinessEntities/TradingCompany';
import SmsfAccumulationDetails from './SmsfAccumulationDetails';
import AccumulationBenefits from './AccumulationBenefits';

const SMSFMiddleWare = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let [ShowError, setShowError] = useState({});

    let [conditionalAttributes, setConditionalAttributes] = useState(() => {
        props.modalObject.title

        let AttributeSet = {
            "SMSF Accumulation Details": {
                headArray: [
                    "Member",
                    "Accumulation Benefits",
                    "Contributions",
                    "Nominated Beneficiaries",
                ],
                rowConfig: [
                    { type: "plainText2.0", text: "client", value: questionDetail.SMSFDetails.SMSFOwner.fundName, styleSet: { width: "30%" }, },
                    {
                        name: 'SMSFOwner.accumulationBenefits',
                        type: 'number-toComma-Modal',
                        placeholder: 'Accumulation Benefits',
                        extraClass: ShowError.clientCurrentBalanceError ? "is-invalid" : "",
                        invalidMessage: ShowError.clientCurrentBalanceError ? ShowError.clientCurrentBalanceMessage : "",
                        callBack: true,
                        inputChangeFunc: checkValues,
                        callBackModal: true,
                        func: OpenInnerModal,
                        key: "SMSFOwner",
                        innerModalTitle: questionDetail.SMSFDetails.SMSFOwner.fundName + "_" + props.modalObject.title
                    },
                    {
                        name: 'SMSFOwner.contributions', callBack: true, func: OpenInnerModal, type: 'yesnoModal',
                        innerModalTitle: questionDetail.SMSFDetails.SMSFOwner.fundName + "_Contributions",
                        key: "SMSFOwner"
                    },
                    {
                        name: 'SMSFOwner.nominatedBeneficiaries', callBack: true, func: OpenInnerModal, type: 'yesnoModal',
                        innerModalTitle: questionDetail.SMSFDetails.SMSFOwner.fundName + "_Nominated Beneficiaries",
                        key: "SMSFOwner"
                    },

                ]

            }
        }

        return AttributeSet[props.modalObject.title];
    });

    let BankAccountFinance = Object.keys(questionDetail[props.modalObject.key] || {}).length > 0 ? questionDetail[props.modalObject.key] : {
        client: [],
        joint: [],
        partner: [],
    };// Use an empty object as default if BankAccountFinance is undefined


    let initialValues = {};


    const fillInitialValues = (setFieldValue) => {
        console.log(questionDetail[props.modalObject.key], props.modalObject.key, props.modalObject.title);

    };

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {

        console.log(values);


        return false

        let obj = values;

        if (attrebuteSet) {
            values.clientCostBaseTemp = undefined;
            values.partnerCostBaseTemp = undefined;
            values.jointCostBaseTemp = undefined;
        }

        obj.clientFK = localStorage.getItem("UserID");


        if (obj.jointCurrentBalance && obj.jointCurrentBalance !== undefined && obj.jointCurrentBalance !== null && parseFloat(obj.jointCurrentBalance.replace(/[^0-9.-]+/g, "")) !== 0) {
            let fiftyPercent = 0;

            try {
                // Safely parse the value after removing non-numeric characters
                let jointCurrentBalance = parseFloat(obj.jointCurrentBalance.replace(/[^0-9.-]+/g, ""));

                // Check if the parsed value is a valid number
                if (isNaN(jointCurrentBalance) || jointCurrentBalance === undefined) {
                    fiftyPercent = 0; // Set to 0 if invalid
                } else {
                    fiftyPercent = jointCurrentBalance / 2; // Calculate fifty percent if valid
                }
            } catch (error) {
                // Handle any unexpected errors
                console.error("Error calculating fiftyPercent:", error);
                fiftyPercent = 0; // Set to 0 in case of error
            }


            if (fiftyPercent === 0) {
                obj.clientTotal = obj.clientCurrentBalance;
                obj.partnerTotal = obj.partnerCurrentBalance;
            }
            else {
                obj.clientTotal = toCommaAndDollar((parseFloat(obj.clientCurrentBalance.replace(/[^0-9.-]+/g, "")) || 0) + fiftyPercent)
                obj.partnerTotal = toCommaAndDollar((parseFloat(obj.partnerCurrentBalance.replace(/[^0-9.-]+/g, "")) || 0) + fiftyPercent)
            }

        }
        else {
            obj.clientTotal = obj.clientCurrentBalance || "$0";
            obj.partnerTotal = obj.partnerCurrentBalance || "$0";
        }


        if (clientPartnerOnly) {
            obj.jointCurrentBalance = undefined;
        }


        console.log(obj, "final obj")

        const bankAccountArray = BankAccountFinance.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/${props.modalObject.key}/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/${props.modalObject.key}/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, [props.modalObject.key]: res };
                setQuestionDetail(updatedData);
            }

            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
            openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved");

        } catch (error) {
            console.error("Error occurred while making API call:", error);
            openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved Please! try again");
        }

    };

    var checkValues = async (values, setFieldValue, currentInput, stakeHolder) => {
        // console.log(values, setFieldValue, currentInput, stakeHolder);

        // Use default empty arrays if values are undefined or null
        let client = values.client || [];
        let partner = values.partner || [];
        let joint = values.joint || [];

        let CheckState = "";
        let InputSet = "current balance";
        let ExpectedTotal = "";
        // Safely parse the current input value, fallback to 0 if parsing fails
        let fromWith = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;

        // Use switch case to determine which value needs to be checked
        switch (currentInput.name) {
            case "clientCurrentBalance":
                CheckState = "client";
                InputSet = "current balance";
                ExpectedTotal = await CheckExpectedTotal(props.modalObject.title, client, currentInput.name, CheckState);
                break;

            case "partnerCurrentBalance":
                InputSet = "current balance";
                CheckState = "partner";
                ExpectedTotal = await CheckExpectedTotal(props.modalObject.title, partner, currentInput.name, CheckState);
                break;

            case "jointCurrentBalance":
                InputSet = "current balance";
                CheckState = "joint";
                ExpectedTotal = await CheckExpectedTotal(props.modalObject.title, joint, currentInput.name, CheckState);
                break;

            case "clientCostBaseTemp":
                InputSet = "Cost Base";
                CheckState = "client";
                ExpectedTotal = await CheckExpectedTotal(props.modalObject.title, client, currentInput.name, CheckState);
                break;

            case "partnerCostBaseTemp":
                CheckState = "partner";
                InputSet = "Cost Base";
                ExpectedTotal = await CheckExpectedTotal(props.modalObject.title, partner, currentInput.name, CheckState);
                break;

            case "jointCostBaseTemp":
                CheckState = "joint";
                InputSet = "Cost Base";
                ExpectedTotal = await CheckExpectedTotal(props.modalObject.title, joint, currentInput.name, CheckState);
                break;

            default:
                break;
        }

        // Ensure ExpectedTotal is a valid number, fallback to 0 if NaN
        ExpectedTotal = ExpectedTotal || 0;

        console.log(ExpectedTotal, fromWith);
        // Check if the calculated total matches the input value
        if ((ExpectedTotal !== 0) && (ExpectedTotal !== fromWith)) {
            setShowError(prevState => ({
                ...prevState,
                [`${currentInput.name}Error`]: true,
                [`${currentInput.name}Message`]: "Total must be equal to the sum of all " + InputSet + " filled in the popup. The sum is " + toCommaAndDollar(ExpectedTotal),
            }));
        } else {
            setShowError(prevState => ({
                ...prevState,
                [`${currentInput.name}Error`]: false,
                [`${currentInput.name}Message`]: "",
            }));
        }
    };

    // Function to calculate the expected total based on modal title and array
    var CheckExpectedTotal = (ModalTitle, thisArray, currentInput, CheckState) => {
        if (!thisArray || thisArray.length === 0) return 0; // Return 0 if no data found

        switch (ModalTitle) {
            case "Bank Accounts":
            case "Term Deposits":
                // Safely parse and sum up current balances, fallback to 0 if invalid
                return thisArray.reduce((total, entry) => {
                    return total + (parseFloat(entry.currentBalance?.replace(/[^0-9.-]+/g, "")) || 0);
                }, 0);
                break;

            case "Australian Shares":
                // Check if currentBalance or costBase needs to be summed up
                if (currentInput === `${CheckState}CurrentBalance`) {
                    return thisArray.reduce((total, entry) => {
                        return total + (parseFloat(entry.currentBalance?.replace(/[^0-9.-]+/g, "")) || 0);
                    }, 0);
                } else {
                    return thisArray.reduce((total, entry) => {
                        return total + (parseFloat(entry.costBase?.replace(/[^0-9.-]+/g, "")) || 0);
                    }, 0);
                }
                break;

            case "Platform Investments":
            case "Investment Bond":
                // Check if currentBalance or costBase needs to be summed up
                if (currentInput === `${CheckState}CurrentBalance`) {
                    return thisArray.reduce((total, entry) => {
                        return total + (parseFloat((entry.serviceFee).replace(/[^0-9.-]+/g, "")) * parseFloat((entry.serviceFeeType) || 1) || 0);
                    }, 0);
                } else {
                    return thisArray.reduce((total, entry) => {
                        return total + (parseFloat(entry.totalPortfolioCost?.replace(/[^0-9.-]+/g, "")) || 0);
                    }, 0);
                }
                break;
            case "Super Funds":
                // Check if currentBalance or costBase needs to be summed up
                return thisArray.reduce((total, entry) => {
                    return total + (parseFloat(entry.annualAdvice?.replace(/[^0-9.-]+/g, "")) || 0);
                }, 0);
                break;
            case "Account Based Pension":
                // Check if currentBalance or costBase needs to be summed up
                return thisArray.reduce((total, entry) => {
                    return total + (parseFloat(entry.pensionPayment?.replace(/[^0-9.-]+/g, "")) || 0);
                }, 0);
                break;
            case "Invested in Annuities":
                // Check if currentBalance or costBase needs to be summed up
                return thisArray.reduce((total, entry) => {
                    return total + (parseFloat(entry.originalInvestmentAmount?.replace(/[^0-9.-]+/g, "")) || 0);
                }, 0);
                break;

            default:
                console.log("Koi Modal Match Nahi huwa ")
                return 0; // Return 0 if no valid case matches
        }
    };

    async function OpenInnerModal(title, values, key) {
        console.log(title, values, key);
        setModalObject({
            title,
            Input: key,
            key: props.modalObject.key,
            values,
            ShowError,
            setShowError,
            SMSFOwner: questionDetail.SMSFDetails.SMSFOwner.fundName
        });
        setFlagState(true);
    }

    const componentMapping = {

        "Bank Accounts Detail": <BankTermForm />,
        "Term Deposits Detail": <BankTermForm />,
        "Australian Shares/ETFs Detail": <AustralianShares />,
        "Platform Investments Detail": <ManagedFunds />,
        "Investment Bond Detail": <ManagedFunds />,
        "Super Funds Detail": <SuperFunds />,
        "Account Based Pension Detail": <AccountBasedPension />,
        "Annuities Detail": <InvestedAnnuities />,
        "Business as Company Structure Detail": <TradingCompany />,
        "SMSF Accumulation Details": <AccumulationBenefits />,

    };

    const ModalContent = (obj) => {

        if (Object.keys(obj).length > 0) {

            // Ensure obj is an object and has a title property
            if (typeof obj !== 'object' || obj === null || typeof obj.title !== 'string') {
                console.error("Invalid object or title:", obj); // Log the error for debugging
                return null; // Return null if obj or title is not valid
            }

            let title = obj.title || "";

            // Ensure title is defined before calling includes
            if (title && title.includes('_')) {
                // Slice the title to get everything after the first underscore
                title = title.split('_').slice(1).join('_'); // Use slice(1) to get everything after the first underscore
            }

            return componentMapping[title] || null; // Return the corresponding component or null if not found
        }
        else {
            return ("")
        }
    };


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({ values, handleChange, setFieldValue, handleBlur }) => {

                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">

                                <InnerModal modalObject={modalObject} setFieldValue={setFieldValue} setFlagState={setFlagState} flagState={flagState} >
                                    {ModalContent(modalObject)}
                                </InnerModal>

                                <div className='row justify-content-center'>
                                    <div className='mt-4'>
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    {conditionalAttributes.headArray.map((elem, index) => {
                                                        return (<th key={index}>{elem}</th>)
                                                    })}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <DynamicTableRow
                                                    rowConfig={conditionalAttributes.rowConfig}
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

export default SMSFMiddleWare;
