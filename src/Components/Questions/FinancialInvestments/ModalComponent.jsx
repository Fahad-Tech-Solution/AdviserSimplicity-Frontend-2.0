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
import { ConfigProvider, Spin, Button as AntButton } from "antd";
import CustomLoadingBar from "./CustomLoadingBar";
import ImportantQuestion from "../ImportantQuestion/ImportantQuestion";

const ModalComponent = (props) => {
  const formRef = useRef(null); // Create a ref to store the form instance
  const childButtonRef = useRef(null);
  const childButtonDownloadRef = useRef(null);
  const intervalRef = useRef(null); // Store the interval reference
  const [progress, setProgress] = useRecoilState(Progress);

  const [showInnerModal, setShowInnerModal] = useState(false);
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
    "Important Questions",
    "Questions",
    "Investment Loan",
    "Margin Loan",
    "Personal Loan",
    "Credit Card",
    "Home Loan",
    "Family Home",
    "Holiday Home",
    "Holiday Home Loan",
    "Investment Properties",
    "Investment Property Loan",
    "Wills",
    "Power of Attorneys",
    "Professional Advisers",
    "Centerlink",
    "Sole Trader",
    "Partnership",
    "SMSF Details",
    "SMSF Investment Loan",
    "Investment Home Loan",
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
    "Investment Bonds",
    "Investment Loans (LOC)",
    "LifeTime Pension",
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
    "CDF Details",
    "Push Client On Adviser link",
  ]; // Add other  /ntitles that should use "xl" here

  let fullTitles = [
    "Employment",
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
    "Investments Property",
    "Super Fund",
    // "Annuities",
    // "Account Based Pension",
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

  let smallModal = props?.modalObject?.small || false;

  const size = smallModal
    ? ""
    : fullTitles.includes(props.modalObject?.title)
    ? "xxl"
    : xlTitles.includes(props.modalObject?.title)
    ? "xl"
    : xlKey.includes(props.modalObject?.key)
    ? "xl"
    : "lg";

  const shouldRenderSubmitButton = () => {
    const action = props?.modalObject?.Action?.toLowerCase();
    const title = props?.modalObject?.title;

    if (action === "view") return false;
    if (title === "Questions") return true;
    if (title === "Important Questions") return true;
    if (title !== "Questions" && isEditing === true) return true;

    return false;
  };

  let submitButtonRender = shouldRenderSubmitButton();

  let FooterButtonRender = props?.modalObject?.noFooter ? false : true;

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
          setIsEditing(false);
        }}
      >
        <Element id="modal-container"></Element>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.modalObject?.title === "Regular Living Expenses"
              ? props.modalObject?.title2 || props.modalObject?.title
              : props.modalObject?.title}
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
                handleOk,
                isEditing,
                setIsEditing,
              })
            : "no Child exist"}
        </Modal.Body>
        {FooterButtonRender && (
          <Modal.Footer>
            {!isEditing &&
              props.modalObject?.title !== "Questions" &&
              props.modalObject?.title !== "Important Questions" && (
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

            {props.modalObject?.title === "Questions" && (
              <AntButton
                htmlType="button"
                color="default"
                variant="filled"
                onClick={() => {
                  setShowInnerModal(true);
                }}
                style={{ padding: "18px" }}
              >
                Edit Important Questions
              </AntButton>
            )}

            {submitButtonRender && (
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
        )}
      </Modal>
      {showInnerModal && (
        <ModalComponent
          flagState={showInnerModal}
          setFlagState={setShowInnerModal}
          modalObject={{ title: "Important Questions" }}
        >
          <ImportantQuestion />
        </ModalComponent>
      )}
    </div>
  );
};

export default ModalComponent;
