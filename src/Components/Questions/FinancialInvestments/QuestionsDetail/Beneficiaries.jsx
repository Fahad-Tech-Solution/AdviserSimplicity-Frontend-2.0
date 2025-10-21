// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import React, { useEffect, useState } from 'react';
// import { Row, Table } from 'react-bootstrap';
// import { useRecoilValue } from 'recoil';
// import { defaultUrl, } from '../../../../Store/Store';
// import DatePicker from 'react-datepicker';
// import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, toPercentage } from '../../../Assets/Api/Api';

// const Beneficiaries = (props) => {


//     let initialValues = props?.modalObject?.editArray?.length ? { NumberOfMap: props.modalObject.editArray.length } : { NumberOfMap: "" };
//     // let initialValues = { NumberOfMap: "" };

//     const [dynamicFields, setDynamicFields] = useState([]);

//     const [title, setTitle] = useState(() => {
//         // let head = props.modalObject.title;
//         let currentTitle = props.modalObject.ParentModal || "";
//         // Check if the title contains an underscore
//         if (currentTitle.includes('_')) {
//             currentTitle = (currentTitle.split('_'))[1];
//         }
//         // alert(currentTitle)

//         return currentTitle
//     });

//     const fillInitialValues = (setFieldValue, loopValue) => {



//         let arr = []

//         for (let i = 0; i < loopValue; i++) {
//             arr.push("");
//         }

//         setDynamicFields(arr);


//         if (props.modalObject.editArray) {
//             props.modalObject.editArray.forEach((data, i) => {
//                 if (data) {
//                     console.log(data.investmentOption)
//                     setFieldValue(`nominationType${i}`, data.nominationType || '');
//                     setFieldValue(`DOB${i}`, data.DOB || '');
//                     setFieldValue(`beneficiaryName${i}`, data.beneficiaryName || '');
//                     setFieldValue(`relationshipStatus${i}`, data.relationshipStatus || '');
//                     setFieldValue(`shareBenefit${i}`, data.shareBenefit || '');
//                 }

//             });
//         }

//     };

//     let handleInput = (e, setFieldValue) => {
//         const value = e.target.value > 10 ? 10 : e.target.value;
//         setFieldValue(e.target.id, value);

//         let arr = []

//         for (let i = 0; i < value; i++) {
//             arr.push("");
//         }

//         setDynamicFields(arr);

//     };

//     let DefaultUrl = useRecoilValue(defaultUrl)

//     let onSubmit = async (values) => {



//         const newEntries = [];

//         let loopLength = parseFloat(values.NumberOfMap)

//         // Iterate through each map entry and create a new object
//         for (let i = 0; i < loopLength; i++) {
//             // alert("loop chala")
//             const newEntry = {
//                 nominationType: values[`nominationType${i}`] || "",
//                 DOB: values[`DOB${i}`] || "",
//                 beneficiaryName: values[`beneficiaryName${i}`] || "",
//                 relationshipStatus: values[`relationshipStatus${i}`] || "",
//                 shareBenefit: values[`shareBenefit${i}`] || "",
//             };
//             newEntries.push(newEntry);
//         }


//         props.setFieldValue(`${props.modalObject.key}${props.modalObject.index}`, newEntries)

//         // Reset the flag state if necessary
//         if (props.flagState) {
//             props.setFlagState(false);
//         }
//     };


//     let extraValue = ["Account Based Pension Detail", "Annuities Detail", "Pension Benefits Details"]

//     let [autoClearValue, setAutoClearValue] = useState(false);


//     let FormulaSetting = () => {

//     }

//     return (
//         <Formik
//             initialValues={initialValues}
//             onSubmit={onSubmit}
//             enableReinitialize
//             innerRef={props.formRef}
//         >
//             {({ values, handleChange, setFieldValue, handleBlur }) => {
//                 useEffect(() => {
//                     fillInitialValues(setFieldValue, values.NumberOfMap);
//                 }, [values.NumberOfMap]);

//                 return (
//                     <Form>
//                         <Row>
//                             <div className="col-md-12">
//                                 <div className='row justify-content-center'>
//                                     <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
//                                         <p className='text-end mt-3'>
//                                             {props.modalObject.question}
//                                         </p>

