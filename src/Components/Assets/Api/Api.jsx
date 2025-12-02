import { notification, Tooltip } from "antd";
import axios from "axios";
import { Image } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

import dayjs from "dayjs";

import SVGCoin from "../../../CashFlow/CashFlowAssets/Cast_Flow/SVG/SVG-Doller-Coin.svg";
import { getJwtToken, getUserDetail } from "../../../Store/recoilUtils";

const getAuthHeaders = () => {
  const token = getJwtToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

let GetAxios = async (Api) => {
  console.log("Get api Chali");
  try {
    const headers = getAuthHeaders();
    const response = await axios.get(Api, { headers });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message); // Log error message
    console.error("Response:", error.response); // Log response error details if available
    throw error; // Rethrow the error to be caught in the calling function
  }
};

const PostAxios = async (Api, data) => {
  console.log("Post Chala ");
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(Api, data, { headers });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message); // Log error message
    console.error("Response:", error.response); // Log response error details if available
    throw error; // Rethrow the error to be caught in the calling function
  }
};

let PutAxios = async (Api, data) => {
  console.log("Put api Chali");
  try {
    const headers = getAuthHeaders();
    const response = await axios.put(Api, data, { headers });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message); // Log error message
    console.error("Response:", error.response); // Log response error details if available
    throw error; // Rethrow the error to be caught in the calling function
  }
};

let PatchAxios = async (Api, data) => {
  console.log("Patch api Chali");
  try {
    const headers = getAuthHeaders();
    const response = await axios.patch(Api, data, { headers });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message); // Log error message
    console.error("Response:", error.response); // Log response error details if available
    throw error; // Rethrow the error to be caught in the calling function
  }
};

let DeleteAxios = async (Api) => {
  console.log("Delete api Chali");
  try {
    const headers = getAuthHeaders();
    const response = await axios.delete(Api, { headers });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message); // Log error message
    console.error("Response:", error.response); // Log response error details if available
    throw error; // Rethrow the error to be caught in the calling function
  }
};

const PostAxiosBlob = async (Api, data) => {
  console.log("Post Blob Chala");
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(Api, data, {
      responseType: "blob", // binary (Excel, PDF, etc.)
      headers: headers, // ✅ Correct way
    });
    return response;
  } catch (error) {
    console.error("Blob Error:", error.message);
    console.error("Blob Response:", error.response);
    throw error;
  }
};

let DateHandler = async (value) => {
  // console.log("DateHandler Chal gaya", value);
  let a = await new Date(value);
  return a;
};

const openNotificationSuccess = (type, placement, message, description) => {
  notification[type]({
    message: (
      <span style={{ fontWeight: "600", padding: "1.5px 0px 0px 15px" }}>
        {message}
      </span>
    ),
    description: description,
    placement,
    duration: 3,
    showProgress: true,
    style: {
      padding: "10px",
      lineHeight: "1.5",
      alignItems: "center",
    },
  });
};

const toCommaAndDollar = (x) =>
  "$" +
  Math.ceil(x)
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const toNumericValue = (formattedValue) => {
  if (formattedValue && typeof formattedValue === "string") {
    return formattedValue.replace(/[$,]/g, "");
  }
  return "0";
};

// let toPercentage = (x) => Math.ceil(x)
//     .toFixed(0)
//     .toString()
//     + "%";

let toPercentage = (x) => {
  if (typeof x !== "number" || isNaN(x)) {
    throw new Error("Input must be a valid number");
  }
  return x.toFixed(2) + "%";
};

let RenderName = (Input) => {
  let PerosnalDetails = getUserDetail();
  if (Input === "client") {
    return (
      PerosnalDetails?.client?.clientPreferredName ||
      localStorage.getItem("UserName")
    );
  } else if (Input === "partner") {
    return (
      PerosnalDetails?.partner?.partnerPreferredName ||
      localStorage.getItem("PartnerName")
    );
  } else if (Input === "joint") {
    let userStatus = localStorage.getItem("UserStatus");
    if (userStatus === "Married") {
      return (
        (PerosnalDetails?.client?.clientPreferredName ||
          localStorage.getItem("UserName")) +
        " & " +
        (PerosnalDetails?.partner?.partnerPreferredName ||
          localStorage.getItem("PartnerName"))
      );
    } else {
      return (
        PerosnalDetails?.client?.clientPreferredName ||
        localStorage.getItem("UserName")
      );
    }
  }
};

