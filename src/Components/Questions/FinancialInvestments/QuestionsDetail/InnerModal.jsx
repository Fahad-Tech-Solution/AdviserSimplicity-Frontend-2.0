import { ConfigProvider, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaDownload, FaInfoCircle } from "react-icons/fa";
import { scroller, Element } from "react-scroll";
import { useRecoilState } from "recoil";
import {
  CashFlowDownloading,
  CashFlowReCalculateLoading,
  Progress,
} from "../../../../Store/Store";
import CustomLoadingBar from "../CustomLoadingBar";

const InnerModal = (props) => {
  const formRef = useRef(null); // Create a ref to store the form instance
  const childButtonRef = useRef(null);
  const childButtonDownloadRef = useRef(null);
  const intervalRef = useRef(null); // Store the interval reference
  const [progress, setProgress] = useRecoilState(Progress);
  const [isEditing, setIsEditing] = useState(false);

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
  let setFieldValue = props.setFieldValue;
  let setFlagState = props.setFlagState;
  let modalObject = props.modalObject;
  let setQuestionChange = props.setQuestionChange;

  const xlTitles = [
    "Member Number & Details",
    "Insurances Attached",
    "Pension Benefits",
    "Balance & Benefit Details",
    // "Home Loan",
    "Australian Shares/ETFs Detail",
    "Managed Funds Detail",
    "Super Funds Detail",
    "Investment Bond Detail",
    // "Account Based Pension Detail",
    "Invested in Annuities Detail",
    "Property Loan Details",
    "Risk Goals",
    "Business as Company Structure Detail",
    "Business as Trusts",
    "Pension Benefits Details",
    "SMSF Australian Shares/ETFs Detail",
    "Family Trust Platform Investments Detail",
    "Family Trust Australian Shares/ETFs Detail",
    "Reduced Salary Income",
    "Salary Packaging Car",
    "Accumulation Details",
    "Salary Packaging",
    // "Balance Rollover Amount"
    // "Insurance Premiums"
    // "Portfolio Value"
    // "Bank Accounts Detail"
  ]; // Add other titles that should use "xl" here

  const xlKeys = [
    "balanceBenefit",
    "groupInsurance",
    "premiumsDetails",
    "sumInsured",
    "beneficiaries",
    "totalCostBase",
    // "ContributionsArray"
    // "Bank Accounts Detail"
  ]; // Add other titles that should use "xl" here

  let fullTitles = [
    "Platform Investments Detail",
    "Balance & Benefit Details",
    "Annuities Detail",
    "Property Loan Details",
    "Expense Details",
    "Super Funds Detail",
    "Account Based Pension Detail",
    "SMSF Accumulation Details",
    "Accumulations Benefits",
    "Pension Benefits",
    "Salary Detail",
    "SMSF Platform Investments Detail",
    "Loan Balance",
    "Concessional Contributions",
    "Non Concessional Contributions",
    "Balance & Rollover Amount",
    "Pension Payments",
    "New Pension Rollover",
    "Home Loan",
    "Balance Rollover Amount",
  ];

  let mdTitles = ["Other Percentage Amount"];

  let [size, setSize] = useState("md");

  useEffect(() => {
    if (props.modalObject && props.modalObject.title) {
      let currentTitle = props.modalObject.title;

      if (currentTitle.includes("_")) {
        currentTitle = currentTitle.split("_").slice(1)[0];
      }

      let modalSize = "lg"; // Default size

      if (fullTitles.includes(currentTitle)) {
        modalSize = "xxl";
      } else if (xlTitles.includes(currentTitle)) {
        modalSize = "xl";
      } else if (xlKeys.includes(props.modalObject.key)) {
        modalSize = "xl";
      } else if (mdTitles.includes(currentTitle)) {
        modalSize = "md";
      }

      setSize(modalSize);
    }
  }, [props.modalObject]);

  return (
    <div>
      <Modal
        dialogClassName={size === "xxl" && "modal-90w"}
        size={size === "xxl" ? "" : size}
        backdrop="static"
        keyboard={false}
        // centered
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
          <Modal.Title>{props.modalObject.title}</Modal.Title>
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
                setFieldValue,
                childButtonRef,
                childButtonDownloadRef,
                handleOk,
                isEditing,
                setIsEditing,
              })
            : "no Child exist"}
        </Modal.Body>

        <Modal.Footer>
          {!isEditing && (
            <Button
              variant="secondary"
              style={{ width: "12.5%", minWidth: "fit-content" }}
              className="heartbeat"
              onClick={() => {
                if (!isEditing) {
                  setIsEditing(!isEditing);
                  return;
                }
              }}
            >
              Edit
            </Button>
          )}

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
          {isEditing && (
            <button
              type="button"
              className="btn bgColor modalBtn"
              style={{ width: "12.5%", minWidth: "fit-content" }}
              onClick={handleOk}
            >
              Save & Exit
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InnerModal;

// {props.Question ? Question : "Submit"}
