import { ErrorMessage, Form, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import PersonalDetailsClientPartner from './PersonalDetailsClientPartner';
import "yup-phone";
import * as Yup from 'yup';
import Childe from './Childe';
import PersonalDetailCards from './PersonalDetailCards';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultUrl, PersonalDetailsData } from '../../Store/Store';
import { GetAxios, openNotificationSuccess, PatchAxios, PostAxios } from '../Assets/Api/Api';
import { useLocation, useNavigate } from 'react-router-dom';

const PersonalDetailNew = () => {

    let formRef = useRef(null);
    let formRefOfChield = useRef(null);


    let [Switch, setSwitch] = useState(1);
    let [userData, setUserData] = useState({});
    let [PersonalDetailObj, setPersonalDetailObj] = useRecoilState(PersonalDetailsData);
    let DefaultUrl = useRecoilValue(defaultUrl)

    let initialValues = {
        client: {
            clientTitle: "",
            clientGivenName: "",
            clientSurname: "",
            clientPreferredName: "",
            clientGender: "",
            clientDOB: "",
            clientAge: "",
            clientMaritalStatus: "",
            clientEmploymentStatus: "",
            clientHealth: "",
            clientSmoker: "nonsmoker",
            clientPlannedRetirementAge: "",
            clientHomeAddress: "",
            clientPostcode: "",
            clientHomePhone: "",
            clientWorkPhone: "",
            clientMobile: "",
            Email: "",
            clientPostalAddress: "",
            clientPostalPostCode: "",
            clientMiddleName: "",
            clientOccupationID: "",
            clientTaxResidentRadio: "No",
            clientPrivateHealthCoverRadio: "No",
            clientHELPSDebtRadio: "No",
            clientSameAsAbove: false,
            // clientRetirement: "",

        },
        partner: {
            partnerTitle: "",
            partnerGivenName: "",
            partnerSurname: "",
            partnerPreferredName: "",
            partnerGender: "",
            partnerDOB: "",
            partnerAge: "",
            partnerMaritalStatus: "",
            partnerEmploymentStatus: "",
            partnerHealth: "",
            partnerSmoker: "nonsmoker",
            partnerPlannedRetirementAge: "",
            partnerHomeAddress: "",
            partnerPostcode: "",
            partnerHomePhone: "",
            partnerWorkPhone: "",
            partnerMobile: "",
            partnerEmail: "",
            partnerPostalAddress: "",
            partnerPostalPostCode: "",
            partnerMiddleName: "",
            partnerOccupationID: "",
            partnerTaxResidentRadio: "No",
            partnerPrivateHealthCoverRadio: "No",
            partnerHELPSDebtRadio: "No",
            partnerSameAsClient: false,
            // partnerRetirement: ""
        },
        children: {
            numberOfChildren: 0,
            arrayOfChildren: []
        },
        haveAnyChildren: "No",
    };


    let location = useLocation();
    let hashing = location.hash;

    useEffect(() => {

        setPersonalDetailObj({
            "client": {
                "clientTitle": "Mr.",
                "clientGivenName": "John",
                "clientSurname": "Doe",
                "clientPreferredName": "Johnny",
                "clientGender": "Male",
                "clientDOB": "1990-01-01",
                "clientAge": 34,
                "clientMaritalStatus": "Single",
                "clientEmploymentStatus": "Employed",
                "clientHealth": "Good",
                "clientSmoker": "No",
                "clientPlannedRetirementAge": 65,
                "clientHomeAddress": "123 Main St",
                "clientPostcode": 12345,
                "clientHomePhone": "555-555-5555",
                "clientWorkPhone": "555-555-5556",
                "clientMobile": "555-555-5557",
                "Email": "john.doe@example.com",
                "clientPostalAddress": "123 Main St",
                "clientPostalPostCode": 12345,
                "clientMiddleName": "Michael",
                "clientOccupationID": "OCC123",
                "clientTaxResidentRadio": "Yes",
                "clientPrivateHealthCoverRadio": "Yes",
                "clientHELPSDebtRadio": "No",
                "clientSameAsAbove": true,
                "clientRetirement": "Comfortable",

            },
            "partner": {},
            "children": {
                "numberOfChildren": 0,
            },
            "haveAnyChildren": "No",
        })

        let Id = hashing.replace("#", "");
        // alert(Id);

        if (Id) {
            GetApiFunction(Id);
            // setSwitch(3);
        }

    }, []);


    async function GetApiFunction(id) {
        try {
            let res = await GetAxios(`${DefaultUrl}/api/personalDetails/getUserById/${id}`);
            if (res) {
                console.log(res);
                setPersonalDetailObj(res);
                setUserData(res)


                localStorage.setItem('UserID', res._id)
                localStorage.setItem('UserName', res.client.clientPreferredName)

                if (res.client.clientMaritalStatus === "Single" ||
                    res.client.clientMaritalStatus === "Widowed") {
                    localStorage.setItem('UserStatus', "Single")
                }
                else {
                    localStorage.setItem('UserStatus', "Married")
                    localStorage.setItem('PartnerName', res.partner.partnerPreferredName)
                }
            }
        }
        catch (error) {
            console.error("Error occurred while making API call:", error);
        }
    }


    let Nav = useNavigate();

    // Updated validation schema to handle nested structures correctly
    let validationSchema = Yup.object({
        client: Yup.object({
            Email: Yup.string()
                .email('Invalid email format')
                .required('Required'),
        }),
        // partner: Yup.object({
        //     partnerEmail: Yup.string()
        //         .email('Invalid email format')
        //         .required('Required'),
        //     partnerMaritalStatus: Yup.string()
        //         .required('Marital status is required'),
        // }),
        haveAnyChildren: Yup.string()
            .oneOf(['Yes', 'No'], 'Please select Yes or No')
            .required('This field is required'),

    });

    let includeArray = ["clientAge", "partnerAge", "clientPlannedRetirementAge", "partnerPlannedRetirementAge", "clientPostcode", "partnerPostcode", "clientPostalPostCode", "partnerPostalPostCode"]
    const checkAndReplaceEmptyData = (data) => {
        for (let key in data) {
            if (data[key] === "" || data[key] === null) {
                if (includeArray.includes(key)) {
                    data[key] = 0;
                }
                else if (key === "partnerEmail") {
                    data[key] = "dani11221@gmail.com";
                }
                else if (key === "partnerDOB" || key === "clientDOB") {
                    data[key] = "01/01/1999";
                }
                else if (typeof data[key] === "string") {
                    data[key] = "dummy Data";
                } else if (typeof data[key] === "number") {
                    data[key] = 0;
                } else if (typeof data[key] === "boolean") {
                    data[key] = false;
                } else {
                    data[key] = "dummy Data"; // Fallback for any other type
                }
            }
        }
        return data;
    }

    let onSubmit = async (values) => {
        console.log("Parent on submit : ", values)
        if (Switch === 1) {
            setSwitch(2)
        }
        else if (Switch === 2) {

            let obj = values;

            if (values.client.clientMaritalStatus === "Single" ||
                values.client.clientMaritalStatus === "Widowed") {
                obj.partner = {};
            }

            if (values.haveAnyChildren === "No") {
                obj.children = {};
            }



            let FoundId = PersonalDetailObj._id || ""

            // console.log(JSON.stringify(obj))

            try {
                let res;
                if (!FoundId) {


                    checkAndReplaceEmptyData(obj.client);

                    checkAndReplaceEmptyData(obj.partner);

                    console.log(JSON.stringify(obj))

                    res = await PostAxios(`${DefaultUrl}/api/personalDetails/Add`, obj);
                } else {
                    obj._id = PersonalDetailObj._id
                    res = await PatchAxios(`${DefaultUrl}/api/personalDetails/Update`, obj);
                }

                if (res) {
                    console.log(res);

                    localStorage.setItem('UserID', res._id)
                    localStorage.setItem('UserName', res.client.clientPreferredName)

                    if (values.client.clientMaritalStatus === "Single" ||
                        values.client.clientMaritalStatus === "Widowed") {
                        localStorage.setItem('UserStatus', "Single")
                    }
                    else {
                        localStorage.setItem('UserStatus', "Married")
                        localStorage.setItem('PartnerName', res.partner.partnerPreferredName)
                    }

                    setSwitch(3)
                    setPersonalDetailObj(res);

                    // type, placement, message, description
                    openNotificationSuccess("success", 'topRight', "Notification", "User Data Successfully Saved!")

                }

            } catch (error) {
                console.error("Error occurred while making API call:", error);
                openNotificationSuccess("error", 'topRight', "Notification", "Something when wrrong please check data again!")

            }




        }
        else {
            Nav("/ImportantQuestion");
        }


    };



    const StoreData = (setFieldValue) => {
        try {
            const data = PersonalDetailObj || {};

            // Function to set field values dynamically
            const setFields = (prefix, obj) => {
                if (!obj || typeof obj !== 'object') {
                    throw new Error(`Invalid object for prefix ${prefix}`);
                }

                Object.keys(obj).forEach(key => {
                    try {
                        if (key === "clientSameAsAbove") {
                            setFieldValue(`${prefix}.${key}`, obj[key] || false);
                        } else {
                            setFieldValue(`${prefix}.${key}`, obj[key] || "");
                        }
                    } catch (error) {
                        console.error(`Error setting field value for ${prefix}.${key}:`, error);
                    }
                });
            };

            // Check if the user data has an ID
            if (data._id) {

                setFields("client", data.client);

                // Only set partner fields if marital status is not "Single" or "Widowed"
                const maritalStatus = data.client?.clientMaritalStatus;
                if (maritalStatus && (maritalStatus !== "Single" && maritalStatus !== "Widowed")) {
                    setFields("partner", data.partner);
                }

                // Set children and 'haveAnyChildren' fields
                setFieldValue("children.numberOfChildren", data.children?.numberOfChildren || "");
                setFieldValue("children.arrayOfChildren", data.children?.arrayOfChildren || "");
                setFieldValue("haveAnyChildren", data.haveAnyChildren || "");
                setSwitch(3);

            }
        } catch (error) {
            console.error("An error occurred while storing data:", error);
        }
    };


    let submitChiled = () => {
        if (formRefOfChield.current) {
            formRefOfChield.current.handleSubmit();  // Trigger Formik's handleSubmit
        }
    }



    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={formRef}
            enableReinitialize
        >
            {({ values, setFieldValue, handleChange, errors, handleBlur }) => {

                useEffect(() => {
                    // Store Usre Data
                    StoreData(setFieldValue)
                }, [userData])


                return (
                    <Form>

                        {/*
                        Import all Components and create Relation Between them
                    */}

                        {Switch == 1 &&

                            <PersonalDetailsClientPartner values={values} setFieldValue={setFieldValue} handleChange={handleChange} handleBlur={handleBlur} />
                        }

                        {Switch == 2 &&

                            <Childe formRefOfChield={formRefOfChield} FoundData={PersonalDetailObj} values={values} ParentformRef={formRef} setFieldValue={setFieldValue} handleChange={handleChange} handleBlur={handleBlur} />
                        }

                        {Switch == 3 &&

                            <PersonalDetailCards data={PersonalDetailObj} />
                        }

                        <div className={`row justify-content-center gap-2 mb-4`}>

                            {Switch !== 1 &&
                                <div className='col-md-3 px-4'>
                                    <button
                                        type="button"
                                        onClick={() => { setSwitch(--Switch) }}
                                        className="float-center w-100 btn btn-outline  backBtn "
                                    >
                                        {Switch == 3 ? "Edit" : "Back"}
                                    </button>
                                </div>
                            }

                            <div className={` ${Switch !== 1 ? "col-md-3" : "col-md-4 submitPadding"} `}>
                                {Switch === 2 ? <button
                                    type="button"
                                    className=" btn w-100  bgColor modalBtn"
                                    onClick={submitChiled}
                                >
                                    {Switch == 3 ? "Next" : "Submit"}

                                </button> :
                                    <button
                                        type="submit"
                                        className=" btn w-100  bgColor modalBtn"
                                    >
                                        {Switch == 3 ? "Next" : "Submit"}

                                    </button>
                                }
                            </div>

                        </div>



                    </Form>)
            }}

        </Formik>
    )
}

export default PersonalDetailNew
