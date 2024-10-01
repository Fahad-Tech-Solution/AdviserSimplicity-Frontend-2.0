import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';

const DynamicDescription = (props) => {

    let initialValues = { description: "" };

    const fillInitialValues = (setFieldValue) => {

        if (props.modalObject.values?.[props.modalObject.stackHolder.replace(".", "")]?.[props.modalObject.key]) {
            setFieldValue("description", props.modalObject.values?.[props.modalObject.stackHolder.replace(".", "")]?.[props.modalObject.key])
        }

    };

    let onSubmit = async (values) => {

        console.log(values)

        props.setFieldValue(`${props.modalObject.stackHolder}${props.modalObject.key}`, values.description)

        if (props.modalObject.values.owner === "together") {
            props.setFieldValue(`partner.${props.modalObject.key}`, values.description)
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
            {({ values, handleChange, setFieldValue, handleBlur }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-start'>
                                    <div className='col-md-12'>
                                        <label className='fw-bold'>Description</label>
                                        <Field type="text" as="textarea" name="description" className="form-control mt-2 inputDesignDoubleInput"></Field>
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

export default DynamicDescription;
