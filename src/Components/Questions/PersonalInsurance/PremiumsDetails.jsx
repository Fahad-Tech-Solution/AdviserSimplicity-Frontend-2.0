// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import React, { useEffect, useState } from 'react';
// import { Row, Table } from 'react-bootstrap';

// import DatePicker from 'react-datepicker';
// import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, RenderName, toCommaAndDollar, toPercentage } from '../../Assets/Api/Api';

// const PremiumsDetails = (props) => {


//   let initialValues = {
//     coverType: "",
//     premiums: "",
//     frequency: "",
//     totalCost: "",
//     payeeOfPremiums: "",
//     paymentMethod: "",
//     commissionRate: "",
//   };

//   let [UserStatus] = useState(localStorage.getItem('UserStatus'));

//   const fillInitialValues = (setFieldValue) => {
//     if (props.modalObject.values[`${props.modalObject.key}${props.modalObject.index}`]) {

//       let data = props.modalObject.values[`${props.modalObject.key}${props.modalObject.index}`];
//       setFieldValue("coverType", data.coverType);
//       setFieldValue("premiums", data.premiums);
//       setFieldValue("frequency", data.frequency);
//       setFieldValue("totalCost", data.totalCost);
//       setFieldValue("payeeOfPremiums", data.payeeOfPremiums);
//       setFieldValue("paymentMethod", data.paymentMethod);
//       setFieldValue("commissionRate", data.commissionRate);

//     }
//   };

// let onSubmit = async (values) => {

//   console.log(values)

//   props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, values)


//   props.setFieldValue(`premiums${props.modalObject.index}`, values.totalCost)



//   // Reset the flag state if necessary
//   if (props.flagState) {
//     props.setFlagState(false);
//   }
// };

// let FormulaSetting = (values, setFieldValue, currentinput) => {
//   try {
//     // Extract necessary values
//     let premiums = values.premiums.replace(/[^0-9.-]+/g, "");
//     let frequency = values.frequency;
//     let totalCost = values.totalCost;

//     // Perform actions based on currentinput
//     switch (currentinput.name) {
//       case "premiums":
//         // Safely parse the input and handle invalid input cases
//         premiums = parseFloat(currentinput.value.replace(/[^0-9.-]+/g, ""));
//         if (isNaN(premiums)) {
//           premiums = 0; // Set a default value if parsing fails
//         }
//         break;
//       case "frequency":
//         frequency = parseFloat(currentinput.value);
//         if (isNaN(frequency) || frequency === undefined || frequency === null || frequency === "") {
//           frequency = 1; // Set a default value if frequency is invalid
//         }
//         break;
//       default:
//         console.log("No valid input setting for:", currentinput);
//         break;
//     }

//     // Ensure that premiums and frequency are valid numbers before calculation
//     if (!isNaN(premiums) && !isNaN(frequency)) {
//       totalCost = premiums * frequency;
//     } else {
//       totalCost = 0; // Fallback if any value is invalid
//     }

//     // Set totalCost safely
//     setFieldValue("totalCost", toCommaAndDollar(totalCost));

//   } catch (error) {
//     // Log any unexpected errors and handle gracefully
//     console.error("Error in FormulaSetting:", error);
//     setFieldValue("totalCost", 0); // Set a default in case of error
//   }
// };

//   let emptyArrow = () => { }

//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={onSubmit}
//       enableReinitialize
//       innerRef={props.formRef}
//     >
//       {({ values, handleChange, setFieldValue, handleBlur }) => {
//         useEffect(() => {
//           fillInitialValues(setFieldValue);
//         }, []);

