import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { BankDetail, defaultUrl, QuestionDetail } from "../../../Store/Store";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import InnerModal from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";

const CashFlowTotalCost = (props) => {
    let initialValues = {

    };
    let questionDetail = useRecoilValue(QuestionDetail);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});
    let bankDetailObj = useRecoilValue(BankDetail);

    let familyHome =
    Object.keys(questionDetail.familyHome || {}).length > 0
      ? questionDetail.familyHome
      : {
          client: [],
          partner: [],
          joint: [],
        };


    const fillInitialValues = (setFieldValue) => {
        console.log(props.modalObject, "kuch Chala");
        console.log("familyHome ", familyHome)
        setFieldValue(`costBaseExisting`, familyHome.costBase);
        
    };


    let onSubmit = async (values) => {
        console.log("values", values);

return
        props.setFieldValue(`TotalCostModal`, values);
        props.setFieldValue(`loanAmount`, values.loanBalance);
        props.setFieldValue(`annualRepayments`, values.annualRepayments);

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    };

    const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
        value: (i + 1).toString(),
        label: ("Year " + (i + 1)).toString(),
    }));

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
            name: "stampDuty",
            type: "select",
            styleSet: { width: "150px" },
            options: [
                { value: "Standard Rates", label: "Standard Rates" },
                { value: "FH Buyer", label: "P&FH Buyer" },
                { value: "Manual", label: "Manual" },
            ],
        },

        {
            name: "stampDuty",
            type: 'yesno',
           
        },
        {
            name: "otherPurchaseCosts",
            type: 'number-toComma',
            placeholder: "Other Purchase Costs",

        },
        {
            name: "costBaseExisting",
            type: 'number-toComma',
            placeholder: "Cost Base (Existing)",

        },
   
        {
            name: "totalCostBase",
            type: 'number-toComma',
            placeholder: "Total Cost Base",
        },
        
    ];

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({ values, handleChange, setFieldValue, handleBlur }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, [values.NumberOfMap]);

                return (
                    <Form>
                             <InnerModal
                                        modalObject={modalObject}
                                        setFieldValue={setFieldValue}
                                        setFlagState={setFlagState}
                                        flagState={flagState}
                                    >
                                        
                                    </InnerModal>
                        <Row>
                            <div className="col-md-12">
                                <div className="row justify-content-center">
                                    <div className="mt-4">
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                 
                                                    <th>Stamp Duty</th>
                                                    <th>Stamp Duty Calculation</th>
                                                    <th>Other Purchase Costs</th>
                                                    <th>Cost Base (Existing)</th>
                                                    <th>Total Cost Base</th>
                                                   
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
export default CashFlowTotalCost;