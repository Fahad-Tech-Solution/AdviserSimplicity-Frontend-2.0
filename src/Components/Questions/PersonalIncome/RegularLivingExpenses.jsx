import React, { useEffect, useMemo, useState } from "react";
import { Collapse, Typography, Divider } from "antd";
import { Formik, Form } from "formik";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  defaultUrl,
  QuestionDetail,
  PersonalDetailsData,
} from "../../../Store/Store";
import {
  PostAxios,
  PatchAxios,
  openNotificationSuccess,
  toCommaAndDollar,
} from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const { Title } = Typography;
const AntDTableHOC = DynamicTableForInputsSection("antd");

const RegularLivingExpenses = (props) => {
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  const personalDetailObj = useRecoilValue(PersonalDetailsData);

  let regularLivingExpenses =
    Object.keys(questionDetail["generalLivingExpenses"] || {}).length > 0
      ? questionDetail["generalLivingExpenses"]
      : {};
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

  const initialValues = {
    household: [
      ...expenseTypes.map((Item, index) => {
        return {
          key: Item.name + "_" + index,
          dbKey: Item.id,
          name: Item.name,
          amount: "",
          frequency: "",
        };
      }),
    ],
    personal: [
      ...personalExpenses.map((Item, index) => {
        return {
          key: Item.name + "_" + index,
          name: Item.name,
          amount: "",
          dbKey: Item.id,
          frequency: "",
        };
      }),
    ],
    transport: [
      ...transportExpenses.map((Item, index) => {
        return {
          key: Item.name + "_" + index,
          name: Item.name,
          amount: "",
          dbKey: Item.id,
          frequency: "",
        };
      }),
    ],
    insurance: [
      ...insuranceExpenses.map((Item, index) => {
        return {
          key: Item.name + "_" + index,
          name: Item.name,
          amount: "",
          dbKey: Item.id,
          frequency: "",
        };
      }),
    ],
  };

  const [totals, setTotals] = useState({
    household: 0,
    personal: 0,
    transport: 0,
    insurance: 0,
  });

  const fillInitialValues = (setFieldValue, questionDetail) => {
    const data = regularLivingExpenses;
    // console.log(regularLivingExpenses);
    if (!data || !data._id) return false;

    // console.log("🧩 Populating initial values from DB:", data);

    // Helper to generate section data based on your predefined arrays
    const mapSection = (expenseArray) => {
      return expenseArray.map((item, index) => {
        const amount = data[item.id] || "";
        const frequency = data[`${item.id}Type`] || "";

        const amountNum = parseFloat(
          String(amount || "0").replace(/[^0-9.-]+/g, "")
        );
        const freqNum = parseFloat(frequency || "0");

        return {
          key: `${item.name}_${index}`,
          dbKey: item.id,
          name: item.name,
          amount,
          frequency,
          total:
            amount && frequency ? toCommaAndDollar(amountNum * freqNum) : "",
        };
      });
    };

    // console.log(mapSection(expenseTypes));

    // Apply to all sections using your predefined mappings
    setFieldValue("household", mapSection(expenseTypes));
    setFieldValue("personal", mapSection(personalExpenses));
    setFieldValue("transport", mapSection(transportExpenses));
    setFieldValue("insurance", mapSection(insuranceExpenses));

    // optional: if you also have an "other" section
    if (typeof otherExpenses !== "undefined") {
      setFieldValue("other", mapSection(otherExpenses));
    }

    return true;
  };

  const calculateTotals = (values) => {
    const sectionTotals = {};
    // console.log(values);

    Object.keys(values).forEach((section) => {
      sectionTotals[section] = values[section].reduce(
        (acc, curr) =>
          acc +
          (parseFloat(curr.amount.replace(/[^0-9.-]+/g, "")) || 0) *
            parseFloat(curr.frequency || 0),
        0
      );
    });

    setTotals(sectionTotals);
    // console.log("🧮 Totals calculated:", sectionTotals);
  };

  const convertValuesForBackend = (values) => {
    const result = {};

    Object.entries(values).forEach(([section, items]) => {
      items.forEach((item) => {
        if (!item.dbKey) return;

        // make first letter lowercase after prefix (ex: houseHoldWaterRates)
        const finalKey = item.dbKey;

        // assign values
        result[finalKey] = item.amount || "$0";
        result[`${finalKey}Type`] = item.frequency || "0";
      });
    });

    result["generalLivingExpensesTotal"] = toCommaAndDollar(
      Object.values(totals).reduce(
        (sum, val) => sum + (parseFloat(val) || 0),
        0
      )
    );
    return result;
  };

  const onSubmit = async (values) => {
    // console.log(
    //   "🚀 Submitting Regular Living Expenses:",
    //   values,
    //   convertValuesForBackend(values)
    // );

    const obj = {
      ...convertValuesForBackend(values),
      clientFK: localStorage.getItem("UserID"),
    };

    try {
      let res;
      if (!questionDetail.generalLivingExpenses?._id) {
        console.log("📤 Sending POST request...");
        res = await PostAxios(
          `${DefaultUrl}/api/generalLivingExpenses/Add`,
          obj
        );
      } else {
        console.log("📤 Sending PATCH request...");
        res = await PatchAxios(
          `${DefaultUrl}/api/generalLivingExpenses/Update`,
          obj
        );
      }

      if (res) {
        console.log("✅ API Response:", res);
        const updatedData = { ...questionDetail, generalLivingExpenses: res };
        setQuestionDetail(updatedData);

        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          'Data of "Regular Living Expenses" saved successfully.'
        );

        if (props.flagState) {
          props.setFlagState(false);
          props.setIsEditing(!props.isEditing);
        }
      }
    } catch (error) {
      console.error("🔥 Error during save:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        "Failed to save Regular Living Expenses. Please try again."
      );
    }
  };

  const getNestedValue = (obj, path) => {
    try {
      return path
        .replace(/\[(\d+)\]/g, ".$1") // convert [0] → .0
        .split(".")
        .filter(Boolean)
        .reduce(
          (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
          obj
        );
    } catch {
      return undefined;
    }
  };

  const calculateTotal = (values, setFieldValue, thisInput, stakeHolder) => {
    const cleanPath = stakeHolder.replace(/\.$/, ""); // remove trailing dot if exists
    const baseObj = getNestedValue(values, cleanPath);

    let amount = parseFloat(baseObj?.amount?.replace(/[^0-9.-]+/g, "") || 0);
    let frequency = parseFloat(baseObj?.frequency || 0);

    switch (thisInput.name) {
      case stakeHolder + "amount":
        amount = parseFloat(thisInput.value.replace(/[^0-9.-]+/g, "") || 0);
        break;
      case stakeHolder + "frequency":
        frequency = parseFloat(thisInput.value || 0);
        break;
    }

    setFieldValue(stakeHolder + "total", toCommaAndDollar(amount * frequency));
  };

  const columns = [
    {
      title: "Expense Type",
      dataIndex: "name",
      key: "owner",
    },
    {
      title: "Amount ($)",
      dataIndex: "amount",
      key: "amount",
      type: "number-toComma",
      placeholder: "Enter Amount",
      callBack: true,
      func: calculateTotal,
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      type: "select",
      selectedOptionValue: true,
      options: [
        { value: 52, label: "Weekly" },
        { value: 26, label: "Fortnightly" },
        { value: 12, label: "Monthly" },
        { value: 4, label: "Quarterly" },
        { value: 2, label: "Half Yearly" },
        { value: 1, label: "Annually" },
      ],
      callBack: true,
      func: calculateTotal,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      type: "number-toComma",
      disabled: true,
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        useEffect(() => {
          calculateTotals(values);
        }, [values]);

        const totalOverall = useMemo(
          () =>
            Object.values(totals).reduce(
              (sum, val) => sum + (parseFloat(val) || 0),
              0
            ),
          [totals]
        );

        const tableData = useMemo(() => {
          const buildTableData = (sectionName) =>
            (values[sectionName] || []).map((item, index) => ({
              ...item,
              key: `${sectionName}_${index}`,
              stakeHolder: `${sectionName}[${index}]`,
              name: item.name || "",
              amount: item.amount || "",
              frequency: item.frequency || "",
              total: item.total,
            }));

          return {
            household: buildTableData("household"),
            personal: buildTableData("personal"),
            transport: buildTableData("transport"),
            insurance: buildTableData("insurance"),
            // other: buildTableData("other"),
          };
        }, [values]);

        const collapseItems = [
          {
            key: "1",
            label: (
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>🏠 Household Expenses</span>
                <strong>${totals.household?.toLocaleString() || 0}</strong>
              </div>
            ),
            children: (
              <div className="All_Client reportSection">
                <AntDTableHOC
                  columns={columns}
                  data={tableData.household}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  sectionKey="household"
                  handleSubmit={props?.handleOk}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                />
              </div>
            ),
          },
          {
            key: "2",
            label: (
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>🧍 Personal Expenses</span>
                <strong>${totals.personal?.toLocaleString() || 0}</strong>
              </div>
            ),
            children: (
              <div className="All_Client reportSection">
                <AntDTableHOC
                  columns={columns}
                  data={tableData.personal}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  sectionKey="personal"
                  handleSubmit={props?.handleOk}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                />
              </div>
            ),
          },
          {
            key: "3",
            label: (
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>🚗 Transport Expenses</span>
                <strong>${totals.transport?.toLocaleString() || 0}</strong>
              </div>
            ),
            children: (
              <div className="All_Client reportSection">
                <AntDTableHOC
                  columns={columns}
                  data={tableData.transport}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  sectionKey="transport"
                  handleSubmit={props?.handleOk}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                />
              </div>
            ),
          },
          {
            key: "4",
            label: (
              <div className="d-flex justify-content-between align-items-center w-100">
                <span>🩺 Insurance Expenses</span>
                <strong>${totals.insurance?.toLocaleString() || 0}</strong>
              </div>
            ),
            children: (
              <div className="All_Client reportSection">
                <AntDTableHOC
                  columns={columns}
                  data={tableData.insurance}
                  values={values}
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  sectionKey="insurance"
                  handleSubmit={props?.handleOk}
                  isEditing={props?.isEditing}
                  setIsEditing={props?.setIsEditing}
                />
              </div>
            ),
          },
        ];

        return (
          <Form>
            <div>
              <Title
                level={4}
                style={{
                  background: "linear-gradient(90deg, #36b446, #2b6e2f)",
                  color: "#fff",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  marginBottom: 20,
                }}
              >
                <h4
                  style={{ color: "inherit" }}
                  onClick={() => {
                    console.log(values);
                  }}
                >
                  <strong>Total Expenses:</strong>{" "}
                  <span className="float-end">
                    ${totalOverall.toLocaleString()}
                  </span>
                </h4>
              </Title>

              <Collapse
                accordion
                items={collapseItems}
                bordered={false}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                }}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegularLivingExpenses;
