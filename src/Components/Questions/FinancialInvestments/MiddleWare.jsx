import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { openNotificationSuccess, PatchAxios, PostAxios, toCommaAndDollar } from '../../Assets/Api/Api';
import DynamicTableRow from '../../Assets/Dynamic/DynamicTableRow';
import InnerModal from './QuestionsDetail/InnerModal';
import BankTermForm from './QuestionsDetail/BankTermForm';

import AustralianShares from './QuestionsDetail/AustralianShares';
import ManagedFunds from './QuestionsDetail/ManagedFunds';
import SuperFunds from './QuestionsDetail/SuperFunds';
import AccountBasedPension from './QuestionsDetail/AccountBasedPension';
import InvestedAnnuities from './QuestionsDetail/InvestedAnnuities';
import TradingCompany from '../BusinessEntities/TradingCompany';
import TradingTrust from '../BusinessEntities/TradingTrust';

const MiddleWare = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});


    let switchArray = ["Australian Shares", "Managed Funds", "Investment Bond"]

    let attrebuteSet = switchArray.includes(props.modalObject.title) ? true : false;


    let clientPartnerArray = ["Super Funds", "Account Based Pension", "Invested in Annuities", "Business as Company Structure", "Business as Trusts"];

    let clientPartnerOnly = clientPartnerArray.includes(props.modalObject.title) ? true : false;

    let BankAccountFinance = Object.keys(questionDetail[props.modalObject.key] || {}).length > 0 ? questionDetail[props.modalObject.key] : {
        client: [],
        joint: [],
        partner: [],
    };// Use an empty object as default if BankAccountFinance is undefined


    let initialValues = {
        clientCurrentBalance: "",
        partnerCurrentBalance: "",
        jointCurrentBalance: ""
    };


    const fillInitialValues = (setFieldValue) => {
        console.log(questionDetail[props.modalObject.key], props.modalObject.key, props.modalObject.title);
        if (BankAccountFinance.clientFK && BankAccountFinance._id) {

            setFieldValue("client", BankAccountFinance.client)
            setFieldValue("clientCurrentBalance", BankAccountFinance.clientCurrentBalance)

            if (props.modalObject.title != "Australian Shares") {
                if (attrebuteSet) {
                    let totalCostBase = BankAccountFinance.client.reduce((total, entry) => total + parseFloat((entry.totalPortfolioCost).replace(/[^0-9.-]+/g, "")), 0);
                    setFieldValue("clientCostBaseTemp", toCommaAndDollar(totalCostBase))
                }
            }
            else {
                let totalCostBase = BankAccountFinance.client.reduce((total, entry) => total + parseFloat((entry.costBase).replace(/[^0-9.-]+/g, "")), 0);
                setFieldValue("clientCostBaseTemp", toCommaAndDollar(totalCostBase))
            }


            if (localStorage.getItem('UserStatus') === "Married") {

                setFieldValue("partner", BankAccountFinance.partner)
                setFieldValue("joint", BankAccountFinance.joint)

                setFieldValue("partnerCurrentBalance", BankAccountFinance.partnerCurrentBalance)
                setFieldValue("jointCurrentBalance", BankAccountFinance.jointCurrentBalance)

                if (props.modalObject.title != "Australian Shares") {
                    if (attrebuteSet) {
                        let totalCostBase = BankAccountFinance.partner.reduce((total, entry) => total + parseFloat((entry.totalPortfolioCost).replace(/[^0-9.-]+/g, "")), 0);
                        setFieldValue("partnerCostBaseTemp", toCommaAndDollar(totalCostBase))

                        totalCostBase = BankAccountFinance.joint.reduce((total, entry) => total + parseFloat((entry.totalPortfolioCost).replace(/[^0-9.-]+/g, "")), 0);
                        setFieldValue("jointCostBaseTemp", toCommaAndDollar(totalCostBase))
                    }
                }
                else {
                    let totalCostBase = BankAccountFinance.partner.reduce((total, entry) => total + parseFloat((entry.costBase).replace(/[^0-9.-]+/g, "")), 0);
                    setFieldValue("partnerCostBaseTemp", toCommaAndDollar(totalCostBase))

                    totalCostBase = BankAccountFinance.joint.reduce((total, entry) => total + parseFloat((entry.costBase).replace(/[^0-9.-]+/g, "")), 0);
                    setFieldValue("jointCostBaseTemp", toCommaAndDollar(totalCostBase))
                }
            }

        }
    };

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {

        console.log(values);


        // return false

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





    const rowConfig = attrebuteSet ?
        [
            { type: "plainText", text: "client", styleSet: { width: "50%" }, },
            {
                name: 'clientCurrentBalance',
                type: 'number-toComma-Modal',
                placeholder: 'Current Balance',
                callBackModal: true,
                func: OpenInnerModal,
                key: "client",
                innerModalTitle: props.modalObject.title + " Detail"
            },
            { name: 'clientCostBaseTemp', type: 'number-toComma', disabled: true, placeholder: 'Cost Base', styleSet: { width: "25%" }, },
        ]
        : [
            { type: "plainText", text: "client", styleSet: { width: "50%" }, },
            {
                name: 'clientCurrentBalance',
                type: 'number-toComma-Modal',
                placeholder: 'Current Balance',
                callBackModal: true,
                func: OpenInnerModal,
                key: "client",
                innerModalTitle: props.modalObject.title + " Detail"
            },
        ];

    const rowConfigPartner = attrebuteSet ?
        [
            { type: "plainText", text: "partner", styleSet: { width: "50%" }, },
            {
                name: 'partnerCurrentBalance',
                type: 'number-toComma-Modal',
                placeholder: 'Current Balance',
                callBackModal: true,
                func: OpenInnerModal,
                key: "partner",
                innerModalTitle: props.modalObject.title + " Detail"
            },
            { name: 'partnerCostBaseTemp', type: 'number-toComma', disabled: true, placeholder: 'Cost Base', styleSet: { width: "25%" }, },
        ]
        : [
            { type: "plainText", text: "partner", styleSet: { width: "50%" }, },
            {
                name: 'partnerCurrentBalance',
                type: 'number-toComma-Modal',
                placeholder: 'Current Balance',
                callBackModal: true,
                func: OpenInnerModal,
                key: "partner",
                innerModalTitle: props.modalObject.title + " Detail"
            },
        ];

    const rowConfigJoint = attrebuteSet ?
        [
            { type: "plainText", text: "joint", styleSet: { width: "50%" }, },
            {
                name: 'jointCurrentBalance',
                type: 'number-toComma-Modal',
                placeholder: 'Current Balance',
                callBackModal: true,
                func: OpenInnerModal,
                key: "joint",
                innerModalTitle: props.modalObject.title + " Detail"
            },
            { name: 'jointCostBaseTemp', type: 'number-toComma', disabled: true, placeholder: 'Cost Base', styleSet: { width: "25%" }, },
        ]
        : [
            { type: "plainText", text: "joint", styleSet: { width: "50%" }, },
            {
                name: 'jointCurrentBalance',
                type: 'number-toComma-Modal',
                placeholder: 'Current Balance',
                callBackModal: true,
                func: OpenInnerModal,
                key: "joint",
                innerModalTitle: props.modalObject.title + " Detail"
            },
        ];

    async function OpenInnerModal(title, values, key) {
        console.log(title, values, key);
        setModalObject({
            title,
            Input: key,
            key: props.modalObject.key,
            values
        });
        setFlagState(true);
    }

    const componentMapping = {

        "Bank Accounts Detail": <BankTermForm />,
        "Term Deposits Detail": <BankTermForm />,
        "Australian Shares Detail": <AustralianShares />,
        "Managed Funds Detail": <ManagedFunds />,
        "Investment Bond Detail": <ManagedFunds />,
        "Super Funds Detail": <SuperFunds />,
        "Account Based Pension Detail": <AccountBasedPension />,
        "Invested in Annuities Detail": <InvestedAnnuities />,
        "Business as Company Structure Detail": <TradingCompany />,
        "Business as Trusts Detail": <TradingTrust />,

    };

    const ModalContent = (obj) => {
        return componentMapping[obj.title] || null;
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
                }, [values.NumberOfMap]);

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
                                                    <th>Owner</th>
                                                    <th>Current Balance</th>
                                                    {
                                                        attrebuteSet &&
                                                        <th>Cost Base</th>
                                                    }
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
                                                {(localStorage.getItem('UserStatus') === "Married") &&
                                                    <React.Fragment>
                                                        <DynamicTableRow
                                                            rowConfig={rowConfigPartner}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                        />
                                                        {!clientPartnerOnly &&
                                                            <DynamicTableRow
                                                                rowConfig={rowConfigJoint}
                                                                values={values}
                                                                setFieldValue={setFieldValue}
                                                                handleChange={handleChange}
                                                                handleBlur={handleBlur}
                                                            />
                                                        }
                                                    </React.Fragment>
                                                }
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

export default MiddleWare;
