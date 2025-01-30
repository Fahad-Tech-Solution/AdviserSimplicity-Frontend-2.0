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
import Withdrawals from "./Withdrawals";
import BalanceRolloverAmount from "./BalanceRolloverAmount";
import NewPensionRollover from "./NewPensionRollover";
import PensionPayments from "./PensionPayments";

const CFAccountBasedPension = (props) => {

    let questionDetail = useRecoilValue(QuestionDetail);
    let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
    let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

    let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

    let [UserStatus] = useState(localStorage.getItem("UserStatus"));
    let DefaultUrl = useRecoilValue(defaultUrl);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let accountBasedPensionIssues = Object.keys(questionDetail.accountBasedPensionIssues || {}).length > 0 ? questionDetail.accountBasedPensionIssues : {
        client: [],
        partner: [],
        joint: [],

    };  // Use an empty object as default if accountBasedPensionIssues is undefined

    let initialValues = {
        owner: [],
    };

    const fillInitialValues = (setFieldValue) => {
        try {
            // Set the object and API key
            setObjAndAPIKey(props.modalObject.key);

            console.log(accountBasedPensionIssues, "Discovery Form Data " + props.modalObject.key + " and SourceKey " + props.modalObject.sourceKey, accountBasedPensionIssues.client);
            // console.log(cashFlowData?.[objAndAPIKey].client.investmentFees, "cashFlowData Form Data");
            // console.log(CashFlowScenarioDataObj, "CashFlowScenarioDataObj Form Data");

            const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

            // Helper function to update field values
            const updateFields = (data, prefix) => {

                if (!data || !Object.keys(data).length) return;

                const fields = {
                    balanceRolloverAmount: data.balanceRolloverAmount || "",
                    balanceRolloverAmountObj: data.balanceRolloverAmountObj || {},
                    yearToCommence: data.yearToCommence || "",
                    riskProfile: data.riskProfile || "",
                    investmentReturns: data.investmentReturns || "",
                    investmentReturnsObj: data.investmentReturnsObj || {},
                    investmentFees: data.investmentFees || "",
                    adviserServiceFee: data.adviserServiceFee || "",
                    pensionPayments: data.pensionPayments || "",
                    pensionPaymentsObj: data.pensionPaymentsObj || {},
                    newPensionRollover: data.newPensionRollover || "No",
                    newPensionRolloverObj: data.newPensionRolloverObj || {},
                    withdrawals: data.withdrawals || "No",
                    withdrawalsObj: data.withdrawalsObj || {},
                };

                Object.entries(fields).forEach(([key, value]) => {
                    setFieldValue(`${prefix}.${key}`, value);
                });
            };

            // Update owner field
            if (scenarioObj?.selectedSource === "discoveryForm" && accountBasedPensionIssues && accountBasedPensionIssues._id) {

                // Update client-related fields
                if (accountBasedPensionIssues?.client.length > 0) {

                    let Obj = {};
                    if (accountBasedPensionIssues?.client?.length > 0) {
                        Obj = {
                            balanceRolloverAmount: accountBasedPensionIssues.clientCurrentBalance,
                            balanceRolloverAmountObj: {
                                pensionType: accountBasedPensionIssues?.client[0]?.balanceBenefitDetailsArray[0]?.fundType || "",
                                taxFreeComponent: accountBasedPensionIssues?.client[0]?.balanceBenefitDetailsArray[0]?.taxFreeComponent || "",
                            },
                            balanceBenefitDetails: toCommaAndDollar(accountBasedPensionIssues.client.reduce((total, entry) => total + parseFloat((entry.balanceBenefitDetails).replace(/[^0-9.-]+/g, "")), 0)),
                            annuityType: accountBasedPensionIssues.client[0].annuityType,
                            includeFromYear: accountBasedPensionIssues.client[0].yearsMaturity,
                            term: accountBasedPensionIssues.client[0].term,
                            // annualPayment: toCommaAndDollar(accountBasedPensionIssues.client.reduce((total, entry) => total + parseFloat((entry.annualAnnuityPayment).replace(/[^0-9.-]+/g, "")), 0)),
                        };
                    }


                    console.log("Obj", Obj)

                    updateFields(Obj, "client");
                }

                // Update partner-related fields
                if (
                    UserStatus === "Married" &&
                    accountBasedPensionIssues?.partner &&
                    accountBasedPensionIssues.partner.length > 0
                ) {

                    let Obj = {
                        balanceRolloverAmount: accountBasedPensionIssues.partnerCurrentBalance,
                        balanceBenefitDetails: toCommaAndDollar(accountBasedPensionIssues.partner.reduce((total, entry) => total + parseFloat((entry.balanceBenefitDetails).replace(/[^0-9.-]+/g, "")), 0)),
                        annuityType: accountBasedPensionIssues.partner[0].annuityType,
                        includeFromYear: accountBasedPensionIssues.partner[0].yearsMaturity,
                        term: accountBasedPensionIssues.partner[0].term,
                        // annualPayment: toCommaAndDollar(accountBasedPensionIssues.partner.reduce((total, entry) => total + parseFloat((entry.annualAnnuityPayment).replace(/[^0-9.-]+/g, "")), 0)),
                    };

                    console.log("Obj", Obj);

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
        // console.log(title, values, key);
        setModalObject({
            title,
            values,
            key,
            stakeHolder,
            sourceObj: props.modalObject,
            cal: title !== "Withdrawals" && title !== "Input Override",
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
        { value: "Cash", label: "Cash" },
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
                name: "balanceRolloverAmount",
                type: "number-toComma-Modal",
                placeholder: "Balance & Rollover Amount",
                callBack: true,
                innerModalTitle: "Balance & Rollover Amount",
                key: "balanceRolloverAmount",
                func: handleInnerModal,
                disabled: true,
            },
            {
                name: "yearToCommence",
                type: "select",
                options: riskProfileOptions,
                placeholder: "Year To Commence",
                // disabled: true,
            },
            {
                name: "riskProfile",
                type: "select",
                options: riskProfileOptions,
                placeholder: "Year to Commence",

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
                placeholder: "Adviser Service Fee ($)",
            },
            {
                name: "pensionPayments",
                type: "number-toComma-Modal",
                placeholder: "Pension Payments",
                callBack: true,
                innerModalTitle: "Pension Payments",
                key: "pensionPayments",
                func: handleInnerModal,
            },
            {
                name: "newPensionRollover",
                type: "yesnoModal",
                placeholder: "New Pension Rollover",
                callBack: true,
                key: "newPensionRollover",
                innerModalTitle: "New Pension Rollover",
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

        "Input Override": <InputOverride />,
        "Balance & Rollover Amount": <BalanceRolloverAmount />,
        "Withdrawals": <Withdrawals />,
        "New Pension Rollover": <NewPensionRollover />,
        "Pension Payments": <PensionPayments />

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
                                                <th>Balance & Rollover Amount</th>
                                                <th>Year to Commence</th>
                                                <th>Risk Profile</th>
                                                <th>Investment Returns</th>
                                                <th>Investment Fees %</th>
                                                <th>Adviser Service Fee ($)</th>
                                                <th>Pension  Payments</th>
                                                <th>New Pension Rollover</th>
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

export default CFAccountBasedPension;