//                                         <div style={{ width: "8%" }}>
//                                             <Field
//                                                 type="number"
//                                                 id="NumberOfMap"
//                                                 name="NumberOfMap"
//                                                 className="form-control inputDesignDoubleInput"
//                                                 onChange={(e) => handleInput(e, setFieldValue)}
//                                             />
//                                         </div>
//                                     </div>

//                                     {values.NumberOfMap && (
//                                         <div className='mt-4'>
//                                             <Table striped bordered responsive hover>
//                                                 <thead>
//                                                     <tr>
//                                                         <th>No#</th>
//                                                         <th>Nomination Type</th>
//                                                         <th>DOB</th>
//                                                         <th>Beneficiary Name</th>
//                                                         <th>Relationship Status</th>
//                                                         <th>Share of Benefit</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {dynamicFields.map((elem, i) => {
//                                                         return (
//                                                             <tr key={i}>
//                                                                 <td>{1 + i}</td>

//                                                                 <td>
//                                                                     <Field
//                                                                         as="select"
//                                                                         id={`nominationType${i}`}
//                                                                         name={`nominationType${i}`}
//                                                                         className="form-select inputDesignDoubleInput"
//                                                                         onChange={(e) => {
//                                                                             setFieldValue(`nominationType${i}`, e.target.value);
//                                                                             if (e.target.value === "Legal Personal Representative (Your Estate)") {
//                                                                                 // Loop through all entries once and set values for all applicable fields

//                                                                                 for (let innerIndex = 0; innerIndex < values.NumberOfMap; innerIndex++) {
//                                                                                     setFieldValue(`nominationType${innerIndex}`, e.target.value);
//                                                                                     setFieldValue(`beneficiaryName${innerIndex}`, "N/A");
//                                                                                     setFieldValue(`relationshipStatus${innerIndex}`, "N/A");
//                                                                                     setFieldValue(`shareBenefit${innerIndex}`, "");
//                                                                                     setAutoClearValue(true);
//                                                                                 }
//                                                                             }
//                                                                             else if (e.target.value === "Reversionary Beneficiary") {
//                                                                                 setFieldValue(`beneficiaryName${i}`, "N/A");
//                                                                                 setFieldValue(`relationshipStatus${i}`, "N/A");
//                                                                                 setFieldValue(`shareBenefit${i}`, "100.00%");

//                                                                                 if (values.NumberOfMap !== "1") {
//                                                                                     for (let innerIndex = 0; innerIndex < values.NumberOfMap; innerIndex++) {
//                                                                                         if (values[`nominationType${innerIndex}`] === "Legal Personal Representative (Your Estate)") {
//                                                                                             setFieldValue(`nominationType${innerIndex}`, "Legal Personal Representative (Your Estate)");
//                                                                                             setFieldValue(`beneficiaryName${innerIndex}`, "N/A");
//                                                                                             setFieldValue(`relationshipStatus${innerIndex}`, "N/A");
//                                                                                             setFieldValue(`shareBenefit${innerIndex}`, "100.00%");
//                                                                                             setAutoClearValue(true);
//                                                                                         }
//                                                                                     }
//                                                                                 }
//                                                                             }
//                                                                             else {
//                                                                                 console.log(e.target.value)
//                                                                                 if (autoClearValue) {
//                                                                                     setFieldValue(`beneficiaryName${i}`, "");
//                                                                                     setFieldValue(`relationshipStatus${i}`, "");
//                                                                                     setFieldValue(`shareBenefit${i}`, "");
//                                                                                     setAutoClearValue(false);
//                                                                                 }
//                                                                                 if (values.NumberOfMap !== "1") {

//                                                                                     for (let innerIndex = 0; innerIndex < values.NumberOfMap; innerIndex++) {
//                                                                                         if (values[`nominationType${innerIndex}`] === "Legal Personal Representative (Your Estate)") {
//                                                                                             setFieldValue(`nominationType${innerIndex}`, "Legal Personal Representative (Your Estate)");
//                                                                                             setFieldValue(`beneficiaryName${innerIndex}`, "N/A");
//                                                                                             setFieldValue(`relationshipStatus${innerIndex}`, "N/A");
//                                                                                             setFieldValue(`shareBenefit${innerIndex}`, "100.00%");
//                                                                                             setAutoClearValue(true);
//                                                                                         }
//                                                                                     }
//                                                                                 }
//                                                                             }
//                                                                         }}
//                                                                     >
//                                                                         <option value={""}>Select</option>

