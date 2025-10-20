<<<<<<< HEAD
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, InputGroup, Row, Table } from "react-bootstrap";
=======
import { Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
>>>>>>> origin/master
import { useRecoilValue } from "recoil";
import {
  BankDetail,
  defaultUrl,
  QuestionDetail,
} from "../../../../Store/Store";
import {
  openNotificationSuccess,
  toCommaAndDollar,
<<<<<<< HEAD
} from "../../../Assets/Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import InnerModal from "./InnerModal";
import PortfolioValue from "./PortfolioValue";

const ManagedFunds = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let bankDetailObj = useRecoilValue(BankDetail);

  const [title, setTitle] = useState(() => {
    // let head = props.modalObject.title;
    let currentTitle = props.modalObject.title;

    // Check if the title contains an underscore
    if (currentTitle.includes("_")) {
      currentTitle = currentTitle.split("_").slice(1)[0];
    }

    return currentTitle;
  });

  let [ShowError, setShowError] = useState({});

  let [nameSet] = useState(() => {
=======
  PostAxios,
  PatchAxios,
  RenderName,
} from "../../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../../Assets/Table/DynamicTableForInputsSection";
import InnerModal from "./InnerModal";
import PortfolioValue from "./PortfolioValue";
import ServiceFee from "./ServiceFee";

const AntdTable = DynamicTableForInputsSection("antd");

const ManagedFunds = (props) => {
  const bankDetailObj = useRecoilValue(BankDetail);

  const [ShowError, setShowError] = useState({});
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  const [title] = useState(() => {
    let currentTitle = props.modalObject.title;
    if (currentTitle.includes("_")) {
      currentTitle = currentTitle.split("_").slice(1).join("_");
    }
    return currentTitle;
  });

  const [nameSet] = useState(() => {
>>>>>>> origin/master
    if (props.modalObject.Input === "client") {
      return localStorage.getItem("UserName");
    } else if (props.modalObject.Input === "partner") {
      return localStorage.getItem("PartnerName");
    } else if (props.modalObject.Input === "joint") {
      return (
        localStorage.getItem("UserName") +
        " & " +
        localStorage.getItem("PartnerName")
      );
    }
<<<<<<< HEAD
  });

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let initialValues = { NumberOfMap: "" };
=======
    return "";
  });

  // Existing data for that input type (client / partner / joint)
  const existingData =
    props.modalObject.values?.[
      props.modalObject.stakeHolder.replace(/[^a-zA-Z]+/g, "")
    ]?.[props.modalObject.Input + "Array"] || [];

  const initialValues = {
    NumberOfMap: existingData.length || "",
    managedFunds: existingData.length ? existingData : [],
  };
>>>>>>> origin/master

  const [dynamicFields, setDynamicFields] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    if (
      props.modalObject.values[props.modalObject.Input] &&
      props.modalObject.values[props.modalObject.Input].length
    ) {
      let arr = [];

      for (
        let i = 0;
        i < props.modalObject.values[props.modalObject.Input].length;
        i++
      ) {
        arr.push("");
      }

      setDynamicFields(arr);
    }
  }, []);

  const fillInitialValues = (setFieldValue) => {
    if (
      props.modalObject.values[props.modalObject.Input] &&
      props.modalObject.values[props.modalObject.Input].length > 0
    ) {
      setFieldValue(
        `NumberOfMap`,
        props.modalObject.values[props.modalObject.Input].length || ""
      );

      let FoundArray = props.modalObject.values[props.modalObject.Input];
      // alert(FoundArray.length)
      FoundArray.forEach((data, i) => {
        console.log(data.platformName);
        setFieldValue(`platformName${i}`, data.platformName || "");

        setFieldValue(`accountNumber${i}`, data.accountNumber || "");
        setFieldValue(`portfolioValue${i}`, data.portfolioValue || "");
        setFieldValue(`portfolioArray${i}`, data.portfolioArray || "");
        setFieldValue(`totalPortfolioCost${i}`, data.totalPortfolioCost || "");
        setFieldValue(`serviceFee${i}`, data.serviceFee || "");
        setFieldValue(`serviceFeeType${i}`, data.serviceFeeType || "");
      });
    }
  };

  let handleInput = (e, setFieldValue) => {
    const value = e.target.value > 5 ? 5 : e.target.value;
    setFieldValue(e.target.id, value);

    let arr = [];

    for (let i = 0; i < value; i++) {
      arr.push("");
    }

    setDynamicFields(arr);
  };

  let handleInnerModal = (
    title,
    question,
    key,
    mainKey,
    key3,
    editArray,
    index,
    values,
    Platform
  ) => {
    setModalObject({
      title,
      question,
      key,
      mainKey,
      key3,
      editArray: editArray || [],
      index,
=======
    if (existingData.length) {
      setDynamicFields(Array(existingData.length).fill(""));
    }
  }, [existingData]);

  const fillInitialValues = (setFieldValue) => {
    if (existingData.length) {
      setFieldValue("managedFunds", existingData);
    }
  };

  const handleInput = (e, setFieldValue) => {
    const value = e.target.value > 5 ? 5 : e.target.value;
    setFieldValue("NumberOfMap", value);
    setDynamicFields(Array(Number(value)).fill(""));
    setFieldValue(
      "managedFunds",
      Array(Number(value))
        .fill()
        .map((_, i) => ({
          platformName: "",
          accountNumber: "",
          portfolioValue: "",
          portfolioArray: "",
          totalPortfolioCost: "",
          serviceFee: "",
          serviceFeeType: "",
          ...(initialValues.managedFunds[i] || {}),
        }))
    );
  };

  const handleInnerModal = (innerModalTitle, values, key, stakeHolder) => {
    let index = stakeHolder.replace(/[^0-9-]+/g, "");
    let BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");
    let selectedPlatformId = values?.[BaseKey]?.[index]?.platformName || "";
    if (!selectedPlatformId) {
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        `Please! select platform name first`
      );
      return false;
    }
    const platforms =
      title === "Platform Investments Detail" ||
      title == "SMSF Platform Investments Detail" ||
      title == "Family Trust Platform Investments Detail"
        ? bankDetailObj?.InvestmentPlatforms
        : bankDetailObj?.InvestmentBonds;

    let Platform =
      platforms?.find((elem) => elem._id === selectedPlatformId) || [];

    console.log(Platform);

    setModalObject({
      title:
        RenderName(props.modalObject.stakeHolder.replace(".", "")) +
        innerModalTitle,
      question: `How many Underlying Investments does ${RenderName(
        props.modalObject.stakeHolder.replace(".", "")
      )} have :`,
      key,
      stakeHolder,
      editArray: values?.[BaseKey]?.[index]?.[key + "Array"] || [],
>>>>>>> origin/master
      values,
      Platform,
    });
    setFlagState(true);
  };

