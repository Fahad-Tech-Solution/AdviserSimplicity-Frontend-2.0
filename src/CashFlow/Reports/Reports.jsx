import React, { useEffect, useState } from "react";
import FunnalComp from "./FunnalComp";
import { Route, Routes } from "react-router-dom";
import AssetsAndLiabilities from "./AssetsAndLiabilities";
import CashFlowReport from "./CashFlowReport";
import {
  buildReportTree,
  changeHeadNames,
  deepCloneWithKeys,
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
import { Percent } from "antd/es/progress/style";

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
        REPORTS_SMSF_Assets_and_Income,
      } = response;

      console.log(
        response.REPORTS_Joint_Investments,
        "REPORTS_Joint_Investments"
      );

      const Age = processDataGeneric(
        REPORTS_Cashflow,
        (d) => transformInflows(d, false),
        "Age"
      );

      // Enhanced helper function
      const getReport = (
        source,
        key,
        keyMapping,
        keyAddition = "",
        contentblock
      ) => {
        let contentIndex = contentblock ?? 2;
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

      const IncomeExpensesMetaConfig = [
        {
          key: "inflows",
          title: "Inflows",
          keyMapping: "inflows",
          Headers: ["Inflow"],
          keyAddition: "",
          ApiKey: REPORTS_Cashflow,
        },
        {
          key: "outflows",
          title: "Outflows",
          keyMapping: "outFlow",
          Headers: ["Outflows"],
          keyAddition: "",
          ApiKey: REPORTS_Cashflow,
        },
        {
          key: "surplus",
          title: "Surplus",
          keyMapping: "surplus",
          Headers: ["Surplus/deficit"],
          keyAddition: "",
          ApiKey: REPORTS_Cashflow,
        },
        {
          key: "clientTaxPosition",
          title: "Client's Tax",
          keyMapping: "clientTaxPosition",
          Headers: [
            "Total Assessable income ",
            "Total Allowable Deductions ",
            "Total Taxable Income",
            "Total Tax payable ",
            "Total Rebates ",
            "Total Tax payable ",
          ],
          keyAddition: "",
          ApiKey: REPORTS_Tax_Summary,
        },
        {
          key: "partnerTaxPosition",
          title: "Partner's Tax",
          keyMapping: "clientTaxPosition",
          Headers: [
            "Total Assessable income ",
            "Total Allowable Deductions ",
            "Total Taxable Income",
            "Total Tax payable ",
            "Total Rebates ",
            "Total Tax payable ",
          ],
          keyAddition: "",
          ApiKey: REPORTS_Tax_Summary,
        },
        {
          key: "assetsTestPensionAllowance",
          title: "Centrelink Assets Test Pension Allowance",
          keyMapping: "centerLinkAllowanceDataSet",
          Headers: ["Assets Test-Pension/Allowance"],
          keyAddition: "",
          ApiKey: REPORTS_Centrelink_Summary,
        },
        {
          key: "incomeTestAssessment",
          title: "Centrelink Income Test Assessment",
          keyMapping: "centerLinkIncomeDataSet",
          Headers: ["Income Test Pensions & Allowances"],
          keyAddition: "",
          ApiKey: REPORTS_Centrelink_Summary,
        },
        {
          key: "incomeTestAllowances",
          title: "Centrelink Income Test Allowances",
          keyMapping: "centerLinkIncomeTestAllowancesDataSet",
          Headers: ["Income Test Allowances"],
          keyAddition: "",
          ApiKey: REPORTS_Centrelink_Summary,
        },
        {
          key: "clientIncome",
          title: "Centrelink Client Income",
          keyMapping: "centerLinkClientIncomeDataSet",
          Headers: [RenderName("client") + " Income"],
          keyAddition: "",
          ApiKey: REPORTS_Centrelink_Summary,
        },
        {
          key: "partnerIncome",
          title: "Centrelink Partner Income",
          keyMapping: "centerLinkPartnerIncomeDataSet",
          Headers: [RenderName("partner") + " Income"],
          keyAddition: "",
          ApiKey: REPORTS_Centrelink_Summary,
        },
        {
          key: "clientPayment",
          title: "Centrelink client Payment",
          keyMapping: "centerLinkClientPaymnetDataSet",
          Headers: [RenderName("client") + " Payment", "", "", ""],
          keyAddition: "",
          ApiKey: REPORTS_Centrelink_Summary,
        },
        {
          key: "partnerPayment",
          title: "Centrelink Partner Payment",
          keyMapping: "centerLinkClientPaymnetDataSet",
          Headers: [RenderName("partner") + " Payment", "", "", ""],
          keyAddition: "",
          ApiKey: REPORTS_Centrelink_Summary,
        },
        {
          key: "familyTaxBenefit",
          title: "Family Tax Benefits",
          keyMapping: "familyTaxBanifit",
          Headers: [
            "Total Adjusted Family Income ",
            "Total FTB- Part A (including Supplement) ",
            "Total Income For Primary Income Earner ",
            "Total Income For Secondary Income Earner ",
            "Total FTB- Part B (including Supplement) ",
            "Total Family tax Benefits (Part A & B)",
          ],
          keyAddition: "",
          ApiKey: REPORTS_Centrelink_Summary,
        },
      ];

      const FullIncomeExpensesObj = {};

      IncomeExpensesMetaConfig.forEach(
        (
          {
            key,
            title,
            keyMapping,
            keyAddition,
            Headers,
            existingYear = false,
            Percent = false,
            ApiKey,
          },
          index
        ) => {
          if (Percent) {
            // percent report
            FullIncomeExpensesObj[title] = percentTransforme(ApiKey[key]);
          } else if (existingYear) {
            // Main investment report
            FullIncomeExpensesObj[title] = changeHeadNames(
              renameYearKeys(
                getReport(ApiKey, key, keyMapping, keyAddition, 0)
              ),
              Headers
            );
          } else {
            FullIncomeExpensesObj[title] = changeHeadNames(
              getReport(ApiKey, key, keyMapping, keyAddition, 0),
              Headers
            );
          }
        }
      );

      let IncomeExpensesDataFormArray = [
        {
          parentHead: "Cashflow",
          children: ["client", "partner", "Inflows", "Outflows", "Surplus"],
        },
        {
          parentHead: "Client's Tax",
          children: ["client", "Client's Tax"],
        },
        {
          parentHead: "Partner's Tax",
          children: ["partner", "Partner's Tax"],
        },
        {
          parentHead: "Centrelink",
          children: [
            "client",
            "partner",
            "Centrelink Assets Test Pension Allowance",
            "Centrelink Income Test Assessment",
            "Centrelink Income Test Allowances",
            "Centrelink Client Income",
            "Centrelink Partner Income",
          ],
        },
        {
          parentHead: "Centrelink",
          children: ["Centrelink client Payment", "Centrelink Partner Payment"],
          reset: true,
          reFormingObj: {
            type: "Income Test- Allowances Only",
            children: [
              RenderName("client") + "'s ",
              RenderName("partner") + "'s ",
            ],
          },
        },
        {
          parentHead: "Family Tax Benefits",
          children: ["client", "partner", "Family Tax Benefits"],
        },
      ];

      const groupedIncomeExpenses = {};

      IncomeExpensesDataFormArray.forEach(
        ({ parentHead, children, reset = false, reFormingObj = {} }) => {
          // Initialize group if not already
          if (!groupedIncomeExpenses[parentHead]) {
            groupedIncomeExpenses[parentHead] = [];
          }

          if (reset) {
            // Create reformatted children block
            const formattedGroup = {
              type: reFormingObj.type || "",
              children: children.map((item, idx) => ({
                type: reFormingObj.children?.[idx] || item,
                children: Array.isArray(FullIncomeExpensesObj[item])
                  ? FullIncomeExpensesObj[item]
                  : [],
              })),
            };

            groupedIncomeExpenses[parentHead].push(formattedGroup);
          } else {
            const mergedData = [];

            children.forEach((item) => {
              if (item === "client") {
                if (Age[0] && typeof Age[0] === "object")
                  mergedData.push(Age[0]);
              } else if (item === "partner") {
                if (Age[1] && typeof Age[1] === "object")
                  mergedData.push(Age[1]);
              } else if (Array.isArray(FullIncomeExpensesObj[item])) {
                FullIncomeExpensesObj[item].forEach((entry) => {
                  if (
                    entry &&
                    typeof entry === "object" &&
                    !Array.isArray(entry)
                  ) {
                    mergedData.push(entry);
                  }
                });
              }
            });

            // Only add if there's actual data
            if (mergedData.length > 0) {
              groupedIncomeExpenses[parentHead].push(
                ...deepCloneWithKeys(mergedData, parentHead)
              );
            }
          }
        }
      );

      // Assign the final merged structure back into FullIncomeExpensesObj
      Object.keys(groupedIncomeExpenses).forEach((key, index) => {
        FullIncomeExpensesObj[key] = deepCloneWithKeys(
          groupedIncomeExpenses[key],
          key + index
        );
      });

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
        Age[0],
        Age[1],
        ...changeHeadNames(
          renameYearKeys([
            assets[0], // already unshifted into liabilities originally
            ...liabilities,
          ]),
          ["Assets", "Liabilities", "", ""]
        ),
      ];

      const lifestyleAssetsArray = [
        Age[0],
        Age[1],
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
          headings: ["Value at Year End "],
        },
        {
          key: "managedFunds",
          title: "Managed Funds",
          keyMapping: "Managed Funds",
          headings: ["Value at Year End "],
        },
        {
          key: "investmentBonds",
          title: "Investment Bonds",
          keyMapping: "Investment Bonds",
          headings: ["Value at Year End "],
        },
        {
          key: "other",
          title: "Other",
          keyMapping: "Other",
          headings: ["Value at Year End "],
        },
        {
          key: "cash",
          title: "Cash",
          keyMapping: "Cash",
          headings: ["Value at Year End "],
        },
        {
          key: "termDeposits",
          title: "Term Deposits",
          keyMapping: "Term Deposits",
          headings: ["Value at Year End "],
        },
        {
          key: "investmentLoans",
          title: "Investment Loans",
          keyMapping: "Investment Loans",
          headings: ["Year End Loan Balance"],
        },
        {
          key: "marginLoans",
          title: "Margin Loans",
          keyMapping: "Margin Loans",
          headings: ["Year End Loan Balance"],
        },
      ];

      // Main financial investment object
      const FullFinansialInvestmentObject = {};

      // Loop through each investment type
      investmentMeta.forEach(({ key, title, keyMapping, headings }, index) => {
        // Main investment report
        FullFinansialInvestmentObject[title] = {
          client: deepCloneWithKeys(
            [
              Age?.[0] || {}, // insert at 0
              ...changeHeadNames(
                getReport(REPORTS_Client_Investments, key, keyMapping, "2"),
                headings
              ),
            ],
            title + index
          ),
          partner: isMarried
            ? deepCloneWithKeys(
                [
                  Age?.[1] || {},
                  ...changeHeadNames(
                    getReport(
                      REPORTS_Partner_Investments,
                      key,
                      keyMapping,
                      "2"
                    ),
                    headings
                  ),
                ],
                title + index
              )
            : [],
          joint: isMarried
            ? deepCloneWithKeys(
                [
                  ...(Age?.[0] ? [Age[0]] : []),
                  ...(Age?.[1] ? [Age[1]] : []),
                  ...changeHeadNames(
                    getReport(REPORTS_Joint_Investments, key, keyMapping, "2"),
                    headings
                  ),
                ],
                title + index
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

      directProperty.forEach(({ key, title }, index) => {
        FullFinansialInvestmentObject[title] = {
          client: deepCloneWithKeys(
            [
              ...(Age[0] ? [Age[0]] : []),
              ...(Age[1] ? [Age[1]] : []),
              ...changeHeadNames(
                getReport(REPORTS_Direct_Property, key, "Property"),
                ["Total Expenses ", ""]
              ),
            ],
            title + index
          ),
        };
      });

      directProperty.forEach(({ key, title }, index) => {
        FullFinansialInvestmentObject["Position" + title] = {
          client: deepCloneWithKeys(
            [
              ...(Age?.[0] ? [Age[0]] : []),
              ...(Age?.[1] ? [Age[1]] : []),
              ...changeHeadNames(
                getReport(REPORTS_Direct_Property, key, "PositionProperty"),
                ["Property Value", "Loan Balance"]
              ),
            ],
            "Position" + title + index
          ),
        };
      });

      const InvestmentMetaConfig = [
        {
          groupKey: "Super",
          key: "superFund",
          title: "Super Fund 1",
          keyMapping: "Superannuation",
          objNo: "1",
          Headers: ["", "", "Inflow", "Outflow"],
        },
        {
          groupKey: "Super",
          key: "superFund",
          title: "Super Fund 2",
          keyMapping: "Superannuation",
          objNo: "2",
          Headers: ["", "", "Inflow", "Outflow"],
        },
        {
          groupKey: "Pension",
          key: "pensionFund",
          title: "Pension Fund 1",
          keyMapping: "Pensionannuation",
          objNo: "1",
          Headers: ["Inflow", "Outflow"],
        },
        {
          groupKey: "Pension",
          key: "pensionFund",
          title: "Pension Fund 2",
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
          client: [
            Age?.[0] || {},
            ...mainRows.map((row) => ({
              key: row.key,
              type: row.type,
              children: row.client,
              ...Object.fromEntries(
                Array.from({ length: 10 }, (_, i) => [`year${i + 1}`, ""])
              ),
            })),
          ],
          partner: [
            Age?.[1] || {},
            ...mainRows.map((row) => ({
              key: row.key,
              type: row.type,
              children: row.partner,
              ...Object.fromEntries(
                Array.from({ length: 10 }, (_, i) => [`year${i + 1}`, ""])
              ),
            })),
          ],
        };

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
        client: deepCloneWithKeys([Age[0], ...clientAnnutiesArray], "annuties"),
        partner: deepCloneWithKeys(
          [Age[1], ...partnerAnnutiesArray],
          "annuties"
        ),
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
          FullBusinessObject[title] = [
            ...Age,
            ...changeHeadNames(
              getReport(REPORTS_Business_Entities, key, keyMapping, "", 3),
              Headers
            ),
          ];
        }
      );

      // SMSF
      const SMSFMetaConfig = [
        {
          key: "cashFlow",
          title: "Cashflow",
          keyMapping: "cashFlow",
          Headers: ["Inflow", "Outflow", "Surplus/deficit"],
          keyAddition: "",
        },
        {
          key: "tax",
          title: "Tax",
          keyMapping: "Tax",
          Headers: ["Income", "Less Deductions", "Total Taxable income"],
          keyAddition: "",
        },
        {
          key: "balanceSheet",
          title: "Balance Sheets",
          keyMapping: "Balance Sheets",
          Headers: ["Assets", "Liabilities", "", "Beneficiary Loans", ""],
          existingYear: true,
        },
        {
          key: "clientAccountBalance",
          title: "client Accumilation Account",
          keyMapping: "Accumilation Account",
          Headers: ["", "", "Inflow", "Outflow"],
          keyAddition: "",
        },
        {
          key: "partnerAccountBalance",
          title: "partner Accumilation Account",
          keyMapping: "Accumilation Account",
          Headers: ["", "", "Inflow", "Outflow"],
          keyAddition: "",
        },
        {
          key: "clientPensionBalance",
          title: "client Pension Account",
          keyMapping: "Pension Account",
          Headers: ["Inflow", "Outflow"],
          keyAddition: "",
        },
        {
          key: "partnerPensionBalance",
          title: "partner Pension Account",
          keyMapping: "Pension Account",
          Headers: ["Inflow", "Outflow"],
          keyAddition: "",
        },
        {
          key: "directShares2",
          title: "Direct Shares",
          keyMapping: "Direct Shares",
          Headers: ["Value at Year End "],
          keyAddition: "",
        },
        {
          key: "directShares1",
          title: "Direct Shares Percent",
          keyMapping: "Direct Shares",
          Headers: [],
          keyAddition: "",
          Percent: true,
        },
        {
          key: "managedFunds2",
          title: "Managed Funds",
          keyMapping: "Managed Funds",
          Headers: ["Value at Year End "],
          keyAddition: "",
        },
        {
          key: "managedFunds1",
          title: "Managed Funds Percent",
          keyMapping: "Managed Funds",
          Headers: [],
          keyAddition: "",
          Percent: true,
        },
        {
          key: "other2",
          title: "Other",
          keyMapping: "Other",
          Headers: ["Value at Year End "],
          keyAddition: "",
        },
        {
          key: "other1",
          title: "Other Percent",
          keyMapping: "Other",
          Headers: [],
          keyAddition: "",
          Percent: true,
        },
        {
          key: "cash2",
          title: "Cash",
          keyMapping: "Cash",
          Headers: ["Value at Year End "],
          keyAddition: "",
        },
        {
          key: "cash1",
          title: "Cash Percent",
          keyMapping: "Cash",
          Headers: [],
          keyAddition: "",
          Percent: true,
        },
        {
          key: "termDeposit2",
          title: "Term Deposits",
          keyMapping: "Term Deposits",
          Headers: ["Value at Year End "],
          keyAddition: "",
        },
        {
          key: "termDeposit1",
          title: "Term Deposits Percent",
          keyMapping: "Term Deposits",
          Headers: [],
          keyAddition: "",
          Percent: true,
        },
        {
          key: "investmentLoans",
          title: "Investment Loans",
          keyMapping: "Investment Loans",
          Headers: ["Year End Loan Balance "],
          keyAddition: "",
        },

        ...Array.from({ length: 5 }).map((_, index) => ({
          key: "property" + (index + 1),
          title: "SMSF Property " + (index + 1),
          keyMapping: "SMSF Property",
          Headers: ["Less Expenses", "", "Equity & Debt Position", "Loan"],
          keyAddition: "",
        })),
      ];

      const FullSMSFObj = {};

      SMSFMetaConfig.forEach(
        ({
          key,
          title,
          keyMapping,
          keyAddition,
          Headers,
          existingYear = false,
          Percent = false,
        }) => {
          if (Percent) {
            // percent report
            FullSMSFObj[title] = percentTransforme(
              REPORTS_SMSF_Assets_and_Income[key]
            );
          } else if (existingYear) {
            // Main investment report
            FullSMSFObj[title] = changeHeadNames(
              renameYearKeys(
                getReport(
                  REPORTS_SMSF_Assets_and_Income,
                  key,
                  keyMapping,
                  keyAddition,
                  4
                )
              ),
              Headers
            );
          } else {
            FullSMSFObj[title] = changeHeadNames(
              getReport(
                REPORTS_SMSF_Assets_and_Income,
                key,
                keyMapping,
                keyAddition,
                4
              ),
              Headers
            );
          }
        }
      );

      FullSMSFObj["Accumilation Account"] = deepCloneWithKeys(
        [
          {
            key: "client 1",
            type: RenderName("client") + " Accumilation Account",
            children: FullSMSFObj["client Accumilation Account"],
          },
          {
            key: "partner 1",
            type: RenderName("partner") + " Accumilation Account",
            children: FullSMSFObj["partner Accumilation Account"],
          },
        ],
        "Accumilation Account"
      );

      FullSMSFObj["Pension Account"] = deepCloneWithKeys(
        [
          {
            key: "client 1",
            type: RenderName("client") + " Pension Account",
            children: FullSMSFObj["client Pension Account"],
          },
          {
            key: "partner 1",
            type: RenderName("partner") + " Pension Account",
            children: FullSMSFObj["partner Pension Account"],
          },
        ],
        "Pension Account"
      );

      // Family Trust
      const FamilyTrustMetaConfig = [
        {
          key: "cashFlow",
          title: "Cashflow",
          keyMapping: "cashFlow",
          Headers: ["Inflow", "Outflow", "Surplus/deficit"],
          keyAddition: "",
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
          keyAddition: "",
        },
        {
          key: "balanceSheet",
          title: "Balance Sheets",
          keyMapping: "Balance Sheets",
          Headers: ["Assets", "Liabilities", "", "Beneficiary Loans", ""],
          existingYear: true,
        },
        {
          key: "directShares2",
          title: "Direct Shares",
          keyMapping: "Direct Shares",
          Headers: ["Value at Year End "],
          keyAddition: "",
        },
        {
          key: "directShares1",
          title: "Direct Shares Percent",
          keyMapping: "Direct Shares",
          Headers: [],
          keyAddition: "",
          Percent: true,
        },
        {
          key: "managedFunds2",
          title: "Managed Funds",
          keyMapping: "Managed Funds",
          Headers: ["Value at Year End "],
          keyAddition: "",
        },
        {
          key: "managedFunds1",
          title: "Managed Funds Percent",
          keyMapping: "Managed Funds",
          Headers: [],
          keyAddition: "",
          Percent: true,
        },
        {
          key: "other2",
          title: "Other",
          keyMapping: "Other",
          Headers: ["Value at Year End "],
          keyAddition: "",
        },
        {
          key: "other1",
          title: "Other Percent",
          keyMapping: "Other",
          Headers: [],
          keyAddition: "",
          Percent: true,
        },
        {
          key: "cash2",
          title: "Cash",
          keyMapping: "Cash",
          Headers: ["Value at Year End "],
          keyAddition: "",
        },
        {
          key: "cash1",
          title: "Cash Percent",
          keyMapping: "Cash",
          Headers: [],
          keyAddition: "",
          Percent: true,
        },
        {
          key: "termDeposit2",
          title: "Term Deposits",
          keyMapping: "Term Deposits",
          Headers: ["Value at Year End "],
          keyAddition: "",
        },
        {
          key: "termDeposit1",
          title: "Term Deposits Percent",
          keyMapping: "Term Deposits",
          Headers: [],
          keyAddition: "",
          Percent: true,
        },
        {
          key: "investmentLoans",
          title: "Investment Loans",
          keyMapping: "Investment Loans",
          Headers: ["Value at Year End "],
          keyAddition: "",
        },

        ...Array.from({ length: 10 }).map((_, index) => ({
          key: "property" + (index + 1),
          title: "Trust Property " + (index + 1),
          keyMapping: "Trust Property",
          Headers: ["Less Expenses", "", "Equity & Debt Position", "Loan"],
          keyAddition: "",
        })),
      ];

      const FullFamilyTrustObj = {};

      FamilyTrustMetaConfig.forEach(
        ({
          key,
          title,
          keyMapping,
          keyAddition,
          Headers,
          existingYear = false,
          Percent = false,
        }) => {
          if (Percent) {
            // percent report
            FullFamilyTrustObj[title] = percentTransforme(
              REPORTS_TRUST_Assets_and_Income[key]
            );
          } else if (existingYear) {
            // Main investment report
            FullFamilyTrustObj[title] = changeHeadNames(
              renameYearKeys(
                getReport(
                  REPORTS_TRUST_Assets_and_Income,
                  key,
                  keyMapping,
                  keyAddition,
                  5
                )
              ),
              Headers
            );
          } else {
            FullFamilyTrustObj[title] = changeHeadNames(
              getReport(
                REPORTS_TRUST_Assets_and_Income,
                key,
                keyMapping,
                keyAddition,
                5
              ),
              Headers
            );
          }
        }
      );

      // console.log(FullIncomeExpensesObj, "FullIncomeExpensesObj");

      setReportSections({
        FullIncomeExpensesObj,
        asset: newLiabilities,
        asstesAndLiabilities: lifestyleAssetsArray,
        FullFinansialInvestmentObject,
        FullBusinessObject,
        FullFamilyTrustObj,
        FullSMSFObj,
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
