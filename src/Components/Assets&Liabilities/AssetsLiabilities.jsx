import React from 'react'
import PersonalLoanComponent from './PersonalLoanComponent/PersonalLoanComponent';
import AssetsInheritance from './AssetsInheritance/AssetsInheritance';
import FamilyHome from './FamilyHome/FamilyHome';
import PersonalAssetsLiabilities from './Personal Assests/PersonalAssets';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const AssetsLiabilities = () => {
  let Nev = useNavigate();
  return (
    <div className="container-fluid mt-4">
      <div className="row m-0 px-0">
        <div className="col-md-2"></div>
        <div className="col-md-12">
          <FamilyHome />
          <PersonalAssetsLiabilities />
          <PersonalLoanComponent />
          <AssetsInheritance />

          {(localStorage.getItem("role") === "dev" || localStorage.getItem("role") === "test") &&

            <div className="row my-3">
              <div className="col-md-12">
                <Card className="shadow px-4 py-4">
                  <div className="row mt-5">
                    <div className="col-md-12">
                      <button
                        type="button"
                        className="float-end btn w-25  bgColor modalBtn"
                        onClick={() => Nev('/Investments')}
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
}

export default AssetsLiabilities

