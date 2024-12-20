import React, { useEffect, useState } from 'react';
import DynamicTableRow from '../../Components/Assets/Dynamic/DynamicTableRow';
import { Form, Formik } from 'formik';
import { Row, Table } from 'react-bootstrap';
import InnerModal from '../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal';

const CFSMSFAccumulationDetails = (props) => {

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let initialValues = {
        totalFundNetAssetValue: "",
        percentageOfFundForMember: "",
        actualValueToMember: "",
        taxFreeComponent: "",
        taxableComponent: "",
    }

    let fillInitialValues = (setFieldValue) => {
        if (props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]) {
            let SubObj = props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]
            if (SubObj[props.modalObject.key + "Obj"]) {
                let Data = SubObj[props.modalObject.key + "Obj"];
                setFieldValue("totalFundNetAssetValue", Data.totalFundNetAssetValue);
                setFieldValue("percentageOfFundForMember", Data.percentageOfFundForMember);
                setFieldValue("actualValueToMember", Data.actualValueToMember);
                setFieldValue("taxFreeComponent", Data.taxFreeComponent);
                setFieldValue("taxableComponent", Data.taxableComponent);
            }
        }
    }

    let onSubmit = (values) => {
        props.setFieldValue(props.modalObject.stakeHolder + props.modalObject.key + "Obj", values)

        if (props.flagState) {
            props.setFlagState(false);
        }
    }

    let rowConfig = [
        {
            type: "plainText",
            text: props.modalObject.stakeHolder.replace(".", ""),
            styleSet: { fontWeight: "800", fontSize: "16px" }
        },
        {
            name: "totalFundNetAssetValue",
            type: "number-toComma",
            placeholder: "Total Fund Net Asset Value",
            disabled: true
        },
        {
            name: "percentageOfFundForMember",
            type: "number-toPercent",
            placeholder: "% of Fund For Member"
        },
        {
            name: "actualValueToMember",
            type: "number-toComma",
            placeholder: "Actual Value to Member",
            disabled: true
        },
        {
            name: "taxFreeComponent",
            type: "number-toComma",
            placeholder: "Tax-Free Component"
        },
        {
            name: "taxableComponent",
            type: "number-toComma",
            placeholder: "Taxable Component",
            disabled: true
        },
    ]

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
                }, []);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12" >
                                <div className="row justify-content-center">
                                    <div className="mt-4">
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Owner</th>
                                                    <th>Total Fund Net Asset Value</th>
                                                    <th>% of Fund For Member</th>
                                                    <th>Actual Value to Member</th>
                                                    <th>Tax-Free Component</th>
                                                    <th>Taxable Component</th>
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
    )
}

export default CFSMSFAccumulationDetails;