// inputHelpers.js

const handleInputChange = (
  e,
  setFieldValue,
  FormulaSetting,
  values,
  stakeHolder
) => {
  let value = parseFloat(e.target.value.replace(/[^0-9.]+/g, "")); // Remove all non-numeric characters except '.'

  if (value > 100) {
    setFieldValue(e.target.name, "100%");

    // Call your custom formula logic
    FormulaSetting(values, setFieldValue, e.target, stakeHolder);
  } else {
    setFieldValue(e.target.name, e.target.value); // Update value without '%'
  }
};

const handleInputFocus = (e, setFieldValue) => {
  // Remove the percentage sign
  let value = e.target.value.replace(/[^0-9.]+/g, ""); // Remove all non-numeric characters except '.'
  setFieldValue(e.target.name, value); // Update value without '%'
};

const handleInputKeyDown = (e) => {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Home",
    "End",
    "Escape",
    ".",
  ];

  // Allow default behavior for allowed keys
  if (allowedKeys.includes(e.key)) {
    return; // Let default behavior happen
  }

  // Trigger onBlur on pressing Enter (for example)
  if (e.key === "Enter") {
    e.target.blur(); // This will trigger the onBlur event
  }

  // Prevent non-numeric input
  if (!/^[0-9]$/.test(e.key)) {
    e.preventDefault();
  }
};

const handleInputBlur = (
  e,
  setFieldValue,
  toPercentage,
  FormulaSetting,
  values,
  stakeHolder
) => {
  let value = e.target.value.replace(/[^0-9.]+/g, "");
  let numericValue = parseFloat(value);

  // Validate and convert to percentage if necessary
  if (!isNaN(numericValue)) {
    if (numericValue > 100) {
      numericValue = 100;
    }
    setFieldValue(e.target.name, toPercentage(numericValue));
  } else {
    setFieldValue(e.target.name, ""); // Clear if not valid
  }

  // Call your custom formula logic
  FormulaSetting(values, setFieldValue, e.target, stakeHolder);
};

const validateName = (value) => {
  const filteredValue = value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters and spaces
  return filteredValue;
};

