import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CreatableMultiSelectField } from "../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import {
    openNotificationSuccess,
    RenderName,
} from "../../Components/Assets/Api/Api";
import { Row, Table } from "react-bootstrap";
import { defaultUrl, QuestionDetail } from "../../Store/Store";
import { useRecoilValue } from "recoil";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import InputOverride from "./InputOverride";
import RegularContributions from "./RegularContributions";

const CashFlowCashBankDetails = (props) => {



    /*
       This component is a dynamic and reusable modal component designed to handle the following modal types:
       1. "Cash"
       2. "Term Deposits"
       3. "Investment Bonds"
   
       TODO-IMPORTANT:
       - Ensure any changes to this component are planned carefully to avoid unintended effects on all supported modals.
       - If specific modifications are required for one modal type, consider implementing targeted logic or extensions 
         to maintain the integrity of the shared functionality.
   */


    let layoutSwitchArray = ["Term Deposits", "Investment Bonds"];

    let [layoutSwitchFlag, setLayoutSwitchFlag] = useState(() => {
        if (layoutSwitchArray.includes(props.modalObject.title)) {
            return true
        }
        return false
    })

    let [layoutSwitchFlag2, setLayoutSwitchFlag2] = useState(() => {
        if (props.modalObject.title === "Investment Bonds") {
            return true
        }
        return false
    })

    let questionDetail = useRecoilValue(QuestionDetail);

    let [UserStatus] = useState(localStorage.getItem("UserStatus"));
    let DefaultUrl = useRecoilValue(defaultUrl);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let incomeFromOverseasPension =
        Object.keys(questionDetail.incomeFromOverseasPension || {}).length > 0
            ? questionDetail.incomeFromOverseasPension
            : {
                client: [],
                partner: [],
                joint: [],
            }; // Use an empty object as default if incomeFromOverseasPension is undefined

    let initialValues = {
        owner: [],
        client: {
            InvestmentReturns: "",
        },
        partner: {
            InvestmentReturns: "",
        },
        joint: {
            InvestmentReturns: "",
        }
    };

    const fillInitialValues = (setFieldValue) => {
        console.log(incomeFromOverseasPension, "data");
        if (incomeFromOverseasPension && incomeFromOverseasPension._id) {
            setFieldValue(`owner`, incomeFromOverseasPension.owner || "");

            // Handle client-related conditions
            if (incomeFromOverseasPension.owner.includes("client")) {
                if (
                    incomeFromOverseasPension?.client &&
                    Object.keys(incomeFromOverseasPension.client).length
                ) {
                    setFieldValue(
                        `client.otherTaxableIncome`,
                        incomeFromOverseasPension.client.regularIncomePA || ""
                    );

                    setFieldValue(`client.includeFromYear`, 1);
                    setFieldValue(`client.upUntillYear`, 30);
                    setFieldValue(`client.indexation`, "2.50%");
                }


            }

            // Handle partner-related conditions
            if (
                UserStatus === "Married" &&
                incomeFromOverseasPension.owner.includes("partner")
            ) {
                if (
                    incomeFromOverseasPension?.partner &&
                    Object.keys(incomeFromOverseasPension.partner).length
                ) {
                    setFieldValue(
                        `partner.regularIncomePA`,
                        incomeFromOverseasPension.partner.regularIncomePA || ""
                    );
                    setFieldValue(`partner.includeFromYear`, 1);
                    setFieldValue(`partner.upUntillYear`, 30);
                    setFieldValue(`partner.indexation`, "2.50%");
                }
            }
        }
    };

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
            stakeHolder
        });
        setFlagState(true);
    };

    const options =
        UserStatus !== "Single"
            ? [
                { value: "client", label: RenderName("client") },
                { value: "partner", label: RenderName("partner") },
                { value: "joint", label: RenderName("joint") },
            ]
            : [{ value: "client", label: RenderName("client") }];

    const loanTermOptions = Array.from({ length: 31 }, (_, i) => {
        if (i === 0) {
            return ({
                value: "No",
                label: "No",
            })
        }
        else {
            return ({
                value: (i).toString(),
                label: ("Year " + (i)).toString(),
            })
        }
    });

    let InvestmentReturnsOptions = [
        { value: "system", label: "System" },
        { value: "input Override", label: "Input Override" },
    ]

    let RiskProfileOptions = [
        { value: "Conservative", label: "Conservative" },
        { value: "Moderately Conservative", label: "Moderately Conservative" },
        { value: "Balanced", label: "Balanced" },
        { value: "Growth", label: "Growth" },
        { value: "High Growth", label: "High Growth" },
        { value: "Cash", label: "Cash" },
        { value: "International Shares", label: "International Shares" },
        { value: "Property", label: "Property" },
        { value: "Australian Fixed Interest", label: "Australian Fixed Interest" },
        { value: "International Fixed Interest", label: "International Fixed Interest" },
        { value: "Other", label: "Other" },
        { value: "Australian Shares", label: "Australian Shares" },
    ]

    const [rowConfigClient, setRowConfigClient] = useState(() => createInitialRowConfig(true));
    const [rowConfigPartner, setRowConfigPartner] = useState(() => createInitialRowConfig(true));
    const [rowConfigJoint, setRowConfigJoint] = useState(() => createInitialRowConfig(true));

    function createInitialRowConfig(isDisabled) {
        let inputArray = [
            {
                name: "CurrentBalance",
                type: "number-toComma",
                placeholder: "Current Balance",
            },
            {
                name: "CostBase",
                type: "number-toComma",
                placeholder: "Cost Base",
            },
            {
                name: "InvestmentReturns",
                type: "select",
                placeholder: "Investment Returns",
                options: InvestmentReturnsOptions,
                callBack: true,
                func: AddExtraInput,
            },
            {
                name: layoutSwitchFlag2 ? "EarningsRate" : "IncomeYield",
                type: layoutSwitchFlag2 ? "number-toPercent" : "number-toComma",
                placeholder: layoutSwitchFlag2 ? "Earnings Rate" : "Income Yield",
                disabled: isDisabled, // Configurable based on the initial state
            },
            {
                name: "ReinvestIncome",
                type: "yesno",
                placeholder: "Reinvest income",
            },
            {
                name: "RegularContributions",
                type: "yesnoModal",
                placeholder: "Regular Contributions",
                callBack: true,
                key: "RegularContributions",
                innerModalTitle: "Regular Contributions",
                func: handleInnerModal,
            },
            {
                name: "RiskProfile",
                type: "select",
                placeholder: "Risk Profile",
                options: RiskProfileOptions,
            },
        ];


        if (layoutSwitchFlag2) {
            inputArray.push(
                {
                    name: "InvestmentFees",
                    type: "number-toPercent",
                    placeholder: "Investment Fees",
                }
            )
        }


        if (layoutSwitchFlag) {
            inputArray.push(
                {
                    name: "CashOutYear",
                    type: "select",
                    placeholder: "Cashout Year",
                    options: loanTermOptions,
                },
            )
        }


        return inputArray
    }

    function updateRowConfig(stakeHolder, isDisabled) {
        const updatedConfig = createInitialRowConfig(isDisabled);
        if (stakeHolder === "client.") setRowConfigClient(updatedConfig);
        if (stakeHolder === "partner.") setRowConfigPartner(updatedConfig);
        if (stakeHolder === "joint.") setRowConfigJoint(updatedConfig);
    }

    // Modify AddExtraInput to update specific configurations
    function AddExtraInput(values, setFieldValue, currentInput, stakeHolder) {
        const isDisabled = currentInput.value === "";
        if (isDisabled) {
            let inputName = layoutSwitchFlag2 ? "EarningsRate" : "IncomeYield"
            setFieldValue(stakeHolder + inputName, "")
        }
        updateRowConfig(stakeHolder, isDisabled);
    }

    const componentMapping = {
        "Regular Contributions": <RegularContributions />,
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
                                                <th>Current Balance</th>
                                                <th>Cost Base</th>
                                                <th>Investment Returns</th>
                                                <th>{layoutSwitchFlag2 ? "Earnings Rate" : "Income Yield"}</th>
                                                <th>Reinvest income</th>
                                                <th>Regular Contributions</th>
                                                <th>Risk Profile/SAA</th>
                                                {layoutSwitchFlag2 && <th>Investment Fees</th>}
                                                {layoutSwitchFlag && <th>Cashout in Year</th>}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {values.owner.includes("client") && (
                                                <DynamicTableRow
                                                    rowConfig={rowConfigClient}
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
                                                        rowConfig={rowConfigPartner}
                                                        values={values}
                                                        setFieldValue={setFieldValue}
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        handleInnerModal={handleInnerModal}
                                                        stakeHolder="partner."
                                                    />
                                                )}

                                            {values.owner.includes("joint") &&
                                                UserStatus === "Married" && (
                                                    <DynamicTableRow
                                                        rowConfig={rowConfigJoint}
                                                        values={values}
                                                        setFieldValue={setFieldValue}
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        handleInnerModal={handleInnerModal}
                                                        stakeHolder="joint."
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

export default CashFlowCashBankDetails;
