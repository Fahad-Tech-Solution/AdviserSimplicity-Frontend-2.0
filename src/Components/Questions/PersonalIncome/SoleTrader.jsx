import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { openNotificationSuccess, PatchAxios, PostAxios, RenderName } from "../../Assets/Api/Api";

import MyFormComponent from "../../Assets/Dynamic/DemoDynamicForm";
import DynamicTableRow from "../../Assets/Dynamic/DynamicTableRow";
import { CreatableMultiSelectField } from "../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";

const SoleTrader = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let [UserStatus] = useState(localStorage.getItem('UserStatus'));

    let incomeFromSoleTrader =
        Object.keys(questionDetail.incomeFromSoleTrader).length > 0
            ? questionDetail.incomeFromSoleTrader
            : {
                client: [],
                partner: [],
                joint: [],
            }; // Use an empty object as default if incomeFromSoleTrader is undefined

    let initialValues = {
        owner: []
    };

    const fillInitialValues = (setFieldValue) => {
        console.log(incomeFromSoleTrader, "edit");
        let data = incomeFromSoleTrader;

        if (data && data._id) {
            setFieldValue(`owner`, data.owner || "");

            // Handle client-related fields
            if (data.owner.includes("client")) {
                if (data?.client && Object.keys(data.client).length) {
                    setFieldValue(`client.businessName`, data.client.businessName || "");
                    setFieldValue(`client.ABN`, data.client.ABN || "");
                    setFieldValue(`client.businessAddress`, data.client.businessAddress || "");
                    setFieldValue(`client.netBusinessIncome`, data.client.netBusinessIncome || "");
                    setFieldValue(`client.goodWill`, data.client.goodWill || "");
                }
            }

            // Handle partner-related fields if married
            if (data.owner.includes("partner") && UserStatus === "Married") {
                if (data?.partner && Object.keys(data.partner).length) {
                    setFieldValue(`partner.businessName`, data.partner.businessName || "");
                    setFieldValue(`partner.ABN`, data.partner.ABN || "");
                    setFieldValue(`partner.businessAddress`, data.partner.businessAddress || "");
                    setFieldValue(`partner.netBusinessIncome`, data.partner.netBusinessIncome || "");
                    setFieldValue(`partner.goodWill`, data.partner.goodWill || "");
                }
            }
        }
    };


    let DefaultUrl = useRecoilValue(defaultUrl);

    let onSubmit = async (values) => {
        console.log("values", values);
        let obj = { ...values };
        obj.clientFK = localStorage.getItem("UserID");

        // Handle client-related conditions
        if (values.owner.includes("client")) {
            obj.clientTotal = values.client.netBusinessIncome;
            console.log("Client total set");
        } else {
            obj.client = {};
            obj.clientTotal = "";
            console.log("Client data cleared");
        }

        // Handle partner-related conditions
        if (values.owner.includes("partner") && UserStatus === "Married") {
            obj.partnerTotal = values.partner.netBusinessIncome;
            console.log("Partner total set");
        } else {
            obj.partner = {};
            obj.partnerTotal = "";
            console.log("Partner data cleared");
        }

        console.log(obj, "final obj");

        // Check if incomeFromSoleTrader exists
        const bankAccountArray = incomeFromSoleTrader.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(
                    `${DefaultUrl}/api/incomeFromSoleTrader/Add`,
                    obj
                );
            } else {
                res = await PatchAxios(
                    `${DefaultUrl}/api/incomeFromSoleTrader/Update`,
                    obj
                );
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, incomeFromSoleTrader: res };
                setQuestionDetail(updatedData);
            }

            openNotificationSuccess("success", "topRight", "Success Notification", `Data of "${props.modalObject.title}" is Saved`);

            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);
            openNotificationSuccess("error", "topRight", "Error Notification", `Data of "${props.modalObject.title}" is not Saved. Please try again.`);
        }
    };

    const handleInnerModal = (name, values) => {
        console.log("Opening modal for:", name, values);
    };


    const rowConfig = [
        { name: "businessName", type: "text", placeholder: "Business Name" },
        { name: "ABN", type: "number", placeholder: "ABN" },
        { name: "businessAddress", type: "text", placeholder: "Business Address" },
        {
            name: "netBusinessIncome",
            type: "number-toComma",
            placeholder: "Net Business Income",
        },
        {
            name: "goodWill",
            type: "number-toComma",
            placeholder: "GoodWill Business Valuation",
        },
    ];

    const options = (UserStatus !== "Single") ? [
        { value: "client", label: RenderName("client") },
        { value: "partner", label: RenderName("partner") }] :
        [{ value: "client", label: RenderName("client") },];


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
                                                <thead className="text-center">
                                                    <tr>
                                                        <th>Owner</th>
                                                        <th>Business Name</th>
                                                        <th>ABN</th>
                                                        <th>Business Address</th>
                                                        <th style={{ maxWidth: "100px" }}>
                                                            Net Business Income
                                                        </th>
                                                        <th style={{ maxWidth: "100px" }}>
                                                            Goodwill/Business Valuation
                                                        </th>
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
                                                            handleInnerModal={handleInnerModal}
                                                            stakeHolder="client."
                                                        />
                                                    )}

                                                    {(values.owner.includes("partner") && UserStatus === "Married") &&
                                                        <DynamicTableRow
                                                            rowConfig={rowConfig}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            handleInnerModal={handleInnerModal}
                                                            stakeHolder="partner."
                                                        />}

                                                </tbody>
                                            </Table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Row>
                        {/* <MyFormComponent /> */}
                    </Form>
                );
            }}
        </Formik>
    );
};

export default SoleTrader;
