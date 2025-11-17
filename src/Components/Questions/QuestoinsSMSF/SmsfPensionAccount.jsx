import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
    openNotificationSuccess,
    PatchAxios,
    PostAxios,
    RenderName,
    toCommaAndDollar
} from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import PensionBenefits from "./PensionBenefits";
import Beneficiaries from "../FinancialInvestments/QuestionsDetail/Beneficiaries";
import { ConfigProvider, Select, Input, InputNumber } from "antd";

const AntdTable = DynamicTableForInputsSection("antd");
const { Option } = Select;

const SmsfPensionAccount = (props) => {
    const [nameSet] = useState(() => {
        if (props.modalObject.Input === "client") {
            return localStorage.getItem("UserName");
        } else if (props.modalObject.Input === "partner") {
            return localStorage.getItem("PartnerName");
        } else if (props.modalObject.Input === "joint") {
            return localStorage.getItem("UserName") + " & " + localStorage.getItem("PartnerName");
        }
        return "";
    });

    const [flagState, setFlagState] = useState(false);
    const [modalObject, setModalObject] = useState({});
    const [ShowError, setShowError] = useState({});

    let index = parseFloat(
        props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
    );
    let BaseKey = props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "");

    const existingData =
        props.modalObject.values?.[BaseKey]?.[index]?.[props.modalObject.key + "Array"] || [];

    const initialValues = {
        NumberOfMap: existingData.length || "",
        pensionAccounts: existingData.length ? existingData : [],
    };

    const fillInitialValues = (setFieldValue) => {
        console.log(existingData);

        if (existingData.length) {
            setFieldValue("pensionAccounts", existingData);
        }
    };



    const handleInnerModal = (
        innerModalTitle,
        key,
        stakeHolder,
        values,
        type,
        question
    ) => {
        const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
        const BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

        setModalObject({
            title: `${nameSet}${innerModalTitle}`,
            question,
            key,
            stakeHolder,
            editArray: values?.pensionAccounts?.[index]?.[key] || [],
            values,
            ParentModalObject: props.modalObject,
        });
        setFlagState(true);
    };

    const onSubmit = async (values) => {
        console.log(JSON.stringify(values));

        const numberOfMaps = parseInt(values.NumberOfMap, 10);
        const newEntries = [];

        for (let i = 0; i < numberOfMaps; i++) {
            const newEntry = {
                pensionBenefits: values.pensionAccounts[i]?.pensionBenefits || "",
                pensionBenefitsarray: values.pensionAccounts[i]?.pensionBenefitsarray || "",
                pensionPayment: values.pensionAccounts[i]?.pensionPayment || "",
                pensionType: values.pensionAccounts[i]?.pensionType || "",
                nominatedBeneficiaries: values.pensionAccounts[i]?.nominatedBeneficiaries || "",
                beneficiariesArray: values.pensionAccounts[i]?.beneficiariesArray || "",
            };
            newEntries.push(newEntry);
        }

        console.log(`${props.modalObject.stakeHolder}${props.modalObject.key}Array`, newEntries);

        const Total = newEntries.reduce(
            (total, entry) => total + parseFloat((entry.pensionBenefits || "0").replace(/[^0-9.-]+/g, "") || 0),
            0
        );

        props.setFieldValue(`${props.modalObject.stakeHolder}${props.modalObject.key}`, toCommaAndDollar(Total));
        props.setFieldValue(`${props.modalObject.stakeHolder}${props.modalObject.key}Array`, newEntries);

        if (props.flagState) {
            props.setFlagState(false);
        }
    };



    const CheckInputValue = (values, setFieldValue, currentInput, stakeHolder) => {
        const index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
        const pensionBenefitsarray = values?.pensionAccounts?.[index]?.pensionBenefitsarray;

        if (!pensionBenefitsarray) return;

        const ExpectedSum = parseFloat(pensionBenefitsarray.reduce(
            (total, entry) => total + parseFloat((entry.taxableComponent || "0").replace(/[^0-9.-]+/g, "") || 0),
            0
        ));
        const data = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "") || 0);

        console.log(ExpectedSum, data, currentInput.name, ShowError);

        if (ExpectedSum !== data) {
            setShowError(prevState => ({
                ...prevState,
                [`pensionBenefits${index}Error`]: true,
                [`pensionBenefits${index}Message`]: "Total must be equal to the sum of all Pension Benefits filled in the popup. The sum is " + toCommaAndDollar(ExpectedSum),
            }));
        } else {
            setShowError(prevState => ({
                ...prevState,
                [`pensionBenefits${index}Error`]: false,
                [`pensionBenefits${index}Message`]: "",
            }));
        }
    };

    // Updated handleInput function to work with select
    const handleInput = (e, setFieldValue, values) => {
        const value = e.target.value > 5 ? 5 : e.target.value;
        setFieldValue(e.target.id, value);

        // Update pensionAccounts array based on new count
        const newCount = parseInt(value, 10) || 0;
        const currentAccounts = values.pensionAccounts || [];

        if (newCount > currentAccounts.length) {
            // Add new empty accounts
            const newAccounts = [...currentAccounts];
            for (let i = currentAccounts.length; i < newCount; i++) {
                newAccounts.push({
                    pensionBenefits: "",
                    pensionBenefitsarray: "",
                    pensionPayment: "",
                    pensionType: "",
                    nominatedBeneficiaries: "",
                    beneficiariesArray: "",
                });
            }
            setFieldValue("pensionAccounts", newAccounts);
        } else if (newCount < currentAccounts.length) {
            // Remove extra accounts
            setFieldValue("pensionAccounts", currentAccounts.slice(0, newCount));
        }
    };

    const columns = [
        {
            title: "No#",
            dataIndex: "owner",
            key: "owner",
            width: 50,
        },
        {
            title: "Pension Benefits",
            dataIndex: "pensionBenefits",
            key: "pensionBenefits",
            type: "number-toComma-Modal",
            innerModalTitle: "_Pension Benefits",
            placeholder: "Pension Benefits",
            width: 210,
            validate: true,
            errorState: ShowError,
            func: (innerModalTitle, values, key, stakeHolder) =>
                handleInnerModal(
                    innerModalTitle,
                    "pensionBenefits", // This is the key that stores the array data
                    stakeHolder,
                    values,
                    "Pension Benefits",
                    `How many Pension Benefits do ${nameSet} have?`
                ),
            checkInput: CheckInputValue,
        },
        {
            title: "Pension Payment",
            dataIndex: "pensionPayment",
            key: "pensionPayment",
            type: "number-toComma",
            width: 180,
            placeholder: "Pension Payment",
        },
        {
            title: "Pension Type",
            dataIndex: "pensionType",
            key: "pensionType",
            type: "select",
            placeholder: "Pension Type",
            width: 230,
            options: [
                { value: "accountbasepension", label: "Account Base Pension" },
                { value: "TTR", label: "TTR" },
            ]
        },
        {
            title: "Nominated Beneficiaries",
            dataIndex: "nominatedBeneficiaries",
            key: "nominatedBeneficiaries",
            type: "yesnoModal",
            innerModalTitle: "_Beneficiaries",
            placeholder: "Beneficiaries",
            callBack: true,
            func: (innerModalTitle, values, key, stakeHolder) =>
                handleInnerModal(
                    innerModalTitle,
                    "beneficiaries", // This is the key that stores the array data
                    stakeHolder,
                    values,
                    "Beneficiaries",
                    `How many beneficiaries do ${nameSet} have?`
                ),
            customComponent: DynamicYesNo,
        },
    ];

    const ModalContent = (obj) => {
        if (obj.key === "pensionBenefits") {
            return <PensionBenefits />;
        } else if (obj.key === "beneficiaries") {
            return <Beneficiaries />;
        }
        return null;
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

                const dataRows = values.pensionAccounts?.map((item, index) => ({
                    key: `pensionAccounts.${index}`,
                    owner: index + 1,
                    stakeHolder: `pensionAccounts[${index}]`,
                    pensionBenefits: item.pensionBenefits || "",
                    pensionPayment: item.pensionPayment || "",
                    pensionType: item.pensionType || "",
                    nominatedBeneficiaries: item.nominatedBeneficiaries || "",
                })) || [];

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
                                    <div className="col-md-5">
                                        <p className="text-end mt-1">
                                            How many {props.modalObject.title} does{" "}
                                            {nameSet} have:
                                        </p>
                                    </div>
                                    <div className="col-md-2">
                                        {/* Using regular HTML select like InnerBareTrust */}
                                        <select
                                            id="NumberOfMap"
                                            name="NumberOfMap"
                                            className="form-select inputDesignDoubleInput w-100"
                                            onChange={(e) => handleInput(e, setFieldValue, values)}
                                            onBlur={handleBlur}
                                            value={values.NumberOfMap || ""}
                                        >
                                            <option value="">Select</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>

                                    {values.NumberOfMap && values.NumberOfMap > 0 && (
                                        <div className="mt-4 All_Client reportSection">
                                            <AntdTable
                                                columns={columns}
                                                data={dataRows}
                                                values={values}
                                                setFieldValue={setFieldValue}
                                                handleChange={handleChange}
                                                handleBlur={handleBlur}
                                                isEditing={props?.isEditing}
                                                setIsEditing={props?.setIsEditing}
                                                showError={ShowError}
                                                setShowError={setShowError}
                                            />
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

export default SmsfPensionAccount;