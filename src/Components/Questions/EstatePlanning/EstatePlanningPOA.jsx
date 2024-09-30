import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { PatchAxios, PostAxios, RenderName } from '../../Assets/Api/Api';
import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-datepicker';
import { Tooltip } from 'antd';
import { FaCircleQuestion } from 'react-icons/fa6';
import DynamicTableRow from '../../Assets/Dynamic/DynamicTableRow';

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

    let [UserStatus] = useState(localStorage.getItem('UserStatus'));

    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let POA = Object.keys(questionDetail.POA || {}).length > 0 ? questionDetail.POA : {
        client: [],
        partner: [],
        joint: [],

    };  // Use an empty object as default if POA is undefined


    let initialValues = { owner: "" };

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
                res = await PostAxios(`${DefaultUrl}/api/${props.modalObject.Index}/Add`, obj);
            } else {
                obj.collection = props.modalObject.Input
                res = await PatchAxios(`${DefaultUrl}/api/${props.modalObject.Index}/Update`, obj);
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




    let TBodyRender = (values, setFieldValue, handleChange, handleBlur) => {
        const optionsArray = [
            { value: "Enduring", label: "Enduring" },
            { value: "Financial & Personal", label: "Financial & Personal" },
            { value: "Medical Decision Maker", label: "Medical Decision Maker" },
            { value: "Limited", label: "Limited" },
            { value: "Other", label: "Other" }
        ]

        const relationshipStatusOptionsArray = [
            { value: 'spouse-de-facto', label: 'Spouse/De-facto' },
            { value: 'child', label: 'Child' },
            { value: 'stepchild', label: 'Stepchild' },
            { value: 'other', label: 'Other' },
        ];

        let storeInPartner = (values, setFieldValue, currentInput, stakeHolder) => {

            if (values.owner === "together") {

                let POAType = values.client.POAType;
                let yearSetUp = values.client.yearSetUp;
                let POAName = values.client.POAName;
                let DOB = values.client.DOB;
                let relationshipStatus = values.client.relationshipStatus;

                switch (currentInput.name) {
                    case "client.POAType":
                        POAType = currentInput.value
                        break;
                    case "client.yearSetUp":

                        yearSetUp = currentInput.value
                        break;
                    case "client.POAName":

                        POAName = currentInput.value
                        break;
                    case "client.DOB":

                        DOB = currentInput.value
                        break;
                    case "client.relationshipStatus":

                        relationshipStatus = currentInput.value
                        break;

                    default:
                        console.log("noting selected")
                        break;
                }

                console.log(currentInput.name);

                setFieldValue("partner.POAType", POAType || "")
                setFieldValue("partner.yearSetUp", yearSetUp || "")
                setFieldValue("partner.POAName", POAName || "")
                setFieldValue("partner.DOB", DOB || "")
                setFieldValue("partner.relationshipStatus", relationshipStatus || "")
            }
        }

        const rowConfig = [
            { name: 'POAType', callBack: true, func: storeInPartner, type: 'select', options: optionsArray, placeholder: 'POA Type', styleSet: { width: "15rem" }, },
            { name: 'yearSetUp', callBack: true, func: storeInPartner, type: 'number', placeholder: 'Year Set up', },
            { name: 'POAName', callBack: true, func: storeInPartner, type: 'text', placeholder: 'Name of POA', },
            { name: 'DOB', callBack: true, func: storeInPartner, type: 'date', placeholder: 'dd/mm/yyyy', },
            { name: 'relationshipStatus', callBack: true, func: storeInPartner, type: 'select-creatableMulti', options: relationshipStatusOptionsArray, placeholder: 'Relationship Status', },
        ]
        const rowConfig2 = [
            { name: 'POAType', type: 'select', disabled: values.owner === "together", options: optionsArray, placeholder: 'POA Type', styleSet: { width: "15rem" }, },
            { name: 'yearSetUp', type: 'number', disabled: values.owner === "together", placeholder: 'Year Set up', },
            { name: 'POAName', type: 'text', disabled: values.owner === "together", placeholder: 'Name of POA', },
            { name: 'DOB', type: 'date', disabled: values.owner === "together", placeholder: 'dd/mm/yyyy', },
            { name: 'relationshipStatus', disabled: values.owner === "together", type: 'select-creatableMulti', options: relationshipStatusOptionsArray, placeholder: 'Relationship Status', styleSet: { width: "15rem" }, },
        ]

        return (
            <React.Fragment>
                {(values.owner === "client" || values.owner === "client+partner" || values.owner === "together") &&
                    <DynamicTableRow
                        rowConfig={rowConfig}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        stakeHolder={"client."}
                    />
                }
                {((values.owner === "partner" || values.owner === "client+partner" || values.owner === "together") && (UserStatus === "Married")) &&
                    <DynamicTableRow
                        rowConfig={rowConfig2}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        stakeHolder={"partner."}
                    />
                }
            </React.Fragment>
        )


    }


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
                }, [values.NumberOfMap]);

                return (
                    <Form>
                        <Row>
                            <div className="col-md-12">
                                <div className='row justify-content-center'>
                                    <div className='col-md-12'>

                                        <div className='d-flex flex-row justify-content-center align-items-center gap-2'>
                                            <label htmlFor='' className='text-end '>
                                                Owner
                                            </label>

                                            <div className='w-25'>
                                                <Field
                                                    as="select"
                                                    placeholder="Name of owner"
                                                    id={`owner`}
                                                    name={`owner`}
                                                    className="form-select inputDesignDoubleInput"
                                                >
                                                    <option value={""}>Select</option>

                                                    <option value={"client"}>  {RenderName("client")} </option>

                                                    {localStorage.getItem("UserStatus") !== "Single" &&
                                                        <React.Fragment>

                                                            <option value={"partner"}>{RenderName("partner")}</option>
                                                            <option value={"client+partner"}>{"Both (" + RenderName("client") + " , " + RenderName("partner") + ")"} </option>
                                                            <option value={"together"}>{"Together (" + RenderName("client") + " , " + RenderName("partner") + ")"} </option>

                                                        </React.Fragment>
                                                    }
                                                </Field>
                                            </div>
                                            {values.owner === "togeather" &&

                                                <label htmlFor='' className='text-end '>
                                                    <Tooltip placement="top" title={"When yes is selected for Partner for Wills  and POA have an option to copy details from Client Answers for Will  and POA this will apply for when client and partner have a Will together."}>
                                                        <FaCircleQuestion style={{ fontSize: '18px', cursor: 'pointer' }} />
                                                    </Tooltip>
                                                </label>
                                            }

                                        </div>
                                    </div>

                                    {values.owner !== "" && (
                                        <div className='mt-4'>
                                            <Table striped bordered responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th onClick={() => { console.log(values) }}>No#</th>
                                                        <th>POA Type</th>
                                                        <th>Year Set up</th>
                                                        <th>Name of POA</th>
                                                        <th>DOB</th>
                                                        <th>Relationship Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {TBodyRender(values, setFieldValue, handleChange, handleBlur)}
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
