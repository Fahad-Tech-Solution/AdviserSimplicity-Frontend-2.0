import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CreatableMultiSelectField } from "../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import {
    openNotificationSuccess,
    PatchAxios,
    PostAxios,
    RenderName,
    toCommaAndDollar,
} from "../../Components/Assets/Api/Api";
import { Row, Table } from "react-bootstrap";
import { CashFlowData, CashFlowScenarioData, defaultUrl, QuestionDetail } from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";

import InputOverride from "./InputOverride";
import BalanceComponents from "./BalanceComponents";
import InsurancePremiums from "./InsurancePremiums";
import RolloverFunds from "./RolloverFunds";
import ConcessionalContributions from "./ConcessionalContributions";
import NonConcessionalContributions from "./NonConcessionalContributions";
import Withdrawals from "./Withdrawals";

const CFSuperFund = (props) => {


    let questionDetail = useRecoilValue(QuestionDetail);
    let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
    let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

    let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

    let [UserStatus] = useState(localStorage.getItem("UserStatus"));
    let DefaultUrl = useRecoilValue(defaultUrl);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let superAnnuationIssues = Object.keys(questionDetail.superAnnuationIssues || {}).length > 0 ? questionDetail.superAnnuationIssues : {
        client: [],
        partner: [],
        joint: [],

    };  // Use an empty object as default if superAnnuationIssues is undefined

    let initialValues = {
        owner: [],
    };

    const fillInitialValues = (setFieldValue) => {
        try {
            // Set the object and API key
            setObjAndAPIKey(props.modalObject.key);

            console.log(superAnnuationIssues, "Discovery Form Data " + props.modalObject.key + " and SourceKey " + props.modalObject.sourceKey, superAnnuationIssues.client);
            // console.log(cashFlowData?.[objAndAPIKey].client.investmentFees, "cashFlowData Form Data");
            // console.log(CashFlowScenarioDataObj, "CashFlowScenarioDataObj Form Data");

            const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

            // Helper function to update field values
            const updateFields = (data, prefix) => {

                if (!data || !Object.keys(data).length) return;

                const fields = {
                    balanceComponents: data.balanceComponents || "$0",
                    balanceComponentsObj: data.balanceComponentsObj || {},
                    riskProfile: data.riskProfile || "$0",
                    investmentReturns: data.investmentReturns || "$0",
                    investmentReturnsObj: data.investmentReturnsObj || {},
                    investmentFees: data.investmentFees || "0%",
                    adviserServiceFee: data.adviserServiceFee || "$0",
                    insurancePremiums: data.insurancePremiums || "No",
                    insurancePremiumsObj: data.insurancePremiumsObj || {},
                    rolloverFunds: data.rolloverFunds || "No",
                    rolloverFundsObj: data.rolloverFundsObj || {},
                    concessionalContributions: data.concessionalContributions || "No",
                    concessionalContributionsObj: data.concessionalContributionsObj || {},
                    nonConcessionalContributions: data.nonConcessionalContributions || "No",
                    nonConcessionalContributionsObj: data.nonConcessionalContributionsObj || {},
                    withdrawals: data.withdrawals || "No",
                    withdrawalsObj: data.withdrawalsObj || {},
                };

                Object.entries(fields).forEach(([key, value]) => {
                    setFieldValue(`${prefix}.${key}`, value);
                });
            };

            // Update owner field
            if (scenarioObj?.selectedSource === "discoveryForm" && superAnnuationIssues && superAnnuationIssues._id) {

                // Update client-related fields
                if (superAnnuationIssues?.client.length > 0) {

                    let totalOfAnnualAdvice = superAnnuationIssues.client.reduce((total, entry) => total + parseFloat((entry.annualAdvice).replace(/[^0-9.-]+/g, "")), 0)
                    let taxFreeComponentTotal = superAnnuationIssues.client.reduce((total, entry) => total + parseFloat((entry.balanceBenefitDetailsArray[0].taxFreeComponent).replace(/[^0-9.-]+/g, "")), 0)

                    let Obj = {
                        balanceComponentsObj: {
                            currentBalance: toCommaAndDollar(totalOfAnnualAdvice),
                            taxFreeComponent: toCommaAndDollar(taxFreeComponentTotal),
                        }
                    }

                    if (superAnnuationIssues.client.length > 1) {
                        Obj.balanceComponentsObj.currentBalance1 = toCommaAndDollar(totalOfAnnualAdvice);
                        Obj.balanceComponentsObj.taxFreeComponent1 = toCommaAndDollar(taxFreeComponentTotal);
                    }
                    updateFields(Obj, "client");
                }

                // Update partner-related fields
                if (
                    UserStatus === "Married" &&
                    superAnnuationIssues?.partner &&
                    superAnnuationIssues.partner.length > 0
                ) {

                    let totalOfAnnualAdvice = superAnnuationIssues?.partner.reduce((total, entry) => total + parseFloat((entry.annualAdvice).replace(/[^0-9.-]+/g, "")), 0)
                    let taxFreeComponentTotal = superAnnuationIssues?.partner.reduce((total, entry) => total + parseFloat((entry.balanceBenefitDetailsArray[0].taxFreeComponent).replace(/[^0-9.-]+/g, "")), 0)

                    let Obj = {
                        balanceComponentsObj: {
                            currentBalance: toCommaAndDollar(totalOfAnnualAdvice),
                            taxFreeComponent: toCommaAndDollar(taxFreeComponentTotal),
                        }
                    }

                    if (superAnnuationIssues.partner.length > 1) {
                        Obj.balanceComponentsObj.currentBalance1 = toCommaAndDollar(totalOfAnnualAdvice);
                        Obj.balanceComponentsObj.taxFreeComponent1 = toCommaAndDollar(taxFreeComponentTotal);
                    }
                    updateFields(Obj, "partner");
                }

            }
            else {
                // Handle cashFlowData scenario
                const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
                console.log(cashFlowDetails, "cashFlowDetails")
                if (cashFlowDetails) {
                    setFieldValue(`owner`, cashFlowDetails.owner || "");
                    if (cashFlowDetails.owner.includes("client")) {
                        // Update client details
                        updateFields(cashFlowDetails.client, "client");
                    }

                    if (UserStatus === "Married" && cashFlowDetails.owner.includes("partner")) {
                        // Update partner details
                        updateFields(cashFlowDetails.partner, "partner");
                    }
                }
            }


            // Additional data from cashFlowData
            if (cashFlowData?.[objAndAPIKey]?._id) {
                const cashFlowDataDetails = cashFlowData[objAndAPIKey];
                setFieldValue(`owner`, cashFlowDataDetails.owner || "");

                if (cashFlowDataDetails.owner.includes("client")) {
                    // Update client details
                    updateFields(cashFlowDataDetails.client, "client");
                }

                if (UserStatus === "Married" && cashFlowDataDetails.owner.includes("partner")) {
                    // Update partner details
                    updateFields(cashFlowDataDetails.partner, "partner");
                }
            }

        } catch (error) {
            console.error("Error in fillInitialValues:", error);
        }
    };

    let onSubmit = async (values) => {
        console.log(JSON.stringify(values));
        // return (false);
        let obj = values

        obj.scenarioFK = (JSON.parse(localStorage.getItem("ScenarioObj")))._id;


        if (values.owner.includes("client")) {
            obj.clientTotal = values.client.adviserServiceFee || "$0";
        }
        else {
            obj.clientTotal = ""
        }

        if (values.owner.includes("partner")) {
            obj.partnerTotal = values.partner.adviserServiceFee || "$0";
        }
        else {
            obj.partnerTotal = ""
        }

        const bankAccountArray = cashFlowData?.[objAndAPIKey]?._id || "";

        console.log(obj, "final obj");

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(
                    `${DefaultUrl}/api/CF/${objAndAPIKey}/Add`,
                    obj
                );
            } else {
                res = await PatchAxios(
                    `${DefaultUrl}/api/CF/${objAndAPIKey}/Update`,
                    obj
                );
            }

            if (res) {
                console.log(res);
                const updatedData = {
                    ...cashFlowData,
                    [objAndAPIKey]: res,
                };
                setCashFlowData(updatedData);
            }

            openNotificationSuccess(
                "success",
                "topRight",
                "Success Notification",
                'Data of "' + props.modalObject.title + '" is Saved'
            );

            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);
            openNotificationSuccess(
                "error",
                "topRight",
                "Error Notification",
                'Data of "' +
                props.modalObject.title +
                '" is not Saved Please! try again'
            );
        }
    };


    let handleInnerModal = (title, values, key, stakeHolder) => {
        console.log(title, values, key, stakeHolder);
        setModalObject({
            title,
            values,
            key,
            stakeHolder,
            DiscoveryObj: superAnnuationIssues,
        });
        setFlagState(true);
    };


    const options =
        UserStatus !== "Single"
            ? [
                { value: "client", label: RenderName("client") },
                { value: "partner", label: RenderName("partner") },
            ]
            : [{ value: "client", label: RenderName("client") }];

    let riskProfileOptions = [
        { value: "Conservative", label: "Conservative" },
        { value: "Moderately Conservative", label: "Moderately Conservative" },
        { value: "Balanced", label: "Balanced" },
        { value: "Growth", label: "Growth" },
        { value: "High Growth", label: "High Growth" },
        { value: "International Shares", label: "International Shares" },
        { value: "Property", label: "Property" },
        { value: "Australian Fixed Interest", label: "Australian Fixed Interest" },
        { value: "International Fixed Interest", label: "International Fixed Interest" },
        { value: "Other", label: "Other" },
        { value: "Australian Shares", label: "Australian Shares" },
    ]

    let InvestmentReturnsOptions = [
        { value: "system", label: "System" },
        { value: "input Override", label: "Input Override" },
    ]

    const [rowConfig, setRowConfig] = useState(() => {
        let OriginalArray = [
            {
                name: "balanceComponents",
                type: "number-toComma-Modal",
                placeholder: "Balance & Components",
                callBack: true,
                innerModalTitle: "Balance & Components",
                key: "balanceComponents",
                func: handleInnerModal,
            },
            {
                name: "riskProfile",
                type: "select",
                options: riskProfileOptions,

            },
            {
                name: "investmentReturns",
                type: "selectModal",
                placeholder: "Investment Returns",
                options: InvestmentReturnsOptions,
                ModalOption: "input Override",
                innerModalTitle: "Input Override",
                key: "investmentReturns",
            },
            {
                name: "investmentFees",
                type: "number-toPercent",
                placeholder: "Investment Fees %",
            },
            {
                name: "adviserServiceFee",
                type: "number-toComma",
                placeholder: "Adviser Service Fee",
            },
            {
                name: "insurancePremiums",
                type: "yesnoModal",
                placeholder: "Insurance Premiums",
                callBack: true,
                key: "insurancePremiums",
                innerModalTitle: "Insurance Premiums",
                func: handleInnerModal,
            },
            {
                name: "rolloverFunds",
                type: "yesnoModal",
                placeholder: "Rollover Funds",
                callBack: true,
                key: "rolloverFunds",
                innerModalTitle: "Rollover Funds",
                func: handleInnerModal,
            },
            {
                name: "concessionalContributions",
                type: "yesnoModal",
                placeholder: "Concessional Contributions",
                callBack: true,
                key: "concessionalContributions",
                innerModalTitle: "Concessional Contributions",
                func: handleInnerModal,
            },
            {
                name: "nonConcessionalContributions",
                type: "yesnoModal",
                placeholder: "Non Concessional Contributions",
                callBack: true,
                key: "nonConcessionalContributions",
                innerModalTitle: "Non Concessional Contributions",
                func: handleInnerModal,
            },
            {
                name: "withdrawals",
                type: "yesnoModal",
                placeholder: "Withdrawals",
                callBack: true,
                key: "withdrawals",
                innerModalTitle: "Withdrawals",
                func: handleInnerModal,
            },
        ];

        return OriginalArray;
    });

    const componentMapping = {
        "Balance & Components": <BalanceComponents />,
        "Input Override": <InputOverride />,
        "Insurance Premiums": <InsurancePremiums />,
        "Rollover Funds": <RolloverFunds />,
        "Concessional Contributions": <ConcessionalContributions />,
        "Non Concessional Contributions": <NonConcessionalContributions />,
        "Withdrawals": <Withdrawals />,
    }

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
            {({ values, setFieldValue, handleChange, handleBlur }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                return (
                    <Form>
                        <Row>
                            <InnerModal
                                modalObject={modalObject}
                                setFieldValue={setFieldValue}
                                setFlagState={setFlagState}
                                flagState={flagState}
                            >
                                {ModalContent(modalObject)}
                            </InnerModal>

                            <div className="col-md-12">
                                <div className="d-flex justify-content-center align-items-center gap-4">
                                    <label htmlFor="" className="text-end ">
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
                            {values.owner.length > 0 && (
                                <div className="mt-4">
                                    <Table striped bordered responsive hover>
                                        <thead>
                                            <tr>
                                                <th
                                                    onClick={() => {
                                                        console.log(values);
                                                    }}
                                                >
                                                    Owner
                                                </th>
                                                <th>Balance & Components</th>
                                                <th>Risk Profile</th>
                                                <th>Investment Returns</th>
                                                <th>Investment Fees %</th>
                                                <th>Adviser Service Fee ($)</th>
                                                <th>Insurance Premiums</th>
                                                <th>Rollover Funds</th>
                                                <th>Concessional Contributions</th>
                                                <th>Non Concessional Contributions</th>
                                                <th>Withdrawals</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {values.owner.includes("client") && (
                                                <DynamicTableRow
                                                    rowConfig={rowConfig}
                                                    values={values}
                                                    setFieldValue={setFieldValue}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    handleInnerModal={handleInnerModal}
                                                    stakeHolder="client."
                                                />
                                            )}

                                            {values.owner.includes("partner") &&
                                                UserStatus === "Married" && (
                                                    <DynamicTableRow
                                                        rowConfig={rowConfig}
                                                        values={values}
                                                        setFieldValue={setFieldValue}
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        handleInnerModal={handleInnerModal}
                                                        stakeHolder="partner."
                                                    />
                                                )}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default CFSuperFund;
