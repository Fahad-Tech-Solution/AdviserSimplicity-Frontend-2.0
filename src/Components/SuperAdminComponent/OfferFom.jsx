import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl, QuestionDetail } from '../../Store/Store';
import { openNotificationSuccess, PatchAxios, PostAxios } from '../Assets/Api/Api';

const OfferFom = (props) => {


    let initialValues = {
        name: "",
        code: "",
    };


    const fillInitialValues = (setFieldValue) => {
        if (props.modalObject.oppration === "edit" && props.modalObject?.fullBank?.arrayOfOffers.length > 0) {
            //Check _id First

            setFieldValue("name", props.modalObject.fullBank.arrayOfOffers[props.modalObject.index].name || "")
            setFieldValue("code", props.modalObject.fullBank.arrayOfOffers[props.modalObject.index].code || "")
            setFieldValue("additionalDetails", props.modalObject.fullBank.arrayOfOffers[props.modalObject.index].additionalDetails || "")

        }
    };

    let DefaultUrl = useRecoilValue(defaultUrl)
    let [bankDetailObj, setBankDetailObj] = useRecoilState(BankDetail)


    let onSubmit = async (values) => {

        let haveData = false;

        if (props.modalObject.oppration === "edit") {

            haveData = true;
        }

        let ApiChali = ""
        let res;

        console.log(haveData, bankDetailObj, "ma kea karo", props.modalObject.fullBank.arrayOfOffers[props.modalObject.index])

        values.instituteFK = props.modalObject.fullBank._id

        try {

            if (!haveData) {
                res = await PostAxios(
                    `${DefaultUrl}/api/offer/Add`,
                    values
                );
                ApiChali = "Post"
            } else {
                values._id = props.modalObject.fullBank.arrayOfOffers[props.modalObject.index]._id;

                console.log(values)

                res = await PatchAxios(
                    `${DefaultUrl}/api/offer/Update`,
                    values
                );
                ApiChali = "patch"
            }



            if (res) {
                console.log(res);
                let Obj;
                if (ApiChali === "Post") {
                    let index = bankDetailObj.findIndex(
                        (item) => item._id === props.modalObject.fullBank._id
                    );

                    Obj = JSON.parse(JSON.stringify(bankDetailObj));

                    Obj[index].arrayOfOffers.push(res);

                    setBankDetailObj(Obj);

                }
                else {
                    let index = bankDetailObj.findIndex(
                        (item) => item._id === props.modalObject.fullBank._id
                    );

                    Obj = JSON.parse(JSON.stringify(bankDetailObj));

                    Obj[index].arrayOfOffers[props.modalObject.index] = res;

                    setBankDetailObj(Obj);

                }

            }

            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }

            let type = "success";
            let placement = "topRight"
            let message = "Investment Notification"
            let description = "Investment is Added successfull"
            openNotificationSuccess(type, placement, message, description)


        } catch (error) {
            console.log("error aya:", error?.response?.status, error?.response?.data);
            if (error?.response?.status == 400) {
                let type = "error";
                let placement = "topRight"
                let message = "Error Notification"
                let description = error.response.data
                openNotificationSuccess(type, placement, message, description)
            }
            else {
                let type = "error";
                let placement = "topRight"
                let message = "Error Notification"
                let description = "Some thing went wrong Please try again later"
                openNotificationSuccess(type, placement, message, description)
            }

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
                }, []);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-between'>

                                    <div className='col-md-6 pt-2'>
                                        <label htmlFor='name' className='form-label'>Name</label>
                                    </div>
                                    <div className='col-md-4'>
                                        <Field type="text" name="name" id="name" className="form-control inputDesign" />
                                        <ErrorMessage name='name' component={"div"} className='text-danger' />
                                    </div>

                                </div>
                                <div className='row justify-content-between mt-2'>

                                    <div className='col-md-6 pt-2'>
                                        <label htmlFor='code' className='form-label'>Code</label>
                                    </div>
                                    <div className='col-md-4'>
                                        <Field type="text" name="code" id="code" className="form-control inputDesign" />
                                        <ErrorMessage name='code' component={"div"} className='text-danger' />
                                    </div>

                                </div>
                                <div className='row justify-content-between mt-2'>

                                    <div className='col-md-6 pt-2'>
                                        <label htmlFor='additionalDetails' className='form-label'>Additional Detials</label>
                                    </div>
                                    <div className='col-md-4'>
                                        <Field type="text" as="textarea" name="additionalDetails" id="additionalDetails" className="form-control inputDesign" />
                                        <ErrorMessage name='additionalDetails' component={"div"} className='text-danger' />
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

export default OfferFom;
