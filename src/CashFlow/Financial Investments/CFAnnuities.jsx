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
import RCV from "./RCV";
import DeductibleAmount from "./DeductibleAmount";

const CFAnnuities = (props) => {

    let questionDetail = useRecoilValue(QuestionDetail);
    let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
    let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

    let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

    let [UserStatus] = useState(localStorage.getItem("UserStatus"));
    let DefaultUrl = useRecoilValue(defaultUrl);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let annuitiesIssues = Object.keys(questionDetail.annuitiesIssues|| {}).length > 0 ? questionDetail.annuitiesIssues : {
        client: [],
        partner: [],
        joint: [],
    };  // Use an empty object as default if incomeFromOverseasPension is undefined

    let initialValues = {
        owner: [],
    };

    const fillInitialValues = (setFieldValue) => {
        try {
            // Set the object and API key
            setObjAndAPIKey(props.modalObject.key);

            // console.log(annuitiesIssues, "Discovery Form Data " + props.modalObject.key + " and SourceKey " + props.modalObject.sourceKey, annuitiesIssues.client);
            // console.log(cashFlowData?.[objAndAPIKey].client.investmentFees, "cashFlowData Form Data");
            // console.log(CashFlowScenarioDataObj, "CashFlowScenarioDataObj Form Data");

            const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

            // Helper function to update field values
            const updateFields = (data, prefix) => {

                if (!data || !Object.keys(data).length) return;

                const fields = {
                    originalInvestmentAmount: data.originalInvestmentAmount || "",
                    sourceOfFunds: data.sourceOfFunds || "",
                    annuityType: data.annuityType || "",
                    IsThisReversionaryAnnuity: data.IsThisReversionaryAnnuity || "No",
                    RCV: data.RCV || "No",
                    RCVObj: data.RCVObj || {},
                    includeFromYear: data.includeFromYear || "1",
                    term: data.term || 30,
                    yearsUntilMaturity: data.yearsUntilMaturity || "30",
                    annualInflationRate: data.annualInflationRate || "",
                    annualPayment: data.annualPayment || "",
                    deductibleAmount: data.deductibleAmount || "No",
                    deductibleAmountObj: data.deductibleAmountObj || {},
                };

                Object.entries(fields).forEach(([key, value]) => {
                    setFieldValue(`${prefix}.${key}`, value);
                });
            };

            // Update owner field
            if (scenarioObj?.selectedSource === "discoveryForm" && annuitiesIssues && annuitiesIssues._id) {

                // Update client-related fields
                if (annuitiesIssues?.client.length > 0) {

                    let Obj = {
                        originalInvestmentAmount: toCommaAndDollar(annuitiesIssues.client.reduce((total, entry) => total + parseFloat((entry.originalInvestmentAmount).replace(/[^0-9.-]+/g, "")), 0)),
                        sourceOfFunds: annuitiesIssues.client[0].sourceFunds,
                        annuityType: annuitiesIssues.client[0].annuityType,
                        includeFromYear: annuitiesIssues.client[0].yearsMaturity,
                        term: annuitiesIssues.client[0].term,
                        annualPayment: toCommaAndDollar(annuitiesIssues.client.reduce((total, entry) => total + parseFloat((entry.annualAnnuityPayment).replace(/[^0-9.-]+/g, "")), 0)),
                        RCVObj: {
                            RCV: annuitiesIssues.client[0].returnCapitalValue || "",
                        }
                    }

                    updateFields(Obj, "client");
                }

                // Update partner-related fields
                if (
                    UserStatus === "Married" &&
                    annuitiesIssues?.partner &&
                    annuitiesIssues.partner.length > 0
                ) {

                    let Obj = {
                        originalInvestmentAmount: toCommaAndDollar(annuitiesIssues.partner.reduce((total, entry) => total + parseFloat((entry.originalInvestmentAmount).replace(/[^0-9.-]+/g, "")), 0)),
                        sourceOfFunds: annuitiesIssues.partner[0].sourceFunds,
                        annuityType: annuitiesIssues.partner[0].annuityType,
                        includeFromYear: annuitiesIssues.partner[0].yearsMaturity,
                        term: annuitiesIssues.partner[0].term,
                        annualAnnuityPayment: toCommaAndDollar(annuitiesIssues.partner.reduce((total, entry) => total + parseFloat((entry.annualAnnuityPayment).replace(/[^0-9.-]+/g, "")), 0)),
                        RCVObj: {
                            RCV: annuitiesIssues.partner[0].returnCapitalValue || "",
                        }
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
            obj.clientTotal = values.client.annualPayment || "$0";
        }
        else {
            obj.clientTotal = ""
            obj.client = {}
        }

        if (values.owner.includes("partner")) {
            obj.partnerTotal = values.partner.annualPayment || "$0";
        }
        else {
            obj.partnerTotal = ""
            obj.partner = {}
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

    const options =
        UserStatus !== "Single"
            ? [
                { value: "client", label: RenderName("client") },
                { value: "partner", label: RenderName("partner") }
            ]
            : [{ value: "client", label: RenderName("client") }];

    let sourceOfFundsOptions = [
        { value: "Ordinary", label: "Ordinary" },
        { value: "Super", label: "Super" },
    ]
    let annuityTypeOptions = [
        { value: "Short-Term", label: "Short-Term" },
        { value: "Long-Term", label: "Long-Term" },
        { value: "Life-Time", label: "Life-Time" }
    ]

    const indexation = Array.from({ length: 21 }, (_, i) => ({
        value: (i * 0.5).toFixed(2) + "%",
        label: (i * 0.5).toFixed(2) + "%",
    }));

    const yearsIncludedArray = Array.from({ length: 30 }, (_, i) => {
        return ({
            value: (i + 1).toString(),
            label: ("Year " + (i + 1)).toString(),
        })
    });

    const [rowConfig, setRowConfig] = useState(() => {
        let OriginalArray = [
            {
                name: "originalInvestmentAmount",
                type: "number-toComma",
                placeholder: "Original Investment Amount",
            },
            {
                name: "sourceOfFunds",
                type: "select",
                options: sourceOfFundsOptions,
            },
            {
                name: "annuityType",
                type: "select",
                options: annuityTypeOptions,

            },
            {
                name: "IsThisReversionaryAnnuity",
                type: "yesno",
                placeholder: "Is this a Reversionary Annuity",
            },
            {
                name: "RCV",
                type: "yesnoModal",
                placeholder: "RCV",
                callBack: true,
                key: "RCV",
                innerModalTitle: "RCV",
                func: handleInnerModal,
            },
            {
                name: "includeFromYear",
                type: "select",
                options: yearsIncludedArray,
                placeholder: "Include From Year",
            },
            {
                name: "term",
                type: "select",
                options: yearsIncludedArray,
                placeholder: "Term",
            },
            {
                name: "yearsUntilMaturity",
                type: "select",
                options: yearsIncludedArray,
                placeholder: "Years Until Maturity",
            },
            {
                name: "annualInflationRate",
                type: "select",
                options: indexation,
                placeholder: "Annual Inflation Rate",
            },
            {
                name: "annualPayment",
                type: "number-toComma",
                placeholder: "Annual Payment",
            },
            {
                name: "deductibleAmount",
                type: "yesnoModal",
                placeholder: "Deductible Amount",
                callBack: true,
                key: "deductibleAmount",
                innerModalTitle: "Deductible Amount",
                func: handleInnerModal,
            },
        ];

        return OriginalArray;
    });

    const componentMapping = {

        "Input Override": <InputOverride />,
        "Regular Contributions": <RegularContributions />,
        "RCV": <RCV />,
        "Deductible Amount": <DeductibleAmount />,

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
                                                <th>Original Investment Amount</th>
                                                <th>Source of Funds</th>
                                                <th>Annuity Type</th>
                                                <th>Is this a Reversionary Annuity</th>
                                                <th>RCV</th>
                                                <th>Include From Year</th>
                                                <th>Term</th>
                                                <th>Years Until Maturity</th>
                                                <th>Annual Inflation Rate</th>
                                                <th>Annual Payment</th>
                                                <th>Deductible Amount</th>
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

export default CFAnnuities;
