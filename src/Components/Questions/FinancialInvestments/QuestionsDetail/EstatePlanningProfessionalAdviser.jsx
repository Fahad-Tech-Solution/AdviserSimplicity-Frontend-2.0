import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { PatchAxios, PostAxios } from '../../../Assets/Api/Api';


const EstatePlanningProfessionalAdviser = (props) => {
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

    let professionalAdviser = questionDetail.professionalAdviser || {
        client: [],
        partner: [],
        joint: [],

    }; // Use an empty object as default if professionalAdviser is undefined


    let initialValues = professionalAdviser[props.modalObject.Input].length ? { NumberOfMap: professionalAdviser[props.modalObject.Input].length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);


    useEffect(() => {
        if (professionalAdviser[props.modalObject.Input] && professionalAdviser[props.modalObject.Input].length) {
            let arr = []

            for (let i = 0; i < professionalAdviser[props.modalObject.Input].length; i++) {
                arr.push("");
            }

            setDynamicFields(arr);

        }
    }, [])

    const fillInitialValues = (setFieldValue) => {

        if (professionalAdviser[props.modalObject.Input] && professionalAdviser[props.modalObject.Input].length) {

            professionalAdviser[props.modalObject.Input].forEach((data, i) => {
                if (data) {
                    setFieldValue(`POAType${i}`, data.POAType || '');
                    setFieldValue(`adviserName${i}`, data.adviserName || '');
                    setFieldValue(`company${i}`, data.company || '');
                    setFieldValue(`phone${i}`, data.phone || '');
                    setFieldValue(`email${i}`, data.email || '');
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
                POAType: values[`POAType${i}`] || "",
                adviserName: values[`adviserName${i}`] || "",
                company: values[`company${i}`] || "",
                phone: values[`phone${i}`] || "",
                email: values[`email${i}`] || "",
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
        // obj[DataOf + "Total"] = newEntries.reduce((total, entry) => total + entry.annualAdvice, 0);
        obj[DataOf + "Total"] = newEntries.length;

        console.log(obj, "final obj")

        // Check if professionalAdviser and the array at props.modalObject.Input exist
        // const bankAccountArray = professionalAdviser[props.modalObject.Input] || [];
        const bankAccountArray = professionalAdviser.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/professionalAdviser/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/professionalAdviser/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, professionalAdviser: res };
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
                                            How many {props.modalObject.title} does {nameSet} have :
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
                                                        <th>POA Type</th>
                                                        <th>Adviser Name</th>
                                                        <th>Company</th>
                                                        <th>Phone</th>
                                                        <th>Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dynamicFields.map((elem, i) => {
                                                        return (<tr key={i}>
                                                            <td>{1 + i}</td>
                                                            <td>
                                                                <Field
                                                                    as="select"
                                                                    placeholder="Fund Name"
                                                                    id={`POAType${i}`}
                                                                    name={`POAType${i}`}
                                                                    className="form-select inputDesign"
                                                                >
                                                                    <option value={""}>Please Select</option>
                                                                    <option value={"Accountant"}>Accountant</option>
                                                                    <option value={"Lawyer/Solicitor"}>Lawyer/Solicitor</option>
                                                                    <option value={"Insurance adviser"}>Insurance adviser</option>
                                                                    <option value={"Doctor"}>Doctor</option>
                                                                    <option value={"Other"}>Other</option>
                                                                </Field>
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Adviser Name"
                                                                    id={`adviserName${i}`}
                                                                    name={`adviserName${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Company"
                                                                    id={`company${i}`}
                                                                    name={`company${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Phone"
                                                                    id={`phone${i}`}
                                                                    name={`phone${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="email"
                                                                    placeholder="Any specific estate planning requirements/needs?"
                                                                    id={`email${i}`}
                                                                    name={`email${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                        </tr>
                                                        )
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

export default EstatePlanningProfessionalAdviser;
