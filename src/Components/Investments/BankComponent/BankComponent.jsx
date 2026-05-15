import { React, useState, useEffect } from "react";
// import * as Yup from "yup"; //? don't Remove it you might need it later
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Modal } from "react-bootstrap";
import plus from "../ClientInvestment/images/plus.svg";
import lawyer from "../ClientInvestment/images/lawyer.svg";
import notebook from "../ClientInvestment/images/notebook.svg";
import axios from "axios";
import CustomDropDown from "../../Assets/CustomDropDown/CustomDropDown";


const BankComponent = (props) => {

    const [BankAccountList, setBankAccountList] = useState([]);
    const [BankObj, setBankObj] = useState([]);
    const [BankEdit, setBankEdit] = useState(false);
    
    const [Bankshow, setBankShow] = useState(false);
    const BankhandleClose = () => setBankShow(false);
    const BankhandleShow = () => setBankShow(true);


    useEffect(() => {
        let email = localStorage.getItem("Email");
        if (email) {
            GetApiFunctionBank(email);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let GetApiFunctionBank = async (email) => {
        try {

            let clientIn = await axios.get(`${props.api}/`);
            clientIn = clientIn.data;
            clientIn = clientIn.filter((item) => item.Email === email);
            setBankAccountList(clientIn);

            if (clientIn.length) {
                console.log("Bank Got it");
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    let Client_initialValues = {
        BankCurrentValue: "",
        BankFinancialInstitution: "",
        BankIncomePA: "",
        BankIncomePAType: "",
        BankIncomeinDollars: "",
        BankRegularSavings: "",
        BankReinvestedIncome: "No",
    };

    // let Client_validationSchemaBankAccountDetails = Yup.object({
    //     BankCurrentValue: Yup.number().test(
    //         "Is positive?",
    //         "Must be a positive value",
    //         (value) => value > 0
    //     ),
    //     BankFinancialInstitution: Yup.string().required("This field is required"),
    //     BankIncomePA: Yup.number().test(
    //         "Is positive?",
    //         "Must be a positive value",
    //         (value) => value > 0
    //     ),
    //     BankIncomePAType: Yup.string(),
    //     BankRegularSavings: Yup.number().test(
    //         "Is positive?",
    //         "Must be a positive value",
    //         (value) => value > 0
    //     ),

    //     Bank2CurrentValue: Yup.number().test(
    //         "Is positive?",
    //         "Must be a positive value",
    //         (value) => value > 0
    //     ),
    //     Bank2FinancialInstitution: Yup.string().required("This field is required"),
    //     Bank2IncomePA: Yup.number().test(
    //         "Is positive?",
    //         "Must be a positive value",
    //         (value) => value > 0
    //     ),
    //     Bank2IncomePAType: Yup.string(),
    //     Bank2RegularSavings: Yup.number().test(
    //         "Is positive?",
    //         "Must be a positive value",
    //         (value) => value > 0
    //     ),
    // });

    let BankAccount_onSubmit = (values) => {

        let BankDetails = {
            Email: localStorage.getItem("Email"),
            BankCurrentValue: values.BankCurrentValue,
            BankFinancialInstitution: values.BankFinancialInstitution,
            BankIncomePA: values.BankIncomePA,
            BankIncomePAType: values.BankIncomePAType,
            BankIncomeinDollars:
                values.BankIncomePAType === ""
                    ? 0
                    : values.BankIncomePAType === "dollor"
                        ? parseFloat(values.BankIncomePA) || 0
                        : parseFloat(
                            (
                                ((parseFloat(values.BankIncomePA) || 0) / 100) *
                                (parseFloat(values.BankCurrentValue) || 0)
                            ).toFixed(2)
                        ),
            BankRegularSavings: values.BankRegularSavings,
            BankReinvestedIncome: values.BankReinvestedIncome,

        };

        console.log("Bank length is =" + BankAccountList.length);

        if (BankEdit) {
            axios
                .patch(
                    `${props.api}/Update/${BankDetails.Email}/${values._id}`,
                    BankDetails
                )
                .then((res) => {
                    //Popper Massage
                    console.log("Bank Updated Complete");
                    setBankEdit(false);

                });
        } else {
            if (BankAccountList.length < 2) {
                axios
                    .post(`${props.api}/Add`, BankDetails)
                    .then((res) => console.log("Bank Accounts Added Successfully!"));
            }
            else {
                alert("You can Add only two Bank's Data");
            }
        }


        setTimeout(() => {
            GetApiFunctionBank(BankDetails.Email);
        }, 500);

        BankhandleClose();
        console.log(BankDetails);
    };

    // Bank delete and Update

    let BankOperations = (Option, elem, deleteData) => {
        if (Option === 1) {
            // setShow(true);
            setBankEdit(true);
            setBankObj(elem);
            setBankShow(true);
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
            console.log("Bank Delete Complete");
        });

        setTimeout(() => {
            GetApiFunctionBank(email)
        }, 500);
    };

    let UpdateData = (elem) => {
        console.log(elem);
    }


    return (
        <div className="mb-5">
            <h3 className="">Bank Accounts</h3>

            {/* 1 row */}
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">
                            Do you have any Bank Accounts?
                        </label>
                        {/* switch button style */}
                        <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                                <input
                                    type="radio"
                                    name="BankAccountRadio"
                                    id={props.btnName + "1opt1"}
                                    value="Yes"
                                    onClick={() => props.change("Yes")}
                                    checked={props.YesNObtn === "Yes"}
                                // onClick={() => setBankButton("Yes")}
                                // checked={BankButton === "Yes"}

                                />
                                <label
                                    htmlFor={props.btnName + "1opt1"}
                                    className="label1"
                                >
                                    <span>YES</span>
                                </label>
                                <input
                                    type="radio"
                                    name="BankAccountRadio"
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
                            Please enter the details of your Bank Accounts
                        </label>
                        <br />

                        <button
                            type="button"
                            className=" btn btn-outline-success "
                            onClick={BankhandleShow}
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
                show={Bankshow}
                onHide={BankhandleClose}
                backdrop="static"
                className="modal-lg"
                keyboard={false}
            >
                <Modal.Header className="text-light modalBG " closeButton>
                    <Modal.Title className="fontStyle">
                        Bank Account Details
                        <div className="iconContainerLg">
                            <img className="img-fluid" src={notebook} alt="" />
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={
                        BankEdit ? BankObj : Client_initialValues
                    }
                    // validationSchema={Client_validationSchemaBankAccountDetails}
                    onSubmit={BankAccount_onSubmit}
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
                                        Bank
                                    </h3>

                                    <div className="row">
                                        <div className="col-4 mb-3">
                                            <label
                                                htmlFor="BankCurrentValue"
                                                className="form-label"
                                            >
                                                Current Value{" "}
                                            </label>
                                        </div>
                                        <div className="col-4 mb-3">
                                            <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="BankCurrentValue"
                                                name="BankCurrentValue"
                                                placeholder="Current Value"
                                            />
                                            <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="BankCurrentValue"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4 mb-3">
                                            <label
                                                htmlFor="BankFinancialInstitution"
                                                className="form-label"
                                            >
                                                Financial Institution{" "}
                                            </label>
                                        </div>
                                        <div className="col-4 mb-3">
                                            <Field
                                                type="text"
                                                className="form-control shadow inputDesign"
                                                id="BankFinancialInstitution"
                                                name="BankFinancialInstitution"
                                                placeholder="Financial Institution"
                                            />
                                            <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="BankFinancialInstitution"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4 mb-3">
                                            <label
                                                htmlFor="BankIncomePA"
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
                                                        id="BankIncomePA"
                                                        name="BankIncomePA"
                                                        placeholder="Income P.A."
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                        name="BankIncomePA"
                                                    />
                                                </div>
                                                <div className="col-md-4 ">
                                                    <Field
                                                        as="select"
                                                        name="BankIncomePAType"
                                                        id="BankIncomePAType"
                                                        className="form-select shadow  inputDesign "
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="dollor">$</option>
                                                        <option value="percentage">%</option>
                                                    </Field>
                                                    <ErrorMessage
                                                        name="BankIncomePAType"
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
                                                htmlFor="BankIncomeinDollars"
                                                className="form-label"
                                            >
                                                Income in $
                                            </label>
                                        </div>
                                        <div className="col-4 mb-3">
                                            <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="BankIncomeinDollars"
                                                name="BankIncomeinDollars"
                                                placeholder="Income in $"
                                                readOnly
                                                value={
                                                    values.BankIncomePAType === ""
                                                        ? 0
                                                        : values.BankIncomePAType === "dollor"
                                                            ? parseFloat(values.BankIncomePA) || 0
                                                            : parseFloat(
                                                                (
                                                                    ((parseFloat(
                                                                        values.BankIncomePA
                                                                    ) || 0) /
                                                                        100) *
                                                                    (parseFloat(
                                                                        values.BankCurrentValue
                                                                    ) || 0)
                                                                ).toFixed(2)
                                                            )
                                                }
                                            />
                                            <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="BankIncomeinDollars"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4 mb-3">
                                            <label
                                                htmlFor="BankFinancialInstitution"
                                                className="form-label"
                                            >
                                                Regular Savings
                                            </label>
                                        </div>
                                        <div className="col-4 mb-3">
                                            <Field
                                                type="number"
                                                className="form-control shadow inputDesign"
                                                id="BankRegularSavings"
                                                name="BankRegularSavings"
                                                placeholder="Regular Savings"
                                            />
                                            <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="BankRegularSavings"
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
                                                    name="BankReinvestedIncome"
                                                    id="BankReinvestedOpt1"
                                                    value="Yes"
                                                    onChange={handleChange}
                                                    checked={
                                                        values.BankReinvestedIncome === "Yes"
                                                    }
                                                />
                                                <label
                                                    htmlFor="BankReinvestedOpt1"
                                                    className="label1"
                                                >
                                                    <span>YES</span>
                                                </label>
                                                <input
                                                    type="radio"
                                                    name="BankReinvestedIncome"
                                                    id="BankReinvestedOpt2"
                                                    value="No"
                                                    onChange={handleChange}
                                                    checked={
                                                        values.BankReinvestedIncome === "No"
                                                    }
                                                />
                                                <label
                                                    htmlFor="BankReinvestedOpt2"
                                                    className="label2"
                                                >
                                                    <span>NO</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bank Account Detail Form */}
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="col-md-12">
                                    <button
                                        type="submit"
                                        className="float-end btn w-25  bgColor modalBtn"
                                    // onClick={BankhandleClose}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="float-end btn w-25  btn-outline  backBtn mx-3"
                                        onClick={BankhandleClose}
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
                        {/* Bank #1  */}
                        {BankAccountList.map((elem, index) => {
                            return (
                                <tr key={index}>
                                    {/* <td className='fw-bold'>Bank #1</td> */}
                                    <td>{elem.BankCurrentValue}</td>
                                    <td>{elem.BankFinancialInstitution}</td>
                                    <td>{elem.BankIncomePA}</td>
                                    <td>{elem.BankReinvestedIncome}</td>
                                    <td>
                                        <CustomDropDown
                                            Operations={BankOperations}
                                            Delete={elem._id}
                                            Data={elem}
                                            FormikFun={UpdateData}
                                        />

                                    </td>
                                </tr>
                            );
                        })}
                        {/* Bank #1  */}


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BankComponent
