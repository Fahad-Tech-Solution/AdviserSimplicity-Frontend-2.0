import React, { useState } from "react";
import { Form, Formik } from "formik";
import { openNotificationSuccess } from "../../Components/Assets/Api/Api";
import CashReport from "./TableReports/CashReport";
import AssetLiabilitiesReport from "./TableReports/AssetLiabilitiesReport";
import { scroller } from "react-scroll";
import CashFlowReportOptions from "../CashFlowOptions/CashFlowReportOptions";

const CashFlowReport = () => {
  let initialValues = {
    category: "",
  };

  const [showFilters, setShowFilters] = useState(false);
  const [step, setStep] = useState(0);

  let onSubmit = (values, resetForm) => {};

  const [columns, setColumn] = useState([
    {
      title: "Year",
      dataIndex: "type",
      key: "type",
      width: 250, // 👈 Set fixed width
      fixed: "left", // 👈 Fix column to the left
    },
    {
      title: "1",
      dataIndex: "year1",
      key: "1",
      sorter: (a, b) =>
        a.year1.replace(/[^0-9.-]+/g, "") - b.year1.replace(/[^0-9.-]+/g, ""),
    },
    {
      title: "2",
      dataIndex: "year2",
      key: "2",
      sorter: (a, b) =>
        a.year2.replace(/[^0-9.-]+/g, "") - b.year2.replace(/[^0-9.-]+/g, ""),
    },
    {
      title: "3",
      dataIndex: "year3",
      key: "3",
      sorter: (a, b) =>
        a.year3.replace(/[^0-9.-]+/g, "") - b.year3.replace(/[^0-9.-]+/g, ""),
    },
    {
      title: "4",
      dataIndex: "year4",
      key: "4",
      sorter: (a, b) =>
        a.year4.replace(/[^0-9.-]+/g, "") - b.year4.replace(/[^0-9.-]+/g, ""),
    },
    {
      title: "5",
      dataIndex: "year5",
      key: "5",
      sorter: (a, b) =>
        a.year5.replace(/[^0-9.-]+/g, "") - b.year5.replace(/[^0-9.-]+/g, ""),
    },
    {
      title: "6",
      dataIndex: "year6",
      key: "6",
      align: "left",
      sorter: (a, b) =>
        a.year6.replace(/[^0-9.-]+/g, "") - b.year6.replace(/[^0-9.-]+/g, ""),
    },
  ]);

  const [inflow, setInflow] = useState([
    {
      type: "Salary Income",
      year1: "$908,223",
      year2: "$908,223",
      year3: "$908,223",
      year4: "$908,223",
      year5: "$908,223",
      year6: "$908,223",
      year7: "$908,223",
      year8: "$908,223",
      year9: "$908,223",
      year10: "$908,223",
    },
    {
      type: "Other Taxable income",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Net Business Income",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Net Income From Business (Coy & Trust)",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Other Non-Taxable income",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Rental Income",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Investment Income",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Interest Income",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Trust Distributions",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Family Tax Payments (A & B)",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Centrelink Payments",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Child Maintenance Received",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Super Pensions",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Annuity Income",
      year1: "$12",
      year2: "$13",
      year3: "$13",
      year4: "$14",
      year5: "$15",
      year6: "$0",
    },
    {
      type: "Lumpsum Super & Pension W/Drawals",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Investment Redemptions",
      year1: "$881,232",
      year2: "$81",
      year3: "$81",
      year4: "$81",
      year5: "$81",
      year6: "$81",
    },
    {
      type: "Loan Additions",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Other Lumpsum Additions",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Total Inflows",
      year1: "$881,244",
      year2: "$13",
      year3: "$13",
      year4: "$14",
      year5: "$15",
      year6: "$223",
    },
  ]);

  const [outFlow, setOutFlow] = useState([
    {
      type: "General Living Expenses",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Holidays",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Otder Expenses",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Personal Insurances",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Education Expenses",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Child Maintenance Payed",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Other Lumpsum Purchases",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Property Expenses",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Non-Deductible Loan Repayments",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Loan Repayments (Property Loans)",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Investment Loan Repayments",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Additional Purchases of Investments",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Tax",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Concessional Super Contributions",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Non-Concessional Super Contributions",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Total Inflows",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
  ]);

  const [surplus, setSurplus] = useState([
    {
      type: "Surplus/Deficit",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Home Loan End",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Cash Savings Year End",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
  ]);

  const applyFilter = (values) => {
    if (values.yearFrom !== "" && values.yearTo !== "") {
      const yearFrom = parseInt(values.yearFrom, 10);
      const yearTo = parseInt(values.yearTo, 10);

      if (!isNaN(yearFrom) && !isNaN(yearTo) && yearFrom <= yearTo) {
        const dynamicYearColumns = [];

        for (let year = yearFrom; year <= yearTo; year++) {
          dynamicYearColumns.push({
            title: year.toString(),
            dataIndex: `year${year}`, // You may need to match this with your data source
            key: year.toString(),
            sorter: (a, b) =>
              (a[`year${year}`]?.replace?.(/[^0-9.-]+/g, "") || 0) -
              (b[`year${year}`]?.replace?.(/[^0-9.-]+/g, "") || 0),
          });
        }

        // Combine the fixed left column with the dynamic years
        const updatedColumns = [
          {
            title: "Year",
            dataIndex: "type",
            key: "type",
            width: 250,
            fixed: "left",
          },
          ...dynamicYearColumns,
        ];

        setColumn(updatedColumns);
      } else {
        openNotificationSuccess(
          "error",
          "topRight",
          "Error Notification",
          "Please! Enter valid year range"
        );
      }
    } else {
      console.warn("Invalid year range");
    }
  };

  return (
    <div className="container-fluid  ">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, handleChange, handleBlur, resetForm }) => {
          return (
            <Form>
              <div name="topSection">
                <CashFlowReportOptions step={step} setStep={setStep} />
              </div>

              <div className="px-0 px-md-4 reportSection">
                {step == 0 && (
                  <>
                    <CashReport
                      showFilters={showFilters}
                      setShowFilters={setShowFilters}
                      columns={columns}
                      setColumn={setColumn}
                      inflow={inflow}
                      setInflow={setInflow}
                      outFlow={outFlow}
                      setOutFlow={setOutFlow}
                      surplus={surplus}
                      setSurplus={setSurplus}
                      applyFilter={applyFilter}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  </>
                )}

                {step == 1 && (
                  <>
                    <AssetLiabilitiesReport
                      showFilters={showFilters}
                      setShowFilters={setShowFilters}
                      columns={columns}
                      setColumn={setColumn}
                      inflow={inflow}
                      setInflow={setInflow}
                      outFlow={outFlow}
                      setOutFlow={setOutFlow}
                      surplus={surplus}
                      setSurplus={setSurplus}
                      applyFilter={applyFilter}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  </>
                )}

                <div className="row justify-content-between px-2 my-5">
                  <button
                    className="btn btn-outline w-25 backBtn"
                    onClick={() => {
                      setStep(step - 1);
                      scroller.scrollTo("topSection", {
                        duration: 500,
                        delay: 0,
                        smooth: "easeInOutQuad",
                      });
                    }}
                  >
                    Back
                  </button>
                  <button
                    className="btn bgColor w-25 modalBtn"
                    onClick={() => {
                      setStep(step + 1);
                      scroller.scrollTo("topSection", {
                        duration: 500,
                        delay: 0,
                        smooth: "easeInOutQuad",
                      });
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CashFlowReport;
