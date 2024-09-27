import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { defaultUrl, } from '../../../../Store/Store';
import DatePicker from 'react-datepicker';
import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, toPercentage } from '../../../Assets/Api/Api';

const Beneficiaries = (props) => {


    let initialValues = props.modalObject.editArray.length ? { NumberOfMap: props.modalObject.editArray.length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);

    const fillInitialValues = (setFieldValue, loopValue) => {

        let arr = []

        for (let i = 0; i < loopValue; i++) {
            arr.push("");
        }

        setDynamicFields(arr);


        if (props.modalObject.editArray) {
            props.modalObject.editArray.forEach((data, i) => {
                if (data) {
                    console.log(data.investmentOption)
                    setFieldValue(`nominationType${i}`, data.nominationType || '');
                    setFieldValue(`DOB${i}`, data.DOB || '');
                    setFieldValue(`beneficiaryName${i}`, data.beneficiaryName || '');
                    setFieldValue(`relationshipStatus${i}`, data.relationshipStatus || '');
                    setFieldValue(`shareBenefit${i}`, data.shareBenefit || '');
                }

            });
        }

    };

    let handleInput = (e, setFieldValue) => {
        const value = e.target.value > 10 ? 10 : e.target.value;
        setFieldValue(e.target.id, value);

        let arr = []

        for (let i = 0; i < value; i++) {
            arr.push("");
        }

        setDynamicFields(arr);

    };

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {

        console.log(values)

        const newEntries = [];

        let loopLength = parseFloat(values.NumberOfMap)

        // Iterate through each map entry and create a new object
        for (let i = 0; i < loopLength; i++) {
            // alert("loop chala")
            const newEntry = {
                nominationType: values[`nominationType${i}`] || "",
                DOB: values[`DOB${i}`] || "",
                beneficiaryName: values[`beneficiaryName${i}`] || "",
                relationshipStatus: values[`relationshipStatus${i}`] || "",
                shareBenefit: values[`shareBenefit${i}`] || "",
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, newEntries)

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    };


    let extraValue = ["Account Based Pension", "Invested in Annuities"]

    let [autoClearValue, setAutoClearValue] = useState(false);


    let FormulaSetting = () => {

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
                                    <div className='col-md-7'>
                                        <p className='text-end mt-1'>
                                            {props.modalObject.question}
                                        </p>
                                    </div>
                                    <div className='col-md-3'>
                                        <Field
                                            type="number"
                                            id="NumberOfMap"
                                            name="NumberOfMap"
                                            className="form-control inputDesignDoubleInput"
                                            onChange={(e) => handleInput(e, setFieldValue)}
                                        />
                                    </div>
                                    {values.NumberOfMap && (
                                        <div className='mt-4'>
                                            <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th>No#</th>
                                                        <th>Nomination Type</th>
                                                        <th>DOB</th>
                                                        <th>Beneficiary Name</th>
                                                        <th>Relationship Status</th>
                                                        <th>Share of Benefit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dynamicFields.map((elem, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{1 + i}</td>

                                                                <td>
                                                                    <Field
                                                                        as="select"
                                                                        id={`nominationType${i}`}
                                                                        name={`nominationType${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(`nominationType${i}`, e.target.value);
                                                                            if (e.target.value === "Legal Personal Representative (Your Estate)") {
                                                                                setFieldValue(`beneficiaryName${i}`, "N/A");
                                                                                setFieldValue(`relationshipStatus${i}`, "N/A");
                                                                                setFieldValue(`shareBenefit${i}`, "100.00%");
                                                                                setAutoClearValue(true);
                                                                            }
                                                                            else {
                                                                                if (autoClearValue) {
                                                                                    setFieldValue(`beneficiaryName${i}`, "");
                                                                                    setFieldValue(`relationshipStatus${i}`, "");
                                                                                    setFieldValue(`shareBenefit${i}`, "");
                                                                                    setAutoClearValue(false);
                                                                                }
                                                                            }
                                                                        }}
                                                                    >
                                                                        <option value={""}>Select</option>

                                                                        {extraValue.includes(props.modalObject.ParentModal) &&
                                                                            <option value={"Reversionary Beneficiary"}>Reversionary Beneficiary</option>
                                                                        }

                                                                        <option value={"Binding (Non-Lapsing)"}>Binding (Non-Lapsing)</option>
                                                                        <option value={"Binding (Lapsing)"}>Binding (Lapsing)</option>
                                                                        <option value={"Non-Binding"}>Non-Binding </option>
                                                                        <option value={"Legal Personal Representative (Your Estate)"}>Legal Personal Representative (Your Estate)</option>
                                                                    </Field>
                                                                </td>
                                                                <td style={{ minWidth: "150px" }}>
                                                                    <div>
                                                                        <DatePicker
                                                                            className="form-control inputDesignDoubleInput shadow DateInputPadding"
                                                                            showIcon
                                                                            id={`DOB${i}`}
                                                                            name={`DOB${i}`}
                                                                            selected={values[`DOB${i}`]}
                                                                            onChange={(date) => setFieldValue(`DOB${i}`, date)}
                                                                            dateFormat="dd/MM/yyyy"
                                                                            placeholderText="dd/mm/yyyy"
                                                                            maxDate={new Date()}
                                                                            showMonthDropdown
                                                                            showYearDropdown
                                                                            dropdownMode="select"
                                                                            onBlur={handleBlur}
                                                                            wrapperClassName="w-100"
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Beneficiary Name"
                                                                        id={`beneficiaryName${i}`}
                                                                        name={`beneficiaryName${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        disabled={values[`nominationType${i}`] == "Legal Personal Representative (Your Estate)"}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        as="select"
                                                                        id={`relationshipStatus${i}`}
                                                                        name={`relationshipStatus${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value={""}>Select</option>
                                                                        {values[`nominationType${i}`] === "Legal Personal Representative (Your Estate)" &&

                                                                            <option value={"N/A"}>N/A</option>
                                                                        }
                                                                        {values[`nominationType${i}`] !== "Legal Personal Representative (Your Estate)" &&
                                                                            <React.Fragment>
                                                                                <option value={"Spouse/De-facto"}>Spouse/De-facto</option>
                                                                                <option value={"Child"}>Child</option>
                                                                                <option value={"Financial Dependant "}>Financial Dependant </option>
                                                                                <option value={"Interdependant "}>Interdependant </option>
                                                                            </React.Fragment>
                                                                        }
                                                                    </Field>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Share of Benefit"
                                                                        id={`shareBenefit${i}`}
                                                                        name={`shareBenefit${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        disabled={values[`nominationType${i}`] == "Legal Personal Representative (Your Estate)"}
                                                                        onChange={(e) => handleInputChange(e, setFieldValue, FormulaSetting, values)}
                                                                        onFocus={(e) => handleInputFocus(e, setFieldValue)}
                                                                        onKeyDown={(e) => handleInputKeyDown(e)}
                                                                        onBlur={(e) => handleInputBlur(e, setFieldValue, toPercentage, FormulaSetting, values)}
                                                                    />
                                                                    {parseFloat((values[`shareBenefit${i}`] || "100$").replace(/[^0-9.-]+/g, "")) < 100 &&

                                                                        <p style={{ textAlign: "left", fontSize: "13px" }} className="text-danger mt-2 fw-bold">Share of Benefit must be 100%</p>
                                                                    }
                                                                </td>

                                                            </tr>)
                                                    })}
                                                </tbody>
                                            </Table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default Beneficiaries;
