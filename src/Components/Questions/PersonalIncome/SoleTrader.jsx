import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { openNotificationSuccess, PatchAxios, PostAxios, RenderName } from "../../Assets/Api/Api";

import MyFormComponent from "../../Assets/Dynamic/DemoDynamicForm";
import DynamicTableRow from "../../Assets/Dynamic/DynamicTableRow";

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

    let initialValues = {};

    const fillInitialValues = (setFieldValue) => {

        console.log(incomeFromSoleTrader, "edit");
        let data = incomeFromSoleTrader;

        if (incomeFromSoleTrader && incomeFromSoleTrader._id) {

            if (data) {

                setFieldValue(`owner`, data.owner || "");

                if (data.owner === "client" || data.owner === "client+partner") {
                    if (data?.client && Object.keys(data?.client).length) {
                        setFieldValue(`client.businessName`, data.client.businessName || "");
                        setFieldValue(`client.ABN`, data.client.ABN || "");
                        setFieldValue(`client.businessAddress`, data.client.businessAddress || "");
                        setFieldValue(`client.netBusinessIncome`, data.client.netBusinessIncome || "");
                        setFieldValue(`client.goodWill`, data.client.goodWill || "");
                    }
                }

                if ((data.owner === "partner" || data.owner === "client+partner") && (UserStatus === "Married")) {
                    if (data?.partner && Object.keys(data?.partner).length) {
                        setFieldValue(`partner.businessName`, data.partner.businessName || "");
                        setFieldValue(`partner.ABN`, data.partner.ABN || "");
                        setFieldValue(`partner.businessAddress`, data.partner.businessAddress || "");
                        setFieldValue(`partner.netBusinessIncome`, data.partner.netBusinessIncome || "");
                        setFieldValue(`partner.goodWill`, data.partner.goodWill || "");
                    }
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
        if (values.owner === "client" || values.owner === "client+partner") {
            obj.clientTotal = values.client.netBusinessIncome;
            console.log("Client total set");
        } else {
            obj.client = {};
            obj.clientTotal = "";
            console.log("Client data cleared");
        }

        // Handle partner-related conditions
        if ((values.owner === "partner" || values.owner === "client+partner") && (UserStatus === "Married")) {
            obj.partnerTotal = values.partner.netBusinessIncome;
            console.log("Partner total set");
        } else {
            obj.partner = {};
            obj.partnerTotal = "";
            console.log("Partner data cleared");
        }

        console.log(obj, "final obj");

        // Check if incomeFromSoleTrader and the array at props.modalObject.Input exist
        // const bankAccountArray = incomeFromSoleTrader[props.modalObject.Input] || [];
        const bankAccountArray = incomeFromSoleTrader.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(
                    `${DefaultUrl}/api/incomeFromSoleTrader/Add`,
                    obj
                );
            } else {
                // obj.collection = props.modalObject.Input;
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

                                            <div className="w-25 ">
                                                <Field
                                                    as="select"
                                                    placeholder="Name of owner"
                                                    id={`owner`}
                                                    name={`owner`}
                                                    className="form-select inputDesignDoubleInput"
                                                >
                                                    <option value={""}>Select</option>
                                                    <option value={"client"}>
                                                        {"Only " + RenderName("client")}
                                                    </option>
                                                    {localStorage.getItem("UserStatus") !== "Single" && (
                                                        <React.Fragment>
                                                            <option value={"partner"}>
                                                                {"Only " + RenderName("partner")}
                                                            </option>
                                                            <option value={"client+partner"}>
                                                                {"Both (" +
                                                                    RenderName("client") +
                                                                    " , " +
                                                                    RenderName("partner") +
                                                                    ")"}
                                                            </option>
                                                        </React.Fragment>
                                                    )}
                                                </Field>
                                            </div>
                                        </div>
                                    </div>
                                    {values.owner && (
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
                                                    {values.owner == "client" ? (
                                                        <DynamicTableRow
                                                            rowConfig={rowConfig}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            handleInnerModal={handleInnerModal}
                                                            stakeHolder="client."
                                                        />
                                                    ) : (

                                                        ""
                                                    )}
                                                    {values.owner == "partner" ? (
                                                        <DynamicTableRow
                                                            rowConfig={rowConfig}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            handleInnerModal={handleInnerModal}
                                                            stakeHolder="partner."
                                                        />
                                                    ) : (

                                                        ""
                                                    )}
                                                    {values.owner == "client+partner" ? (
                                                        <>
                                                            <DynamicTableRow
                                                                rowConfig={rowConfig}
                                                                values={values}
                                                                setFieldValue={setFieldValue}
                                                                handleChange={handleChange}
                                                                handleBlur={handleBlur}
                                                                handleInnerModal={handleInnerModal}
                                                                stakeHolder="client."
                                                            />
                                                            {UserStatus === "Married" &&

                                                                <DynamicTableRow
                                                                    rowConfig={rowConfig}
                                                                    values={values}
                                                                    setFieldValue={setFieldValue}
                                                                    handleChange={handleChange}
                                                                    handleBlur={handleBlur}
                                                                    handleInnerModal={handleInnerModal}
                                                                    stakeHolder="partner."
                                                                />
                                                            }
                                                        </>
                                                    ) : (

                                                        ""
                                                    )}
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
