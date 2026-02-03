import { notification, Tooltip } from "antd";
import axios from "axios";
import { Image } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

import SVGCoin from "../../../CashFlow/CashFlowAssets/Cast_Flow/SVG/SVG-Doller-Coin.svg";
import {
  getJwtToken,
  getUserDetail,
  getQuestionDetail,
  getGoalsDetail,
  getDefaultUrl,
  getLoggedInUserData,
  getGQState,
} from "../../../Store/recoilUtils";
import { content } from "../../../Content/Content";

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
  stakeHolder,
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
  stakeHolder,
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

const convertDateAUWithDayJS = (date) => {
  if (!date) return "";
  return dayjs.utc(date).format("DD/MM/YYYY");
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
    {},
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
    }),
  );

const transformInflows = (inflows = [], formatAsCurrency = true) =>
  inflows.map(([type, ...values]) => {
    const formatted = { type };
    for (let i = 0; i < 31; i++) {
      const val = Number(values[i]);
      if (formatAsCurrency) {
        if (val < 0) {
          formatted[`year${i + 1}`] = `(${toCommaAndDollar(
            Math.abs(isNaN(val) ? 0 : val),
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
    filterTypes.includes(item.type),
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
        : card,
    ),
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
        : card,
    ),
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
  validateForm,
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
      firstInvalidMessage,
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
  checkState = "",
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
    true,
  );
  return fallback.isValid() ? fallback : null;
};

/**
 * generateDocumentFromTemplate: Generates and downloads a Word document from a template
 *
 * @param {Object} payload - Data object to render in the template
 * @param {string} templateFileName - Name of the template file in public/assets (e.g., 'template.docx')
 * @param {string} downloadFileName - Name for the downloaded file (default: 'document.docx')
 * @returns {Promise<Blob>} - The generated document blob
 */
const generateDocumentFromTemplate = async (
  payload = {},
  templateFileName = "template.docx",
  downloadFileName = "document.docx",
) => {
  try {
    if (!payload || Object.keys(payload).length === 0) {
      throw new Error("Payload is required and cannot be empty");
    }

    // Construct template URL from public assets
    const templateUrl = `${import.meta.env.BASE_URL}assets/${templateFileName}`;
    console.log("Template URL:", templateUrl);
    // Fetch template with error handling
    let arrayBuffer = null;
    try {
      const response = await fetch(templateUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch template: ${response.status} ${response.statusText}`,
        );
      }
      arrayBuffer = await response.arrayBuffer();
    } catch (fetchError) {
      console.error("Template fetch failed:", fetchError);
      throw new Error(
        `Cannot access template at ${templateUrl}. Ensure the file exists in public/assets folder.`,
      );
    }

    // Dynamically import required libraries
    const { default: PizZip } = await import("pizzip");
    const { default: Docxtemplater } = await import("docxtemplater");

    // Initialize document template
    const zip = new PizZip(arrayBuffer);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: "{{", end: "}}" },
    });

    // Render document with payload data
    doc.render(payload);

    // Generate blob from modified document
    const generatedBlob = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // Trigger download
    const url = URL.createObjectURL(generatedBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(
      "Document generated and downloaded successfully:",
      downloadFileName,
    );
    return generatedBlob;
  } catch (error) {
    console.error("Document generation failed:", error.message);
    openNotificationSuccess(
      "error",
      "topRight",
      "Document Generation Error",
      error.message || "Failed to generate document",
    );
    throw error;
  }
};

const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0;

