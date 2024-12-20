import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CreatableMultiSelectField } from "../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Row, Table } from "react-bootstrap";
import { CashFlowData, CashFlowScenarioData, defaultUrl, QuestionDetail } from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
// import AccumulationDetails from "./AccumulationDetails";
// import InsurancePremiums from "./InsurancePremiums";

import {
    openNotificationSuccess,
    PatchAxios,
    PostAxios,
    RenderName,
} from "../../Components/Assets/Api/Api";
import ConcessionalContributions from "../Financial Investments/ConcessionalContributions";
import NonConcessionalContributions from "../Financial Investments/NonConcessionalContributions";
import Withdrawals from "../Financial Investments/Withdrawals";
import CFSMSFAccumulationDetails from "./CFSMSFAccumulationDetails";
import CFSMSFInsurancePremiums from "./CFSMSFInsurancePremiums";

const SMSFAccumulationDetails = (props) => {

    let questionDetail = useRecoilValue(QuestionDetail);
    let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
    let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

    let [UserStatus] = useState(localStorage.getItem("UserStatus"));
    let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

    let DefaultUrl = useRecoilValue(defaultUrl);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let [layoutSwitchFlag, setLayoutSwitchFlag] = useState(props.modalObject.title)

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
                    accumulationDetails: data.accumulationDetails || "$0",
                    insurancePremiums: data.insurancePremiums || "$0",
                    concessionalContributions: data.concessionalContributions || "$0",
                    nonConcessionalContributions: data.nonConcessionalContributions || "$0",
                    withdrawals: data.withdrawals || "$0",
                };

                Object.entries(fields).forEach(([key, value]) => {
                    setFieldValue(`${prefix}.${key}`, value);
                });
            };

            if (scenarioObj?.selectedSource === "discoveryForm") {
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

        let obj = values;
        obj.scenarioFK = (JSON.parse(localStorage.getItem("ScenarioObj")))._id;

        if (values.owner.includes("client")) {
            obj.clientTotal = values.client.accumulationDetails || "$0";
        } else {
            obj.clientTotal = "";
        }

        if (values.owner.includes("partner")) {
            obj.partnerTotal = values.partner.accumulationDetails || "$0";
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


    const [rowConfig, setRowConfig] = useState(() => {
        return [
            {
                name: "accumulationDetails",
                type: "yesnoModal",
                placeholder: "Accumulation Details and Components",
                callBack: true,
                innerModalTitle: "Accumulation Details",
                key: "accumulationDetails",
                func: handleInnerModal,
            },
            {
                name: "insurancePremiums",
                type: "yesnoModal",
                placeholder: "Insurance Premiums",
                callBack: true,
                innerModalTitle: "Insurance Premiums",
                key: "insurancePremiums",
                func: handleInnerModal,
            },
            {
                name: "concessionalContributions",
                type: "yesnoModal",
                placeholder: "Concessional Contributions",
                callBack: true,
                innerModalTitle: "Concessional Contributions",
                key: "concessionalContributions",
                func: handleInnerModal,
            },
            {
                name: "nonConcessionalContributions",
                type: "yesnoModal",
                placeholder: "Non Concessional Contributions",
                callBack: true,
                innerModalTitle: "Non Concessional Contributions",
                key: "nonConcessionalContributions",
                func: handleInnerModal,
            },
            {
                name: "withdrawals",
                type: "yesnoModal",
                placeholder: "Withdrawals",
                callBack: true,
                innerModalTitle: "Withdrawals",
                key: "withdrawals",
                func: handleInnerModal,
            },
        ];
    });

    const componentMapping = {
        "Accumulation Details": <CFSMSFAccumulationDetails />,
        "Insurance Premiums": <CFSMSFInsurancePremiums />,
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
                                                <th>Owner</th>
                                                <th>Accumulation Details and Components</th>
                                                <th>Insurance Premiums</th>
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

export default SMSFAccumulationDetails;