//                                                                         {extraValue.includes(title) &&
//                                                                             <option value={"Reversionary Beneficiary"}>Reversionary Beneficiary</option>
//                                                                         }

//                                                                         <option value={"Binding (Non-Lapsing)"}>Binding (Non-Lapsing)</option>
//                                                                         <option value={"Binding (Lapsing)"}>Binding (Lapsing)</option>
//                                                                         <option value={"Non-Binding"}>Non-Binding </option>
//                                                                         <option value={"Legal Personal Representative (Your Estate)"}>Legal Personal Representative (Your Estate)</option>
//                                                                     </Field>
//                                                                 </td>
//                                                                 <td style={{ minWidth: "150px" }}>
//                                                                     <div>
//                                                                         <DatePicker
//                                                                             className="form-control inputDesignDoubleInput shadow DateInputPadding"
//                                                                             showIcon
//                                                                             id={`DOB${i}`}
//                                                                             name={`DOB${i}`}
//                                                                             selected={values[`DOB${i}`]}
//                                                                             onChange={(date) => setFieldValue(`DOB${i}`, date)}
//                                                                             dateFormat="dd/MM/yyyy"
//                                                                             placeholderText="dd/mm/yyyy"
//                                                                             maxDate={new Date()}
//                                                                             showMonthDropdown
//                                                                             showYearDropdown
//                                                                             dropdownMode="select"
//                                                                             onBlur={handleBlur}
//                                                                             disabled={values[`nominationType${i}`] == "Legal Personal Representative (Your Estate)" || values[`nominationType${i}`] == "Reversionary Beneficiary"}
//                                                                             wrapperClassName="w-100"
//                                                                         />
//                                                                     </div>
//                                                                 </td>
//                                                                 <td>
//                                                                     <Field
//                                                                         type="text"
//                                                                         placeholder="Beneficiary Name"
//                                                                         id={`beneficiaryName${i}`}
//                                                                         name={`beneficiaryName${i}`}
//                                                                         className="form-control inputDesignDoubleInput"
//                                                                         disabled={values[`nominationType${i}`] == "Legal Personal Representative (Your Estate)" || values[`nominationType${i}`] == "Reversionary Beneficiary"}
//                                                                     />
//                                                                 </td>
//                                                                 <td>
//                                                                     <Field
//                                                                         as="select"
//                                                                         id={`relationshipStatus${i}`}
//                                                                         name={`relationshipStatus${i}`}
//                                                                         className="form-select inputDesignDoubleInput"
//                                                                     >
//                                                                         <option value={""}>Select</option>
//                                                                         {
//                                                                             (values[`nominationType${i}`] === "Legal Personal Representative (Your Estate)" ||
//                                                                                 values[`nominationType${i}`] === "Reversionary Beneficiary") ? (
//                                                                                 <option value={"N/A"}>N/A</option>
//                                                                             ) : (
//                                                                                 <React.Fragment>
//                                                                                     <option value={"Spouse/De-facto"}>Spouse/De-facto</option>
//                                                                                     <option value={"Child"}>Child</option>
//                                                                                     <option value={"Financial Dependant"}>Financial Dependant</option>
//                                                                                     <option value={"Interdependant"}>Interdependant</option>
//                                                                                 </React.Fragment>
//                                                                             )
//                                                                         }

//                                                                     </Field>
//                                                                 </td>
//                                                                 <td>
//                                                                     <Field
//                                                                         type="text"
//                                                                         placeholder="Share of Benefit"
//                                                                         id={`shareBenefit${i}`}
//                                                                         name={`shareBenefit${i}`}
//                                                                         className="form-control inputDesignDoubleInput"
//                                                                         disabled={(values[`nominationType${i}`] == "Reversionary Beneficiary")}
//                                                                         onChange={(e) => handleInputChange(e, setFieldValue, FormulaSetting, values)}
//                                                                         onFocus={(e) => handleInputFocus(e, setFieldValue)}
//                                                                         onKeyDown={(e) => handleInputKeyDown(e)}
//                                                                         onBlur={(e) => handleInputBlur(e, setFieldValue, toPercentage, FormulaSetting, values)}
//                                                                     />
//                                                                     {parseFloat((values[`shareBenefit${i}`] || "100$").replace(/[^0-9.-]+/g, "")) < 100 &&

