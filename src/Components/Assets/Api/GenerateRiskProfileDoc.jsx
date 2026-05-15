import {
  getUserDetail,
  getQuestionDetail,
  getGoalsDetail,
  getDefaultUrl,
  getLoggedInUserData,
  getGQState,
  getCRState,
  getBankDetail,
  getRiskQuestion,
} from "../../../Store/RecoilUtils";
import {
  generateDocumentFromTemplate,
  openNotificationSuccess,
  toSentenceCase,
} from "./Api";

function calculateScore(obj) {
  const questionKeys = [
    "question1",
    "question2",
    "question3",
    "question4",
    "question5",
    "question6",
    "question7",
    "question8",
  ];

  let total = 0;

  questionKeys.forEach((key, index) => {
    const value = obj[key];

    if (index === 7) {
      // question8 → ((value+1) * 2)
      total += (value + 1) * 2;
    } else {
      // question1 → question7 → (value+1)
      total += value + 1;
    }
  });

  return total;
}

const buildSection = (person) => {
  const section = {};

  // Question Option Mapping
  const questionOptions = {
    question1: 4,
    question2: 3,
    question3: 4,
    question4: 5,
    question5: 4,
    question6: 4,
    question7: 4,
    question8: 5,
  };

  Object.keys(questionOptions).forEach((questionKey, qIndex) => {
    const totalOptions = questionOptions[questionKey];

    for (let i = 0; i < totalOptions; i++) {
      section[`Q${qIndex + 1}Op${i + 1}`] = person?.[questionKey] === i;
    }
  });

  // Score
  section.score = calculateScore(person);

  // Risk Goals
  const riskGoals = [
    "Cash Management",
    "Conservative",
    "Moderately Conservative",
    "Balanced",
    "Growth",
    "High Growth",
  ];

  riskGoals.forEach((goal) => {
    const key = `riskGoal${goal.replace(/\s/g, "")}`;
    section[key] = person?.riskGoal === goal;
  });

  // Descriptions
  section.riskDescription = person?.riskDescription || "";
  section.addNoteDescription = person?.addNoteDescription || "";

  return [section]; // returning array to match your structure
};

const GeneraDocumentRiskProfile = async (
  values,
  FileName = "riskprofiletemplate.docx",
) => {
  try {
    console.log(values);

    let personalDetails = getUserDetail();
    let LoggedInUser = getLoggedInUserData();

    let adviserName =
      LoggedInUser &&
      typeof LoggedInUser === "object" &&
      Object.keys(LoggedInUser).length > 0
        ? `${toSentenceCase(LoggedInUser.firstName || "")} ${toSentenceCase(
            LoggedInUser.lastName || "",
          )}`.trim()
        : "Guest";

    let payload = {
      adviserName,
      downloadDate: new Date().toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      clientPreferred: personalDetails?.client?.clientPreferredName || "",
      partnerPreferred: personalDetails?.partner?.partnerPreferredName || "",
      isSingle:
        ["Single", "Widowed", ""].includes(
          personalDetails?.client?.clientMaritalStatus || "",
        ) || values.joinedProfile == "Yes",
      PageBreak: `<w:br w:type="page"/>`, // this is simple Page Break

      clientSection: buildSection(values.client),
      partnerSection: buildSection(values.partner),
    };

    console.log("Document Payload:", payload);

    await generateDocumentFromTemplate(
      payload,
      FileName,
      `Adviser Simplicity Fact Find of ${personalDetails?.client?.clientPreferredName || "Client"}.docx`,
    );
  } catch (error) {
    console.error("Document generation failed:", error);

    openNotificationSuccess(
      "error",
      "topRight",
      "Document Generation Error",
      error?.message || "Failed to generate document",
    );
  }
};

export { GeneraDocumentRiskProfile };
