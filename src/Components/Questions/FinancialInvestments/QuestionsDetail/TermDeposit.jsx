import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { PatchAxios, PostAxios } from '../../../Assets/Api/Api';

const TermDeposit = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);


    let [nameSet] = useState(() => {
        if (props.modalObject.Input === "client") {
            return (localStorage.getItem("UserName"))
        }
        else if (props.modalObject.Input === "partner") {
            return (localStorage.getItem("PartnerName"))
        }
        else if (props.modalObject.Input === "joint") {
            return (localStorage.getItem("UserName") + " & " + localStorage.getItem("PartnerName"))
        }
    })

    let termDepositsFinance = Object.keys(questionDetail[props.modalObject.key]).length > 0 ? questionDetail[props.modalObject.key] : {
        client: [],
        partner: [],
        joint: [],

    }; // Use an empty object as default if termDepositsFinance is undefined


    let initialValues = termDepositsFinance[props.modalObject.Input].length ? { NumberOfMap: termDepositsFinance[props.modalObject.Input].length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);

    useEffect(() => {
        if (initialValues.NumberOfMap) {
            generateFields(initialValues.NumberOfMap);
        }
    }, [initialValues.NumberOfMap]);

    const options = [
        "Adelaide Bank",
        "Alliance Bank",
        "AMP",
        "ANZ",
        "Arab Bank Australia",
        "Australian Military Bank (ADCU)",
        "Australian Mutual Bank",
        "Australian Unity",
        "Auswide Bank",
        "AWA Alliance Bank",
        "Bank Australia (bankmecu)",
        "Bank First",
        "Bank of Melbourne",
        "Bank of Queensland (BOQ)",
        "Bank of Sydney",
        "BankSA",
        "BankVic",
        "Bankwest",
        "BCU",
        "BDCU Alliance Bank",
        "Bendigo Bank",
        "Beyond Bank",
        "Border Bank",
        "Circle Alliance Bank",
        "Citi",
        "Commonwealth Bank",
        "Community First Bank",
        "Credit Union SA",
        "Defence Bank",
        "Delphi Bank",
        "Easy Street",
        "First Choice Credit Union",
        "First Option Bank",
        "firstmac",
        "G&C Mutual",
        "Gateway Bank Ltd",
        "Geelong Bank",
        "Great Southern Bank",
        "Greater Bank",
        "Hay",
        "Heartland Bank",
        "Heritage Bank",
        "Horizon Bank",
        "HSBC Australia",
        "Hume Bank",
        "Illawarra Credit Union",
        "IMB",
        "ING",
        "Judo Bank",
        "Macquarie Bank",
        "ME",
        "MOVE Bank",
        "MyState Bank",
        "NAB",
        "Newcastle Permanent",
        "P&N Bank",
        "People’s Choice CU",
        "Policebank",
        "Prospa",
        "Qudos Bank",
        "Rabobank",
        "RACQ",
        "RAMS",
        "Regional Australia Bank",
        "Rural Bank",
        "Service One Alliance Bank",
        "St.George",
        "Suncorp Bank",
        "Teachers Mutual Bank",
        "Ubank",
        "UniBank",
        "Up Bank",
        "Virgin Money",
        "Westpac",
        "Zeller"
    ];

    const generateFields = (iteration) => {
        const upTill = parseFloat(iteration);
        const rows = [];

        for (let i = 0; i < upTill; i++) {
            rows.push(
                <tr key={i}>
                    <td>{1 + i}</td>
                    <td>
                        <Field
                            as="select"
                            placeholder="Name of Institution"
                            id={`Institution${i}`}
                            name={`Institution${i}`}
                            className="form-select inputDesignDoubleInput"
                        >
                            <option value={""}>Please Select</option>
                            {options.map((elem, index) => {
                                return (<option key={index} value={elem}>{elem}</option>)
                            })}
                        </Field>
                    </td>
                    <td>
                        <Field
                            type="text"
                            placeholder="Account number"
                            id={`accountNumber${i}`}
                            name={`accountNumber${i}`}
                            className="form-control inputDesignDoubleInput"
                        />
                    </td>
                    <td>
                        <Field
                            type="number"
                            placeholder="Current Balance"
                            id={`currentBalance${i}`}
                            name={`currentBalance${i}`}
                            className="form-control inputDesignDoubleInput"
                        />
                    </td>
                </tr>
            );
        }

        setDynamicFields(rows);
    };

    const fillInitialValues = (setFieldValue) => {
        if (termDepositsFinance[props.modalObject.Input] && termDepositsFinance[props.modalObject.Input].length) {
            termDepositsFinance[props.modalObject.Input].forEach((data, i) => {
                if (data) {
                    setFieldValue(`Institution${i}`, data.Institution || '');
                    setFieldValue(`accountNumber${i}`, data.accountNumber || '');
                    setFieldValue(`currentBalance${i}`, data.currentBalance || '');
                }
            });
        }
    };

    let handleInput = (e, setFieldValue) => {
        const value = e.target.value > 10 ? 10 : e.target.value;
        setFieldValue(e.target.id, value);
        generateFields(value);
    };

    let DefaultUrl = useRecoilValue(defaultUrl)


    let onSubmit = async (values) => {
        // Extract the number of maps from the values
        const numberOfMaps = parseInt(values.NumberOfMap, 10);
        const newEntries = [];

        // Iterate through each map entry and create a new object
        for (let i = 0; i < numberOfMaps; i++) {
            const newEntry = {
                Institution: values[`Institution${i}`] || "",
                accountNumber: values[`accountNumber${i}`] || "",
                currentBalance: values[`currentBalance${i}`] || ""
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        let DataOf = props.modalObject.Input;

        // Create an object with additional fields
        let obj = {
            clientFK: localStorage.getItem("UserID"),
        };

        obj[DataOf] = newEntries

        // Calculate total currentBalance
        obj[DataOf + "Total"] = newEntries.reduce((total, entry) => total + entry.currentBalance, 0);

        console.log(obj, "final obj")

        // Check if termDepositsFinance and the array at props.modalObject.Input exist
        // const bankAccountArray = termDepositsFinance[props.modalObject.Input] || [];
        const bankAccountArray = termDepositsFinance.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/${props.modalObject.key}/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/${props.modalObject.key}/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, [props.modalObject.key]: res };
                setQuestionDetail(updatedData);
            }

            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }

        } catch (error) {
            console.error("Error occurred while making API call:", error);
        }


    };


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

                                    <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                        <p className='text-end mt-3'>
                                            How many {props.modalObject.title} does {nameSet} have:
                                        </p>
                                        <div style={{ width: "15%" }}>

                                            <Field
                                                type="number"
                                                id="NumberOfMap"
                                                name="NumberOfMap"
                                                className="form-control inputDesignDoubleInput"
                                                onChange={(e) => handleInput(e, setFieldValue)}
                                            />
                                        </div>
                                    </div>
                                    {values.NumberOfMap && (
                                        <div className='mt-4'>
                                            <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th>No#</th>
                                                        <th>Name of Institution</th>
                                                        <th>Account number</th>
                                                        <th>Current Balance</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dynamicFields}
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

export default TermDeposit;
