import React, { useEffect, useState } from 'react'
import DynamicTableRow from '../../Components/Assets/Dynamic/DynamicTableRow';
import { Form, Formik } from 'formik';
import { Row, Table } from 'react-bootstrap';
import { toCommaAndDollar } from '../../Components/Assets/Api/Api';

const InsurancePremiums = (props) => {

    let initialValues = {
        insurancePremiums: "",
        yearsInclude: "",
        indexationPremiums: "",
    }

    let [doubleRowFLag, setDoubleRowFlag] = useState(false);


    let fillInitialValues = (setFieldValue) => {
        let Double = false;
        let DiscoveryObj = props.modalObject.DiscoveryObj;
        let totalOfInsurancePremiums = "";

        if (DiscoveryObj[props.modalObject.stakeHolder.replace(".", "")]) {
            let DiscoveryObjArray = DiscoveryObj[props.modalObject.stakeHolder.replace(".", "")];


            totalOfInsurancePremiums = DiscoveryObjArray.reduce((total, entry) => total + parseFloat((entry.groupInsuranceArray.lifeCover).replace(/[^0-9.-]+/g, "")) + parseFloat((entry.groupInsuranceArray.TPDCover).replace(/[^0-9.-]+/g, "")) + parseFloat((entry.groupInsuranceArray.cost).replace(/[^0-9.-]+/g, "")) + parseFloat((entry.groupInsuranceArray.cost2).replace(/[^0-9.-]+/g, "")), 0);

            console.log(totalOfInsurancePremiums, "Fataksa ");

            setFieldValue("insurancePremiums", toCommaAndDollar(totalOfInsurancePremiums));
            // alert(DiscoveryObjArray.length)
            if (DiscoveryObjArray.length > 1) {
                Double = true;
                setFieldValue("insurancePremiums1", toCommaAndDollar(totalOfInsurancePremiums));
                setDoubleRowFlag(Double);
            }
        }

        if (props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]) {
            let SubObj = props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")];
            if (SubObj[props.modalObject.key + "Obj"]) {
                let Data = SubObj[props.modalObject.key + "Obj"];
                setFieldValue("insurancePremiums", Data.insurancePremiums || toCommaAndDollar(totalOfInsurancePremiums));
                setFieldValue("yearsInclude", Data.yearsInclude);
                setFieldValue("indexationPremiums", Data.indexationPremiums);

                if (Double) {
                    setFieldValue("insurancePremiums1", Data.insurancePremiums1 || toCommaAndDollar(totalOfInsurancePremiums));
                    setFieldValue("yearsInclude1", Data.yearsInclude1);
                    setFieldValue("indexationPremiums1", Data.indexationPremiums1);
                }
            }
        }
    }

    let onSubmit = (values) => {
        props.setFieldValue(props.modalObject.stakeHolder + props.modalObject.key + "Obj", values)

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    }

    const yearsIncludedArray = Array.from({ length: 31 }, (_, i) => {
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

    const indexation = Array.from({ length: 21 }, (_, i) => ({
        value: (i * 0.5).toFixed(2) + "%",
        label: (i * 0.5).toFixed(2) + "%",
    }));

    let rowConfig = [
        {
            name: "index",
            type: "plainText2.0",
            value: "Fund 1",
            styleSet: { fontWeight: "800", fontSize: "16px" }
        },
        {
            name: "insurancePremiums",
            type: "number-toComma",
            placeholder: "Insurance Premiums",
            styleSet: { width: "11vw" }
        },
        {
            name: "yearsInclude",
            type: "select",
            options: yearsIncludedArray,
        },
        {
            name: "indexationPremiums",
            type: "select",
            options: indexation,
        },
    ]

    let rowConfig1 = [
        {
            name: "index",
            type: "plainText2.0",
            value: "Fund 2",
            styleSet: { fontWeight: "800", fontSize: "16px" }
        },
        {
            name: "insurancePremiums1",
            type: "number-toComma",
            placeholder: "Insurance Premiums",
        },
        {
            name: "yearsInclude1",
            type: "select",
            options: yearsIncludedArray,
        },
        {
            name: "indexationPremiums1",
            type: "select",
            options: indexation,
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
                                                    <th>Fund</th>
                                                    <th>Insurance Premiums</th>
                                                    <th>Years to Include</th>
                                                    <th>Indexation of Premiums</th>
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
                                                {doubleRowFLag &&
                                                    <DynamicTableRow
                                                        rowConfig={rowConfig1}
                                                        values={values}
                                                        setFieldValue={setFieldValue}
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                    />}
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

export default InsurancePremiums