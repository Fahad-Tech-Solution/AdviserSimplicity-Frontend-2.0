import {
  faBanSmoking,
  faChildren,
  faEnvelope,
  faMobile,
  faSmoking,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ViewClient.css";
import { defaultUrl } from "../Store/Store";
import { useRecoilValue } from "recoil";

function ViewClient() {
  
  let DefaultUrl = useRecoilValue(defaultUrl)

  const [Client, setClient] = useState([]);

  let DOB = new Date(Client.DOB);
  Client.DOB = DOB.getDate() + "-" + DOB.getMonth() + "-" + DOB.getFullYear();

  const [Partner, setPartner] = useState([]);
  DOB = new Date(Partner.DOB);
  Partner.DOB = DOB.getDate() + "-" + DOB.getMonth() + "-" + DOB.getFullYear();

  const [Children] = useState([]);
  const [NoOfChild, setNoOfChild] = useState(0);

  useEffect(() => {
    axios.get(`${DefaultUrl}/api/Client`).then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].Email === localStorage.getItem("ViewClient")) {
          setClient(res.data[i]);
        }
      }
    });

    axios.get(`${DefaultUrl}/api/Partner`).then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].ClientEmail === localStorage.getItem("ViewClient")) {
          setPartner(res.data[i]);
        }
      }
    });

    axios.get(`${DefaultUrl}/api/Child`).then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].Email === localStorage.getItem("ViewClient")) {
          setNoOfChild(NoOfChild + 1);
        }
      }
    });
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header CardHead">
              <h5>
                <b>Client Details</b>
              </h5>
            </div>
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faUser} /> {Client.Title}{" "}
                {Client.GivenName}
              </h5>
              <p className="card-text">
                {" " +
                  Client.Age +
                  " years old    /    " +
                  Client.MaritalStatus +
                  "    /    " +
                  Client.EmploymentStatus}
              </p>
              <p className="card-text">
                {" " + Client.Health + "    /    "}{" "}
                {Client.Smoker !== "true" ? (
                  <FontAwesomeIcon icon={faSmoking} />
                ) : (
                  <FontAwesomeIcon icon={faBanSmoking} />
                )}
              </p>
            </div>
            <div className="card-header CardHead">
              <h5>
                <b>Partner Details</b>
              </h5>
            </div>
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faUser} /> {Partner.Title}{" "}
                {Partner.GivenName}
              </h5>
              <p className="card-text">
                {" " +
                  Partner.Age +
                  " years old    /    " +
                  Partner.MaritalStatus +
                  "    /    " +
                  Partner.EmploymentStatus}
              </p>
              <p className="card-text">
                {" " + Partner.Health + "    /    "}{" "}
                {Partner.Smoker !== "true" ? (
                  <FontAwesomeIcon icon={faSmoking} />
                ) : (
                  <FontAwesomeIcon icon={faBanSmoking} />
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header CardHead">
              <h5>
                <b>Contact Details</b>
              </h5>
            </div>
            <div className="card-body">
              <h5 className="card-title">
                {" "}
                {Client.HomeAddress} {Client.Postcode}
              </h5>
              <p className="card-text">
                {" "}
                <FontAwesomeIcon icon={faMobile} /> &nbsp;{Client.Mobile}
              </p>
              <p className="card-text">
                {" "}
                <FontAwesomeIcon icon={faEnvelope} /> {Client.Email}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card card-block">
            <div className="card-header CardHead">
              <h5>
                <b>Children Details</b>
              </h5>
            </div>
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon icon={faChildren} /> {NoOfChild + " Child(s)"}
              </h5>
              <p className="card-text">
                {Client.ExpandFamily === "Yes" ? (
                  <>Planning to expand family</>
                ) : (
                  <>No Plan to expand family</>
                )}
              </p>
              <p className="card-text">
                {Children.ChildFinancialyDependent === "Yes" ? (
                  <>Dependent</>
                ) : (
                  <>Not Dependent</>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewClient;
