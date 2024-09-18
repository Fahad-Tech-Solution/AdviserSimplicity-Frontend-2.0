import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl, QuestionDetail } from '../../Store/Store';
import { PatchAxios, PostAxios } from '../Assets/Api/Api';

const InsittuteFom = (props) => {


    let [bankDetailObj, setBankDetailObj] = useRecoilState(BankDetail)

    let { modalObject } = props || {};

    let initialValues = { name: "" };


    const fillInitialValues = (setFieldValue) => {
        // console.log("object", modalObject)
        if (modalObject?.operation === "edit") {
            // if (modalObject?.data && Object.keys(modalObject?.data).length > 0 && modalObject.data?._id) {
            if (modalObject?.data && Object.keys(modalObject?.data).length > 0) {
                setFieldValue("name", modalObject.data.name);
            }
        }

    };

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {

        // const haveData = bankDetailObj._id || "";
        let haveData = false;

        if (modalObject?.operation === "edit") {
            let index = bankDetailObj.findIndex(
                (item) => item._id === modalObject.data._id
            );

            haveData = bankDetailObj[index]?._id;
        }


        let ApiChali = ""
        let res;


        console.log(haveData, bankDetailObj, "ma kea karo", values)

        if (!haveData) {
            res = await PostAxios(
                `${DefaultUrl}/api/institute/Add`,
                values
            );
            ApiChali = "Post"
        } else {
            values._id = haveData;

            res = await PatchAxios(
                `${DefaultUrl}/api/institute/Update`,
                values
            );
            ApiChali = "patch"
        }


        if (res) {
            console.log(res);
            let Obj;
            if (ApiChali == "Post") {

                Obj = res

                Obj.arrayOfOffers = [];

                console.log(Obj)

                setBankDetailObj((prevUsersData) => [...prevUsersData, Obj]);
            }
            else {

                Obj = JSON.parse(JSON.stringify(bankDetailObj));

                const updatedIndex = bankDetailObj.findIndex(
                    (item) => item._id === res._id
                );

                Obj[updatedIndex].name = res.name;

                console.log(Obj)

                setBankDetailObj(Obj);

            }
        }

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
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
                                        <label htmlFor='name' className='form-label'>Bank Name</label>
                                    </div>
                                    <div className='col-md-4'>
                                        <Field type="text" name="name" id="name" className="form-control inputDesign" />
                                        <ErrorMessage name='name' component={"div"} className='text-danger' />
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
