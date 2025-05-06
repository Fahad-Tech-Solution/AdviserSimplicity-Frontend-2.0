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
            let clientAndPartner = ["client", "partner", "joint"];
            return {
              ...item,
              parent: RenderName(clientAndPartner[index]),
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
            content.cashFlowReport[0].reportsArray[sessionKey]
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
        cashflowSections[0][1],
        cashflowSections[0][0],
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

      // Financial Investments

      let clientDirectShare = buildReportTree(
        processDataGeneric(
          REPORTS_Client_Investments,
          (d) => transformInflows(d, true),
          "directShares2"
        ),
        content.cashFlowReport[2].reportsArray["Direct Shares"]
      );

      let partnerDirectShare =
        localStorage.getItem("UserStatus") === "Married"
          ? buildReportTree(
              processDataGeneric(
                REPORTS_Partner_Investments,
                (d) => transformInflows(d, true),
                "directShares2"
              ),
              content.cashFlowReport[2].reportsArray["Direct Shares"]
            )
          : [];

      let jointDirectShare =
        localStorage.getItem("UserStatus") === "Married"
          ? buildReportTree(
              processDataGeneric(
                REPORTS_Joint_Investments,
                (d) => transformInflows(d, true),
                "directShares2"
              ),
              content.cashFlowReport[2].reportsArray["Direct Shares"]
            )
          : [];

      let clientManagedFunds = buildReportTree(
        processDataGeneric(
          REPORTS_Client_Investments,
          (d) => transformInflows(d, true),
          "managedFunds2"
        ),
        content.cashFlowReport[2].reportsArray["Managed Funds"]
      );

      let partnerManagedFunds =
        localStorage.getItem("UserStatus") === "Married"
          ? buildReportTree(
              processDataGeneric(
                REPORTS_Partner_Investments,
                (d) => transformInflows(d, true),
                "managedFunds2"
              ),
              content.cashFlowReport[2].reportsArray["Managed Funds"]
            )
          : [];

      let jointManagedFunds =
        localStorage.getItem("UserStatus") === "Married"
          ? buildReportTree(
              processDataGeneric(
                REPORTS_Joint_Investments,
                (d) => transformInflows(d, true),
                "managedFunds2"
              ),
              content.cashFlowReport[2].reportsArray["Managed Funds"]
            )
          : [];

      let clientInvestmentBonds = buildReportTree(
        processDataGeneric(
          REPORTS_Client_Investments,
          (d) => transformInflows(d, true),
          "investmentBonds2"
        ),
        content.cashFlowReport[2].reportsArray["Investment Bonds"]
      );

      let partnerInvestmentBonds =
        localStorage.getItem("UserStatus") === "Married"
          ? buildReportTree(
              processDataGeneric(
                REPORTS_Partner_Investments,
                (d) => transformInflows(d, true),
                "investmentBonds2"
              ),
              content.cashFlowReport[2].reportsArray["Investment Bonds"]
            )
          : [];

      let jointInvestmentBonds =
        localStorage.getItem("UserStatus") === "Married"
          ? buildReportTree(
              processDataGeneric(
                REPORTS_Joint_Investments,
                (d) => transformInflows(d, true),
                "investmentBonds2"
              ),
              content.cashFlowReport[2].reportsArray["Investment Bonds"]
            )
          : [];

      let clientOther = buildReportTree(
        processDataGeneric(
          REPORTS_Client_Investments,
          (d) => transformInflows(d, true),
          "other2"
        ),
        content.cashFlowReport[2].reportsArray["Other"]
      );

      let partnerOther =
        localStorage.getItem("UserStatus") === "Married"
          ? buildReportTree(
              processDataGeneric(
                REPORTS_Partner_Investments,
                (d) => transformInflows(d, true),
                "other2"
              ),
              content.cashFlowReport[2].reportsArray["Other"]
            )
          : [];

      let jointOther =
        localStorage.getItem("UserStatus") === "Married"
          ? buildReportTree(
              processDataGeneric(
                REPORTS_Joint_Investments,
                (d) => transformInflows(d, true),
                "other2"
              ),
              content.cashFlowReport[2].reportsArray["Other"]
            )
          : [];

      let clientCash = buildReportTree(
        processDataGeneric(
          REPORTS_Client_Investments,
          (d) => transformInflows(d, true),
          "cash2"
        ),
        content.cashFlowReport[2].reportsArray["Cash"]
      );

      let partnerCash =
        localStorage.getItem("UserStatus") === "Married"
          ? buildReportTree(
              processDataGeneric(
                REPORTS_Partner_Investments,
                (d) => transformInflows(d, true),
                "cash2"
              ),
              content.cashFlowReport[2].reportsArray["Cash"]
            )
          : [];

      let jointCash =
        localStorage.getItem("UserStatus") === "Married"
          ? buildReportTree(
              processDataGeneric(
                REPORTS_Joint_Investments,
                (d) => transformInflows(d, true),
                "cash2"
              ),
              content.cashFlowReport[2].reportsArray["Cash"]
            )
          : [];

      let FullFinansialInvestmentObject = {
        DirectShares: {
          client: changeHeadNames(clientDirectShare, ["Value at Year End "]),
          partner:
            changeHeadNames(partnerDirectShare, ["Value at Year End "]) || [],
          joint:
            changeHeadNames(jointDirectShare, ["Value at Year End "]) || [],
        },
        DirectSharesPercent: {
          client: percentTransforme(REPORTS_Client_Investments.directShares1),
          partner:
            localStorage.getItem("UserStatus") === "Married"
              ? percentTransforme(REPORTS_Partner_Investments.directShares1)
              : [],
          joint:
            localStorage.getItem("UserStatus") === "Married"
              ? percentTransforme(REPORTS_Joint_Investments.directShares1)
              : [],
        },
        ManagedFunds: {
          client: changeHeadNames(clientManagedFunds, ["Value at Year End "]),
          partner:
            changeHeadNames(partnerManagedFunds, ["Value at Year End "]) || [],
          joint:
            changeHeadNames(jointManagedFunds, ["Value at Year End "]) || [],
        },
        ManagedFundsPercent: {
          client: percentTransforme(REPORTS_Client_Investments.managedFunds1),
          partner:
            localStorage.getItem("UserStatus") === "Married"
              ? percentTransforme(REPORTS_Partner_Investments.managedFunds1)
              : [],
          joint:
            localStorage.getItem("UserStatus") === "Married"
              ? percentTransforme(REPORTS_Joint_Investments.managedFunds1)
              : [],
        },
        InvestmentBonds: {
          client: changeHeadNames(clientInvestmentBonds, [
            "Value at Year End ",
          ]),
          partner:
            changeHeadNames(partnerInvestmentBonds, ["Value at Year End "]) ||
            [],
          joint:
            changeHeadNames(jointInvestmentBonds, ["Value at Year End "]) || [],
        },
        InvestmentBondsPercent: {
          client: percentTransforme(
            REPORTS_Client_Investments.investmentBonds1
          ),
          partner:
            localStorage.getItem("UserStatus") === "Married"
              ? percentTransforme(REPORTS_Partner_Investments.investmentBonds1)
              : [],
          joint:
            localStorage.getItem("UserStatus") === "Married"
              ? percentTransforme(REPORTS_Joint_Investments.investmentBonds1)
              : [],
        },
        Other: {
          client: changeHeadNames(clientOther, ["Value at Year End "]),
          partner: changeHeadNames(partnerOther, ["Value at Year End "]) || [],
          joint: changeHeadNames(jointOther, ["Value at Year End "]) || [],
        },
        OtherPercent: {
          client: percentTransforme(REPORTS_Client_Investments.other1),
          partner:
            localStorage.getItem("UserStatus") === "Married"
              ? percentTransforme(REPORTS_Partner_Investments.other1)
              : [],
          joint:
            localStorage.getItem("UserStatus") === "Married"
              ? percentTransforme(REPORTS_Joint_Investments.other1)
              : [],
        },
        Cash: {
          client: changeHeadNames(clientCash, ["Value at Year End "]),
          partner: changeHeadNames(partnerCash, ["Value at Year End "]) || [],
          joint: changeHeadNames(jointCash, ["Value at Year End "]) || [],
        },
        CashPercent: {
          client: percentTransforme(REPORTS_Client_Investments.cash1),
          partner:
            localStorage.getItem("UserStatus") === "Married"
              ? percentTransforme(REPORTS_Partner_Investments.cash1)
              : [],
          joint:
            localStorage.getItem("UserStatus") === "Married"
              ? percentTransforme(REPORTS_Joint_Investments.cash1)
              : [],
        },
      };

      console.log(FullFinansialInvestmentObject);

      setReportSections({
        fullTableCashFlow,
        clientData,
        partnerData,
        centrelinkCombined: filteredCentrelinkTable,
        familyTaxBenefit: familyTaxBenefitRow,
        asset: newLiabilities,
        asstesAndLiabilities: lifestyleAssetsArray,
        FullFinansialInvestmentObject,
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
