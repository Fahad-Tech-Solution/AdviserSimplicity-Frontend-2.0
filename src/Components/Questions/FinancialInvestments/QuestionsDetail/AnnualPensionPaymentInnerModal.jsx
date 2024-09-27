import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { defaultUrl, } from '../../../../Store/Store';
import DatePicker from 'react-datepicker';
import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, toCommaAndDollar, toPercentage } from '../../../Assets/Api/Api';

const AnnualPensionPaymentInnerModal = (props) => {


    let initialValues = {  };

    const [dynamicFields, setDynamicFields] = useState([""]);

    const fillInitialValues = (setFieldValue, loopValue) => {

        if (props.modalObject.editArray) {
            props.modalObject.editArray.forEach((data, i) => {
                if (data) {
                    setFieldValue(`regularAmount${i}`, data.regularAmount || '');
                    setFieldValue(`frequency${i}`, data.frequency || '');
                    setFieldValue(`total${i}`, data.total || '');
                }

            });
        }

    };


    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {

        console.log(values)

        const newEntries = [];

        let loopLength = parseFloat(1)

        // Iterate through each map entry and create a new object
        for (let i = 0; i < loopLength; i++) {
            // alert("loop chala")
            const newEntry = {
                regularAmount: values[`regularAmount${i}`] || "",
                frequency: values[`frequency${i}`] || "",
                total: values[`total${i}`] || "",
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);
        let total = newEntries.reduce((total, entry) => total + (parseFloat(entry.total.replace(/[^0-9.-]+/g, "")) || 0), 0);

        props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, newEntries)

        props.setFieldValue(`${props.modalObject.mainKey}${props.modalObject.index}`, toCommaAndDollar(total))

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    };

    let FormulaSetting = (values, setFieldValue, currentInput, index) => {

        let regularAmount = parseFloat((values[`regularAmount${index}`] || 0).replace(/[^0-9.-]+/g, "")) || 0;
        let frequency = values[`frequency${index}`] || 0;
        let total = 0;

        switch (currentInput.name) {
            case `regularAmount${index}`:
                regularAmount = parseFloat((currentInput.value || 0).replace(/[^0-9.-]+/g, "")) || 0
                break;
            case `frequency${index}`:
                frequency = parseFloat((currentInput.value || 0).replace(/[^0-9.-]+/g, "")) || 0
                break;
            default:
                console.log("no input")
                break;
        }

        total = regularAmount * frequency

        setFieldValue(`total${index}`, toCommaAndDollar(total))

    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({ values, handleChange, setFieldValue, handleBlur }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue, values.NumberOfMap);
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
                                                    <th>No#</th>
                                                    <th>Regular amount</th>
                                                    <th>Frequency</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dynamicFields.map((elem, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{1 + i}</td>

                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Regular amount"
                                                                    id={`regularAmount${i}`}
                                                                    name={`regularAmount${i}`}
                                                                    className="form-control inputDesignDoubleInput"
                                                                    onChange={(e) => {
                                                                        setFieldValue(e.target.name,
                                                                            toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                        FormulaSetting(values, setFieldValue, e.target, i)
                                                                    }}
                                                                />
                                                            </td>
                                                            <td style={{ width: "250px" }}>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Frequency"
                                                                    id={`frequency${i}`}
                                                                    name={`frequency${i}`}
                                                                    className="form-select inputDesignDoubleInput"
                                                                    as="select"
                                                                    onChange={(e) => {
                                                                        setFieldValue(e.target.name, e.target.value);
                                                                        FormulaSetting(values, setFieldValue, e.target, i)
                                                                    }}

                                                                >
                                                                    <option value={""}>Select</option>
                                                                    <option value={52}>Weekly</option>           {/* 52 weeks in a year */}
                                                                    <option value={26}>Fortnightly</option>       {/* 26 fortnights in a year */}
                                                                    <option value={12}>Monthly</option>           {/* 12 months in a year */}
                                                                    <option value={4}>Quarterly</option>          {/* 4 quarters in a year */}
                                                                    <option value={2}>6 Monthly</option>          {/* 2 periods of 6 months in a year */}
                                                                    <option value={1}>Annually</option>           {/* 1 year */}
                                                                </Field>
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Total"
                                                                    id={`total${i}`}
                                                                    name={`total${i}`}
                                                                    disabled
                                                                    className="form-control inputDesignDoubleInput"
                                                                    onChange={(e) => {
                                                                        setFieldValue(e.target.name,
                                                                            toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                    }}
                                                                />
                                                            </td>

                                                        </tr>)
                                                })}
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

export default AnnualPensionPaymentInnerModal;