//         return (
//           <Form>
//             <Row>
//               <div className="col-md-12">
//                 <div className='row justify-content-center'>
//                   <div className='mt-4'>
//                     <Table striped bordered responsive hover>
//                       <thead>
//                         <tr>
//                           <th>No#</th>
//                           <th>Cover Type</th>
//                           <th>Premiums</th>
//                           <th>Frequency</th>
//                           <th>Total Cost p.a</th>
//                           <th>Payee of Premiums</th>
//                           <th>Payment Method</th>
//                           <th>Commission Rate</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td>{1}</td>
//                           <td>
//                             <Field
//                               as="select"
//                               id={`coverType`}
//                               name={`coverType`}
//                               className="form-select inputDesignDoubleInput"
//                             >
//                               <option value={""}>Select</option>
//                               <option value={"Life"}>Life</option>
//                               <option value={"TPD"}>TPD</option>
//                               <option value={"Trauma"}>Trauma</option>
//                               <option value={"Income protection"}>Income protection</option>
//                             </Field>
//                           </td>
//                           <td>
//                             <Field
//                               type="text"
//                               placeholder="Premiums"
//                               id={`premiums`}
//                               name={`premiums`}
//                               className="form-control inputDesignDoubleInput"
//                               onChange={(e) => {
//                                 setFieldValue(e.target.name, toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")))
//                                 FormulaSetting(values, setFieldValue, e.target)
//                               }}
//                             />
//                           </td>
//                           <td style={{ minWidth: "150px" }}>
//                             <Field
//                               as="select"
//                               id={`frequency`}
//                               name={`frequency`}
//                               className="form-select inputDesignDoubleInput"
//                               onChange={(e) => {
//                                 setFieldValue(e.target.name, e.target.value);
//                                 FormulaSetting(values, setFieldValue, e.target)
//                               }}
//                             >
//                               <option value={""}>Select</option>
//                               <option value={12}>Monthly</option>
//                               <option value={2}>6 Monthly</option>
//                               <option value={1}>Yearly</option>
//                             </Field>
//                           </td>
//                           <td>
//                             <Field
//                               type="text"
//                               placeholder="Total Cost p.a"
//                               id={`totalCost`}
//                               name={`totalCost`}
//                               disabled
//                               className="form-control inputDesignDoubleInput"
//                             />
//                           </td>
//                           <td>
//                             <Field
//                               as="select"
//                               id={`payeeOfPremiums`}
//                               name={`payeeOfPremiums`}
//                               className="form-select inputDesignDoubleInput"
//                             >
//                               <option value={""}>Select</option>
//                               <option value={"client"}>{RenderName("client")}</option>
//                               {UserStatus !== "Single" &&
//                                 <React.Fragment>
//                                   <option value={"partner"}>{RenderName("partner")}</option>
//                                 </React.Fragment>
//                               }
//                               <option value={"SMSF"}>SMSF</option>
//                               <option value={"Super Trustees"}>Super Trustees </option>
//                               <option value={"Company (Pty Ltd)"}>Company (Pty Ltd)</option>
//                               <option value={"Family Trust"}>Family Trust</option>
//                             </Field>
//                           </td>
//                           <td>
//                             <Field
//                               as="select"
//                               id={`paymentMethod`}
//                               name={`paymentMethod`}
//                               className="form-select inputDesignDoubleInput"
//                             >
//                               <option value={""}>Select</option>
//                               <option value={"Credit Card"}>Credit Card</option>
//                               <option value={"Direct Debit"}>Direct Debit</option>
//                               <option value={"Rollover"}>Rollover</option>
//                               <option value={"Manual"}>Manual</option>
//                             </Field>
//                           </td>
//                           <td>
//                             <Field
//                               type="text"
//                               placeholder="Commission Rate"
//                               id={`commissionRate`}
//                               name={`commissionRate`}
//                               className="form-control inputDesignDoubleInput"
//                               onChange={(e) => handleInputChange(e, setFieldValue, emptyArrow, values)}
//                               onFocus={(e) => handleInputFocus(e, setFieldValue)}
//                               onKeyDown={(e) => handleInputKeyDown(e)}
//                               onBlur={(e) => handleInputBlur(e, setFieldValue, toPercentage, emptyArrow, values)}
//                             />
//                           </td>
//                         </tr>
//                       </tbody>
//                     </Table>
//                   </div>
//                 </div>
//               </div>
//             </Row>
//           </Form>
//         );
//       }}
//     </Formik>
//   );
// };

// export default PremiumsDetails;




import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import {
  handleInputBlur,
  handleInputChange,
  handleInputFocus,
  handleInputKeyDown,
  RenderName,
  toCommaAndDollar,
  toPercentage,
} from "../../Assets/Api/Api";
import { useRecoilValue } from "recoil";
import { QuestionDetail } from "../../../Store/Store";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const AntdTable = DynamicTableForInputsSection("antd");

