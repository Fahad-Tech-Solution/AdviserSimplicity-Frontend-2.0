import { content } from "../../../Content/Content";
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
  GetAxios,
  openNotificationSuccess,
  toSentenceCase,
} from "./Api";

const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0;

export const calculateTotalLeaveDays = (leaveData) => {
  if (!leaveData || typeof leaveData !== "object") return 0;

  const convertToDays = (amount, unit) => {
    const value = Number(amount);

    if (!value || value < 0) return 0;

    switch (unit) {
      case "Days":
        return value;

      case "Weeks":
        return value * 7;

      case "Hours":
        // Assuming 8 working hours = 1 day
        return value / 8;

      default:
        return 0;
    }
  };

  const totalDays =
    convertToDays(leaveData.annualLeaveAmount, leaveData.annualLeaveTime) +
    convertToDays(leaveData.sickLeaveAmount, leaveData.sickLeaveTime) +
    convertToDays(
      leaveData.longServiceLeaveAmount,
      leaveData.longServiceLeaveTime,
    );

  return totalDays;
};

const RemoveSpan = (text) => {
  if (!text) return "";

  return text
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ") // collapse multiple spaces
    .trim(); // remove leading/trailing spaces
};

const GenerateFileNote = async (id, FileName = "FileNotetemplate.docx") => {
  try {
    console.log(id);
    console.time();

    const defaultUrl = getDefaultUrl();

    let personalDetails = getUserDetail();
    let allQuestions = getQuestionDetail();
    let goalsAndObjective = getGoalsDetail();
    let LoggedInUser = getLoggedInUserData();
    let GQState = getGQState();
    let CRState = getCRState();
    let bankDetailObj = getBankDetail();

    const requests = [];

    // Personal Details
    if (isEmptyObject(personalDetails) || personalDetails?._id !== id) {
      requests.push(
        GetAxios(`${defaultUrl}/api/personalDetails/getUserById/${id}`).then(
          (res) => {
            if (!isEmptyObject(res)) personalDetails = res;
          },
        ),
      );
    }

    // Questions Yes/No
    if (isEmptyObject(CRState) || CRState.clientFK !== id) {
      requests.push(
        GetAxios(`${defaultUrl}/api/questions/${id}`).then((res) => {
          if (!isEmptyObject(res)) CRState = res;
        }),
      );
    }

    // Questions
    if (
      isEmptyObject(allQuestions) ||
      Object.values(allQuestions).some(
        (q) => q && Object.keys(q).length > 0 && q.clientFK === id,
      )
    ) {
      requests.push(
        GetAxios(`${defaultUrl}/api/dataOfAllSection/${id}`).then((res) => {
          if (!isEmptyObject(res)) allQuestions = res;
        }),
      );
    }

    // Goals & Objectives
    if (
      isEmptyObject(goalsAndObjective) ||
      Object.values(goalsAndObjective).some(
        (q) => q && Object.keys(q).length > 0 && q.clientFK === id,
      )
    ) {
      requests.push(
        GetAxios(`${defaultUrl}/api/CombinedGoalsAndObjectives/${id}`).then(
          (res) => {
            if (!isEmptyObject(res)) goalsAndObjective = res;
          },
        ),
      );
    }

    // Goals & Objectives
    if (isEmptyObject(GQState) || GQState.clientFK !== id) {
      requests.push(
        GetAxios(`${defaultUrl}/api/goalsQuestions/getByClient/${id}`)
          .then((res) => {
            if (!isEmptyObject(res)) {
              GQState = res;
            }
          })
          .catch((error) => {
            console.log(error);
            GQState = {};
          }),
      );
    }

    // Run missing API calls in parallel
    await Promise.all(requests);

    console.log("Final Data →", {
      personalDetails,
      allQuestions,
      CRState,
      goalsAndObjective,
      GQState,
      contect: content.GoalsAndObjectives,
    });

    let adviserName =
      LoggedInUser &&
      typeof LoggedInUser === "object" &&
      Object.keys(LoggedInUser).length > 0
        ? `${toSentenceCase(LoggedInUser.firstName || "")} ${toSentenceCase(
            LoggedInUser.lastName || "",
          )}`.trim()
        : "Guest";

    console.log(personalDetails);

    const leaveData =
      allQuestions?.incomeFromOwnBusiness?.client?.LeaveEntitlementsModal;

    const leaveDataPartner =
      allQuestions?.incomeFromOwnBusiness?.partner?.LeaveEntitlementsModal;

    let payload = {
      adviserName,
      date: new Date().toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      clientName: personalDetails?.client?.clientPreferredName || "",
      partnerName: personalDetails?.partner?.partnerPreferredName || "",
      isSingle: ["Single", "Widowed", ""].includes(
        personalDetails?.client?.clientMaritalStatus || "",
      ),
      isMale: ["Male", "Other", ""].includes(
        personalDetails?.client?.clientGender || "",
      ),
      isPartnerMale: ["Male", "Other", ""].includes(
        personalDetails?.partner?.partnerGender || "",
      ),

      clientAge: personalDetails?.client?.clientAge || "",
      clientWorkStatus: personalDetails?.client?.clientEmploymentStatus || "",
      clientEmploymentStatus:
        allQuestions?.incomeFromOwnBusiness?.client?.employmentStatus || "",
      clientEmploymentIncome:
        allQuestions?.incomeFromOwnBusiness?.clientTotal || "",
      clientOccupation:
        allQuestions?.incomeFromOwnBusiness?.client?.occupation || "",
      clientCenterlinkPaymentType:
        (allQuestions?.incomeFromCentrelink?.client?.paymentType || [""]).join(
          ", ",
        ) || "",

      partnerAge: personalDetails?.partner?.partnerAge || "",
      partnerWorkStatus:
        personalDetails?.partner?.partnerEmploymentStatus || "",
      partnerEmploymentStatus:
        allQuestions?.incomeFromOwnBusiness?.partner?.employmentStatus || "",
      partnerEmploymentIncome:
        allQuestions?.incomeFromOwnBusiness?.partnerTotal || "",
      partnerOccupation:
        allQuestions?.incomeFromOwnBusiness?.partner?.occupation || "",
      partnerCenterlinkPaymentType:
        (allQuestions?.incomeFromCentrelink?.partner?.paymentType || [""]).join(
          ", ",
        ) || "",

      clientSumOfLeavesInDays: calculateTotalLeaveDays(leaveData),
      partnerSumOfLeavesInDays: calculateTotalLeaveDays(leaveDataPartner),

      GoalsDescriptionsArray: Object.values(content.GoalsAndObjectives)
        .flat()
        .filter((item) => GQState?.[item.key] === "Yes")
        .map((item) => ({
          description: RemoveSpan(
            goalsAndObjective?.[item.key]?.description || "",
          ),
        })),

      lumpSumContributionEstimatedValue:
        goalsAndObjective?.lumpSumContributionSuper?.estimatedValue || "$0",

      PageBreak: `<w:br w:type="page"/>`, // this is simple Page Break
    };

    console.log("Document Payload:", payload);

    await generateDocumentFromTemplate(
      payload,
      FileName,
      `Adviser Simplicity Fact Note of ${personalDetails?.client?.clientPreferredName || "Client"}.docx`,
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
  console.timeEnd();
};

export { GenerateFileNote };
