import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../Components/options.css";

import { useRecoilState } from "recoil";
import { OptionRender } from "../../Store/Store";
import { ConfigProvider, Steps } from "antd";
import {
  FaBriefcase,
  FaCheck,
  FaGift,
  FaKey,
  FaMoneyCheckDollar,
  FaMoneyBillWave,
  FaPlus,
  FaUser,
  FaChartLine,
  FaTriangleExclamation,
  FaGraduationCap,
  FaChartPie,
} from "react-icons/fa6";
import { FaHome, FaQuestionCircle } from "react-icons/fa";
import {
  MdFamilyRestroom,
  MdWaterDrop,
  MdOutlineBalance,
  MdOutlineTimeline,
} from "react-icons/md";
import { RiCoinsFill, RiDiscountPercentFill } from "react-icons/ri";
import { content } from "../../Content/Content";

function CashFlowReportOptions(props) {
  let [items, setItems] = useState([]);
  let { cashFlowReport } = content;

  useEffect(() => {
    let Opt = "Opt1";
    let stepComplete = 0;

    switch (props.step) {
      case 0:
        stepComplete = 10;
        break;
      case 1:
        stepComplete = 20;
        break;
      case 2:
        stepComplete = 30;
        break;
      case 3:
        stepComplete = 40;
        break;
      case 4:
        stepComplete = 50;
        break;
      case 5:
        stepComplete = 60;
        break;
      case 6:
        stepComplete = 70;
        break;
      default:
        stepComplete = 0;
        break;
    }

    const itemsToRender = cashFlowReport;

    let conditionCheck = true;

    const updatedItems = itemsToRender
      .filter((item) => item.condition(conditionCheck))
      .map((item) => {
        const iconMap = {
          FaBriefcase,
          FaCheck,
          FaGift,
          FaKey,
          FaMoneyCheckDollar,
          FaUser,
          FaHome,
          FaQuestionCircle,
          MdFamilyRestroom,
          RiCoinsFill,
          FaPlus,
          FaChartLine,
          MdWaterDrop,
          FaTriangleExclamation,
          RiDiscountPercentFill,
          MdOutlineBalance,
          FaGraduationCap,
          FaChartPie,
          MdOutlineTimeline,
          FaMoneyBillWave,
        };

        const IconComponent = iconMap[item.icon] || FaUser; // Default to FaUser if not found
        let isCurrentStep = props.step === item.stepNumber;

        let Status =
          stepComplete < item.statusStep
            ? "wait"
            : stepComplete > item.statusStep
            ? "finish"
            : "processing";

        return {
          ...item,
          icon: (
            <span
              className={`rounded-circle text-light ${
                isCurrentStep ? "bgColorIncomeBlack" : "bgColorIncome2"
              }`}
              role="button"
              onClick={() => {
                handleStepClick(item.stepNumber);
              }}
              style={{ height: "2rem", width: "6rem" }}
            >
              <IconComponent />
            </span>
          ),
          status: Status,
          subTitle: (
            <span
              style={{
                color: isCurrentStep ? "#000" : "#808080",
                fontSize: "12px",
                width: "100%",
                fontWeight: isCurrentStep ? "600" : "500",
              }}
            >
              {" "}
              {item.subTitle}{" "}
            </span>
          ),
        };
      });

    setItems(updatedItems);
  }, [props.step]);

  let handleStepClick = (selectedStep) => {
    props.setStep(selectedStep);
  };

  return (
    <div className="container-fluid ps-0">
      <div className="row m-0 px-0 pt-0 ">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12" style={{ padding: "10px 0px 0px 0px" }}>
              <div className="row">
                <div
                  className="col-md-12 overflow-auto customScroll"
                  style={{ padding: "0px 0px 0px 0px" }}
                >
                  <ConfigProvider
                    theme={{
                      components: {
                        Steps: {
                          customIconFontSize: 30,
                        },
                      },
                      token: {
                        colorPrimary: "#36b446",
                        fontSize: 12,
                        lineWidth: 4,
                      },
                    }}
                  >
                    <Steps
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

export default CashFlowReportOptions;
