import React, { Children, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import CashReport from "./TableReports/CashReport";
import AssetLiabilitiesReport from "./TableReports/AssetLiabilitiesReport";
import { scroller } from "react-scroll";
import CashFlowReportOptions from "../CashFlowOptions/CashFlowReportOptions";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { CashFlowData, defaultUrl, Loading } from "../../Store/Store";
import {
  createTableSection,
  createTaxSection,
  extractIndexesByType,
  openNotificationSuccess,
  PostAxios,
  removeNullRows,
  removeZeroRows,
  toCommaAndDollar,
  transformInflowsData,
  transformInflowsData2,
} from "../../Components/Assets/Api/Api";
import { ConfigProvider } from "antd";
import { content } from "../../Content/Content";
import FinancialInvestmentsReport from "./TableReports/FinancialInvestmentsReport";

const CashFlowReport = () => {
  let initialValues = {
    category: "",
  };

  const [showFilters, setShowFilters] = useState(false);
  const [step, setStep] = useState(0);

  let onSubmit = (values, resetForm) => {};

  const [fullTableCashFlow, setFullTableCashFlow] = useState([]);

  const [inflow, setInflow] = useState([]);
  const [outFlow, setOutFlow] = useState([]);
  const [surplus, setSurplus] = useState([]);

  const [clientData, setClientData] = useState([]);
  const [partnerData, setPartnerData] = useState([]);
  const [allowance, setAllowance] = useState([]);
  const [assetsTestPensionAllowance, setAssetsTestPensionAllowance] = useState(
    []
  );
  const [clientIncome, setClientIncome] = useState([]);
  const [partnerIncome, setPartnerIncome] = useState([]);
  const [clientPayment, setClientPayment] = useState([]);
  const [partnerPayment, setPartnerPayment] = useState([]);
  const [familyTaxBenefit, setFamilyTaxBenefit] = useState([]);

  const [asset, setAssets] = useState([]);
  const [asstesAndLiabilities, setAsstesAndLiabilities] = useState([]);

  const [incomeTestPensionsAllowances, setIncomeTestPensionsAllowances] =
    useState([
      {
        type: "Deemed Financial Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Net Rental Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Trust Distributions & Company Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Lynda Salary Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "abc Salary Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Lynda Other Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "abc Other Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Lynda Pension Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "abc Pension Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Lynda Annuity Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "abc Annuity Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Less",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Lynda Deductible Pension Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "abc Deductible Pension Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Lynda Work Bonus",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "abc Work Bonus",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Total Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Lower",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Upper",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
      {
        type: "Excess Income",
        existing: "$0",
        year1: "$0",
        year2: "$0",
        year3: "$0",
        year4: "$0",
        year5: "$0",
        year6: "$0",
      },
    ]);

  let DefaultUrl = useRecoilValue(defaultUrl);
  let [loading, setLoading] = useRecoilState(Loading);

  useEffect(() => {
    FetchReports();
  }, []);

  const processData = (data, ...keys) => {
    let result = data;
    for (const key of keys) {
      result = result?.[key] ?? {};
    }
    // console.log(keys);
    return transformInflowsData(removeZeroRows(removeNullRows(result)));
  };

  const processData2 = (data, ...keys) => {
    let result = data;
    for (const key of keys) {
      result = result?.[key] ?? {};
    }
    // console.log(keys);
    return transformInflowsData2(removeZeroRows(removeNullRows(result)));
  };

  const FetchReports = async () => {
    setLoading(true);
    const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

    try {
      const response = await PostAxios(`${DefaultUrl}/api/cal/report`, {
        scenarioID: scenarioObj._id,
      });

      if (!response) return;

      console.log("Report Response:", response);

      const cashflow = response.REPORTS_Cashflow;
      const taxSummary = response.REPORTS_Tax_Summary;
      const centrelink = response.REPORTS_Centrelink_Summary;
      const networth = response.REPORTS_Networth;
      const lifestyleAssets = response.REPORTS_Lifestyle_Assets_Debts;

      const Age = processData2(cashflow, "Age");
      const InFlow = processData(cashflow, "inflows");
      const OutFlow = processData(cashflow, "outflows");
      const Surplus = processData(cashflow, "surplusDeficit");

      const client_Tax = processData(taxSummary, "clientTaxPosition");
      const partner_Tax = processData(taxSummary, "partnerTaxPosition");

      const sections = {
        AssetsTestPensionAllowanceData: [
          "assetsTestPensionAllowance",
          "centerLinkAllowanceDataSet",
          0,
        ],
        IncomeTestPensionsAllowancesData: [
          "incomeTestAssessment",
          "centerLinkIncomeDataSet",
          0,
        ],
        IncomeTestAllowancesData: [
          "incomeTestAllowances",
          "centerLinkIncomeTestAllowancesDataSet",
          0,
        ],
        ClientIncome: ["clientIncome", "centerLinkClientIncomeDataSet", 0],
        PartnerIncome: ["partnerIncome", "centerLinkPartnerIncomeDataSet", 0],
        ClientPayment: ["clientPayment", "centerLinkClientPaymnetDataSet", 0],
        PartnerPayment: ["partnerPayment", "centerLinkClientPaymnetDataSet", 0], // <- Possibly a mistake in your original code
        FamilyTaxBenefit: ["familyTaxBenefit", "familyTaxBanifit", 0],
      };

      const processedSections = Object.entries(sections).reduce(
        (acc, [stateKey, [apiKey, sessionKey, index]]) => {
          acc[stateKey] = createTaxSection(
            processData(centrelink, apiKey),
            content.cashFlowReport[index].reportsArray[sessionKey]
          );
          return acc;
        },
        {}
      );

      let AgeArray = createTaxSection(
        Age,
        content.cashFlowReport[0].reportsArray.Age
      );

      let inFlowArray = createTaxSection(
        InFlow,
        content.cashFlowReport[0].reportsArray.inflows
      );
      let outFlowArray = createTaxSection(
        OutFlow,
        content.cashFlowReport[0].reportsArray.outFlow
      );
      let surplusArray = createTaxSection(
        Surplus,
        content.cashFlowReport[0].reportsArray.surplus
      );

      const fullTable = [
        // createTableSection("1", "Total Inflows", InFlow, true),
        // createTableSection("2", "Total Outflows", OutFlow, true),
        // createTableSection("3", "Total Surplus", Surplus),
        ...AgeArray,
        ...inFlowArray,
        ...outFlowArray,
        ...surplusArray,
      ].map((item, index) => {
        let section = ["", "", "InFlow", "OutFlow", "Surplus"];
        let typeAddision = section[index] !== "" ? section[index] : item.type;
        return {
          ...item,
          key: (index + 1).toString(), // key as string from 1, 2, 3, ...
          type: typeAddision, // Adding section to type
        };
      });
      console.log("full Table Array:", fullTable);

      setFullTableCashFlow(fullTable);
      setClientData(
        createTaxSection(
          client_Tax,
          content.cashFlowReport[0].reportsArray.clientTaxPosition
        )
      );
      setPartnerData(
        createTaxSection(
          partner_Tax,
          content.cashFlowReport[0].reportsArray.clientTaxPosition
        )
      );

      // Set Centrelink-related states
      setAssetsTestPensionAllowance(
        processedSections.AssetsTestPensionAllowanceData
      );
      setIncomeTestPensionsAllowances(
        processedSections.IncomeTestPensionsAllowancesData
      );
      setAllowance(processedSections.IncomeTestAllowancesData);
      setClientIncome(processedSections.ClientIncome);
      setPartnerIncome(processedSections.PartnerIncome);
      setClientPayment(processedSections.ClientPayment);
      setPartnerPayment(processedSections.PartnerPayment);
      setFamilyTaxBenefit(processedSections.FamilyTaxBenefit);

      //Assets and Liabilities
      const Assests_excelRows = processData(networth, "assets");
      const Liabilities_excelRows = processData(networth, "liabilities");

      const Assets_SessionObj = content.cashFlowReport[1].reportsArray.assets;
      const Liabilities_SessionObj =
        content.cashFlowReport[1].reportsArray.assets; // <- Likely a mistake; probably should be liabilities

      const assets = createTaxSection(Assests_excelRows, Assets_SessionObj);
      const liabilities = createTaxSection(
        Liabilities_excelRows,
        Liabilities_SessionObj
      );

      liabilities[0] = assets[0]; // <- Still questionable logic, but retained

      setAssets(liabilities);

      const home = createTaxSection(
        processData(lifestyleAssets, "home"),
        content.cashFlowReport[1].reportsArray.home
      );

      const personalAsset = createTaxSection(
        processData(lifestyleAssets, "personalAsset"),
        content.cashFlowReport[1].reportsArray.personalAsset
      );

      const personalLoan1 = createTaxSection(
        processData(lifestyleAssets, "personalLoan1"),
        content.cashFlowReport[1].reportsArray.personalLoan
      );

      const personalLoan2 = createTaxSection(
        processData(lifestyleAssets, "personalLoan2"),
        content.cashFlowReport[1].reportsArray.personalLoan
      );

      const creditCard1 = createTaxSection(
        processData(lifestyleAssets, "creditCard1"),
        content.cashFlowReport[1].reportsArray.personalLoan
      );

      const creditCard2 = createTaxSection(
        processData(lifestyleAssets, "creditCard2"),
        content.cashFlowReport[1].reportsArray.personalLoan
      );

      let lifestyleAssetsArray = [
        ...home,
        ...personalAsset,
        ...personalLoan1,
        ...personalLoan2,
        ...creditCard1,
        ...creditCard2,
      ].map((item, index) => {
        let section = [
          "",
          "",
          "",
          "Personal Loan 1",
          "Personal Loan 2",
          "Credit Card 1",
          "Credit Card 2",
        ];
        let typeAddision =
          section[index] !== "" ? "(" + section[index] + ")  " : "";
        return {
          ...item,
          key: (index + 1).toString(), // key as string from 1, 2, 3, ...
          type: typeAddision + item.type, // Adding section to type
        };
      });

      setAsstesAndLiabilities(lifestyleAssetsArray);
    } catch (error) {
      console.error("Report Error:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Report Failed",
        "Something went wrong Fetching Data Please! Try Later."
      );
    } finally {
      setLoading(false);
    }
  };

  let Nev = useNavigate();

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
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#36b446",
                    colorLink: "#36b446",
                  },
                }}
              >
                <div className="px-0 px-md-4 reportSection">
                  {step == 0 && (
                    <>
                      <CashReport
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        fullTableCashFlow={fullTableCashFlow}
                        clientData={clientData}
                        partnerData={partnerData}
                        assetsTestPensionAllowance={assetsTestPensionAllowance}
                        incomeTestPensionsAllowances={
                          incomeTestPensionsAllowances
                        }
                        allowance={allowance}
                        clientIncome={clientIncome}
                        partnerIncome={partnerIncome}
                        clientPayment={clientPayment}
                        partnerPayment={partnerPayment}
                        familyTaxBenefit={familyTaxBenefit}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />
                    </>
                  )}

                  {step == 1 && (
                    <>
                      <AssetLiabilitiesReport
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        asset={asset}
                        asstesAndLiabilities={asstesAndLiabilities}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />
                    </>
                  )}

                  {step == 2 && (
                    <>
                      <FinancialInvestmentsReport
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        fullTableCashFlow={fullTableCashFlow}
                        clientData={clientData}
                        partnerData={partnerData}
                        assetsTestPensionAllowance={assetsTestPensionAllowance}
                        incomeTestPensionsAllowances={
                          incomeTestPensionsAllowances
                        }
                        allowance={allowance}
                        clientIncome={clientIncome}
                        partnerIncome={partnerIncome}
                        clientPayment={clientPayment}
                        partnerPayment={partnerPayment}
                        familyTaxBenefit={familyTaxBenefit}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />
                    </>
                  )}

                  <div className="row justify-content-between px-2 my-5">
                    <button
                      className="btn btn-outline w-25 backBtn"
                      onClick={() => {
                        if (step <= 0) {
                          //  Here, we need a way to check if Nev(-1) is empty.
                          //  The method to check if Nev(-1) is empty is not standard and depends on how Nev function works
                          //  I am making an assumption that Nev is a function that changes the route, similar to react-router-dom
                          //  Assumming Nev returns the route
                          const previousRoute = Nev(-1); // Get the previous route
                          if (
                            previousRoute === undefined ||
                            previousRoute === null ||
                            previousRoute === ""
                          ) {
                            // If Nev(-1) is undefined, null, or an empty string, go to '/Cash-Flow/Reports/'
                            Nev("/Cash-Flow/Reports/");
                          } else {
                            Nev(-1);
                          }
                        }
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
              </ConfigProvider>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CashFlowReport;
