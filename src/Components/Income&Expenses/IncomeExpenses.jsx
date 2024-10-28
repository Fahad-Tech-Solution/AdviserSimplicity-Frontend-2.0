import React from "react";
import "react-datepicker/dist/react-datepicker.css";

import EmploymentDetail from "./EmploymentDetail/EmploymentDetail";
import CentreLink from "./CentreLink/CentreLink";
import OtherTaxable from "./OtherTaxable/OtherTaxable";
import Expenses from "./Expenses/Expenses";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const IncomeExpenses_Edit = () => {
  let Nev = useNavigate();

  return (
    <div className="container-fluid mt-4">
      <div className="row m-0 px-0">
        <div className="col-md-2"></div>
        <div className="col-md-12">

          <EmploymentDetail />

          <CentreLink />

          <OtherTaxable />

          <Expenses />

          {(localStorage.getItem("role") === "dev" || localStorage.getItem("role") === "test") &&

            <div className="row my-3">
              <div className="col-md-12">
                <Card className="shadow px-4 py-4">
                  <div className="row mt-5">
                    <div className="col-md-12">
                      <button
                        type="button"
                        className="float-end btn w-25  bgColor modalBtn"
                        onClick={() => Nev('/Professional-Advisors')}
                      >
                        Next
                      </button>
                      <button
                        type="button"
                        className="float-end btn btn-outline w-25 mx-3 backBtn modalBtn"
                        onClick={() => Nev(-1)}>
                        Back
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          }

        </div>
      </div>
    </div>
  );
};

export default IncomeExpenses_Edit;
