import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { PatchAxios, PostAxios } from '../../Assets/Api/Api';
import DynamicTableRow from '../../Assets/Dynamic/DynamicTableRow';
import InnerModal from './QuestionsDetail/InnerModal';
import BankTermForm from './QuestionsDetail/BankTermForm';
import TermDeposit from './QuestionsDetail/TermDeposit';

const MiddleWare = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let BankAccountFinance = Object.keys(questionDetail[props.modalObject.key]).length > 0 ? questionDetail[props.modalObject.key] : {
        client: [],
        partner: [],
        joint: [],

    };// Use an empty object as default if BankAccountFinance is undefined


    let initialValues = {
        clientTotal: "",
        partnerTotal: "",
        jointTotal: ""
    };


    const fillInitialValues = (setFieldValue) => {
        console.log(questionDetail[props.modalObject.key], props.modalObject.key, props.modalObject.title);
        if (BankAccountFinance.clientFK && BankAccountFinance._id) {
            setFieldValue("client", BankAccountFinance.client)
            setFieldValue("clientTotal", BankAccountFinance.clientTotal)

            if (localStorage.getItem('UserStatus') === "Married") {

                setFieldValue("partner", BankAccountFinance.partner)
                setFieldValue("joint", BankAccountFinance.joint)
                setFieldValue("partnerTotal", BankAccountFinance.partnerTotal)
                setFieldValue("jointTotal", BankAccountFinance.jointTotal)
            }
        }
    };

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {

        console.log(values);


        // return false

        let obj = values;

        obj.clientFK = localStorage.getItem("UserID");

        console.log(obj, "final obj")

        // Check if BankAccountFinance and the array at props.modalObject.Input exist
        // const bankAccountArray = BankAccountFinance[props.modalObject.Input] || [];
        const bankAccountArray = BankAccountFinance.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/${props.modalObject.key}/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/${props.modalObject.key}/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, [props.modalObject.key]: res };
                setQuestionDetail(updatedData);
            }

            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }

        } catch (error) {
            console.error("Error occurred while making API call:", error);
        }

    };

    const rowConfig = [
        { type: "plainText", text: "client", styleSet: { width: "50%" }, },
        {
            name: 'clientTotal',
            type: 'number-toComma-Modal',
            placeholder: 'Current Balance',
            callBackModal: true,
            func: OpenInnerModal,
            key: "client",
            innerModalTitle: props.modalObject.title + " Detail"
        },
    ];

    const rowConfigPartner = [
        { type: "plainText", text: "partner", styleSet: { width: "50%" }, },
        {
            name: 'partnerTotal',
            type: 'number-toComma-Modal',
            placeholder: 'Current Balance',
            callBackModal: true,
            func: OpenInnerModal,
            key: "partner",
            innerModalTitle: props.modalObject.title + " Detail"
        },
    ];

    const rowConfigJoint = [
        { type: "plainText", text: "joint", styleSet: { width: "50%" }, },
        {
            name: 'jointTotal',
            type: 'number-toComma-Modal',
            placeholder: 'Current Balance',
            callBackModal: true,
            func: OpenInnerModal,
            key: "joint",
            innerModalTitle: props.modalObject.title + " Detail"
        },
    ];

    async function OpenInnerModal(title, values, key) {
        console.log(title, values, key);
        setModalObject({
            title,
            Input: key,
            key: props.modalObject.key,
            values
        });
        setFlagState(true);
    }


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
                }, [values.NumberOfMap]);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">

                                <InnerModal modalObject={modalObject} setFieldValue={setFieldValue} setFlagState={setFlagState} flagState={flagState} >
                                    {
                                        modalObject.title === "Bank Accounts Detail" ? <BankTermForm /> :
                                            modalObject.title === "Term Deposits Detail" ? <BankTermForm /> : ""   //Called Same For Term Deposit Becuse Api is Here and in that Modal All attrebutes and Functionalities are Same
                                    }
                                </InnerModal>

                                <div className='row justify-content-center'>
                                    <div className='mt-4'>
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Owner</th>
                                                    <th>Current Balance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <DynamicTableRow
                                                    rowConfig={rowConfig}
                                                    values={values}
                                                    setFieldValue={setFieldValue}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                />
                                                {(localStorage.getItem('UserStatus') === "Married") &&
                                                    <React.Fragment>
                                                        <DynamicTableRow
                                                            rowConfig={rowConfigPartner}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                        />
                                                        <DynamicTableRow
                                                            rowConfig={rowConfigJoint}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleChange={handleChange}
                                                            handleBlur={handleBlur}
                                                        />
                                                    </React.Fragment>
                                                }
                                            </tbody>
                                        </Table>
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

export default MiddleWare;
