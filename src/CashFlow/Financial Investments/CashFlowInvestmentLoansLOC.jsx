import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Row, Table } from 'react-bootstrap';
import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, RenderName, toCommaAndDollar, toPercentage } from '../../Components/Assets/Api/Api';
import DynamicYesNo from '../../Components/Questions/FinancialInvestments/QuestionsDetail/DynamicYesNo';
import { CreatableMultiSelectField } from '../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField';

const CashFlowInvestmentLoansLOC = (props) => {

    /*
        ? Skipped Inputs:
        following input is skipped because it was not in Main table but exists in Excel
        -Year of Loan 
            `
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
            `
     */


    let [UserStatus] = useState(localStorage.getItem("UserStatus"));

    let initialValues = { NumberOfMap: "" };

    let onSubmit = (values) => {
        console.log(JSON.stringify(values))
    }

    const fillInitialValues = (setFieldValue) => {


    };

    let FormulaSetting = () => {

    }

    const options =
        UserStatus !== "Single"
            ? [
                { value: "client", label: RenderName("client") },
                { value: "partner", label: RenderName("partner") },
                { value: "joint", label: RenderName("joint") },
            ]
            : [{ value: "client", label: RenderName("client") }];



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
                            <div className="col-md-12">
                                <div className='row justify-content-center'>

                                    <div className="col-md-12">
                                        <div className="d-flex justify-content-center align-items-center gap-4">
                                            <label htmlFor="" className="text-end ">
                                                Owner
                                            </label>

                                            <div style={{ minWidth: "25%" }}>
                                                <Field
                                                    name={`owner`}
                                                    component={CreatableMultiSelectField}
                                                    label="Multi Select Field"
                                                    options={options}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {values.owner && (
                                        <div className='mt-4'>
                                            <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th>No#</th>
                                                        <th>Current Loan Balance</th>
                                                        <th>Loan Type</th>
                                                        <th>Loan Term</th>
                                                        <th>Initial Interest Rate (p.a.)</th>
                                                        <th>Deductible interest</th>
                                                        <th>Minimum Repayments (p.a)</th>
                                                        <th>Actual Annual Repayments</th>
                                                        <th>Repay Loan in Year</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.from({ length: values.owner.length }).map((_, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td className='fw-bold'>{RenderName(values.owner[i])}</td>
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
                                                                        placeholder="Deductible interest"
                                                                        id={`DeductibleInterest${i}`}
                                                                        name={`DeductibleInterest${i}`}
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

export default CashFlowInvestmentLoansLOC
