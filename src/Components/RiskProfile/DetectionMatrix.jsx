import React, { useEffect, useMemo } from "react";
import { Table } from "antd";
import { RenderName } from "../Assets/Api/Api";
import { FiAlertTriangle } from "react-icons/fi";
import { FaExclamationTriangle } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { RiskGoalWarning } from "../../Store/Store";

const DetectionMatrix = ({ values, QuestionArray }) => {
  let [riskGoalWarning, setRiskGoalWarning] = useRecoilState(RiskGoalWarning);

  // Convert question1..question8 numeric values to actual choice text
  const getChoiceText = (questionKey, selectedIndex) => {
    const q = QuestionArray.find((i) => i.key === questionKey);
    return q?.choices?.[selectedIndex] || "";
  };

  // ---- Client-provided inconsistency rules ----
  const conflictRules = [
    {
      q1: "question2",
      q2: "question3",
      relationship: "Q2: Desired Rate of Return ↔ Q3: Attitude to Capital Risk",
      grayQuestion: ["Q1", "Q1"],
      check: (v1, v2) =>
        getChoiceText("question2", v1) === "More than 10%" &&
        getChoiceText("question3", v2).includes("safety of my capital"),
      msg: "⚠ The client expects a high return (>10%) but also prioritises capital safety. Confirm whether the client truly seeks higher returns or prefers to preserve capital.",
      explanation:
        "Explain that higher returns generally require taking on more investment risk. If capital protection is the main goal, returns are likely to be lower. Discuss balancing safety and growth.",
    },
    {
      q1: "question2",
      q2: "question8",
      grayQuestion: ["Q2", "Q8"],
      relationship:
        "Q2: Desired Rate of Return ↔ Q8: Investment Preferences – Asset Allocation",
      check: (v1, v2) =>
        getChoiceText("question2", v1) === "More than 10%" &&
        ["no risk", "low risk"].some((txt) =>
          getChoiceText("question8", v2).toLowerCase().includes(txt)
        ),
      msg: "The client desires high returns but selected a conservative or low-risk allocation. Confirm risk appetite.",
      explanation:
        "Highlight that low-risk investments such as cash or term deposits usually cannot deliver 10% returns. Use examples to show how growth assets (shares/property) involve more ups and downs but provide higher long-term returns.",
    },
    {
      q1: "question1",
      q2: "question8",
      grayQuestion: ["Q1", "Q8"],
      relationship:
        "Q1: Liquidity Timeframe ↔ Q8: Investment Preferences – Asset Allocation",
      check: (v1, v2) =>
        getChoiceText("question1", v1) === "Less than one year" &&
        ["medium", "high", "80%"].some((txt) =>
          getChoiceText("question8", v2).toLowerCase().includes(txt)
        ),
      msg: "The client intends to invest short-term but is selecting higher-risk, long-term investments. Verify investment timeframe and cashflow needs.",
      explanation:
        "Explain that growth investments need time to recover from short-term market falls. For money needed within 12 months, safer options such as cash or term deposits are more suitable.",
    },
    {
      q1: "question1",
      q2: "question2",
      grayQuestion: ["Q1", "Q2"],
      relationship: "Q1: Liquidity Timeframe ↔ Q2: Desired Rate of Return",
      check: (v1, v2) =>
        getChoiceText("question1", v1) === "Less than one year" &&
        ["5", "10"].some((t) => getChoiceText("question2", v2).includes(t)),
      msg: "The client wants short-term access but expects medium to high returns. Clarify whether funds should be invested or kept liquid.",
      explanation:
        "Remind that higher returns take time and are linked with longer investment periods. Short-term funds are best kept in low-risk, accessible accounts to avoid losses.",
    },
    {
      q1: "question3",
      q2: "question7",
      grayQuestion: ["Q3", "Q7"],
      relationship: "Q3: Attitude to Capital Risk ↔ Q7: Reaction to Volatility",
      check: (v1, v2) =>
        ["comfortable", "high risk"].some((txt) =>
          getChoiceText("question3", v1).toLowerCase().includes(txt)
        ) &&
        ["panic", "nervous"].some((txt) =>
          getChoiceText("question7", v2).toLowerCase().includes(txt)
        ),
      msg: "The client claims to be comfortable with risk but indicates they would panic during market volatility. Confirm true emotional tolerance.",
      explanation:
        "Ask how they felt during previous market downturns (e.g., COVID or GFC). Reassure that short-term drops are normal and part of long-term investing, but if panic is likely, a lower-risk profile may suit better.",
    },
    {
      q1: "question6",
      q2: "question8",
      grayQuestion: ["Q6", "Q8"],
      relationship:
        "Q6: Investment Knowledge & Experience ↔ Q8: Investment Preferences",
      check: (v1, v2) =>
        getChoiceText("question6", v1).includes("don’t understand") &&
        getChoiceText("question8", v2).includes("80%"),
      msg: "The client shows limited investment knowledge but is selecting high-risk growth options. Confirm understanding before assigning Growth or High Growth profile.",
      explanation:
        "Explain what investing in shares and growth assets means — values will go up and down. Ensure the client understands volatility and long-term investment behaviour before proceeding.",
    },
    {
      q1: "question4",
      q2: "question3",
      grayQuestion: ["Q4", "Q3"],
      relationship:
        "Q4: Concern About Inflation ↔ Q3: Attitude to Capital Risk",
      check: (v1, v2) =>
        getChoiceText("question4", v1).includes("Highly concerned") &&
        getChoiceText("question3", v2).includes("safety"),
      msg: "The client is highly concerned about inflation but unwilling to take investment risk to offset it. Discuss trade-offs.",
      explanation:
        "Explain that inflation reduces the value of cash over time. A small amount of growth exposure (shares/property) can help protect purchasing power while managing risk.",
    },
    {
      q1: "question5",
      q2: "question3",
      grayQuestion: ["Q5", "Q3"],
      relationship: "Q5: Legislative Risk ↔ Q3: Attitude to Capital Risk",
      check: (v1, v2) =>
        getChoiceText("question5", v1).includes("regardless") &&
        getChoiceText("question3", v2).includes("safety"),
      msg: "The client is risk-averse but willing to restructure investments regardless of legislative changes. Confirm understanding of consequences.",
      explanation:
        "Ask whether they understand the potential downsides of frequent changes to investments. Encourage focusing on a consistent long-term plan rather than reacting to rules or policies.",
    },
  ];

  // ---- Generate rows from detected conflicts ----
  const conflicts = useMemo(() => {
    const groups = [
      { name: "client", data: values.client },
      { name: "partner", data: values.partner },
    ];

    setRiskGoalWarning([]);

    let rows = [];

    groups.forEach((group) => {
      conflictRules.forEach((rule, index) => {
        if (rule.check(group.data[rule.q1], group.data[rule.q2])) {
          rows.push({
            key: rows.length + 1,
            profile: RenderName(group.name),
            relationship: `${rule.relationship}`,
            inconsistency: rule.msg,
            explanation: rule.explanation,
          });

          // 🔥 Store conflicting questions in Recoil
          setRiskGoalWarning((prev) => {
            const newWarnings = [...prev];

            // Avoid duplicates
            rule.grayQuestion.forEach((qName) => {
              if (!newWarnings.includes(qName)) {
                newWarnings.push("/" + qName);
              }
            });

            return newWarnings;
          });
        }
      });
    });

    return rows;
  }, [values]);

  // AntD table columns
  const columns = [
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
      width: "10%",
      render: (t) => <strong>{t}</strong>,
    },
    {
      title: "Question Relationship",
      dataIndex: "relationship",
      key: "relationship",
      width: "20%",
      render: (t) => <strong>{t}</strong>,
    },
    {
      title: "Inconsistency Detected",
      dataIndex: "inconsistency",
      key: "inconsistency",
      width: "35%",
      render: (t) => (
        <>
          <FaExclamationTriangle
            style={{ color: "#e4d613ff", fontSize: "18px", marginRight: "6px" }}
          />
          <span style={{ color: "#d4380d", fontWeight: 600 }}> {t}</span>
        </>
      ),
    },
    {
      title: "Adviser Explanation",
      dataIndex: "explanation",
      key: "explanation",
      width: "35%",
    },
  ];

  return (
    <div className="All_Client reportSection" style={{ padding: "20px" }}>
      <h3 className="d-none"
        onClick={() => {
          console.log(riskGoalWarning);
        }}
      >
        Data Base
      </h3>
      <Table
        columns={columns}
        dataSource={conflicts}
        pagination={false}
        bordered
      />

      {conflicts.length === 0 && (
        <p style={{ marginTop: 10 }} className="text-success fw-semibold">
          ✔ No inconsistencies detected.
        </p>
      )}
    </div>
  );
};

export default DetectionMatrix;
