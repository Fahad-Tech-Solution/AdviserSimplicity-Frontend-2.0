// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import React, { useEffect, useState } from 'react';
// import { Row, Table } from 'react-bootstrap';

// import DatePicker from 'react-datepicker';
// import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, RenderName, toCommaAndDollar, toPercentage } from '../../Assets/Api/Api';

// const NewLoadingExclusion = (props) => {


//     let initialValues = (props?.modalObject?.editArray && props?.modalObject?.editArray.length) ? { NumberOfMap: props.modalObject.editArray.length } : { NumberOfMap: "" };

//     let [UserStatus] = useState(localStorage.getItem('UserStatus'));
//     let [HeaderFlag, setHeaderFlag] = useState(false);

//     const fillInitialValues = (setFieldValue) => {

//         if (props.modalObject.values[`${props.modalObject.key}${props.modalObject.index}`]) {

//             let data = props.modalObject.values[`${props.modalObject.key}${props.modalObject.index}`];

//             setFieldValue("NumberOfMap", data.length);

//             data.forEach((element, index) => {

//                 setFieldValue("coverType" + index, element.coverType);
//                 setFieldValue("premiums" + index, element.premiums);
//                 setFieldValue("frequency" + index, element.frequency);

//                 if (element.coverType === "Income protection") {
//                     // alert("i am in", element.waitingPeriod)
//                     setFieldValue("waitingPeriod" + index, element.waitingPeriod);
//                     setFieldValue("benefitPeriod" + index, element.benefitPeriod);
//                 }
//             });



//         }
//     };

//     let onSubmit = async (values) => {

//         console.log(values)

//         const newEntries = [];

//         const loopLength = parseFloat(values.NumberOfMap);

//         // Iterate through each map entry and create a new object
//         for (let i = 0; i < loopLength; i++) {
//             const newEntry = {
//                 coverType: values[`coverType${i}`] || "",
//                 premiums: values[`premiums${i}`] || "",
//                 frequency: values[`frequency${i}`] || "",
//             };

//             // Add waiting and benefit periods if coverType is "Income protection"
//             if (newEntry.coverType === "Income protection") {
//                 // alert("ma yahna")
//                 newEntry.waitingPeriod = values[`waitingPeriod${i}`] || "";
//                 newEntry.benefitPeriod = values[`benefitPeriod${i}`] || "";
//             }

//             newEntries.push(newEntry);
//         }

//         // Log the new entries to verify
//         console.log(JSON.stringify(newEntries));



//         props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, newEntries)
//         let Total = newEntries.reduce((total, entry) => total + parseFloat(entry.premiums.replace(/[^0-9.-]+/g, "")), 0);

//         props.setFieldValue(`sumInsuredSum${props.modalObject.index}`, toCommaAndDollar(Total));

//         // Reset the flag state if necessary
//         if (props.flagState) {
//             props.setFlagState(false);
//         }
//     };


//     let handleInput = (e, setFieldValue) => {
//         const value = e.target.value > 4 ? 4 : e.target.value;
//         setFieldValue(e.target.id, value);
//     };


//     return (
//         <Formik
//             initialValues={initialValues}
//             onSubmit={onSubmit}
//             enableReinitialize
//             innerRef={props.formRef}
//         >
//             {({ values, handleChange, setFieldValue, handleBlur }) => {
//                 useEffect(() => {
//                     fillInitialValues(setFieldValue);
//                 }, []);

//                 return (
//                     <Form>
//                         <Row>
//                             <div className="col-md-12">
//                                 <div className='row justify-content-center'>

//                                     <div className='d-flex justify-content-center gap-3'>
//                                         <p className='text-end mt-2'>
//                                             {props.modalObject.question}
//                                         </p>
//                                         <div>
//                                             <Field

//                                                 type="number"
//                                                 id="NumberOfMap"
//                                                 name="NumberOfMap"
//                                                 className="form-control inputDesignDoubleInput"
//                                                 onChange={(e) => handleInput(e, setFieldValue)}
//                                             />
//                                         </div>
//                                     </div>


//                                     <div className='mt-4'>
//                                         {values.NumberOfMap &&

