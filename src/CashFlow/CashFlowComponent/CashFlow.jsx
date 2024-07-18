import React, { useEffect, useState } from 'react'

import plus from "../Income&ExpenseComponents/PersonalDetails_CashFlow/images/plus.svg";
import { Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { openNotificationSuccess } from '../../Components/Assets/Api/Api';

const CashFlow = () => {

  let Obj = [
    {
      Title: "Income & Expenses",
      link: "/Income-And-Expenses-CashFlow"
    },
    {
      Title: "Personal Assets",
      link: "/Personal-Assets-CashFlow"
    },
    {
      Title: "Investments",
      link: "/Investments-CashFlow"
    },
    {
      Title: "Direct Property",
      link: "/Direct-Property"
    },
    {
      Title: "Super and Retirement",
      link: "/Super-And-Retirement-CashFlow"
    },
    {
      Title: "Investment",
      link: "/Investment-Trust-CashFlow"
    },
    {
      Title: "Self Manged Super Fund",
      link: "/SMSF-CashFlow"
    },
  ]

  let [hashId, setHashId] = useState();

  let Nev = useNavigate();

  let location = useLocation();
  let hash = location.hash;
  let oneOnly = 1;
  useEffect(() => {
    console.log(hash);
    if (hash) {
      if (oneOnly === 1) {
        if (hash !== "#null") {
          setHashId(hash);
        } else {
          openNotificationSuccess("info", 'topRight', "Notification", "You must select user first");
          Nev("/All-Clients")
        }
        oneOnly = oneOnly + 1;
      }
    }
  }, [location, hash])




  return (
    <div>
      <div className="container-fluid mt-4">
        <div className="row m-0 p-0 ">
          <div className="col-2 m-0 p-0 "></div>

          <div className="col-12 ">
            <Card className='py-4  shadow   borderOverAll  rounded '>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <h2 className="text-center">Cash Flow</h2>
                </div>
              </div>
              <div className="row justify-content-center">
                {Obj.map((elem, index) => {
                  let { Title, link } = elem
                  return (
                    <div className="col-md-3 p-1 my-2">
                      <div className='d-flex flex-column justify-content-center align-items-center'>
                        <h6 className="flex-1">{Title}</h6>
                        <button type="button" className="btn btn-outline-success flex-1"
                          onClick={() => { Nev(link + hashId) }}
                        >
                          <div className="iconContainer mx-1">
                            <img className="img-fluid" src={plus} alt="" />
                          </div>
                          Enter Details
                        </button>

                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CashFlow
