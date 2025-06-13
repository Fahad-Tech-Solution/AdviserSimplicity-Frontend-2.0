import { faBars, faCircleUser, faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ConfigProvider, Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { content } from '../../Content/Content'

import { FaCertificate, FaMoneyBillWave, FaUser, FaUserShield } from "react-icons/fa6";
import { RiCoinsFill, RiDiscountPercentFill } from "react-icons/ri";
import { MdFamilyRestroom, MdWaterDrop, MdOutlineBalance, MdOutlineTimeline } from "react-icons/md";
import { BiDollarCircle } from 'react-icons/bi'

const AdminTopMenu = (props) => {


    // let [currentPCLassSwitch, setCurrentPCLassSwitch] = useState("Admin Panel");

    // let [currentTabName, setCurrentTabName] = useState("Admin Panel");

    let [items, setItems] = useState([]);
    let { superAdmin } = content;

    let location = useLocation();

    useEffect(() => {
        let cLocation = (location.pathname === "/SuperAdmin" || location.pathname === "/SuperAdmin/") ? "" : location.pathname.replace("/SuperAdmin/", "");
        console.log(location.pathname, cLocation);

        let stepComplete = 0;

        switch (cLocation) {
            case "InvestmentPlatforms":
                stepComplete = 10;
                break;
            case "InvestmentBonds":
                stepComplete = 20;
                break;
            case "SuperannuationFunds":
                stepComplete = 30;
                break;
            case "AccountBasedPensions":
                stepComplete = 40;
                break;
            case "Annuities":
                stepComplete = 50;
                break;
            case "PersonalInsurances":
                stepComplete = 60;
                break;
            default:
                stepComplete = 0;
                break;
        }

        const itemsToRender = superAdmin

        let conditionCheck = true

        const updatedItems = itemsToRender.filter(item => item.condition(conditionCheck)).map(item => {

            const iconMap = {
                FaUser, RiCoinsFill, MdFamilyRestroom, FaCertificate, FaMoneyBillWave, FaUserShield, BiDollarCircle, RiDiscountPercentFill
            };

            const IconComponent = iconMap[item.icon] || FaUser; // Default to FaUser if not found
            let isCurrentStep = cLocation === item.route.replace("/", "");

            let Status = stepComplete < item.statusStep ? "wait" : stepComplete > item.statusStep ? "finish" : 'processing';

            return {
                ...item,
                icon: (
                    <span
                        className={`rounded-circle text-light ${isCurrentStep ? "bgColorIncomeBlack" : "bgColorIncome2"}`}
                        role="button"
                        onClick={() => {
                            handleStepClick(`/SuperAdmin${item.route}`)
                        }}
                        style={{ height: "2rem", width: "6rem" }}
                    >
                        <IconComponent />
                    </span>
                ),
                status: Status,
                subTitle: (<span style={{ color: isCurrentStep ? "#000" : "#808080", fontSize: "12px", width: "100%", fontWeight: isCurrentStep ? "600" : "500" }}> {item.subTitle} </span>)
            };
        });

        setItems(updatedItems);

    }, [location])

    let Nev = useNavigate();
    let handleStepClick = (props) => {
        Nev(props)
    }

    return (
        <div className="container-fluid overflow-hidden" >
            <div className="row">
                <div className="col-md-12" style={{ padding: "20px 0px 0px 0px" }}>
                    <ConfigProvider
                        theme={{
                            components: {
                                Steps: {
                                    customIconFontSize: 30,
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
                            // items={optRender === 'Opt1' ? itemsOpt1 : optRender === 'Opt2' ? itemsOpt2 : optRender === 'Opt3' ? itemsOpt1 : itemsOpt2}
                            items={items}
                            labelPlacement={"vertical"}
                            initial={0}
                            responsive={false}
                            status={"process"}

                        />

                    </ConfigProvider>
                </div>
            </div>
        </div>

    );


    // return (
    //     <div className="container-fluid position-relative" id="OptionsBar">
    //         <div className="container-fluid" style={{ marginLeft: "0.1rem" }}>

    //             <div className="row pe-2">
    //                 <div className="col-md-12 p-0">
    //                     <div className="Top_Nav">
    //                         <div className="d-flex justify-content-between">
    //                             <div>
    //                                 <Breadcrumb className="BreadcrumbCustom">
    //                                     <Breadcrumb.Item active linkAs={Link} linkProps={{ to: '/' }} className="p-0 m-0 LeagueSpartanFamily">Dashboard</Breadcrumb.Item>
    //                                     <Breadcrumb.Item active linkAs={Link} linkProps={{ to: '/' }} className="p-0 m-0 LeagueSpartanFamily">{currentPCLassSwitch}</Breadcrumb.Item>
    //                                 </Breadcrumb>
    //                                 <h5 className="Page LeagueSpartanFamily">{currentTabName || "Dashboard"}</h5>
    //                             </div>
    //                             <div className="rightBlock">
    //                                 <FontAwesomeIcon icon={faBars} role='button' className="" onClick={() => { props.setCollapsed(!props.collapsed) }} style={{ fontSize: "30px", }} />
    //                                 <FontAwesomeIcon icon={faCircleUser} className="user" role='button' style={{ fontSize: "35px" }} />
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )

}

export default AdminTopMenu