const GeneraDocument = async (id) => {
  try {
    console.log("Document generation started for ID:", id);

    const defaultUrl = getDefaultUrl();

    let personalDetails = getUserDetail();
    let allQuestions = getQuestionDetail();
    let goalsAndObjective = getGoalsDetail();
    let LoggedInUser = getLoggedInUserData();
    let GQState = getGQState();

    console.log(
      "Recoil values →",
      "PersonalDetail:",
      personalDetails,
      "Questions:",
      allQuestions,
      "Goals:",
      goalsAndObjective,
      "GQState:",
      GQState.clientFK,
    );

    const requests = [];

    // Personal Details
    if (isEmptyObject(personalDetails) || personalDetails?._id !== id) {
      requests.push(
        GetAxios(`${defaultUrl}/api/personalDetails/getUserById/${id}`).then(
          (res) => {
            if (!isEmptyObject(res)) personalDetails = res;
          },
        ),
      );
    }

    // Questions
    if (
      isEmptyObject(allQuestions) ||
      Object.values(allQuestions).some(
        (q) => q && Object.keys(q).length > 0 && q.clientFK === id,
      )
    ) {
      requests.push(
        GetAxios(`${defaultUrl}/api/dataOfAllSection/${id}`).then((res) => {
          if (!isEmptyObject(res)) allQuestions = res;
        }),
      );
    }

    // Goals & Objectives
    if (
      isEmptyObject(goalsAndObjective) ||
      Object.values(goalsAndObjective).some(
        (q) => q && Object.keys(q).length > 0 && q.clientFK === id,
      )
    ) {
      requests.push(
        GetAxios(`${defaultUrl}/api/CombinedGoalsAndObjectives/${id}`).then(
          (res) => {
            if (!isEmptyObject(res)) goalsAndObjective = res;
          },
        ),
      );
    }

    console.log(isEmptyObject(GQState), GQState.clientFK === id);

    // Goals & Objectives
    if (isEmptyObject(GQState) || GQState.clientFK !== id) {
      requests.push(
        GetAxios(`${defaultUrl}/api/goalsQuestions/getByClient/${id}`).then(
          (res) => {
            if (!isEmptyObject(res)) GQState = res;
          },
        ),
      );
    }

    // Run missing API calls in parallel
    await Promise.all(requests);

    console.log("Final Data →", {
      personalDetails,
      allQuestions,
      goalsAndObjective,
      GQState,
      contect: content.GoalsAndObjectives,
      RegularLiving: allQuestions?.generalLivingExpenses || {},
    });

    let adviserName =
      LoggedInUser &&
      typeof LoggedInUser === "object" &&
      Object.keys(LoggedInUser).length > 0
        ? `${toSentenceCase(LoggedInUser.firstName || "")} ${toSentenceCase(
            LoggedInUser.lastName || "",
          )}`.trim()
        : "Guest";

    const expenseTypes = [
      { name: "Rent", id: "houseHoldRent" },
      { name: "Gas", id: "houseHoldGas" },
      { name: "Electricity", id: "houseHoldElectricity" },
      { name: "Water Rates", id: "houseHoldWaterRates" },
      { name: "Council Rates", id: "houseHoldCouncilRates" },
      { name: "Phone", id: "houseHoldPhone" },
      { name: "Food", id: "houseHoldFood" },
      { name: "Internet", id: "houseHoldInternet" },
      { name: "Other", id: "houseHoldOthers" },
    ];

    const personalExpenses = [
      { name: "Clothing", id: "personalClothing" },
      { name: "Cigarettes", id: "personalCigarettes" },
      { name: "Alcohol", id: "personalAlcohol" },
      { name: "Subscription Fees", id: "personalSubscriptionFees" },
      { name: "Memberships & Clubs", id: "personalClubMemberships" },
      { name: "Holidays", id: "personalHolidays" },
      { name: "Dining Out", id: "personalDiningOut" },
      { name: "Mobile Phone", id: "personalMobilePhone" },
      { name: "Medical Expenses", id: "personalMedicalExpenses" },
      { name: "Other", id: "personalOthers" },
    ];

    const transportExpenses = [
      { name: "Petrol", id: "transportPetrol" },
      { name: "Car Maintenance", id: "transportCarRepair" },
      { name: "Car Registration", id: "transportCarRegistration" },
      { name: "Public Transport", id: "publicTransport" },
      { name: "Other", id: "transportOthers" },
    ];

    const insuranceExpenses = [
      { name: "Home And Contents", id: "insuranceHomeContents" },
      { name: "Car", id: "insuranceCar" },
      { name: "Private Health", id: "insurancePrivateHealth" },
      { name: "Life/TPD/Trauma", id: "insuranceLife" },
      { name: "Income Protection", id: "insuranceIncomeProtection" },
      { name: "Other", id: "insuranceOthers" },
    ];

    // 🔽 Continue document generation here
    let payload = {
      clientName: personalDetails?.client?.clientGivenName || "",
      adviserName: adviserName || "",
      downloadDate: new Date().toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),

      items: Object.values(content.GoalsAndObjectives)
        .flat()
        .filter((item) => GQState?.[item.key] === "Yes")
        .map((item) => ({
          goalName: item?.title || "",
          scopeOfAdvice:
            goalsAndObjective?.[item.key]?.scopeOfAdvice ||
            item?.scopeOfAdvice ||
            "",
          description: goalsAndObjective?.[item.key]?.description || "",
          when: goalsAndObjective?.[item.key]?.when || item?.whenScopeIs || "",
          estimatedValue: goalsAndObjective?.[item.key]?.estimatedValue || "",
        })),

      childitem:
        personalDetails?.children?.arrayOfChildren?.map((child) => ({
          childFirstName: child?.firstName || "",
          childLastName: child?.lastName || "",
          childDob: child?.dob ? convertDateAUWithDayJS(child?.dob) : "",
          childAge: child?.age || "",
          childGender: child?.gender || "",
          childRelationship: child?.relationship || "",
          childDepenantChild: child?.depenantChild || "",
        })) || [],

      //client Data
      clientTitle: personalDetails?.client?.clientTitle || "",
      clientFirstName: personalDetails?.client?.clientGivenName || "",
      clientMiddleName: personalDetails?.client?.clientMiddleName || "",
      clientLastName: personalDetails?.client?.clientLastName || "",
      clientPreferred: personalDetails?.client?.clientPreferredName || "",
      clientGender: personalDetails?.client?.clientGender || "",
      clientDob: personalDetails?.client?.clientDOB
        ? convertDateAUWithDayJS(personalDetails?.client?.clientDOB)
        : "",
      clientAge: personalDetails?.client?.clientAge || "",
      clientMarital: personalDetails?.client?.clientMaritalStatus || "",
      clientEmployment: personalDetails?.client?.clientEmploymentStatus || "",
      clientRetAge: personalDetails?.client?.clientPlannedRetirementAge || "",
      clientHealth: personalDetails?.client?.clientHealth || "",
      clientSmoker: personalDetails?.client?.clientSmoker || "",
      clientTaxRes: personalDetails?.client?.clientTaxResidentRadio || "",
      clientHealthCover:
        personalDetails?.client?.clientPrivateHealthCoverRadio || "",
      clientHelpDebt: personalDetails?.client?.clientHELPSDebtRadio || "",
      //contect details
      clientHomeAddress: personalDetails?.client?.clientHomeAddress || "",
      clientPostalAddress: personalDetails?.client?.clientPostalAddress || "",
      clientMobile: personalDetails?.client?.clientMobile || "",
      clientHomePhone: personalDetails?.client?.clientHomePhone || "",
      clientWorkPhone: personalDetails?.client?.clientWorkPhone || "",
      clientEmail: personalDetails?.client?.Email || "", // for Partner its partnerEmail

      //Employment Details
      clientOccupation:
        allQuestions?.incomeFromOwnBusiness?.client?.occupation || "",
      clientEmploymentStatus:
        allQuestions?.incomeFromOwnBusiness?.client?.employmentStatus || "",
      clientNameOfCompany:
        allQuestions?.incomeFromOwnBusiness?.client?.nameOfCompany || "",
      clientStartDate: allQuestions?.incomeFromOwnBusiness?.client?.startDate
        ? convertDateAUWithDayJS(
            allQuestions?.incomeFromOwnBusiness?.client?.startDate,
          )
        : "",
      clientHoursWorked:
        allQuestions?.incomeFromOwnBusiness?.client?.hoursWorked || "",
      clientGrossSalary:
        allQuestions?.incomeFromOwnBusiness?.client?.SalaryPackageModal
          ?.grossSalary || "",
      clientSGC:
        allQuestions?.incomeFromOwnBusiness?.client?.SalaryPackageModal?.SGC ||
        "",
      clientSalarySacrificeContributions:
        allQuestions?.incomeFromOwnBusiness?.client?.SalaryPackageModal
          ?.salarySacrificeContributions || "",
      clientAfterTaxContributions:
        allQuestions?.incomeFromOwnBusiness?.client?.SalaryPackageModal
          ?.afterTaxContributions || "",
      clientChoiceOfFund:
        allQuestions?.incomeFromOwnBusiness?.client?.choiceOfFund || "",
      //Salary Packaging Details
      clientEmployerFBTStatus:
        allQuestions?.incomeFromOwnBusiness?.client?.SalaryPackagingModal
          ?.employerFBTStatus || "",
      clientCreditCardMortgageRepayments:
        allQuestions?.incomeFromOwnBusiness?.client?.SalaryPackagingModal
          ?.creditCardMortgageRepayments || "",
      clientCostBaseOfCar:
        allQuestions?.incomeFromOwnBusiness?.client?.SalaryPackagingModal
          ?.costBaseOfCar || "",
      clientFBTPaidByEmployer:
        allQuestions?.incomeFromOwnBusiness?.client?.SalaryPackagingModal
          ?.FBTPaidByEmployer || "",
      clientRunningCostsOfCar:
        allQuestions?.incomeFromOwnBusiness?.client?.SalaryPackagingModal
          ?.runningCostsOfCar || "",
      //Leave Entitlements
      clientAnnual:
        (allQuestions?.incomeFromOwnBusiness?.client?.LeaveEntitlementsModal
          ?.annualLeaveAmount || "") +
        (allQuestions?.incomeFromOwnBusiness?.client?.LeaveEntitlementsModal
          ?.annualLeaveTime || ""),
      clientSick:
        (allQuestions?.incomeFromOwnBusiness?.client?.LeaveEntitlementsModal
          ?.sickLeaveAmount || "") +
        (allQuestions?.incomeFromOwnBusiness?.client?.LeaveEntitlementsModal
          ?.sickLeaveTime || ""),
      clientLongService:
        (allQuestions?.incomeFromOwnBusiness?.client?.LeaveEntitlementsModal
          ?.longServiceLeaveAmount || "") +
        (allQuestions?.incomeFromOwnBusiness?.client?.LeaveEntitlementsModal
          ?.longServiceLeaveTime || ""),

      //Centerlink Details
      clientCRN: allQuestions?.incomeFromCentrelink?.client?.CRN || "",
      clientPaymentType: (
        allQuestions?.incomeFromCentrelink?.client?.paymentType || [""]
      ).join(", "),
      clientFortnightlyPayment:
        allQuestions?.incomeFromCentrelink?.client?.fortnightlyPayment || "",
      clientAnnualPaymentAmount:
        allQuestions?.incomeFromCentrelink?.client?.annualPaymentAmount || "",
      clientCentrelinkCardsHeld: (
        allQuestions?.incomeFromCentrelink?.client?.centrelinkCardsHeld || [""]
      ).join(","),

      ...(!["Single", "Widowed", ""].includes(
        personalDetails?.client?.clientMaritalStatus || "",
      )
        ? {
            //partner Data
            partnerTitle: personalDetails?.partner?.partnerTitle || "",
            partnerFirstName: personalDetails?.partner?.partnerGivenName || "",
            partnerMiddleName:
              personalDetails?.partner?.partnerMiddleName || "",
            partnerLastName: personalDetails?.partner?.partnerLastName || "",
            partnerPreferred:
              personalDetails?.partner?.partnerPreferredName || "",
            partnerGender: personalDetails?.partner?.partnerGender || "",
            partnerDob: personalDetails?.partner?.partnerDOB
              ? convertDateAUWithDayJS(personalDetails?.partner?.partnerDOB)
              : "",
            partnerAge: personalDetails?.partner?.partnerAge || "",
            partnerMarital:
              personalDetails?.partner?.partnerMaritalStatus || "",
            partnerEmployment:
              personalDetails?.partner?.partnerEmploymentStatus || "",
            partnerRetAge:
              personalDetails?.partner?.partnerPlannedRetirementAge || "",
            partnerHealth: personalDetails?.partner?.partnerHealth || "",
            partnerSmoker: personalDetails?.partner?.partnerSmoker || "",
            partnerTaxRes:
              personalDetails?.partner?.partnerTaxResidentRadio || "",
            partnerHealthCover:
              personalDetails?.partner?.partnerPrivateHealthCoverRadio || "",
            partnerHelpDebt:
              personalDetails?.partner?.partnerHELPSDebtRadio || "",
            //contect details
            partnerHomeAddress:
              personalDetails?.partner?.partnerHomeAddress || "",
            partnerPostalAddress:
              personalDetails?.partner?.partnerPostalAddress || "",
            partnerMobile: personalDetails?.partner?.partnerMobile || "",
            partnerHomePhone: personalDetails?.partner?.partnerHomePhone || "",
            partnerWorkPhone: personalDetails?.partner?.partnerWorkPhone || "",
            partnerEmail: personalDetails?.partner?.partnerEmail || "", // for Partner its partnerEmail

            //Employment Details
            partnerOccupation:
              allQuestions?.incomeFromOwnBusiness?.partner?.occupation || "",
            partnerEmploymentStatus:
              allQuestions?.incomeFromOwnBusiness?.partner?.employmentStatus ||
              "",
            partnerNameOfCompany:
              allQuestions?.incomeFromOwnBusiness?.partner?.nameOfCompany || "",
            partnerStartDate: allQuestions?.incomeFromOwnBusiness?.partner
              ?.startDate
              ? convertDateAUWithDayJS(
                  allQuestions?.incomeFromOwnBusiness?.partner?.startDate,
                )
              : "",
            partnerHoursWorked:
              allQuestions?.incomeFromOwnBusiness?.partner?.hoursWorked || "",
            partnerGrossSalary:
              allQuestions?.incomeFromOwnBusiness?.partner?.SalaryPackageModal
                ?.grossSalary || "",
            partnerSGC:
              allQuestions?.incomeFromOwnBusiness?.partner?.SalaryPackageModal
                ?.SGC || "",
            partnerSalarySacrificeContributions:
              allQuestions?.incomeFromOwnBusiness?.partner?.SalaryPackageModal
                ?.salarySacrificeContributions || "",
            partnerAfterTaxContributions:
              allQuestions?.incomeFromOwnBusiness?.partner?.SalaryPackageModal
                ?.afterTaxContributions || "",
            partnerChoiceOfFund:
              allQuestions?.incomeFromOwnBusiness?.partner?.choiceOfFund || "",
            //Salary Packaging Details
            partnerEmployerFBTStatus:
              allQuestions?.incomeFromOwnBusiness?.partner?.SalaryPackagingModal
                ?.employerFBTStatus || "",
            partnerCreditCardMortgageRepayments:
              allQuestions?.incomeFromOwnBusiness?.partner?.SalaryPackagingModal
                ?.creditCardMortgageRepayments || "",
            partnerCostBaseOfCar:
              allQuestions?.incomeFromOwnBusiness?.partner?.SalaryPackagingModal
                ?.costBaseOfCar || "",
            partnerFBTPaidByEmployer:
              allQuestions?.incomeFromOwnBusiness?.partner?.SalaryPackagingModal
                ?.FBTPaidByEmployer || "",
            partnerRunningCostsOfCar:
              allQuestions?.incomeFromOwnBusiness?.partner?.SalaryPackagingModal
                ?.runningCostsOfCar || "",
            //Leave Entitlements
            partnerAnnual:
              (allQuestions?.incomeFromOwnBusiness?.partner
                ?.LeaveEntitlementsModal?.annualLeaveAmount || "") +
              (allQuestions?.incomeFromOwnBusiness?.partner
                ?.LeaveEntitlementsModal?.annualLeaveTime || ""),
            partnerSick:
              (allQuestions?.incomeFromOwnBusiness?.partner
                ?.LeaveEntitlementsModal?.sickLeaveAmount || "") +
              (allQuestions?.incomeFromOwnBusiness?.partner
                ?.LeaveEntitlementsModal?.sickLeaveTime || ""),
            partnerLongService:
              (allQuestions?.incomeFromOwnBusiness?.partner
                ?.LeaveEntitlementsModal?.longServiceLeaveAmount || "") +
              (allQuestions?.incomeFromOwnBusiness?.partner
                ?.LeaveEntitlementsModal?.longServiceLeaveTime || ""),

            //Centerlink Details
            partnerCRN: allQuestions?.incomeFromCentrelink?.partner?.CRN || "",
            partnerPaymentType: (
              allQuestions?.incomeFromCentrelink?.partner?.paymentType || [""]
            ).join(", "),
            partnerFortnightlyPayment:
              allQuestions?.incomeFromCentrelink?.partner?.fortnightlyPayment ||
              "",
            partnerAnnualPaymentAmount:
              allQuestions?.incomeFromCentrelink?.partner
                ?.annualPaymentAmount || "",
            partnerCentrelinkCardsHeld: (
              allQuestions?.incomeFromCentrelink?.partner
                ?.centrelinkCardsHeld || [""]
            ).join(","),
          }
        : {
            // Partner Data
            partnerTitle: "",
            partnerFirstName: "",
            partnerMiddleName: "",
            partnerLastName: "",
            partnerPreferred: "",
            partnerGender: "",
            partnerDob: "",
            partnerAge: "",
            partnerMarital: "",
            partnerEmployment: "",
            partnerRetAge: "",
            partnerHealth: "",
            partnerSmoker: "",
            partnerTaxRes: "",
            partnerHealthCover: "",
            partnerHelpDebt: "",

            // Contact Details
            partnerHomeAddress: "",
            partnerPostalAddress: "",
            partnerMobile: "",
            partnerHomePhone: "",
            partnerWorkPhone: "",
            partnerEmail: "",

            // Employment Details
            partnerOccupation: "",
            partnerEmploymentStatus: "",
            partnerNameOfCompany: "",
            partnerStartDate: "",
            partnerHoursWorked: "",
            partnerGrossSalary: "",
            partnerSGC: "",
            partnerSalarySacrificeContributions: "",
            partnerAfterTaxContributions: "",
            partnerChoiceOfFund: "",

            // Salary Packaging Details
            partnerEmployerFBTStatus: "",
            partnerCreditCardMortgageRepayments: "",
            partnerCostBaseOfCar: "",
            partnerFBTPaidByEmployer: "",
            partnerRunningCostsOfCar: "",

            // Leave Entitlements
            partnerAnnual: "",
            partnerSick: "",
            partnerLongService: "",

            // Centrelink Details
            partnerCRN: "",
            partnerPaymentType: "",
            partnerFortnightlyPayment: "",
            partnerAnnualPaymentAmount: "",
            partnerCentrelinkCardsHeld: "",
          }),
      TotalLivingExpenses:
        allQuestions?.generalLivingExpenses?.generalLivingExpensesTotal || "",

      ...expenseTypes
        .map((expense, index) => {
          const id = expense.id;

          const amount = allQuestions?.generalLivingExpenses?.[id] || "0";

          const frequency =
            allQuestions?.generalLivingExpenses?.[`${id}Type`] || "";

          const numericAmount =
            parseFloat(amount.replace(/[^0-9.-]+/g, "")) || 0;

          const total = numericAmount * parseFloat(frequency) || 0;

          let FrequencyText =
            [
              { value: 52, label: "Weekly" },
              { value: 26, label: "Fortnightly" },
              { value: 12, label: "Monthly" },
              { value: 4, label: "Quarterly" },
              { value: 2, label: "Half Yearly" },
              { value: 1, label: "Annually" },
            ].find((freq) => freq.value.toString() === frequency)?.label || "";

          return {
            [`houseHoldAmount${index + 1}`]: amount,
            [`houseHoldFrequency${index + 1}`]: FrequencyText,
            [`houseHoldTotal${index + 1}`]: toCommaAndDollar(total),
          };
        })
        .reduce((acc, obj) => ({ ...acc, ...obj }), {}),

      ...personalExpenses
        .map((expense, index) => {
          const id = expense.id;

          const amount = allQuestions?.generalLivingExpenses?.[id] || "0";

          const frequency =
            allQuestions?.generalLivingExpenses?.[`${id}Type`] || "";

          const numericAmount =
            parseFloat(amount.replace(/[^0-9.-]+/g, "")) || 0;

          const total = numericAmount * parseFloat(frequency) || 0;

          let FrequencyText =
            [
              { value: 52, label: "Weekly" },
              { value: 26, label: "Fortnightly" },
              { value: 12, label: "Monthly" },
              { value: 4, label: "Quarterly" },
              { value: 2, label: "Half Yearly" },
              { value: 1, label: "Annually" },
            ].find((freq) => freq.value.toString() === frequency)?.label || "";

          return {
            [`lifeStyleAmount${index + 1}`]: amount,
            [`lifeStyleFrequency${index + 1}`]: FrequencyText,
            [`lifeStyleTotal${index + 1}`]: toCommaAndDollar(total),
          };
        })
        .reduce((acc, obj) => ({ ...acc, ...obj }), {}),

      ...transportExpenses
        .map((expense, index) => {
          const id = expense.id;

          const amount = allQuestions?.generalLivingExpenses?.[id] || "0";

          const frequency =
            allQuestions?.generalLivingExpenses?.[`${id}Type`] || "";

          const numericAmount =
            parseFloat(amount.replace(/[^0-9.-]+/g, "")) || 0;

          const total = numericAmount * parseFloat(frequency) || 0;

          let FrequencyText =
            [
              { value: 52, label: "Weekly" },
              { value: 26, label: "Fortnightly" },
              { value: 12, label: "Monthly" },
              { value: 4, label: "Quarterly" },
              { value: 2, label: "Half Yearly" },
              { value: 1, label: "Annually" },
            ].find((freq) => freq.value.toString() === frequency)?.label || "";

          return {
            [`transportAmount${index + 1}`]: amount,
            [`transportFrequency${index + 1}`]: FrequencyText,
            [`transportTotal${index + 1}`]: toCommaAndDollar(total),
          };
        })
        .reduce((acc, obj) => ({ ...acc, ...obj }), {}),

      ...insuranceExpenses
        .map((expense, index) => {
          const id = expense.id;

          const amount = allQuestions?.generalLivingExpenses?.[id] || "0";

          const frequency =
            allQuestions?.generalLivingExpenses?.[`${id}Type`] || "";

          const numericAmount =
            parseFloat(amount.replace(/[^0-9.-]+/g, "")) || 0;

          const total = numericAmount * parseFloat(frequency) || 0;

          let FrequencyText =
            [
              { value: 52, label: "Weekly" },
              { value: 26, label: "Fortnightly" },
              { value: 12, label: "Monthly" },
              { value: 4, label: "Quarterly" },
              { value: 2, label: "Half Yearly" },
              { value: 1, label: "Annually" },
            ].find((freq) => freq.value.toString() === frequency)?.label || "";

          return {
            [`InsuranceAmount${index + 1}`]: amount,
            [`InsuranceFrequency${index + 1}`]: FrequencyText,
            [`InsuranceTotal${index + 1}`]: toCommaAndDollar(total),
          };
        })
        .reduce((acc, obj) => ({ ...acc, ...obj }), {}),
    };

    console.log("Document Payload:", payload);

    await generateDocumentFromTemplate(
      payload,
      "template.docx",
      `Goals_and_Objectives_${personalDetails?.client?.clientPreferredName || "Client"}.docx`,
    );
  } catch (error) {
    console.error("Document generation failed:", error);

    openNotificationSuccess(
      "error",
      "topRight",
      "Document Generation Error",
      error?.message || "Failed to generate document",
    );
  }
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
  convertDateAUWithDayJS,
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
  generateDocumentFromTemplate,
  GeneraDocument,
};
