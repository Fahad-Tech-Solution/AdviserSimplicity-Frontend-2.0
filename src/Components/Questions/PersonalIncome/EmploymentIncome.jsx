import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { PatchAxios, PostAxios } from '../../Assets/Api/Api';
import DatePicker from 'react-datepicker';

import single from "../../Svgs/single-2.svg";
import couple from "../../Svgs/couple-2.svg";

const EmploymentIncome = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);


    let [nameSet] = useState(() => {
        if (props.modalObject.Input === "client") {
            return (localStorage.getItem("UserName"))
        }
        else if (props.modalObject.Input === "partner") {
            return (localStorage.getItem("PartnerName"))
        }
        else if (props.modalObject.Input === "joint") {
            return (localStorage.getItem("UserName") + " & " + localStorage.getItem("PartnerName"))
        }
    })

    let incomeFromOwnBusiness = Object.keys(questionDetail.incomeFromOwnBusiness).length > 0 ? questionDetail.incomeFromOwnBusiness : {
        client: [],
        partner: [],
        joint: [],

    };  // Use an empty object as default if incomeFromOwnBusiness is undefined


    let initialValues = {};

    const [dynamicFields, setDynamicFields] = useState([]);


    useEffect(() => {
        // if (incomeFromOwnBusiness[props.modalObject.Input] && incomeFromOwnBusiness[props.modalObject.Input].length) {
        //     let arr = []

        //     for (let i = 0; i < incomeFromOwnBusiness[props.modalObject.Input].length; i++) {
        //         arr.push("");
        //     }

        //     setDynamicFields(arr);

        // }
    }, [])

    const fillInitialValues = (setFieldValue) => {

        if (incomeFromOwnBusiness[props.modalObject.Input] && incomeFromOwnBusiness[props.modalObject.Input].EMPChoiceradio) {

            let data = incomeFromOwnBusiness[props.modalObject.Input]

            setFieldValue("EMPChoiceradio", data.EMPChoiceradio || '');
            setFieldValue("EMPSacrificeradio", data.EMPSacrificeradio || '');
            setFieldValue("EMPcontributionradio", data.EMPcontributionradio || '');
            setFieldValue("EMPSignificantlyradio", data.EMPSignificantlyradio || '');
            setFieldValue("EMPCurrentlyRadio", data.EMPCurrentlyRadio || '');
            setFieldValue("EMPSalaryRadio", data.EMPSalaryRadio || '');
            setFieldValue("EMPFBTradio", data.EMPFBTradio || '');
            setFieldValue("EMPSalaryPackageRadio", data.EMPSalaryPackageRadio || '');
            setFieldValue("EMPOccupation", data.EMPOccupation || '');
            setFieldValue("EMPName", data.EMPName || '');
            setFieldValue("EMPCommencement", data.EMPCommencement || '');
            setFieldValue("EMPHours", data.EMPHours || '');
            setFieldValue("EMPExcluding", data.EMPExcluding || '');
            setFieldValue("EMPSuperAnnuation", data.EMPSuperAnnuation || '');
            setFieldValue("EMPEmployment", data.EMPEmployment || '');
            setFieldValue("EMPSuperType", data.EMPSuperType || '');
            setFieldValue("EMPUnusedSickLeaveType", data.EMPUnusedSickLeaveType || '');
            setFieldValue("EMPUnusedAnnualType", data.EMPUnusedAnnualType || '');
            setFieldValue("EMPUnusedlongType", data.EMPUnusedlongType || '');
            setFieldValue("EMPSalarySacrifice", data.EMPSalarySacrifice || '');
            setFieldValue("EMPTaxContribution", data.EMPTaxContribution || '');
            setFieldValue("EMPUnusedSickLeave", data.EMPUnusedSickLeave || '');
            setFieldValue("EMPUnusedAnnual", data.EMPUnusedAnnual || '');
            setFieldValue("EMPUnusedlong", data.EMPUnusedlong || '');
            setFieldValue("EMPFBTStatus", data.EMPFBTStatus || '');
            setFieldValue("EMPCostCar", data.EMPCostCar || '');
            setFieldValue("EMPCarPackaged", data.EMPCarPackaged || '');
            setFieldValue("EMPAbilitytoSacrifice", data.EMPAbilitytoSacrifice || '');


        }
        else {
            setFieldValue("EMPChoiceradio", "No");
            setFieldValue("EMPSacrificeradio", "No");
            setFieldValue("EMPcontributionradio", "No");
            setFieldValue("EMPSignificantlyradio", "No");
            setFieldValue("EMPCurrentlyRadio", "No");
            setFieldValue("EMPSalaryRadio", "No");
            setFieldValue("EMPFBTradio", "No");
            setFieldValue("EMPSalaryPackageRadio", "No");
        }
    };

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {
        console.log(JSON.stringify(values));


        // Create an object with additional fields
        let obj = {
            clientFK: localStorage.getItem("UserID"),
        };

        let DataOf = props.modalObject.Input;

        obj[DataOf] = values;

        obj[DataOf + "Total"] = values.EMPExcluding;

        try {
            let res;
            if (!questionDetail.incomeFromOwnBusiness || !questionDetail.incomeFromOwnBusiness.clientFK) {
                res = await PostAxios(`${DefaultUrl}/api/incomeFromOwnBusiness/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/incomeFromOwnBusiness/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, incomeFromOwnBusiness: res };
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

    return (
        <Formik
            initialValues={initialValues}
            //  validationSchema={isPartnered ? validationSchema : singleValidationSchema}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({
                values,
                setFieldValue,
                setValues,
                handleChange,
                handleBlur,
            }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                return (
                    <Form>
                        <div className="row">
                            <div className="col-md-12">

                                {/* 1 row */}

                                <div className="row mb-3">
                                    <div className="col-6"></div>
                                    {props.modalObject.Input === "client" ?

                                        <div className="col-6 ">
                                            <div className="centerDiv">
                                                <label
                                                    htmlFor=""
                                                    className="form-label text-center"
                                                >
                                                    {nameSet}
                                                    <div className="iconContainerLg">
                                                        <img
                                                            src={single}
                                                            alt="single svg"
                                                            className="w-50 "
                                                        />
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        :
                                        <div className="col-6">
                                            <label
                                                htmlFor=""
                                                className="form-label text-center"
                                            >
                                                {nameSet}
                                                <div className="iconContainerLg">
                                                    <img
                                                        src={couple}
                                                        alt="single svg"
                                                        className="w-50 "
                                                    />
                                                </div>
                                            </label>
                                        </div>
                                    }
                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label
                                            htmlFor="EMPOccupation"
                                            className="form-label"
                                        >
                                            Primary Occupation
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-3">
                                            <Field
                                                type="text"
                                                className="form-control shadow inputDesign"
                                                id="EMPOccupation"
                                                name="EMPOccupation"
                                                placeholder="Primary Occupation"
                                            />
                                            <ErrorMessage
                                                name="EMPOccupation"
                                                component="div"
                                                className="text-danger fw-bold"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label
                                            htmlFor="EMPEmployment"
                                            className="form-label"
                                        >
                                            Employment Status
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-3">
                                            <Field
                                                as="select"
                                                id="EMPEmployment"
                                                className="form-select shadow  inputDesign"
                                                name="EMPEmployment"
                                            >
                                                <option value="">Select</option>
                                                <option value="Full Time">Full Time</option>
                                                <option value="Part Time">Part Time</option>
                                                <option value="Casual">Casual</option>
                                                <option value="Conratct">Conratct</option>
                                                <option value="OnLeave">On Leave</option>
                                            </Field>
                                            <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="EMPEmployment"
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label
                                            htmlFor="EMPName"
                                            className="form-label"
                                        >
                                            Name of Company
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-3">
                                            <Field
                                                type="text"
                                                className="form-control inputDesign shadow"
                                                name="EMPName"
                                                id="EMPName"
                                                placeholder="Name of Company"
                                            />
                                            <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="EMPName"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label
                                            htmlFor="EMPCommencement"
                                            className="form-label"
                                        >
                                            Commencement Date
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-3">
                                            <div>
                                                <DatePicker
                                                    className="form-control inputDesign shadow DateInputPadding"
                                                    showIcon
                                                    id="EMPCommencement"
                                                    name="EMPCommencement"
                                                    selected={values.EMPCommencement}
                                                    onChange={(date) =>
                                                        setFieldValue("EMPCommencement", date)
                                                    }
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="dd/mm/yyyy"
                                                    maxDate={new Date()}
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    onBlur={handleBlur}
                                                    wrapperClassName="w-100"
                                                />
                                            </div>
                                            <ErrorMessage
                                                component="div"
                                                className="text-danger fw-bold"
                                                name="EMPCommencement"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label
                                            htmlFor="EMPHours"
                                            className="form-label"
                                        >
                                            Number of hours per week
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-3">
                                            <Field
                                                type="number"
                                                className="form-control inputDesign shadow"
                                                id="EMPHours"
                                                name="EMPHours"
                                                placeholder="Number of hours per week"
                                            />
                                            <ErrorMessage
                                                name="EMPHours"
                                                component="div"
                                                className="text-danger fw-bold"
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label
                                            htmlFor="EMPExcluding"
                                            className="form-label"
                                        >
                                            Salary (Excluding Super)
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-3">
                                            <Field
                                                type="number"
                                                name="EMPExcluding"
                                                className="form-control inputDesign shadow"
                                                id="EMPExcluding"
                                                placeholder="Salary (Excluding Super)"
                                            />
                                            <ErrorMessage
                                                name="EMPExcluding"
                                                component="div"
                                                className="text-danger fw-bold"
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label
                                            htmlFor="EMPSuperAnnuation"
                                            className="form-label"
                                        >
                                            Superannuation Guarantee
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        <div className=" centerDiv mb-3">
                                            <div className="row">

                                                <div className="col-8">
                                                    <Field
                                                        type="number"
                                                        className="form-control  inputDesignDoubleInput"
                                                        id="EMPSuperAnnuation"
                                                        placeholder="Superannuation Guarantee"
                                                        name="EMPSuperAnnuation"
                                                    />
                                                    <ErrorMessage
                                                        name="EMPSuperAnnuation"
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                    />
                                                </div>

                                                <div className="col-4">
                                                    <Field
                                                        as="select"
                                                        name="EMPSuperType"
                                                        id="EMPSuperType"
                                                        className="form-select   inputDesignDoubleInput"
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="$">$</option>
                                                        <option value="percentage">%</option>
                                                    </Field>
                                                    <ErrorMessage
                                                        name="EMPSuperType"
                                                        component="div"
                                                        className="text-danger fw-bold"
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label className="form-label">
                                            Does your Employer Offer Choice of Fund?
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-3">
                                            {/* switch button style */}
                                            <div className="form-check form-switch m-0 p-0 ">
                                                <div className="radiobutton">
                                                    <input
                                                        type="radio"
                                                        name="EMPChoiceradio"
                                                        id="EMPChoiceradio1"
                                                        onChange={handleChange}
                                                        value="Yes"
                                                        checked={
                                                            values.EMPChoiceradio === "Yes"
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="EMPChoiceradio1"
                                                        className="label1"
                                                    >
                                                        <span>YES</span>
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name="EMPChoiceradio"
                                                        id="EMPChoiceradio2"
                                                        onChange={handleChange}
                                                        value="No"
                                                        checked={
                                                            values.EMPChoiceradio === "No"
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="EMPChoiceradio2"
                                                        className="label2"
                                                    >
                                                        <span>NO</span>
                                                    </label>
                                                </div>
                                            </div>
                                            {/* switch button style */}
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label className="form-label">
                                            Do you have the ability to salary sacrifice?
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-3">
                                            {/* switch button style */}
                                            <div className="form-check form-switch m-0 p-0 ">
                                                <div className="radiobutton">
                                                    <input
                                                        type="radio"
                                                        name="EMPSacrificeradio"
                                                        value="Yes"
                                                        id="sacrificeopt1"

                                                        onChange={handleChange}
                                                        checked={
                                                            values.EMPSacrificeradio === "Yes"
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="sacrificeopt1"
                                                        className="label1"
                                                    >
                                                        <span>YES</span>
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name="EMPSacrificeradio"
                                                        value="No"
                                                        id="sacrificeopt2"

                                                        onChange={handleChange}
                                                        checked={
                                                            values.EMPSacrificeradio === "No"
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="sacrificeopt2"
                                                        className="label2"
                                                    >
                                                        <span>NO</span>
                                                    </label>
                                                </div>
                                            </div>
                                            {/* switch button style */}
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label
                                            htmlFor="EMPSalarySacrifice"
                                            className="form-label"
                                        >
                                            How Much
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        {values.EMPSacrificeradio === "Yes" && (
                                            <div className="mb-3">
                                                <Field
                                                    type="number"
                                                    className="form-control
               inputDesign shadow"
                                                    id="EMPSalarySacrifice"
                                                    name="EMPSalarySacrifice"
                                                    placeholder="How much you have the ability to salary sacrifice?"
                                                />
                                                <ErrorMessage
                                                    name="EMPSalarySacrifice"
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                />
                                            </div>
                                        )}
                                    </div>

                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label className="form-label">
                                            Do you make any after tax-contribution to super?
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-3">
                                            {/* switch button style */}
                                            <div className="form-check form-switch m-0 p-0 ">
                                                <div className="radiobutton">
                                                    <input
                                                        type="radio"
                                                        name="EMPcontributionradio"
                                                        id="contributionopt1"

                                                        onChange={handleChange}
                                                        value="Yes"
                                                        checked={
                                                            values.EMPcontributionradio ===
                                                            "Yes"
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="contributionopt1"
                                                        className="label1"
                                                    >
                                                        <span>YES</span>
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name="EMPcontributionradio"
                                                        id="contributionopt2"
                                                        value="No"

                                                        onChange={handleChange}
                                                        checked={
                                                            values.EMPcontributionradio === "No"
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="contributionopt2"
                                                        className="label2"
                                                    >
                                                        <span>NO</span>
                                                    </label>
                                                </div>
                                            </div>
                                            {/* switch button style */}
                                        </div>
                                    </div>

                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label
                                            htmlFor="EMPTaxContribution"
                                            className="form-label"
                                        >
                                            How Much
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        {values.EMPcontributionradio === "Yes" && (
                                            <div className="mb-3">
                                                <Field
                                                    type="number"
                                                    className="form-control inputDesign
               shadow"
                                                    id="EMPTaxContribution"
                                                    name="EMPTaxContribution"
                                                    placeholder="How much you make any after tax-contribution to super?"
                                                />
                                                <ErrorMessage
                                                    name="EMPTaxContribution"
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                />
                                            </div>
                                        )}
                                    </div>


                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label className="form-label">
                                            Can your income vary significantly?
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-3">
                                            {/* switch button style */}
                                            <div className="form-check form-switch m-0 p-0 ">
                                                <div className="radiobutton">
                                                    <input
                                                        type="radio"
                                                        name="EMPSignificantlyradio"
                                                        id="significantlyopt1"
                                                        onChange={handleChange}
                                                        value="Yes"
                                                        checked={
                                                            values.EMPSignificantlyradio ===
                                                            "Yes"
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="significantlyopt1"
                                                        className="label1"
                                                    >
                                                        <span>YES</span>
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name="EMPSignificantlyradio"
                                                        id="significantlyopt2"
                                                        onChange={handleChange}
                                                        value="No"
                                                        checked={
                                                            values.EMPSignificantlyradio ===
                                                            "No"
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="significantlyopt2"
                                                        className="label2"
                                                    >
                                                        <span>NO</span>
                                                    </label>
                                                </div>
                                            </div>
                                            {/* switch button style */}
                                        </div>
                                    </div>

                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label
                                            htmlFor="EMPUnusedSickLeave"
                                            className="form-label"
                                        >
                                            Unused sick leave entitlements
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        {values.EMPSignificantlyradio === "Yes" ? (
                                            <div className="mb-3 centerDiv">
                                                <div className="row">
                                                    <div className="col-8">
                                                        <Field
                                                            type="number"
                                                            className="form-control inputDesignDoubleInput shadow"
                                                            id="EMPUnusedSickLeave"
                                                            name="EMPUnusedSickLeave"
                                                            placeholder="Unused sick leave entitlements"
                                                        />

                                                        <ErrorMessage
                                                            name="EMPUnusedSickLeave"
                                                            component="div"
                                                            className="text-danger fw-bold"
                                                        />
                                                    </div>
                                                    <div className="col-4">
                                                        <Field
                                                            as="select"
                                                            id="EMPUnusedSickLeaveType"
                                                            name="EMPUnusedSickLeaveType"
                                                            className="form-select shadow inputDesignDoubleInput"
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="days">Days</option>
                                                            <option value="hours">Hours</option>
                                                            <option value="weeks">Weeks</option>
                                                            <option value="months">Months</option>
                                                        </Field>
                                                        <ErrorMessage
                                                            name="EMPUnusedSickLeaveType"
                                                            component="div"
                                                            className="text-danger fw-bold"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label
                                            htmlFor="EMPUnusedAnnual"
                                            className="form-label"
                                        >
                                            Unused annual leave entitlements
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        {values.EMPSignificantlyradio === "Yes" ? (
                                            <div className="mb-3 centerDiv">
                                                <div className="row">
                                                    <div className="col-8">
                                                        <Field
                                                            type="number"
                                                            className="form-control inputDesignDoubleInput shadow"
                                                            id="EMPUnusedAnnual"
                                                            name="EMPUnusedAnnual"
                                                            placeholder="Unused annual leave entitlements"
                                                        />
                                                        <ErrorMessage
                                                            name="EMPUnusedAnnual"
                                                            component="div"
                                                            className="text-danger fw-bold"
                                                        />
                                                    </div>
                                                    <div className="col-4">
                                                        <Field
                                                            as="select"
                                                            id="EMPUnusedAnnualType"
                                                            name="EMPUnusedAnnualType"
                                                            className="form-select shadow  inputDesignDoubleInput"
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="days">Days</option>
                                                            <option value="hours">Hours</option>
                                                            <option value="weeks">Weeks</option>
                                                            <option value="months">Months</option>
                                                        </Field>
                                                        <ErrorMessage
                                                            name="EMPUnusedAnnualType"
                                                            component="div"
                                                            className="text-danger fw-bold"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label
                                            htmlFor="EMPUnusedlong"
                                            className="form-label"
                                        >
                                            Unused long service leave entitlements
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        {values.EMPSignificantlyradio === "Yes" ? (
                                            <div className="mb-3 centerDiv">
                                                <div className="row">
                                                    <div className="col-8">
                                                        <Field
                                                            type="number"
                                                            className="form-control inputDesignDoubleInput shadow"
                                                            id="EMPUnusedlong"
                                                            name="EMPUnusedlong"
                                                            placeholder="Unused long service leave entitlements"
                                                        />

                                                        <ErrorMessage
                                                            name="EMPUnusedlong"
                                                            component="div"
                                                            className="text-danger fw-bold"
                                                        />
                                                    </div>
                                                    <div className="col-4">
                                                        <Field
                                                            as="select"
                                                            id="EMPUnusedlongType"
                                                            name="EMPUnusedlongType"
                                                            className="form-select shadow  inputDesignDoubleInput"
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="days">Days</option>
                                                            <option value="hours">Hours</option>
                                                            <option value="weeks">Weeks</option>
                                                            <option value="months">Months</option>
                                                        </Field>
                                                        <ErrorMessage
                                                            name="EMPUnusedlongType"
                                                            component="div"
                                                            className="text-danger fw-bold"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                </div>

                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label className="form-label">
                                            Do you currently Salary Package?
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-3">
                                            <div className="form-check form-switch m-0 p-0 ">
                                                <div className="radiobutton">
                                                    <input
                                                        type="radio"
                                                        name="EMPCurrentlyRadio"
                                                        id="currentlySalaryPackage1"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={
                                                            values.EMPCurrentlyRadio === "Yes"
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="currentlySalaryPackage1"
                                                        className="label1"
                                                    >
                                                        <span>YES</span>
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name="EMPCurrentlyRadio"
                                                        id="currentlySalaryPackage2"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={
                                                            values.EMPCurrentlyRadio === "No"
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="currentlySalaryPackage2"
                                                        className="label2"
                                                    >
                                                        <span>NO</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label
                                            htmlFor="EmployerFBTStatus"
                                            className="form-label"
                                        >
                                            Employer FBT Status
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        {values.EMPCurrentlyRadio === "Yes" && (
                                            <div className="mb-3">
                                                <Field
                                                    as="select"
                                                    name="EMPFBTStatus"
                                                    id="EMPFBTStatus"
                                                    className="form-select shadow  inputDesign"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Fll FBT">Fll FBT</option>
                                                    <option value="Rebatable">Rebatable</option>
                                                    <option value="Exempt ($17K Cap)">
                                                        Exempt ($17K Cap)
                                                    </option>
                                                    <option value="Exempt ($30K Cap)">
                                                        Exempt ($30K Cap)
                                                    </option>
                                                </Field>
                                                <ErrorMessage
                                                    name="EMPFBTStatus"
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                />
                                            </div>
                                        )}
                                    </div>

                                </div>

                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label className="form-label">
                                            Do you salary Package a Car?
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-3">
                                            <div className="form-check form-switch m-0 p-0 ">
                                                <div className="radiobutton">
                                                    <input
                                                        type="radio"
                                                        name="EMPSalaryRadio"
                                                        id="EMPSalaryRadio1"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={
                                                            values.EMPSalaryRadio === "Yes"
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="EMPSalaryRadio1"
                                                        className="label1"
                                                    >
                                                        <span>YES</span>
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name="EMPSalaryRadio"
                                                        id="EMPSalaryRadio2"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={
                                                            values.EMPSalaryRadio === "No"
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="EMPSalaryRadio2"
                                                        className="label2"
                                                    >
                                                        <span>NO</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label
                                            htmlFor="EMPCostCar"
                                            className="form-label"
                                        >
                                            Cost Base of Car
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        {values.EMPSalaryRadio === "Yes" && (
                                            <div className="mb-3">
                                                <Field
                                                    type="number"
                                                    className="form-control shadow inputDesign"
                                                    id="EMPCostCar"
                                                    name="EMPCostCar"
                                                    placeholder="Cost Base of Car"
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="EMPCostCar"
                                                />
                                            </div>
                                        )}
                                    </div>


                                </div>

                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label className="form-label">
                                            FBT Paid By Employer
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        {values.EMPSalaryRadio === "Yes" && (
                                            <div className="mb-3">
                                                <div className="form-check form-switch m-0 p-0 ">
                                                    <div className="radiobutton">
                                                        <input
                                                            type="radio"
                                                            name="EMPFBTradio"
                                                            id="FBTopt1"
                                                            onChange={handleChange}
                                                            value="Yes"
                                                            checked={
                                                                values.EMPFBTradio === "Yes"
                                                            }
                                                        />
                                                        <label htmlFor="FBTopt1" className="label1">
                                                            <span>YES</span>
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            name="EMPFBTradio"
                                                            id="FBTopt2"
                                                            onChange={handleChange}
                                                            value="No"
                                                            checked={
                                                                values.EMPFBTradio === "No"
                                                            }
                                                        />
                                                        <label htmlFor="FBTopt2" className="label2">
                                                            <span>NO</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label
                                            htmlFor="EMPCarPackaged"
                                            className="form-label "
                                        >
                                            Running Costs of Car Packaged?
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        {values.EMPSalaryRadio === "Yes" && (
                                            <div className="mb-3">
                                                <Field
                                                    type="number"
                                                    className="form-control inputDesign shadow"
                                                    name="EMPCarPackaged"
                                                    id="EMPCarPackaged"
                                                    placeholder="Running Costs of Car Packaged"
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                    name="EMPCarPackaged"
                                                />
                                            </div>
                                        )}
                                    </div>

                                </div>

                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label className="form-label">
                                            Do you salary Package a Credit Card,/Mortgage?
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        <div className="mb-3">
                                            <div className="form-check form-switch m-0 p-0 ">
                                                <div className="radiobutton">
                                                    <input
                                                        type="radio"
                                                        name="EMPSalaryPackageRadio"
                                                        id="EMPSalaryPackageRadio1"
                                                        value="Yes"
                                                        onChange={handleChange}
                                                        checked={
                                                            values.EMPSalaryPackageRadio ===
                                                            "Yes"
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="EMPSalaryPackageRadio1"
                                                        className="label1"
                                                    >
                                                        <span>YES</span>
                                                    </label>
                                                    <input
                                                        type="radio"
                                                        name="EMPSalaryPackageRadio"
                                                        id="EMPSalaryPackageRadio2"
                                                        value="No"
                                                        onChange={handleChange}
                                                        checked={
                                                            values.EMPSalaryPackageRadio ===
                                                            "No"
                                                        }
                                                    />
                                                    <label
                                                        htmlFor="EMPSalaryPackageRadio2"
                                                        className="label2"
                                                    >
                                                        <span>NO</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label
                                            htmlFor="EMPAbilitytoSacrifice"
                                            className="form-label"
                                        >
                                            How Much
                                        </label>
                                    </div>

                                    <div className="col-6">
                                        {values.EMPSalaryPackageRadio === "Yes" && (
                                            <div className="mb-3">
                                                <Field
                                                    type="number"
                                                    className="form-control
               inputDesign shadow"
                                                    id="EMPAbilitytoSacrifice"
                                                    name="EMPAbilitytoSacrifice"
                                                    placeholder="How much you have the ability to salary sacrifice?"
                                                />
                                                <ErrorMessage
                                                    name="EMPAbilitytoSacrifice"
                                                    component="div"
                                                    className="text-danger fw-bold"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="row mt-5 d-none">
                                    <div className="col-md-12">
                                        <button
                                            type="submit"
                                            className="float-end btn w-25  bgColor modalBtn"
                                        // onClick={nextbuttonHandler}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    );
};

export default EmploymentIncome;