//                                             <Table striped bordered responsive hover>
//                                                 <thead>
//                                                     <tr>
//                                                         <th><div className={HeaderFlag ? "d-flex justify-content-center align-items-center h-100 w-100 mb-3" : ""}>No#</div></th>
//                                                         <th><div className={HeaderFlag ? "d-flex justify-content-center align-items-center h-100 w-100 mb-3" : ""}>Cover Type</div></th>
//                                                         <th colspan={HeaderFlag ? 3 : 1} className={HeaderFlag ? "text-center" : ""}>
//                                                             {HeaderFlag ? "Other Details" : "Premiums"}
//                                                             {HeaderFlag &&
//                                                                 <Table striped bordered responsive hover className='m-0 p-0'>
//                                                                     <thead>
//                                                                         <tr>
//                                                                             <th style={{ borderLeft: "none" }}>Premiums</th>
//                                                                             <th>Waiting Period</th>
//                                                                             <th style={{ borderRight: "none" }}>Benefit Period</th>
//                                                                         </tr>
//                                                                     </thead>
//                                                                 </Table>
//                                                             }
//                                                         </th>
//                                                         <th><div className={HeaderFlag ? "d-flex justify-content-center align-items-center h-100 w-100 mb-3" : ""}>Frequency</div></th>
//                                                     </tr>
//                                                 </thead>

//                                                 <tbody>
//                                                     {Array.from({ length: values.NumberOfMap }).map((_, i) => {
//                                                         return (
//                                                             <tr>
//                                                                 <td>{i + 1}</td>
//                                                                 <td>
//                                                                     <Field
//                                                                         as="select"
//                                                                         id={`coverType${i}`}
//                                                                         name={`coverType${i}`}
//                                                                         className="form-select inputDesignDoubleInput"
//                                                                         onChange={(e) => {
//                                                                             const { name, value } = e.target;
//                                                                             setFieldValue(name, value);

//                                                                             if (value === "Income protection") {
//                                                                                 // Directly set the flag if the new value is "Income protection"
//                                                                                 setHeaderFlag(true);
//                                                                             } else {
//                                                                                 // Check if any of the coverType values is "Income protection"
//                                                                                 const hasIncomeProtection = Array.from({ length: values.NumberOfMap }).some((_, index) => {

//                                                                                     console.log(values[`coverType${index}`])

//                                                                                     if (index === i) {
//                                                                                         return (false)
//                                                                                     }


//                                                                                     return (values[`coverType${index}`] === "Income protection")

//                                                                                 }
//                                                                                 );
//                                                                                 setHeaderFlag(hasIncomeProtection);
//                                                                             }
//                                                                         }}
//                                                                     >
//                                                                         <option value={""}>Select</option>
//                                                                         <option value={"Life"}>Life</option>
//                                                                         <option value={"TPD"}>TPD</option>
//                                                                         <option value={"Trauma"}>Trauma</option>
//                                                                         <option value={"Income protection"}>Income protection</option>
//                                                                     </Field>
//                                                                 </td>

//                                                                 {values[`coverType${i}`] === "Income protection" ?
//                                                                     <td colspan={HeaderFlag ? 3 : 1}>

//                                                                         <Table responsive hover className='m-0'>
//                                                                             <tbody>
//                                                                                 <td className="pe-2" style={{ width: "27%" }}>
//                                                                                     <Field
//                                                                                         type="text"
//                                                                                         placeholder="Premiums"
//                                                                                         id={`premiums${i}`}
//                                                                                         name={`premiums${i}`}
//                                                                                         className="form-control inputDesignDoubleInput"
//                                                                                         onChange={(e) => {
//                                                                                             setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")))
//                                                                                         }}
//                                                                                     />
//                                                                                 </td>
//                                                                                 <td className="px-2" style={{ width: "37%" }}>
//                                                                                     <Field
//                                                                                         as="select"
//                                                                                         id={`waitingPeriod${i}`}
//                                                                                         name={`waitingPeriod${i}`}
//                                                                                         className="form-select inputDesignDoubleInput"
//                                                                                     >
//                                                                                         <option value={""}>Select</option>
//                                                                                         <option value={"30 Days"}>30 Days</option>
//                                                                                         <option value={"60 Days"}>60 Days</option>
//                                                                                         <option value={"90 Days"}>90 Days</option>
//                                                                                         <option value={"120 Days"}>120 Days</option>
//                                                                                         <option value={"180 Days"}>180 Days</option>
//                                                                                         <option value={"2 Years"}>2 Years</option>
//                                                                                     </Field>
//                                                                                 </td>
//                                                                                 <td className="ps-2" >
//                                                                                     <Field
//                                                                                         as="select"
//                                                                                         id={`benefitPeriod${i}`}
//                                                                                         name={`benefitPeriod${i}`}
//                                                                                         className="form-select inputDesignDoubleInput"
//                                                                                     >
//                                                                                         <option value={""}>Select</option>
//                                                                                         <option value={"2 Years"}>2 Years</option>
//                                                                                         <option value={"5 Years"}>5 Years</option>
//                                                                                         <option value={"To Age 60"}>To Age 60</option>
//                                                                                         <option value={"To Age 65"}>To Age 65</option>
//                                                                                         <option value={"To Age 70"}>To Age 70</option>

