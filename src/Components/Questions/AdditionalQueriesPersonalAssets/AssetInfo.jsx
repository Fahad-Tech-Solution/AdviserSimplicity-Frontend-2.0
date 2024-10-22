import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, InputGroup, Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { openNotificationSuccess, PatchAxios, PostAxios, RenderName } from '../../Assets/Api/Api';
import DynamicTableRow from '../../Assets/Dynamic/DynamicTableRow';
import { CreatableMultiSelectField } from '../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField';

const AssetInfo = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let [UserStatus] = useState(localStorage.getItem('UserStatus'));

    let initialValues = { owner: "" };

    const fillInitialValues = (setFieldValue) => {
        console.log(props.modalObject, "kuch Chala");

        if (questionDetail[props.modalObject.index] && Object.keys(questionDetail[props.modalObject.index]).length >= 0) {
            let data = questionDetail[props.modalObject.index];

            if (data) {
                setFieldValue(`owner`, data.owner || "");

                // Check for "client" ownership
                if (data.owner.includes("client") || data.owner.includes("client+partner")) {
                    if (data?.client && Object.keys(data?.client).length) {
                        setFieldValue(`client.currentValue`, data.client.currentValue || "");

                        if (props.modalObject.index === "car") {
                            setFieldValue(`client.modelOfCar`, data.client.modelOfCar || "");
                        } else if (props.modalObject.index === "otherAssets") {
                            setFieldValue(`client.description`, data.client.description || "");
                        }
                    }
                }

                // Check for "partner" ownership
                if (data.owner.includes("partner") || data.owner.includes("client+partner")) {
                    if (data?.partner && Object.keys(data?.partner).length) {
                        setFieldValue(`partner.currentValue`, data.partner.currentValue || "");

                        if (props.modalObject.index === "car") {
                            setFieldValue(`partner.modelOfCar`, data.partner.modelOfCar || "");
                        } else if (props.modalObject.index === "otherAssets") {
                            setFieldValue(`partner.description`, data.partner.description || "");
                        }
                    }
                }

                // Check for "joint" ownership
                if (data.owner.includes("joint")) {
                    if (data?.joint && Object.keys(data?.joint).length) {
                        setFieldValue(`joint.currentValue`, data.joint.currentValue || "");

                        if (props.modalObject.index === "car") {
                            setFieldValue(`joint.modelOfCar`, data.joint.modelOfCar || "");
                        } else if (props.modalObject.index === "otherAssets") {
                            setFieldValue(`joint.description`, data.joint.description || "");
                        }
                    }
                }
            }
        }
    };


    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {
        let obj = values;
        obj.clientFK = localStorage.getItem("UserID");

        if (props.modalObject.title === "Car" || props.modalObject.title === "Other Assets") {
            // Handle "client" related values
            if (values.owner.includes("client") || values.owner.includes("client+partner")) {
                obj.clientTotal = obj.client.currentValue;
            } else {
                obj.clientTotal = "";
                obj.client = {};
            }

            // Handle "partner" related values
            if (values.owner.includes("partner") || values.owner.includes("client+partner")) {
                obj.partnerTotal = obj.partner.currentValue;
            } else {
                obj.partnerTotal = "";
                obj.partner = {};
            }
        } else {
            // Handle "joint" related values
            if (values.owner.includes("joint")) {
                obj.jointTotal = obj.joint.currentValue;
            } else {
                obj.jointTotal = "";
                obj.joint = {};
            }
        }

        // Clear partner fields if the user is not married
        if (UserStatus !== "Married") {
            obj.partnerTotal = "";
            obj.partner = {};
        }

        console.log(obj, "final obj");

        // Get bankAccountArray from questionDetail
        const bankAccountArray = questionDetail[props.modalObject.index]._id || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/${props.modalObject.index}/Add`, obj);
            } else {
                res = await PatchAxios(`${DefaultUrl}/api/${props.modalObject.index}/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, [props.modalObject.index]: res };
                setQuestionDetail(updatedData);
            }

            // Show success notification
            openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved");

            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);
            openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved. Please try again.");
        }
    };



    const rowConfig = (props.modalObject.title === "Car") ? [
        { name: 'modelOfCar', type: 'text', placeholder: 'Model of Car', styleSet: { width: "33%" }, },
        { name: 'currentValue', type: 'number-toComma', placeholder: 'Annual Payment Amount', styleSet: { width: "33%" }, },
    ] : (props.modalObject.title === "Other Assets") ? [
        { name: 'description', type: 'text', placeholder: 'Discription', styleSet: { width: "33%" }, },
        { name: 'currentValue', type: 'number-toComma', placeholder: 'Annual Payment Amount', styleSet: { width: "33%" }, },
    ] : [
        { name: 'currentValue', type: 'number-toComma', placeholder: 'Annual Payment Amount', styleSet: { width: "50%" }, },
    ]

    let onlyJoint = ["Boat", "Caravan", "House hold"];

    const options = onlyJoint.includes(props.modalObject.title) ? [
        { value: "joint", label: RenderName("joint") }
    ] : (UserStatus !== "Single") ? [
        { value: "client", label: RenderName("client") },
        { value: "partner", label: RenderName("partner") }] :
        [{ value: "client", label: RenderName("client") },];

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
                            <div className="col-md-12">

                                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                    <label htmlFor='' className='text-end '>
                                        Owner
                                    </label>

                                    <div style={{ minWidth: "25%" }}>
                                        <Field
                                            name={`owner`}
                                            component={CreatableMultiSelectField}
                                            label="Multi Select Field"
                                            options={options}
                                        />
                                    </div>
                                </div>


                                {values.owner.length > 0 &&
                                    <div className='row justify-content-center'>
                                        <div className='mt-4'>
                                            <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th onClick={() => { console.log(values) }}>Owner</th>
                                                        {props.modalObject.title === "Car" &&
                                                            <th>Model of Car</th>
                                                        }
                                                        {props.modalObject.title === "Other Assets" &&
                                                            <th>Description</th>
                                                        }
                                                        <th>Current Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(values.owner.includes("client")) &&
                                                        <DynamicTableRow
                                                            rowConfig={rowConfig}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            stakeHolder={"client."}
                                                        />
                                                    }
                                                    {(values.owner.includes("partner") && (UserStatus === "Married")) &&
                                                        <DynamicTableRow
                                                            rowConfig={rowConfig}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            stakeHolder={"partner."}
                                                        />
                                                    }

                                                    {(values.owner.includes("joint") && (UserStatus === "Married")) &&
                                                        <DynamicTableRow
                                                            rowConfig={rowConfig}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            stakeHolder={"joint."}
                                                        />
                                                    }

                                                </tbody>
                                            </Table>
                                        </div>

                                    </div>
                                }

                            </div>
                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AssetInfo;
