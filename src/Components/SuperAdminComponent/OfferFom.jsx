import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl, QuestionDetail } from '../../Store/Store';
import { GetAxios, openNotificationSuccess, PatchAxios, PostAxios } from '../Assets/Api/Api';

import { ConfigProvider, message, Upload } from 'antd';
import { FaInbox } from 'react-icons/fa';

const DropBox = (props) => {
    const { Dragger } = Upload;

    const { fileList, setFileList } = props // State to store uploaded files

    const DraggerProps = {
        name: 'file',
        multiple: false,
        fileList, // This ensures the state-managed file list is displayed below the drop area
        beforeUpload: (file) => {
            // Validate file type: CSV or Excel only
            const isCSV = file.type === 'text/csv';
            const isExcel =
                file.type === 'application/vnd.ms-excel' || // XLS
                file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; // XLSX

            if (!isCSV && !isExcel) {
                alert("You can only upload CSV or Excel files!")
                // openNotificationSuccess("error", "topRight", "Error Notification", "You can only upload CSV or Excel files!");
                return Upload.LIST_IGNORE; // Ignore the file if it's not valid
            }

            if (fileList.length >= 1) {
                alert("You can only upload one file at a time");
            }
            else {
                setFileList(prev => [...prev, file]);
            }

            // Store the file in the state
            return false; // Prevent automatic upload
        },

        onRemove: (file) => {
            // Handle file removal
            setFileList(prev => prev.filter(item => item.uid !== file.uid));
        },

        onDrop: (e) => {
            console.log('Dropped files', e.dataTransfer.files);
        },

        listType: 'text', // Display the file list below the drop area
    };



    return (
        <ConfigProvider
            theme={{
                token: {
                    /* here is your global tokens */
                    colorPrimary: "#36b446"
                },
            }}
        >
            <Dragger {...DraggerProps}>
                <p className="ant-upload-drag-icon">
                    <FaInbox />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>

        </ConfigProvider>
    )
}





const OfferFom = (props) => {



    let [CSV, setCSV] = useState(false)


    useEffect(() => {
        if (props.modalObject.oppration === "CSV") {
            setCSV(true)
        }

    }, [])


    const [fileList, setFileList] = useState([]); // State to store uploaded files


    let initialValues = {
        investmentName: "",
        investmentCode: "",
    };


    const fillInitialValues = (setFieldValue) => {
        if (props.modalObject.oppration === "edit" && props.modalObject?.fullBank?.arrayOfOffers.length > 0) {
            //Check _id First

            setFieldValue("investmentName", props.modalObject.fullBank.arrayOfOffers[props.modalObject.index].investmentName || "")
            setFieldValue("investmentCode", props.modalObject.fullBank.arrayOfOffers[props.modalObject.index].investmentCode || "")

        }
    };

    let DefaultUrl = useRecoilValue(defaultUrl)
    let [bankDetailObj, setBankDetailObj] = useRecoilState(BankDetail)


    let onSubmit = async (values) => {
        let res;
        let ApiChali = "";
        const isEditMode = props.modalObject.oppration === "edit";
        const isCSVUpload = props.modalObject.oppration === "CSV";

        // Set the platform foreign key
        values.platformFK = props.modalObject.fullBank._id;

        try {
            if (!isEditMode) {
                if (isCSVUpload) {
                    const formData = new FormData();
                    formData.append("file", fileList[0]);
                    formData.append("platformFK", props.modalObject.fullBank._id);

                    // CSV upload operation
                    res = await PostAxios(`${DefaultUrl}/api/investmentCSV/upload`, formData);
                    ApiChali = "CSV Post";
                } else {
                    // Add new investment offer
                    res = await PostAxios(`${DefaultUrl}/api/investmentoffer/Add`, values);
                    ApiChali = "Post";
                }
            } else {
                // Update an existing offer
                values._id = props.modalObject.fullBank.arrayOfOffers[props.modalObject.index]._id;
                res = await PatchAxios(`${DefaultUrl}/api/investmentoffer/Update`, values);
                ApiChali = "Patch";
            }

            if (res) {

                fetchData();

                // Success notification
                openNotificationSuccess(
                    "success",
                    "topRight",
                    "Investment Notification",
                    `Investment is ${ApiChali === "Post" ? "Added" : "Updated"} successfully`
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

            // Error notification
            openNotificationSuccess("error", "topRight", "Error Notification", errorMessage);

            console.error("Error occurred:", error);
        }
    };

    // Fetch fresh data after CSV upload
    async function fetchData() {
        try {
            const res = await GetAxios(`${DefaultUrl}/api/investmentoffer/`);
            if (res) {
                setBankDetailObj(res); // Update bankDetailObj with new data
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }



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
                            {CSV ?

                                <div className='col-md-12 upload-container'>
                                    <DropBox fileList={fileList}
                                        setFileList={setFileList} setFieldValue={setFieldValue} />
                                </div>
                                :

                                <div className="col-md-12">
                                    <div className='row justify-content-between'>
                                        <div className='col-md-6 pt-2'>
                                            <label htmlFor='investmentName' className='form-label'>Investment Name</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <Field type="text" name="investmentName" id="investmentName" className="form-control inputDesignDoubleInput" />
                                            <ErrorMessage name='investmentName' component={"div"} className='text-danger' />
                                        </div>
                                    </div>
                                    <div className='row justify-content-between mt-2'>
                                        <div className='col-md-6 pt-2'>
                                            <label htmlFor='investmentCode' className='form-label'>Investment Code</label>
                                        </div>
                                        <div className='col-md-6'>
                                            <Field type="text" name="investmentCode" id="investmentCode" className="form-control inputDesignDoubleInput" />
                                            <ErrorMessage name='investmentCode' component={"div"} className='text-danger' />
                                        </div>
                                    </div>
                                </div>
                            }

                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default OfferFom;
