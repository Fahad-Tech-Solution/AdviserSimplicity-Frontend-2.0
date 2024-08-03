import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, InputGroup, Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { PatchAxios, PostAxios } from '../../Assets/Api/Api';

const Partnership = (props) => {
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

    let incomeFromPartnership = questionDetail.incomeFromPartnership || {
        client: [],
        partner: [],
        joint: [],

    }; // Use an empty object as default if incomeFromPartnership is undefined


    let initialValues = incomeFromPartnership[props.modalObject.Input].length ? { NumberOfMap: incomeFromPartnership[props.modalObject.Input].length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);


    useEffect(() => {
        if (incomeFromPartnership[props.modalObject.Input] && incomeFromPartnership[props.modalObject.Input].length) {
            let arr = []

            for (let i = 0; i < incomeFromPartnership[props.modalObject.Input].length; i++) {
                arr.push("");
            }

            setDynamicFields(arr);

        }
    }, [])

    const fillInitialValues = (setFieldValue) => {

        if (incomeFromPartnership[props.modalObject.Input] && incomeFromPartnership[props.modalObject.Input].length) {

            incomeFromPartnership[props.modalObject.Input].forEach((data, i) => {
                if (data) {
                    setFieldValue(`businessName${i}`, data.businessName || '');
                    setFieldValue(`ABN${i}`, data.ABN || '');
                    setFieldValue(`businessAddress${i}`, data.businessAddress || '');
                    setFieldValue(`totalNetPartnershipIncome${i}`, data.totalNetPartnershipIncome || '');
                    setFieldValue(`sharePartnership${i}`, data.sharePartnership || '');
                    setFieldValue(`share${i}`, data.share || '');
                    setFieldValue(`goodWillBusinessValuation${i}`, data.goodWillBusinessValuation || '');

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
        // console.log(values);
        // return (false);
        // Extract the number of maps from the values
        const numberOfMaps = parseInt(values.NumberOfMap, 10);
        const newEntries = [];

        // Iterate through each map entry and create a new object
        for (let i = 0; i < numberOfMaps; i++) {
            const newEntry = {
                businessName: values[`businessName${i}`] || "",
                ABN: values[`ABN${i}`] || "",
                businessAddress: values[`businessAddress${i}`] || "",
                totalNetPartnershipIncome: values[`totalNetPartnershipIncome${i}`] || "",
                sharePartnership: values[`sharePartnership${i}`] || "",
                share: values[`share${i}`] || "",
                goodWillBusinessValuation: values[`goodWillBusinessValuation${i}`] || "",
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
        obj[DataOf + "Total"] = newEntries.reduce((total, entry) => total + entry.share, 0);

        console.log(obj, "final obj")

        // Check if incomeFromPartnership and the array at props.modalObject.Input exist
        // const bankAccountArray = incomeFromPartnership[props.modalObject.Input] || [];
        const bankAccountArray = incomeFromPartnership.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/incomeFromPartnership/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/incomeFromPartnership/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, incomeFromPartnership: res };
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

    let handleBlur = (setFieldValue, e) => {
        let value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setFieldValue(e.target.id, value.toFixed(2));
        } else {
            setFieldValue(e.target.id, "");
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({ values, setFieldValue, handleChange }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, [values.NumberOfMap]);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='col-md-5'>
                                        <p className='text-end mt-1'>
                                            How many {props.modalObject.title} does {nameSet} have:
                                        </p>
                                    </div>
                                    <div className='col-md-2'>
                                        <Field
                                            type="number"
                                            id="NumberOfMap"
                                            name="NumberOfMap"
                                            className="form-control inputDesign"
                                            onChange={(e) => handleInput(e, setFieldValue)}
                                        />
                                    </div>
                                    {values.NumberOfMap && (
                                        <div className='mt-4'>
                                            <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th onClick={() => { console.log(values) }}>No#</th>
                                                        <th>Business Name</th>
                                                        <th>ABN</th>
                                                        <th>Business Address</th>
                                                        <th>Total Net Partnership  income</th>
                                                        <th>Share of Partnership %</th>
                                                        <th>Share</th>
                                                        <th>Goodwill/Business Valuation </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dynamicFields.map((elem, i) => {
                                                        return (<tr key={i}>
                                                            <td>{1 + i}</td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Business Name"
                                                                    id={`businessName${i}`}
                                                                    name={`businessName${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="ABN"
                                                                    id={`ABN${i}`}
                                                                    name={`ABN${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Business Address"
                                                                    id={`businessAddress${i}`}
                                                                    name={`businessAddress${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Total Net Partnership income"
                                                                    id={`totalNetPartnershipIncome${i}`}
                                                                    name={`totalNetPartnershipIncome${i}`}
                                                                    onChange={(e) => {
                                                                        setFieldValue(`totalNetPartnershipIncome${i}`, e.target.value);
                                                                        setFieldValue(`share${i}`, (e.target.value || 0) * (values[`sharePartnership${i}`] || 0))
                                                                    }}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Share of Partnership %"
                                                                    id={`sharePartnership${i}`}
                                                                    name={`sharePartnership${i}`}
                                                                    onChange={(e) => {
                                                                        setFieldValue(`sharePartnership${i}`, e.target.value);
                                                                        setFieldValue(`share${i}`, (parseFloat(e.target.value).toFixed(2) || 0) * (values[`totalNetPartnershipIncome${i}`] || 0))
                                                                    }}
                                                                    onBlur={(e) => handleBlur(setFieldValue, e)}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Share%"
                                                                    id={`share${i}`}
                                                                    name={`share${i}`}
                                                                    disabled
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Goodwill/Business Valuation"
                                                                    id={`goodWillBusinessValuation${i}`}
                                                                    name={`goodWillBusinessValuation${i}`}
                                                                    className="form-control inputDesign"
                                                                />
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

export default Partnership;
