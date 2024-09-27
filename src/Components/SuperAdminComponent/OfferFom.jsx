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

        let haveData = props.modalObject.oppration === "edit" ? true : false;

        let ApiChali = ""
        let res;

        console.log(haveData, bankDetailObj, "ma kea karo", props.modalObject.fullBank.arrayOfOffers[props.modalObject.index])

        values.platformFK = props.modalObject.fullBank._id
        console.log(values, "all Values")

        try {

            if (!haveData) {

                if (props.modalObject.oppration === "CSV") {

                    const formData = new FormData();
                    formData.append("file", fileList[0]);
                    formData.append("platformFK", props.modalObject.fullBank._id);


                    res = await PostAxios(
                        `${DefaultUrl}/api/investmentCSV/upload`,
                        formData
                    );
                    ApiChali = "CSV Post"

                } else {
                    res = await PostAxios(
                        `${DefaultUrl}/api/investmentoffer/Add`,
                        values
                    );
                    ApiChali = "Post"
                }



            } else {
                values._id = props.modalObject.fullBank.arrayOfOffers[props.modalObject.index]._id;

                console.log(values)

                res = await PatchAxios(
                    `${DefaultUrl}/api/investmentoffer/Update`,
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
                else if (ApiChali === "CSV Post") {
                    // alert("kuch karo")
                    fetchData();
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


    async function fetchData() {
        try {
            const res = await GetAxios(`${DefaultUrl}/api/investmentoffer/`);
            if (res) {
                console.log(JSON.stringify(res))
                setBankDetailObj(res)
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
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
                                        <div className='col-md-4'>
                                            <Field type="text" name="investmentName" id="investmentName" className="form-control inputDesign" />
                                            <ErrorMessage name='investmentName' component={"div"} className='text-danger' />
                                        </div>
                                    </div>
                                    <div className='row justify-content-between mt-2'>
                                        <div className='col-md-6 pt-2'>
                                            <label htmlFor='investmentCode' className='form-label'>Investment Code</label>
                                        </div>
                                        <div className='col-md-4'>
                                            <Field type="text" name="investmentCode" id="investmentCode" className="form-control inputDesign" />
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
