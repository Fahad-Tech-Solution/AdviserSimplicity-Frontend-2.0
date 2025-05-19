import React, { useEffect, useState } from "react";
import FunnalComp from "./FunnalComp";
import { Route, Routes } from "react-router-dom";
import AssetsAndLiabilities from "./AssetsAndLiabilities";
import CashFlowReport from "./CashFlowReport";
import {
  buildReportTree,
  changeHeadNames,
  openNotificationSuccess,
  percentTransforme,
  PostAxios,
  processDataGeneric,
  renameYearKeys,
  RenderName,
  transformInflows,
} from "../../Components/Assets/Api/Api";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, Loading, ReportsData } from "../../Store/Store";
import { content } from "../../Content/Content";

const Reports = () => {
  const [reportSections, setReportSections] = useRecoilState(ReportsData);
  const DefaultUrl = useRecoilValue(defaultUrl);
  const [loading, setLoading] = useRecoilState(Loading);

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
        REPORTS_Client_Super_Pension,
        REPORTS_Partner_Super_Pension,
        REPORTS_Business_Entities,
        REPORTS_TRUST_Assets_and_Income,
      } = response;

      console.log(response.REPORTS_TRUST_Assets_and_Income);

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

      // Unified meta array for all investment types
      const investmentMeta = [
        {
          key: "directShares",
          title: "Direct Shares",
          keyMapping: "Direct Shares",
        },
        {
          key: "managedFunds",
          title: "Managed Funds",
          keyMapping: "Managed Funds",
        },
        {
          key: "investmentBonds",
          title: "Investment Bonds",
          keyMapping: "Investment Bonds",
        },
        { key: "other", title: "Other", keyMapping: "Other" },
        { key: "cash", title: "Cash", keyMapping: "Cash" },
        {
          key: "termDeposits",
          title: "Term Deposits",
          keyMapping: "Term Deposits",
        },
        {
          key: "investmentLoans",
          title: "Investment Loans",
          keyMapping: "Investment Loans",
        },
        {
          key: "marginLoans",
          title: "Margin Loans",
          keyMapping: "Margin Loans",
        },
      ];

      // Enhanced helper function
      const getReport = (
        source,
        key,
        keyMapping,
        keyAddition = "",
        contentblock
      ) => {
        let contentIndex = contentblock || 2;
        return buildReportTree(
          processDataGeneric(
            source,
            (d) => transformInflows(d, true),
            key + keyAddition
          ),
          content.cashFlowReport[contentIndex].reportsArray[keyMapping].map(
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
      };

      // Main financial investment object
      const FullFinansialInvestmentObject = {};

      // Loop through each investment type
      investmentMeta.forEach(({ key, title, keyMapping }) => {
        // Main investment report
        FullFinansialInvestmentObject[title] = {
          client: changeHeadNames(
            getReport(REPORTS_Client_Investments, key, keyMapping, "2"),
            ["Value at Year End "]
          ),
          partner: isMarried
            ? changeHeadNames(
                getReport(REPORTS_Partner_Investments, key, keyMapping, "2"),
                ["Value at Year End "]
              )
            : [],
          joint: isMarried
            ? changeHeadNames(
                getReport(REPORTS_Joint_Investments, key, keyMapping, "2"),
                ["Value at Year End "]
              )
            : [],
        };

        // Percent report if applicable
        const showPercent = [
          "directShares",
          "managedFunds",
          "investmentBonds",
          "other",
          "cash",
          "termDeposits",
        ].includes(key);

        if (showPercent) {
          FullFinansialInvestmentObject[`${title}Percent`] = {
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

      // Direct properties (Property 1 to 10)
      const directProperty = Array.from({ length: 10 }).map((_, index) => ({
        key: `Property${index + 1}`,
        title: `Property ${index + 1}`,
      }));

      directProperty.forEach(({ key, title }) => {
        FullFinansialInvestmentObject[title] = {
          client: changeHeadNames(
            getReport(REPORTS_Direct_Property, key, "Property"),
            ["Total Expenses ", ""]
          ),
        };
      });

      directProperty.forEach(({ key, title }) => {
        FullFinansialInvestmentObject["Position" + title] = {
          client: changeHeadNames(
            getReport(REPORTS_Direct_Property, key, "PositionProperty"),
            ["Property Value", "Loan Balance"]
          ),
        };
      });

      const InvestmentMetaConfig = [
        {
          groupKey: "Super",
          key: "superFund",
          title: "Super 1",
          keyMapping: "Superannuation",
          objNo: "1",
          Headers: ["", "", "Inflow", "Outflow"],
        },
        {
          groupKey: "Super",
          key: "superFund",
          title: "Super 2",
          keyMapping: "Superannuation",
          objNo: "2",
          Headers: ["", "", "Inflow", "Outflow"],
        },
        {
          groupKey: "Pension",
          key: "pensionFund",
          title: "Pension 1",
          keyMapping: "Pensionannuation",
          objNo: "1",
          Headers: ["Inflow", "Outflow"],
        },
        {
          groupKey: "Pension",
          key: "pensionFund",
          title: "Pension 2",
          keyMapping: "Pensionannuation",
          objNo: "2",
          Headers: ["Inflow", "Outflow"],
        },
      ];

      // Data sources to loop over
      const sourceTypes = [
        {
          label: "client",
          report: REPORTS_Client_Super_Pension,
        },
        {
          label: "partner",
          report: REPORTS_Partner_Super_Pension,
        },
      ];

      const InvestmentMeta = {};

      // Deep clone rows and assign unique keys
      const deepCloneWithKeys = (rows, parentTitle) =>
        rows?.map((row, rowIndex) => ({
          ...row,
          key: `${parentTitle}_row_${rowIndex}`,
          children: row.children
            ? row.children.map((child, childIndex) => ({
                ...child,
                key: `${parentTitle}_row_${rowIndex}_child_${childIndex}`,
              }))
            : undefined,
        })) || [];

      // Step 1: Collect data into InvestmentMeta
      InvestmentMetaConfig.forEach(
        ({ groupKey, key, title, keyMapping, objNo, Headers }) => {
          const profileKey = `${key}${objNo}Profile`;

          if (!InvestmentMeta[groupKey]) InvestmentMeta[groupKey] = {};

          // Initialize object under this title if not already
          if (!InvestmentMeta[groupKey][title])
            InvestmentMeta[groupKey][title] = {};

          // Loop over both client and partner
          sourceTypes.forEach(({ label, report }) => {
            const mainData = changeHeadNames(
              getReport(report, key, keyMapping, objNo),
              Headers
            );

            InvestmentMeta[groupKey][title][label] = deepCloneWithKeys(
              mainData,
              `${title}_${label}`
            );

            // Percent data
            if (!InvestmentMeta[groupKey][`${title}Percent`])
              InvestmentMeta[groupKey][`${title}Percent`] = {};

            InvestmentMeta[groupKey][`${title}Percent`][label] =
              percentTransforme(report[profileKey] || []);
          });
        }
      );

      // Step 2: Assign to FullFinansialInvestmentObject
      Object.entries(InvestmentMeta).forEach(([groupKey, reports]) => {
        const mainRows = Object.entries(reports)
          .filter(([k]) => !k.includes("Percent"))
          .map(([title, data], index) => ({
            key: `${groupKey.toLowerCase()}_${index + 1}`,
            type: title,
            client: deepCloneWithKeys(data.client, `${title}_client`),
            partner: deepCloneWithKeys(data.partner, `${title}_partner`),
            ...Object.fromEntries(
              Array.from({ length: 10 }, (_, i) => [`year${i + 1}`, ""])
            ),
          }));

        FullFinansialInvestmentObject[groupKey] = {
          client: mainRows.map((row) => ({
            key: row.key,
            type: row.type,
            children: row.client,
            ...Object.fromEntries(
              Array.from({ length: 10 }, (_, i) => [`year${i + 1}`, ""])
            ),
          })),
          partner: mainRows.map((row) => ({
            key: row.key,
            type: row.type,
            children: row.partner,
            ...Object.fromEntries(
              Array.from({ length: 10 }, (_, i) => [`year${i + 1}`, ""])
            ),
          })),
        };

        // Add percent data
        // Object.entries(reports)
        //   .filter(([k]) => k.includes("Percent"))
        //   .forEach(([title, percentData]) => {
        //     const finalKey = buildPercentKey(groupKey, title);
        //     FullFinansialInvestmentObject[finalKey] = {
        //       client: [...percentData.client],
        //       partner: [...percentData.partner],
        //     };
        //   });

        // Add combined percent data (like main structure)
        const combinedPercentKey = `${groupKey}Percent1`;
        if (!FullFinansialInvestmentObject[combinedPercentKey]) {
          FullFinansialInvestmentObject[combinedPercentKey] = {
            client: [],
            partner: [],
          };
        }

        Object.entries(reports)
          .filter(([k]) => k.includes("Percent"))
          .forEach(([title, percentData], index) => {
            const cleanedTitle = title.replace("Percent", ""); // e.g., Super 1

            const entryBase = {
              investment: cleanedTitle,
              details: "",
            };

            FullFinansialInvestmentObject[combinedPercentKey].client.push({
              ...entryBase,
              key: `${combinedPercentKey.toLowerCase()}_client_${index + 1}`,
              children: [...(percentData.client || [])],
            });

            FullFinansialInvestmentObject[combinedPercentKey].partner.push({
              ...entryBase,
              key: `${combinedPercentKey.toLowerCase()}_partner_${index + 1}`,
              children: [...(percentData.partner || [])],
            });
          });
      });

      const Annuties = Array.from({ length: 3 }).map((_, index) => ({
        key: `clientAnnuity` + (index + 1),
        title: `Annuity`,
        key2: `partnerAnnuity` + (index + 1),
      }));

      let clientAnnutiesArray = [];
      let partnerAnnutiesArray = [];

      Annuties.forEach(({ key, title, key2 }, index) => {
        const clientData = changeHeadNames(
          getReport(REPORTS_Client_Super_Pension, key, "annuities"),
          ["Annuties " + (index + 1)]
        );

        const partnerData = changeHeadNames(
          getReport(REPORTS_Partner_Super_Pension, key2, "annuities"),
          ["Annuties " + (index + 1)]
        );

        clientAnnutiesArray.push(...clientData);
        partnerAnnutiesArray.push(...partnerData);
      });

      FullFinansialInvestmentObject["Annuities"] = {
        client: deepCloneWithKeys(clientAnnutiesArray, "annuties"),
        partner: deepCloneWithKeys(partnerAnnutiesArray, "annuties"),
      };

      // Business Entities
      const BusinessEntitesMetaConfig = [
        {
          key: "tradingCompany",
          title: "Trading Company",
          keyMapping: "tradingCompany",
          Headers: ["Trading Company"],
        },
        {
          key: "businessTrust",
          title: "Business Trust",
          keyMapping: "businessTrust",
          Headers: ["Business Trust"],
        },
        {
          key: "bucketCompany",
          title: "Bucket Company",
          keyMapping: "bucketCompany",
          Headers: ["Bucket Company"],
        },
      ];

      const FullBusinessObject = {};

      BusinessEntitesMetaConfig.forEach(
        ({ key, title, keyMapping, Headers }) => {
          // Main investment report
          FullBusinessObject[title] = changeHeadNames(
            getReport(REPORTS_Business_Entities, key, keyMapping, "", 3),
            Headers
          );
        }
      );

      // Family Trust
      const FamilyTrustMetaConfig = [
        {
          key: "cashFlow",
          title: "Cashflow",
          keyMapping: "cashFlow",
          Headers: ["Inflow", "Outflow", "Surplus/deficit"],
        },
        {
          key: "profitAndLoss",
          title: "Profit and Loss",
          keyMapping: "Profit and Loss",
          Headers: [
            "Income",
            "Less Deductions",
            "",
            "Total Trust Net Income ",
            "Actual Trust Distribution ",
          ],
        },
      ];
      const FullFamilyTrustObj = {};

      FamilyTrustMetaConfig.forEach(({ key, title, keyMapping, Headers }) => {
        // Main investment report
        FullFamilyTrustObj[title] = changeHeadNames(
          getReport(REPORTS_TRUST_Assets_and_Income, key, keyMapping, "", 5),
          Headers
        );
      });

      [
        {
          key: "balanceSheet",
          title: "Balance Sheets",
          keyMapping: "Balance Sheets",
          Headers: ["Assets", "Liabilities", "", "Beneficiary Loans", ""],
        },
      ].forEach(({ key, title, keyMapping, Headers }) => {
        // Main investment report
        FullFamilyTrustObj[title] = changeHeadNames(
          renameYearKeys(
            getReport(REPORTS_TRUST_Assets_and_Income, key, keyMapping, "", 5)
          ),
          Headers
        );
      });

      console.log(FullFamilyTrustObj, "FullFamilyTrustObj");

      setReportSections({
        fullTableCashFlow,
        clientData,
        partnerData,
        centrelinkCombined: filteredCentrelinkTable,
        familyTaxBenefit: familyTaxBenefitRow,
        asset: newLiabilities,
        asstesAndLiabilities: lifestyleAssetsArray,
        FullFinansialInvestmentObject,
        FullBusinessObject,
        FullFamilyTrustObj,
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
    <div className="container-fluid p-0 reports d-flex flex-column ">
      {/* <h1>Reports</h1> */}
      <Routes>
        <Route path={"/"} element={<FunnalComp />} />
        <Route
          path={"/AssetsAndLiabilities"}
          element={<AssetsAndLiabilities />}
        />
        <Route path={"/CashFlow"} element={<CashFlowReport />} />
      </Routes>
    </div>
  );
};

// add button on FunnalComp to go in single sceinaro flow

export default Reports;