let ConvertDate = (date) => {
  if (!date) return "";

  let d = new Date(date); // parse the ISO string
  let day = d.getUTCDate().toString().padStart(2, "0");
  let month = (d.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  let year = d.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

let ConvertDate2 = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const createStructuredEntries = (values, schemaType, numberOfProperties) => {
  const structuredEntrySchemas = {
    cf_familyHome: [
      "address",
      "currentValue",
      "state",
      "clientOwnership",
      "partnerOwnership",
      "yearOfPurchase",
      "totalCostBase",
      "totalCostBaseObj",
      "loanBalance",
      "familyHomeLoanObj",
      "expectedGrowthRate",
      "sellPropertyInYear",
      "estimatedFutureSellingCost",
    ],
    cf_investmentsProperty: [
      "streetAddress",
      "valueOfProperty",
      "clientOwnership",
      "partnerOwnership",
      "state",
      "yearOfPurchase",
      "totalCostBase",
      "totalCostBaseObj",
      "expectedGrowthRate",
      "loanBalance",
      "loanBalanceObj",
      "rentalIncome",
      "sellPropertyInYear",
      "convertToPPRYear",
      "estimatedFutureSellingCost",
    ],
    cf_FamilyTrustInvestmentProperties: [
      "streetAddress",
      "valueOfProperty",
      "state",
      "yearOfPurchase",
      "totalCostBaseObj",
      "expectedGrowthRate",
      "loanBalance",
      "loanBalanceObj",
      "rentalIncome",
      "sellPropertyInYear",
      "estimatedFutureSellingCost",
    ],
    cf_SMSFInvestmentProperties: [
      "streetAddress",
      "valueOfProperty",
      "state",
      "yearOfPurchase",
      "totalCostBaseObj",
      "expectedGrowthRate",
      "loanBalance",
      "loanBalanceObj",
      "rentalIncome",
      "sellPropertyInYear",
      "estimatedFutureSellingCost",
    ],
  };

  console.log(schemaType);

  const schema = structuredEntrySchemas[schemaType] || {};

  return Array.from({ length: numberOfProperties }, (_, i) => {
    let entry = {};
    schema.forEach((field) => {
      entry[field] =
        values[`${field}_${i}`] || (field.includes("Obj") ? {} : "");
    });
    return entry;
  });
};

const generateYearData = (source, yearCount = 31) => {
  return Array.from({ length: yearCount }, (_, i) => i + 1).reduce(
    (acc, year) => {
      acc[`year${year}`] = source?.[`year${year}`] || "$0";
      return acc;
    },
    {}
  );
};

const buildReportTree = (data, taxHierarchy) => {
  if (!Array.isArray(taxHierarchy)) {
    // console.warn("Invalid taxHierarchy:", taxHierarchy);
    return [];
  }

  return taxHierarchy.map((section, index) => {
    const childrenData = section.children
      .map((childLabel) => data.find((item) => item.type === childLabel))
      .filter(Boolean); // remove undefined if a label didn't match

    let HeadData = data.find((item) => item.type === section.parent);

    const sectionData = {
      key: `${index + 1}`,
      type: section.parent,
      ...generateYearData(HeadData),
    };

    if (childrenData.length > 0) {
      sectionData.children = childrenData; // Add children only if it's not empty
    }

    return sectionData;
  });
};

const removeNullRows = (data) => {
  if (!Array.isArray(data)) {
    // console.warn("Expected array but got:", data);
    return [];
  }
  return data.filter((row) => row !== null && row !== undefined);
};

const removeZeroRows = (data) =>
  data.filter((row) =>
    row.slice(1).some((val) => {
      const num = Number(val);
      return (
        (typeof val === "number" && val !== 0) ||
        (typeof val === "string" && !isNaN(num) && num !== 0)
      );
    })
  );

const transformInflows = (inflows = [], formatAsCurrency = true) =>
  inflows.map(([type, ...values]) => {
    const formatted = { type };
    for (let i = 0; i < 31; i++) {
      const val = Number(values[i]);
      if (formatAsCurrency) {
        if (val < 0) {
          formatted[`year${i + 1}`] = `(${toCommaAndDollar(
            Math.abs(isNaN(val) ? 0 : val)
          )})`;
        } else {
          formatted[`year${i + 1}`] = toCommaAndDollar(isNaN(val) ? 0 : val);
        }
      } else {
        formatted[`year${i + 1}`] = isNaN(val) ? 0 : val;
      }
    }
    return formatted;
  });

const processDataGeneric = (data, transformer, ...keys) => {
  let result = data;
  for (const key of keys) {
    result = result?.[key] ?? {};
  }
  return transformer(removeZeroRows(removeNullRows(result)));
};

const generateReportColumns = ({
  startYear = 1,
  endYear = 6,
  currentYear = new Date().getFullYear(),
  withExisting = false,
  imageMap = {},
  fixedTypeLabel = "type",
  showInfoIcon = false, // <-- NEW FLAG
  onInfoClick = () => {}, // <-- NEW FUNCTION
  onInfoIconsArray = [],
}) => {
  const columns = [
    {
      title: (
        <>
          <div className="w-100">Financial Year Ending 30th June</div>
          <div className="w-100">Year</div>
        </>
      ),
      dataIndex: fixedTypeLabel,
      key: fixedTypeLabel,
      width: 280,
      fixed: "left",
      render: (text, row, index) => {
        if (row.isHeader) return { props: { colSpan: 0 } };

        const isParentRow = row?.children && Array.isArray(row.children);
        const icon = imageMap?.[text] || "";

        return (
          <Tooltip
            title={
              onInfoIconsArray.includes(text)
                ? "Click on i button to reveal investment details"
                : text
            }
          >
            <div
              style={{
                fontWeight: isParentRow ? "bold" : "normal",
                display: "flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontFamily: '"Inter", sans-serif',
              }}
            >
              {/* Optional Image Icon */}
              {!isParentRow && icon && (
                <div style={{ width: "25px" }}>
                  <img src={icon} alt="icon" width={20} />
                </div>
              )}

              {/* Text */}
              <span>{text}</span>

              {/* Info Icon for Parent Rows */}
              {showInfoIcon &&
                isParentRow &&
                onInfoIconsArray.includes(text) && (
                  <div
                    style={{
                      cursor: "pointer",
                      width: "25px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={SVGCoin}
                      fluid
                      onClick={() => onInfoClick(row, text)}
                      title="View Details"
                    />
                  </div>
                )}
            </div>
          </Tooltip>
        );
      },
    },
  ];

  if (withExisting) {
    columns.push({
      title: <div className="w-100 text-center">Existing</div>,
      dataIndex: "existing",
      key: "existing",
      fixed: "center",
      render: (text, record) => {
        const isParentRow = record.children && Array.isArray(record.children);
        return (
          <div
            style={{
              fontWeight: isParentRow ? "bold" : "normal",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: '"Inter", sans-serif',
              textAlign: "center",
            }}
          >
            {text}
          </div>
        );
      },
    });
  }

  for (let year = startYear; year <= endYear; year++) {
    columns.push({
      title: (
        <>
          <div className="w-100 text-center">{currentYear + (year - 1)}</div>
          <div className="w-100 text-center">{year}</div>
        </>
      ),
      dataIndex: `year${year}`,
      key: `year${year}`,
      render: (text, record) => {
        const isParentRow = record.children && Array.isArray(record.children);
        return (
          <div
            style={{
              fontWeight: isParentRow ? "bold" : "normal",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontFamily: '"Inter", sans-serif',
              textAlign: "center",
            }}
          >
            {text}
          </div>
        );
      },
    });
  }

  return columns;
};

const changeHeadNames = (mainarray, HeadNamesArray) => {
  return mainarray.map((item, index) => {
    let typeAddision =
      HeadNamesArray.length > 0 && HeadNamesArray[index] !== ""
        ? HeadNamesArray[index]
        : item.type;
    return {
      ...item,
      key: (index + 1).toString(), // key as string from 1, 2, 3, ...
      type: typeAddision, // Adding section to type
    };
  });
};

const renameYearKeys = (data) => {
  return data.map((item) => {
    const renamedItem = { ...item };

    // Move year1 to existing
    renamedItem.existing = renamedItem.year1;

    // Shift year2 → year1, ..., year30 → year29
    for (let i = 2; i <= 31; i++) {
      renamedItem[`year${i - 1}`] = renamedItem[`year${i}`];
    }

    // Remove original year30
    // delete renamedItem[`year30`];

    // Recursively process children if they exist
    if (Array.isArray(renamedItem.children)) {
      renamedItem.children = renameYearKeys(renamedItem.children);
    }

    return renamedItem;
  });
};

const percentTransforme = (data) => {
  const transformed = data.map(([investment, details]) => ({
    investment,
    details: typeof details === "number" ? toPercentage(details) : details,
  }));

  return transformed;
};

const updateCardByTitle = ({
  selectedYearIndex,
  DataSource,
  targetTitle,
  updateState,
  filterTypes = [],
}) => {
  const matchingEntries = DataSource.filter((item) =>
    filterTypes.includes(item.type)
  );

  const totalAmount = matchingEntries.reduce((sum, entry) => {
    const rawValue = entry[`year${selectedYearIndex}`] || "$0";
    const isNegative = rawValue.includes("(") && rawValue.includes(")");
    const numericValue = parseFloat(rawValue.replace(/[^0-9.]+/g, ""));
    return sum + (isNegative ? -numericValue : numericValue);
  }, 0);

  const useCustomFormat = filterTypes.includes(targetTitle);

  const formattedAmount = useCustomFormat
    ? totalAmount < 0
      ? `(${toCommaAndDollar(Math.abs(totalAmount))})`
      : `${toCommaAndDollar(totalAmount)}`
    : totalAmount < 0
    ? `($${Math.abs(totalAmount).toLocaleString()})`
    : `$${totalAmount.toLocaleString()}`;

  updateState((previousIncomeList) =>
    previousIncomeList.map((card) =>
      card.title === targetTitle
        ? {
            ...card,
            amount: formattedAmount,
            popupArray: matchingEntries,
          }
        : card
    )
  );
};

const updateCardBySingleEntry = ({
  selectedYearIndex,
  DataSource,
  targetTitle,
  updateState,
  matchType,
}) => {
  const entry = DataSource.find((item) => item.type === matchType);
  const rawValue =
    entry?.[
      selectedYearIndex == "existing"
        ? selectedYearIndex
        : `year${selectedYearIndex}`
    ] || "$0";

  updateState((previousList) =>
    previousList.map((card) =>
      card.title === targetTitle
        ? {
            ...card,
            amount: rawValue,
          }
        : card
    )
  );
};

// Deep clone rows and assign unique keys
const deepCloneWithKeys = (rows, parentTitle, parentPath = "") =>
  rows?.map((row, rowIndex) => {
    const currentPath = `${parentPath}${parentTitle}_row_${rowIndex}`;
    return {
      ...row,
      key: currentPath,
      children: Array.isArray(row.children)
        ? deepCloneWithKeys(row.children, parentTitle, `${currentPath}_child_`)
        : undefined,
    };
  }) || [];

function toSentenceCase(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function toTitleCase(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const touchFields = async (
  setFieldTouched,
  fieldNames,
  values,
  validateForm
) => {
  let isValid = true;
  let firstInvalidMessage = null;

  // Mark fields as touched
  for (const fieldName of fieldNames) {
    await setFieldTouched(fieldName, true); //
  }

  const fieldErrors = await validateForm(values);

  // Helper to get nested value by path (e.g. "client.Email")
  const getNested = (obj, path) =>
    path
      .split(".")
      .reduce((acc, part) => (acc && acc[part] ? acc[part] : null), obj);

  for (const fieldName of fieldNames) {
    const errorMessage = getNested(fieldErrors, fieldName);
    if (errorMessage) {
      isValid = false;
      if (!firstInvalidMessage) {
        firstInvalidMessage = errorMessage;
      }
    }
  }

  if (!isValid && firstInvalidMessage) {
    openNotificationSuccess(
      "error",
      "topRight",
      "Validation Error",
      firstInvalidMessage
    );
  }

  return isValid;
};

const randomStringGenerator = ({
  length = 12,
  count = 1,
  useUppercase = true,
  useLowercase = true,
  useNumbers = true,
  useSpecial = true,
} = {}) => {
  const charUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charLowercase = "abcdefghijklmnopqrstuvwxyz";
  const charNumber = "0123456789";
  const charSpecial = "~!@#$%^&*_+:?";

  let allChars = "";
  if (useUppercase) allChars += charUppercase;
  if (useLowercase) allChars += charLowercase;
  if (useNumbers) allChars += charNumber;
  if (useSpecial) allChars += charSpecial;

  if (!allChars) throw new Error("No character sets selected!");

  const generateOne = () => {
    let str = "";
    for (let i = 0; i < length; i++) {
      str += allChars[Math.floor(Math.random() * allChars.length)];
    }
    return str;
  };

  return Array.from({ length: count }, generateOne);
};

const getNestedValue = (obj, path) =>
  path.split(".").reduce((acc, part) => acc && acc[part], obj);

// utils/MiddleWareHelpers.js
const sumArrayValues = (array = [], key, multiplierKey = null) => {
  return (array || []).reduce((total, entry) => {
    const value =
      parseFloat(String(entry[key] || "").replace(/[^0-9.-]+/g, "")) || 0;
    const multiplier = multiplierKey
      ? parseFloat(entry[multiplierKey] || 1)
      : 1;
    return total + value * multiplier;
  }, 0);
};

/**
 * calculateExpectedTotal: determines the expected total for a modal type
 * Matches the logic originally in MiddleWare.jsx's calculateExpectedTotal switch
 *
 * @param {string} modalTitle
 * @param {array} dataArray
 * @param {string} currentInput   // e.g. 'clientCurrentBalance'
 * @param {string} checkState     // e.g. 'client'
 */
const calculateExpectedTotal = (
  modalTitle = "",
  dataArray = [],
  currentInput = "",
  checkState = ""
) => {
  if (!dataArray || dataArray.length === 0) return 0;

  switch (modalTitle) {
    case "Bank Accounts":
    case "Term Deposits":
    case "SMSF Bank Accounts":
    case "SMSF Term Deposits":
    case "Family Trust Bank Accounts":
    case "Family Trust Term Deposits":
      return sumArrayValues(dataArray, "currentBalance");

    case "Australian Shares/ETFs":
    case "SMSF Australian Shares/ETFs":
    case "Family Trust Australian Shares/ETFs":
      return currentInput === `${checkState}CurrentBalance`
        ? sumArrayValues(dataArray, "currentBalance")
        : sumArrayValues(dataArray, "costBase");

    case "Platform Investments":
    case "Investment Bond":
    case "SMSF Platform Investments":
    case "Family Trust Platform Investments":
      return currentInput === `${checkState}CurrentBalance`
        ? sumArrayValues(dataArray, "serviceFee", "serviceFeeType")
        : sumArrayValues(dataArray, "totalPortfolioCost");

    case "Super Funds":
      return sumArrayValues(dataArray, "annualAdvice");

    case "Account Based Pension":
      return sumArrayValues(dataArray, "pensionPayment");

    case "Invested in Annuities":
    case "Annuities":
      return sumArrayValues(dataArray, "originalInvestmentAmount");

    case "Business as Company Structure":
      return sumArrayValues(dataArray, "equityPosition");

    default:
      return 0;
  }
};

function replacePlaceholderWithLabel(options, value, titleTemplate) {
  if (!options || !Array.isArray(options)) return titleTemplate;
  if (!value) return titleTemplate;

  const found = options.find((opt) => opt.value === value);
  const label = found?.label || "";

  return titleTemplate.replace("<CFE>", label);
}

const parseDateInput = (value) => {
  if (!value) return null;

  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");

  // If user entered 8 digits like 01012000 → DDMMYYYY
  if (digits.length === 8) {
    const day = digits.slice(0, 2);
    const month = digits.slice(2, 4);
    const year = digits.slice(4);
    const dateStr = `${day}/${month}/${year}`;
    const parsed = dayjs(dateStr, "DD/MM/YYYY", true);
    if (parsed.isValid()) return parsed;
  }

  // Fallback: try normal dayjs parsing
  const fallback = dayjs(
    value,
    ["DD/MM/YYYY", "D/M/YYYY", "DD-MM-YYYY", "D-M-YYYY"],
    true
  );
  return fallback.isValid() ? fallback : null;
};

export {
  DeleteAxios,
  GetAxios,
  PostAxios,
  PutAxios,
  PatchAxios,
  PostAxiosBlob,
  DateHandler,
  openNotificationSuccess,
  toCommaAndDollar,
  toNumericValue,
  toPercentage,
  RenderName,
  handleInputChange,
  handleInputFocus,
  handleInputKeyDown,
  handleInputBlur,
  validateName,
  ConvertDate,
  ConvertDate2,
  createStructuredEntries,
  generateYearData,
  buildReportTree,
  removeNullRows,
  transformInflows,
  processDataGeneric,
  removeZeroRows,
  generateReportColumns,
  changeHeadNames,
  renameYearKeys,
  percentTransforme,
  updateCardByTitle,
  updateCardBySingleEntry,
  deepCloneWithKeys,
  toSentenceCase,
  toTitleCase,
  touchFields,
  randomStringGenerator,
  getNestedValue,
  sumArrayValues,
  calculateExpectedTotal,
  replacePlaceholderWithLabel,
  parseDateInput,
};