<<<<<<< HEAD
  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    // console.log(values);
    // return (false);
    // Extract the number of maps from the values
    const numberOfMaps = parseInt(values.NumberOfMap, 10);
    const newEntries = [];

    // Iterate through each map entry and create a new object
    for (let i = 0; i < numberOfMaps; i++) {
      const newEntry = {
        platformName: values[`platformName${i}`] || "",
        accountNumber: values[`accountNumber${i}`] || "",
        portfolioValue: values[`portfolioValue${i}`] || "",
        portfolioArray: values[`portfolioArray${i}`] || "",
        totalPortfolioCost: values[`totalPortfolioCost${i}`] || "",
        serviceFee: values[`serviceFee${i}`] || "",
        serviceFeeType: values[`serviceFeeType${i}`] || "",
      };
      newEntries.push(newEntry);
    }

    // Log the new entries to verify
    console.log(newEntries);

    let DataOf = props.modalObject.Input;

    props.setFieldValue(DataOf, newEntries);

    let total = newEntries.reduce(
      (total, entry) =>
        total +
        parseFloat(entry.serviceFee.replace(/[^0-9.-]+/g, "")) *
          parseFloat(entry.serviceFeeType || 1),
      0
    );
    let totalCostBase = newEntries.reduce(
      (total, entry) =>
        total + parseFloat(entry.totalPortfolioCost.replace(/[^0-9.-]+/g, "")),
      0
    );

    props.setFieldValue(DataOf + "CurrentBalance", toCommaAndDollar(total));
    props.setFieldValue(
      DataOf + "CostBaseTemp",
      toCommaAndDollar(totalCostBase)
    );

    console.log(newEntries, "final obj");

    props.modalObject.setShowError((prevState) => ({
      ...prevState,
      [`${DataOf + "CurrentBalance"}Error`]: false,
      [`${DataOf + "CurrentBalance"}Message`]: "",
      [`${DataOf + "CostBaseTemp"}Error`]: false,
      [`${DataOf + "CostBaseTemp"}Message`]: "",
    }));

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  let CheckInputValue = (values, setFieldValue, currentInput, index) => {
    // console.log(values, setFieldValue, currentInput);

    let portfolioArray = values[`portfolioArray${index}`];

    let ExpectedSum = portfolioArray.reduce(
      (total, entry) =>
        total + parseFloat(entry.investmentValue.replace(/[^0-9.-]+/g, "")),
      0
    );
    let data = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, ""));

    console.log(ExpectedSum, data, currentInput.name, ShowError);

    if (ExpectedSum !== data) {
      setShowError((prevState) => ({
        ...prevState,
        [`${currentInput.name}Error`]: true,
        [`${currentInput.name}Message`]:
          "Total must be equal to the sum of all Investment value filled in the popup. The sum is " +
          toCommaAndDollar(ExpectedSum),
      }));
    } else {
      setShowError((prevState) => ({
        ...prevState,
        [`${currentInput.name}Error`]: false,
        [`${currentInput.name}Message`]: "",
      }));
    }
  };

  let InvestmentPlatformsBanks = [
=======
  const InvestmentPlatformsBanks = [
>>>>>>> origin/master
    "Platform Investments Detail",
    "Family Trust Platform Investments Detail",
    "SMSF Platform Investments Detail",
  ];

<<<<<<< HEAD
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        return (
          <Form>
            <Row>
              <InnerModal
                modalObject={modalObject}
                setFieldValue={setFieldValue}
                setFlagState={setFlagState}
                flagState={flagState}
              >
                {modalObject.key === "portfolioArray" ? <PortfolioValue /> : ""}
              </InnerModal>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <p className="text-end mt-3">
                      How many Platforms does {nameSet} have :
                    </p>
                    <div style={{ width: "15%" }}>
                      <Field
                        type="number"
                        id="NumberOfMap"
                        name="NumberOfMap"
                        className="form-control inputDesignDoubleInput"
                        onChange={(e) => handleInput(e, setFieldValue)}
                      />
                    </div>
                  </div>
                  {values.NumberOfMap && (
                    <div className="mt-4">
                      <Table striped bordered responsive hover>
                        <thead>
                          <tr>
                            <th>No#</th>
                            <th>Platform Name</th>
                            <th>Account Number </th>
                            <th>Portfolio Value</th>
                            <th>Portfolio Cost Base</th>
                            <th>Annual Advice Service Fee </th>
                          </tr>
                        </thead>
                        <tbody>
                          {dynamicFields.map((elem, i) => {
                            return (
                              <tr key={i}>
                                <td>{1 + i}</td>
                                <td style={{ minWidth: "250px" }}>
                                  <Field
                                    as="select"
                                    placeholder="Platform Name"
                                    id={`platformName${i}`}
                                    name={`platformName${i}`}
                                    className="form-select inputDesignDoubleInput"
                                  >
                                    <option value={""}>Please Select</option>

                                    {InvestmentPlatformsBanks.includes(title)
                                      ? bankDetailObj?.InvestmentPlatforms &&
                                        Array.isArray(
                                          bankDetailObj.InvestmentPlatforms
                                        )
                                        ? bankDetailObj.InvestmentPlatforms.map(
                                            (elem, index) => {
                                              if (
                                                !elem?._id ||
                                                !elem?.platformName
                                              )
                                                return null;
                                              return (
                                                <option
                                                  key={index}
                                                  value={elem._id}
                                                >
                                                  {elem.platformName}
                                                </option>
                                              );
                                            }
                                          )
                                        : null
                                      : bankDetailObj?.InvestmentBonds &&
                                        Array.isArray(
                                          bankDetailObj.InvestmentBonds
                                        )
                                      ? bankDetailObj.InvestmentBonds.map(
                                          (elem, index) => {
                                            if (
                                              !elem?._id ||
                                              !elem?.platformName
                                            )
                                              return null;
                                            return (
                                              <option
                                                key={index}
                                                value={elem._id}
                                              >
                                                {elem.platformName}
                                              </option>
                                            );
                                          }
                                        )
                                      : null}
                                  </Field>
                                </td>
                                <td style={{ width: "130px" }}>
                                  <Field
                                    type="number"
                                    placeholder="Account Number"
                                    id={`accountNumber${i}`}
                                    name={`accountNumber${i}`}
                                    className="form-control inputDesignDoubleInput"
                                  />
                                </td>
                                <td style={{ width: "150px" }}>
                                  <InputGroup
                                    className={`mb-3 ${
                                      ShowError[`portfolioValue${i}Error`] ===
                                      true
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  >
                                    <Field
                                      type="text"
                                      placeholder="Portfolio Value"
                                      id={`portfolioValue${i}`}
                                      name={`portfolioValue${i}`}
                                      className={`form-control inputDesignDoubleInput ${
                                        ShowError[`portfolioValue${i}Error`] ===
                                        true
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      onChange={(e) => {
                                        setFieldValue(
                                          e.target.name,
                                          toCommaAndDollar(
                                            e.target.value.replace(
                                              /[^0-9.-]+/g,
                                              ""
                                            )
                                          )
                                        );
                                        CheckInputValue(
                                          values,
                                          setFieldValue,
                                          e.target,
                                          i
                                        );
                                      }}
                                    />
                                    <Button
                                      className="btn bgColor modalBtn border-0"
                                      id="button-addon2"
                                      onClick={() => {
                                        const platformKey = `platformName${i}`;
                                        const selectedPlatformId =
                                          values[platformKey];
                                        // Check if a platform name is selected
                                        if (!selectedPlatformId) {
                                          openNotificationSuccess(
                                            "error",
                                            "topRight",
                                            "Error Notification",
                                            "Please! Select Platform Name First"
                                          );
                                          return;
                                        }

                                        // Define platform name and object set
                                        let name = "";
                                        const platforms =
                                          title ===
                                            "Platform Investments Detail" ||
                                          title ==
                                            "SMSF Platform Investments Detail" ||
                                          title ==
                                            "Family Trust Platform Investments Detail"
                                            ? bankDetailObj?.InvestmentPlatforms
                                            : bankDetailObj?.InvestmentBonds;

                                        // Find the platform name
                                        const SelectedPlatform =
                                          platforms?.find(
                                            (elem) =>
                                              elem._id === selectedPlatformId
                                          );
                                        console.log(
                                          platforms,
                                          selectedPlatformId,
                                          title
                                        );

                                        if (SelectedPlatform) {
                                          name = SelectedPlatform.platformName;

                                          // Call handleInnerModal with the platform name and relevant values
                                          handleInnerModal(
                                            `${name}_Portfolio Value`,
                                            `How many Underlying Investments does ${nameSet} have :`,
                                            "portfolioArray",
                                            "portfolioValue",
                                            "totalPortfolioCost",
                                            values[`portfolioArray${i}`],
                                            i,
                                            values,
                                            SelectedPlatform
                                          );
                                        } else {
                                          openNotificationSuccess(
                                            "error",
                                            "topRight",
                                            "Error Notification",
                                            "Selected Platform not found."
                                          );
                                        }
                                      }}
                                    >
                                      <FontAwesomeIcon
                                        icon={faArrowUpRightFromSquare}
                                      />
                                    </Button>
                                  </InputGroup>
                                  <div className="invalid-feedback">
                                    {ShowError[`portfolioValue${i}Message`]}
                                  </div>
                                </td>
                                <td style={{ width: "150px" }}>
                                  <Field
                                    type="text"
                                    placeholder="Total Portfolio Cost"
                                    id={`totalPortfolioCost${i}`}
                                    name={`totalPortfolioCost${i}`}
                                    className="form-control inputDesignDoubleInput"
                                    onChange={(e) => {
                                      setFieldValue(
                                        e.target.name,
                                        toCommaAndDollar(
                                          e.target.value.replace(
                                            /[^0-9.-]+/g,
                                            ""
                                          )
                                        )
                                      );
                                    }}
                                  />
                                </td>
                                <td style={{ width: "300px" }}>
                                  <InputGroup className="mb-3">
                                    <Field
                                      type="text"
                                      placeholder="Service Fee"
                                      id={`serviceFee${i}`}
                                      name={`serviceFee${i}`}
                                      className="form-control inputDesignDoubleInput"
                                      onChange={(e) => {
                                        setFieldValue(
                                          e.target.name,
                                          toCommaAndDollar(
                                            e.target.value.replace(
                                              /[^0-9.-]+/g,
                                              ""
                                            )
                                          )
                                        );
                                      }}
                                    />
                                    <Field
                                      as="select"
                                      placeholder="Service Fee Type"
                                      id={`serviceFeeType${i}`}
                                      name={`serviceFeeType${i}`}
                                      className="form-select inputDesignDoubleInput customInputGroupSelect"
                                    >
                                      <option value={""}>Select</option>
                                      <option value={52}>Weekly</option>
                                      <option value={12}>Monthly</option>
                                      <option value={1}>Year</option>
                                    </Field>
                                  </InputGroup>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>
            </Row>
=======
  const CheckInputValue = (
    values,
    setFieldValue,
    currentInput,
    stakeHolder
  ) => {
    if (!stakeHolder) {
      return false;
    }

    let index = parseFloat(stakeHolder.replace(/[^0-9-]+/g, ""));
    let BaseKey = stakeHolder.replace(/[^a-zA-Z]+/g, "");

    const portfolioArray = values?.[BaseKey]?.[index]?.portfolioArray || [];
    const ExpectedSum = portfolioArray.reduce(
      (total, entry) =>
        total +
        parseFloat(entry.investmentValue?.replace(/[^0-9.-]+/g, "") || 0),
      0
    );
    const data = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, ""));
    if (ExpectedSum !== data) {
      setShowError((prev) => ({
        ...prev,
        [`portfolioValue${index}Error`]: true,
        [`portfolioValue${index}Message`]:
          "Total must equal the sum of all investment values filled in the popup. The sum is " +
          toCommaAndDollar(ExpectedSum),
      }));
    } else {
      setShowError((prev) => ({
        ...prev,
        [`portfolioValue${index}Error`]: false,
        [`portfolioValue${index}Message`]: "",
      }));
    }
  };

  const onSubmit = async (values) => {
    const DataOf = props.modalObject.Input;
    const fundData = values.managedFunds || [];

    console.log("Managed Fund Submit:", props.modalObject, values);

    // 🧮 Compute totals
    const totalFee = fundData.reduce(
      (sum, entry) =>
        sum +
        parseFloat(entry.serviceFee?.replace(/[^0-9.-]+/g, "") || 0) *
          parseFloat(entry.serviceFeeType || 1),
      0
    );

    const totalCostBase = fundData.reduce(
      (sum, entry) =>
        sum +
        parseFloat(entry.totalPortfolioCost?.replace(/[^0-9.-]+/g, "") || 0),
      0
    );

    // 🧾 Save computed values into Formik state
    props.setFieldValue(
      props.modalObject.stakeHolder + DataOf + "Array",
      fundData
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + "currentBalance",
      toCommaAndDollar(totalFee)
    );

    props.setFieldValue(
      props.modalObject.stakeHolder + "costBase",
      toCommaAndDollar(totalCostBase)
    );

    // 🚫 Clear related validation errors (if any)
    props.modalObject.setShowError?.((prev) => ({
      ...prev,
      [`${DataOf + "currentBalance"}Error`]: false,
      [`${DataOf + "costBaseTemp"}Error`]: false,
    }));

    // 🏁 Close modal if flag is set
    if (props.flagState) props.setFlagState(false);
  };

  const getPlatformOptions = () => {
    if (InvestmentPlatformsBanks.includes(title)) {
      return (
        bankDetailObj?.InvestmentPlatforms?.map((elem) => ({
          value: elem._id,
          label: elem.platformName,
        })) || []
      );
    }
    return (
      bankDetailObj?.InvestmentBonds?.map((elem) => ({
        value: elem._id,
        label: elem.platformName,
      })) || []
    );
  };

  const columns = [
    {
      title: "No#",
      dataIndex: "owner",
      key: "owner",
      width: 60,
    },
    {
      title: "Platform Name",
      dataIndex: "platformName",
      key: "platformName",
      type: "select",
      options: getPlatformOptions(),
      placeholder: "Select Platform",
      selectedOptionValue: true,
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      type: "text",
      placeholder: "Account Number",
    },
    {
      title: "Portfolio Value",
      dataIndex: "portfolioValue",
      key: "portfolioValue",
      type: "number-toComma-Modal",
      placeholder: "Portfolio Value",
      innerModalTitle: "_Portfolio Value",
      callBack: true,
      inputChangeFunc: CheckInputValue,
      func: handleInnerModal,
      errorHandler: ShowError,
    },
    {
      title: "Total Costbase",
      dataIndex: "totalPortfolioCost",
      key: "totalPortfolioCost",
      type: "number-toComma",
      placeholder: "Portfolio Cost Base",
    },
    {
      title: "Annual Service Fee",
      dataIndex: "serviceFee",
      key: "serviceFee",
      type: "number-toComma-Modal",
      placeholder: "Service Fee",
      innerModalTitle: "_Service Fee",
      callBack: true,
      inputChangeFunc: CheckInputValue,
      func: handleInnerModal,
      errorHandler: ShowError,
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      innerRef={props.formRef}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [existingData]);

        const dataRows = useMemo(() => {
          const num = Number(values.NumberOfMap) || 0;
          if (num > 0) {
            return Array.from({ length: num }, (_, i) => ({
              key: `managedFund.${i}`,
              owner: i + 1,
              stakeHolder: `managedFunds[${i}]`,
              platformName: values.managedFunds?.[i]?.platformName || "",
              accountNumber: values.managedFunds?.[i]?.accountNumber || "",
              portfolioValue: values.managedFunds?.[i]?.portfolioValue || "",
              portfolioArray: values.managedFunds?.[i]?.portfolioArray || "",
              totalPortfolioCost:
                values.managedFunds?.[i]?.totalPortfolioCost || "",
              serviceFee: values.managedFunds?.[i]?.serviceFee || "",
              serviceFeeType: values.managedFunds?.[i]?.serviceFeeType || "",
            }));
          }
          return [];
        }, [values.NumberOfMap, values.managedFunds]);

        return (
          <Form>
            <InnerModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
            >
              {modalObject.key === "portfolioValue" ? <PortfolioValue /> : 
              modalObject.key === "serviceFee" ? <ServiceFee /> : 
              
              ""}
            </InnerModal>

            <div className="d-flex justify-content-center align-items-center gap-4">
              <p className="text-end mt-1 pt-2 ">
                How many Platforms does {nameSet} have :
              </p>
              <div style={{ minWidth: "10%" }}>
                <select
                  id="NumberOfMap"
                  name="NumberOfMap"
                  className="form-select inputDesignDoubleInput"
                  onChange={(e) => handleInput(e, setFieldValue)}
                  value={values.NumberOfMap}
                >
                  <option value="">Select</option>
                  {[...Array(5).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {values.NumberOfMap && (
              <div className="mt-4 All_Client reportSection">
                <AntdTable
                  columns={columns}
                  data={dataRows}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </div>
            )}
            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
>>>>>>> origin/master
          </Form>
        );
      }}
    </Formik>
  );
};

export default ManagedFunds;
