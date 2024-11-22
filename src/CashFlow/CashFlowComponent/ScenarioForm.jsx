import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { openNotificationSuccess, PatchAxios, PostAxios } from "../../Components/Assets/Api/Api";
import { defaultUrl } from "../../Store/Store";
import { useNavigate } from "react-router-dom";

const ScenarioForm = (props) => {

    let initialValues = {
        scenarioName: ""
    };

    let [tableData, setTableData] = useState([])

    const fillInitialValues = (setFieldValue) => {
        console.log(props.modalObject)
        if (props.modalObject.action === "New") {
            // setTableData(props.modalObject.Data.tableData)

        }
    };

    let DefaultUrl = useRecoilValue(defaultUrl);

    let Nav = useNavigate();

    let onSubmit = async (values) => {
        console.log(JSON.stringify(values));
        if (props.modalObject.action === "New") {
            Nav("/Cash-Flow/PersonalDetail" + "#" + props.modalObject.Data._id);
        }
        return false;
        let obj = values;
        obj.clientFK = localStorage.getItem("UserID");


        const GotData = incomeFromCentrelink.clientFK || "";

        try {
            let res;
            if (!GotData) {
                res = await PostAxios(`${DefaultUrl}/api/incomeFromCentrelink/Add`, obj);
            } else {
                res = await PatchAxios(`${DefaultUrl}/api/incomeFromCentrelink/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, incomeFromCentrelink: res };
                setQuestionDetail(updatedData);
            }

            openNotificationSuccess("success", "topRight", "Success Notification", `Data of "${props.modalObject.title}" is Saved`);

            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);
            openNotificationSuccess("error", "topRight", "Error Notification", `Data of "${props.modalObject.title}" is not Saved. Please try again.`);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({ values, setFieldValue, handleChange, handleBlur }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                return (
                    <Form>
                        <Row>
                            <div className='col-md-6 pt-2'>
                                <label htmlFor="scenarioName" className="fw-bold">Scenario :</label>
                            </div>
                            <div className='col-md-6'>
                                <Field
                                    type="text"
                                    id="scenarioName"
                                    name="scenarioName"
                                    placeholder="Enter scenario"
                                    className="form-control inputDesignDoubleInput"
                                />
                            </div>
                        </Row>
                        {props.modalObject.action === "New" && tableData.length > 0 &&

                            <Row className="mt-2">
                                <div className='col-md-6 pt-2'>
                                    <label htmlFor="scenarioName" className="fw-bold">Select Source :</label>
                                </div>
                                <div className='col-md-6'>
                                    <Field
                                        as="select"
                                        id="SelectionScenario"
                                        name="SelectionScenario"
                                        className="form-select inputDesignDoubleInput"
                                    >
                                        <option value={""}>Select</option>
                                        <option value={"discoveryForm"}>Discovery</option>
                                        {tableData.length > 0 &&
                                            tableData.map((elem, index) => {
                                                return (<option key={index} value={elem.scenarioName}>{elem.scenarioName}</option>)
                                            })
                                        }

                                    </Field>
                                </div>
                            </Row>
                        }
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ScenarioForm;