const PremiumsDetails = (props) => {
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));
  const questionDetail = useRecoilValue(QuestionDetail);

  const initialValues = {
    PremiumsDetails: [],
    NumberOfMap: 1,
  };

  const fillInitialValues = (setFieldValue) => {
    try {
      const stakeHolder = props.modalObject.stakeHolder;
      const parentValues = props.modalObject.parentValues || {};

      if (stakeHolder && parentValues?.[stakeHolder]) {
        const data = parentValues[stakeHolder];

        setFieldValue("PremiumsDetails[0].coverType", data.coverType || "");
        setFieldValue("PremiumsDetails[0].premiums", data.premiums || "");
        setFieldValue("PremiumsDetails[0].frequency", data.frequency || "");
        setFieldValue("PremiumsDetails[0].totalCost", data.totalCost || "");
        setFieldValue("PremiumsDetails[0].payeeOfPremiums", data.payeeOfPremiums || "");
        setFieldValue("PremiumsDetails[0].paymentMethod", data.paymentMethod || "");
        setFieldValue("PremiumsDetails[0].commissionRate", data.commissionRate || "");
      }
    } catch (err) {
      console.error("Error in fillInitialValues:", err);
    }
  };


  let onSubmit = async (values) => {

    console.log(values, props.modalObject)
    props.setFieldValue(`${props.modalObject.stakeHolder}${props.modalObject.key}Details`, values)
    props.setFieldValue(`${props.modalObject.stakeHolder}${props.modalObject.key}`, values.totalCost)

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

 const FormulaSetting = (values, setFieldValue, currentInput, stakeHolder) => {
  try {
  
    const row = values || {};

    // Step 1: extract which field triggered the change
    const fieldName = currentInput.name.split(".").pop();

    // Step 2: initialize base values
    let premiums =
      parseFloat((row.premiums || "").toString().replace(/[^0-9.-]+/g, "")) || 0;
    let frequency = parseFloat(row.frequency) || 1;

    // Step 3: handle input-specific logic
    if (fieldName === "premiums") {
      premiums =
        parseFloat(currentInput.value.replace(/[^0-9.-]+/g, "")) || 0;
    } else if (fieldName === "frequency") {
      frequency = parseFloat(currentInput.value) || 1;
    }

    // Step 4: calculate total cost
    const totalCost = premiums * frequency;

    // Step 5: update field value safely
    setFieldValue(`totalCost`, toCommaAndDollar(totalCost));
  } catch (error) {
    console.error("Error in FormulaSetting:", error);
  }
};


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
      width: 200,
    },
    {
      title: "Premiums",
      dataIndex: "premiums",
      key: "premiums",
      type: "number-toComma",
      width: 150,
      callBack: true,
      func: FormulaSetting,
    },


   {
  title: "Frequency",
  dataIndex: "frequency",
  key: "frequency",
  type: "select",
  width: 150,
  callBack: true,
  func: FormulaSetting,
  options: [
    { value: "12", label: "Monthly" },
    { value: "6", label: "6 Monthly" },
    { value: "1", label: "Yearly" },
  ],
},

    {
      title: "Total Cost p.a",
      dataIndex: "totalCost",
      key: "totalCost",
      type: "text",
      disabled: true,
      width: 150,
    },
    {
      title: "Payee of Premiums",
      dataIndex: "payeeOfPremiums",
      key: "payeeOfPremiums",
      type: "select",
      options: [
        { value: "client", label: RenderName("client") },
        ...(UserStatus !== "Single"
          ? [{ value: "partner", label: RenderName("partner") }]
          : []),
        { value: "SMSF", label: "SMSF" },
        { value: "Super Trustees", label: "Super Trustees" },
        { value: "Company (Pty Ltd)", label: "Company (Pty Ltd)" },
        { value: "Family Trust", label: "Family Trust" },
      ],
      width: 200,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      type: "select",
      options: [
        { value: "Credit Card", label: "Credit Card" },
        { value: "Direct Debit", label: "Direct Debit" },
        { value: "Rollover", label: "Rollover" },
        { value: "Manual", label: "Manual" },
      ],
      width: 200,
    },
    {
      title: "Commission Rate",
      dataIndex: "commissionRate",
      key: "commissionRate",
      type: "text",
      
      width: 150,
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
          return Array.from({ length: num }, (_, i) => ({
            key: i,
            ...values.PremiumsDetails[i],
          }));
        }, [values.NumberOfMap, values.PremiumsDetails]);

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
            <button type="submit" style={{ display: "none" }}>Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PremiumsDetails;
