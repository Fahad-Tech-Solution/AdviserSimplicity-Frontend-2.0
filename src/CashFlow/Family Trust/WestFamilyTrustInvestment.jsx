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
    toCommaAndDollar,
} from "../../Components/Assets/Api/Api";

const WestFamilyTrustInvestment = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
    let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

    let [UserStatus] = useState(localStorage.getItem("UserStatus"));
    let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

    let DefaultUrl = useRecoilValue(defaultUrl);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let initialValues = {
        owner: [],
        client: {
            percentOfBeneficiaryAccounts: "",
            totalOfBeneficiaryAccounts: "$0",
            distributionOfIncomeCGT: "",
            distributionTakenAsCash: "No",
            distributionTakenAsCashFromYear: "No",
        },
        partner: {
            percentOfBeneficiaryAccounts: "",
            totalOfBeneficiaryAccounts: "$0",
            distributionOfIncomeCGT: "",
            distributionTakenAsCash: "No",
            distributionTakenAsCashFromYear: "No",
        },

    };

    const fillInitialValues = (setFieldValue) => {
        try {
            setObjAndAPIKey(props.modalObject.key);

            const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

            const updateFields = (data, prefix) => {
                if (!data || !Object.keys(data).length) return;

                const fields = {
                    percentOfBeneficiaryAccounts: data.percentOfBeneficiaryAccounts || "",
                    totalOfBeneficiaryAccounts: data.totalOfBeneficiaryAccounts || "",
                    distributionOfIncomeCGT: data.distributionOfIncomeCGT || "No",
                    distributionTakenAsCash: data.distributionTakenAsCash || "No",
                    distributionTakenAsCashFromYear: data.distributionTakenAsCashFromYear || "No",
                };

                Object.entries(fields).forEach(([key, value]) => {
                    setFieldValue(`${prefix}.${key}`, value);
                });
            };

            if (scenarioObj?.selectedSource === "discoveryForm" && questionDetail && questionDetail._id) {
                if (questionDetail?.client.length > 0) {
                    let Obj = {
                        totalOfBeneficiaryAccounts: questionDetail.clienttotalOfBeneficiaryAccounts,
                    }
                    updateFields(Obj, "client");
                }

                if (UserStatus === "Married" && questionDetail?.partner.length > 0) {
                    let Obj = {
                        totalOfBeneficiaryAccounts: questionDetail.partnertotalOfBeneficiaryAccounts,
                    }
                    updateFields(Obj, "partner");
                }

            } else {
                const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
                if (cashFlowDetails) {
                    setFieldValue(`owner`, cashFlowDetails.owner || "");
                    if (cashFlowDetails.owner.includes("client")) {
                        updateFields(cashFlowDetails.client, "client");
                    }

                    if (UserStatus === "Married" && cashFlowDetails.owner.includes("partner")) {
                        updateFields(cashFlowDetails.partner, "partner");
                    }
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
        let obj = values

        obj.scenarioFK = (JSON.parse(localStorage.getItem("ScenarioObj")))._id;

        if (values.owner.includes("client")) {
            obj.clientTotal = values.client.percentOfBeneficiaryAccounts || "$0";
        } else {
            obj.clientTotal = ""
        }

        if (values.owner.includes("partner")) {
            obj.partnerTotal = values.partner.percentOfBeneficiaryAccounts || "$0";
        } else {
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

    const loanTermOptions = Array.from({ length: 31 }, (_, i) => {
        if (i === 0) {
            return ({
                value: "No",
                label: "No",
            })
        } else {
            return ({
                value: (i).toString(),
                label: ("Year " + (i)).toString(),
            })
        }
    });

    const options =
        UserStatus !== "Single"
            ? [
                { value: "client", label: RenderName("client") },
                { value: "partner", label: RenderName("partner") },
            ]
            : [{ value: "client", label: RenderName("client") }];

    const rowConfig = [
        {
            name: "percentOfBeneficiaryAccounts",
            type: "number-toPercent",
            placeholder: "% of Beneficiary Accounts",
        },
        {
            name: "totalOfBeneficiaryAccounts",
            type: "number-toComma",
            placeholder: "Total of Beneficiary Accounts",
            disabled: true
        },
        {
            name: "distributionOfIncomeCGT",
            type: "yesno",
            placeholder: "Distribution of Income/CGT",
        },
        {
            name: "distributionTakenAsCash",
            type: "yesno",
            placeholder: "Distribution Taken as Cash",
        },
        {
            name: "distributionTakenAsCashFromYear",
            type: "select",
            placeholder: "Distribution Taken as Cash From Year",
            options: loanTermOptions,
        },
    ];

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
                                                <th>% of Beneficiary Accounts</th>
                                                <th>Total of Beneficiary Accounts</th>
                                                <th>Distribution of Income/CGT</th>
                                                <th>Distribution Taken as Cash</th>
                                                <th>Distribution Taken as Cash From Year</th>
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

export default WestFamilyTrustInvestment;