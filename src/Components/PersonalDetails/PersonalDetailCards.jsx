import React from 'react'

import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { GiLinkedRings } from "react-icons/gi";
import { IoIosMail } from "react-icons/io";
import { FaBriefcase } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import single from "../Svgs/single-2.svg";
import couple from "../Svgs/couple-2.svg";

import {
    FaPhoneAlt,
    FaRedo,
    FaRegAddressBook,
    FaUser,
} from "react-icons/fa";


function PersonalDetailCards(props) {

    function formatDate(dateString) {
        // Create a new Date object from the date string
        const date = new Date(dateString);

        // Define an array of month names
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Extract the day, month, and year from the date object
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        // Construct the formatted date string
        const formattedDate = `${day} ${month} ${year}`;

        return formattedDate;
    }


    function getClassName(status) {
        if (status === "Single" || status === "Widowed") {
            return "col-md-12";
        } else {
            return "col-md-6";
        }
    }

    return (<div className="py-4 bg-white  borderOverAll  rounded">
        <h4 className="heading text-center">Personal Details</h4>
        {
            /*  table  */
        }
        <div className="row mt-3">
            <div className={getClassName(props.values.clientMaritalStatus)}>
                <div className="card px-3 py-4 border-0 gap-3 PersonalDetails d-flex justify-content-center align-items-center">
                    <div className="row w-100">
                        <div className="col-6 mb-3">
                            <div className="d-flex align-items-center">
                                <img src={single} alt="single svg" className="me-2" width={"16px"} />
                                {props.values.clientGivenName}
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="d-flex align-items-center">
                                <FaUser className="me-2" />
                                {props.values.clientPreferredName}
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="d-flex align-items-center">
                                {props.values.clientGender ? <BsGenderMale className="me-2" /> : <BsGenderFemale className="me-2" />}
                                {props.values.clientGender ? 'Male' : 'Female'}
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="d-flex align-items-center">
                                <FaRedo className="me-2" />
                                {formatDate(props.values.clientDOB) + " (" + props.values.clientAge + ")"}
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="d-flex align-items-center">
                                <GiLinkedRings className="me-2" />
                                {props.values.clientMaritalStatus}
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="d-flex align-items-center">
                                <FaBriefcase className="me-2" />
                                {props.values.clientEmploymentStatus}
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="d-flex align-items-center">
                                <FaRegAddressBook className="me-2" />
                                {props.values.clientHomeAddress}
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="d-flex align-items-center">
                                <IoIosMail className="me-2" />
                                {props.values.Email}
                            </div>
                        </div>
                        <div className="col-6 mb-3">
                            <div className="d-flex align-items-center">
                                <FaPhoneAlt className="me-2" />
                                {props.values.clientMobile}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col-md-6">
                {props.values.clientMaritalStatus !== "Single" && props.values.clientMaritalStatus !== "Widowed" &&
                    <div className="card px-3 pt-4 border-0 PersonalDetails">
                        <div className="row w-100">
                            <div className="col-6 mb-3">
                                <div className="d-flex align-items-center">
                                    <img src={couple} alt="couple svg" className="me-2" width={"20px"} />
                                    {props.values.partnerGivenName}
                                </div>
                            </div>
                            <div className="col-6 mb-3">
                                <div className="d-flex align-items-center">
                                    <HiUsers className="me-2" />
                                    {props.values.partnerPreferredName}
                                </div>
                            </div>
                            <div className="col-6 mb-3">
                                <div className="d-flex align-items-center">
                                    {props.values.partnerGender ? <BsGenderFemale className="me-2" /> : <BsGenderMale className="me-2" />}
                                    {props.values.partnerGender ? 'Female' : 'Male'}
                                </div>
                            </div>
                            <div className="col-6 mb-3">
                                <div className="d-flex align-items-center">
                                    <FaRedo className="me-2" />
                                    {formatDate(props.values.partnerDOB) + " (" + props.values.partnerAge + ")"}
                                </div>
                            </div>
                            <div className="col-6 mb-3">
                                <div className="d-flex align-items-center">
                                    <GiLinkedRings className="me-2" />
                                    {props.values.partnerMaritalStatus}
                                </div>
                            </div>
                            <div className="col-6 mb-3">
                                <div className="d-flex align-items-center">
                                    <FaBriefcase className="me-2" />
                                    {props.values.partnerEmploymentStatus}
                                </div>
                            </div>
                            <div className="col-12 mb-3">
                                <div className="d-flex align-items-center">
                                    <FaRegAddressBook className="me-2" />
                                    {props.values.partnerHomeAddress}
                                </div>
                            </div>
                            <div className="col-12 mb-3">
                                <div className="d-flex align-items-center">
                                    <IoIosMail className="me-2" />
                                    {props.values.Email}
                                </div>
                            </div>
                            <div className="col-6 mb-3">
                                <div className="d-flex align-items-center">
                                    <FaPhoneAlt className="me-2" />
                                    {props.values.partnerMobile}
                                </div>
                            </div>
                        </div>
                    </div>

                }
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-md-12">
                <button type="button" className="float-end btn w-25  bgColor modalBtn" onClick={props.nextbuttonHandler}>
                    Next
                </button>
                <button type="button" className="float-end btn w-25  btn-outline backBtn mx-3" onClick={() => props.setClientAndPartnerTable(true)}>
                    Back
                </button>
            </div>
        </div>

    </div>);
}

export default PersonalDetailCards
