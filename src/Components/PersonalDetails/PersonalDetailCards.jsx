import React, { useEffect } from "react";

import { HiUsers } from "react-icons/hi";
import single from "../Svgs/single-2.svg";
import childimg from "./images/child.svg";
import heterosexual from "./images/united-heterosexual-symbols-svgrepo-com.svg";
import briefcase from "./images/briefcase-bag-svgrepo-com.svg";
import email from "./images/email-notification-message-envelope-letter-chat-svgrepo-com.svg";
import phone from "./images/phone-calling-svgrepo-com.svg";
import address from "./images/map-pin-2-svgrepo-com.svg";
import age from "./images/arrow-interface-multimedia-svgrepo-com.svg";
import SVGMale from "./images/male-svgrepo-com.svg";
import SVGFemale from "./images/female-svgrepo-com.svg";
import couple from "../Svgs/couple-2.svg";

// import { LuBaby } from "react-icons/lu";

import { FaPhoneAlt, FaRedo, FaRegAddressBook, FaUser } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { PersonalDetailsData } from "../../Store/Store";
import { differenceInYears } from "date-fns";

function PersonalDetailCards(props) {
  let data = useRecoilValue(PersonalDetailsData);

  // let [PersonalDetailObj, setPersonalDetailObj] = useRecoilState(PersonalDetailsData);

  function formatDate(dateString) {
    // Create a new Date object from the date string
    const date = new Date(dateString);

    // Define an array of month names
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

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

  useEffect(() => {
    if (!data?.client) {
    }
  }, []);

  return (
    <div className="pb-4 bg-white borderOverAll rounded mt-3">
      <h4 className="heading text-center d-none">Personal Details</h4>

      <div className="row justify-content-center align-item-stretch">
        <div className={getClassName(data.client.clientMaritalStatus)}>
          <div className="card px-3 py-4 gap-3 PersonalDetails d-flex justify-content-center align-items-center h-100">
            <div className="row w-100">
              <div className="col-md-12">
                <div className="d-flex justify-content-start align-item-start gap-3">
                  <h2>
                    {data.client.clientTitle} {data.client.clientGivenName}{" "}
                    {data.client.clientSurname}
                  </h2>
                  <div>
                    <img
                      src={single}
                      alt="single svg"
                      className="me-2"
                      width={"26px"}
                    />
                  </div>
                </div>
              </div>

              <div className="col-6 mb-3">
                <div className="d-flex align-items-center">
                  <FaUser className="me-2 text-green" />
                  {data.client.clientPreferredName}
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="d-flex align-items-center">
                  {data.client.clientGender == "Female" ? (
                    <img
                      src={SVGFemale}
                      alt="single svg"
                      className="me-2"
                      width={"24px"}
                    />
                  ) : (
                    <img
                      src={SVGMale}
                      alt="single svg"
                      className="me-2"
                      width={"24px"}
                    />
                  )}
                  {data.client.clientGender == "Female" ? "Female" : "Male"}
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="d-flex align-items-center">
                  <img
                    src={age}
                    alt="single svg"
                    className="me-2"
                    width={"24px"}
                  />
                  {formatDate(data.client.clientDOB) +
                    " (" +
                    differenceInYears(new Date(), data.client.clientDOB) +
                    ")"}
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="d-flex align-items-center">
                  <img
                    src={heterosexual}
                    alt="single svg"
                    className="me-2"
                    width={"24px"}
                  />

                  {data.client.clientMaritalStatus}
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="d-flex align-items-center">
                  <img
                    src={briefcase}
                    alt="single svg"
                    className="me-2"
                    width={"24px"}
                  />
                  {data.client.clientEmploymentStatus}
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="d-flex align-items-center">
                  <img
                    src={phone}
                    alt="single svg"
                    className="me-2"
                    width={"24px"}
                  />

                  {data.client.clientMobile}
                </div>
              </div>
              <div className="col-6 mb-3">
                <div
                  className="d-flex align-items-center"
                  style={{ width: "100%" }}
                >
                  <img
                    src={email}
                    alt="single svg"
                    className="me-2"
                    width="24px"
                  />
                  <section
                    className="text-truncate"
                    style={{ maxWidth: "100%" }}
                  >
                    {data.client.Email}
                  </section>
                </div>
              </div>

              {data.haveAnyChildren === "Yes" && (
                <div className="col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <img
                      src={childimg}
                      alt="single svg"
                      className="me-2"
                      width={"24px"}
                    />
                    {data.children.numberOfChildren}
                  </div>
                </div>
              )}

              <div className="col-12 mb-3">
                <div className="d-flex align-items-center">
                  <img
                    src={address}
                    alt="single svg"
                    className="me-2"
                    width={"30px"}
                  />
                  {data.client.clientHomeAddress}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          {data.client.clientMaritalStatus !== "Single" &&
            data.client.clientMaritalStatus !== "Widowed" && (
              <div className="card px-3 py-4 gap-3 PersonalDetails d-flex justify-content-center align-items-center h-100">
                <div className="row w-100">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-start align-item-start gap-3">
                      <h2>
                        {" "}
                        {data.partner.partnerTitle}{" "}
                        {data.partner.partnerGivenName}{" "}
                        {data.partner.partnerSurname}
                      </h2>
                      <div>
                        <img
                          src={couple}
                          alt="single svg"
                          className="me-2"
                          width={"26px"}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-6 mb-3">
                    <div className="d-flex align-items-center">
                      <HiUsers className="me-2 text-green Fs-24" />
                      {data.partner.partnerPreferredName}
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="d-flex align-items-center">
                      {data.client.clientGender == "Female" ? (
                        <img
                          src={SVGFemale}
                          alt="single svg"
                          className="me-2"
                          width={"24px"}
                        />
                      ) : (
                        <img
                          src={SVGMale}
                          alt="single svg"
                          className="me-2"
                          width={"24px"}
                        />
                      )}
                      {data.partner.partnerGender == "Female"
                        ? "Female"
                        : "Male"}
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={age}
                        alt="single svg"
                        className="me-2"
                        width={"24px"}
                      />
                      {formatDate(data.partner.partnerDOB) +
                        " (" +
                        differenceInYears(new Date(), data.partner.partnerDOB) +
                        ")"}
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={heterosexual}
                        alt="single svg"
                        className="me-2"
                        width={"24px"}
                      />
                      {data.partner.partnerMaritalStatus}
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={briefcase}
                        alt="single svg"
                        className="me-2"
                        width={"24px"}
                      />
                      {data.partner.partnerEmploymentStatus}
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={phone}
                        alt="single svg"
                        className="me-2"
                        width={"24px"}
                      />
                      {data.partner.partnerMobile}
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={email}
                        alt="single svg"
                        className="me-2"
                        width={"24px"}
                      />
                      {data.partner.partnerEmail}
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={address}
                        alt="single svg"
                        className="me-2"
                        width={"30px"}
                      />
                      {data.partner.partnerHomeAddress}
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default PersonalDetailCards;
