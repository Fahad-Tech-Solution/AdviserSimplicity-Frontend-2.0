import React from 'react';

import single from "../Svgs/single-2.svg";
import couple from "../Svgs/couple-2.svg";
import { ErrorMessage, Field } from 'formik';


const PersonalDetailsClientPartner = (props) => {

    let { values, setFieldValue, handleChange } = props;
    let { client, partner } = values;

    return (
        <div className='row mt-4 px-5'>

            <div className='col-md-8'>
                <div className='row'>

                    {/*Labels Title */}
                    <div className='col-6 mb-2'></div>

                    {/*Client Head */}
                    <div className='col-6 mb-2 LargeSheet'>
                        <div className="centerDiv">
                            <label
                                htmlFor="clientTitle LargeSheet"
                                className="form-label clientFS green mb-3 p-0"
                            >
                                Client
                                <div className="iconContainerLg m-0 p-0">
                                    <img
                                        src={single}
                                        alt="single svg"
                                        className="w-50 "
                                    />
                                </div>
                            </label>
                        </div>
                    </div>

                    {/*Labels Title */}
                    <div className='col-6 mb-2'>
                        <label
                            htmlFor="clientTitle"
                            className="form-label d-block mt-2"
                        >
                            Title
                        </label>
                    </div>

                    {/*Client Input Title */}
                    <div className='col-6 mb-2'>
                        <Field
                            id="clientTitle"
                            className="form-select inputDesign"
                            as="select"
                            name="client.clientTitle"
                        >
                            <option value="">Select</option>
                            <option value="Dr">Dr</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                            <option value="MS">MS</option>
                            <option value="Prof">Prof</option>
                            <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage
                            component="div"
                            className="text-danger "
                            name="client.clientTitle"
                        />
                    </div>

                    {/*Labels Surname */}
                    <div className='col-6 mb-2'>
                        <label
                            htmlFor="clientSurname"
                            className="form-label mt-2">
                            Surname
                        </label>
                    </div>

                    {/*Client Input Surname */}
                    <div className='col-6 mb-2'>
                        <Field
                            type="text"
                            className="form-control inputDesign"
                            id="clientSurname"
                            name="client.clientSurname"
                        />
                        <ErrorMessage
                            component="div"
                            className="text-danger "
                            name="client.clientSurname"
                        />
                    </div>

                    {/*Labels Given Name */}
                    <div className='col-6 mb-2'>
                        <label
                            htmlFor="clientGivenName"
                            className="form-label mt-2">
                            Given Name
                        </label>
                    </div>

                    {/*Client Input Given Name */}
                    <div className='col-6 mb-2'>
                        <Field
                            type="text"
                            className="form-control inputDesign"
                            id="clientGivenName"
                            name="client.clientGivenName"
                        />
                        <ErrorMessage
                            component="div"
                            className="text-danger "
                            name="client.clientGivenName"
                        />
                    </div>

                    {/*Labels Middle Name */}
                    <div className='col-6 mb-2'>
                        <label
                            htmlFor="clientMiddleName"
                            className="form-label mt-2"
                        >
                            Middle Name
                        </label>
                    </div>

                    {/*Client Input Middle Name */}
                    <div className='col-6 mb-2'>
                        <Field
                            type="text"
                            className="form-control inputDesign"
                            id="clientMiddleName"
                            name="client.clientMiddleName"
                        />
                        <ErrorMessage
                            component="div"
                            className="text-danger "
                            name="client.clientMiddleName"
                        />
                    </div>

                    {/*Labels Preferred Name */}
                    <div className='col-6 mb-2'>
                        <label
                            htmlFor="clientPreferredName"
                            className="form-label mt-2"
                        >
                            Preferred Name
                        </label>
                    </div>

                    {/*Client Input Preferred Name */}
                    <div className='col-6 mb-2'>
                        <Field
                            type="text"
                            className="form-control inputDesign "
                            id="clientPreferredName"
                            name="client.clientPreferredName"

                        />
                        <ErrorMessage
                            component="div"
                            className="text-danger "
                            name="client.clientPreferredName"
                        />
                    </div>

                    {/*Labels Gender */}
                    <div className='col-6 mb-2'>
                        <label htmlFor="" className="form-label mt-2">
                            Gender
                        </label>
                    </div>

                    {/*Client Input Gender */}
                    <div className='col-6 mb-2'>
                        <div className="form-check form-switch m-0 p-0 ">
                            <div className="radiobutton">
                                <input
                                    type="radio"
                                    name="client.clientGender"
                                    className="form-check-input"
                                    id="clientGender1"
                                    value="male"
                                    onChange={handleChange}
                                    checked={
                                        client.clientGender === "male"
                                    }
                                />

                                <label
                                    htmlFor="clientGender1"
                                    className="label1"
                                >
                                    <span>Male</span>
                                </label>
                                <input
                                    type="radio"
                                    name="client.clientGender"
                                    id="clientGender2"
                                    className="form-check-input"
                                    value="female"
                                    onChange={handleChange}
                                    checked={
                                        client.clientGender === "female"
                                    }
                                />
                                <label
                                    htmlFor="clientGender2"
                                    className="label2"
                                >
                                    <span>Female</span>
                                </label>
                            </div>
                        </div>
                        <ErrorMessage
                            component="div"
                            className="text-danger "
                            name="client.clientPreferredName"
                        />
                    </div>









                    {/*Labels Title */}
                    <div className='col-6 mb-2'>
                        <label
                            htmlFor="clientMaritalStatus"
                            className="form-label mt-2"
                        >
                            Marital Status
                        </label>
                    </div>

                    {/*Client Input Title */}
                    <div className='col-6 mb-2'>
                        <Field
                            as="select"
                            id="client.clientMaritalStatus"
                            name="client.clientMaritalStatus"
                            className="form-select inputDesign"
                        >
                            <option value="">Select</option>
                            <option value="Married">Married</option>
                            <option value="Partnered">Partnered</option>
                            <option value="Single">Single</option>
                            <option value="DeFacto">De-facto</option>
                            <option value="Widowed">Widowed</option>
                        </Field>
                        <ErrorMessage
                            component="div"
                            className="text-danger"
                            name="client.clientMaritalStatus"
                        />
                    </div>

                </div>
            </div>

            {client.clientMaritalStatus !== "Single" &&
                client.clientMaritalStatus !== "Widowed" ? (
                <div className='col-md-4'>
                    <div className='row'>

                        {/*Mobile Labels Title */}
                        <div className='col-6 col-md-12 mb-2 d-md-none d-block'></div>

                        {/*Partner Head */}
                        <div className='col-6 col-md-12 LargeSheet mb-2'>
                            <div className="centerDiv">
                                <label
                                    htmlFor="clientTitle"
                                    className="form-label clientFS green mb-3 p-0 "
                                >
                                    Partner
                                    <div className="iconContainerLg">
                                        <img
                                            src={couple}
                                            alt="single svg"
                                            className="w-50 "
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/*Mobile Labels Title */}
                        <div className='col-6 col-md-12 mb-2 d-md-none d-block'>
                            <label
                                htmlFor="partnerTitle"
                                className="form-label d-block mt-2"
                            >
                                Title
                            </label>
                        </div>

                        {/*Partner Input Title */}
                        <div className='col-6 col-md-12  mb-2'>
                            <Field
                                as="select"
                                id="partnerTitle"
                                className="form-select inputDesign"
                                name="partner.partnerTitle"
                            >
                                <option value="">Select</option>
                                <option value="Dr">Dr</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Miss">Miss</option>
                                <option value="MS">MS</option>
                                <option value="Prof">Prof</option>
                                <option value="Other">Other</option>
                            </Field>
                            <ErrorMessage
                                className="text-danger "
                                component="div"
                                name="partner.partnerTitle"
                            />
                        </div>

                        {/*Mobile Labels Surname */}
                        <div className='col-6 col-md-12 mb-2 d-md-none d-block'>
                            <label
                                htmlFor="partnerSurname"
                                className="form-label d-block mt-2"
                            >
                                Surname
                            </label>
                        </div>

                        {/*Partner Input Surname */}
                        <div className='col-6 col-md-12  mb-2'>
                            <Field
                                type="text"
                                className="form-control inputDesign "
                                id="partnerSurname"
                                name="partner.partnerSurname"
                            />
                            <ErrorMessage
                                className="text-danger "
                                component="div"
                                name="partner.partnerSurname"
                            />
                        </div>

                        {/*Mobile Labels Given Name */}
                        <div className='col-6 col-md-12 mb-2 d-md-none d-block'>
                            <label
                                htmlFor="partnerGivenName"
                                className="form-label d-block mt-2"
                            >
                                Given Name
                            </label>
                        </div>

                        {/*Partner Input Given Name */}
                        <div className='col-6 col-md-12  mb-2'>
                            <Field
                                type="text"
                                className="form-control inputDesign "
                                id="partnerGivenName"
                                name="partner.partnerGivenName"
                            />
                            <ErrorMessage
                                className="text-danger "
                                component="div"
                                name="partner.partnerGivenName"
                            />
                        </div>

                        {/*Mobile Labels Middle Name */}
                        <div className='col-6 col-md-12 mb-2 d-md-none d-block'>
                            <label
                                htmlFor="partnerMiddleName"
                                className="form-label d-block mt-2"
                            >
                                Middle Name
                            </label>
                        </div>

                        {/*Partner Input Middle Name */}
                        <div className='col-6 col-md-12  mb-2'>
                            <Field
                                type="text"
                                className="form-control inputDesign"
                                id="partnerMiddleName"
                                name="partner.partnerMiddleName"
                            />
                            <ErrorMessage
                                className="text-danger "
                                component="div"
                                name="partner.partnerMiddleName"
                            />
                        </div>

                        {/*Mobile Labels Preferred Name */}
                        <div className='col-6 col-md-12 mb-2 d-md-none d-block'>
                            <label
                                htmlFor="partnerPreferredName"
                                className="form-label mt-2"
                            >
                                Preferred Name
                            </label>
                        </div>

                        {/*Partner Input Middle Name */}
                        <div className='col-6 col-md-12  mb-2'>
                            <Field
                                type="text"
                                className="form-control inputDesign "
                                id="partnerPreferredName"
                                name="partner.partnerPreferredName"
                            />
                            <ErrorMessage
                                className="text-danger "
                                component="div"
                                name="partner.partnerPreferredName"
                            />
                        </div>

                        {/*Mobile Labels Gender */}
                        <div className='col-6 col-md-12 mb-2 d-md-none d-block'>
                            <label htmlFor="" className="form-label mt-2">
                                Gender
                            </label>
                        </div>

                        {/*Partner Input Middle Name */}
                        <div className='col-6 col-md-12 mb-3'>
                            <div className="form-check form-switch m-0 p-0 ">
                                <div className="radiobutton">
                                    <input
                                        type="radio"
                                        name="partner.partnerGender"
                                        className="form-check-input"
                                        id="partnerGender1"
                                        value="male"
                                        onChange={handleChange}
                                        checked={
                                            partner.partnerGender === "male"
                                        }
                                    />

                                    <label
                                        htmlFor="partnerGender1"
                                        className="label1"
                                    >
                                        <span>Male</span>
                                    </label>
                                    <input
                                        type="radio"
                                        name="partner.partnerGender"
                                        id="partnerGender2"
                                        className="form-check-input"
                                        value="female"
                                        onChange={handleChange}
                                        checked={
                                            partner.partnerGender === "female"
                                        }
                                    />
                                    <label
                                        htmlFor="partnerGender2"
                                        className="label2"
                                    >
                                        <span>Female</span>
                                    </label>
                                </div>
                            </div>
                            <ErrorMessage
                                component="div"
                                className="text-danger "
                                name="client.clientPreferredName"
                            />
                        </div>








                        {/*Mobile Labels Title */}
                        <div className='col-6 col-md-12  mb-2 d-md-none d-block'>
                            <label
                                htmlFor="partnerMaritalStatus"
                                className="form-label mt-2"
                            >
                                Marital Status
                            </label>
                        </div>

                        {/*Partner Input Title */}
                        <div className='col-6 col-md-12  mb-2'>
                            <Field
                                as="select"
                                id="partnerMaritalStatus"
                                className="form-select inputDesign"
                                name="partner.partnerMaritalStatus"
                            >
                                <option value="">Select</option>
                                <option value="Married">Married</option>
                                <option value="Partnered">Partnered</option>
                                <option value="De-facto">De-facto</option>
                            </Field>
                            <ErrorMessage
                                className="text-danger "
                                component="div"
                                name="partner.partnerMaritalStatus"
                            />
                        </div>

                    </div>
                </div>
            ) : (
                <div className="col-md-4"></div>
            )}

        </div>
    )
}

export default PersonalDetailsClientPartner
