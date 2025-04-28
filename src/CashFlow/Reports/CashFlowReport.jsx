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
} from "../../Components/Assets/Api/Api";
import { ConfigProvider } from "antd";
import { content } from "../../Content/Content";

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

  const [liabilities, setLiabilities] = useState([
    {
      type: "Home Loan",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Personal Loans",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Credit Cards",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Investment Loans",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Investment Property Loans",
      existing: "$0",
      year1: "$0",
      year2: "$0",
      year3: "$0",
      year4: "$0",
      year5: "$0",
      year6: "$0",
    },
    {
      type: "Total Liabilities",
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

  const FetchReports = async () => {
    setLoading(true);
    const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));

    try {
      const response = await PostAxios(`${DefaultUrl}/api/cal/report`, {
        scenarioID: scenarioObj._id,
      });

      if (response) {
        console.log("Report Response:", response);

        const InFlow = transformInflowsData(
          removeZeroRows(response.REPORTS_Cashflow.inflows)
        );
        const OutFlow = transformInflowsData(
          removeZeroRows(response.REPORTS_Cashflow.outflows)
        );
        const Surplus = transformInflowsData(
          removeZeroRows(
            removeNullRows(response.REPORTS_Cashflow.surplusDeficit)
          )
        );

        const client_Tax = transformInflowsData(
          removeZeroRows(
            removeNullRows(response.REPORTS_Tax_Summary.clientTaxPosition)
          )
        );

        const partner_Tax = transformInflowsData(
          removeZeroRows(
            removeNullRows(response.REPORTS_Tax_Summary.partnerTaxPosition)
          )
        );

        const CenterlinkAllowance_excelRows = transformInflowsData(
          removeZeroRows(
            removeNullRows(
              response.REPORTS_Centrelink_Summary.assetsTestPensionAllowance
            )
          )
        );

        const CenterlinkIncome_excelRows = transformInflowsData(
          removeZeroRows(
            removeNullRows(
              response.REPORTS_Centrelink_Summary.incomeTestAssessment
            )
          )
        );

        const CenterlinkIncomeTestAllowence_excelRows = transformInflowsData(
          removeZeroRows(
            removeNullRows(
              response.REPORTS_Centrelink_Summary.incomeTestAllowances
            )
          )
        );

        const CenterlinkClientIncome_excelRows = transformInflowsData(
          removeZeroRows(
            removeNullRows(response.REPORTS_Centrelink_Summary.clientIncome)
          )
        );

        const CenterlinkPartnerIncome_excelRows = transformInflowsData(
          removeZeroRows(
            removeNullRows(response.REPORTS_Centrelink_Summary.partnerIncome)
          )
        );

        const CenterlinkClientPaymnet_excelRows = transformInflowsData(
          removeZeroRows(
            removeNullRows(response.REPORTS_Centrelink_Summary.clientPayment)
          )
        );

        const CenterlinkPartnerPaymnet_excelRows = transformInflowsData(
          removeZeroRows(
            removeNullRows(response.REPORTS_Centrelink_Summary.partnerPayment)
          )
        );

        const FamilyTaxBanifit_excelRows = transformInflowsData(
          removeZeroRows(
            removeNullRows(response.REPORTS_Centrelink_Summary.familyTaxBenefit)
          )
        );

        const Assests_excelRows = transformInflowsData(
          removeZeroRows(removeNullRows(response.REPORTS_Networth.assets))
        );

        const Liabilities_excelRows = transformInflowsData(
          removeZeroRows(removeNullRows(response.REPORTS_Networth.liabilities))
        );

        // const personalDebet_excelRows = transformInflowsData(
        //   removeZeroRows(
        //     removeNullRows(response.REPORTS_Networth.personalDebet)
        //   )
        // );

        // console.log("Liabilities_excelRows:", Liabilities_excelRows);

        const fullTable = [
          createTableSection("1", "Total Inflows", InFlow, true),
          createTableSection("2", "Total Outflows", OutFlow, true),
          createTableSection("3", "Total Surplus", Surplus),
        ];

        let client_Tax_SessionObj =
          content.cashFlowReport[0].reportsArray.clientTaxPosition;

        let centerLinkAllowance_SessionObj =
          content.cashFlowReport[0].reportsArray.centerLinkAllowanceDataSet;

        let centerLinkIncome_SessionObj =
          content.cashFlowReport[0].reportsArray.centerLinkIncomeDataSet;

        let centerLinkAllowances_SessionObj =
          content.cashFlowReport[0].reportsArray
            .centerLinkIncomeTestAllowancesDataSet;

        let centerLinkClientIncome_SessionObj =
          content.cashFlowReport[0].reportsArray.centerLinkClientIncomeDataSet;

        let centerLinkPartnerIncome_SessionObj =
          content.cashFlowReport[0].reportsArray.centerLinkPartnerIncomeDataSet;

        let centerLinkClientPaymnet_SessionObj =
          content.cashFlowReport[0].reportsArray.centerLinkClientPaymnetDataSet;

        let FamilyTaxBanifit_SessionObj =
          content.cashFlowReport[0].reportsArray.familyTaxBanifit;

        let Assets_SessionObj = content.cashFlowReport[1].reportsArray.assets;

        let Liabilities_SessionObj =
          content.cashFlowReport[1].reportsArray.assets;

        const clinet_Tax_Table = createTaxSection(
          client_Tax,
          client_Tax_SessionObj
        );

        const partner_Tax_Table = createTaxSection(
          partner_Tax,
          client_Tax_SessionObj
        );

        const AssetsTestPensionAllowanceData = createTaxSection(
          CenterlinkAllowance_excelRows,
          centerLinkAllowance_SessionObj
        );

        const IncomeTestPensionsAllowancesData = createTaxSection(
          CenterlinkIncome_excelRows,
          centerLinkIncome_SessionObj
        );

        const IncomeTestAllowancesData = createTaxSection(
          CenterlinkIncomeTestAllowence_excelRows,
          centerLinkAllowances_SessionObj
        );

        const ClientIncome = createTaxSection(
          CenterlinkClientIncome_excelRows,
          centerLinkClientIncome_SessionObj
        );

        const partnerIncome = createTaxSection(
          CenterlinkPartnerIncome_excelRows,
          centerLinkPartnerIncome_SessionObj
        );

        const clientPaymnet = createTaxSection(
          CenterlinkClientPaymnet_excelRows,
          centerLinkClientPaymnet_SessionObj
        );

        const partnerPaymnet = createTaxSection(
          CenterlinkPartnerPaymnet_excelRows,
          centerLinkClientPaymnet_SessionObj
        );

        const familyTaxBanifit = createTaxSection(
          FamilyTaxBanifit_excelRows,
          FamilyTaxBanifit_SessionObj
        );

        const assets = createTaxSection(Assests_excelRows, Assets_SessionObj);

        const liabilities = createTaxSection(
          Liabilities_excelRows,
          Liabilities_SessionObj
        );
        liabilities[0] = assets[0];

        console.log("liabilities:", liabilities);

        setAssets(liabilities);

        setFullTableCashFlow(fullTable);
        setClientData(clinet_Tax_Table);
        setPartnerData(partner_Tax_Table);
        setAssetsTestPensionAllowance(AssetsTestPensionAllowanceData);
        setIncomeTestPensionsAllowances(IncomeTestPensionsAllowancesData);
        setAllowance(IncomeTestAllowancesData);
        setClientIncome(ClientIncome);
        setPartnerIncome(partnerIncome);
        setClientPayment(clientPaymnet);
        setPartnerPayment(partnerPaymnet);
        setFamilyTaxBenefit(familyTaxBanifit);

        // Assets and Liabilities Report
        // setAssets(assets);
      }
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
                        setInflow={setInflow}
                        liabilities={liabilities}
                        setOutFlow={setOutFlow}
                        surplus={surplus}
                        setSurplus={setSurplus}
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
