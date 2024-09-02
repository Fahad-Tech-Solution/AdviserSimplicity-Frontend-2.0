import { Form, Formik } from 'formik'
import React, { useRef, useState } from 'react'
import PersonalDetailsClientPartner from './PersonalDetailsClientPartner';
import "yup-phone";
import * as Yup from 'yup';
import Childe from './Childe';
import PersonalDetailCards from './PersonalDetailCards';
import { useRecoilState } from 'recoil';
import { PersonalDetailsData } from '../../Store/Store';

const PersonalDetailNew = () => {

    let formRef = useRef(null);


    let [Switch, setSwitch] = useState(1);
    let [PersonalDetailObj, setPersonalDetailObj] = useRecoilState(PersonalDetailsData);

    let initialValues = {
        client: {
            clientTitle: "Mrs",
            clientGivenName: "John",
            clientSurname: "Doe",
            clientPreferredName: "Johnny",
            clientGender: "Male",
            clientDOB: "1990-01-01",
            clientAge: 34,
            clientMaritalStatus: "Partnered",
            clientEmploymentStatus: "Homemaker",
            clientHealth: "good",
            clientSmoker: "nonsmoker",
            clientPlannedRetirementAge: 65,
            clientHomeAddress: "123 Main St",
            clientPostcode: 12345,
            clientHomePhone: "555-555-5555",
            clientWorkPhone: "555-555-5556",
            clientMobile: "555-555-5557",
            Email: "john.doe@example.com",
            clientPostalAddress: "123 Main St",
            clientPostalPostCode: 12345,
            clientMiddleName: "Michael",
            clientOccupationID: "OCC123",
            clientTaxResidentRadio: "Yes",
            clientPrivateHealthCoverRadio: "Yes",
            clientHELPSDebtRadio: "No",
            clientSameAsAbove: true,
            clientRetirement: "Comfortable",

        },
        partner: {
            partnerTitle: "Miss",
            partnerGivenName: "Jane",
            partnerSurname: "Doe",
            partnerPreferredName: "Janey",
            partnerGender: "Female",
            partnerDOB: "1992-02-02",
            partnerAge: 32,
            partnerMaritalStatus: "Married",
            partnerEmploymentStatus: "Homemaker",
            partnerHealth: "good",
            partnerSmoker: "nonsmoker",
            partnerPlannedRetirementAge: 65,
            partnerHomeAddress: "123 Main St",
            partnerPostcode: 12345,
            partnerHomePhone: "555-555-5555",
            partnerWorkPhone: "555-555-5556",
            partnerMobile: "555-555-5557",
            partnerEmail: "jane.doe@example.com",
            partnerPostalAddress: "123 Main St",
            partnerPostalPostCode: 12345,
            partnerMiddleName: "Marie",
            partnerOccupationID: "OCC124",
            partnerTaxResidentRadio: "Yes",
            partnerPrivateHealthCoverRadio: "Yes",
            partnerHELPSDebtRadio: "No",
            partnerSameAsClient: true,
            partnerRetirement: "Comfortable"
        },
        children: {
            numberOfChildren: 2,
            arrayOfChildren: []
        },
        haveAnyChildren: "Yes",
    };

    // Updated validation schema to handle nested structures correctly
    let validationSchema = Yup.object({
        client: Yup.object({
            Email: Yup.string()
                .email('Invalid email format')
                .required('Required'),
            clientMaritalStatus: Yup.string()
                .required('Marital status is required'),
            // You can add more fields validation as needed
        }),
        partner: Yup.object({
            partnerEmail: Yup.string()
                .email('Invalid email format')
                .required('Required'),
            partnerMaritalStatus: Yup.string()
                .required('Marital status is required'),
            // Add more fields as needed
        }),
        // Add validation for children if needed
    });

    let onSubmit = (values) => {

        console.log("Parent on submit : ", values)
        if (Switch === 1) {
            setSwitch(2)
        }
        else if (Switch === 2) {
            setSwitch(3)
            setPersonalDetailObj(values);
        }

    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={formRef}
            enableReinitialize
        >
            {({ values, setFieldValue, handleChange, errors, handleBlur }) => (
                <Form>

                    {/*
                        Import all Components and create Relation Between them
                    */}

                    {Switch == 1 &&

                        <PersonalDetailsClientPartner values={values} setFieldValue={setFieldValue} handleChange={handleChange} handleBlur={handleBlur} />
                    }

                    {Switch == 2 &&

                        <Childe values={values} ParentformRef={formRef} setFieldValue={setFieldValue} handleChange={handleChange} handleBlur={handleBlur} />
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
                                    className="float-center w-100 btn btn-outline  backBtn mx-3"
                                >
                                    Back
                                </button>
                            </div>
                        }
                        <div className={` ${Switch !== 1 ? "col-md-3" : "col-md-4"}  px-4`}>
                            <button
                                type="submit"
                                className=" btn w-100  bgColor modalBtn"
                            >
                                Next
                            </button>
                        </div>
                    </div>



                </Form>)}

        </Formik>
    )
}

export default PersonalDetailNew
