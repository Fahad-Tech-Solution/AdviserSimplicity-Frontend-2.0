import { React, useState, useEffect } from "react";
// import * as Yup from "yup";  //? don't Remove it you might need it later
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Modal } from "react-bootstrap";
import plus from "../ClientInvestment/images/plus.svg";
import lawyer from "../ClientInvestment/images/lawyer.svg";
import notebook from "../ClientInvestment/images/notebook.svg";
import axios from "axios";
import CustomDropDown from "../../Assets/CustomDropDown/CustomDropDown";


const TermComp = (props) => {

    const [TermAccountList, setTermAccountList] = useState([]);
    const [TermObj, setTermObj] = useState([]);
    const [TermEdit, setTermEdit] = useState(false);

    const [TermAccount, setTermAccount] = useState(false);  // eslint-disable-line no-unused-vars

    const [Termshow, setTermShow] = useState(false);
    const TermhandleClose = () => setTermShow(false);
    const TermhandleShow = () => setTermShow(true);

    // let TermAccountHandler = (elem) => {
    //     if (elem === "No") {
    //         setTermAccount(false);
    //     } else {
    //         setTermAccount(true);
    //     }
    // };

    useEffect(() => {
        let email = localStorage.getItem("Email");
        if (email) {
            GetApiFunctionTerm(email);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let GetApiFunctionTerm = async (email) => {
        try {

            let clientIn = await axios.get(`${props.api}/`);
            clientIn = clientIn.data;
            clientIn = clientIn.filter((item) => item.Email === email);
            setTermAccountList(clientIn);

            if (clientIn.length) {
                console.log("Term Got it");
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    let Client_initialValues = {
        TermDepositCurrentValue: "",
        TermDepositFinancialInstitution: "",
        TermDepositIncomePA: "",
        TermDepositIncomePAType: "",
        TermDepositIncomeinDollars: "",
        TermDepositRegularSavings: "",
        TermDepositReinvestedIncome: "No",
    };

    // let Client_validationSchemaTermAccountDetails = Yup.object({
    //     TermCurrentValue: Yup.number().test(
    //         "Is positive?",
    //         "Must be a positive value",
    //         (value) => value > 0
    //     ),
    //     TermFinancialInstitution: Yup.string().required("This field is required"),
    //     TermIncomePA: Yup.number().test(
    //         "Is positive?",
    //         "Must be a positive value",
    //         (value) => value > 0
    //     ),
    //     TermIncomePAType: Yup.string(),
    //     TermRegularSavings: Yup.number().test(
    //         "Is positive?",
    //         "Must be a positive value",
    //         (value) => value > 0
    //     ),

    //     Term2CurrentValue: Yup.number().test(
    //         "Is positive?",
    //         "Must be a positive value",
    //         (value) => value > 0
    //     ),
    //     Term2FinancialInstitution: Yup.string().required("This field is required"),
    //     Term2IncomePA: Yup.number().test(
    //         "Is positive?",
    //         "Must be a positive value",
    //         (value) => value > 0
    //     ),
    //     Term2IncomePAType: Yup.string(),
    //     Term2RegularSavings: Yup.number().test(
    //         "Is positive?",
    //         "Must be a positive value",
    //         (value) => value > 0
    //     ),
    // });

    let TermAccount_onSubmit = (values) => {

        let TermDetails = {
            Email: localStorage.getItem("Email"),
            TermDepositCurrentValue: values.TermDepositCurrentValue,
            TermDepositFinancialInstitution: values.TermDepositFinancialInstitution,
            TermDepositIncomePA: values.TermDepositIncomePA,
            TermDepositIncomePAType: values.TermDepositIncomePAType,
            TermDepositIncomeinDollars: (values.TermDepositIncomePAType === "" ? 0 : values.TermDepositIncomePAType === "dollor" ? (parseFloat(values.TermDepositIncomePA) || 0)
                : parseFloat((((parseFloat(values.TermDepositIncomePA) || 0) / 100) * (parseFloat(values.TermDepositCurrentValue) || 0)).toFixed(2))),
            TermDepositRegularSavings: values.TermDepositRegularSavings,
            TermDepositReinvestedIncome: values.TermDepositReinvestedIncome,
        };

        console.log("Term length is =" + TermAccountList.length);

        if (TermEdit) {
            axios
                .patch(
                    `${props.api}/Update/${TermDetails.Email}/${values._id}`,
                    TermDetails
                )
                .then((res) => {
                    //Popper Massage
                    console.log("Term Updated Complete");
                    setTermEdit(false);

                });
        } else {
            if (TermAccountList.length < 2) {
                axios
                    .post(`${props.api}/Add`, TermDetails)
                    .then((res) => console.log("Term Accounts Added Successfully!"));
            }
            else {
                alert("You can Add only two Term's Data");
            }
        }


        setTimeout(() => {
            GetApiFunctionTerm(TermDetails.Email);
        }, 500);

        TermhandleClose();
        console.log(TermDetails);
    };

    // Term delete and Update

    let TermOperations = (Option, elem, deleteData) => {
        if (Option === 1) {
            // setShow(true);
            setTermEdit(true);
            setTermObj(elem);
            setTermShow(true);
        } else if (Option === 2) {
            deleteApiFunc(elem, deleteData);
        }
    };

    let deleteApiFunc = (elem, deletData) => {
        let email = elem.Email;

        axios.delete(
            `${props.api}/Delete/${email}/${elem._id}`, elem
        ).then((res) => {
            //Popper Massage
            console.log("Term Delete Complete");
        });

        setTimeout(() => {
            GetApiFunctionTerm(email)
        }, 500);
    };

    let UpdateData = (elem) => {
        console.log(elem);
    }


    return (
        <div className="mb-5">
            <h3 className="">Term Deposit</h3>

            {/* 1 row */}
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">
                            Do you have any Term Deposit?
                        </label>
                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                                <input
                                    type="radio"
                                    name="TermAccountRadio"
                                    id={props.btnName + "1opt1"}
                                    value="Yes"
                                    onClick={() => props.change("Yes")}
                                    checked={props.YesNObtn === "Yes"}
                                // onClick={() => setTermButton("Yes")}
                                // checked={TermButton === "Yes"}

                                />
                                <label
                                    htmlFor={props.btnName + "1opt1"}
                                    className="label1"
                                >
                                    <span>YES</span>
                                </label>
                                <input
                                    type="radio"
                                    name="TermAccountRadio"
                                    id={props.btnName + "1opt2"}
                                    value="No"
                                    onClick={() => props.change("No")}
                                    checked={props.YesNObtn === "No"}
                                />
                                <label
                                    htmlFor={props.btnName + "1opt2"}
                                    className="label2"
                                >
                                    <span>NO</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {props.YesNObtn === "Yes" && (
                    <div className="col-md-6">
                        <label className="form-label">
                            Please enter the details of your Term Accounts
                        </label>
                        <br />

                        <button
                            type="button"
                            className=" btn btn-outline-success "
                            onClick={TermhandleShow}
                        >
                            <div className="iconContainer mx-1">
                                <img className="img-fluid" src={plus} alt="" />
                            </div>
                            Enter Details
                        </button>
                    </div>
                )}

            </div>
            {/* 1 row */}

            {/* --------------------------------------------- */}

            <Modal
                show={Termshow}
                onHide={TermhandleClose}
                backdrop="static"
                className="modal-lg"
                keyboard={false}
            >
                <Modal.Header className="text-light modalBG " closeButton>
                    <Modal.Title className="fontStyle">
                        Term Deposit Account Details
                        <div className="iconContainerLg">
                            <img className="img-fluid" src={notebook} alt="" />
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={
                        TermEdit ? TermObj : Client_initialValues
                    }
                    // validationSchema={Client_validationSchemaTermAccountDetails}
                    onSubmit={TermAccount_onSubmit}
                    enableReinitialize
                >
                    {({
                        values,
                        setFieldValue,
                        setValues,
                        handleChange,
                        formik,
                    }) => (
                        <Form>
                            <Modal.Body>
                                {/* Professional Advisor Detail Form */}

                                {/* Solicitor */}
                                <div className=" ">
                                    <h3 className="">
                                        <div className="iconContainerLg mx-1">
                                            <img
                                                className="img-fluid"
                                                src={lawyer}
                                                alt=""
                                            />
                                        </div>
                                        TermDeposit
                                    </h3>

                                    <div className="row">
                                        <div className="col-4 mb-3">
                                            <label
                                                htmlFor="TermDepositCurrentValue"
                                                className="form-label"
                                            >
                                                Current Value
                                            </label>
                                        </div>
                                        <div className="col-4 mb-3">
                                            <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="TermDepositCurrentValue"
                                                name="TermDepositCurrentValue"
                                                placeholder="Current Value"
                                            />
                                            <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="TermDepositCurrentValue"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4 mb-3">
                                            <label
                                                htmlFor="TermDepositFinancialInstitution"
                                                className="form-label"
                                            >
                                                Financial Institution
                                            </label>
                                        </div>
                                        <div className="col-4 mb-3">
                                            <Field
                                                type="text"
                                                className="form-control shadow inputDesign"
                                                id="TermDepositFinancialInstitution"
                                                name="TermDepositFinancialInstitution"
                                                placeholder="Financial Institution"
                                            />
                                            <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="TermDepositFinancialInstitution"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4 mb-3">
                                            <label
                                                htmlFor="TermDepositIncomePA"
                                                className="form-label"
                                            >
                                                Income P.A.
                                            </label>
                                        </div>
                                        <div className="col-4 mb-3">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <Field
                                                        type="number"
                                                        className="form-control shadow inputDesign"
                                                        id="TermDepositIncomePA"
                                                        name="TermDepositIncomePA"
                                                        placeholder="Income P.A."
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                        name="TermDepositIncomePA"
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <Field
                                                        as="select"
                                                        name="TermDepositIncomePAType"
                                                        id="TermDepositIncomePAType"
                                                        className="form-select shadow  inputDesign"
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="dollor">$</option>
                                                        <option value="percentage">%</option>
                                                    </Field>
                                                    <ErrorMessage
                                                        name="TermDepositIncomePAType"
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4 mb-3">
                                            <label
                                                htmlFor="TermDepositIncomePAType"
                                                className="form-label"
                                            >
                                                Income in $
                                            </label>
                                        </div>
                                        <div className="col-4 mb-3">
                                            <Field
                                                type="text"
                                                className="form-control shadow inputDesign"
                                                id="TermDepositIncomeinDollars"
                                                name="TermDepositIncomeinDollars"
                                                placeholder="Income in $"
                                                readOnly
                                                value={
                                                    values.TermDepositIncomePAType === ""
                                                        ? 0
                                                        : values.TermDepositIncomePAType ===
                                                            "dollor"
                                                            ? parseFloat(
                                                                values.TermDepositIncomePA
                                                            ) || 0
                                                            : parseFloat(
                                                                (
                                                                    ((parseFloat(
                                                                        values.TermDepositIncomePA
                                                                    ) || 0) /
                                                                        100) *
                                                                    (parseFloat(
                                                                        values.TermDepositCurrentValue
                                                                    ) || 0)
                                                                ).toFixed(2)
                                                            )
                                                }
                                            />
                                            <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="TermDepositIncomeinDollars"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4 mb-3">
                                            <label
                                                htmlFor="TermDepositFinancialInstitution"
                                                className="form-label"
                                            >
                                                Regular Savings
                                            </label>
                                        </div>
                                        <div className="col-4 mb-3">
                                            <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="TermDepositRegularSavings"
                                                name="TermDepositRegularSavings"
                                                placeholder="Regular Savings"
                                            />
                                            <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="TermDepositRegularSavings"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4 mb-3">
                                            <label className="form-label">
                                                Reinvestment Income
                                            </label>
                                        </div>
                                        <div className="col-4 mb-3">
                                            <div className="radiobutton">
                                                <input
                                                    type="radio"
                                                    name="TermDepositReinvestedIncome"
                                                    id="TermDepositReinvestedOpt1"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={
                                                        values.TermDepositReinvestedIncome ===
                                                        "Yes"
                                                    }
                                                />
                                                <label
                                                    htmlFor="TermDepositReinvestedOpt1"
                                                    className="label1"
                                                >
                                                    <span>YES</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="TermDepositReinvestedIncome"
                                                    id="TermDepositReinvestedOpt2"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={
                                                        values.TermDepositReinvestedIncome ===
                                                        "No"
                                                    }
                                                />
                                                <label
                                                    htmlFor="TermDepositReinvestedOpt2"
                                                    className="label2"
                                                >
                                                    <span>NO</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Solicitor */}

                                {/* TermDeposit Account Detail Form */}
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="col-md-12">
                                    <button
                                        className="float-end btn w-25  bgColor modalBtn"
                                        // onClick={TermDeposithandleClose}
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="float-end btn w-25  btn-outline  backBtn mx-3"
                                        onClick={TermhandleClose}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>

            {/* ---------------------------------------------------- */}

            <div className="table-responsive my-3">
                <table className="table table-bordered table-hover text-center">
                    <thead className="text-light" id="tableHead">
                        <tr>
                            <th>Current Values</th>
                            <th>Financial Institution</th>
                            <th>Income</th>
                            <th>Reinvest Income</th>
                            <th>Operations</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Term #1  */}
                        {TermAccountList.map((elem, index) => {
                            return (
                                <tr key={index}>
                                    {/* <td className='fw-bold'>Term #1</td> */}
                                    <td>{elem.TermDepositCurrentValue}</td>
                                    <td>{elem.TermDepositFinancialInstitution}</td>
                                    <td>{elem.TermDepositIncomePA}</td>
                                    <td>{elem.TermDepositReinvestedIncome}</td>
                                    <td>
                                        <CustomDropDown
                                            Operations={TermOperations}
                                            Delete={elem._id}
                                            Data={elem}
                                            FormikFun={UpdateData}
                                        />

                                    </td>
                                </tr>
                            );
                        })}
                        {/* Term #1  */}


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TermComp
