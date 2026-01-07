import { ConfigProvider, Spin, Modal as AntDModal } from "antd";
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
import { RenderName } from "../../../Assets/Api/Api";

const InnerModal = (props) => {
  const { confirm } = AntDModal;
  const formRef = useRef(null); // Create a ref to store the form instance
  const childButtonRef = useRef(null);
  const childButtonDownloadRef = useRef(null);
  const intervalRef = useRef(null); // Store the interval reference
  const [progress, setProgress] = useRecoilState(Progress);
  const [isEditing, setIsEditing] = useState(false);
  const { noFooter = false } = props.modalObject;

  let [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);

  let [cashFlowDownloading, setCashFlowDownloading] =
    useRecoilState(CashFlowDownloading);

  const handleOk = async () => {
    if (formRef.current) {
      let submit = await formRef.current.handleSubmit(); // Trigger Formik's handleSubmit
      props.setIsEditing(true);
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
    "Member Number",
    "Insurances Attached",
    "Balance & Benefit",
    "Australian Shares/ETFs",
    "Managed Funds",
    "Super Funds",
    "Investment Bond",
    "Invested in Annuities",
    "Property Loan",
    "Risk Goals",
    "Pension Benefits",
    "Business as Trusts",
    "SMSF_Australian Shares/ETFs ",
    "Family Trust Platform Investments",
    "Trust_Australian Shares/ETFs ",
    "Reduced Salary Income",
    "Salary Packaging Car",
    "Accumulation Details",
    "Beneficiaries",
    "Platform Investments",
    "Salary Detail",
    "Salary Packaging",
    "Group Cover",
    "Portfolio Value",
    "Directors Of Bare Trust",
    "Life",
  ]; // Add other titles that should use "xl" here

  const xlKeys = [
    "balanceBenefit",
    "groupInsurance",
    "premiumsDetails",
    "sumInsured",
    "beneficiaries",
    "totalCostBase",
    "BusinessAsTrusts",
  ]; // Add other titles that should use "xl" here

  const fullKeys = ["pensionBenefits"]; // Add other titles that should use "xl" here

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
    "SMSF Platform Investments Detail",
    "Loan Balance",
    "Concessional Contributions",
    "Non Concessional Contributions",
    "Balance & Rollover Amount",
    "Pension Payments",
    "New Pension Rollover",
    "Home Loan",
    "Balance Rollover Amount",
    "Group Insurance",
    "Super Funds",
    "Account Based Pension",
    "Annuities",
    "Business as Company Structure",
    "Business as Trusts Structure",
    "Balnace and Benefits",
    "Contributions",
    "Group Cover Details",
    "TPD",
    "Trauma",
    "Income Protection",
    "Lumpsum Cover (Life/TPD/Trauma)",
    "Premiums p.a",
    "Accumulation Benefits",
    "Salary Packaging Car",
    "Balance & Components",
    "Insurance Premiums",
    "Contribution Splitting",
  ];

  let mdTitles = [
    "Other Percentage Amount",
    "Trustee Name",
    "Company Directors",
    "Loading/Exclusion",
  ];

  let [size, setSize] = useState("md");

  useEffect(() => {
    if (props.modalObject && props.modalObject.title) {
      let currentTitle = props.modalObject.title;

      if (currentTitle.includes("_")) {
        currentTitle = currentTitle.split("_").slice(1)[
          currentTitle.split("_").slice(1).length - 1
        ];
      }

      let modalSize = "lg"; // Default size

      if (
        fullTitles.includes(currentTitle) ||
        fullKeys.includes(props.modalObject.key)
      ) {
        modalSize = "xxl";
      } else if (xlTitles.includes(currentTitle)) {
        modalSize = "xl";
      } else if (xlKeys.includes(props.modalObject.key)) {
        modalSize = "xl";
      } else if (mdTitles.includes(currentTitle)) {
        modalSize = "md";
      }

      if (currentTitle === "Risk Goals") {
        setIsEditing(true);
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
          const resetFlags = () => {
            props.setFlagState(false);
            setProgress(0);
            setCashFlowReCalculateLoading(false);
            setCashFlowDownloading(false);
            setIsEditing(false);
          };

          if (!isEditing || props.modalObject.title === "Risk Goals") {
            resetFlags();
            return false;
          }

          confirm({
            title: "Discard changes?",
            content:
              "You have unsaved changes. If you close now, all unsaved changes will be lost. Do you want to discard them?",
            okText: "Discard",
            okType: "danger",
            cancelText: "Keep Editing",
            centered: true,
            onOk: async () => {
              props.setFlagState(false);
              setProgress(0);
              setCashFlowReCalculateLoading(false);
              setCashFlowDownloading(false);
              setIsEditing(false);
            },
          });
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
        {!noFooter && (
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
                // disabled={cashFlowReCalculateLoading}
                disabled={true}
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
                // disabled={cashFlowDownloading}
                disabled={true}
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
                Confirm & Exit
              </button>
            )}
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default InnerModal;

// {props.Question ? Question : "Submit"}
