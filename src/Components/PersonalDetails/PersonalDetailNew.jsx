import { Form, Formik } from 'formik'
import React from 'react'
import PersonalDetailsClientPartner from './PersonalDetailsClientPartner';

const PersonalDetailNew = () => {


    let initialValues = {
        client: {
            clientTitle: "Mr.",
            clientGivenName: "John",
            clientSurname: "Doe",
            clientPreferredName: "Johnny",
            clientGender: "Male",
            clientDOB: "1990-01-01",
            clientAge: 34,
            clientMaritalStatus: "Single",
            clientEmploymentStatus: "Employed",
            clientHealth: "Good",
            clientSmoker: "No",
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
            partnerTitle: "Mrs.",
            partnerGivenName: "Jane",
            partnerSurname: "Doe",
            partnerPreferredName: "Janey",
            partnerGender: "Female",
            partnerDOB: "1992-02-02",
            partnerAge: 32,
            partnerMaritalStatus: "Married",
            partnerEmploymentStatus: "Employed",
            partnerHealth: "Good",
            partnerSmoker: "No",
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

    let validationSchema = {};
    let onSubmit = {};


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ values, setFieldValue, handleChange, errors, handleBlur }) => (
                <Form>

                    {/*
                        Import all Components and create Relation Between them
                    */}

                    <PersonalDetailsClientPartner values={values} setFieldValue={setFieldValue} handleChange={handleChange} />

                </Form>)}

        </Formik>
    )
}

export default PersonalDetailNew
