import React from 'react';
import { Formik, Form } from 'formik';
import DynamicTableRow from './DynamicTableRow';

const MyFormComponent = () => {
  const rowConfig = [
    { name: 'client.SGPercentage', type: 'number-toPercent', placeholder: 'Enter SG Value' },
    { name: 'Amount', type: 'number-toComma', placeholder: 'Investment Code' },
    { name: 'GrossSalary', type: 'text', placeholder: 'Gross Salary' },
    { name: 'GrossSalary', type: 'number', placeholder: 'Gross Salary' },
    { name: 'startDate', type: 'date', placeholder: 'Start Date' },
    { name: 'remunerationType', type: 'select', options: [{ value: 'Gross Salary', label: 'Gross Salary' }, { value: 'Total Package', label: 'Total Package' }] },
    { name: 'client.ChoiceFund', type: 'yesno' },
    { name: 'modalButton', type: 'modal' },
  ];

  const initialValues = {
    SGPercentage: '',
    Amount: '',
    GrossSalary: '',
    startDate: '',
    remunerationType: '',
    ChoiceFund: '',
  };

  const handleInnerModal = (name, values) => {
    console.log("Opening modal for:", name, values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={values => console.log(values)}>
      {({ values, setFieldValue, handleChange, handleBlur }) => (
        <Form>
          <table>
            <thead>
              <tr>
                <th>SG Percentage</th>
                <th>Amount</th>
                <th>Gross Salary</th>
                <th>Start Date</th>
                <th>Remuneration Type</th>
                <th>Choice Fund</th>
                <th>Modal</th>
              </tr>
            </thead>
            <tbody>
              <DynamicTableRow
                rowConfig={rowConfig}
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleInnerModal={handleInnerModal}
              />
            </tbody>
          </table>
          {/* <button type="submit">Submit</button> */}
        </Form>
      )}
    </Formik>
  );
};

export default MyFormComponent;
