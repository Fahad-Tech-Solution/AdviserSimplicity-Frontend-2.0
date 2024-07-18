import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  ClientSalaryIncome: Yup.number().required("Required"),
  ClientEdit: Yup.string().required("Required"),
});

const MyForm = () => {
  const initialValues = {
    ClientSalaryIncome: '',
    ClientEdit: 'No', // Assuming you want a default value for ClientEdit
  };
  
  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="ClientEdit" className="form-label">
              Client Edit
            </label>
            <Field as="select" id="ClientEdit" name="ClientEdit" className="form-control">
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </Field>
            <ErrorMessage component="div" className="text-danger fw-bold" name="ClientEdit" />
          </div>

          <div className="mb-3">
            <label htmlFor="ClientSalaryIncome" className="form-label">
              Salary Income
            </label>
            <Field
              type="number"
              className="form-control inputDesign shadow"
              id="ClientSalaryIncome"
              name="ClientSalaryIncome"
              placeholder="salary income"
              disabled={values.ClientEdit !== "Yes"}
            />
            <ErrorMessage component="div" className="text-danger fw-bold" name="ClientSalaryIncome" />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
