import { Form, Formik } from 'formik'
import React from 'react'
import { Row } from 'react-bootstrap';

const GoalsForm = () => {
    let onSubmit = () => {

    }

    let initialValues = {
        ScopeOfAdvice: "",
        When: "",
        EstimatedValue: "",
        Description: "",
    }


    const fillInitialValues = (setFieldValue, loopValue) => {

        let arr = []

        for (let i = 0; i < loopValue; i++) {
            arr.push("");
        }

        setDynamicFields(arr);


        if (props.modalObject.editArray) {
            props.modalObject.editArray.forEach((data, i) => {
                if (data) {
                    console.log(data.investmentOption)
                    setFieldValue(`nominationType${i}`, data.nominationType || '');
                    setFieldValue(`beneficiaryName${i}`, data.beneficiaryName || '');
                    setFieldValue(`relationshipStatus${i}`, data.relationshipStatus || '');
                    setFieldValue(`shareBenefit${i}`, data.shareBenefit || '');
                }

            });
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
                    fillInitialValues(setFieldValue, values.NumberOfMap);
                }, [values.NumberOfMap]);

                return (
                    <Form>
                        <Row>

                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default GoalsForm
