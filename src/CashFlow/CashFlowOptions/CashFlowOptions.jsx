import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../../Components/options.css';

import { useRecoilState, useRecoilValue } from "recoil";
import { UserName, CurrentPage, OptionRender, CRState, StepsStatus } from "../../Store/Store";
import { Breadcrumb, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleUser, faMoon } from "@fortawesome/free-solid-svg-icons";
import { ConfigProvider, Steps } from "antd";
import { FaBriefcase, FaCheck, FaGift, FaKey, FaMoneyCheckDollar, FaMoneyBillWave, FaPlus, FaUser, FaChartLine, FaTriangleExclamation, FaGraduationCap, FaChartPie } from "react-icons/fa6";
import { FaHome, FaQuestionCircle } from "react-icons/fa";
import { MdFamilyRestroom, MdWaterDrop, MdOutlineBalance, MdOutlineTimeline } from "react-icons/md";
import { RiCoinsFill, RiDiscountPercentFill } from "react-icons/ri";
import { content } from "../../Content/Content";

function CashFlowOptions(props) {
    let Nev = useNavigate();

    let [userName] = useRecoilState(UserName); // eslint-disable-line no-unused-vars
    let [CurrentP] = useRecoilState(CurrentPage);
    let [optRender, setOptRender] = useRecoilState(OptionRender);
    let CRObject = useRecoilValue(CRState);

    let [leftPadding, setLeftPadding] = useState("18rem");
    let [currentTabName, setCurrentTabName] = useState("Home");

    let [stepCompleted, setStepCompleted] = useState(8);
    let [currentPCLassSwitch, setCurrentPCLassSwitch] = useState("PersonalDetail");

    let [items, setItems] = useState([]);
    let { cashFlow } = content;

    let stepsStatus = useRecoilValue(StepsStatus); // eslint-disable-line no-unused-vars

    let location = useLocation();

    useEffect(() => {
        let cLocation = location.pathname.replace("/", "");
        // console.log(location.pathname, cLocation);

        let Opt = "Opt1"
        let stepComplete = 0;

        setCurrentPCLassSwitch(cLocation.trim());

        switch (cLocation) {
            case "Cash-Flow/PersonalDetail":
                stepComplete = 0;
                break
            case "Cash-Flow/Income-And-Expenses":
                stepComplete = 10;
                break
            case "Cash-Flow/Personal-Assets":
                stepComplete = 20;
                break
            case "Cash-Flow/Investments":
                stepComplete = 30;
                break
            case "Cash-Flow/Direct-Property":
                stepComplete = 40;
                break
            case "Cash-Flow/Super-and-Retirement":
                stepComplete = 50;
                break
            case "Cash-Flow/Investment":
                stepComplete = 60;
                break
            case "Cash-Flow/SMSF":
                stepComplete = 70;
                break
            default:
                let a = cLocation.split('/')[0];
                setCurrentTabName(a.replaceAll("-", " "));
                break;
        }

        setOptRender(Opt)
        setStepCompleted(stepComplete);

        const itemsToRender = cashFlow;

        let conditionCheck = true

        const updatedItems = itemsToRender.filter(item => item.condition(conditionCheck)).map(item => {

            const isPersonalDetails = item.subTitle === 'Personal Details';
            const currentEmail = localStorage.getItem("UserID");

            const iconMap = {
                FaBriefcase, FaCheck, FaGift, FaKey, FaMoneyCheckDollar, FaUser, FaHome, FaQuestionCircle, MdFamilyRestroom, RiCoinsFill, FaPlus, FaChartLine,
                MdWaterDrop, FaTriangleExclamation, RiDiscountPercentFill, MdOutlineBalance, FaGraduationCap, FaChartPie, MdOutlineTimeline, FaMoneyBillWave
            };

            const IconComponent = iconMap[item.icon] || FaUser; // Default to FaUser if not found
            let isCurrentStep = cLocation === "Cash-Flow" + item.route;


            let Status = stepComplete < item.statusStep ? "wait" : stepComplete > item.statusStep ? "finish" : 'processing';

            return {
                ...item,
                icon: (
                    <span
                        className={`rounded-circle text-light ${isCurrentStep ? "bgColorIncomeBlack" : "bgColorIncome2"}`}
                        role="button"
                        onClick={() => {
                            handleStepClick(`/Cash-Flow${item.route}`)
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

    }, [location, CRObject])

    let handleStepClick = (props) => {
        if (!stepsStatus) {
            Nev(props)
        }
    }


    return (
        <div className="container-fluid ps-md-5 ps-0" >
            <div className="row m-0 px-0 pt-0 ">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12" style={{ padding: "10px 0px 0px 0px" }}>
                            <div className="row">
                                <div className="col-md-12 overflow-auto customScroll" style={{ padding: "20px 30px 0px 0px" }}>
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
                                            // items={optRender === 'Opt1' ? cashFlow1 : optRender === 'Opt2' ? cashFlow2 : optRender === 'Opt3' ? cashFlow1 : cashFlow2}
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
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CashFlowOptions;
