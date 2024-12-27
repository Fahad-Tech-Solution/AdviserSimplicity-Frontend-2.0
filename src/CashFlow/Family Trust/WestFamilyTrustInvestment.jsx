import React, { useEffect, useState } from 'react';
import DynamicTableRow from '../../Components/Assets/Dynamic/DynamicTableRow';
import { Form, Formik } from 'formik';
import { Row, Table } from 'react-bootstrap';
import InnerModal from '../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal';
import { CashFlowData, CashFlowScenarioData, defaultUrl, QuestionDetail } from '../../Store/Store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { openNotificationSuccess, PatchAxios, PostAxios } from '../../Components/Assets/Api/Api';

const WestFamilyTrustInvestment = (props) => {

    let questionDetail = useRecoilValue(QuestionDetail);
    let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
    let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

    let [UserStatus] = useState(localStorage.getItem("UserStatus"));
    let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let DefaultUrl = useRecoilValue(defaultUrl);

    let initialValues = {
        percentOfBeneficiaryAccounts: "",
        totalOfBeneficiaryAccounts: "",
        distributionOfIncomeCGT: "",
        distributionTakenAsCash: "",
        distributionTakenAsCashFromYear: "",
    }

    const fillInitialValues = (setFieldValue) => {
        try {
            setObjAndAPIKey(props.modalObject.key);

            const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

            const updateFields = (data, prefix) => {
                if (!data || !Object.keys(data).length) return;
                const fields = {
                    percentOfBeneficiaryAccounts: data.percentOfBeneficiaryAccounts || "",
                    totalOfBeneficiaryAccounts: data.totalOfBeneficiaryAccounts || "",
                    distributionOfIncomeCGT: data.distributionOfIncomeCGT || "",
                    distributionTakenAsCash: data.distributionTakenAsCash || "",
                    distributionTakenAsCashFromYear: data.distributionTakenAsCashFromYear || "",
                };

                Object.entries(fields).forEach(([key, value]) => {
                    setFieldValue(`${key}`, value);
                });
            };

            if (scenarioObj?.selectedSource === "discoveryForm" && managedFundsLOC && managedFundsLOC._id) {
                updateFields(managedFundsLOC, "client");
            } else {
                const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
                if (cashFlowDetails) {
                    updateFields(cashFlowDetails, "client");
                }
            }

            if (cashFlowData?.[objAndAPIKey]?._id) {
                const cashFlowDataDetails = cashFlowData[objAndAPIKey];
                updateFields(cashFlowDataDetails, "client");
            }

        } catch (error) {
            console.error("Error in fillInitialValues:", error);
        }
    };

    let onSubmit = async (values) => {
        let obj = values;
        obj.scenarioFK = (JSON.parse(localStorage.getItem("ScenarioObj")))._id;
        obj.clientTotal = values.totalOfBeneficiaryAccounts || "$0";
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

    const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
        value: (i + 1).toString(),
        label: ("Year " + (i + 1)).toString(),
    }));

    let handleInnerModal = (title, values, key, stakeHolder) => {
        setModalObject({
            title,
            values,
            key,
            stakeHolder,
            ParentObject: props.modalObject,
        });
        setFlagState(true);
    };

    let rowConfig = [
        {
            value: "1",
            type: "plainText2.0",
        },
        {
            name: "percentOfBeneficiaryAccounts",
            type: "number-toPercent",
            placeholder: "% of Beneficiary Accounts",
        },
        {
            name: "totalOfBeneficiaryAccounts",
            type: "number-toComma",
            placeholder: "Total of Beneficiary Accounts",
            disabled: true,
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
            {({ values, handleChange, setFieldValue, handleBlur }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                return (
                    <Form>
                        <InnerModal
                            modalObject={modalObject}
                            setFieldValue={setFieldValue}
                            setFlagState={setFlagState}
                            flagState={flagState}
                        >
                            {/* Add any modal content here if needed */}
                        </InnerModal>

                        <Row>
                            <div className="col-md-12">
                                <div className="row justify-content-center">
                                    <div className="mt-4">
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>No#</th>
                                                    <th>% of Beneficiary Accounts</th>
                                                    <th>Total of Beneficiary Accounts</th>
                                                    <th>Distribution of Income/CGT</th>
                                                    <th>Distribution Taken as Cash</th>
                                                    <th>Distribution Taken as Cash From Year</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <DynamicTableRow
                                                    rowConfig={rowConfig}
                                                    values={values}
                                                    setFieldValue={setFieldValue}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    handleInnerModal={handleInnerModal}
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
    )
}

export default WestFamilyTrustInvestment;