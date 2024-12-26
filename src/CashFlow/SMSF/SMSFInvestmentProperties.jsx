import React, { useEffect, useState } from 'react';
import DynamicTableRow from '../../Components/Assets/Dynamic/DynamicTableRow';
import { Form, Formik } from 'formik';
import { Row, Table } from 'react-bootstrap';
import { FaRegBuilding } from 'react-icons/fa6';
import InnerModal from '../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal';
import { CashFlowData, CashFlowScenarioData, defaultUrl, QuestionDetail } from '../../Store/Store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { openNotificationSuccess, PatchAxios, PostAxios } from '../../Components/Assets/Api/Api';
import TotalCostBase from '../Financial Investments/TotalCostBase';
import CashFlowHomeLoan from '../PersonalAssetsComponents/CashFlowNew/CashFlowHomeLoan';

const SMSFInvestmentProperties = (props) => {

    let questionDetail = useRecoilValue(QuestionDetail);
    let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
    let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

    let [UserStatus] = useState(localStorage.getItem("UserStatus"));
    let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let DefaultUrl = useRecoilValue(defaultUrl);

    let initialValues = {
        streetAddress: "",
        valueOfProperty: "",
        yearOfPurchase: "",
        totalCostBaseObj: {},
        expectedGrowthRate: "",
        loanBalance: "",
        loanBalanceObj: {},
        rentalIncome: "",
        sellPropertyInYear: "",
    }

    const fillInitialValues = (setFieldValue) => {
        try {
            setObjAndAPIKey(props.modalObject.key);

            const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

            const updateFields = (data, prefix) => {
                if (!data || !Object.keys(data).length) return;
                const fields = {
                    streetAddress: data.streetAddress || "",
                    valueOfProperty: data.valueOfProperty || "",
                    yearOfPurchase: data.yearOfPurchase || "",
                    totalCostBaseObj: data.totalCostBaseObj || {},
                    expectedGrowthRate: data.expectedGrowthRate || "",
                    loanBalance: data.loanBalance || "",
                    loanBalanceObj: data.loanBalanceObj || {},
                    rentalIncome: data.rentalIncome || "",
                    sellPropertyInYear: data.sellPropertyInYear || "",
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
        obj.clientTotal = values.valueOfProperty || "$0";
        obj.partnerTotal = values.loanBalanceObj.loanBalance || "$0";
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
            name: "streetAddress",
            type: "text",
            placeholder: "Street Address",
        },
        {
            name: "valueOfProperty",
            type: "number-toComma",
            placeholder: "Value of Property",
        },
        {
            name: "yearOfPurchase",
            type: "select",
            placeholder: "Year of Purchase",
            options: loanTermOptions,
        },
        {
            name: "totalCostBaseObj",
            type: "modal",
            placeholder: "Total Cost Base",
            innerModalTitle: "Total Cost Base",
            key: "totalCostBaseObj"
        },
        {
            name: "expectedGrowthRate",
            type: "number-toPercent",
            placeholder: "Expected Growth Rate",
        },
        {
            name: "loanBalance",
            type: "yesnoModal",
            placeholder: "Loan Balance",
            innerModalTitle: "Loan Balance",
            key: "loanBalanceObj",
            callBack: true,
            func: handleInnerModal,
        },
        {
            name: "rentalIncome",
            type: "yesno",
            placeholder: "Rental Income",
        },
        {
            name: "sellPropertyInYear",
            type: "select",
            placeholder: "Sell Property in Year",
            options: loanTermOptions,
        },
    ];

    const componentMapping = {
        "Total Cost Base": <TotalCostBase />,
        "Loan Balance": <CashFlowHomeLoan />
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
                            {ModalContent(modalObject)}
                        </InnerModal>

                        <Row>
                            <div className="col-md-12">
                                <div className="row justify-content-center">
                                    <div className="mt-4">
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>No#</th>
                                                    <th>Street Address</th>
                                                    <th>Value of Property - <a href='https://www.property.com.au/' target='_blank' className='text-white'><FaRegBuilding /></a></th>
                                                    <th>Year Of Purchase</th>
                                                    <th>Total Cost Base</th>
                                                    <th>Expected Growth Rate</th>
                                                    <th>Loan Balance</th>
                                                    <th>Rental Income</th>
                                                    <th>Sell Property in Year</th>
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

export default SMSFInvestmentProperties;