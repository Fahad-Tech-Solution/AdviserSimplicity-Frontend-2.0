import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { toCommaAndDollar, toPersentage } from '../../Assets/Api/Api';

const SalaryPackage = (props) => {

    let { title, key, parentValues, parentKey } = props.modalObject;

    let initialValues = {}

    const fillInitialValues = (setFieldValue) => {
        // if (parentValues._id && parentValues?.key) {
        console.log(JSON.stringify(parentValues));
        if (parentValues?.[`${parentKey}`]?.[`${key}`] && Object.keys(parentValues?.[`${parentKey}`]?.[`${key}`]).length > 0) {
            let Data = parentValues[`${parentKey}`][`${key}`];
            console.log("incondition", JSON.stringify(Data));
            setFieldValue("remunerationType", Data.remunerationType)
            setFieldValue("amount", Data.amount)
            setFieldValue("SG", Data.SG)
            setFieldValue("grossSalary", Data.grossSalary)
            setFieldValue("SGC", Data.SGC)
            setFieldValue("salarySacrificeContributions", Data.salarySacrificeContributions)
            setFieldValue("afterTaxContributions", Data.afterTaxContributions)
        }
    };

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {

        console.log(values)

        let Obj = {
            remunerationType: values.remunerationType,
            amount: values.amount,
            SG: values.SG,
            grossSalary: values.grossSalary,
            SGC: values.SGC,
            salarySacrificeContributions: values.salarySacrificeContributions,
            afterTaxContributions: values.afterTaxContributions,
        }

        props.setFieldValue(`${parentKey}.${key}`, Obj);

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    };

    let FormulaSetting = (currentInput, values, setFieldValue) => {

        let remunerationType = values.remunerationType;
        let amount = parseFloat(values.amount.replace(/[^0-9.-]+/g, "")) || 0;
        let SG = parseFloat(values.SG.replace(/[^0-9.-]+/g, "")) || 0;

        let grossSalary = values.grossSalary;
        let SGC = values.SGC;

        switch (currentInput.name) {
            case "remunerationType":
                remunerationType = currentInput.value;
                break;
            case "amount":
                amount = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, ""));
                break;
            default:
                if (currentInput.value.replace(/[^0-9.-]+/g, "") > 100) {
                    SG = 100;
                }
                else {
                    SG = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, ""));
                }
                break;
        }

        if (remunerationType === "Gross Salary") {
            grossSalary = amount || 0;
            SGC = (amount * (SG / 100)).toFixed(2) || 0;
        }
        else {

            grossSalary = (amount / (1 + (SG / 100))).toFixed(2) || 0;
            SGC = (amount - grossSalary).toFixed(2) || 0;
        }

        console.log("FormulaSetting:", remunerationType, amount, SG, grossSalary, SGC);

        if (remunerationType === "Gross Salary") {
            setFieldValue("grossSalary", toCommaAndDollar(grossSalary) || "0$");
            setFieldValue("SGC", parseFloat(SGC).toFixed(2) + "%" || "0%");
        }
        else {
            setFieldValue("grossSalary", toCommaAndDollar(grossSalary) || "0$");
            setFieldValue("SGC", parseFloat(SGC).toFixed(2) + "%" || "0%");
        }
    }




    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({ values, handleChange, setFieldValue }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, [values.NumberOfMap]);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='mt-4'>
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Remuneration Type</th>
                                                    <th>amount	</th>
                                                    <th>SG</th>
                                                    <th>Gross Salary</th>
                                                    <th>SGC	</th>
                                                    <th>Salary Sarifice Contributions	</th>
                                                    <th>After Tax Contributions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <Field
                                                            as="select"
                                                            id={`remunerationType`}
                                                            name={`remunerationType`}
                                                            className="form-select inputDesignDoubleInput"
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                FormulaSetting(e.target, values, setFieldValue);
                                                            }}
                                                        >
                                                            <option value={""}>Select</option>
                                                            <option value={"Gross Salary"}>Gross Salary</option>
                                                            <option value={"Total Package"}>Total Package</option>

                                                        </Field>
                                                    </td>
                                                    <td style={{ minWidth: "100px" }}>
                                                        <Field
                                                            type="text"
                                                            placeholder="Amount Code"
                                                            id={`amount`}
                                                            name={`amount`}
                                                            className="form-control inputDesignDoubleInput"
                                                            onChange={(e) => {
                                                                setFieldValue(e.target.name,
                                                                    toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                FormulaSetting(e.target, values, setFieldValue);
                                                            }}
                                                        />
                                                    </td>
                                                    <td style={{ minWidth: "100px" }}>
                                                        <Field
                                                            type="text"
                                                            placeholder="Enter SG Percentage value"
                                                            id={`SG`}
                                                            name={`SG`}
                                                            className="form-control inputDesignDoubleInput"
                                                            onChange={(e) => {

                                                                if (e.target.value.replace(/[^0-9.-]+/g, "") > 100) {
                                                                    setFieldValue(e.target.name,
                                                                        toPersentage(100));
                                                                }
                                                                else {
                                                                    setFieldValue(e.target.name,
                                                                        toPersentage(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                }
                                                                FormulaSetting(e.target, values, setFieldValue);
                                                            }}
                                                        />
                                                    </td>

                                                    <td style={{ minWidth: "100px" }}>
                                                        <Field
                                                            type="text"
                                                            placeholder="Gross Salary"
                                                            id={`grossSalary`}
                                                            name={`grossSalary`}
                                                            className="form-control inputDesignDoubleInput"
                                                            disabled
                                                        />
                                                    </td>

                                                    <td style={{ minWidth: "100px" }}>
                                                        <Field
                                                            type="text"
                                                            placeholder="SGC"
                                                            id={`SGC`}
                                                            name={`SGC`}
                                                            className="form-control inputDesignDoubleInput"
                                                            disabled
                                                        />
                                                    </td>
                                                    <td style={{ minWidth: "100px" }}>
                                                        <Field
                                                            type="text"
                                                            placeholder="Salary Sarifice Contributions"
                                                            id={`salarySacrificeContributions`}
                                                            name={`salarySacrificeContributions`}
                                                            className="form-control inputDesignDoubleInput"
                                                            onChange={(e) => {
                                                                setFieldValue(e.target.name,
                                                                    toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Field
                                                            type="text"
                                                            placeholder="After Tax Contributions"
                                                            id={`afterTaxContributions`}
                                                            name={`afterTaxContributions`}
                                                            className="form-control inputDesignDoubleInput"
                                                            onChange={(e) => {
                                                                setFieldValue(e.target.name,
                                                                    toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
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

export default SalaryPackage;
