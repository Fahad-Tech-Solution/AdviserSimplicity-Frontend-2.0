import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { scroller, Element } from "react-scroll";
import { FaDownload, FaInfoCircle } from "react-icons/fa";
import {
  CashFlowDownloading,
  CashFlowReCalculateLoading,
  Progress,
} from "../../../Store/Store";
import { useRecoilState } from "recoil";
import { ConfigProvider, Spin } from "antd";
import CustomLoadingBar from "./CustomLoadingBar";

const ModalComponent = (props) => {
  const formRef = useRef(null); // Create a ref to store the form instance
  const childButtonRef = useRef(null);
  const childButtonDownloadRef = useRef(null);
  const intervalRef = useRef(null); // Store the interval reference
  const [progress, setProgress] = useRecoilState(Progress);

  let [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);

  let [cashFlowDownloading, setCashFlowDownloading] =
    useRecoilState(CashFlowDownloading);

  const handleOk = () => {
    if (formRef.current) {
      formRef.current.handleSubmit(); // Trigger Formik's handleSubmit
      setProgress(0);
      setCashFlowReCalculateLoading(false);
      setCashFlowDownloading(false);
    }
  };

  const handleParentButtonClick = () => {
    if (childButtonRef.current) {
      setCashFlowReCalculateLoading(true);
      childButtonRef.current.click();
    }

    // Clear any existing interval before starting a new one
    if (intervalRef.current) clearInterval(intervalRef.current);

    let progressValue = 10;
    setProgress(progressValue); // Start progress at 10%

    intervalRef.current = setInterval(() => {
      progressValue += 5;
      if (progressValue < 95) {
        setProgress(progressValue);
      }
    }, 1000); // Change to 1 second for smoother progress
  };

  const handleParentButton2Click = () => {
    if (childButtonDownloadRef.current) {
      setCashFlowDownloading(true);
      childButtonDownloadRef.current.click();
    }

    // Clear any existing interval before starting a new one
    if (intervalRef.current) clearInterval(intervalRef.current);

    let progressValue = 10;
    setProgress(progressValue); // Start progress at 10%

    intervalRef.current = setInterval(() => {
      progressValue += 5;
      if (progressValue < 95) {
        setProgress(progressValue);
      }
    }, 1000); // Change to 1 second for smoother progress
  };

  useEffect(() => {
    if (!cashFlowReCalculateLoading) {
      clearInterval(intervalRef.current);
      setProgress(0);
    }
  }, [cashFlowReCalculateLoading]);

  useEffect(() => {
    if (!cashFlowDownloading) {
      clearInterval(intervalRef.current);
      setProgress(0);
    }
  }, [cashFlowDownloading]);

  let flagState = props.flagState;
  let setFlagState = props.setFlagState;
  let modalObject = props.modalObject;
  let setQuestionChange = props.setQuestionChange;

  useEffect(() => {
    // console.log("Ma chala a a a ", props.Question)
    // Scroll to the header of the modal whenever props.Question changes
    scroller.scrollTo("modal-header", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      containerId: "modal-container",
    });
  }, [props.setQuestionChange, props.Question]);

  const xlTitles = [
    "Questions",
    "Employement Income",
    // "Australian Shares",
    // "Managed Funds",
    // "Investment Bond",
    "Investment Loan",
    "Margin Loan",
    "Personal Loan",
    "Credit Card",
    "Home Loan",
    "Own a Family Home",
    "Holiday Home",
    "Holiday Home Loan",
    "Investment Properties",
    "Investment Property Loan",
    // "Super Funds",
    // "Account Based Pension",
    // "invested in Annuities",
    "Wills",
    "Power of Attorneys",
    "Professional Advisers",
    "Centerlink Payments",
    "Sole Trader",
    "Partnership",
    "SMSF Details",
    "SMSF Investment Loan",
    "Investment Home Loan",
    // "Business as Company Structure",
    // "Business as Trusts",
    "Family Trust Details",
    "Family Trust Investment Loan",
    "Goals and Objectives Questions",
    "Set up a Budget",
    "Pay off Credit Card/Debt",
    "Protect my Lifestyle & Family",
    "Take a Holiday",
    "Buy a Car",
    "Accumulate Emergency Fund",
    "Regular Savings Plan",
    "Buy a House",
    "Buy a Boat",
    "Buy a Carvan",
    "Upgrade Family Home",
    "Renovate Family Home",
    "Downsize Family Home",
    "Buy an Investment Property",
    "Pay off Home Loan",
    "Start a Business",
    "Save for Children’s Education",
    "Plan for Retirement",
    "Start a Family",
    "Care for Ageing Family Member",
    "Receive an Inheritance",
    "Leave an Inheritance",
    "Eligibility to Centrelink",
    "Set up a Family Trust",
    "Set up an SMSF",
    "Save for a Wedding",
    "Estate Planning",
    "Set up an Investment Portfolio",
    "Review Investment Portfolio",
    "Pay Less Tax",
    "Ongoing Financial Advice",
    "Review my Super",
    "Combine my Super into One",
    "Contribute Money into Super",
    "Generate a Retirement Income Stream",
    "Set up a Super Income Stream",
    "Review your Current Personal Insurance Cover",
    "Analysis of your Personal Insurance needs",
    "Retain Current Personal Insurances as is",
    "Reduce my Current Personal Insurance Cover",
    "Advice on Surplus Income",
    "Investment Home",
    "Investment Home Loan",
    "Investment Home Expanse",
    "Family Investment Home",
    "Family Investment Home Loan",
    "Family Investment Home Expanse",
    "Personal Loans",
    "Australian Shares",
    "Platform Investment",
    "Other Investments",
    "Cash",
    "Term Deposits",
    "Investment Bonds",
    "Investment Loans (LOC)",
    "Lifetime Benefits",
    "SMSF Accumulation Details",
    "SMSF Bank",
    "SMSF Term Deposit",
    "SMSF Australian Shares",
    "SMSF Platform Investment",
    "SMSF",
    "Family Trust Term Deposits",
    "Family Trust Australian Shares",
    "Family Trust Platform Investment",
    "Family Trust",
    "SMSF Pension Account Details",
    "CDF Details"
  ]; // Add other titles that should use "xl" here

  let fullTitles = [
    "Family Trust Investment Loan",
    "Family Details",
    "Life Insurance",
    "Personal Insurance",
    "Investment Loan",
    "Margin Loan",
    "SMSF Details",
    "SMSF Investment Properties",
    "SMSF Platform Investments Detail",
    "Family Trust Investment Property",
    "SMSF Investment Loan",
    "Education Expenses",
    "Centrelink Payments/Benefits",
    "Own a Family Home",
    "Employment Income",
    "Investments Property",
    "Super Fund",
    "Annuities",
    "Account Based Pension",
    "Family Trust Investment Properties",
  ];

  let xlKey = [
    "CFQ",
    "cashFlowIncomeFromOverseasPension",
    "otherNonTaxable",
    "businessIncome",
    "RegularLivingExpenses",
    "cashFlowLifetimeBenefit",
    "incomeFromPartnership",
    "incomeFromSoleTrader",
    "car",
  ];

  let smallModal = props.modalObject.small || false;

  const size = smallModal
    ? ""
    : fullTitles.includes(props.modalObject.title)
    ? "xxl"
    : xlTitles.includes(props.modalObject.title)
    ? "xl"
    : xlKey.includes(props.modalObject.key)
    ? "xl"
    : "lg";

  return (
    <div>
      <Modal
        dialogClassName={size === "xxl" && "modal-90w"}
        size={size === "xxl" ? "" : size}
        backdrop="static"
        keyboard={false}
        centered
        show={props.flagState}
        onHide={() => {
          props.setFlagState(false);
          setProgress(0);
          setCashFlowReCalculateLoading(false);
          setCashFlowDownloading(false);
        }}
      >
        <Element id="modal-container"></Element>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.modalObject.title === "Regular Living Expenses"
              ? props.modalObject.title2 || props.modalObject.title
              : props.modalObject.title}
          </Modal.Title>
        </Modal.Header>
        {progress !== 0 && <CustomLoadingBar progress={progress} />}
        <Modal.Body>
          {props.children
            ? React.cloneElement(props.children, {
                formRef,
                flagState,
                setFlagState,
                modalObject,
                setQuestionChange,
                childButtonRef,
                childButtonDownloadRef,
              })
            : "no Child exist"}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ width: "12.5%", minWidth: "fit-content" }}
            onClick={() => {
              props.setFlagState(false);
              setProgress(0);
              setCashFlowReCalculateLoading(false);
              setCashFlowDownloading(false);
            }}
          >
            Close
          </Button>

          {props.modalObject?.cal && (
            <Button
              variant="secondary"
              style={{ width: "12.5%", minWidth: "fit-content" }}
              onClick={handleParentButtonClick}
              disabled={cashFlowReCalculateLoading}
            >
              <FaInfoCircle size={14} style={{ marginBottom: "4px" }} />{" "}
              Re-Calculate
              {cashFlowReCalculateLoading && (
                <ConfigProvider
                  theme={{
                    token: {
                      /* here is your global tokens */
                      colorPrimary: "#fff",
                    },
                  }}
                >
                  &nbsp; <Spin size="small" />
                </ConfigProvider>
              )}
            </Button>
          )}

          {props.modalObject?.cal && (
            <Button
              variant="secondary"
              style={{ width: "fit-content", minWidth: "fit-content" }}
              onClick={handleParentButton2Click}
              disabled={cashFlowDownloading}
            >
              {cashFlowDownloading ? (
                <ConfigProvider
                  theme={{
                    token: {
                      /* here is your global tokens */
                      colorPrimary: "#fff",
                    },
                  }}
                >
                  <Spin size="small" />
                </ConfigProvider>
              ) : (
                <FaDownload size={14} style={{ marginBottom: "4px" }} />
              )}
            </Button>
          )}

          <button
            type="button"
            className="btn bgColor modalBtn"
            style={{ width: "12.5%", minWidth: "fit-content" }}
            onClick={handleOk}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalComponent;
