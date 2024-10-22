import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
    openNotificationSuccess,
    PatchAxios,
    PostAxios,
    RenderName,
    toCommaAndDollar,
    toNumericValue,
} from "../../Assets/Api/Api";
import DynamicTableRow from "../../Assets/Dynamic/DynamicTableRow";
import { CreatableMultiSelectField } from "../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";

const Partnership = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
    let [UserStatus] = useState(localStorage.getItem('UserStatus'));


    let incomeFromPartnership =
        Object.keys(questionDetail.incomeFromPartnership).length > 0
            ? questionDetail.incomeFromPartnership
            : {
                client: [],
                partner: [],
                joint: [],
            }; // Use an empty object as default if incomeFromPartnership is undefined

    let initialValues = {
        owner: []
    };

    const fillInitialValues = (setFieldValue) => {
        let data = incomeFromPartnership;
        console.log(data, "data");

        if (data && data._id) {
            setFieldValue(`owner`, data.owner || "");

            // Handle client-related fields
            if (data.owner.includes("client")) {
                if (data.client && Object.keys(data.client).length) {
                    setFieldValue(`client.businessName`, data.client.businessName || "");
                    setFieldValue(`client.ABN`, data.client.ABN || "");
                    setFieldValue(`client.businessAddress`, data.client.businessAddress || "");
                    setFieldValue(`client.totalNetPartnershipIncome`, data.client.totalNetPartnershipIncome || "");
                    setFieldValue(`client.shareOfPartnership`, data.client.shareOfPartnership || "");
                    setFieldValue(`client.share`, data.client.share || "");
                    setFieldValue(`client.goodWill`, data.client.goodWill || "");
                }
            }

            // Handle partner-related fields if married
            if (data.owner.includes("partner") && UserStatus === "Married") {
                if (data.partner && Object.keys(data.partner).length) {
                    setFieldValue(`partner.businessName`, data.partner.businessName || "");
                    setFieldValue(`partner.ABN`, data.partner.ABN || "");
                    setFieldValue(`partner.businessAddress`, data.partner.businessAddress || "");
                    setFieldValue(`partner.totalNetPartnershipIncome`, data.partner.totalNetPartnershipIncome || "");
                    setFieldValue(`partner.shareOfPartnership`, data.partner.shareOfPartnership || "");
                    setFieldValue(`partner.share`, data.partner.share || "");
                    setFieldValue(`partner.goodWill`, data.partner.goodWill || "");
                }
            }
        }
    };




    let DefaultUrl = useRecoilValue(defaultUrl);

    let onSubmit = async (values) => {
        console.log(values);
        // return (false);

        // Create an object with additional fields
        let obj = { ...values };
        obj.clientFK = localStorage.getItem("UserID");

        // Handle client-related conditions
        if (values.owner.includes("client")) {
            obj.clientTotal = values.client.share;
            console.log("Client total set");
        } else {
            obj.client = {};
            obj.clientTotal = "";
            console.log("Client data cleared");
        }

        // Handle partner-related conditions if married
        if (values.owner.includes("partner") && UserStatus === "Married") {
            obj.partnerTotal = values.partner.share;
            console.log("Partner total set");
        } else {
            obj.partner = {};
            obj.partnerTotal = "";
            console.log("Partner data cleared");
        }

        console.log(obj, "final obj");

        // Check if incomeFromPartnership and the array at props.modalObject.Input exist
        const bankAccountArray = incomeFromPartnership.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(
                    `${DefaultUrl}/api/incomeFromPartnership/Add`,
                    obj
                );
            } else {
                res = await PatchAxios(
                    `${DefaultUrl}/api/incomeFromPartnership/Update`,
                    obj
                );
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, incomeFromPartnership: res };
                setQuestionDetail(updatedData);
            }

            openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved");
            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);
            openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved. Please try again.");
        }
    };

    let Formula = (values, setFieldValue, currentInput, stakeHolder) => {
        try {
            // Removing periods in stakeholder name and logging current values
            let stakeHolderKey = stakeHolder.replace(".", "");
            let totalNetPartnershipIncome =
                toNumericValue(values[stakeHolderKey]?.totalNetPartnershipIncome) || 0;

            let shareOfPartnership =
                parseFloat(values[stakeHolderKey]?.shareOfPartnership) || 0;

            // Check the input name and assign the correct value
            switch (currentInput.name) {
                case `${stakeHolder}totalNetPartnershipIncome`:
                    totalNetPartnershipIncome = toNumericValue(currentInput.value) || 0;
                    break;
                case `${stakeHolder}shareOfPartnership`:
                    // Cap the share percentage at 100
                    let percentageValue = parseFloat(
                        currentInput.value.replace(/[^0-9.-]+/g, "")
                    );
                    shareOfPartnership = Math.min(percentageValue, 100) || 0;
                    break;
                default:
                    console.warn("Unexpected input field");
                    break;
            }

            // Calculate the amount based on the formula
            let amount = (totalNetPartnershipIncome * shareOfPartnership) / 100;

            // Format the amount and update the field value
            setFieldValue(`${stakeHolder}share`, toCommaAndDollar(amount.toFixed(2))); // Ensure it rounds to two decimal places
        } catch (error) {
            console.error("Error in Formula function: ", error);
        }
    };

    const rowConfig = [
        { name: "businessName", type: "text", placeholder: "Business Name" },
        { name: "ABN", type: "number", placeholder: "ABN" },
        { name: "businessAddress", type: "text", placeholder: "Business Address" },
        {
            name: "totalNetPartnershipIncome",
            type: "number-toComma",
            placeholder: "Total Net Partnership Income",
            callBack: true,
            func: Formula,
        },
        {
            name: "shareOfPartnership",
            type: "number-toPercent",
            placeholder: "Share Partnership",
            callBack: true,
            func: Formula,
        },
        {
            name: "share",
            type: "number-toComma",
            placeholder: "Share ",
            disabled: true
        },
        {
            name: "goodWill",
            type: "number-toComma",
            placeholder: "Good Will Business Valuation ",
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
                                                <thead>
                                                    <tr>
                                                        <th
                                                            onClick={() => {
                                                                console.log(values);
                                                            }}
                                                        >
                                                            Owner
                                                        </th>
                                                        <th>Business Name</th>
                                                        <th>ABN</th>
                                                        <th>Business Address</th>
                                                        <th>Total Net Partnership income</th>
                                                        <th>Share of Partnership %</th>
                                                        <th>Share</th>
                                                        <th>Goodwill/Business Valuation </th>
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
                                                            //  handleInnerModal={handleInnerModal}
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
                                                            //  handleInnerModal={handleInnerModal}
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

export default Partnership;
