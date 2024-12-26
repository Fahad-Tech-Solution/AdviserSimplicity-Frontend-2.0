import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { CashFlowData, CashFlowScenarioData, defaultUrl, QuestionDetail } from "../../../Store/Store";
import { CreatableMultiSelectField } from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import { openNotificationSuccess, PatchAxios, PostAxios, RenderName } from "../../../Components/Assets/Api/Api";
import InnerModal from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import ReducedSalaryIncome from "./ReducedSalaryIncome";
import SalaryPackagingCar from "./SalaryPackagingCar";
import SalaryPackagingOther from "./SalaryPackagingOther";

// import Select from "react-select";

const CashFlowEmploymentIncome = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);
    let CashFlowScenarioDataObj = useRecoilValue(CashFlowScenarioData);

    let [objAndAPIKey, setObjAndAPIKey] = useState(props.modalObject.key || "");

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let [UserStatus] = useState(localStorage.getItem('UserStatus'));


    let incomeFromOwnBusiness = Object.keys(questionDetail.incomeFromOwnBusiness || {}).length > 0 ? questionDetail.incomeFromOwnBusiness : {
        client: [],
        partner: [],
        joint: [],

    };  // Use an empty object as default if incomeFromOwnBusiness is undefined

    let initialValues = {
        owner: [],
        client: {
            reducedSalaryIncomeModal: {},
            salaryPackingCarModal: {},
            salaryPackingOtherModal: {},
        },
        partner: {
            reducedSalaryIncomeModal: {},
            salaryPackingCarModal: {},
            salaryPackingOtherModal: {},
        },

    };

    const fillInitialValues = (setFieldValue) => {
        try {
            // Set the object and API key
            setObjAndAPIKey(props.modalObject.key);

            console.log(incomeFromOwnBusiness.client, "Discovery Form Data");
            // console.log(cashFlowData, "cashFlowData Form Data");
            // console.log(CashFlowScenarioDataObj, "CashFlowScenarioDataObj Form Data");

            const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

            // Helper function to update field values
            const updateFields = (data, prefix) => {
                if (!data || !Object.keys(data).length) return;

                let upUntilYearData = cashFlowData.cf_personalDetails

                const fields = {

                    salaryIncome: data.salaryIncome || data.SalaryPackageModal.grossSalary || "$0",

                    includeFromYear: data.includeFromYear || "1",
                    upUntilYear: data.upUntilYear || upUntilYearData[prefix].plannedRetirementAge || "",
                    indexation: data.indexation || "2.50%",

                    reducedSalaryIncomeRadio: data.reducedSalaryIncomeRadio || "",
                    reducedSalaryIncomeModal: data.reducedSalaryIncomeModal || {},

                    salaryPackingCarRadio: data.salaryPackingCarRadio || "",
                    salaryPackingCarModal: data.salaryPackingCarModal || (data?.SalaryPackagingModal
                        ? {
                            employerFBTStatus: data?.SalaryPackagingModal?.employerFBTStatus || "",
                            costBaseOfCar: data?.SalaryPackagingModal?.costBaseOfCar || "",
                            FBTPaidByEmployer: data?.SalaryPackagingModal?.FBTPaidByEmployer || "",
                        }
                        : {}),

                    salaryPackingOtherRadio: data.salaryPackingOtherRadio || "",
                    salaryPackingOtherModal: data.salaryPackingOtherModal || {},
                };

                Object.entries(fields).forEach(([key, value]) => {
                    setFieldValue(`${prefix}.${key}`, value);
                });
            };

            // Update owner field
            if (scenarioObj?.selectedSource === "discoveryForm" && incomeFromOwnBusiness && incomeFromOwnBusiness._id) {
                setFieldValue(`owner`, incomeFromOwnBusiness.owner || "");

                // Update client-related fields
                if (incomeFromOwnBusiness.owner.includes("client")) {
                    updateFields(incomeFromOwnBusiness.client, "client");
                }

                // Update partner-related fields
                if (UserStatus === "Married" && incomeFromOwnBusiness.owner.includes("partner")) {
                    updateFields(incomeFromOwnBusiness.partner, "partner");
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
                    console.log("Usama Faheem Ahmed");
                    // Update partner details
                    updateFields(cashFlowDataDetails.partner, "partner");
                }
            }

        } catch (error) {
            console.error("Error in fillInitialValues:", error);
        }
    };

    let DefaultUrl = useRecoilValue(defaultUrl);

    let onSubmit = async (values) => {
        console.log(JSON.stringify(values));
        // return (false);
        let obj = values

        obj.scenarioFK = (JSON.parse(localStorage.getItem("ScenarioObj")))._id;
        if (values.owner.includes("client")) {
            obj.clientTotal = values.client.salaryIncome || "$0";
        }
        else {
            obj.clientTotal = ""
        }

        if (values.owner.includes("partner")) {
            obj.partnerTotal = values.partner.salaryIncome || "$0";
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

    const options = (UserStatus !== "Single") ? [
        { value: "client", label: RenderName("client") },
        { value: "partner", label: RenderName("partner") }] :
        [{ value: "client", label: RenderName("client") },];


    let OpenModal = (title, values, key, stakeHolder) => {
        console.log(title, values, key, stakeHolder);
        setModalObject({
            title,
            values,
            key,
            stakeHolder,
        })
        setFlagState(true);
    }

    const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
        value: (i + 1).toString(),
        label: ("Year " + (i + 1)).toString(),
    }));

    const indexation = Array.from({ length: 21 }, (_, i) => ({
        value: (i * 0.5).toFixed(2) + "%",
        label: (i * 0.5).toFixed(2) + "%",
    }));

    const rowConfig = [
        {
            name: "salaryIncome",
            type: "number-toComma",
            placeholder: "Salary Income",
        },
        {
            name: "includeFromYear",
            type: "select",
            options: loanTermOptions,
            placeholder: "Include From Year",
        },
        {
            name: "upUntilYear",
            type: "select",
            options: loanTermOptions,
            placeholder: "Up Until Year",
        },
        {
            name: "indexation",
            type: "select",
            options: indexation,
            placeholder: "indexation",
        },
        {
            name: "reducedSalaryIncomeRadio",
            type: "yesnoModal",
            callBack: true,
            func: OpenModal,
            placeholder: "Reduced Salary Income",
            innerModalTitle: "Reduced Salary Income",
            key: "reducedSalaryIncomeModal",
        },
        {
            name: "salaryPackingCarRadio",
            type: "yesnoModal",
            callBack: true,
            func: OpenModal,
            placeholder: "Salary Packaging Car",
            innerModalTitle: "Salary Packaging Car",
            key: "salaryPackingCarModal",
        },
        {
            name: "salaryPackingOtherRadio",
            type: "yesnoModal",
            callBack: true,
            func: OpenModal,
            placeholder: "Salary Packaging (Other)",
            innerModalTitle: "Salary Packaging (Other)",
            key: "salaryPackingOtherModal",
        },
    ];

    const componentMapping = {
        "Reduced Salary Income": <ReducedSalaryIncome />,
        "Salary Packaging Car": <SalaryPackagingCar />,
        "Salary Packaging (Other)": <SalaryPackagingOther />,
    };

    function ModalContent(obj) {
        let title = obj.title || "";
        return componentMapping[title] || null; // Return the corresponding component or null if not found
    }

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

                        <InnerModal modalObject={modalObject} setFieldValue={setFieldValue} setFlagState={setFlagState} flagState={flagState} >
                            {ModalContent(modalObject)}
                        </InnerModal>

                        <Row>
                            <div className="col-md-12">
                                <div className="row justify-content-center">
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
                                                        <th>Salary Income</th>
                                                        <th>Include From Year</th>
                                                        <th>Up Until Year</th>
                                                        <th>indexation</th>
                                                        <th>Reduced Salary Income</th>
                                                        <th>Salary Packaging Car</th>
                                                        <th>Salary Packaging (Other)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(values.owner.includes("client")) && (
                                                        <DynamicTableRow
                                                            rowConfig={rowConfig}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            stakeHolder="client."
                                                        />
                                                    )}

                                                    {(values.owner.includes("partner") && UserStatus === "Married") && (
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
                                </div>
                            </div>
                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default CashFlowEmploymentIncome;

