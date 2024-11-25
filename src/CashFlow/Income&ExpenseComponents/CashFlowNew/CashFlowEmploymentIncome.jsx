import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { CreatableMultiSelectField } from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import { RenderName } from "../../../Components/Assets/Api/Api";
import InnerModal from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import ReducedSalaryIncome from "./ReducedSalaryIncome";
import SalaryPackagingCar from "./SalaryPackagingCar";
import SalaryPackagingOther from "./SalaryPackagingOther";
// import Select from "react-select";

const CashFlowEmploymentIncome = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let [UserStatus] = useState(localStorage.getItem('UserStatus'));


    let incomeFromOwnBusiness = Object.keys(questionDetail.incomeFromOwnBusiness || {}).length > 0 ? questionDetail.incomeFromOwnBusiness : {
        client: [],
        partner: [],
        joint: [],

    };  // Use an empty object as default if incomeFromOwnBusiness is undefined

    let initialValues = {
        owner: []
    };

    const fillInitialValues = (setFieldValue) => {
        try {
            // id Flow Starts with Discovery Module  Following input Values Came From that
            if (incomeFromOwnBusiness && incomeFromOwnBusiness._id) {
                if (incomeFromOwnBusiness.owner.includes("client")) {
                    let client = incomeFromOwnBusiness.client;

                    if (client && Object.keys(client.SalaryPackageModal || {}).length > 0) {
                        let Data = client.SalaryPackageModal;
                        setFieldValue("client.SalaryIncome", Data.grossSalary || 0);
                    }

                    if (client && Object.keys(client.SalaryPackagingModal || {}).length > 0) {
                        let Data = client.SalaryPackagingModal;
                        setFieldValue("client.SalaryPackagingArray.SalaryPackagingOther", Data.employerFBTStatus || ""); // Next Popup input Came From Same Discovery Module

                        setFieldValue("client.SalaryPackagingCarArray.employerFBTStatus", Data.employerFBTStatus || "");
                        setFieldValue("client.SalaryPackagingCarArray.costBaseOfCar", Data.costBaseOfCar || "");
                        setFieldValue("client.SalaryPackagingCarArray.FBTPaidByEmployer", Data.FBTPaidByEmployer || "");
                    }
                }

                if (incomeFromOwnBusiness.owner.includes("partner")) {
                    let partner = incomeFromOwnBusiness.partner;

                    if (partner && Object.keys(partner.SalaryPackageModal || {}).length > 0) {
                        let Data = partner.SalaryPackageModal;
                        setFieldValue("partner.SalaryIncome", Data.grossSalary || 0);
                    }

                    if (partner && Object.keys(partner.SalaryPackagingModal || {}).length > 0) {
                        let Data = partner.SalaryPackagingModal;
                        setFieldValue("partner.SalaryPackagingArray.SalaryPackagingOther", Data.employerFBTStatus || ""); // Next Popup input Came From Same Discovery Module

                        setFieldValue("partner.SalaryPackagingCarArray.employerFBTStatus", Data.employerFBTStatus || "");
                        setFieldValue("partner.SalaryPackagingCarArray.costBaseOfCar", Data.costBaseOfCar || "");
                        setFieldValue("partner.SalaryPackagingCarArray.FBTPaidByEmployer", Data.FBTPaidByEmployer || "");
                    }
                }
            }
        } catch (error) {
            console.error("Error in fillInitialValues function:", error);
        }
    };


    let DefaultUrl = useRecoilValue(defaultUrl);

    let onSubmit = async (values) => {
        console.log(JSON.stringify(values));

        return (false);

        let obj = values;
        obj.clientFK = localStorage.getItem("UserID");
        console.log(obj, "new Object");

        // Handle client-related conditions
        if (values.owner.includes("client")) {
            obj.clientTotal = values.client.regularIncomePA;
            console.log("Client total set");
        } else {
            obj.client = {};
            obj.clientTotal = "";
            console.log("Client data cleared");
        }

        // Handle partner-related conditions
        if (values.owner.includes("partner") && UserStatus === "Married") {
            obj.partnerTotal = values.partner.regularIncomePA;
            console.log("Partner total set");
        } else {
            obj.partner = {};
            obj.partnerTotal = "";
            console.log("Partner data cleared");
        }

        console.log(obj, "final obj");
        const bankAccountArray = incomeFromOverseasPension.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(
                    `${DefaultUrl}/api/incomeFromOverseasPension/Add`,
                    obj
                );
            } else {
                res = await PatchAxios(
                    `${DefaultUrl}/api/incomeFromOverseasPension/Update`,
                    obj
                );
            }

            if (res) {
                console.log(res);
                const updatedData = {
                    ...questionDetail,
                    incomeFromOverseasPension: res,
                };
                setQuestionDetail(updatedData);
            }

            openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved");

            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);
            openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved Please! try again");
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
            name: "SalaryIncome",
            type: "number-toComma",
            placeholder: "Salary Income",
        },
        {
            name: "IncludeFromYear",
            type: "select",
            options: loanTermOptions,
            placeholder: "Include From Year",
        },
        {
            name: "UpUntilYear",
            type: "select",
            options: loanTermOptions,
            placeholder: "Up Until Year",
        },
        {
            name: "Indexation",
            type: "select",
            options: indexation,
            placeholder: "Indexation",
        },
        {
            name: "ReducedSalaryIncome",
            type: "yesnoModal",
            callBack: true,
            func: OpenModal,
            placeholder: "Reduced Salary Income",
            innerModalTitle: "Reduced Salary Income",
            key: "ReducedSalaryIncomeObj",
        },
        {
            name: "SalaryPackagingCar",
            type: "yesnoModal",
            callBack: true,
            func: OpenModal,
            placeholder: "Salary Packaging Car",
            innerModalTitle: "Salary Packaging Car",
            key: "SalaryPackagingCarArray",
        },
        {
            name: "SalaryPackagingOther",
            type: "yesnoModal",
            callBack: true,
            func: OpenModal,
            placeholder: "Salary Packaging (Other)",
            innerModalTitle: "Salary Packaging (Other)",
            key: "SalaryPackagingArray",
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
                                                        <th>Indexation</th>
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

