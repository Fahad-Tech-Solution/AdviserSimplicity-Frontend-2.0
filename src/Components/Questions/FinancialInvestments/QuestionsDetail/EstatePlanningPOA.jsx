import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../../Store/Store';
import { PatchAxios, PostAxios } from '../../../Assets/Api/Api';
import CreatableSelect from 'react-select/creatable';

const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  });
  
  const defaultOptions = [
    { value: 'spouse-de-facto', label: 'Spouse/De-facto' },
    { value: 'child', label: 'Child' },
    { value: 'stepchild', label: 'Stepchild' },
    { value: 'other', label: 'Other' },
  ];
  const CreatableSelectField = ({ field, form }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState(defaultOptions);
    const [value, setValue] = useState(null);
  
    const handleCreate = (inputValue) => {
      setIsLoading(true);
      setTimeout(() => {
        const newOption = createOption(inputValue);
        setIsLoading(false);
        setOptions((prev) => [...prev, newOption]);
        setValue(newOption);
        form.setFieldValue(field.name, newOption.value);
      }, 1000);
    };
    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          border: state.isFocused ? '2px solid #36b446' : '1px solid #36b446',
          boxShadow: state.isFocused ? '0 0 0 0px #4CAF50' : 'none',
          '&:hover': {
            border: state.isFocused ? '2px solid #36b446' : '1px solid #36b446'
          },
          minHeight: '38px', // Set the minimum height
          height: '38px' // Allow height to adjust based on content
        }),
        valueContainer: (provided) => ({
          ...provided,
          height: field.value && field.value.length > 0 ? 'auto' : '40px', // Adjust height based on selection
          padding: '0 8px' // Adjust padding as needed
        }),
        input: (provided) => ({
          ...provided,
          margin: '0', // Ensure input has no margin
          padding: '0' // Ensure input has no padding
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
          height: '38px' // Ensure indicators container matches the control height
        }),
        menu: (provided) => ({
          ...provided,
          zIndex: 9999, // Ensure the menu is on top of other elements
        }),
        menuPortal: (provided) => ({
          ...provided,
          zIndex: 9999 // Ensure the menu portal is on top of other elements
        })
      };
    return (
      <CreatableSelect
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={(newValue) => {
          setValue(newValue);
          form.setFieldValue(field.name, newValue ? newValue.value : null);
          console.log(newValue ? newValue.value : null);
        }}
        onCreateOption={handleCreate}
        options={options}
        value={options ? options.find((option) => option.value === field.value) : null}
        styles={customStyles}
        menuPortalTarget={document.body}
      />
    );
  };
const EstatePlanningPOA = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState(defaultOptions);
    const [value, setValue] = useState(null);

    const handleCreate = (inputValue) => {
        setIsLoading(true);
        setTimeout(() => {
          const newOption = createOption(inputValue);
          setIsLoading(false);
          setOptions((prev) => [...prev, newOption]);
          setValue(newOption);
          form.setFieldValue(field.name, newOption.value);
        }, 1000);
      };


      
    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

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

    let POA = questionDetail.POA || {
        client: [],
        partner: [],
        joint: [],

    }; // Use an empty object as default if POA is undefined


    let initialValues = POA[props.modalObject.Input].length ? { NumberOfMap: POA[props.modalObject.Input].length } : { NumberOfMap: "" };

    const [dynamicFields, setDynamicFields] = useState([]);


    useEffect(() => {
        if (POA[props.modalObject.Input] && POA[props.modalObject.Input].length) {
            let arr = []

            for (let i = 0; i < POA[props.modalObject.Input].length; i++) {
                arr.push("");
            }

            setDynamicFields(arr);

        }
    }, [])

    const fillInitialValues = (setFieldValue) => {

        if (POA[props.modalObject.Input] && POA[props.modalObject.Input].length) {

            POA[props.modalObject.Input].forEach((data, i) => {
                if (data) {
                    setFieldValue(`POAType${i}`, data.POAType || '');
                    setFieldValue(`yearSetUp${i}`, data.yearSetUp || '');
                    setFieldValue(`POAName${i}`, data.POAName || '');
                    setFieldValue(`relationshipStatus${i}`, data.relationshipStatus || '');
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
                POAType: values[`POAType${i}`] || "",
                yearSetUp: values[`yearSetUp${i}`] || "",
                POAName: values[`POAName${i}`] || "",
                relationshipStatus: values[`relationshipStatus${i}`] || "",
            };
            newEntries.push(newEntry);
        }

        // Log the new entries to verify
        console.log(newEntries);

        let DataOf = props.modalObject.Input;

        // Create an object with additional fields
        let obj = {
            clientFK: localStorage.getItem("UserID"),
        };

        obj[DataOf] = newEntries

        // Calculate total currentBalance
        // obj[DataOf + "Total"] = newEntries.reduce((total, entry) => total + entry.relationshipStatus, 0);
        obj[DataOf + "Total"] = newEntries.length;

        console.log(obj, "final obj")

        // Check if POA and the array at props.modalObject.Input exist
        // const bankAccountArray = POA[props.modalObject.Input] || [];
        const bankAccountArray = POA.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                res = await PostAxios(`${DefaultUrl}/api/POA/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/POA/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, POA: res };
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
                                    <div className='col-md-5'>
                                        <p className='text-end mt-1'>
                                            How many {props.modalObject.title} does {nameSet} have :
                                        </p>
                                    </div>
                                    <div className='col-md-2'>
                                        <Field
                                            type="number"
                                            id="NumberOfMap"
                                            name="NumberOfMap"
                                            className="form-control inputDesign"
                                            onChange={(e) => handleInput(e, setFieldValue)}
                                        />
                                    </div>
                                    {values.NumberOfMap && (
                                        <div className='mt-4'>
                                            <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th onClick={() => { console.log(values) }}>No#</th>
                                                        <th>POA Type</th>
                                                        <th>Year Set up</th>
                                                        <th>Name of POA</th>
                                                        <th>Relationship Status</th>
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
                                                                    id={`POAType${i}`}
                                                                    name={`POAType${i}`}
                                                                    className="form-select inputDesign"
                                                                >
                                                                    <option value={""}>Please Select</option>
                                                                    <option value={"Enduring"}>Enduring</option>
                                                                    <option value={"Medical"}>Medical</option>
                                                                    <option value={"Financial"}>Financial</option>
                                                                    <option value={"Limited"}>Limited</option>
                                                                    <option value={"Other "}>Other </option>
                                                                </Field>
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="number"
                                                                    placeholder="Year Set up"
                                                                    id={`yearSetUp${i}`}
                                                                    name={`yearSetUp${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Field
                                                                    type="text"
                                                                    placeholder="Name of POA"
                                                                    id={`POAName${i}`}
                                                                    name={`POAName${i}`}
                                                                    className="form-control inputDesign"
                                                                />
                                                            </td>
                                                            <td>
                                                            <Field name={`relationshipStatus${i}`} component={CreatableSelectField} />
                                                                
                                                                {/* <Field
                                                                    as="select"
                                                                    placeholder="Relationship Status"
                                                                    id={`relationshipStatus${i}`}
                                                                    name={`relationshipStatus${i}`}
                                                                    className="form-select inputDesign"
                                                                >
                                                                    <option value={""}>Please Select</option>
                                                                    <option value={"Spouse/De-facto"}>Spouse/De-facto</option>
                                                                    <option value={"Child"}>Child</option>
                                                                    <option value={"Stepchild"}>Stepchild</option>
                                                                    <option value={"Other "}>Other </option>
                                                                </Field> */}
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

export default EstatePlanningPOA;
