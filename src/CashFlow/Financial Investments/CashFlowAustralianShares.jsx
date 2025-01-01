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
import RegularContributions from "./RegularContributions";

const CashFlowAustralianShares = (props) => {

    /*
       This component is a dynamic and reusable modal component designed to handle the following modal types:
       1. "Australian Shares"
       2. "Platform Investment"
       3. "Other Investments"
       4. "SMSF Australian Shares"
       s. "SMSF Platform Investment"
   
       TODO-IMPORTANT:
       - Ensure any changes to this component are planned carefully to avoid unintended effects on all supported modals.
       - If specific modifications are required for one modal type, consider implementing targeted logic or extensions 
         to maintain the integrity of the shared functionality.
   */

    let questionDetail = useRecoilValue(QuestionDetail);
    let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
    let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

    let [UserStatus] = useState(localStorage.getItem("UserStatus"));
    let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

    let DefaultUrl = useRecoilValue(defaultUrl);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let layoutSwitchArray = ["Platform Investment", "Other Investments", "SMSF Platform Investment", "SMSF Australian Shares", "Family Trust Australian Shares", "Family Trust Platform Investment", "Family Trust"];

    let [layoutSwitchFlag, setLayoutSwitchFlag] = useState(() => {
        if (layoutSwitchArray.includes(props.modalObject.title)) {
            return true
        }
        return false
    })


    let layoutSwitchSMSFArray = ["SMSF Platform Investment", "SMSF Australian Shares", "SMSF", "Family Trust Australian Shares", "Family Trust Platform Investment", "Family Trust"];

    let [layoutSwitchSMSFFlag, setLayoutSwitchSMSFFlag] = useState(() => {
        if (layoutSwitchSMSFArray.includes(props.modalObject.title)) {
            return true
        }
        return false
    })

    let BankAccountFinance = Object.keys(questionDetail[props.modalObject.sourceKey] || {}).length > 0 ? questionDetail[props.modalObject.sourceKey] : {
        client: [],
        joint: [],
        partner: [],
    }; // Use an empty object as default if BankAccountFinance is undefined

    let initialValues = {
        owner: [],
        client: {
            riskProfile: layoutSwitchArray.includes(props.modalObject.title) ? "" : "Australian Shares",
            cashOutFunds: "No",
        },
        partner: {
            riskProfile: layoutSwitchArray.includes(props.modalObject.title) ? "" : "Australian Shares",
            cashOutFunds: "No",
        },
        joint: {
            riskProfile: layoutSwitchArray.includes(props.modalObject.title) ? "" : "Australian Shares",
            cashOutFunds: "No",
        }
    };

    const fillInitialValues = (setFieldValue) => {
        try {
            // Set the object and API key
            setObjAndAPIKey(props.modalObject.key);

            // console.log(BankAccountFinance, "Discovery Form Data " + props.modalObject.key + " and SourceKey " + props.modalObject.sourceKey, BankAccountFinance.client);

            console.log(cashFlowData?.[objAndAPIKey].client.investmentFees, "cashFlowData Form Data");
            // console.log(CashFlowScenarioDataObj, "CashFlowScenarioDataObj Form Data");

            const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

            // Helper function to update field values
            const updateFields = (data, prefix) => {

                if (!data || !Object.keys(data).length) return;

                const fields = {
                    currentBalance: data.currentBalance || "$0",
                    costBase: data.costBase || "$0",
                    investmentReturns: data.investmentReturns || "",
                    investmentReturnsObj: data.investmentReturnsObj || {},
                    reinvestIncome: data.reinvestIncome || "No",
                    regularContributions: data.regularContributions || "No",
                    regularContributionsObj: data.regularContributionsObj || {},
                    riskProfile: data.riskProfile || layoutSwitchArray.includes(props.modalObject.title) ? "" : "Australian Shares",
                    cashOutFunds: data.cashOutFunds || "No",
                };

                if (layoutSwitchArray.includes(props.modalObject.title)) {
                    fields.investmentFees = data.investmentFees || "2.50%"
                }

                Object.entries(fields).forEach(([key, value]) => {
                    setFieldValue(`${prefix}.${key}`, value);
                });
            };

            // Update owner field
            if (scenarioObj?.selectedSource === "discoveryForm" && BankAccountFinance && BankAccountFinance._id) {
                // setFieldValue(`owner`, BankAccountFinance.owner || "");

                // Update client-related fields
                if (BankAccountFinance?.client.length > 0) {
                    // let Obj = {
                    //     currentBalance: toCommaAndDollar(BankAccountFinance.client.reduce((total, entry) => total + parseFloat((entry.currentBalance || entry.clientCurrentBalance).replace(/[^0-9.-]+/g, "")), 0)),
                    //     costBase: toCommaAndDollar(BankAccountFinance.client.reduce((total, entry) => total + parseFloat((entry.costBase || entry.clientCostBaseTemp).replace(/[^0-9.-]+/g, "")), 0)),
                    // }
                    let Obj = {
                        currentBalance: BankAccountFinance.clientCurrentBalance,
                        costBase: BankAccountFinance.clientCostBaseTemp,
                    }
                    updateFields(Obj, "client");
                }

                // Update partner-related fields
                if (UserStatus === "Married" && BankAccountFinance?.partner.length > 0) {
                    // let Obj = {
                    //     currentBalance: toCommaAndDollar(BankAccountFinance.partner.reduce((total, entry) => total + parseFloat((entry.currentBalance).replace(/[^0-9.-]+/g, "")), 0)),
                    //     costBase: toCommaAndDollar(BankAccountFinance.partner.reduce((total, entry) => total + parseFloat((entry.costBase).replace(/[^0-9.-]+/g, "")), 0)),
                    // }
                    let Obj = {
                        currentBalance: BankAccountFinance.partnerCurrentBalance,
                        costBase: BankAccountFinance.partnerCostBaseTemp,
                    }
                    updateFields(Obj, "partner");
                }

                // Update partner-related fields
                if (UserStatus === "Married" && BankAccountFinance?.joint.length > 0) {
                    // let Obj = {
                    //     currentBalance: toCommaAndDollar(BankAccountFinance.joint.reduce((total, entry) => total + parseFloat((entry.currentBalance).replace(/[^0-9.-]+/g, "")), 0)),
                    //     costBase: toCommaAndDollar(BankAccountFinance.joint.reduce((total, entry) => total + parseFloat((entry.costBase).replace(/[^0-9.-]+/g, "")), 0)),
                    // }
                    let Obj = {
                        currentBalance: BankAccountFinance.jointCurrentBalance,
                        costBase: BankAccountFinance.jointCostBaseTemp,
                    }
                    updateFields(Obj, "joint");
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

                    if (UserStatus === "Married" && cashFlowDetails.owner.includes("joint")) {
                        // Update partner details
                        updateFields(cashFlowDetails.joint, "joint");
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

                if (UserStatus === "Married" && cashFlowDataDetails.owner.includes("joint")) {
                    // Update partner details
                    updateFields(cashFlowDataDetails.joint, "joint");
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

        let JointCurrentBalance = 0

        if (values.owner.includes("joint") && layoutSwitchSMSFFlag === false) {
            JointCurrentBalance = parseFloat(values.joint.currentBalance.replace(/[^0-9.-]+/g, ""))
        }

        if (values.owner.includes("client")) {
            obj.clientTotal = toCommaAndDollar(parseFloat(values.client.currentBalance.replace(/[^0-9.-]+/g, "")) + (JointCurrentBalance / 2)) || "$0";
        }
        else {
            obj.clientTotal = ""
        }

        if (values.owner.includes("partner")) {
            obj.partnerTotal = toCommaAndDollar(parseFloat(values.partner.currentBalance.replace(/[^0-9.-]+/g, "")) + (JointCurrentBalance / 2)) || "$0";
        }
        else {
            obj.partnerTotal = ""
        }

        if (layoutSwitchSMSFFlag) {
            obj.jointTotal = undefined;
            obj.joint = undefined;
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
            stakeHolder
        });
        setFlagState(true);
    };

    const loanTermOptions = Array.from({ length: 31 }, (_, i) => {
        if (i === 0) {
            return ({
                value: "No",
                label: "No",
            })
        }
        else {
            return ({
                value: (i).toString(),
                label: ("Year " + (i)).toString(),
            })
        }
    });

    const options =
        UserStatus !== "Single"
            ?
            layoutSwitchSMSFFlag ?
                [
                    { value: "client", label: RenderName("client") },
                    { value: "partner", label: RenderName("partner") },
                ] :
                [
                    { value: "client", label: RenderName("client") },
                    { value: "partner", label: RenderName("partner") },
                    { value: "joint", label: RenderName("joint") },
                ]
            : [{ value: "client", label: RenderName("client") }];



    let investmentReturnsOptions = [
        { value: "system", label: "System" },
        { value: "input Override", label: "Input Override" },
    ]

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

    const [rowConfig, setRowConfig] = useState(() => {
        let OriginalArray = [
            {
                name: "currentBalance",
                type: "number-toComma",
                placeholder: layoutSwitchSMSFFlag ?
                    (props.modalObject.title === "SMSF" || props.modalObject.title === "Family Trust") ?
                        "Current Balance"
                        :
                        "Opening Balance"
                    :
                    "Current Balance",
            },
            {
                name: "costBase",
                type: "number-toComma",
                placeholder: "Cost Base",
            },
            {
                name: "investmentReturns",
                type: "selectModal",
                placeholder: "Investment Returns",
                options: investmentReturnsOptions,
                ModalOption: "input Override",
                innerModalTitle: "Input Override",
                key: "investmentReturns",
            },
            {
                name: "reinvestIncome",
                type: "yesno",
                placeholder: "Reinvest income",

            },
            {
                name: "regularContributions",
                type: "yesnoModal",
                placeholder: "Regular Contributions",
                callBack: true,
                key: "regularContributions",
                innerModalTitle: "Regular Contributions",
                func: handleInnerModal,
            },
            {
                name: "riskProfile",
                type: "select",
                placeholder: "Risk Profile",
                options: riskProfileOptions,
            },
            {
                name: "cashOutFunds",
                type: "select",
                placeholder: "Cashout Funds",
                options: loanTermOptions,
            },
        ];

        if (layoutSwitchArray.includes(props.modalObject.title)) {
            // Create the new object
            const newObject = {
                name: "investmentFees",
                type: "number-toPercent",
                placeholder: "Investment Fees",
            };

            // Find the index of the "cashOutFunds" object
            const cashOutFundsIndex = OriginalArray.findIndex(
                (item) => item.name === "cashOutFunds"
            );

            // Insert the new object before "cashOutFunds"
            if (cashOutFundsIndex !== -1) {
                OriginalArray.splice(cashOutFundsIndex, 0, newObject);
            }
        }

        return OriginalArray;
    });

    const componentMapping = {

        "Input Override": <InputOverride />,
        "Regular Contributions": <RegularContributions />,

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
                                                <th>
                                                    {layoutSwitchSMSFFlag ?
                                                        (props.modalObject.title === "SMSF" || props.modalObject.title === "Family Trust") ?
                                                            "Current Balance"
                                                            :
                                                            "Opening Balance"
                                                        :
                                                        "Current Balance"
                                                    }
                                                </th>
                                                <th>Cost Base</th>
                                                <th>Investment Returns</th>
                                                <th>Reinvest income</th>
                                                <th>Regular Contributions</th>
                                                <th>Risk Profile/SAA</th>
                                                {layoutSwitchFlag &&
                                                    <th>
                                                        Investment Fees
                                                    </th>
                                                }
                                                <th>Cashout Funds</th>

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

                                            {values.owner.includes("joint") &&
                                                UserStatus === "Married" && (
                                                    <DynamicTableRow
                                                        rowConfig={rowConfig}
                                                        values={values}
                                                        setFieldValue={setFieldValue}
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        handleInnerModal={handleInnerModal}
                                                        stakeHolder="joint."
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

export default CashFlowAustralianShares;
