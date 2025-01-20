import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { openNotificationSuccess, PatchAxios, PostAxios } from "../../Components/Assets/Api/Api";
import { CashFlowData, defaultUrl } from "../../Store/Store";
import { useNavigate } from "react-router-dom";
import { content } from "../../Content/Content";

const ScenarioForm = (props) => {

    let initialValues = {
        scenarioName: "",
        selectedSource: "discoveryForm"
    };

    let { cashFlow } = content;

    let [cashFlowData, setCashFlowData] = useRecoilState(CashFlowData);

    let [tableData, setTableData] = useState([])

    const fillInitialValues = (setFieldValue) => {
        console.log(props.modalObject)
        if (props.modalObject.action === "New") {


            const filteredScenarios = (cashFlowData.Scenarios || []).filter(
                (scenario) => scenario.clientFK == props.modalObject.Data._id
            );

            if (filteredScenarios.length > 0) {
                setTableData(filteredScenarios)
            }

        }
        else if (props.modalObject.action === "Edit") {
            setFieldValue("scenarioName", props.modalObject.Scenario.scenarioName)
        }
        else if (props.modalObject.action === "duplicate") {
            setFieldValue("scenarioName", props.modalObject.Scenario.scenarioName + " (Copy)")
        }
    };


    let DefaultUrl = useRecoilValue(defaultUrl);
    let BaseURL = DefaultUrl + "/api/CF/scenario"


    let Nav = useNavigate();

    let onSubmit = async (values) => {
        console.log(JSON.stringify(values));

        let obj = values;
        obj.clientFK = props.modalObject.Data._id;

        try {
            let res;
            if (props.modalObject.action === "New") {
                res = await PostAxios(`${BaseURL}/Add`, obj);
            }
            else if (props.modalObject.action === "duplicate") {
                obj.selectedSource = props.modalObject.Scenario._id;
                res = await PostAxios(`${BaseURL}/Duplicate/`, obj)
            }
            else {
                obj._id = props.modalObject.Scenario._id;
                res = await PatchAxios(`${BaseURL}/Update`, obj);
            }


            if (res) {
                console.log(res);
                if (props.modalObject.action === "New") {
                    const updatedData = {
                        ...cashFlowData,
                        Scenarios: [...cashFlowData.Scenarios, res],
                    };
                    setCashFlowData(updatedData);

                    localStorage.setItem("ScenarioObj", JSON.stringify(res));

                    Nav("/Cash-Flow/PersonalDetail" + "#" + res._id);
                }
                else if (props.modalObject.action === "duplicate") {
                    const updatedData = {
                        ...cashFlowData,
                        Scenarios: [...cashFlowData.Scenarios, res.data],
                    };
                    setCashFlowData(updatedData);

                    localStorage.setItem("ScenarioObj", JSON.stringify(res.data));

                    Nav("/Cash-Flow/PersonalDetail" + "#" + res._id);
                }
                else if (props.modalObject.action === "Edit") {
                    // alert(res._id)
                    const updatedScenarios = cashFlowData.Scenarios.map((scenario) =>
                        scenario._id === res._id ? res : scenario
                    );

                    console.log(updatedScenarios[10])

                    const updatedData = {
                        ...cashFlowData,
                        Scenarios: updatedScenarios,
                    };

                    setCashFlowData(updatedData);
                }
                else {
                    const route = cashFlow.find((module) => module.subTitle === res.lastModuleEdited)?.route;
                    Nav("/Cash-Flow" + route);
                }
            }

            openNotificationSuccess("success", "topRight", "Success Notification", `Data of "${props.modalObject.title}" is Saved`);

            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);

            // console.error("Error occurred while making API call:", error.response);
            if (error.response.status === 409) {
                openNotificationSuccess("error", "topRight", "Error Notification", error.response.data.message);
                return false;
            }


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
                                        id="selectedSource"
                                        name="selectedSource"
                                        className="form-select inputDesignDoubleInput"
                                    >
                                        <option value={""}>Select</option>
                                        <option value={"discoveryForm"}>Discovery</option>
                                        {tableData.length > 0 &&
                                            tableData.map((elem, index) => {
                                                return (<option key={index} value={elem._id}>{elem.scenarioName}</option>)
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
