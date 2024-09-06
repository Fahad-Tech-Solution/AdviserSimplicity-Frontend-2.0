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
            setFieldValue("Amount", Data.Amount)
            setFieldValue("SGPercentage", Data.SGPercentage)
            setFieldValue("GrossSalary", Data.GrossSalary)
            setFieldValue("SGC", Data.SGC)
            setFieldValue("salarySarificeContributions", Data.salarySarificeContributions)
            setFieldValue("afterTaxContributions", Data.afterTaxContributions)
        }
    };

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {

        console.log(values)

        let Obj = {
            remunerationType: values.remunerationType,
            Amount: values.Amount,
            SGPercentage: values.SGPercentage,
            GrossSalary: values.GrossSalary,
            SGC: values.SGC,
            salarySarificeContributions: values.salarySarificeContributions,
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
        let Amount = parseFloat(values.Amount.replace(/[^0-9.-]+/g, "")) || 0;
        let SGPercentage = parseFloat(values.SGPercentage.replace(/[^0-9.-]+/g, "")) || 0;
        
        let GrossSalary = values.GrossSalary;
        let SGC = values.SGC;

        switch (currentInput.name) {
            case "remunerationType":
                remunerationType = currentInput.value;
                break;
            case "Amount":
                Amount = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, ""));
                break;
            default:
                if (currentInput.value.replace(/[^0-9.-]+/g, "") > 100) {
                    SGPercentage = 100;
                }
                else {
                    SGPercentage = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, ""));
                }
                break;
        }

        if (remunerationType === "Gross Salary") {
            GrossSalary = Amount;
            SGC = (Amount * SGPercentage).toFixed(2);
        }
        else {
            GrossSalary = (Amount / SGPercentage).toFixed(2);
            SGC = (Amount - GrossSalary).toFixed(2);
        }

        console.log("FormulaSetting:", remunerationType, Amount, SGPercentage, GrossSalary, SGC);

        setFieldValue("GrossSalary", GrossSalary);
        setFieldValue("SGC", SGC);


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
                                                    <th>Amount	</th>
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
                                                            className="form-select inputDesign"
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
                                                            placeholder="Investment Code"
                                                            id={`Amount`}
                                                            name={`Amount`}
                                                            className="form-control inputDesign"
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
                                                            placeholder="Enter SG value"
                                                            id={`SGPercentage`}
                                                            name={`SGPercentage`}
                                                            className="form-control inputDesign"
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
                                                            id={`GrossSalary`}
                                                            name={`GrossSalary`}
                                                            className="form-control inputDesign"
                                                            disabled
                                                        />
                                                    </td>

                                                    <td style={{ minWidth: "100px" }}>
                                                        <Field
                                                            type="text"
                                                            placeholder="SGC"
                                                            id={`SGC`}
                                                            name={`SGC`}
                                                            className="form-control inputDesign"
                                                            disabled
                                                        />
                                                    </td>
                                                    <td style={{ minWidth: "100px" }}>
                                                        <Field
                                                            type="text"
                                                            placeholder="Salary Sarifice Contributions"
                                                            id={`salarySarificeContributions`}
                                                            name={`salarySarificeContributions`}
                                                            className="form-control inputDesign"
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
                                                            className="form-control inputDesign"
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