//                                                                         <p style={{ textAlign: "left", fontSize: "13px" }} className="text-danger mt-2 fw-bold">Share of Benefit must be 100%</p>
//                                                                     }
//                                                                 </td>

//                                                             </tr>)
//                                                     })}
//                                                 </tbody>
//                                             </Table>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </Row>
//                     </Form>
//                 );
//             }}
//         </Formik >
//     );
// };

// export default Beneficiaries;

import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { defaultUrl } from '../../../../Store/Store';
import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, toPercentage } from '../../../Assets/Api/Api';
import DynamicTableForInputsSection from '../../../Assets/Table/DynamicTableForInputsSection';

const AntdTable = DynamicTableForInputsSection("antd");

const Beneficiaries = (props) => {
    const [UserStatus] = useState(localStorage.getItem("UserStatus"));
    const [autoClearValue, setAutoClearValue] = useState(false);
    const DefaultUrl = useRecoilValue(defaultUrl);

    const [title] = useState(() => {
        let currentTitle = props.modalObject.ParentModal || "";
        if (currentTitle.includes('_')) {
            currentTitle = (currentTitle.split('_'))[1];
        }
        return currentTitle;
    });

    // ✅ Same structure as PremiumsDetails - flat object
    const initialValues = {};

    // ✅ Same fillInitialValues pattern as PremiumsDetails
    const fillInitialValues = (setFieldValue) => {
        try {
            const { stakeHolder, parentValues, key } = props.modalObject;

            let index = stakeHolder.replace(/[^0-9]+/g, "");
            let BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

            // Access data using same structure as PremiumsDetails
            let data = parentValues?.[BaseKey]?.[index]?.[key + "Details"] || {};

            console.log("Beneficiaries initial data:", data);

            if (!data || typeof data !== "object") return;

            // Fill form fields
            setFieldValue("nominationType", data.nominationType || "");
            setFieldValue("DOB", data.DOB || "");
            setFieldValue("beneficiaryName", data.beneficiaryName || "");
            setFieldValue("relationshipStatus", data.relationshipStatus || "");
            setFieldValue("shareBenefit", data.shareBenefit || "");

        } catch (err) {
            console.error("Error in fillInitialValues:", err);
        }
    };

    // ✅ Same onSubmit pattern as PremiumsDetails
    const onSubmit = async (values) => {
        console.log("Submitting beneficiaries:", values, props.modalObject);

        // Set the details object like PremiumsDetails
        props.setFieldValue(
            `${props.modalObject.stakeHolder}${props.modalObject.key}Details`,
            values
        );

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    };

    // ✅ FormulaSetting function like PremiumsDetails
    const FormulaSetting = (values, setFieldValue, currentInput, stakeHolder) => {
        try {
            const row = values || {};
            const fieldName = currentInput.name.split(".").pop();

            // Add any specific calculations here if needed
            // For beneficiaries, we mainly handle the nomination type logic

        } catch (error) {
            console.error("Error in FormulaSetting:", error);
        }
    };

    // ✅ Handle nomination type changes with proper callback
    const handleNominationTypeChange = (value, setFieldValue, values) => {
        setFieldValue("nominationType", value);

        if (value === "Legal Personal Representative (Your Estate)") {
            setFieldValue("beneficiaryName", "N/A");
            setFieldValue("relationshipStatus", "N/A");
            setFieldValue("shareBenefit", "");
            setAutoClearValue(true);
        } else if (value === "Reversionary Beneficiary") {
            setFieldValue("beneficiaryName", "N/A");
            setFieldValue("relationshipStatus", "N/A");
            setFieldValue("shareBenefit", "100.00%");
        } else {
            if (autoClearValue) {
                setFieldValue("beneficiaryName", "");
                setFieldValue("relationshipStatus", "");
                setFieldValue("shareBenefit", "");
                setAutoClearValue(false);
            }
        }
    };

    const extraValue = ["Account Based Pension Detail", "Annuities Detail", "Pension Benefits Details"];

    // ✅ Get relationship options based on nomination type
    const getRelationshipOptions = (nominationType) => {
        if (nominationType === "Legal Personal Representative (Your Estate)" || 
            nominationType === "Reversionary Beneficiary") {
            return [{ value: "N/A", label: "N/A" }];
        }
        return [
            { value: "Spouse/De-facto", label: "Spouse/De-facto" },
            { value: "Child", label: "Child" },
            { value: "Financial Dependant", label: "Financial Dependant" },
            { value: "Interdependant", label: "Interdependant" }
        ];
    };

    // ✅ Column configuration - single row like PremiumsDetails
    const columns = [
        {
            title: "No#",
            dataIndex: "index",
            key: "owner",
            render: (_, __, i) => i + 1,
            width: 60,
        },
        {
            title: "Nomination Type",
            dataIndex: "nominationType",
            key: "nominationType",
            type: "select",
            width: 250,
            options: [
                ...(extraValue.includes(title) ?
                    [{ value: "Reversionary Beneficiary", label: "Reversionary Beneficiary" }] : []),
                { value: "Binding (Non-Lapsing)", label: "Binding (Non-Lapsing)" },
                { value: "Binding (Lapsing)", label: "Binding (Lapsing)" },
                { value: "Non-Binding", label: "Non-Binding" },
                { value: "Legal Personal Representative (Your Estate)", label: "Legal Personal Representative (Your Estate)" }
            ],
            callBack: true,
            func: (values, setFieldValue, currentInput) => {
                handleNominationTypeChange(currentInput.value, setFieldValue, values);
            }
        },
        {
            title: "DOB",
            dataIndex: "DOB",
            key: "DOB",
            type: "antdate",
            width: 150,
            disabled: (record) =>
                record.nominationType === "Legal Personal Representative (Your Estate)" ||
                record.nominationType === "Reversionary Beneficiary"
        },
        {
            title: "Beneficiary Name",
            dataIndex: "beneficiaryName",
            key: "beneficiaryName",
            type: "text",
            width: 200,
            disabled: (record) =>
                record.nominationType === "Legal Personal Representative (Your Estate)" ||
                record.nominationType === "Reversionary Beneficiary"
        },
        {
            title: "Relationship Status",
            dataIndex: "relationshipStatus",
            key: "relationshipStatus",
            type: "select",
            width: 200,
            // ✅ FIXED: Use a static array with all possible options
            options: [
                { value: "Spouse/De-facto", label: "Spouse/De-facto" },
                { value: "Child", label: "Child" },
                { value: "Financial Dependant", label: "Financial Dependant" },
                { value: "Interdependant", label: "Interdependant" },
                { value: "N/A", label: "N/A" }
            ],
            disabled: (record) =>
                record.nominationType === "Legal Personal Representative (Your Estate)" ||
                record.nominationType === "Reversionary Beneficiary"
        },
        {
            title: "Share of Benefit",
            dataIndex: "shareBenefit",
            key: "shareBenefit",
            type: "text",
            width: 150,
            disabled: (record) => record.nominationType === "Reversionary Beneficiary",
            callBack: true,
            func: (values, setFieldValue, currentInput) => {
                handleInputChange(currentInput, setFieldValue, FormulaSetting, values);
            },
            onBlur: (values, setFieldValue, currentInput) => {
                handleInputBlur(currentInput, setFieldValue, toPercentage, FormulaSetting, values);
            }
        }
    ];

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            
            innerRef={props.formRef}
        >
            {({ values, setFieldValue, handleChange, handleBlur }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                // ✅ Create single data row like PremiumsDetails
                const dataRows = useMemo(() => {
                    return [
                        {
                            key: 0,
                            ...values
                        }
                    ];
                }, [values]);

                return (
                    <Form>
                        <p className="text-end mt-1 pt-2" onClick={() => console.log(values)}>
                            How many
                        </p>
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

                        {/* Validation message */}
                        {values.shareBenefit && 
                         parseFloat((values.shareBenefit || "0").replace(/[^0-9.-]+/g, "")) < 100 &&
                         values.nominationType !== "Legal Personal Representative (Your Estate)" &&
                         values.nominationType !== "Reversionary Beneficiary" && (
                            <p style={{ textAlign: "left", fontSize: "13px" }} className="text-danger mt-2 fw-bold">
                                Share of Benefit must be 100%
                            </p>
                        )}

                        <button type="submit" style={{ display: "none" }}>
                            Submit
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default Beneficiaries;