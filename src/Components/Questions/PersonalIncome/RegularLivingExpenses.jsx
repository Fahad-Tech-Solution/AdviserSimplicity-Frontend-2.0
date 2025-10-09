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
} from "../../Assets/Api/Api";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const { Title } = Typography;

const RegularLivingExpenses = (props) => {
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  const personalDetailObj = useRecoilValue(PersonalDetailsData);

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
          frequency: "",
        };
      }),
    ],
    other: [
      ...insuranceExpenses.map((Item, index) => {
        return {
          key: Item.name + "_" + index,
          name: Item.name,
          amount: "",
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
    other: 0,
  });

  const fillInitialValues = (setFieldValue) => {
    const data = questionDetail?.regularLivingExpenses;
    if (data) {
      console.log("🧩 Populating initial values:", data);
      setFieldValue("household", data.household || []);
      setFieldValue("personal", data.personal || []);
      setFieldValue("transport", data.transport || []);
      setFieldValue("insurance", data.insurance || []);
      setFieldValue("other", data.other || []);
    }
  };

  const calculateTotals = (values) => {
    const sectionTotals = {};
    console.log(values);

    // Object.keys(values).forEach((section) => {
    //   sectionTotals[section] = values[section].reduce(
    //     (acc, curr) => acc + (parseFloat(curr.amount) || 0),
    //     0
    //   );
    // });
    // setTotals(sectionTotals);
    console.log("🧮 Totals calculated:", sectionTotals);
  };

  const onSubmit = async (values) => {
    console.log("🚀 Submitting Regular Living Expenses:", values);

    const obj = { ...values, clientFK: localStorage.getItem("UserID") };

    try {
      let res;
      if (!questionDetail.regularLivingExpenses?._id) {
        console.log("📤 Sending POST request...");
        res = await PostAxios(
          `${DefaultUrl}/api/regularLivingExpenses/Add`,
          obj
        );
      } else {
        console.log("📤 Sending PATCH request...");
        res = await PatchAxios(
          `${DefaultUrl}/api/regularLivingExpenses/Update`,
          obj
        );
      }

      if (res) {
        console.log("✅ API Response:", res);
        const updatedData = { ...questionDetail, regularLivingExpenses: res };
        setQuestionDetail(updatedData);

        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          'Data of "Regular Living Expenses" saved successfully.'
        );
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

  const AntDTableHOC = DynamicTableForInputsSection("antd");

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
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      key: "frequency",
      type: "select",
      options: [
        { value: 52, label: "Weekly" },
        { value: 26, label: "Fortnightly" },
        { value: 12, label: "Monthly" },
        { value: 4, label: "Quarterly" },
        { value: 2, label: "Six-Monthly" },
        { value: 1, label: "Annually" },
      ],
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
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
            }));

          return {
            household: buildTableData("household"),
            personal: buildTableData("personal"),
            transport: buildTableData("transport"),
            insurance: buildTableData("insurance"),
            other: buildTableData("other"),
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
                />
              </div>
            ),
          },
          // {
          //   key: "5",
          //   label: (
          //     <div className="d-flex justify-content-between align-items-center w-100">
          //       <span>💡 Other Expenses</span>
          //       <strong>${totals.other?.toLocaleString() || 0}</strong>
          //     </div>
          //   ),
          //   children: (
          //     <div className="All_Client reportSection">
          //       <AntDTableHOC
          //         columns={columns}
          //         data={tableData.other}
          //         values={values}
          //         setFieldValue={setFieldValue}
          //         handleChange={handleChange}
          //         handleBlur={handleBlur}
          //         sectionKey="other"
          //       />
          //     </div>
          //   ),
          // },
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
                  <strong>Total Monthly Expenses:</strong>{" "}
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

              {/* <Divider />

              <div className="text-end mt-3">
                <h5>
                  <strong>Total Monthly Expenses:</strong>{" "}
                  <span style={{ color: "#36b446" }}>
                    ${totalOverall.toLocaleString()}
                  </span>
                </h5>
              </div> */}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegularLivingExpenses;
