import React, { useEffect, useState } from 'react'
import DynamicTableRow from '../../Components/Assets/Dynamic/DynamicTableRow';
import { Form, Formik } from 'formik';
import { Row, Table } from 'react-bootstrap';

const NewPensionRollover = (props) => {

    let [disabledFlag, setDisabledFlag] = useState(true);
    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let initialValues = {
        commencePensionInYear: "",
        currentPensionDetails: "",
        totalSuperannuationBenefits: "",
        nominatedRolloverAmount: "",
        reversionaryPensionOption: "",
        nominatedPensionAmount: "",
        otherAmount: "",
        indexationPension: "",
        minimumPension: "",
        maximumPension: "",
    }

    let fillInitialValues = (setFieldValue) => {
        console.log(props.modalObject);
        if (props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]) {
            let SubObj = props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]
            if (SubObj[props.modalObject.key + "Obj"]) {
                let Data = SubObj[props.modalObject.key + "Obj"];
                setFieldValue("commencePensionInYear", Data.commencePensionInYear);
                setFieldValue("currentPensionDetails", Data.currentPensionDetails);
                setFieldValue("totalSuperannuationBenefits", Data.totalSuperannuationBenefits);
                setFieldValue("nominatedRolloverAmount", Data.nominatedRolloverAmount);
                setFieldValue("reversionaryPensionOption", Data.reversionaryPensionOption);
                setFieldValue("nominatedPensionAmount", Data.nominatedPensionAmount);
                setFieldValue("otherAmount", Data.otherAmount);
                setFieldValue("indexationPension", Data.indexationPension);
                setFieldValue("minimumPension", Data.minimumPension);
                setFieldValue("maximumPension", Data.maximumPension);
            }
        }
    }

    let onSubmit = (values) => {

        console.log(JSON.stringify(values));

        props.setFieldValue(props.modalObject.stakeHolder + props.modalObject.key + "Obj", values)

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    }

    const nominatedPensionAmountOptions = [
        { value: "Minimum", label: "Minimum", },
        { value: "Other", label: "Other", }
    ]

    let handleInnerModal = (title, values, key, stakeHolder) => {
        console.log(title, values, key, stakeHolder);
        setModalObject({
            title,
            values,
            key,
            stakeHolder: props.modalObject.stakeHolder,
        });
        setFlagState(true);
    };


    const indexation = Array.from({ length: 21 }, (_, i) => ({
        value: (i * 0.5).toFixed(2) + "%",
        label: (i * 0.5).toFixed(2) + "%",
    }));

    const commencePensionInYearOptions = Array.from({ length: 31 }, (_, i) => {
        if (i == 0) {
            return ({
                value: ("No").toString(),
                label: ("No ").toString(),
            })
        }
        else {

            return ({
                value: (i).toString(),
                label: ("Year " + (i)).toString(),
            })
        }
    });


    let rowConfig = [
        {
            type: "plainText",
            text: props.modalObject.stakeHolder.replace(".", ""),
            styleSet: { fontWeight: "800", fontSize: "16px" }
        },
        {
            name: "commencePensionInYear",
            type: "select",
            options: commencePensionInYearOptions,
            placeholder: "Commence Pension in year"
        },
        {
            name: "currentPensionDetails",
            type: "number-toComma",
            disabled: true,
            placeholder: "Current Pension Details"
        },
        {
            name: "totalSuperannuationBenefits",
            type: "number-toComma",
            disabled: true,
            placeholder: "Total Superannuation Benefits",
        },
        {
            name: "nominatedRolloverAmount",
            type: "number-toComma",
            placeholder: "Nominated Rollover Amount"
        },
        {
            name: "reversionaryPensionOption",
            type: "yesno",
            placeholder: "Reversionary Pension Option",
        },
        {
            name: "nominatedPensionAmount",
            type: "select",
            options: nominatedPensionAmountOptions,
            placeholder: "Nominated Pension Amount",

        },
        {
            name: "otherAmount",
            type: "number-toComma",
            placeholder: "Other Amount",
        },
        {
            name: "indexationPension",
            type: "select",
            options: indexation,
            placeholder: "Indexation of Pension",
        },
        {
            name: "minimumPension",
            type: "number-toComma",
            placeholder: "Minimum Pension",
            disabled: true,
        },
        {
            name: "maximumPension",
            type: "number-toComma",
            placeholder: "Maximum Pension",
            disabled: true,
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
                                                    <th>Commence Pension in year</th>
                                                    <th>Current Pension Details</th>
                                                    <th>Total Superannuation Benefits</th>
                                                    <th>Nominated Rollover Amount</th>
                                                    <th>Reversionary Pension Option</th>
                                                    <th>Nominated Pension Amount</th>
                                                    <th>Other Amount</th>
                                                    <th>Indexation of Pension</th>
                                                    <th>Minimum Pension</th>
                                                    <th>Maximum Pension</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <DynamicTableRow
                                                    rowConfig={rowConfig}
                                                    values={values}
                                                    setFieldValue={setFieldValue}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    handleInnerModal={handleInnerModal}
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

export default NewPensionRollover