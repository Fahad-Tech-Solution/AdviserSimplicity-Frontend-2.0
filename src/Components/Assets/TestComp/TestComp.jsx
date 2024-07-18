import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "yup-phone";

//Images 
import plus from "../../../CashFlow/PersonalAssetsComponents/Homeloan_cashflow/images/plus.svg";
import { Card, Modal } from 'react-bootstrap'
import DynamicTable from "../Table/DynamicTable";
import axios from "axios";
import { DeleteAxios, PatchAxios, PostAxios } from "../Api/Api";
import { useRecoilState } from "recoil";
import { allAPIs, defaultUrl } from "../../../Store/Store";

const TestComp = () => {

    let [LumpsumPurchasesModal, setLumpsumPurchasesModal] = useState(false);
    let [UpdateFlag, setUpdateFlag] = useState(false);
    let [LumpsumPurchases, setLumpsumPurchases] = useState([]);
    
    let [defaultURL] = useRecoilState(defaultUrl);
    let [APIs] = useRecoilState(allAPIs);

    // let defaultURL = 'http://localhost:7000/api';
    let APi = `${defaultURL}/${APIs.TestApi}`;

    let TableHead = [
        { Thead: "Loan Type",         key: "Fixed" },
        { Thead: "Transaction Type",  key: "Transaction" },
        { Thead: "Amount",            key: "Amount" },
        { Thead: "From Year",         key: "statingYear" },
        { Thead: "To Year",           key: "EndingYear" },
        { Thead: "Indexation",        key: "Indexation" },
        { Thead: "Taken From/Credit", key: "Funds_Taken" },
        { Thead: "Operations",        key: "Opt" },
    ];

    useEffect(() => {
        foundData();
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    async function foundData() {
        let Response = await axios.get(`${APi}`);
        console.log(Response.data);
        setLumpsumPurchases(Response.data);
    }

    let initialValues = {
        Transaction: "",
        statingYear: "",
        EndingYear: "",
        Indexation: "",
        Amount: "",
        Funds_Taken: ""

    };

    let validationSchema = Yup.object().shape({
        Transaction: Yup.string().required('Required'),
        statingYear: Yup.string().required('Required'),
        EndingYear: Yup.string().required('To Year is required')
            .test('is-greater', 'To Year must be greater than From Year', function (value) {
                const fromYear = parseInt(this.resolve(Yup.ref('statingYear')));
                const toYear = parseInt(value);
                return toYear >= fromYear;
            }),
        Indexation: Yup.string().required('Required'),
        Amount: Yup.number().required('Required').test(
            "Is positive?",
            "Must be a positive number",
            (value) => value > 0
        ),
        Funds_Taken: Yup.string().required('Required'),
    });

    async function onSubmit(values, { resetForm }) {
        console.log(values);
        let data = {
            Transaction: values.Transaction,
            statingYear: values.statingYear,
            EndingYear: values.EndingYear,
            Indexation: values.Indexation,
            Amount: values.Amount,
            Funds_Taken: values.Funds_Taken,
        };

        if (UpdateFlag) {
            try {
                // Await the result of Patch Axios
                const Patch_result = await PatchAxios(`${APi}/Update/${values._id}`, data);

                console.log("Post_result", Patch_result); // This will log the response data from the server

                if (Patch_result) {
                    const updatedIndex = LumpsumPurchases.findIndex(
                        (item) => item._id === values._id
                    );
                    // Create a new array with the updated item
                    // const updatedData = [...advisors];
                    let updatedData = JSON.parse(JSON.stringify(LumpsumPurchases));

                    updatedData[updatedIndex].Transaction = Patch_result.Transaction;
                    updatedData[updatedIndex].statingYear = Patch_result.statingYear;
                    updatedData[updatedIndex].EndingYear = Patch_result.EndingYear;
                    updatedData[updatedIndex].Indexation = Patch_result.Indexation;
                    updatedData[updatedIndex].Amount = Patch_result.Amount;
                    updatedData[updatedIndex].Funds_Taken = Patch_result.Funds_Taken;

                    setLumpsumPurchases(updatedData);

                }

            } catch (error) {
                console.log(error);
            }


        }
        else {

            try {
                // Await the result of PostAxios
                const post_result = await PostAxios(`${APi}/Add`, data);
                console.log("Post_result", post_result); // This will log the response data from the server
                if (post_result) {
                    setLumpsumPurchases([...LumpsumPurchases, post_result]);
                }
            } catch (error) {
                console.log(error);
            }

        }


        resetForm();
    }

    let Operations = (...e) => {
        console.log(e);
        if (e[0] === 1) {setUpdateFlag(true);} else if (e[0] === 2) { DeleteTest(e[1]); }
    }

    async function DeleteTest(data) {
        console.log("Data for Delete", data);
        try {
            // Await the result of Delete Axios
            const Delete_result = await DeleteAxios(`${APi}/Delete/${data._id}`);
            console.log("Delete_result", Delete_result); // This will log the response data from the server
            if (Delete_result) {
                setLumpsumPurchases((prevData) => prevData.filter((item) => item._id !== data._id));
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <Card className="custom-shadow px-3 py-2">
                <label className="form-label">Lumpsum Home loan Repayments and additions</label>
                <br />
                <button type="button" className=" btn w-50 btn-outline-success "
                    onClick={() => { setLumpsumPurchasesModal(true); }}
                >
                    <div className="iconContainer mx-1">
                        <img className="img-fluid" src={plus} alt="" />
                    </div>
                    Enter Details
                </button>
            </Card>


            <Modal
                show={LumpsumPurchasesModal}
                onHide={() => { setLumpsumPurchasesModal(false) }}
                backdrop="static"
                className="modal-xl"
                keyboard={false}
            >
                <Modal.Header
                    className="text-light modalBG "
                    closeButton
                >
                    <Modal.Title className="fontStyle">
                        Lumpsum Home loan Repayments and additions
                        <div className="iconContainerLg">
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {({ values, setFieldValue, setValues, handleChange, handleBlur }) => (
                        <Form>
                            <Modal.Body>
                                {/* Professional Advisor Detail Form */}
                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="Transaction" className="form-label"> Transaction Type</label>
                                        <Field as="select" className="form-select shadow inputDesign" id="Transaction"
                                            name="Transaction" placeholder="Transaction"  >
                                            <option value="">Select</option>
                                            <option value="Addition">Addition</option>
                                            <option value="Purchase">Purchase</option>
                                        </Field>
                                        <ErrorMessage component="div" className="text-danger fw-bold" name="Transaction" />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="statingYear" className="form-label"> From Year</label>
                                        <Field as="select" className="form-select shadow inputDesign" id="statingYear"
                                            name="statingYear" placeholder="statingYear"  >
                                            <option value="">Select</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                        </Field>
                                        <ErrorMessage component="div" className="text-danger fw-bold" name="statingYear" />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="EndingYear" className="form-label"> To Year</label>
                                        <Field as="select" className="form-select shadow inputDesign" id="EndingYear"
                                            name="EndingYear" placeholder="EndingYear" >
                                            <option value="">Select</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                        </Field>
                                        <ErrorMessage component="div" className="text-danger fw-bold" name="EndingYear" />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="Indexation" className="form-label"> Indexation</label>
                                        <Field as="select" className="form-select shadow inputDesign" id="Indexation"
                                            name="Indexation" placeholder="Indexation"  >
                                            <option value="">Select</option>
                                            <option value="0.00%">0.00%</option>
                                            <option value="0.50%">0.50%</option>
                                            <option value="1.00%">1.00%</option>
                                            <option value="1.50%">1.50%</option>
                                            <option value="2.00%">2.00%</option>
                                            <option value="2.50%">2.50%</option>
                                            <option value="3.00%">3.00%</option>
                                            <option value="3.50%">3.50%</option>
                                            <option value="4.00%">4.00%</option>
                                            <option value="4.50%">4.50%</option>
                                            <option value="5.00%">5.00%</option>
                                            <option value="5.50%">5.50%</option>
                                            <option value="6.00%">6.00%</option>
                                            <option value="6.50%">6.50%</option>
                                            <option value="7.00%">7.00%</option>
                                            <option value="7.50%">7.50%</option>
                                            <option value="8.00%">8.00%</option>
                                            <option value="8.50%">8.50%</option>
                                            <option value="9.00%">9.00%</option>
                                            <option value="9.50%">9.50%</option>
                                            <option value="10.00%">10.00%</option>
                                        </Field>
                                        <ErrorMessage component="div" className="text-danger fw-bold" name="Indexation" />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-3">
                                        <label htmlFor="Amount" className="form-label">  Amount  </label>
                                        <Field type="number" className="form-control shadow inputDesign" id="Amount"
                                            name="Amount" placeholder="$00.00" />
                                        <ErrorMessage component="div" className="text-danger fw-bold" name="Amount" />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="Current_Balance" className="form-label"> Current Balance </label>
                                        <Field type="number" className="form-control shadow inputDesign" id="Current_Balance"
                                            name="Current_Balance" placeholder="$00.00" readOnly />
                                        <ErrorMessage component="div" className="text-danger fw-bold" name="Current_Balance" />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="Funds_Taken" className="form-label"> Funds Taken From/Credit </label>
                                        <Field as="select" className="form-select shadow inputDesign" id="Funds_Taken"
                                            name="Funds_Taken" placeholder="Funds_Taken"  >
                                            <option value="">Select</option>
                                            <option value="Cash_Flow">Cash Flow</option>
                                            <option value="Client’s_Cash_Account">Client’s Cash Account</option>
                                            <option value="Partner’s Cash Account">Partner’s Cash Account</option>
                                            <option value="Joint Cash Account">Joint Cash Account</option>
                                        </Field>
                                        <ErrorMessage component="div" className="text-danger fw-bold" name="Funds_Taken" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="my-3">
                                            <DynamicTable TableHead={TableHead} TData={LumpsumPurchases} Formik={true} Operations={Operations} FormikFun={setValues} Fixed="Home loan" />
                                        </div>
                                    </div>
                                </div>


                                {/* Professional Advisor Detail Form */}
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="col-md-12">
                                    <button
                                        className="float-end btn w-25  bgColor modalBtn"
                                        // onClick={handleClose}
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type='button'
                                        className="float-end btn w-25  btn-outline  backBtn mx-3"
                                        onClick={() => { setLumpsumPurchasesModal(false) }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>



        </div>
    )
}

export default TestComp
