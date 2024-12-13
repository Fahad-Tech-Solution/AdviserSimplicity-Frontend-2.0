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
import BalanceComponents from "./BalanceComponents";
import InsurancePremiums from "./InsurancePremiums";
import RolloverFunds from "./RolloverFunds";
import ConcessionalContributions from "./ConcessionalContributions";
import NonConcessionalContributions from "./NonConcessionalContributions";
import Withdrawals from "./Withdrawals";

const CFSuperFund = (props) => {

    let questionDetail = useRecoilValue(QuestionDetail);

    let [UserStatus] = useState(localStorage.getItem("UserStatus"));
    let DefaultUrl = useRecoilValue(defaultUrl);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});


    let layoutSwitchArray = ["Platform Investment", "Other Investments"]

    let [layoutSwitchFlag, setLayoutSwitchFlag] = useState(() => {
        if (layoutSwitchArray.includes(props.modalObject.title)) {
            return true
        }
        return false
    })



    let superAnnuationIssues = Object.keys(questionDetail.superAnnuationIssues || {}).length > 0 ? questionDetail.superAnnuationIssues : {
        client: [],
        partner: [],
        joint: [],

    };  // Use an empty object as default if superAnnuationIssues is undefined

    let initialValues = {
        owner: [],
    };

    const fillInitialValues = (setFieldValue) => {
        // console.log(superAnnuationIssues, "data");
        // if (superAnnuationIssues && superAnnuationIssues._id) {
        //     setFieldValue(`owner`, superAnnuationIssues.owner || "");

        //     // Handle client-related conditions
        //     if (superAnnuationIssues.owner.includes("client")) {
        //         if (
        //             superAnnuationIssues?.client &&
        //             Object.keys(superAnnuationIssues.client).length
        //         ) {
        //             setFieldValue(
        //                 `client.otherTaxableIncome`,
        //                 superAnnuationIssues.client.regularIncomePA || ""
        //             );

        //             setFieldValue(`client.includeFromYear`, 1);
        //             setFieldValue(`client.upUntillYear`, 30);
        //             setFieldValue(`client.indexation`, "2.50%");
        //         }


        //     }

        //     // Handle partner-related conditions
        //     if (
        //         UserStatus === "Married" &&
        //         superAnnuationIssues.owner.includes("partner")
        //     ) {
        //         if (
        //             superAnnuationIssues?.partner &&
        //             Object.keys(superAnnuationIssues.partner).length
        //         ) {
        //             setFieldValue(
        //                 `partner.regularIncomePA`,
        //                 superAnnuationIssues.partner.regularIncomePA || ""
        //             );
        //             setFieldValue(`partner.includeFromYear`, 1);
        //             setFieldValue(`partner.upUntillYear`, 30);
        //             setFieldValue(`partner.indexation`, "2.50%");
        //         }
        //     }
        // }
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
        const bankAccountArray = superAnnuationIssues.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(
                    `${DefaultUrl}/api/superAnnuationIssues/Add`,
                    obj
                );
            } else {
                res = await PatchAxios(
                    `${DefaultUrl}/api/superAnnuationIssues/Update`,
                    obj
                );
            }

            if (res) {
                console.log(res);
                const updatedData = {
                    ...questionDetail,
                    superAnnuationIssues: res,
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
        console.log(title, values, key, stakeHolder);
        setModalObject({
            title,
            values,
            key,
            stakeHolder,
            DiscoveryObj: superAnnuationIssues,
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

    let riskProfileOptions = [
        { value: "Conservative", label: "Conservative" },
        { value: "Moderately Conservative", label: "Moderately Conservative" },
        { value: "Balanced", label: "Balanced" },
        { value: "Growth", label: "Growth" },
        { value: "High Growth", label: "High Growth" },
        { value: "International Shares", label: "International Shares" },
        { value: "Property", label: "Property" },
        { value: "Australian Fixed Interest", label: "Australian Fixed Interest" },
        { value: "International Fixed Interest", label: "International Fixed Interest" },
        { value: "Other", label: "Other" },
        { value: "Australian Shares", label: "Australian Shares" },
    ]

    let InvestmentReturnsOptions = [
        { value: "system", label: "System" },
        { value: "input Override", label: "Input Override" },
    ]

    const [rowConfig, setRowConfig] = useState(() => {
        let OriginalArray = [
            {
                name: "balanceComponents",
                type: "number-toComma-Modal",
                placeholder: "Balance & Components",
                callBack: true,
                innerModalTitle: "Balance & Components",
                key: "balanceComponents",
                func: handleInnerModal,
            },
            {
                name: "riskProfile",
                type: "select",
                options: riskProfileOptions,

            },
            {
                name: "investmentReturns",
                type: "selectModal",
                placeholder: "Investment Returns",
                options: InvestmentReturnsOptions,
                ModalOption: "input Override",
                innerModalTitle: "Input Override",
                key: "investmentReturns",
            },
            {
                name: "investmentFees",
                type: "number-toPercent",
                placeholder: "Investment Fees %",
            },
            {
                name: "adviserServiceFee",
                type: "number-toComma",
                placeholder: "Adviser Service Fee",
            },
            {
                name: "insurancePremiums",
                type: "yesnoModal",
                placeholder: "Insurance Premiums",
                callBack: true,
                key: "insurancePremiums",
                innerModalTitle: "Insurance Premiums",
                func: handleInnerModal,
            },
            {
                name: "rolloverFunds",
                type: "yesnoModal",
                placeholder: "Rollover Funds",
                callBack: true,
                key: "rolloverFunds",
                innerModalTitle: "Rollover Funds",
                func: handleInnerModal,
            },
            {
                name: "concessionalContributions",
                type: "yesnoModal",
                placeholder: "Concessional Contributions",
                callBack: true,
                key: "concessionalContributions",
                innerModalTitle: "Concessional Contributions",
                func: handleInnerModal,
            },
            {
                name: "nonConcessionalContributions",
                type: "yesnoModal",
                placeholder: "Non Concessional Contributions",
                callBack: true,
                key: "nonConcessionalContributions",
                innerModalTitle: "Non Concessional Contributions",
                func: handleInnerModal,
            },
            {
                name: "withdrawals",
                type: "yesnoModal",
                placeholder: "Withdrawals",
                callBack: true,
                key: "withdrawals",
                innerModalTitle: "Withdrawals",
                func: handleInnerModal,
            },
        ];

        if (layoutSwitchArray.includes(props.modalObject.title)) {
            // Create the new object
            const newObject = {
                name: "InvestmentFees",
                type: "number-toPercent",
                placeholder: "Investment Fees",
            };

            // Find the index of the "CashOutFunds" object
            const CashOutFundsIndex = OriginalArray.findIndex(
                (item) => item.name === "CashOutFunds"
            );

            // Insert the new object before "CashOutFunds"
            if (CashOutFundsIndex !== -1) {
                OriginalArray.splice(CashOutFundsIndex, 0, newObject);
            }
        }

        return OriginalArray;
    });

    const componentMapping = {
        "Balance & Components": <BalanceComponents />,
        "Input Override": <InputOverride />,
        "Insurance Premiums": <InsurancePremiums />,
        "Rollover Funds": <RolloverFunds />,
        "Concessional Contributions": <ConcessionalContributions />,
        "Non Concessional Contributions": <NonConcessionalContributions />,
        "Withdrawals": <Withdrawals />,
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
                                                <th>Balance & Components</th>
                                                <th>Risk Profile</th>
                                                <th>Investment Returns</th>
                                                <th>Investment Fees %</th>
                                                <th>Adviser Service Fee ($)</th>
                                                <th>Insurance Premiums</th>
                                                <th>Rollover Funds</th>
                                                <th>Concessional Contributions</th>
                                                <th>Non Concessional Contributions</th>
                                                <th>Withdrawals</th>
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

export default CFSuperFund;
