import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    defaultUrl,
    PersonalDetailsData,
    QuestionDetail,
} from "../../../Store/Store";
import { PatchAxios, PostAxios } from "../../Assets/Api/Api";

import { FaRegBuilding } from "react-icons/fa6";
import DynamicTableRow from "../../Assets/Dynamic/DynamicTableRow";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";

import HomeLoan from "./HomeLoan";


const OwnFamilyHome = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let PersonalData = useRecoilValue(PersonalDetailsData);

    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let [dis, setDis] = useState("");
    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let familyHome =
        Object.keys(questionDetail.familyHome).length > 0
            ? questionDetail.familyHome
            : {
                client: [],
                partner: [],
                joint: [],
            }; // Use an empty object as default if familyHome is undefined

    let initialValues = {};

    useEffect(() => { }, []);

    const fillInitialValues = (setFieldValue) => {
        console.log(PersonalData);
        setFieldValue(`address`, PersonalData.client.clientHomeAddress || "");
        if (familyHome && familyHome._id) {

            setFieldValue(`currentValue`, familyHome.currentValue || "");

            setFieldValue(`costBase`, familyHome.costBase || "");

            setFieldValue(`clientOwnership`, familyHome.clientOwnership || "");
            setFieldValue(`partnerOwnership`, familyHome.partnerOwnership || "");
            setFieldValue(`loanAttached`, familyHome.loanAttached || "");
            setFieldValue(`HomeLoanModal`, familyHome.HomeLoanModal || "");

            setFieldValue(`annualRepayments`, familyHome.HomeLoanModal.annualRepayments || "");
            setFieldValue(`loanAmount`, familyHome.HomeLoanModal.loanBalance || "");


        }
    };

    let DefaultUrl = useRecoilValue(defaultUrl);

    let onSubmit = async (values) => {
        console.log(values);
        // return false

        let obj = {
            currentValue: values.currentValue,
            costBase: values.costBase,
            clientOwnership: values.clientOwnership,
            partnerOwnership: values.partnerOwnership,
            loanAttached: values.loanAttached,

            HomeLoanModal: values.HomeLoanModal,
            // loanAmount: values.loanAmount,
            // annualRepayments: values.annualRepayments,

        };

        obj.clientFK = localStorage.getItem("UserID");

        // Calculate total currentBalance

        obj["clientTotal"] = obj.currentValue;

        console.log(obj, "final obj");

        const bankAccountArray = familyHome.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/familyHome/Add`, obj);
            } else {
                res = await PatchAxios(`${DefaultUrl}/api/familyHome/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, familyHome: res };
                setQuestionDetail(updatedData);
            }

            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);
        }
    };

    let handleInnerModal = (title, values, key) => {
        // console.log(values);

        setModalObject({
            title,
            values,
            key,
        });
        setFlagState(true);
    };

    const rowConfig = [
        {
            name: "address",
            type: "text",
            placeholder: "Address",
            disabled: true
        },
        {
            name: "currentValue",
            type: "number-toComma",
            placeholder: "Current Value",
        },
        {
            name: "costBase",
            type: "number-toComma",
            placeholder: "Cost base",
        },
        {
            name: "clientOwnership",
            type: "number-toPercent",
            placeholder: "Client Ownership",
        },
        {
            name: "partnerOwnership",
            type: "number-toPercent",
            placeholder: "Partner Ownership",
        },
        {
            name: "loanAttached",
            innerModalTitle: "Home Loan",
            type: "yesnoModal",
            callBack: true,
            key: "familyHomeLoan",
            func: handleInnerModal,
        },

        {
            name: "loanAmount",
            type: "number-toComma",
            placeholder: "Loan Amount",
            disabled: true,
        },
        {
            name: "annualRepayments",
            type: "number-toComma",
            placeholder: "Annual Repayments",
            disabled: true,
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
                    setDis(values.loanAttached)
                }, [values]);

                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);
                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className="row justify-content-center">
                                    <InnerModal
                                        modalObject={modalObject}
                                        setFieldValue={setFieldValue}
                                        setFlagState={setFlagState}
                                        flagState={flagState}
                                    >
                                        {modalObject.key === "familyHomeLoan" ? <HomeLoan /> : ""}
                                    </InnerModal>

                                    <div className="mt-2">
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    {/* <th>No#</th> */}
                                                    <th>Address </th>
                                                    <th>
                                                        Current Value –{" "}
                                                        <a
                                                            href="https://www.property.com.au/"
                                                            target="_blank"
                                                            className="text-white"
                                                        >
                                                            <FaRegBuilding />
                                                        </a>{" "}
                                                    </th>
                                                    <th>Cost base</th>
                                                    <th>Client Ownership</th>
                                                    <th>Partner Ownership</th>
                                                    <th>Loan Attached</th>
                                                    <th>Loan Amount</th>
                                                    <th>Annual Repayments</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <DynamicTableRow
                                                    rowConfig={rowConfig}
                                                    values={values}
                                                    setFieldValue={setFieldValue}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
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
    );
};

export default OwnFamilyHome;