//                                                                                     </Field>
//                                                                                 </td>
//                                                                             </tbody>
//                                                                         </Table>
//                                                                     </td> :

//                                                                     <td colspan={HeaderFlag ? 3 : 1}>
//                                                                         <Field
//                                                                             type="text"
//                                                                             placeholder="Premiums"
//                                                                             id={`premiums${i}`}
//                                                                             name={`premiums${i}`}
//                                                                             className="form-control inputDesignDoubleInput"
//                                                                             onChange={(e) => {
//                                                                                 setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")))
//                                                                             }}
//                                                                         />
//                                                                     </td>
//                                                                 }



//                                                                 <td style={{ minWidth: "150px" }}>
//                                                                     <Field
//                                                                         as="select"
//                                                                         id={`frequency${i}`}
//                                                                         name={`frequency${i}`}
//                                                                         className="form-select inputDesignDoubleInput"
//                                                                         onChange={(e) => {
//                                                                             setFieldValue(e.target.name, e.target.value);
//                                                                         }}
//                                                                     >
//                                                                         <option value={""}>Select</option>
//                                                                         {values[`coverType${i}`] !== "Income protection" && <React.Fragment>
//                                                                             {/* Not For IP */}
//                                                                             <option value={"Stepped"}>Stepped</option>
//                                                                             <option value={"Smoker"}>Smoker</option>
//                                                                             <option value={"Own Occupation"}>Own Occupation</option>
//                                                                             <option value={"Any Occupation"}>Any Occupation</option>
//                                                                             <option value={"Indexed to CPI"}>Indexed to CPI</option>
//                                                                             <option value={"Continuation option"}>Continuation option</option>
//                                                                             <option value={"Trauma Plus"}>Trauma Plus</option>
//                                                                             <option value={"Superlinked"}>Superlinked</option>
//                                                                         </React.Fragment>}

//                                                                         {/* For IP */}
//                                                                         {values[`coverType${i}`] === "Income protection" && <React.Fragment>
//                                                                             <option value={"Stepped"}>Stepped </option>
//                                                                             <option value={"Smoker"}>Smoker </option>
//                                                                             <option value={"Agreed"}>Agreed</option>
//                                                                             <option value={"Indemnity"}>Indemnity</option>
//                                                                             <option value={"Own Occupation Entire Period"}>Own Occupation Entire Period</option>
//                                                                             <option value={"Indexed to CPI"}>Indexed to CPI</option>
//                                                                             <option value={"Super continuance"}>Super continuance</option>
//                                                                             <option value={"Accident option"}>Accident option</option>
//                                                                             <option value={"Increasing claims option"}>Increasing claims option</option>
//                                                                             <option value={"Superlinked"}>Superlinked</option>
//                                                                         </React.Fragment>}
//                                                                     </Field>
//                                                                 </td>
//                                                             </tr>)
//                                                     })}
//                                                 </tbody>
//                                             </Table>
//                                         }

//                                     </div>
//                                 </div>
//                             </div>
//                         </Row>
//                     </Form>
//                 );
//             }}
//         </Formik >
//     );
// };

// export default NewLoadingExclusion;

import { Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import {
  toCommaAndDollar,
  RenderName,
} from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const NewLoadingExclusion = (props) => {
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));

  // 👇 initialize basic form structure
  const initialValues = {
    NewLoadingExclusionDetails: [],
    NumberOfMap:
      props?.modalObject?.editArray?.length || 1,
  };

  // ✅ Fill initial values for editing case
