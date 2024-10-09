import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Row } from 'react-bootstrap';

import "yup-phone";
import * as Yup from 'yup';

const RiskTermsAndConditions = (props) => {

    let initialValues = { description: "" };

    const fillInitialValues = (setFieldValue) => {
        console.log(props.modalObject.values, props.modalObject.key)

        if (props.modalObject.values?.[props.modalObject.stackHolder]) {
            setFieldValue("confirmRiskProfileCheck1", props.modalObject.values?.[props.modalObject.stackHolder]?.confirmRiskProfileCheck1)
            setFieldValue("confirmRiskProfileCheck2", props.modalObject.values?.[props.modalObject.stackHolder]?.confirmRiskProfileCheck2)
            setFieldValue("confirmRiskProfileCheck3", props.modalObject.values?.[props.modalObject.stackHolder]?.confirmRiskProfileCheck3)
        }

    };

    let onSubmit = async (values) => {

        props.setFieldValue(`${props.modalObject.stackHolder}.confirmRiskProfileCheck1`, values.confirmRiskProfileCheck1);
        props.setFieldValue(`${props.modalObject.stackHolder}.confirmRiskProfileCheck2`, values.confirmRiskProfileCheck2);
        props.setFieldValue(`${props.modalObject.stackHolder}.confirmRiskProfileCheck3`, values.confirmRiskProfileCheck3);
        props.setFieldValue(`${props.modalObject.stackHolder}.happyWithResult`, true);

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    };

    const validationSchema = Yup.object({
        confirmRiskProfileCheck1: Yup.boolean()
            .oneOf([true], 'All Terms and Conditions should be checked')
            .required('Required'),
        confirmRiskProfileCheck2: Yup.boolean()
            .oneOf([true], 'All Terms and Conditions should be checked')
            .required('Required'),
        confirmRiskProfileCheck3: Yup.boolean()
            .oneOf([true], 'All Terms and Conditions should be checked')
            .required('Required'),
    });


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            validationSchema={validationSchema}
            innerRef={props.formRef}
        >
            {({ values, handleChange, setFieldValue, handleBlur, errors }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-start'>
                                    <div className='col-md-12 d-flex mt-2'>
                                        <Field type="checkbox" id="confirmRiskProfileCheck1"
                                            value={values.confirmRiskProfileCheck1}
                                            checked={values.confirmRiskProfileCheck1}
                                            onChange={(e) => {
                                                // console.log(!values.confirmRiskProfileCheck1)
                                                setFieldValue(e.target.name, !values.confirmRiskProfileCheck1);
                                            }}
                                            name={"confirmRiskProfileCheck1"} className="form-check-input newCheck" />
                                        <div className='d-inline-block ms-2'>
                                            <label htmlFor='confirmRiskProfileCheck1'>I acknowledge and understand my Adviser can't be held personally responsible for the outcome of any money which is invested in accordance with my selected risk profile. I acknowledge and understand that any potential gains or losses on any money with is invested in accordance with my selected risk profile will be impacted by such factors as tax, inflation, changes in legislation and governments and impact on the world economies, which are all things out my Advisers control.</label>
                                        </div>

                                    </div>
                                    <div className='col-md-12 d-flex mt-2'>
                                        <Field type="checkbox" id="confirmRiskProfileCheck2"
                                            value={values.confirmRiskProfileCheck2}
                                            checked={values.confirmRiskProfileCheck2}
                                            onChange={(e) => {
                                                // console.log(!values.confirmRiskProfileCheck1)
                                                setFieldValue(e.target.name, !values.confirmRiskProfileCheck2);
                                            }}
                                            name={"confirmRiskProfileCheck2"} className="form-check-input newCheck" />
                                        <div className='d-inline-block ms-2'>
                                            <label htmlFor='confirmRiskProfileCheck2'>I acknowledge that my Adviser has explained to me the trade off between risk and return and the effects of this on any investments made in accordance with my selected risk profile.</label>
                                        </div>

                                    </div>
                                    <div className='col-md-12 d-flex mt-2'>
                                        <Field type="checkbox" id="confirmRiskProfileCheck3"
                                            name={"confirmRiskProfileCheck3"} className="form-check-input newCheck"
                                            value={values.confirmRiskProfileCheck3}
                                            checked={values.confirmRiskProfileCheck3}
                                            onChange={(e) => {
                                                // console.log(!values.confirmRiskProfileCheck1)
                                                setFieldValue(e.target.name, !values.confirmRiskProfileCheck3);
                                            }}
                                        />
                                        <div className='d-inline-block ms-2'>
                                            <label htmlFor='confirmRiskProfileCheck3'>By pressing "Accept" I confirm and acknowledge that I am comfortable with the selected risk profile.</label>
                                        </div>
                                    </div>
                                    <div className='mt-4 ps-4'>
                                        {(values.confirmRiskProfileCheck3 && values.confirmRiskProfileCheck2 && values.confirmRiskProfileCheck1) ? "" : <div className='text-danger fw-bold'> All Terms and Conditions Should be Checked</div>}
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
