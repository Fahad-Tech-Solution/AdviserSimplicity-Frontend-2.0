import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { openNotificationSuccess, PatchAxios, PostAxios, RenderName } from '../../Assets/Api/Api';
import DatePicker from 'react-datepicker';

import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import DynamicYesNo from '../FinancialInvestments/QuestionsDetail/DynamicYesNo';
import InnerModal from '../FinancialInvestments/QuestionsDetail/InnerModal';
import SalaryPackage from './SalaryPackage';
import LeaveEntitlementsModal from './LeaveEntitlementsModal';
import SalaryPackaging from './SalaryPackaging';

const EmploymentIncome = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let incomeFromOwnBusiness = Object.keys(questionDetail.incomeFromOwnBusiness).length > 0 ? questionDetail.incomeFromOwnBusiness : {
        client: [],
        partner: [],
        joint: [],

    };  // Use an empty object as default if incomeFromOwnBusiness is undefined


    let initialValues = {
        owner: ""
    };

    const fillInitialValues = (setFieldValue) => {

        let userStatus = localStorage.getItem('UserStatus');


        if (incomeFromOwnBusiness && incomeFromOwnBusiness._id) {

            setFieldValue("owner", incomeFromOwnBusiness.owner);

            if (incomeFromOwnBusiness.owner === "client" || incomeFromOwnBusiness.owner === "client+partner") {
                setFieldValue("client.occupation", incomeFromOwnBusiness.client.occupation)
                setFieldValue("client.employmentStatus", incomeFromOwnBusiness.client.employmentStatus)
                setFieldValue("client.nameOfCompany", incomeFromOwnBusiness.client.nameOfCompany)
                setFieldValue("client.startDate", incomeFromOwnBusiness.client.startDate)
                setFieldValue("client.hoursWorked", incomeFromOwnBusiness.client.hoursWorked)
                setFieldValue("client.choiceOfFund", incomeFromOwnBusiness.client.choiceOfFund)
                setFieldValue("client.SalaryPackageModal", incomeFromOwnBusiness.client.SalaryPackageModal)
                setFieldValue("client.salaryPackagingRadio", incomeFromOwnBusiness.client.salaryPackagingRadio)
                setFieldValue("client.SalaryPackagingModal", incomeFromOwnBusiness.client.SalaryPackagingModal)
                setFieldValue("client.leaveEntitlementsRadio", incomeFromOwnBusiness.client.leaveEntitlementsRadio)
                setFieldValue("client.LeaveEntitlementsModal", incomeFromOwnBusiness.client.LeaveEntitlementsModal)
            }

            if ((incomeFromOwnBusiness.owner === "partner" || incomeFromOwnBusiness.owner === "client+partner") && (userStatus === "Married")) {
                setFieldValue("partner.occupation", incomeFromOwnBusiness.partner.occupation)
                setFieldValue("partner.employmentStatus", incomeFromOwnBusiness.partner.employmentStatus)
                setFieldValue("partner.nameOfCompany", incomeFromOwnBusiness.partner.nameOfCompany)
                setFieldValue("partner.startDate", incomeFromOwnBusiness.partner.startDate)
                setFieldValue("partner.hoursWorked", incomeFromOwnBusiness.partner.hoursWorked)
                setFieldValue("partner.choiceOfFund", incomeFromOwnBusiness.partner.choiceOfFund)
                setFieldValue("partner.SalaryPackageModal", incomeFromOwnBusiness.partner.SalaryPackageModal)
                setFieldValue("partner.salaryPackagingRadio", incomeFromOwnBusiness.partner.salaryPackagingRadio)
                setFieldValue("partner.SalaryPackagingModal", incomeFromOwnBusiness.partner.SalaryPackagingModal)
                setFieldValue("partner.leaveEntitlementsRadio", incomeFromOwnBusiness.partner.leaveEntitlementsRadio)
                setFieldValue("partner.LeaveEntitlementsModal", incomeFromOwnBusiness.partner.LeaveEntitlementsModal)
            }

        }
        else {

        }

    };

    let DefaultUrl = useRecoilValue(defaultUrl)

    let onSubmit = async (values) => {
        console.log(JSON.stringify(values));

        let userStatus = localStorage.getItem('UserStatus');


        // return false;
        let obj = values;

        obj.clientFK = localStorage.getItem("UserID");

        if (values.owner === "client" || values.owner === "client+partner") {
            obj.clientTotal = obj.client.SalaryPackageModal.grossSalary;
        }
        else {
            obj.clientTotal = "";
            obj.client = {};
        }

        if (values.owner === "partner" || values.owner === "client+partner") {
            obj.partnerTotal = obj.partner.SalaryPackageModal.grossSalary;
        }
        else {
            obj.partnerTotal = "";
            obj.partner = {};
        }

        if (userStatus !== "Married") {
            obj.partnerTotal = "";
            obj.partner = {};
        }


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

            openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved");
            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);
            openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved Please! try again");
        }
    };

    // title, key, values
    let handleInnerModal = (title, key, values, parentKey) => {
        setModalObject({
            title, key, parentValues: values, parentKey
        })
        setFlagState(true);
    }

    return (
        <Formik
            initialValues={initialValues}
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
                        <div className='row'>

                            <InnerModal modalObject={modalObject} setFieldValue={setFieldValue} setFlagState={setFlagState} flagState={flagState} >
                                {
                                    modalObject.key === "SalaryPackageModal" ? <SalaryPackage /> :
                                        modalObject.key === "SalaryPackagingModal" ? <SalaryPackaging /> :
                                            modalObject.key === "LeaveEntitlementsModal" ? <LeaveEntitlementsModal /> : ""
                                }
                            </InnerModal>

                            <div className='col-md-12'>
                                <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                    <label htmlFor='' className='text-end '>
                                        Owner
                                    </label>

                                    <div className='w-25'>
                                        <Field
                                            as="select"
                                            placeholder="Name of owner"
                                            id={`owner`}
                                            name={`owner`}
                                            className="form-select inputDesignDoubleInput"

                                        >
                                            <option value={""}>Select</option>
                                            <option value={"client"}>{RenderName("client")}</option>
                                            {localStorage.getItem("UserStatus") !== "Single" &&
                                                <React.Fragment>
                                                    <option value={"partner"}>{RenderName("partner")}</option>
                                                    {/*
                                                        <option value={"joint"}> {"Joint (" + RenderName("joint") + ")"} </option>
                                                        <option value={"client+partner+joint"}>{RenderName("client") + " , " + RenderName("partner") + " and Joint"} </option>
                                                        */}
                                                    <option value={"client+partner"}>{"Both (" + RenderName("client") + " , " + RenderName("partner") + ")"} </option>
                                                </React.Fragment>
                                            }
                                        </Field>
                                    </div>
                                </div>
                            </div>


                            {values.owner !== "" &&
                                <div className='col-md-12'>
                                    <div className='mt-4'>
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Owner</th>
                                                    <th>Occupation</th>
                                                    <th>Employment Status</th>
                                                    <th>Name of Company</th>
                                                    <th>Start Date</th>
                                                    <th>Hours Worked</th>
                                                    <th>Salary Package</th>
                                                    <th>Salary Packaging</th>
                                                    <th>Leave entitlements</th>
                                                    <th>Choice of Fund</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {values.owner !== "partner" &&
                                                    <tr>
                                                        <th className='py-auto'>
                                                            {values.owner === "joint" ? RenderName("joint") : RenderName("client")}
                                                        </th>
                                                        <td>
                                                            <Field
                                                                type="text"
                                                                placeholder="Enter Occupation"
                                                                id={`occupation`}
                                                                name={`client.occupation`}
                                                                className="form-control inputDesignDoubleInput"
                                                            />
                                                        </td>
                                                        <td>
                                                            <Field
                                                                as="select"
                                                                placeholder="Name of Employment Status"
                                                                id={`employmentStatus`}
                                                                name={`client.employmentStatus`}
                                                                className="form-select inputDesignDoubleInput"
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Full Time">Full Time</option>
                                                                <option value="Part Time">Part Time</option>
                                                                <option value="Casual">Casual</option>
                                                                <option value="Conratct">Conratct</option>
                                                                <option value="OnLeave">On Leave</option>
                                                            </Field>
                                                        </td>
                                                        <td>
                                                            <Field
                                                                type="text"
                                                                placeholder="Name of Company"
                                                                id={`nameOfCompany`}
                                                                name={`client.nameOfCompany`}
                                                                className="form-control inputDesignDoubleInput"
                                                            />
                                                        </td>
                                                        <td>
                                                            <div style={{ minWidth: "100px" }}>
                                                                <DatePicker
                                                                    className="form-control inputDesignDoubleInput shadow DateInputPadding"
                                                                    showIcon
                                                                    id={`startDate`}
                                                                    name={`client.startDate`}
                                                                    selected={values?.client?.startDate}
                                                                    onChange={(date) => setFieldValue(`client.startDate`, date)}
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
                                                        </td>
                                                        <td>
                                                            <Field
                                                                type="number"
                                                                placeholder="Hours Worked"
                                                                id={`hoursWorked`}
                                                                name={`client.hoursWorked`}
                                                                className="form-control inputDesignDoubleInput"
                                                            />
                                                        </td>
                                                        <td className='text-center'>
                                                            <Button className='btn bgColor modalBtn border-0 my-1 ' id="button-addon2"
                                                                onClick={() => {
                                                                    handleInnerModal(
                                                                        "Salary Package",
                                                                        "SalaryPackageModal",
                                                                        values, "client",
                                                                    )
                                                                }}>
                                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                <DynamicYesNo name={`client.salaryPackagingRadio`} values={values} handleChange={handleChange} />
                                                                {values?.client?.salaryPackagingRadio === "Yes" &&
                                                                    <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                                                        onClick={() => {
                                                                            handleInnerModal(
                                                                                "Salary Packaging",
                                                                                "SalaryPackagingModal",
                                                                                values, "client")
                                                                        }}>
                                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                    </Button>
                                                                }
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                <DynamicYesNo name={`client.leaveEntitlementsRadio`} values={values} handleChange={handleChange} />
                                                                {values?.client?.leaveEntitlementsRadio === "Yes" &&
                                                                    <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                                                        onClick={() => {
                                                                            handleInnerModal("Leave entitlements",
                                                                                "LeaveEntitlementsModal",
                                                                                values, "client")
                                                                        }}>
                                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                    </Button>
                                                                }
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                <DynamicYesNo name={`client.choiceOfFund`} values={values} handleChange={handleChange} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                }

                                                {((localStorage.getItem('UserStatus') === "Married") && (values.owner == "partner" || values.owner == "client+partner" || values.owner == "client+partner+joint")) &&
                                                    <tr>
                                                        <th className='py-auto'>
                                                            {RenderName("partner")}
                                                        </th>
                                                        <td>
                                                            <Field
                                                                type="text"
                                                                placeholder="Enter Occupation"
                                                                id={`occupation`}
                                                                name={`partner.occupation`}
                                                                className="form-control inputDesignDoubleInput"
                                                            />
                                                        </td>
                                                        <td>
                                                            <Field
                                                                as="select"
                                                                placeholder="Name of Employment Status"
                                                                id={`employmentStatus`}
                                                                name={`partner.employmentStatus`}
                                                                className="form-select inputDesignDoubleInput"
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Full Time">Full Time</option>
                                                                <option value="Part Time">Part Time</option>
                                                                <option value="Casual">Casual</option>
                                                                <option value="Conratct">Conratct</option>
                                                                <option value="OnLeave">On Leave</option>
                                                            </Field>
                                                        </td>
                                                        <td>
                                                            <Field
                                                                type="text"
                                                                placeholder="Name of Company"
                                                                id={`nameOfCompany`}
                                                                name={`partner.nameOfCompany`}
                                                                className="form-control inputDesignDoubleInput"
                                                            />
                                                        </td>
                                                        <td>
                                                            <div style={{ minWidth: "100px" }}>
                                                                <DatePicker
                                                                    className="form-control inputDesignDoubleInput shadow DateInputPadding"
                                                                    showIcon
                                                                    id={`startDate`}
                                                                    name={`partner.startDate`}
                                                                    selected={values?.partner?.startDate}
                                                                    onChange={(date) => setFieldValue(`partner.startDate`, date)}
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
                                                        </td>
                                                        <td>
                                                            <Field
                                                                type="number"
                                                                placeholder="Hours Worked"
                                                                id={`hoursWorked`}
                                                                name={`partner.hoursWorked`}
                                                                className="form-control inputDesignDoubleInput"
                                                            />
                                                        </td>
                                                        <td className='text-center'>
                                                            <Button className='btn bgColor modalBtn border-0 my-1 ' id="button-addon2"
                                                                onClick={() => {
                                                                    handleInnerModal(
                                                                        "Salary Package",
                                                                        "SalaryPackageModal",
                                                                        values, "partner",
                                                                    )
                                                                }}>
                                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                <DynamicYesNo name={`partner.salaryPackagingRadio`} values={values} handleChange={handleChange} />
                                                                {values?.partner?.salaryPackagingRadio === "Yes" &&
                                                                    <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                                                        onClick={() => {
                                                                            handleInnerModal(
                                                                                "Salary Packaging",
                                                                                "SalaryPackagingModal",
                                                                                values, "partner")
                                                                        }}>
                                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                    </Button>
                                                                }
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                <DynamicYesNo name={`partner.leaveEntitlementsRadio`} values={values} handleChange={handleChange} />
                                                                {values?.partner?.leaveEntitlementsRadio === "Yes" &&
                                                                    <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                                                        onClick={() => {
                                                                            handleInnerModal(
                                                                                "Salary Packaging",
                                                                                "LeaveEntitlementsModal",
                                                                                values, "partner")
                                                                        }}>
                                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                    </Button>
                                                                }
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                <DynamicYesNo id={"choiceOfFund"} name={`partner.choiceOfFund`} values={values} handleChange={handleChange} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                }

                                                {(values.owner == "joint" || values.owner == "client+partner+joint") &&
                                                    <tr>
                                                        <th className='py-auto'>
                                                            {RenderName("client")},{RenderName("partner")}
                                                            {values.owner == "client+partner+joint" && " & Joint"}
                                                        </th>
                                                        <td>
                                                            <Field
                                                                type="text"
                                                                placeholder="Enter Occupation"
                                                                id={`occupation`}
                                                                name={`joint.occupation`}
                                                                className="form-control inputDesignDoubleInput"
                                                            />
                                                        </td>
                                                        <td>
                                                            <Field
                                                                as="select"
                                                                placeholder="Name of Employment Status"
                                                                id={`employmentStatus`}
                                                                name={`joint.employmentStatus`}
                                                                className="form-select inputDesignDoubleInput"
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Full Time">Full Time</option>
                                                                <option value="Part Time">Part Time</option>
                                                                <option value="Casual">Casual</option>
                                                                <option value="Conratct">Conratct</option>
                                                                <option value="OnLeave">On Leave</option>
                                                            </Field>
                                                        </td>
                                                        <td>
                                                            <Field
                                                                type="text"
                                                                placeholder="Name of Company"
                                                                id={`nameOfCompany`}
                                                                name={`joint.nameOfCompany`}
                                                                className="form-control inputDesignDoubleInput"
                                                            />
                                                        </td>
                                                        <td>
                                                            <div style={{ minWidth: "100px" }}>
                                                                <DatePicker
                                                                    className="form-control inputDesignDoubleInput shadow DateInputPadding"
                                                                    showIcon
                                                                    id={`startDate`}
                                                                    name={`joint.startDate`}
                                                                    selected={values[`joint.startDate`]}
                                                                    onChange={(date) => setFieldValue(`joint.startDate`, date)}
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
                                                        </td>
                                                        <td>
                                                            <Field
                                                                type="number"
                                                                placeholder="Hours Worked"
                                                                id={`hoursWorked`}
                                                                name={`joint.hoursWorked`}
                                                                className="form-control inputDesignDoubleInput"
                                                            />
                                                        </td>
                                                        <td className='text-center'>
                                                            <Button className='btn bgColor modalBtn border-0 my-1 ' id="button-addon2"
                                                                onClick={() => {
                                                                    handleInnerModal(
                                                                        "Salary Package",
                                                                        "SalaryPackageModal",
                                                                        values, "joint",
                                                                    )
                                                                }}>
                                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                <DynamicYesNo name={`joint.salaryPackagingRadio`} values={values} handleChange={handleChange} />
                                                                {values?.joint?.salaryPackagingRadio === "Yes" &&
                                                                    <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                                                        onClick={() => {
                                                                            handleInnerModal(
                                                                                "Salary Packaging",
                                                                                "SalaryPackagingModal",
                                                                                values, "joint")
                                                                        }}>
                                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                    </Button>
                                                                }
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                <DynamicYesNo name={`joint.leaveEntitlementsRadio`} values={values} handleChange={handleChange} />
                                                                {values?.joint?.leaveEntitlementsRadio === "Yes" &&
                                                                    <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                                                        onClick={() => {
                                                                            handleInnerModal(
                                                                                "Salary Packaging",
                                                                                "LeaveEntitlementsModal",
                                                                                values, "joint")
                                                                        }}>
                                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                    </Button>
                                                                }
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                <DynamicYesNo id={"choiceOfFund"} name={`joint.choiceOfFund`} values={values} handleChange={handleChange} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                }



                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            }
                        </div>
                    </Form>
                )
            }}
        </Formik>
    );
};

export default EmploymentIncome;
