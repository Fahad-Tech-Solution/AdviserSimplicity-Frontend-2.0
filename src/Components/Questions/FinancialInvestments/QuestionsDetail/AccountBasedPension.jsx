import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, InputGroup, Row, Table } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { openNotificationSuccess, RenderName, toCommaAndDollar } from '../../../Assets/Api/Api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import InnerModal from './InnerModal';
import DynamicYesNo from './DynamicYesNo';
import Beneficiaries from './Beneficiaries';
import { Tooltip } from 'antd';
import { FaCircleQuestion } from 'react-icons/fa6';
import AccountBasedBalance from '../AccountBasedBalance';
import AnnualPensionPaymentInnerModal from './AnnualPensionPaymentInnerModal';
import PortfolioValue from './PortfolioValue';

const AccountBasedPension = (props) => {
    let questionDetail = useRecoilValue(QuestionDetail);
    let bankDetailObj = useRecoilValue(BankDetail);
    let [ShowError, setShowError] = useState({});



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

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});


    let accountBasedPensionIssues = Object.keys(questionDetail.accountBasedPensionIssues).length > 0 ? questionDetail.accountBasedPensionIssues : {
        client: [],
        partner: [],
        joint: [],

    };  // Use an empty object as default if accountBasedPensionIssues is undefined


    let initialValues = accountBasedPensionIssues[props.modalObject.Input].length ? { NumberOfMap: accountBasedPensionIssues[props.modalObject.Input].length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);


    useEffect(() => {
        if (props.modalObject.values[props.modalObject.Input] && props.modalObject.values[props.modalObject.Input].length) {
            let arr = []

            for (let i = 0; i < props.modalObject.values[props.modalObject.Input].length; i++) {
                arr.push("");
            }
            setDynamicFields(arr);
        }
    }, [])

    const fillInitialValues = (setFieldValue) => {

        if (props.modalObject.values[props.modalObject.Input] && props.modalObject.values[props.modalObject.Input].length > 0) {
            setFieldValue(`NumberOfMap`, props.modalObject.values[props.modalObject.Input].length || '');

            let FoundArray = props.modalObject.values[props.modalObject.Input];
            // alert(FoundArray.length)
            FoundArray.forEach((data, i) => {
                if (data) {
                    setFieldValue(`platformName${i}`, data.platformName || '');
                    setFieldValue(`memberNumber${i}`, data.memberNumber || '');
                    setFieldValue(`portfolioArray${i}`, data.portfolioArray || '');
                    setFieldValue(`portfolioValue${i}`, data.portfolioValue || '');
                    setFieldValue(`balanceBenefitDetails${i}`, data.balanceBenefitDetails || '');
                    setFieldValue(`balanceBenefitDetailsArray${i}`, data.balanceBenefitDetailsArray || '');
                    setFieldValue(`pensionPayment${i}`, data.pensionPayment || '');
                    setFieldValue(`annualPensionPaymentArray${i}`, data.annualPensionPaymentArray || '');
                    setFieldValue(`nominatedBeneficiaries${i}`, data.nominatedBeneficiaries || '');
                    setFieldValue(`beneficiariesArray${i}`, data.beneficiariesArray || '');
                    setFieldValue(`annualAdvice${i}`, data.annualAdvice || '');

                }
            });
        }
    };

    let handleInput = (e, setFieldValue) => {
        const value = e.target.value > 10 ? 10 : e.target.value;
        setFieldValue(e.target.id, value);

        let arr = []

        for (let i = 0; i < value; i++) {
            arr.push("");
        }

        setDynamicFields(arr);

    };

    let handleInnerModal = (title, question, key, mainKey, key3, editArray, index, values, Platform) => {
        console.log(values);
        let ParentModal = props.modalObject.title
        setModalObject({
            title,
            question,
            key,
            mainKey,
            key3,
            editArray: editArray || [],
            index,
            values,
            ParentModal,
            Platform
        })
        setFlagState(true);
    }

    let DefaultUrl = useRecoilValue(defaultUrl)


    let onSubmit = async (values) => {
        // console.log(values);
        // return (false);
        // Extract the number of maps from the values
        const numberOfMaps = parseInt(values.NumberOfMap, 10);
        const newEntries = [];

        // Iterate through each map entry and create a new object
        for (let i = 0; i < numberOfMaps; i++) {
            const newEntry = {
                platformName: values[`platformName${i}`] || "",
                memberNumber: values[`memberNumber${i}`] || "",
                portfolioArray: values[`portfolioArray${i}`] || "",
                portfolioValue: values[`portfolioValue${i}`] || "",
                balanceBenefitDetails: values[`balanceBenefitDetails${i}`] || "",
                balanceBenefitDetailsArray: values[`balanceBenefitDetailsArray${i}`] || "",
                pensionPayment: values[`pensionPayment${i}`] || "",
                annualPensionPaymentArray: values[`annualPensionPaymentArray${i}`] || "",
                nominatedBeneficiaries: values[`nominatedBeneficiaries${i}`] || "",
                beneficiariesArray: values[`beneficiariesArray${i}`] || "",
                annualAdvice: values[`annualAdvice${i}`] || "",
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        let DataOf = props.modalObject.Input;

        props.setFieldValue(DataOf, newEntries);

        let total = newEntries.reduce((total, entry) => total + parseFloat((entry.pensionPayment).replace(/[^0-9.-]+/g, "")), 0);

        props.setFieldValue(DataOf + "CurrentBalance", toCommaAndDollar(total));


        props.modalObject.setShowError(prevState => ({
            ...prevState,
            [`${DataOf + "CurrentBalance"}Error`]: false,
            [`${DataOf + "CurrentBalance"}Message`]: "",

        }))

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    };


    let CheckInputValue = (values, setFieldValue, currentInput, index) => {
        // console.log(values, setFieldValue, currentInput);


        let portfolioArray = values[`portfolioArray${index}`];

        let ExpectedSum = portfolioArray.reduce((total, entry) => total + parseFloat((entry.investmentValue).replace(/[^0-9.-]+/g, "")), 0);
        let data = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, ""));

        console.log(ExpectedSum, data, currentInput.name, ShowError)

        if (ExpectedSum !== data) {
            setShowError(prevState => ({
                ...prevState,
                [`${currentInput.name}Error`]: true,
                [`${currentInput.name}Message`]: "Total must be equal to the sum of all Investment value filled in the popup. The sum is " + toCommaAndDollar(ExpectedSum),
            }));
        }
        else {
            setShowError(prevState => ({
                ...prevState,
                [`${currentInput.name}Error`]: false,
                [`${currentInput.name}Message`]: "",
            }));
        }


    }



    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({ values, setFieldValue, handleChange }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                return (
                    <Form>
                        <Row>
                            <InnerModal modalObject={modalObject} setFieldValue={setFieldValue} setFlagState={setFlagState} flagState={flagState} >
                                {
                                    modalObject.key === "portfolioArray" ? <PortfolioValue /> :
                                        modalObject.key === "balanceBenefitDetailsArray" ? <AccountBasedBalance /> :   // is ko change karna hai
                                            modalObject.key === "beneficiariesArray" ? <Beneficiaries /> :   // is ko change karna hai
                                                modalObject.key === "annualPensionPaymentArray" ? <AnnualPensionPaymentInnerModal /> : ""
                                }
                            </InnerModal>

                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                        <p className='text-end mt-3'>
                                            How many Account Based Pension does {nameSet} have :
                                        </p>

                                        <div style={{ width: "8%" }}>
                                            <Field
                                                type="number"
                                                id="NumberOfMap"
                                                name="NumberOfMap"
                                                className="form-control inputDesignDoubleInput"
                                                onChange={(e) => handleInput(e, setFieldValue)}
                                            />
                                        </div>
                                    </div>


                                    {values.NumberOfMap && (
                                        <div className='mt-4'>
                                            <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th onClick={() => { console.log(values) }}>No#</th>
                                                        <th>Fund Name</th>
                                                        <th>Member Number</th>
                                                        <th>PlatFrom</th>
                                                        <th>Balance &nbsp;
                                                            <Tooltip placement="top" title={"Enter in the Underlying investments, Tax and Preserved Components by clicking into onto the green option"}>
                                                                <FaCircleQuestion style={{ fontSize: '18px', cursor: 'pointer' }} />
                                                            </Tooltip>
                                                        </th>
                                                        <th>Annual Pension Payment</th>
                                                        <th>Nominated Beneficiaries</th>
                                                        <th>Annual Advice Service Fee</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dynamicFields.map((elem, i) => {
                                                        return (<tr key={i}>
                                                            <td>{1 + i}</td>
                                                            <td>
                                                                <Field
                                                                    as="select"
                                                                    placeholder="Fund Name"
                                                                    id={`platformName${i}`}
                                                                    name={`platformName${i}`}
                                                                    className="form-select inputDesignDoubleInput"
                                                                >
                                                                    <option value={""}>Please Select</option>
                                                                    {
                                                                        bankDetailObj?.AccountBasedPensions && bankDetailObj.AccountBasedPensions.length > 0 ? (
                                                                            bankDetailObj.AccountBasedPensions.map((elem, index) => (
                                                                                <option key={index} value={elem._id}>
                                                                                    {elem.platformName}
                                                                                </option>
                                                                            ))
                                                                        ) : (
                                                                            <option disabled>No Platforms Added in Account Based Pensions</option>
                                                                        )
                                                                    }
                                                                </Field>
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Member Number & Details"
                                                                    id={`memberNumber${i}`}
                                                                    name={`memberNumber${i}`}
                                                                    className="form-control inputDesignDoubleInput"
                                                                />
                                                            </td>
                                                            <td>
                                                                <InputGroup className={`mb-3 ${ShowError[`portfolioValue${i}Error`] === true ? "is-invalid" : ""}`}>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Portfolio Value"
                                                                        id={`portfolioValue${i}`}
                                                                        name={`portfolioValue${i}`}
                                                                        className={`form-control inputDesignDoubleInput ${ShowError[`portfolioValue${i}Error`] === true ? "is-invalid" : ""}`}
                                                                        onChange={(e) => {
                                                                            setFieldValue(e.target.name,
                                                                                toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                            CheckInputValue(values, setFieldValue, e.target, i)
                                                                        }}
                                                                    />
                                                                    <Button
                                                                        className="btn bgColor modalBtn border-0"
                                                                        id="button-addon2"
                                                                        onClick={() => {
                                                                            const platformKey = `platformName${i}`;
                                                                            const selectedPlatformId = values[platformKey];

                                                                            // Check if a platform name is selected
                                                                            if (!selectedPlatformId) {
                                                                                openNotificationSuccess(
                                                                                    "error",
                                                                                    "topRight",
                                                                                    "Error Notification",
                                                                                    "Please! Select Platform Name First"
                                                                                );
                                                                                return;
                                                                            }

                                                                            // Define platform name and object set
                                                                            let name = "";
                                                                            const platforms = bankDetailObj?.AccountBasedPensions;

                                                                            // Find the platform name
                                                                            const SelectedPlatform = platforms?.find((elem) => elem._id === selectedPlatformId);

                                                                            if (SelectedPlatform) {
                                                                                name = SelectedPlatform.platformName;

                                                                                // Call handleInnerModal with the platform name and relevant values
                                                                                handleInnerModal(
                                                                                    `${name}_Portfolio Value`,
                                                                                    `How many Underlying Investments does ${nameSet} have :`,
                                                                                    "portfolioArray",
                                                                                    "portfolioValue",
                                                                                    "totalPortfolioCost",
                                                                                    values[`portfolioArray${i}`],
                                                                                    i,
                                                                                    values,
                                                                                    SelectedPlatform
                                                                                );
                                                                            } else {
                                                                                openNotificationSuccess(
                                                                                    "error",
                                                                                    "topRight",
                                                                                    "Error Notification",
                                                                                    "Selected Fund Name not found."
                                                                                );
                                                                            }
                                                                        }}
                                                                    >
                                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                    </Button>
                                                                </InputGroup>
                                                                <div class="invalid-feedback">
                                                                    {ShowError[`portfolioValue${i}Message`]}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <InputGroup className="mb-3">
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Balance & Benefit Details"
                                                                        id={`balanceBenefitDetails${i}`}
                                                                        name={`balanceBenefitDetails${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                        }}
                                                                    />
                                                                    <Button className='btn bgColor modalBtn border-0' id="button-addon2" onClick={() => {
                                                                        // if (values[`platformName${i}`]) {
                                                                        let name = RenderName(props.modalObject.Input);
                                                                        //     bankDetailObj.map((elem, index) => {

                                                                        //         if (elem._id === values[`platformName${i}`]) {
                                                                        //             name = elem.platformName
                                                                        //         }

                                                                        //     });
                                                                        handleInnerModal(name + "_Balance & Benefit Details", `How many Benefit Details and Components do ${nameSet} have ?`, "balanceBenefitDetailsArray", "balanceBenefitDetails", "", values[`balanceBenefitDetailsArray${i}`], i, values)
                                                                        // }
                                                                        // else {
                                                                        //     // type, placement, message, description
                                                                        //     openNotificationSuccess("error", 'topRight', "Error Notification", "Please! Select Fund Name First")
                                                                        // }
                                                                    }}>
                                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                    </Button>
                                                                </InputGroup>
                                                            </td>
                                                            <td>
                                                                <InputGroup className="mb-3">
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Pension Payment"
                                                                        id={`pensionPayment${i}`}
                                                                        name={`pensionPayment${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                        }}
                                                                    />
                                                                    <Button className='btn bgColor modalBtn border-0' id="button-addon2" onClick={() => {
                                                                        // if (values[`platformName${i}`]) {
                                                                        let name = RenderName(props.modalObject.Input);
                                                                        //     bankDetailObj.map((elem, index) => {

                                                                        //         if (elem._id === values[`platformName${i}`]) {
                                                                        //             name = elem.platformName
                                                                        //         }

                                                                        //     });
                                                                        handleInnerModal(name + "_Annual Pension Payment", '', "annualPensionPaymentArray", "pensionPayment", "", values[`annualPensionPaymentArray${i}`], i, values)
                                                                        // }
                                                                        // else {
                                                                        //     // type, placement, message, description
                                                                        //     openNotificationSuccess("error", 'topRight', "Error Notification", "Please! Select Fund Name First")
                                                                        // }
                                                                    }}>
                                                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                    </Button>
                                                                </InputGroup>
                                                            </td>
                                                            <td>
                                                                <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                                                                    <DynamicYesNo name={`nominatedBeneficiaries${i}`} values={values} handleChange={handleChange} />
                                                                    {values[`nominatedBeneficiaries${i}`] === "Yes" &&
                                                                        <Button className='btn bgColor modalBtn border-0' id="button-addon2" onClick={() => {
                                                                            // if (values[`platformName${i}`]) {
                                                                            let name = RenderName(props.modalObject.Input);
                                                                            //     bankDetailObj.map((elem, index) => {

                                                                            //         if (elem._id === values[`platformName${i}`]) {
                                                                            //             name = elem.platformName
                                                                            //         }

                                                                            //     });
                                                                            handleInnerModal(name + "_Beneficiaries", `How many beneficiaries do ${nameSet} have :`, "beneficiariesArray", "", "", values[`beneficiariesArray${i}`], i)
                                                                            // }
                                                                            // else {
                                                                            //     // type, placement, message, description
                                                                            //     openNotificationSuccess("error", 'topRight', "Error Notification", "Please! Select Fund Name First")
                                                                            // }
                                                                        }}>
                                                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                                        </Button>
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Annual Advice Service Fee"
                                                                    id={`annualAdvice${i}`}
                                                                    name={`annualAdvice${i}`}
                                                                    className="form-control inputDesignDoubleInput"
                                                                    onChange={(e) => {
                                                                        setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                                                                    }}
                                                                />
                                                            </td>
                                                        </tr>)
                                                    })}
                                                </tbody>
                                            </Table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Row>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AccountBasedPension;
