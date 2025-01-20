import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import DynamicQuestionBlocks from '../../Components/Assets/DynamicQuestionBlocks/DynamicQuestionBlocks';
import { CFQObject, defaultUrl } from '../../Store/Store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { openNotificationSuccess, PatchAxios, PostAxios } from '../../Components/Assets/Api/Api';

const CFQModal = (props) => {
    let [CFObject, setCFObject] = useRecoilState(CFQObject);

    let DefaultUrl = useRecoilValue(defaultUrl);

    let [QuestionArray, setQuestionArray] = useState([]);

    let onSubmit = async (values) => {
        console.log(values)

        let obj = JSON.parse(JSON.stringify(values))

        obj.scenarioFK = (JSON.parse(localStorage.getItem("ScenarioObj")))._id;

        const bankAccountArray = CFObject?._id || "";

        console.log(obj, "final OBJ of CFQ Modal")
        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/CF/cf_basicQuestions/Add`, obj);
            } else {
                obj._id = CFObject._id;
                res = await PatchAxios(`${DefaultUrl}/api/CF/cf_basicQuestions/Update`, obj);
            }

            if (res) {
                console.log(res);
                setCFObject(res);

                openNotificationSuccess("success", "topRight", "Success Notification", `Data of "${props.modalObject.title}" is Saved`);
                if (props.flagState) {
                    props.setFlagState(false);
                }
            }
        } catch (error) {

            console.error("Error occurred while making API call:", error);
            openNotificationSuccess("error", "topRight", "Error Notification", `Data of "${props.modalObject.title}" is not Saved. Please try again.`);
        }
    }

    const QuestionClick = (index, elem, values, setFieldValue) => {
        console.log("image clicked in goals", index, elem.key, values);
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
                    {({ values, handleChange, setFieldValue }) => {


                        return (<Form>

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
                        </Form>
                        )
                    }
                    }
                </Formik>
            </div>
        </div>
    );
}

export default CFQModal
