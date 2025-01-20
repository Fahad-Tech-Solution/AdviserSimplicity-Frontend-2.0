import React, { useEffect, useState } from 'react';
import DynamicTableRow from '../../Components/Assets/Dynamic/DynamicTableRow';
import { Form, Formik } from 'formik';
import { Row, Table } from 'react-bootstrap';

const AssetValueOfCompany = (props) => {

    let [layoutSwitchFlag, setLayoutSwitchFlag] = useState(props.modalObject.title);

    let initialValues = {
        assetValue: "",
        includeFromYear: "1",
        upUntilYear: "30",
        expectedGrowthRate: "2.50%",
    }

    let fillInitialValues = (setFieldValue) => {
        // console.log(props.modalObject);
        if (props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]) {
            let SubObj = props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]
            if (SubObj[props.modalObject.key + "Obj"]) {
                let Data = SubObj[props.modalObject.key + "Obj"];
                setFieldValue("assetValue", Data.assetValue)
                setFieldValue("includeFromYear", Data.includeFromYear)
                setFieldValue("upUntilYear", Data.upUntilYear)
                if (props.modalObject.title === "Net Trust Distribution" && props.modalObject.sourceObj.title === "Bucket Company") {
                    setFieldValue("indexation", Data.indexation || "2.50%")
                }
                if (props.modalObject.title === "Net Trust Distribution" && props.modalObject.sourceObj.title === "Business as Trusts") {
                    setFieldValue("takeAsCashFromUntilYear", Data.takeAsCashFromUntilYear || "1")
                    setFieldValue("indexation", Data.indexation || "2.50%")
                } else {
                    setFieldValue("expectedGrowthRate", Data.expectedGrowthRate)
                }
            }
        }
    }

    let onSubmit = (values) => {

        console.log(values, props.modalObject.key, "values")

        props.setFieldValue(props.modalObject.stakeHolder + props.modalObject.key, values.assetValue)
        props.setFieldValue(props.modalObject.stakeHolder + props.modalObject.key + "Obj", values)

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    }

    const yearsArray = Array.from({ length: 30 }, (_, i) => {
        return ({
            value: (i + 1).toString(),
            label: ("Year " + (i + 1)).toString(),
        })
    });

    const indexation = Array.from({ length: 21 }, (_, i) => ({
        value: (i * 0.5).toFixed(2) + "%",
        label: (i * 0.5).toFixed(2) + "%",
    }));

    const [rowConfig, setRowConfig] = useState(() => {
        let OriginalArray = [
            {
                name: "assetValue",
                type: "number-toComma",
                placeholder: "Asset Value of Company"
            },
            {
                name: "includeFromYear",
                placeholder: "Include From Year",
                type: "select",
                options: yearsArray
            },
            {
                name: "upUntilYear",
                placeholder: "Up Until Year",
                type: "select",
                options: yearsArray
            },
            {
                name: "expectedGrowthRate",
                type: "number-toPercent",
                placeholder: "Expected Growth Rate"
            },
        ]

        if (layoutSwitchFlag === "Net Trust Distribution" && props.modalObject.sourceObj.title === "Business as Trusts") {
            // Pop expectedGrowthRate from the array
            OriginalArray.pop();

            // Add the following two fields
            OriginalArray.push(
                {
                    name: "takeAsCashFromUntilYear",
                    placeholder: "Take As Cash From Until Year",
                    type: "select",
                    options: yearsArray
                },
                {
                    name: "indexation",
                    type: "select",
                    placeholder: "Indexation",
                    options: indexation
                },
            );
        }


        if (props.modalObject.sourceObj.title === "Bucket Company") {
            // Find the index of the "upUntilYear" object
            const upUntilYearIndex = OriginalArray.findIndex(item => item.name === "upUntilYear");

            // Add the "indexation" object after the "upUntilYear" object
            if (upUntilYearIndex !== -1) {
                OriginalArray.splice(upUntilYearIndex + 1, 0, {
                    name: "indexation",
                    type: "select",
                    placeholder: "Indexation",
                    options: indexation
                });
            }
        }

        return OriginalArray;
    });



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
                                                    <th>{props.modalObject.title}</th>
                                                    <th>Include From Year</th>
                                                    <th>Up Until Year</th>
                                                    {(layoutSwitchFlag === "Net Trust Distribution" && props.modalObject.sourceObj.title === "Bucket Company") &&
                                                        <th>Indexation</th>
                                                    }
                                                    {layoutSwitchFlag === "Net Trust Distribution" && props.modalObject.sourceObj.title === "Business as Trusts" ?
                                                        <React.Fragment>
                                                            <th>Take As Cash From Until Year</th>
                                                            <th>Indexation</th>
                                                        </React.Fragment> :
                                                        <th>Expected Growth Rate</th>
                                                    }

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

export default AssetValueOfCompany;