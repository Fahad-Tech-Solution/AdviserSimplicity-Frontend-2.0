import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import DynamicQuestionBlocks from '../../Components/Assets/DynamicQuestionBlocks/DynamicQuestionBlocks';
import { CFQObject } from '../../Store/Store';
import { useRecoilState } from 'recoil';

const CFQModal = (props) => {
    let [CFObject, setCFObject] = useRecoilState(CFQObject);
    let [QuestionArray, setQuestionArray] = useState([]);

    let onSubmit = (values) => {
        console.log(values)
        setCFObject(values)
        if (props.flagState) {
            props.setFlagState(false);
        }
    }

    const QuestionClick = (index, elem, values, setFieldValue) => {
        // console.log("image clicked in goals", index, elem.key, values);
        if (values[elem.key] == "No") {
            setFieldValue(elem.key, "Yes");
        }
        if (values[elem.key] == "Yes") {
            setFieldValue(elem.key, "No");
        }
    };


    useEffect(() => {
        console.log(props.modalObject.QuestionsArray)

        setQuestionArray(props.modalObject.QuestionsArray || [])

    }, [])


    return (
        <div className="container-fluid">
            <div className="row m-0">
                <Formik
                    initialValues={CFObject}
                    onSubmit={onSubmit}
                    enableReinitialize
                    innerRef={props.formRef}
                >
                    {({ values, handleChange, setFieldValue }) => <Form>

                        <div className="col-md-12 text-center">

                            <div className="row my-3 justify-content-center">
                                <DynamicQuestionBlocks QuestionArray={QuestionArray} QuestionClick={QuestionClick} values={values} setFieldValue={setFieldValue} />
                            </div>

                            <div className="row mt-2 d-none">
                                <div className="col-md-12">
                                    <button
                                        onClick={() => {

                                        }}
                                        type="submit"
                                        className="float-end btn w-25  bgColor modalBtn"
                                    >
                                        Next
                                    </button>
                                    <button
                                        onClick={() => {

                                        }}
                                        className="float-end btn w-25  btn-outline  backBtn mx-3 d-none">
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>}
                </Formik>
            </div>
        </div>
    );
}

export default CFQModal
