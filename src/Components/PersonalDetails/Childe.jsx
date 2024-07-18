import React, { useEffect, useRef, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import DatePicker from "react-datepicker";
import { differenceInYears } from "date-fns";
import { Card } from 'react-bootstrap';

import child from "./images/child.svg";
import male from "./images/male.svg";
import female from "./images/female.svg";
import Modal from "react-bootstrap/Modal";
import DynamicTable from '../Assets/Table/DynamicTable';
import { DateHandler, DeleteAxios, PatchAxios, PostAxios } from '../Assets/Api/Api';
import { PersonalDetailsData, allAPIs, defaultUrl } from '../../Store/Store';
import { useRecoilState, useRecoilValue } from 'recoil';

const Childe = () => {

    let [defaultURL] = useRecoilState(defaultUrl);
    let [APIs] = useRecoilState(allAPIs);
    let APi = `${defaultURL}/${APIs.Child}`;

    const [PersonalData, setPersonalData] = useRecoilState(PersonalDetailsData);
    const listOfChild = useRecoilValue(PersonalDetailsData).Child;


    //States
    const [show, setShow] = useState(false);
    const [yesNo, setYesNo] = useState(false);
    const [SubmitFlag, setSubmitFlag] = useState(false);
    // const [listOfChild, setListOfChild] = useState([]);
    const [isChildTable, setIsChildTable] = useState(false);

    const setValuesRef = useRef();

    let [numOfChild, setNumOfChild] = useState(0);
    let [numOfChild1, setNumOfChild1] = useState(0);

    useEffect(() => {
        console.log("UseEffect Chala kea ");
        if (listOfChild && listOfChild.length > 0) {
            if (numOfChild === 0) {
                setNumOfChild(listOfChild.length);
            }
            setYesNo(true);
            setIsChildTable(true);
        } else {
            setYesNo(false)
            setIsChildTable(false);
        }
    }, [listOfChild]); // Update local state when Recoil state changes


    let initialValues = {
        childGender: true,
        childDependentRadio: "No",
        childSurname: "",
        childGivenName: "",
        childRelationship: "",
        childDependantUntilAge: "",
        childDoB: "",
        childAge: ""
    };

    let TableHead = [
        { Thead: "Child Name", key: "childSurname" },
        { Thead: "Age", key: "childAge" },
        { Thead: "Gender", key: "childGender", type: "bool", trueCase: "Female", falseCase: "Male" },
        { Thead: "Relationship", key: "childRelationship" },
        { Thead: "Opt", key: "Opt" },
    ];

    let childrenHandler = (value) => {
        if (numOfChild === 0) {
            setNumOfChild(value);
            setShow(true);
        }
    }

    let SelectedButton = async (option, elem) => {
        // console.log(option, elem);

        let Elem = JSON.parse(JSON.stringify(elem))
        Elem.childDoB = await DateHandler(Elem.childDoB);

        if (option === 1) {


            setShow(true);
            setSubmitFlag(true)
            setTimeout(() => {
                setValuesRef.current(Elem);
            }, 100);

        }
        else {
            // Call Delete Function

            DeleteTest(Elem)

        }
    }

    let onSubmit = async (values) => {
        // console.log(JSON.stringify(values));
        setShow(false);

        values.client_id = localStorage.getItem("UserID");

        if (SubmitFlag) {
            try {
                // Await the result of Patch Axios
                const patchResult = await PatchAxios(`${APi}/Update`, values);

                console.log("Post_result", patchResult); // This will log the response data from the server

                if (patchResult) {
                    const updatedIndex = listOfChild.findIndex(
                        (item) => item._id === values._id
                    );

                    setPersonalData(prevData => {
                        const updatedData = prevData.Child.map((child, index) => {
                            if (index === updatedIndex) {
                                return {
                                    ...child,
                                    childGender: patchResult.childGender,
                                    childDependentRadio: patchResult.childDependentRadio,
                                    childSurname: patchResult.childSurname,
                                    childGivenName: patchResult.childGivenName,
                                    childRelationship: patchResult.childRelationship,
                                    childDependantUntilAge: patchResult.childDependantUntilAge,
                                    childDoB: patchResult.childDoB,
                                    childAge: patchResult.childAge
                                };
                            }
                            return child;
                        });
                        return { ...prevData, Child: updatedData };
                    });

                    setSubmitFlag(false)

                }

            } catch (error) {
                console.log(error);
            }
        } else {


            try {
                // Await the result of PostAxios
                const post_result = await PostAxios(`${APi}/Add`, values);
                console.log("Post_result", post_result); // This will log the response data from the server
                if (post_result) {

                    setPersonalData(prevData => ({
                        ...prevData,
                        Child: [...prevData.Child, post_result]
                    }));

                    setNumOfChild1(++numOfChild1)

                    if (numOfChild !== numOfChild1) {
                        setTimeout(() => {
                            setShow(true);
                        }, 500);
                    }
                    else {
                        setIsChildTable(true);
                    }
                }
            } catch (error) {
                console.log(error);
            }

        }


    }

    async function DeleteTest(data) {
        console.log("Data for Delete", data);
        try {
            // Await the result of Delete Axios
            const Delete_result = await DeleteAxios(`${APi}/Delete/${data._id}`);
            console.log("Delete_result", Delete_result); // This will log the response data from the server
            if (Delete_result) {

                setNumOfChild(PersonalData.Child.length - 1);
                // setListOfChild((prevData) => prevData.filter((item) => item._id !== data._id));
                setPersonalData(prevData => ({
                    ...prevData,
                    Child: prevData.Child.filter(item => item._id !== data._id)
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container-fluid my-4">
            <div className="row m-0">
                <div className="col-md-12">
                    <Card className="  py-4  shadow  borderOverAll  rounded text-center">
                        <h3 className=" heading">Children Details</h3>

                        <div className="row my-3">
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <label className="form-label">
                                        Do you have any Children/Dependants{" "}
                                    </label>
                                    <div className="QuestionIcon">
                                        <img className="img-fluid" src={child} alt="" />
                                    </div>
                                    {/* health button style */}

                                    <div className="form-check form-switch m-0 p-0 QuestionYesNoCenter  col-md-12 ">
                                        <div className="radiobutton">
                                            <input
                                                type="radio"
                                                name="ChildrenDependentsRadio"
                                                className="form-check-input"
                                                id="ChildrenDependentsRadio"
                                                value="No"
                                                checked={!yesNo}
                                            />
                                            <label
                                                htmlFor="ChildrenDependentsRadio"
                                                className="label1"
                                                onClick={() => setYesNo(false)}
                                            >
                                                <span>No</span>
                                            </label>
                                            <input
                                                type="radio"
                                                name="ChildrenDependentsRadio"
                                                id="ChildrenDependentsRadio2"
                                                className="form-check-input"
                                                checked={yesNo}
                                                value="Yes"
                                            />
                                            <label
                                                htmlFor="ChildrenDependentsRadio2"
                                                className="label2"
                                                onClick={() => setYesNo(true)}
                                            >
                                                <span>Yes</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* health switch button style */}
                                </div>
                            </div>
                        </div>

                        {yesNo &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="numberOfChildren"
                                            className="form-label"
                                        >
                                            How many children do you have?
                                        </label>
                                        <div className={`childBtn ${listOfChild.length > 0 && "Selected"} d-flex flex-row-inverse gap-2 justify-content-center flex-wrap `}>
                                            <span
                                                className={`childBtn-item ${numOfChild >= 0 && 'active'}`}
                                                onClick={() =>
                                                    childrenHandler(0)
                                                }
                                            >
                                                0
                                            </span>
                                            <span
                                                className={`childBtn-item ${numOfChild >= 1 && 'active'}`}
                                                onClick={() =>
                                                    childrenHandler(1)
                                                }
                                            >
                                                1
                                            </span>
                                            <span
                                                className={`childBtn-item ${numOfChild >= 2 && 'active'}`}
                                                onClick={() =>
                                                    childrenHandler(2)
                                                }
                                            >
                                                2
                                            </span>
                                            <span
                                                className={`childBtn-item ${numOfChild >= 3 && 'active'}`}
                                                onClick={() =>
                                                    childrenHandler(3)
                                                }
                                            >
                                                3
                                            </span>
                                            <span
                                                className={`childBtn-item ${numOfChild >= 4 && 'active'}`}
                                                onClick={() =>
                                                    childrenHandler(4)
                                                }
                                            >
                                                4
                                            </span>
                                            <span
                                                className={`childBtn-item ${numOfChild >= 5 && 'active'}`}
                                                onClick={() =>
                                                    childrenHandler(5)
                                                }
                                            >
                                                5
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {/*first row*/}

                        {/*   Add children/Dependants */}
                        {/* child modal */}
                        <Modal
                            show={show}
                            onHide={() => { setShow(false) }}
                            backdrop="static"
                            className="modal-lg"
                            keyboard={false}
                        >
                            <Modal.Header
                                className="text-light modalBG "
                                closeButton
                            >
                                <Modal.Title className="fontStyle">
                                    Children/Dependant Details
                                </Modal.Title>
                            </Modal.Header>

                            <Formik
                                initialValues={initialValues}
                                // validationSchema={validationSchema2}
                                onSubmit={onSubmit}
                            >
                                {({ values, setFieldValue, setValues, handleBlur }) => {

                                    setValuesRef.current = setValues;

                                    return (
                                        <Form>
                                            <Modal.Body>
                                                <div className="row  d-none">
                                                    <div className="col-md-6">
                                                        <label
                                                            htmlFor="clientPlannedRetirementAge"
                                                            className="form-label"
                                                        >
                                                            Child
                                                        </label>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <input
                                                                readOnly
                                                                className="form-control inputDesign shadow"
                                                                type="text"
                                                                value={numOfChild}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label
                                                            htmlFor="childSurname"
                                                            className="form-label"
                                                        >
                                                            Surname
                                                        </label>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <Field
                                                                className="form-control inputDesign shadow"
                                                                type="text"
                                                                name="childSurname"
                                                                placeholder=" Surname"
                                                            />
                                                            <ErrorMessage
                                                                className="text-danger fw-bold"
                                                                component="div"
                                                                name="childSurname"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label
                                                            htmlFor="childGivenName"
                                                            className="form-label"
                                                        >
                                                            Given Name
                                                        </label>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <Field
                                                                type="text"
                                                                className="form-control inputDesign  shadow"
                                                                id="childGivenName"
                                                                placeholder="Name"
                                                                name="childGivenName"
                                                            />
                                                            <ErrorMessage
                                                                className="text-danger fw-bold"
                                                                component="div"
                                                                name="childGivenName"
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* child Name */}
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label
                                                            htmlFor="childDoB"
                                                            className="form-label"
                                                        >
                                                            Date of Birth
                                                        </label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <div>
                                                                <DatePicker
                                                                    id="childDoB"
                                                                    className="form-control inputDesign shadow"
                                                                    selected={values.childDoB}
                                                                    onChange={(date) => {
                                                                        setFieldValue(
                                                                            "childDoB",
                                                                            date
                                                                        );
                                                                        const age =
                                                                            differenceInYears(
                                                                                new Date(),
                                                                                date
                                                                            ) || 0;
                                                                        setFieldValue(
                                                                            "childAge",
                                                                            age
                                                                        );
                                                                        // console.log(values.clientDOB)
                                                                    }}
                                                                    dateFormat="dd/MM/yyyy"
                                                                    placeholderText="dd/mm/yyyy"
                                                                    showYearDropdown
                                                                    scrollableYearDropdown
                                                                    onBlur={handleBlur}
                                                                    name="childDoB"
                                                                    maxDate={new Date()}
                                                                    showMonthDropdown
                                                                    dropdownMode="select"
                                                                />
                                                            </div>

                                                            <ErrorMessage
                                                                className="text-danger fw-bold"
                                                                component="div"
                                                                name="childDoB"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label
                                                            htmlFor="childAge"
                                                            className="form-label"
                                                        >
                                                            Age
                                                        </label>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <Field
                                                                type="text"
                                                                className="form-control inputDesign shadow"
                                                                id="childAge"
                                                                name="childAge"
                                                                placeholder="Age"
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* age */}
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label
                                                            htmlFor=""
                                                            className="form-label"
                                                        >
                                                            Gender
                                                        </label>
                                                    </div>

                                                    <div className="col-md-6 ">
                                                        <div className="mb-3">
                                                            <div className=" d-flex justify-content-start align-items-center w-100">

                                                                <Field type="checkbox" name="childGender" className="d-none" />

                                                                <div
                                                                    id="female1"
                                                                    className="femaleSmoking "
                                                                    onClick={() => { setFieldValue('childGender', "female") }}
                                                                >
                                                                    <img
                                                                        className="img-fluid imgPerson w-100"
                                                                        htmlFor="female"
                                                                        src={female}
                                                                        alt=""
                                                                    />
                                                                </div>

                                                                <div
                                                                    id="male1"
                                                                    className=" mx-2 maleNonSmoking"
                                                                    onClick={() => setFieldValue('childGender', "male")}
                                                                >
                                                                    <img
                                                                        className=" img-fluid imgPerson w-100"
                                                                        htmlFor="male"
                                                                        src={male}
                                                                        alt=""
                                                                    />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/*Gender*/}
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label
                                                            htmlFor="childRelationship"
                                                            className="form-label"
                                                        >
                                                            Relationship
                                                        </label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <Field
                                                                as="select"
                                                                id="childRelationship"
                                                                className="form-select shadow  inputDesign"
                                                                onChange={(e) =>
                                                                    setFieldValue(
                                                                        "childRelationship",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                value={values.childRelationship}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="son">Son</option>
                                                                <option value="daughter">
                                                                    Daughter
                                                                </option>
                                                                <option value="grandChild">
                                                                    Grand Child
                                                                </option>
                                                                <option value="nephew">
                                                                    Nephew
                                                                </option>
                                                                <option value="niece">
                                                                    Niece
                                                                </option>
                                                                <option value="stepChild">
                                                                    Step Child
                                                                </option>
                                                                <option value="other">
                                                                    Other
                                                                </option>
                                                            </Field>
                                                            <ErrorMessage
                                                                className="text-danger fw-bold"
                                                                component="div"
                                                                name="childRelationship"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    {/* dependant */}
                                                    <div className="col-md-6  ">
                                                        <label
                                                            htmlFor="Email"
                                                            className="form-label"
                                                        >
                                                            Dependant
                                                        </label>
                                                    </div>

                                                    <div className="col-md-6  ">
                                                        <div className="mb-3">
                                                            {/* switch button style */}
                                                            <div className="form-check form-switch m-0 p-0 ">
                                                                <div className="radiobutton">
                                                                    <Field
                                                                        type="radio"
                                                                        name="childDependentRadio"
                                                                        value="No"
                                                                        id="childDependentopt1"
                                                                    />
                                                                    <label
                                                                        htmlFor="childDependentopt1"
                                                                        className="label1"
                                                                    >
                                                                        <span>NO</span>
                                                                    </label>
                                                                    <Field
                                                                        type="radio"
                                                                        name="childDependentRadio"
                                                                        value="Yes"
                                                                        id="childDependentopt2"
                                                                    />
                                                                    <label
                                                                        htmlFor="childDependentopt2"
                                                                        className="label2"
                                                                    >
                                                                        <span>YES</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            {/* switch button style */}
                                                        </div>
                                                    </div>
                                                    {/* dependant */}
                                                </div>

                                                {values.childDependentRadio === "Yes" && (
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <label
                                                                htmlFor="childDependantUntilAge"
                                                                className="form-label"
                                                            >
                                                                Dependant Until Age
                                                            </label>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <Field
                                                                    type="number"
                                                                    className="form-control inputDesign shadow"
                                                                    id="childDependantUntilAge"
                                                                    name="childDependantUntilAge"
                                                                    placeholder="Dependant Until Age"
                                                                />
                                                                <ErrorMessage
                                                                    className="text-danger fw-bold"
                                                                    component="div"
                                                                    name="childDependantUntilAge"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <div className="col-md-12">
                                                    <button
                                                        className="float-end btn w-25  bgColor modalBtn"
                                                        type="submit"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="float-end btn w-25  btn-outline  backBtn mx-3"
                                                        onClick={() => { setShow(false) }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </Modal.Footer>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </Modal>
                        {/* child modal */}

                        {/*  Add children/Dependants*/}

                        <div className="row mx-3">
                            <div className="col-md-12 mt-1">
                                {/*  table  */}

                                {/* isChildTable && */}
                                {isChildTable && (
                                    <div>
                                        <DynamicTable TableHead={TableHead} TData={listOfChild} Operations={SelectedButton} Formik={true} />
                                    </div>
                                )}

                                {/*  table  */}
                            </div>
                        </div>

                        {/*end Description*/}
                    </Card>
                    {/*end children details form */}
                </div>
            </div>
        </div>
    )
}

export default Childe
