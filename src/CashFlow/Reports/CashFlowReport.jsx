import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { CashFlowData, defaultUrl, Loading } from "../../Store/Store";
import { scroller } from "react-scroll";
import { ConfigProvider } from "antd";
import CashFlowReportOptions from "../CashFlowOptions/CashFlowReportOptions";
import CashReport from "./TableReports/CashReport";
import AssetLiabilitiesReport from "./TableReports/AssetLiabilitiesReport";
import FinancialInvestmentsReport from "./TableReports/FinancialInvestmentsReport";
import {
  buildReportTree,
  transformInflows,
  openNotificationSuccess,
  PostAxios,
  processDataGeneric,
  changeHeadNames,
  renameYearKeys,
  RenderName,
  percentTransforme,
} from "../../Components/Assets/Api/Api";
import { content } from "../../Content/Content";
import BusinessReport from "./TableReports/BusinessReport";

const CashFlowReport = () => {
  const initialValues = { category: "" };
  const [step, setStep] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [reportSections, setReportSections] = useState({});
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [loading, setLoading] = useRecoilState(Loading);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const scenarioObj = JSON.parse(localStorage.getItem("ScenarioObj"));
      const response = await PostAxios(`${DefaultUrl}/api/cal/report`, {
        scenarioID: scenarioObj._id,
      });

      if (!response) return;

      const {
        REPORTS_Cashflow,
        REPORTS_Tax_Summary,
        REPORTS_Centrelink_Summary,
        REPORTS_Networth,
        REPORTS_Lifestyle_Assets_Debts,
        REPORTS_Client_Investments,
        REPORTS_Partner_Investments,
        REPORTS_Joint_Investments,
        REPORTS_Direct_Property,
      } = response;

      console.log(response);

      const Age = processDataGeneric(
        REPORTS_Cashflow,
        (d) => transformInflows(d, false),
        "Age"
      );
      const InFlow = processDataGeneric(
        REPORTS_Cashflow,
        (d) => transformInflows(d, true),
        "inflows"
      );
      const OutFlow = processDataGeneric(
        REPORTS_Cashflow,
        (d) => transformInflows(d, true),
        "outflows"
      );
      const Surplus = processDataGeneric(
        REPORTS_Cashflow,
        (d) => transformInflows(d, true),
        "surplusDeficit"
      );

      // console.log(Age);

      const cashflowSections = [
        buildReportTree(
          Age,
          content.cashFlowReport[0].reportsArray.Age.map((item, index) => {
            return {
              ...item,
              parent: item.parent
                .replace("{{client}}", RenderName("client"))
                .replace("{{partner}}", RenderName("partner")),
            };
          })
        ),
        buildReportTree(InFlow, content.cashFlowReport[0].reportsArray.inflows),
        buildReportTree(
          OutFlow,
          content.cashFlowReport[0].reportsArray.outFlow
        ),
        buildReportTree(
          Surplus,
          content.cashFlowReport[0].reportsArray.surplus
        ),
      ];

      const fullTableCashFlow = cashflowSections.flat().map((item, index) => ({
        ...item,
        key: (index + 1).toString(),
        type:
          ["", "", "Inflow", "Outflow", "Surplus/Deficit "][index] || item.type,
      }));

      const processTaxSection = (key, section) =>
        buildReportTree(
          processDataGeneric(
            REPORTS_Tax_Summary,
            (d) => transformInflows(d, true),
            key
          ),
          section
        );

      const clientData = changeHeadNames(
        [
          { ...cashflowSections[0][0] },
          ...processTaxSection(
            "clientTaxPosition",
            content.cashFlowReport[0].reportsArray.clientTaxPosition
          ),
        ],
        [
          "",
          "Total Assessable income ",
          "Total Allowable Deductions ",
          "Total Taxable Income",
          "Total Tax payable ",
          "Total Rebates ",
          "Total Tax payable ",
        ]
      );

      const partnerData = changeHeadNames(
        [
          { ...cashflowSections[0][1] },
          ...processTaxSection(
            "partnerTaxPosition",
            content.cashFlowReport[0].reportsArray.clientTaxPosition
          ),
        ],
        [
          "",
          "Total Assessable income ",
          "Total Allowable Deductions ",
          "Total Taxable Income",
          "Total Tax payable ",
          "Total Rebates ",
          "Total Tax payable ",
        ]
      );

      const centrelinkSections = [
        {
          key: "assetsTestPensionAllowance",
          apiKey: "assetsTestPensionAllowance",
          sessionKey: "centerLinkAllowanceDataSet",
          label: "Assets Test Pension Allowance",
        },
        {
          key: "incomeTestPensionsAllowances",
          apiKey: "incomeTestAssessment",
          sessionKey: "centerLinkIncomeDataSet",
          label: "Income Test Pensions & Allowances",
        },
        {
          key: "allowance",
          apiKey: "incomeTestAllowances",
          sessionKey: "centerLinkIncomeTestAllowancesDataSet",
          label: "Income Test Allowances",
        },
        {
          key: "clientIncome",
          apiKey: "clientIncome",
          sessionKey: "centerLinkClientIncomeDataSet",
          label: "Client Income",
        },
        {
          key: "partnerIncome",
          apiKey: "partnerIncome",
          sessionKey: "centerLinkPartnerIncomeDataSet",
          label: "Partner Income",
        },
        {
          key: "clientPayment",
          apiKey: "clientPayment",
          sessionKey: "centerLinkClientPaymnetDataSet",
          label: "Client Payment",
        },
        {
          key: "partnerPayment",
          apiKey: "partnerPayment",
          sessionKey: "centerLinkClientPaymnetDataSet",
          label: "Partner Payment",
        },
        {
          key: "familyTaxBenefit",
          apiKey: "familyTaxBenefit",
          sessionKey: "familyTaxBanifit",
          label: "Family Tax Benefit",
        },
      ];

      const fullCentrelinkTable = centrelinkSections
        .flatMap(({ apiKey, sessionKey, label }) => {
          const sectionData = buildReportTree(
            processDataGeneric(
              REPORTS_Centrelink_Summary,
              (d) => transformInflows(d, true),
              apiKey
            ),
            content.cashFlowReport[0].reportsArray[sessionKey].map(
              (section) => ({
                ...section,
                children: section.children.map((label) =>
                  label
                    .replace("{{client}}", RenderName("client"))
                    .replace("{{partner}}", RenderName("partner"))
                    .replace("{{joint}}", RenderName("joint"))
                ),
              })
            )
          );

          // Optionally label the top row if needed
          if (sectionData.length > 0) {
            sectionData[0].type = label;
          }

          return sectionData;
        })
        .map((item, index) => {
          return {
            ...item,
            key: (index + 1).toString(),
          };
        });

      // Step 1: Extract the last item (familyTaxBenefit row)
      const familyTaxBenefitRow = changeHeadNames(
        fullCentrelinkTable.slice(-6),
        [
          "Total Adjusted Family Income ",
          "Total FTB- Part A (including Supplement) ",
          "Total Income For Primary Income Earner ",
          "Total Income For Secondary Income Earner ",
          "Total FTB- Part B (including Supplement) ",
          "Total Family tax Benefits (Part A & B)",
        ]
      );

      // Step 2: Remove it from the fullCentrelinkTable (non-mutating way)
      const filteredCentrelinkTable = fullCentrelinkTable.slice(0, -6);

      filteredCentrelinkTable.unshift(
        cashflowSections[0][0],
        cashflowSections[0][1]
      );

      familyTaxBenefitRow.unshift(
        cashflowSections[0][0],
        cashflowSections[0][1]
      );

      //Assets and Liabilities
      const assets = buildReportTree(
        processDataGeneric(
          REPORTS_Networth,
          (d) => transformInflows(d, true),
          "assets"
        ),
        content.cashFlowReport[1].reportsArray.assets
      );

      const liabilities = buildReportTree(
        processDataGeneric(
          REPORTS_Networth,
          (d) => transformInflows(d, true),
          "liabilities"
        ),
        content.cashFlowReport[1].reportsArray.liabilities
      );

      const newLiabilities = [
        cashflowSections[0][0],
        cashflowSections[0][1],
        ...changeHeadNames(
          renameYearKeys([
            assets[0], // already unshifted into liabilities originally
            ...liabilities,
          ]),
          ["Assets", "Liabilities", "", ""]
        ),
      ];

      const lifestyleAssetsArray = [
        cashflowSections[0][1],
        cashflowSections[0][0],
        ...[
          "home",
          "personalAsset",
          "personalLoan1",
          "personalLoan2",
          "creditCard1",
          "creditCard2",
        ]
          .flatMap((key) => {
            return buildReportTree(
              processDataGeneric(
                REPORTS_Lifestyle_Assets_Debts,
                (d) => transformInflows(d, true),
                key
              ),
              content.cashFlowReport[1].reportsArray[key]
            );
          })
          .map((item, index) => {
            const newtypeArray = [
              "Home",
              "Home Loan",
              "Personal Asset",
              "Personal Loan 1",
              "Personal Loan 2",
              "Credit Card 1",
              "Credit Card 2",
            ];
            return {
              ...item,
              key: (index + 1).toString(),
              type: newtypeArray[index] || item.type,
            };
          }),
      ];

      const isMarried = localStorage.getItem("UserStatus") === "Married";

      const investmentTypes = [
        { key: "directShares", title: "Direct Shares" },
        { key: "managedFunds", title: "Managed Funds" },
        { key: "investmentBonds", title: "Investment Bonds" },
        { key: "other", title: "Other" },
        { key: "cash", title: "Cash" },
        { key: "termDeposits", title: "Term Deposits" },
        { key: "investmentLoans", title: "Investment Loans" },
        { key: "marginLoans", title: "Margin Loans" },
      ];

      // Helper to get reports
      const getReport = (source, key, keyAddition = "") => {
        console.log(key.replace(/[^a-zA-Z]/g, ""));
        buildReportTree(
          processDataGeneric(
            source,
            (d) => transformInflows(d, true),
            key + keyAddition
          ),
          content.cashFlowReport[2].reportsArray[
            keyMap[key.replace(/[^a-zA-Z]/g, "")]
          ]
        );
      };

      // Title mapping for reportsArray access
      const keyMap = {
        directShares: "Direct Shares",
        managedFunds: "Managed Funds",
        investmentBonds: "Investment Bonds",
        other: "Other",
        cash: "Cash",
        termDeposits: "Term Deposits",
        investmentLoans: "Investment Loans",
        marginLoans: "Margin Loans",
      };

      // Build Full Object
      const FullFinansialInvestmentObject = {};

      investmentTypes.forEach(({ key, title }) => {
        FullFinansialInvestmentObject[keyMap[key]] = {
          client: changeHeadNames(
            getReport(REPORTS_Client_Investments, key, "2"),
            ["Value at Year End "]
          ),
          partner: isMarried
            ? changeHeadNames(
                getReport(REPORTS_Partner_Investments, key, "2"),
                ["Value at Year End "]
              )
            : [],
          joint: isMarried
            ? changeHeadNames(getReport(REPORTS_Joint_Investments, key, "2"), [
                "Value at Year End ",
              ])
            : [],
        };

        // Percentage reports only for specific types
        if (
          [
            "directShares",
            "managedFunds",
            "investmentBonds",
            "other",
            "cash",
            "termDeposits",
          ].includes(key)
        ) {
          FullFinansialInvestmentObject[`${keyMap[key]}Percent`] = {
            client: percentTransforme(REPORTS_Client_Investments[`${key}1`]),
            partner: isMarried
              ? percentTransforme(REPORTS_Partner_Investments[`${key}1`])
              : [],
            joint: isMarried
              ? percentTransforme(REPORTS_Joint_Investments[`${key}1`])
              : [],
          };
        }
      });

      //Business Investment Property
      const BusinessReportObject = {};

      const directProperty = Array.from({ length: 10 }).map((_, index) => ({
        key: `Property${index + 1}`,
        title: `Direct Property ${index + 1}`,
      }));

      directProperty.forEach(({ key, title }) => {
        console.log(getReport(REPORTS_Direct_Property, key));

        BusinessReportObject[title] = changeHeadNames(
          getReport(REPORTS_Direct_Property, key),
          ["Total Expenses ", ""]
        );
        
      });

      console.log(BusinessReportObject);

      setReportSections({
        fullTableCashFlow,
        clientData,
        partnerData,
        centrelinkCombined: filteredCentrelinkTable,
        familyTaxBenefit: familyTaxBenefitRow,
        asset: newLiabilities,
        asstesAndLiabilities: lifestyleAssetsArray,
        FullFinansialInvestmentObject,
        BusinessReportObject,
      });
    } catch (err) {
      console.error("Report Error", err);
      openNotificationSuccess(
        "error",
        "topRight",
        "Report Failed",
        "Something went wrong. Please try later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        enableReinitialize
      >
        {({ values, setFieldValue, handleChange, handleBlur }) => (
          <Form>
            <div name="topSection">
              <CashFlowReportOptions step={step} setStep={setStep} />
            </div>

            <ConfigProvider
              theme={{
                token: { colorPrimary: "#36b446", colorLink: "#36b446" },
              }}
            >
              <div className="px-0 px-md-4 reportSection">
                {step === 0 && (
                  <CashReport
                    {...{
                      showFilters,
                      setShowFilters,
                      values,
                      setFieldValue,
                      handleChange,
                      handleBlur,
                    }}
                    {...reportSections}
                  />
                )}
                {step === 1 && (
                  <AssetLiabilitiesReport
                    {...{
                      showFilters,
                      setShowFilters,
                      values,
                      setFieldValue,
                      handleChange,
                      handleBlur,
                    }}
                    asset={reportSections.asset}
                    asstesAndLiabilities={reportSections.asstesAndLiabilities}
                  />
                )}
                {step === 2 && (
                  <FinancialInvestmentsReport
                    {...{
                      showFilters,
                      setShowFilters,
                      values,
                      setFieldValue,
                      handleChange,
                      handleBlur,
                    }}
                    {...reportSections}
                  />
                )}
                {step === 3 && (
                  <BusinessReport
                    {...{
                      showFilters,
                      setShowFilters,
                      values,
                      setFieldValue,
                      handleChange,
                      handleBlur,
                    }}
                    {...reportSections}
                  />
                )}

                <div className="row justify-content-between px-2 my-5">
                  <button
                    className="btn btn-outline w-25 backBtn"
                    type="button"
                    onClick={() => {
                      if (step <= 0) {
                        navigate("/Cash-Flow/Reports/");
                      } else {
                        setStep(step - 1);
                        scroller.scrollTo("topSection", {
                          duration: 500,
                          smooth: "easeInOutQuad",
                        });
                      }
                    }}
                  >
                    Back
                  </button>
                  <button
                    className="btn bgColor w-25 modalBtn"
                    type="button"
                    onClick={() => {
                      setStep(step + 1);
                      scroller.scrollTo("topSection", {
                        duration: 500,
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
        )}
      </Formik>
    </div>
  );
};

export default CashFlowReport;
