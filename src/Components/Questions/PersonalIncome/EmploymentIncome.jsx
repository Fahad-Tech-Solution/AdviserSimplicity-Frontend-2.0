import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { PatchAxios, PostAxios } from '../../Assets/Api/Api';
import DatePicker from 'react-datepicker';

import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import DynamicYesNo from '../FinancialInvestments/QuestionsDetail/DynamicYesNo';
import InnerModal from '../FinancialInvestments/QuestionsDetail/InnerModal';
import SalaryPackage from './SalaryPackage';

const EmploymentIncome = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let RenderName = (Input) => {
        if (Input === "client") {
            return (localStorage.getItem("UserName"))
        }
        else if (Input === "partner") {
            return (localStorage.getItem("PartnerName"))
        }
        else if (Input === "joint") {
            return (localStorage.getItem("UserName") + " & " + localStorage.getItem("PartnerName"))
        }
    }

    let incomeFromOwnBusiness = Object.keys(questionDetail.incomeFromOwnBusiness).length > 0 ? questionDetail.incomeFromOwnBusiness : {
        client: [],
        partner: [],
        joint: [],

    };  // Use an empty object as default if incomeFromOwnBusiness is undefined


    let initialValues = {};

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

    // title, key, values
    let handleInnerModal = (title, key, values) => {
        setModalObject({
            title, key, parentValues: values
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
                                    modalObject.key === "salaryPackageArray" ? <SalaryPackage /> : ""
                                }
                            </InnerModal>

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
                                            <tr>
                                                <td>
                                                    <Field
                                                        as="select"
                                                        placeholder="Name of owner"
                                                        id={`owner`}
                                                        name={`owner`}
                                                        className="form-select inputDesignDoubleInput"
                                                    >
                                                        <option value={""}>Select</option>
                                                        <option value={"client"}>{RenderName("client")}</option>
                                                        <option value={"partner"}>{RenderName("partner")}</option>
                                                    </Field>
                                                </td>
                                                <td>
                                                    <Field
                                                        type="text"
                                                        placeholder="Enter Occupation"
                                                        id={`occupation`}
                                                        name={`occupation`}
                                                        className="form-control inputDesignDoubleInput"
                                                    />
                                                </td>
                                                <td>
                                                    <Field
                                                        as="select"
                                                        placeholder="Name of Employment Status"
                                                        id={`employmentStatus`}
                                                        name={`employmentStatus`}
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
                                                        id={`Company`}
                                                        name={`Company`}
                                                        className="form-control inputDesignDoubleInput"
                                                    />
                                                </td>
                                                <td>
                                                    <div style={{ minWidth: "100px" }}>
                                                        <DatePicker
                                                            className="form-control inputDesignDoubleInput shadow DateInputPadding"
                                                            showIcon
                                                            id={`startDate`}
                                                            name={`startDate`}
                                                            selected={values[`startDate`]}
                                                            onChange={(date) => setFieldValue(`startDate`, date)}
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
                                                        type="text"
                                                        placeholder="Hours Worked"
                                                        id={`hoursWorked`}
                                                        name={`hoursWorked`}
                                                        className="form-control inputDesignDoubleInput"
                                                    />
                                                </td>
                                                <td className='text-center'>
                                                    <Button className='btn bgColor modalBtn border-0 my-1 ' id="button-addon2"
                                                        onClick={() => {
                                                            handleInnerModal(
                                                                "Salary Package",
                                                                "salaryPackageArray",
                                                                values,)
                                                        }}>
                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                    </Button>
                                                </td>
                                                <td>
                                                    <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                        <DynamicYesNo name={`salaryPackaging`} values={values} handleChange={handleChange} />
                                                        {values[`salaryPackaging`] === "Yes" &&
                                                            <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                                                onClick={() => {
                                                                    handleInnerModal(
                                                                        "Salary Packaging",
                                                                        "salaryPackagingArray",
                                                                        values)
                                                                }}>
                                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                            </Button>
                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                        <DynamicYesNo name={`leaveEntitlements`} values={values} handleChange={handleChange} />
                                                        {values[`leaveEntitlements`] === "Yes" &&
                                                            <Button className='btn bgColor modalBtn border-0' id="button-addon2"
                                                                onClick={() => {
                                                                    handleInnerModal("Leave entitlements",
                                                                        ``,
                                                                        "leaveEntitlementsArray", "", "",
                                                                        values[`leaveEntitlementsArray`], "")
                                                                }}>
                                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                            </Button>
                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                        <DynamicYesNo name={`ChoiceFund`} values={values} handleChange={handleChange} />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
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
