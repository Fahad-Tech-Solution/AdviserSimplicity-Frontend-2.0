import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, InputGroup, Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { openNotificationSuccess, PatchAxios, PostAxios, RenderName } from '../../Assets/Api/Api';
import DynamicTableRow from '../../Assets/Dynamic/DynamicTableRow';

const AssetInfo = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let [UserStatus] = useState(localStorage.getItem('UserStatus'));

    let initialValues = { owner: "" };

    const fillInitialValues = (setFieldValue) => {
        console.log(props.modalObject, "kuch Chala");

        if (questionDetail[props.modalObject.index] && Object.keys(questionDetail[props.modalObject.index]).length >= 0) {
            // console.log(questionDetail[props.modalObject.index], "State Ma Data", props.modalObject.index);

            let data = questionDetail[props.modalObject.index];

            if (data) {
                setFieldValue(`owner`, data.owner || "");

                if (data.owner === "client" || data.owner === "client+partner") {
                    if (data?.client && Object.keys(data?.client).length) {

                        setFieldValue(`client.currentValue`, data.client.currentValue || "");

                        if (props.modalObject.index === "car") {
                            setFieldValue(`client.modelOfCar`, data.client.modelOfCar || "");
                        }
                        else if (props.modalObject.index === "otherAssets") {
                            setFieldValue(`client.description`, data.client.description || "");
                        }

                    }
                }

                if (data.owner === "partner" || data.owner === "client+partner") {
                    if (data?.partner && Object.keys(data?.partner).length) {

                        setFieldValue(`partner.currentValue`, data.partner.currentValue || "");

                        if (props.modalObject.index === "car") {
                            setFieldValue(`partner.modelOfCar`, data.partner.modelOfCar || "");
                        }
                        else if (props.modalObject.index === "otherAssets") {
                            setFieldValue(`partner.description`, data.partner.description || "");
                        }
                    }
                }

                if (data.owner === "joint") {
                    if (data?.joint && Object.keys(data?.joint).length) {

                        setFieldValue(`joint.currentValue`, data.joint.currentValue || "");

                        if (props.modalObject.index === "car") {
                            setFieldValue(`joint.modelOfCar`, data.joint.modelOfCar || "");
                        }
                        else if (props.modalObject.index === "otherAssets") {
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

            if (values.owner === "client" || values.owner === "client+partner") {
                obj.clientTotal = obj.client.currentValue;
            } else {
                obj.clientTotal = "";
                obj.client = {};
            }

            if (values.owner === "partner" || values.owner === "client+partner") {
                obj.partnerTotal = obj.partner.currentValue;
            } else {
                obj.partnerTotal = "";
                obj.partner = {};
            }

        }
        else {

            if (values.owner === "joint") {
                obj.jointTotal = obj.joint.currentValue;
            }
            else {
                obj.jointTotal = "";
                obj.joint = {};
            }

        }
        if (UserStatus !== "Married") {
            obj.partnerTotal = "";
            obj.partner = {};
        }


        console.log(obj, "final obj")

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

            openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved");
            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);
            openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved Please! try again");
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

                                    <div className='w-25'>
                                        <Field
                                            as="select"
                                            placeholder="Name of owner"
                                            id={`owner`}
                                            name={`owner`}
                                            className="form-select inputDesignDoubleInput"
                                        >
                                            <option value={""}>Select</option>

                                            {onlyJoint.includes(props.modalObject.title) ?
                                                <option value={"joint"}> {"Joint (" + RenderName("joint") + ")"}</option> :
                                                <React.Fragment>
                                                    <option value={"client"}>  {RenderName("client")} </option>

                                                    {localStorage.getItem("UserStatus") !== "Single" &&
                                                        <React.Fragment>

                                                            <option value={"partner"}>{RenderName("partner")}</option>
                                                            <option value={"client+partner"}>{"Both (" + RenderName("client") + " , " + RenderName("partner") + ")"} </option>
                                                            {/*
                                                                <option value={"client+partner+joint"}>{RenderName("client") + " , " + RenderName("partner") + " and Joint"} </option>
                                                                <option value={"joint"}> {"Joint (" + RenderName("joint") + ")"} </option>
                                                            */}

                                                        </React.Fragment>
                                                    }
                                                </React.Fragment>}
                                        </Field>
                                    </div>
                                </div>


                                {values.owner !== "" &&
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
                                                    {(values.owner === "client" || values.owner === "client+partner" || values.owner === "client+partner+joint") &&
                                                        <DynamicTableRow
                                                            rowConfig={rowConfig}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            stakeHolder={"client."}
                                                        />
                                                    }
                                                    {((values.owner === "partner" || values.owner === "client+partner" || values.owner === "client+partner+joint") && (UserStatus === "Married")) &&
                                                        <DynamicTableRow
                                                            rowConfig={rowConfig}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            stakeHolder={"partner."}
                                                        />
                                                    }

                                                    {(values.owner === "joint" || values.owner === "client+partner+joint") &&
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
