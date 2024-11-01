import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Row, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, QuestionDetail } from '../../../Store/Store';
import { openNotificationSuccess, PatchAxios, PostAxios, RenderName } from '../../Assets/Api/Api';
import CreatableSelect from 'react-select/creatable';
import DatePicker from 'react-datepicker';
import { Tooltip } from 'antd';
import { FaCircleQuestion } from 'react-icons/fa6';
import DynamicTableRow from '../../Assets/Dynamic/DynamicTableRow';
import { CreatableMultiSelectField } from '../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField';

const EstatePlanningPOA = (props) => {


    let [UserStatus] = useState(localStorage.getItem('UserStatus'));

    let questionDetail = useRecoilValue(QuestionDetail);
    let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);

    let POA = Object.keys(questionDetail.POA || {}).length > 0 ? questionDetail.POA : {
        client: [],
        partner: [],
        joint: [],

    };  // Use an empty object as default if POA is undefined


    let initialValues = {
        owner: [],
        client: {
            POAType: "",
            yearSetUp: "",
            POAName: "",
            DOB: "",
            relationshipStatus: "",
        },
        partner: {
            POAType: "",
            yearSetUp: "",
            POAName: "",
            DOB: "",
            relationshipStatus: "",
        }
    };

    const fillInitialValues = (setFieldValue) => {

        if (POA && POA.clientFK) {
            setFieldValue("owner", POA.owner);

            // For "client" related fields
            if (POA.owner.includes("client") || POA.owner.includes("together")) {
                setFieldValue("client.POAType", POA.client.POAType);
                setFieldValue("client.yearSetUp", POA.client.yearSetUp);
                setFieldValue("client.POAName", POA.client.POAName);
                setFieldValue("client.DOB", POA.client.DOB);
                setFieldValue("client.relationshipStatus", POA.client.relationshipStatus);
            }

            // For "partner" related fields
            if (POA.owner.includes("partner") || POA.owner.includes("together")) {
                setFieldValue("partner.POAType", POA.partner.POAType);
                setFieldValue("partner.yearSetUp", POA.partner.yearSetUp);
                setFieldValue("partner.POAName", POA.partner.POAName);
                setFieldValue("partner.DOB", POA.partner.DOB);
                setFieldValue("partner.relationshipStatus", POA.partner.relationshipStatus);
            }
        }
    };


    let DefaultUrl = useRecoilValue(defaultUrl)


    let onSubmit = async (values) => {
        console.log(values, "Test karo yar");
        // return (false);

        let DataOf = props.modalObject.Input;

        // Create an object with additional fields
        let obj = values;

        obj.clientFK = localStorage.getItem("UserID");

        // For "client" related calculations
        if (values.owner.includes("client") || values.owner.includes("together")) {
            obj.clientTotal = obj.client.POAName.toString();
        } else {
            obj.clientTotal = "";
            obj.client = {};
        }

        // For "partner" related calculations
        if (values.owner.includes("partner") || values.owner.includes("together")) {
            obj.partnerTotal = obj.partner.POAName.toString();
        } else {
            obj.partnerTotal = "";
            obj.partner = {};
        }

        // If the user is not married, reset partner-related fields
        if (UserStatus !== "Married") {
            obj.partnerTotal = "";
            obj.partner = {};
        }

        console.log(obj, "final obj");

        // Check if POA and the array at props.modalObject.Input exist
        const bankAccountArray = POA.clientFK || "";

        try {
            let res;
            if (!bankAccountArray) {
                // Make a POST request if no bank account is found
                res = await PostAxios(`${DefaultUrl}/api/POA/Add`, obj);
            } else {
                // Make a PATCH request if a bank account is found
                res = await PatchAxios(`${DefaultUrl}/api/POA/Update`, obj);
            }

            if (res) {
                console.log(res);
                const updatedData = { ...questionDetail, POA: res };
                setQuestionDetail(updatedData);
            }

                        openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved");
            // Reset the flag state if necessary
            if (props.flagState) {
                props.setFlagState(false);
            }
        } catch (error) {
            console.error("Error occurred while making API call:", error);
                        openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved Please! try again");
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
            { value: 'neice', label: 'Neice' },
            { value: 'nephew', label: 'Nephew' },
            { value: 'other', label: 'Other' },
        ];

        let storeInPartner = (values, setFieldValue, currentInput, stakeHolder) => {

            if (values.owner.includes("together")) {

                let POAType = values.client.POAType || "";
                let yearSetUp = values.client.yearSetUp || "";
                let POAName = values.client.POAName || "";
                let DOB = values.client.DOB || "";
                let relationshipStatus = values.client.relationshipStatus || "";

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
                        const valuesArray = currentInput.value.map(item => item.value);
                        relationshipStatus = valuesArray
                        break;
                    default:
                        console.log("noting selected")
                        break;
                }

                // console.log(currentInput.name, currentInput.value);

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
            { name: 'POAType', type: 'select', disabled: values.owner.includes("together"), options: optionsArray, placeholder: 'POA Type', styleSet: { width: "15rem" }, },
            { name: 'yearSetUp', type: 'number', disabled: values.owner.includes("together"), placeholder: 'Year Set up', },
            { name: 'POAName', type: 'text', disabled: values.owner.includes("together"), placeholder: 'Name of POA', },
            { name: 'DOB', type: 'date', disabled: values.owner.includes("together"), placeholder: 'dd/mm/yyyy', },
            { name: 'relationshipStatus', disabled: values.owner.includes("together"), type: 'select-creatableMulti', options: relationshipStatusOptionsArray, placeholder: 'Relationship Status', styleSet: { width: "15rem" }, },
        ]

        return (
            <React.Fragment>
                {(values.owner.includes("together") || values.owner.includes("client")) &&
                    <DynamicTableRow
                        rowConfig={rowConfig}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        stakeHolder={"client."}
                    />
                }
                {((values.owner.includes("together") || values.owner.includes("partner")) && (UserStatus === "Married")) &&
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


    const options = (UserStatus !== "Single") ? [
        { value: "client", label: RenderName("client") },
        { value: "partner", label: RenderName("partner") },
        { value: "together", label: `Together(${RenderName("joint")})` }] :
        [{ value: "client", label: RenderName("client") },];


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

                                            <div style={{ minWidth: "25%" }}>
                                                <Field
                                                    name={`owner`}
                                                    component={CreatableMultiSelectField}
                                                    label="Multi Select Field"
                                                    options={options}
                                                    onChange={(selection) => {
                                                        // console.log(JSON.stringify(selection.target.value));
                                                        let selectionArray = selection.target.value;
                                                        const hasTogether = selectionArray.some(item => item.value === "together");

                                                        // console.log(hasTogether, values.owner);
                                                        if (hasTogether) {
                                                            setFieldValue("owner", ["together"]);
                                                        }
                                                    }}
                                                />
                                            </div>

                                            {(values.owner.includes("together")) && (
                                                <label htmlFor='' className='text-end '>
                                                    <Tooltip placement="top" title={"When yes is selected for Partner for Wills  and POA have an option to copy details from Client Answers for Will  and POA this will apply for when client and partner have a Will together."}>
                                                        <FaCircleQuestion style={{ fontSize: '18px', cursor: 'pointer' }} />
                                                    </Tooltip>
                                                </label>)
                                            }

                                        </div>
                                    </div>

                                    {values.owner.length > 0 && (
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
