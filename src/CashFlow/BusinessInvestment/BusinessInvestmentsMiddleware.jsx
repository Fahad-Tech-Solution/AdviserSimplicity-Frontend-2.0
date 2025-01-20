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
import DividendIncome from "./DividendIncome";
import AssetValueOfCompany from "./AssetValueOfCompany";

const BusinessInvestmentsMiddleware = (props) => {

    /*
       This component is a dynamic and reusable modal component designed to handle the following modal types:
       1. "Dividend Income"
       2. "Business as Trusts"
       3. "Bucket Company"
   
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


    let [layoutSwitchFlag, setLayoutSwitchFlag] = useState(props.modalObject.title)


    let BankAccountFinance = Object.keys(questionDetail.BusinessAsCompanyStructure || {}).length > 0 ? questionDetail.BusinessAsCompanyStructure : {
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

            console.log(BankAccountFinance, "Discovery Form Data " + props.modalObject.key + " and SourceKey " + props.modalObject.sourceKey, BankAccountFinance.client);
            // console.log(cashFlowData?.[objAndAPIKey].client.investmentFees, "cashFlowData Form Data");
            // console.log(CashFlowScenarioDataObj, "CashFlowScenarioDataObj Form Data");

            const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

            // Helper function to update field values
            const updateFields = (data, prefix) => {

                if (!data || !Object.keys(data).length) return;

                let fields = {};


                if (props.modalObject.title === "Dividend Income") {
                    fields = {
                        dividendIncome: data.dividendIncome || "$0",
                        dividendIncomeObj: data.dividendIncomeObj || {},
                        assetValueOfCompany: data.assetValueOfCompany || "$0",
                        assetValueOfCompanyObj: data.assetValueOfCompanyObj || {},
                    };
                }

                if (props.modalObject.title === "Business as Trusts") {
                    fields = {
                        netTrustDistribution: data.netTrustDistribution || "$0",
                        netTrustDistributionObj: data.netTrustDistributionObj || {},
                        assetValueOfBusinessTrust: data.assetValueOfBusinessTrust || "$0",
                        assetValueOfBusinessTrustObj: data.assetValueOfBusinessTrustObj || {},
                    };
                }

                if (props.modalObject.title === "Bucket Company") {
                    fields = {
                        netTrustDistribution: data.netTrustDistribution || "$0",
                        netTrustDistributionObj: data.netTrustDistributionObj || {},
                        dividendIncome: data.dividendIncome || "$0",
                        dividendIncomeObj: data.dividendIncomeObj || {},
                    };
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
                    let Obj = {
                        dividendIncome: BankAccountFinance.client[0].dividendReceived,
                        dividendIncomeObj: {
                            dividendIncome: BankAccountFinance.client[0].dividendReceived,
                        },
                        assetValueOfCompany: BankAccountFinance.client[0].equityPosition,
                        assetValueOfCompanyObj: {
                            assetValue: BankAccountFinance.client[0].equityPosition,
                        },
                        netTrustDistribution: toCommaAndDollar(BankAccountFinance.client[0].equityPositionArray[0].distributionReceived),
                        netTrustDistributionObj: {
                            assetValue: toCommaAndDollar(BankAccountFinance.client[0].equityPositionArray[0].distributionReceived)
                        },
                        assetValueOfBusinessTrust: BankAccountFinance.client[0].equityPositionArray[0].businessValuation,
                        assetValueOfBusinessTrustObj: {
                            assetValue: BankAccountFinance.client[0].equityPositionArray[0].businessValuation
                        },
                    }
                    updateFields(Obj, "client");
                }

                // Update partner-related fields
                if (UserStatus === "Married" && BankAccountFinance?.partner?.length > 0) {
                    const partnerData = BankAccountFinance.partner?.[0] || {}; // Ensure safe access with a fallback
                    const partnerEquityPosition = partnerData.equityPositionArray?.[0] || {}; // Safe access for nested property

                    const Obj = {
                        dividendIncome: partnerData.dividendReceived || "$0",
                        dividendIncomeObj: {
                            dividendIncome: partnerData.dividendReceived || "$0",
                        },
                        assetValueOfCompany: partnerData.equityPosition || "$0",
                        assetValueOfCompanyObj: {
                            assetValue: partnerData.equityPosition || "$0",
                        },
                        netTrustDistribution: toCommaAndDollar(partnerEquityPosition.distributionReceived || 0),
                        netTrustDistributionObj: {
                            assetValue: toCommaAndDollar(partnerEquityPosition.distributionReceived || 0),
                        },
                        assetValueOfBusinessTrust: partnerEquityPosition.businessValuation || "$0",
                        assetValueOfBusinessTrustObj: {
                            assetValue: partnerEquityPosition.businessValuation || "$0",
                        },
                    };
                    updateFields(Obj, "partner");
                } else {
                    console.warn("No partner data available or user is not married");
                }

            }
            else {
                // Handle cashFlowData scenario
                const cashFlowDetails = CashFlowScenarioDataObj?.[objAndAPIKey];
                // console.log(cashFlowDetails, "cashFlowDetails")
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
            obj.clientTotal = Object.values(values.client || {})[0] || "$0";
        } else {
            obj.clientTotal = "";
        }

        if (values.owner.includes("partner")) {
            obj.partnerTotal = Object.values(values.partner || {})[0] || "$0";
        } else {
            obj.partnerTotal = "";
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
        let OriginalArray = [
            {
                name: "dividendIncome",
                type: "number-toComma-Modal",
                placeholder: "Dividend Income",
                callBack: true,
                innerModalTitle: "Dividend Income",
                key: "dividendIncome",
                func: handleInnerModal,
                inputChangeFunc: () => { },
            },
            {
                name: "assetValueOfCompany",
                type: "number-toComma-Modal",
                placeholder: "Asset Value of Company",
                callBack: true,
                innerModalTitle: "Asset Value of Company",
                key: "assetValueOfCompany",
                func: handleInnerModal,
                inputChangeFunc: () => { },
            },
        ];


        if (layoutSwitchFlag === "Business as Trusts") {
            OriginalArray = [
                {
                    name: "netTrustDistribution",
                    type: "number-toComma-Modal",
                    placeholder: "Net Trust Distribution",
                    callBack: true,
                    innerModalTitle: "Net Trust Distribution",
                    key: "netTrustDistribution",
                    func: handleInnerModal,
                    inputChangeFunc: () => { },
                },
                {
                    name: "assetValueOfBusinessTrust",
                    type: "number-toComma-Modal",
                    placeholder: "Asset Value of Business Trust",
                    callBack: true,
                    innerModalTitle: "Asset Value of Business Trust",
                    key: "assetValueOfBusinessTrust",
                    func: handleInnerModal,
                    inputChangeFunc: () => { },
                },
            ]
        }


        if (layoutSwitchFlag === "Bucket Company") {
            OriginalArray = [
                {
                    name: "netTrustDistribution",
                    type: "number-toComma-Modal",
                    placeholder: "Net Trust Distribution",
                    callBack: true,
                    innerModalTitle: "Net Trust Distribution",
                    key: "netTrustDistribution",
                    func: handleInnerModal,
                    inputChangeFunc: () => { },
                },
                {
                    name: "dividendIncome",
                    type: "number-toComma-Modal",
                    placeholder: "Dividend Income",
                    callBack: true,
                    innerModalTitle: "Dividend Income",
                    key: "dividendIncome",
                    func: handleInnerModal,
                    inputChangeFunc: () => { },
                },
            ]
        }

        return OriginalArray;
    });

    const componentMapping = {

        "Dividend Income": <DividendIncome />,
        "Asset Value of Company": <AssetValueOfCompany />,
        "Net Trust Distribution": <AssetValueOfCompany />,
        "Asset Value of Business Trust": <AssetValueOfCompany />,

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
                                                {layoutSwitchFlag === "Dividend Income" &&
                                                    <React.Fragment>
                                                        <th>Dividend Income</th>
                                                        <th>Asset Value of Company</th>
                                                    </React.Fragment>
                                                }
                                                {layoutSwitchFlag === "Business as Trusts" &&
                                                    <React.Fragment>
                                                        <th>Net Trust Distribution</th>
                                                        <th>Asset Value of Business Trust</th>
                                                    </React.Fragment>
                                                }
                                                {layoutSwitchFlag === "Bucket Company" &&
                                                    <React.Fragment>
                                                        <th>Net Trust Distribution</th>
                                                        <th>Dividend Income</th>
                                                    </React.Fragment>
                                                }
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

export default BusinessInvestmentsMiddleware;
