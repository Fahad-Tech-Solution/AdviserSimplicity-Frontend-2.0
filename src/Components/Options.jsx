import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './options.css';

import { useRecoilState } from "recoil";
import { UserName, CurrentPage, OptionRender } from "../Store/Store";
import { Breadcrumb, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleUser, faMoon } from "@fortawesome/free-solid-svg-icons";
import { ConfigProvider, Steps } from "antd";
import { FaBriefcase, FaCheck, FaGift, FaKey, FaMoneyCheckDollar, FaUser } from "react-icons/fa6";
import { FaHome, FaQuestionCircle } from "react-icons/fa";

import { RiCoinsFill } from "react-icons/ri";

function Options(props) {

  let [userName] = useRecoilState(UserName); // eslint-disable-line no-unused-vars
  let [CurrentP] = useRecoilState(CurrentPage);
  let [optRender, setOptRender] = useRecoilState(OptionRender);

  let [leftPadding, setLeftPadding] = useState("18rem");

  useEffect(() => {
    if (props.SidebarSwitch === true) {
      // alert(props.SidebarSwitch );
      setLeftPadding("5rem");
    }
    else {
      // alert(props.SidebarSwitch );
      setLeftPadding("18rem");
    }
  }, [props.SidebarSwitch])

  let location = useLocation();

  useEffect(() => {
    console.log(location)
  }, [location])


  useEffect(() => {
    if (localStorage.getItem('OptionRender')) {
      setOptRender(localStorage.getItem('OptionRender'));
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const itemsOpt1 = [
    {
      subTitle: 'Personal Details',
      status: 'processing',
      icon: <FaUser height={100} width={100} />,
    },
    {
      subTitle: 'Personal Income and Expenses',
      status: 'wait',
      icon: <FaMoneyCheckDollar height={100} width={100} />,
    },
    {
      subTitle: 'Personal Assets and Debt',
      status: 'wait',
      icon: <FaHome height={100} width={100} />,
    },
    {
      subTitle: 'Financial Investments',
      status: 'wait',
      icon: <RiCoinsFill height={100} width={100} />,
    },
    {
      subTitle: 'Property',
      status: 'wait',
      icon: <FaKey height={100} width={100} />,
    },
    {
      subTitle: 'Estate Planning & Professional Advisers',
      status: 'wait',
      icon: <FaQuestionCircle height={100} width={100} />,
    },
    // {
    //   subTitle: 'Investments',
    //   status: 'wait',
    //   icon: <FaHome height={100} width={100} />,
    // }
  ];

  const itemsOpt2 = [
    {
      subTitle: 'Personal Insurance',
      status: 'finish',
      icon: <span className="rounded-circle bgColorIncome2 text-light" style={{ height: "2rem", width: "6rem" }}><FaMoneyCheckDollar height={100} width={100} /></span>,
    },
    {
      subTitle: 'Business Entities',
      status: 'wait',
      icon: <span className="rounded-circle bgColorIncome2 text-light" style={{ height: "2rem", width: "6rem" }}><FaBriefcase height={100} width={100} /></span>,
    },
    {
      subTitle: 'SMSF',
      status: 'wait',
      icon: <span className="rounded-circle bgColorIncome2 text-light" style={{ height: "2rem", width: "6rem" }}><FaGift height={100} width={100} /></span>,
    },
    {
      subTitle: 'Investment Trust',
      status: 'wait',
      icon: <span className="rounded-circle bgColorIncome2 text-light" style={{ height: "2rem", width: "6rem" }}><FaCheck height={100} width={100} /></span>,
    },
    {
      subTitle: 'Goals and objectives section',
      status: 'wait',
      icon: <span className="rounded-circle bgColorIncome2 text-light" style={{ height: "2rem", width: "6rem" }}><FaCheck height={100} width={100} /></span>,
    }
  ];


  if (['/', '/Goals-And-Objectives', '/Risk-Profile', '/All-Clients'].includes(CurrentP)) {
    return (
      <div className="container-fluid" id="OptionsBar" style={{ paddingLeft: leftPadding }}>


        <div className="container-fluid" style={{ marginLeft: "1.8rem" }}>

          <div className="row pe-4">
            <div className="col-md-12 p-0">
              <div className="Top_Nav">
                <div className="d-flex justify-content-between">
                  <div>
                    <Breadcrumb className="BreadcrumbCustom">
                      <Breadcrumb.Item active linkAs={Link} linkProps={{ to: '/' }} className="p-0 m-0 DMFamily">Pages</Breadcrumb.Item>
                      <Breadcrumb.Item active linkAs={Link} linkProps={{ to: '/' }} className="p-0 m-0 DMFamily">Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <h5 className="Page DMFamily">Home</h5>
                  </div>
                  <div className="rightBlock">
                    <FontAwesomeIcon icon={faMoon} className="moon" />
                    <FontAwesomeIcon icon={faCircleUser} className="user" />
                    <FontAwesomeIcon icon={faBars} className="menu" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="container-fluid ps-5" >

        <div className="row m-0 px-0 pt-0 ">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12" style={{ padding: "10px 0px 0px 1.5px" }}>
                <div className="row">
                  <div className="col-md-12 " style={{ padding: "20px 20px 20px 20px" }}>
                    <ConfigProvider
                      theme={{
                        components: {
                          Steps: {
                            // iconSize: 20
                          },
                        },
                        token: {
                          /* here is your global tokens */
                          colorPrimary: "#36b446",
                          fontSize: 12,
                          lineWidth: 4,
                        },
                      }}
                    >

                      <Steps
                        items={optRender === 'Opt1' ? itemsOpt1 : optRender === 'Opt2' ? itemsOpt2 : optRender === 'Opt3' ? itemsOpt1 : itemsOpt2}
                        labelPlacement={"vertical"}
                        initial={0}
                        responsive={false}
                        status={"process"}
                      />
                    </ConfigProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }

}

export default Options;
