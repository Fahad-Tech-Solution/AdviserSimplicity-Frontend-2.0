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
import { Row } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { defaultUrl } from '../../../../Store/Store';
import { handleInputBlur, handleInputChange, handleInputFocus, handleInputKeyDown, toPercentage } from '../../../Assets/Api/Api';
import DynamicTableForInputsSection from '../../../Assets/Table/DynamicTableForInputsSection';

const AntdTable = DynamicTableForInputsSection("antd");

const Beneficiaries = (props) => {
    const [title, setTitle] = useState(() => {
        let currentTitle = props.modalObject.ParentModal || "";
        if (currentTitle.includes('_')) {
            currentTitle = (currentTitle.split('_'))[1];
        }
        return currentTitle;
    });

    const [autoClearValue, setAutoClearValue] = useState(false);
    const DefaultUrl = useRecoilValue(defaultUrl);

    const initialValues = {
        BeneficiariesDetails: [],
        NumberOfMap: 1,
    };

    const fillInitialValues = (setFieldValue) => {
        try {
            const stakeHolder = props.modalObject?.stakeHolder;
            const parentValues = props.modalObject?.parentValues || {};
            const editArray = props.modalObject?.editArray;

            if (editArray && editArray.length > 0) {
                // If we have editArray from props, use that
                setFieldValue("NumberOfMap", editArray.length);
                
                editArray.forEach((data, index) => {
                    setFieldValue(`BeneficiariesDetails[${index}].nominationType`, data.nominationType || '');
                    setFieldValue(`BeneficiariesDetails[${index}].DOB`, data.DOB || '');
                    setFieldValue(`BeneficiariesDetails[${index}].beneficiaryName`, data.beneficiaryName || '');
                    setFieldValue(`BeneficiariesDetails[${index}].relationshipStatus`, data.relationshipStatus || '');
                    setFieldValue(`BeneficiariesDetails[${index}].shareBenefit`, data.shareBenefit || '');
                });
            } else if (stakeHolder) {
                // Try to load from parent values structure
                const baseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");
                const idxMatch = stakeHolder.match(/\[(\d+)\]/);
                const index = idxMatch ? parseInt(idxMatch[1], 10) : 0;

                const data = parentValues?.[baseKey]?.[index];
                const beneficiariesArray = data?.beneficiariesArray || [];

                if (beneficiariesArray.length > 0) {
                    setFieldValue("NumberOfMap", beneficiariesArray.length);
                    
                    beneficiariesArray.forEach((beneficiary, idx) => {
                        setFieldValue(`BeneficiariesDetails[${idx}].nominationType`, beneficiary.nominationType || '');
                        setFieldValue(`BeneficiariesDetails[${idx}].DOB`, beneficiary.DOB || '');
                        setFieldValue(`BeneficiariesDetails[${idx}].beneficiaryName`, beneficiary.beneficiaryName || '');
                        setFieldValue(`BeneficiariesDetails[${idx}].relationshipStatus`, beneficiary.relationshipStatus || '');
                        setFieldValue(`BeneficiariesDetails[${idx}].shareBenefit`, beneficiary.shareBenefit || '');
                    });
                } else {
                    // Initialize with one empty row
                    setFieldValue("NumberOfMap", 1);
                }
            }
        } catch (err) {
            console.error("Error in fillInitialValues:", err);
            setFieldValue("NumberOfMap", 1);
        }
    };

    const handleNominationTypeChange = (value, index, setFieldValue, values) => {
        // Update current row
        setFieldValue(`BeneficiariesDetails[${index}].nominationType`, value);

        if (value === "Legal Personal Representative (Your Estate)") {
            // Update all rows
            const numRows = values.NumberOfMap || 1;
            for (let i = 0; i < numRows; i++) {
                setFieldValue(`BeneficiariesDetails[${i}].nominationType`, value);
                setFieldValue(`BeneficiariesDetails[${i}].beneficiaryName`, "N/A");
                setFieldValue(`BeneficiariesDetails[${i}].relationshipStatus`, "N/A");
                setFieldValue(`BeneficiariesDetails[${i}].shareBenefit`, "");
            }
            setAutoClearValue(true);
        } else if (value === "Reversionary Beneficiary") {
            setFieldValue(`BeneficiariesDetails[${index}].beneficiaryName`, "N/A");
            setFieldValue(`BeneficiariesDetails[${index}].relationshipStatus`, "N/A");
            setFieldValue(`BeneficiariesDetails[${index}].shareBenefit`, "100.00%");

            if (values.NumberOfMap !== 1) {
                for (let i = 0; i < values.NumberOfMap; i++) {
                    if (values.BeneficiariesDetails?.[i]?.nominationType === "Legal Personal Representative (Your Estate)") {
                        setFieldValue(`BeneficiariesDetails[${i}].shareBenefit`, "100.00%");
                    }
                }
            }
        } else {
            if (autoClearValue) {
                setFieldValue(`BeneficiariesDetails[${index}].beneficiaryName`, "");
                setFieldValue(`BeneficiariesDetails[${index}].relationshipStatus`, "");
                setFieldValue(`BeneficiariesDetails[${index}].shareBenefit`, "");
                setAutoClearValue(false);
            }

            if (values.NumberOfMap !== 1) {
                for (let i = 0; i < values.NumberOfMap; i++) {
                    if (values.BeneficiariesDetails?.[i]?.nominationType === "Legal Personal Representative (Your Estate)") {
                        setFieldValue(`BeneficiariesDetails[${i}].nominationType`, "Legal Personal Representative (Your Estate)");
                        setFieldValue(`BeneficiariesDetails[${i}].beneficiaryName`, "N/A");
                        setFieldValue(`BeneficiariesDetails[${i}].relationshipStatus`, "N/A");
                        setFieldValue(`BeneficiariesDetails[${i}].shareBenefit`, "100.00%");
                        setAutoClearValue(true);
                    }
                }
            }
        }
    };

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

    const onSubmit = async (values) => {
        try {
            const beneficiariesArray = values.BeneficiariesDetails || [];
            
            // Update parent form
            props.setFieldValue(`${props.modalObject.stakeHolder}.beneficiariesArray`, beneficiariesArray);
            props.setFieldValue(`${props.modalObject.stakeHolder}.beneficiary`, beneficiariesArray.length > 0 ? "Yes" : "No");

            // Close modal
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error in onSubmit:", error);
        }
    };

    const extraValue = ["Account Based Pension Detail", "Annuities Detail", "Pension Benefits Details"];

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
                ...(extraValue.includes(title) ? [{ value: "Reversionary Beneficiary", label: "Reversionary Beneficiary" }] : []),
                { value: "Binding (Non-Lapsing)", label: "Binding (Non-Lapsing)" },
                { value: "Binding (Lapsing)", label: "Binding (Lapsing)" },
                { value: "Non-Binding", label: "Non-Binding" },
                { value: "Legal Personal Representative (Your Estate)", label: "Legal Personal Representative (Your Estate)" }
            ],
            callBack: true,
            func: (values, setFieldValue, currentInput, stakeHolder, index) => {
                handleNominationTypeChange(currentInput.value, index, setFieldValue, values);
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

        },
        {
            title: "Share of Benefit",
            dataIndex: "shareBenefit",
            key: "shareBenefit",
            type: "text",
            width: 150,
            disabled: (record) => record.nominationType === "Reversionary Beneficiary",
            callBack: true,
            func: (values, setFieldValue, currentInput, stakeHolder, index) => {
                // Handle percentage formatting
                handleInputChange(currentInput, setFieldValue, () => {}, values);
            },
            onBlur: (values, setFieldValue, currentInput, stakeHolder, index) => {
                // Format as percentage on blur
                handleInputBlur(currentInput, setFieldValue, toPercentage, () => {}, values);
            }
        }
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
                        ...values.BeneficiariesDetails[i],
                    }));
                }, [values.NumberOfMap, values.BeneficiariesDetails]);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='d-flex flex-row justify-content-center align-items-center gap-2 mb-4'>
                                        <p className='text-end mb-0'>
                                            {props.modalObject.question || "How many beneficiaries?"}
                                        </p>
                                        <div style={{ width: "8%" }}>
                                            <Field
                                                type="number"
                                                id="NumberOfMap"
                                                name="NumberOfMap"
                                                className="form-control inputDesignDoubleInput"
                                                min="1"
                                                max="10"
                                            />
                                        </div>
                                    </div>

                                    {values.NumberOfMap && (
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
                                    )}

                                    {/* Validation for share benefit */}
                                    {dataRows.some(row => 
                                        parseFloat((row.shareBenefit || "0").replace(/[^0-9.-]+/g, "")) < 100 &&
                                        row.nominationType !== "Legal Personal Representative (Your Estate)" &&
                                        row.nominationType !== "Reversionary Beneficiary"
                                    )}
                                </div>
                            </div>
                        </Row>
                        <button type="submit" style={{ display: "none" }}>Submit</button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default Beneficiaries;