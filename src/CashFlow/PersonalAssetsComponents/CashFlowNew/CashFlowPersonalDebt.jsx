import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react'
import { Row, Table } from 'react-bootstrap';
import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, toCommaAndDollar, toPercentage } from '../../../Components/Assets/Api/Api';
import DynamicYesNo from '../../../Components/Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo';

const CashFlowPersonalDebt = (props) => {

    let handleInput = (e, setFieldValue) => {
        const value = e.target.value > 2 ? 2 : e.target.value;
        setFieldValue(e.target.id, value);
    };

    let initialValues = { NumberOfMap: "" };

    let onSubmit = (values) => {

    }

    const fillInitialValues = (setFieldValue) => {


    };

    let FormulaSetting = () => {

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
                }, [values.NumberOfMap]);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>

                                    <div className="d-flex justify-content-center align-items-center gap-4">
                                        <p className='text-end mt-1 pt-2'>
                                            How many {props.modalObject.title} does {localStorage.getItem("UserName")} have:
                                        </p>
                                        <div style={{ minWidth: "4%", maxWidth: "8%" }}>
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
                                                        <th>No#</th>
                                                        <th>Year of Loan</th>
                                                        <th>Current Loan Balance</th>
                                                        <th>Loan Type</th>
                                                        <th>Loan Term</th>
                                                        <th>Initial Interest Rate (p.a.)</th>
                                                        <th>Minimum Repayments (p.a)</th>
                                                        <th>Actual Annual Repayments</th>
                                                        <th>Repay Loan in Year</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.from({ length: values.NumberOfMap }).map((_, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{1 + i}</td>
                                                                <td style={{ width: "150px" }}>
                                                                    <Field
                                                                        as="select"
                                                                        placeholder="Year of Loan"
                                                                        id={`YearLoan${i}`}
                                                                        name={`YearLoan${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        {Array.from({ length: 30 }).map((_, i) =>
                                                                            <option key={i} value={i + 1}>
                                                                                Year {i + 1}
                                                                            </option>
                                                                        )}
                                                                    </Field>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Current Loan Balance"
                                                                        id={`CurrentLoanBalance${i}`}
                                                                        name={`CurrentLoanBalance${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")))
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        as="select"
                                                                        placeholder="Loan Type"
                                                                        id={`LoanType${i}`}
                                                                        name={`LoanType${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        <option value={"i/only"}>i/only</option>
                                                                        <option value={"P&I"}>P&I</option>
                                                                    </Field>
                                                                </td>
                                                                <td >
                                                                    <Field
                                                                        as="select"
                                                                        placeholder="Loan Term"
                                                                        id={`LoanTerm${i}`}
                                                                        name={`LoanTerm${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                        onChange={(e) => {
                                                                            setFieldValue(e.target.name, e.target.value);
                                                                        }}
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        {Array.from({ length: 30 }).map((_, i) =>
                                                                            <option key={i} value={i + 1}>
                                                                                Year {i + 1}
                                                                            </option>
                                                                        )}
                                                                    </Field>
                                                                </td>
                                                                <td >
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Initial Interest Rate (p.a.)"
                                                                        id={`InterestRate${i}`}
                                                                        name={`InterestRate${i}`}
                                                                        onChange={(e) => handleInputChange(e, setFieldValue, FormulaSetting, values)}
                                                                        onFocus={(e) => handleInputFocus(e, setFieldValue)}
                                                                        onKeyDown={(e) => handleInputKeyDown(e)}
                                                                        onBlur={(e) => handleInputBlur(e, setFieldValue, toPercentage, FormulaSetting, values)}
                                                                        className="form-control inputDesignDoubleInput"
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Minimum Repayments (p.a)"
                                                                        id={`MinimumRepayments${i}`}
                                                                        name={`MinimumRepayments${i}`}
                                                                        className="form-control inputDesignDoubleInput"
                                                                        disabled
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <div className='mt-1 w-100'>
                                                                        <DynamicYesNo
                                                                            name={`ActualAnnualRepayments${i}`}
                                                                            values={values}
                                                                            handleChange={handleChange}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Field
                                                                        as="select"
                                                                        placeholder="Repay Loan in Year"
                                                                        id={`RepayLoanInYear${i}`}
                                                                        name={`RepayLoanInYear${i}`}
                                                                        className="form-select inputDesignDoubleInput"
                                                                    >
                                                                        <option value={""}>Please Select</option>
                                                                        <option selected value={"No"}>No</option>
                                                                        {Array.from({ length: 30 }).map((_, i) =>
                                                                            <option key={i} value={i + 1}>
                                                                                Year {i + 1}
                                                                            </option>
                                                                        )}
                                                                    </Field>
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
    )
}

export default CashFlowPersonalDebt
