import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';

const RiskTermsAndConditions = (props) => {

    let initialValues = { description: "" };

    const fillInitialValues = (setFieldValue) => {
        console.log(props.modalObject.values, props.modalObject.key)
        if (props.modalObject.values?.[props.modalObject.stackHolder.replace(".", "")]?.[props.modalObject.key]) {
            setFieldValue("description", props.modalObject.values?.[props.modalObject.stackHolder.replace(".", "")]?.[props.modalObject.key])
        }

    };

    let onSubmit = async (values) => {



        props.setFieldValue(`${props.modalObject.key}`, values)

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
                                    <div className='col-md-12 d-flex mt-2'>
                                        <Field type="checkbox" id="confirmRiskProfileCheck1" name={"confirmRiskProfileCheck1"} className="form-check-input newCheck" />
                                        <div className='d-inline-block ms-2'>
                                            <label htmlFor='confirmRiskProfileCheck1'>I acknowledge and understand my Adviser can't be held personally responsible for the outcome of any money which is invested in accordance with my selected risk profile. I acknowledge and understand that any potential gains or losses on any money with is invested in accordance with my selected risk profile will be impacted by such factors as tax, inflation, changes in legislation and governments and impact on the world economies, which are all things out my Advisers control.</label>
                                        </div>
                                    </div>
                                    <div className='col-md-12 d-flex mt-2'>
                                        <Field type="checkbox" id="confirmRiskProfileCheck2" name={"confirmRiskProfileCheck2"} className="form-check-input newCheck" />
                                        <div className='d-inline-block ms-2'>
                                            <label htmlFor='confirmRiskProfileCheck2'>I acknowledge that my Adviser has explained to me the trade off between risk and return and the effects of this on any investments made in accordance with my selected risk profile.</label>
                                        </div>
                                    </div>
                                    <div className='col-md-12 d-flex mt-2'>
                                        <Field type="checkbox" id="confirmRiskProfileCheck3" name={"confirmRiskProfileCheck3"} className="form-check-input newCheck" />
                                        <div className='d-inline-block ms-2'>
                                            <label htmlFor='confirmRiskProfileCheck3'>By pressing "Accept" I confirm and acknowledge that I am comfortable with the selected risk profile.</label>
                                        </div>
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

export default RiskTermsAndConditions;
