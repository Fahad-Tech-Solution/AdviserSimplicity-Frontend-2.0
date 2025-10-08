import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl, QuestionDetail } from '../../Store/Store';
import { openNotificationSuccess, PatchAxios, PostAxios } from '../Assets/Api/Api';

const InsittuteFom = (props) => {


    let [bankDetailObj, setBankDetailObj] = useRecoilState(BankDetail)

    let { modalObject } = props || {};

    let initialValues = { platformName: "", section: props.modalObject.key };


    const fillInitialValues = (setFieldValue) => {
        // console.log("object", modalObject)
        if (modalObject?.operation === "edit") {
            // if (modalObject?.data && Object.keys(modalObject?.data).length > 0 && modalObject.data?._id) {
            if (modalObject?.data && Object.keys(modalObject?.data).length > 0) {
                setFieldValue("platformName", modalObject.data.platformName);
            }
        }

    };

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {
        let res;
        let ApiChali = "";

        const isEditMode = modalObject?.operation === "edit";

        const existingItem = isEditMode
            ? Object.values(bankDetailObj) // Convert the object to an array of section arrays
                .flat() // Flatten the array of arrays into a single array of items
                .find(item => item._id === modalObject.data._id) // Find the item by _id
            : null;

        const haveData = existingItem?._id || false;

        try {
            if (!haveData) {
                // POST request for adding a new platform
                res = await PostAxios(`${DefaultUrl}/api/platform/Add`, values);
                ApiChali = "Post";
            } else {
                // PATCH request for updating an existing platform
                values._id = haveData;
                res = await PatchAxios(`${DefaultUrl}/api/platform/Update`, values);
                ApiChali = "Patch";
            }

            if (res) {
                let Obj = { ...res, arrayOfOffers: res.arrayOfOffers || [] }; // Initialize arrayOfOffers if not present

                setBankDetailObj((prevData) => {
                    const updatedData = JSON.parse(JSON.stringify({ ...prevData })); // Create a shallow copy of the previous state
                    const section = Obj.section;

                    if (ApiChali === "Post") {
                        // Add new platform to the corresponding section
                        updatedData[section] = updatedData[section]
                            ? [...updatedData[section], Obj]
                            : [Obj];
                    } else if (ApiChali === "Patch") {
                        // Update existing platform in the corresponding section
                        if (updatedData[section]) {
                            const updatedIndex = updatedData[section].findIndex(
                                (item) => item._id === res._id
                            );

                            if (updatedIndex !== -1) {
                                updatedData[section][updatedIndex] = { ...updatedData[section][updatedIndex], ...Obj }; // Update only the modified properties
                            } else {
                                console.error("Item not found in section for update.");
                            }
                        } else {
                            console.error("Section not found for update.");
                        }

                    }

                    return updatedData;
                });

                // Success Notification
                openNotificationSuccess(
                    "success",
                    "topRight",
                    "Success Notification",
                    `Platform is ${ApiChali === "Post" ? "Added" : "Updated"} successfully`
                );
            }

            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }

        } catch (error) {
            const errorMessage = error?.response?.status === 400
                ? error?.response?.data
                : "Something went wrong. Please try again later.";

            // Error Notification
            openNotificationSuccess(
                "error",
                "topRight",
                "Error Notification",
                errorMessage
            );

            console.error("Error occurred:", error);
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
                                        <label htmlFor='platformName' className='form-label'>Platform Name</label>
                                    </div>
                                    <div className='col-md-6'>
                                        <Field type="text" name="platformName" id="platformName" className="form-control inputDesignDoubleInput" />
                                        <ErrorMessage name='platformName' component={"div"} className='text-danger' />
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

export default InsittuteFom;