const fillInitialValues = (setFieldValue) => {
  try {
    const editArray = props?.modalObject?.editArray;
    const stakeHolder = props?.modalObject?.stakeHolder;
    const parentValues = props?.modalObject?.parentValues || {};

    // ✅ Case 1: Direct edit array (modal edit mode)
    if (editArray && editArray.length > 0) {
      setFieldValue("NumberOfMap", editArray.length);
      setFieldValue("NewLoadingExclusionDetails", editArray);
      return;
    }

    // ✅ Case 2: Data from parent modal using sumInsuredSum
    if (stakeHolder) {
      // Extract baseKey & index — e.g., "PersonalInsurance[0]"
      const baseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");
      const idxMatch = stakeHolder.match(/\[(\d+)\]/);
      const index = idxMatch ? parseInt(idxMatch[1], 10) : 0;

      // Access structure like parentValues.PersonalInsurance[0].sumInsuredSum
      const parentBlock = parentValues?.[baseKey]?.[index];
      const sumInsuredArray = parentBlock?.sumInsuredSum || [];

      if (Array.isArray(sumInsuredArray) && sumInsuredArray.length > 0) {
        setFieldValue("NumberOfMap", sumInsuredArray.length);
        setFieldValue("NewLoadingExclusionDetails", sumInsuredArray);
        return;
      }
    }

    // ✅ Case 3: fallback default (blank single row)
    setFieldValue("NewLoadingExclusionDetails", [
      {
        coverType: "",
        premiums: "",
        frequency: "",
        waitingPeriod: "",
        benefitPeriod: "",
      },
    ]);
    setFieldValue("NumberOfMap", 1);
  } catch (err) {
    console.error("Error in fillInitialValues:", err);
    setFieldValue("NumberOfMap", 1);
  }
};


  // ✅ onSubmit logic
 const onSubmit = async (values) => {
  const rows = values.NewLoadingExclusionDetails || [];

  // Save data into parent key: sumInsuredSum
  props.setFieldValue(`sumInsured${props.modalObject.index}`, rows);

  // Calculate total premiums
  const total = rows.reduce(
    (acc, row) =>
      acc +
      (parseFloat((row.premiums || "").toString().replace(/[^0-9.-]+/g, "")) || 0),
    0
  );
  props.setFieldValue(
    `sumInsured${props.modalObject.index}`,
    toCommaAndDollar(total)
  );

  if (props.flagState) props.setFlagState(false);
};


  // ✅ Column configuration for DynamicTable
  const columns = [
    {
      title: "No#",
      dataIndex: "index",
      key: "owner",
      render: (_, __, i) => i + 1,
      width: 60,
    },
    {
      title: "Cover Type",
      dataIndex: "coverType",
      key: "coverType",
      type: "select",
      options: [
        { value: "Life", label: "Life" },
        { value: "TPD", label: "TPD" },
        { value: "Trauma", label: "Trauma" },
        { value: "Income protection", label: "Income protection" },
      ],
      width: 180,
    },
    {
      title: "Premiums",
      dataIndex: "premiums",
      key: "premiums",
      type: "number-toComma",
      width: 150,
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      type: "select",
      options: [
        { value: "Monthly", label: "Monthly" },
        { value: "6 Monthly", label: "6 Monthly" },
        { value: "Yearly", label: "Yearly" },
      ],
      width: 150,
    },
    {
      title: "Waiting Period",
      dataIndex: "waitingPeriod",
      key: "waitingPeriod",
      type: "select",
      options: [
        { value: "30 Days", label: "30 Days" },
        { value: "60 Days", label: "60 Days" },
        { value: "90 Days", label: "90 Days" },
        { value: "120 Days", label: "120 Days" },
        { value: "180 Days", label: "180 Days" },
        { value: "2 Years", label: "2 Years" },
      ],
      width: 160,
    },
    {
      title: "Benefit Period",
      dataIndex: "benefitPeriod",
      key: "benefitPeriod",
      type: "select",
      options: [
        { value: "2 Years", label: "2 Years" },
        { value: "5 Years", label: "5 Years" },
        { value: "To Age 60", label: "To Age 60" },
        { value: "To Age 65", label: "To Age 65" },
        { value: "To Age 70", label: "To Age 70" },
      ],
      width: 160,
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        const dataRows = useMemo(() => {
          const num = Number(values.NumberOfMap) || 1;
          const arr = values.NewLoadingExclusionDetails || [];
          return Array.from({ length: num }, (_, i) => ({
            key: i,
            ...arr[i],
          }));
        }, [values.NumberOfMap, values.NewLoadingExclusionDetails]);

        return (
          <Form>
            <div className="mt-4 All_Client reportSection">
              <AntdTable
                columns={columns}
                data={dataRows}
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </div>
            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NewLoadingExclusion;
