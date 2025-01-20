import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CreatableMultiSelectField } from "../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Row, Table } from "react-bootstrap";
import { CashFlowData, CashFlowScenarioData, defaultUrl, QuestionDetail } from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import {

    openNotificationSuccess,
    PatchAxios,
    PostAxios,
    RenderName,
} from "../../Components/Assets/Api/Api";

const FamilyTrustBankAccount = (props) => {

    let questionDetail = useRecoilValue(QuestionDetail);
    let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
    let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

    let [UserStatus] = useState(localStorage.getItem("UserStatus"));
    let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

    let DefaultUrl = useRecoilValue(defaultUrl);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let [layoutSwitchFlag, setLayoutSwitchFlag] = useState(props.modalObject.title)


    let familyBank = Object.keys(questionDetail[props.modalObject.sourceKey] || {}).length > 0 ? questionDetail[props.modalObject.sourceKey] : {
        client: [],
        joint: [],
        partner: [],
    }; // Use an empty object as default if familyBank is undefined



    let initialValues = {
        owner: [],
    };

    const fillInitialValues = (setFieldValue) => {
        try {
            setObjAndAPIKey(props.modalObject.key);

            const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

            const updateFields = (data, prefix) => {
                if (!data || !Object.keys(data).length) return;

                const fields = {
                    openingCashAtBank: data.openingCashAtBank || "",
                    investmentReturns: data.investmentReturns || "System",
                    incomeYield: data.incomeYield || "",
                    accountingFees: data.accountingFees || "",
                    adviserFees: data.adviserFees || "",
                    indexationFundFees: data.indexationFundFees || "2.50%",
                };

                Object.entries(fields).forEach(([key, value]) => {
                    setFieldValue(`${prefix}.${key}`, value);
                });
            };
            if (scenarioObj?.selectedSource === "discoveryForm") {
                // Update client-related fields
                if (familyBank?.client?.length > 0) {
                    const Obj = {
                        openingCashAtBank: familyBank.clientCurrentBalance || "", // Fallback to an empty string if undefined
                    };
                    updateFields(Obj, "client");
                } else {
                    console.warn("No client data available in familyBank.");
                }

                // Update partner-related fields
                if (UserStatus === "Married" && familyBank?.partner?.length > 0) {
                    const Obj = {
                        openingCashAtBank: familyBank.partnerCurrentBalance || "", // Fallback to an empty string if undefined
                    };
                    updateFields(Obj, "partner");
                } else if (UserStatus === "Married") {
                    console.warn("No partner data available in familyBank.");
                }
            } else {
                const cashFlowScenarioDetails = CashFlowScenarioDataObj?.[objAndAPIKey];

                if (cashFlowScenarioDetails) {
                    // Update owner field
                    setFieldValue("owner", cashFlowScenarioDetails.owner || "");

                    // Update client-related fields
                    if (cashFlowScenarioDetails.owner?.includes("client")) {
                        updateFields(cashFlowScenarioDetails.client || {}, "client");
                    }

                    // Update partner-related fields
                    if (UserStatus === "Married" && cashFlowScenarioDetails.owner?.includes("partner")) {
                        updateFields(cashFlowScenarioDetails.partner || {}, "partner");
                    }
                } else {
                    console.warn("No cash flow scenario details found for the provided key.");
                }
            }


            if (cashFlowData?.[objAndAPIKey]?._id) {
                const cashFlowDataDetails = cashFlowData[objAndAPIKey];
                setFieldValue(`owner`, cashFlowDataDetails.owner || "");

                if (cashFlowDataDetails.owner.includes("client")) {
                    updateFields(cashFlowDataDetails.client, "client");
                }

                if (UserStatus === "Married" && cashFlowDataDetails.owner.includes("partner")) {
                    updateFields(cashFlowDataDetails.partner, "partner");
                }
            }

        } catch (error) {
            console.error("Error in fillInitialValues:", error);
        }
    };

    let onSubmit = async (values) => {

        console.log(JSON.stringify(values));

        let obj = values;
        obj.scenarioFK = (JSON.parse(localStorage.getItem("ScenarioObj")))._id;

        if (values.owner.includes("client")) {
            obj.clientTotal = values.client.openingCashAtBank || "$0";
        } else {
            obj.clientTotal = "";
        }

        if (values.owner.includes("partner")) {
            obj.partnerTotal = values.partner.openingCashAtBank || "$0";
        } else {
            obj.partnerTotal = "";
        }

        const bankAccountArray = cashFlowData?.[objAndAPIKey]?._id || "";

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
        setModalObject({
            title,
            values,
            key,
            stakeHolder,
            sourceObj: props.modalObject,
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

    const indexation = Array.from({ length: 21 }, (_, i) => ({
        value: (i * 0.5).toFixed(2) + "%",
        label: (i * 0.5).toFixed(2) + "%",
    }));

    const InvestmentReturnsOptions = [
        { value: "System", label: "System" },
        { value: "Input Override", label: "Input Override" },
    ]

    const [rowConfig, setRowConfig] = useState(() => {
        return [
            {
                name: "openingCashAtBank",
                type: "number-toComma",
                placeholder: "Opening Cash at Bank",
            },
            {
                name: "investmentReturns",
                type: "select",
                placeholder: "Investment Returns",
                options: InvestmentReturnsOptions,
            },
            {
                name: "incomeYield",
                type: "number-toPercent",
                placeholder: "Income Yield",
                disabled: true,
            },
            {
                name: "accountingFees",
                type: "number-toComma",
                placeholder: "Accounting & Auditing Fees",
            },
            {
                name: "adviserFees",
                type: "number-toComma",
                placeholder: "Adviser Service Fees",
            },
            {
                name: "indexationFundFees",
                type: "select",
                placeholder: "Indexation of Fund Fees",
                options: indexation,
            },
        ];
    });

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
                                {/* Modal content can be added here */}
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
                                                <th>Owner</th>
                                                <th>Opening Cash at Bank</th>
                                                <th>Investment Returns</th>
                                                <th>Income Yield</th>
                                                <th>Accounting & Auditing Fees</th>
                                                <th>Adviser Service Fees</th>
                                                <th>Indexation of Fund Fees</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {values.owner.includes("client") && (
                                                <DynamicTableRow
                                                    rowConfig={rowConfig.map((row) => {
                                                        if (row.name === "incomeYield") {
                                                            return {
                                                                ...row,
                                                                disabled: values?.client?.investmentReturns !== "Input Override",
                                                            };
                                                        }
                                                        return row;
                                                    })}
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
                                                        rowConfig={rowConfig.map((row) => {
                                                            if (row.name === "incomeYield") {
                                                                return {
                                                                    ...row,
                                                                    disabled: values?.partner?.investmentReturns !== "Input Override",
                                                                };
                                                            }
                                                            return row;
                                                        })}
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

export default FamilyTrustBankAccount;