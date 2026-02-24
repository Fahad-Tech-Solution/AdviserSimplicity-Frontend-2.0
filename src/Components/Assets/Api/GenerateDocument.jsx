import {
  getUserDetail,
  getQuestionDetail,
  getGoalsDetail,
  getDefaultUrl,
  getLoggedInUserData,
  getGQState,
  getCRState,
  getBankDetail,
} from "../../../Store/recoilUtils";
import { content } from "../../../Content/Content";
import {
  convertDateAUWithDayJS,
  generateDocumentFromTemplate,
  GetAxios,
  toCommaAndDollar,
  toSentenceCase,
} from "./Api";

const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0;

const parseMoney = (value = "$0") =>
  Number(String(value).replace(/[^0-9.-]+/g, "")) || 0;

function buildPoliciesObject(policies = [], maxPolicies = 10) {
  const result = {};

  for (let i = 0; i < maxPolicies; i++) {
    const index = i + 1;
    const p = policies[i];

    // show flag
    result[`showPolicy${index}`] = !!p;

    // base fields
    result[`policyOwner${index}`] = p?.Owner || "";
    result[`lifeInsured${index}`] = p?.lifeInsured || "";
    result[`provider${index}`] = p?.provider || "";
    result[`policyNumber${index}`] = p?.policyNo || "";

    // format date safely
    result[`startDate${index}`] = p?.startDate
      ? convertDateAUWithDayJS(p.startDate)
      : "";

    result[`renewalMonth${index}`] = p?.startDate
      ? convertDateAUWithDayJS(p.startDate)
      : "";

    result[`smoker${index}`] = p?.smoker || "";

    // cover amounts
    result[`lifeCover${index}`] =
      p?.LifeTPDTraumaDetails?.life || p?.life || "";
    result[`TPDCover${index}`] = p?.LifeTPDTraumaDetails?.TPD || p?.TPD || "";
    result[`Trauma${index}`] =
      p?.LifeTPDTraumaDetails?.trauma || p?.trauma || "";

    // premiums
    result[`premiumPa${index}`] =
      p?.premiumsDetails?.totalCost || p?.premiums || "";

    result[`payeeOfPremiums${index}`] = p?.Owner || "";

    result[`premiumtype${index}`] =
      p?.LifeTPDTraumaDetails?.premiumType || p?.IPDetails?.premiumType || "";

    result[`TPDDefinition${index}`] =
      p?.LifeTPDTraumaDetails?.TPDDefinition || "";

    result[`traumaPlus${index}`] = p?.LifeTPDTraumaDetails?.traumaPlus || "";

    result[`CPI${index}`] =
      p?.LifeTPDTraumaDetails?.CPI || p?.IPDetails?.CPI || "";

    result[`superLinked${index}`] =
      p?.LifeTPDTraumaDetails?.superlinked || p?.IPDetails?.superlinked || "";

    result[`loadingOrExclusions${index}`] =
      p?.loadingExclusion === "Yes" ? p?.loadingExclusionValue || "Yes" : "No";

    result[`beneficiaryType${index}`] =
      p?.beneficiary === "Yes" ? p?.beneficiaryDetails || "Yes" : "No";
  }

  return result;
}

function PerosonalDetail(personalDetails, user) {
  let PersonalDetails = {
    [user + "Title"]: personalDetails?.[user]?.[user + "Title"] || "",
    [user + "FirstName"]: personalDetails?.[user]?.[user + "GivenName"] || "",
    [user + "MiddleName"]: personalDetails?.[user]?.[user + "MiddleName"] || "",
    [user + "LastName"]: personalDetails?.[user]?.[user + "LastName"] || "",
    [user + "Preferred"]:
      personalDetails?.[user]?.[user + "PreferredName"] || "",
    [user + "Gender"]: personalDetails?.[user]?.[user + "Gender"] || "",
    [user + "Dob"]: personalDetails?.[user]?.[user + "DOB"]
      ? convertDateAUWithDayJS(personalDetails?.[user]?.[user + "DOB"])
      : "",
    [user + "Age"]: personalDetails?.[user]?.[user + "Age"] || "",

    [user + "Marital"]: personalDetails?.[user]?.[user + "MaritalStatus"] || "",
    [user + "Employment"]:
      personalDetails?.[user]?.[user + "EmploymentStatus"] || "",
    [user + "RetAge"]:
      personalDetails?.[user]?.[user + "PlannedRetirementAge"] || "",
    [user + "Health"]: personalDetails?.[user]?.[user + "Health"] || "",
    [user + "Smoker"]: personalDetails?.[user]?.[user + "Smoker"] || "",
    [user + "TaxRes"]:
      personalDetails?.[user]?.[user + "TaxResidentRadio"] || "",
    [user + "HealthCover"]:
      personalDetails?.[user]?.[user + "PrivateHealthCoverRadio"] || "",
    [user + "HelpDebt"]:
      personalDetails?.[user]?.[user + "HELPSDebtRadio"] || "",

    //contect details
    [user + "HomeAddress"]:
      personalDetails?.[user]?.[user + "HomeAddress"] || "",
    [user + "PostalAddress"]:
      personalDetails?.[user]?.[user + "PostalAddress"] || "",
    [user + "Mobile"]: personalDetails?.[user]?.[user + "Mobile"] || "",
    [user + "HomePhone"]: personalDetails?.[user]?.[user + "HomePhone"] || "",
    [user + "WorkPhone"]: personalDetails?.[user]?.[user + "WorkPhone"] || "",
    [user + "Email"]:
      personalDetails?.[user]?.[user == "client" ? "Email" : user + "Email"] ||
      "", // for Partner its partnerEmail
  };
  console.log(user === "client",user);

  if (user === "client") {
    PersonalDetails.SingleClient = ["Single", "Widowed", ""].includes(
      personalDetails?.[user]?.[user + "MaritalStatus"] || "",
    );
  }

  return PersonalDetails;
}

function EmpoymentDetal(incomeFromOwnBusiness, user) {
  let EmpoymentDetals = {
    [user + "Occupation"]: incomeFromOwnBusiness?.[user]?.occupation || "",
    [user + "EmploymentStatus"]:
      incomeFromOwnBusiness?.[user]?.employmentStatus || "",
    [user + "NameOfCompany"]:
      incomeFromOwnBusiness?.[user]?.nameOfCompany || "",
    [user + "StartDate"]: incomeFromOwnBusiness?.[user]?.startDate
      ? convertDateAUWithDayJS(incomeFromOwnBusiness?.[user]?.startDate)
      : "",

    [user + "HoursWorked"]: incomeFromOwnBusiness?.[user]?.hoursWorked || "",
    [user + "GrossSalary"]:
      incomeFromOwnBusiness?.[user]?.SalaryPackageModal?.grossSalary || "",
    [user + "SGC"]:
      incomeFromOwnBusiness?.[user]?.SalaryPackageModal?.SGC || "",
    [user + "SalarySacrificeContributions"]:
      incomeFromOwnBusiness?.[user]?.SalaryPackageModal
        ?.salarySacrificeContributions || "",
    [user + "AfterTaxContributions"]:
      incomeFromOwnBusiness?.[user]?.SalaryPackageModal
        ?.afterTaxContributions || "",
    [user + "ChoiceOfFund"]: incomeFromOwnBusiness?.[user]?.choiceOfFund || "",
    //Salary Packaging Details
    [user + "EmployerFBTStatus"]:
      incomeFromOwnBusiness?.[user]?.SalaryPackagingModal?.employerFBTStatus ||
      "",
    [user + "CreditCardMortgageRepayments"]:
      incomeFromOwnBusiness?.[user]?.SalaryPackagingModal
        ?.creditCardMortgageRepayments || "",
    [user + "CostBaseOfCar"]:
      incomeFromOwnBusiness?.[user]?.SalaryPackagingModal?.costBaseOfCar || "",
    [user + "FBTPaidByEmployer"]:
      incomeFromOwnBusiness?.[user]?.SalaryPackagingModal?.FBTPaidByEmployer ||
      "",
    [user + "RunningCostsOfCar"]:
      incomeFromOwnBusiness?.[user]?.SalaryPackagingModal?.runningCostsOfCar ||
      "",

    //Leave Entitlements
    [user + "Annual"]:
      (incomeFromOwnBusiness?.[user]?.LeaveEntitlementsModal
        ?.annualLeaveAmount || "") +
      (incomeFromOwnBusiness?.[user]?.LeaveEntitlementsModal?.annualLeaveTime ||
        ""),

    [user + "Sick"]:
      (incomeFromOwnBusiness?.[user]?.LeaveEntitlementsModal?.sickLeaveAmount ||
        "") +
      (incomeFromOwnBusiness?.[user]?.LeaveEntitlementsModal?.sickLeaveTime ||
        ""),
    [user + "LongService"]:
      (incomeFromOwnBusiness?.[user]?.LeaveEntitlementsModal
        ?.longServiceLeaveAmount || "") +
      (incomeFromOwnBusiness?.[user]?.LeaveEntitlementsModal
        ?.longServiceLeaveTime || ""),
  };

  EmpoymentDetals.coupleEmployment =
    incomeFromOwnBusiness?.owner?.includes("client") &&
    incomeFromOwnBusiness?.owner?.includes("partner")
      ? true
      : false;

  return EmpoymentDetals;
}

function Centerlink(incomeFromCentrelink, user) {
  let CenterlinkData = {
    [user + "CRN"]: incomeFromCentrelink?.[user]?.CRN || "",
    [user + "PaymentType"]: (
      incomeFromCentrelink?.[user]?.paymentType || [""]
    ).join(", "),
    [user + "FortnightlyPayment"]:
      incomeFromCentrelink?.[user]?.fortnightlyPayment || "",
    [user + "AnnualPaymentAmount"]:
      incomeFromCentrelink?.[user]?.annualPaymentAmount || "",
    [user + "CentrelinkCardsHeld"]: (
      incomeFromCentrelink?.[user]?.centrelinkCardsHeld || [""]
    ).join(","),
  };

    CenterlinkData.coupleCenterlink =
    incomeFromCentrelink?.owner?.includes("client") &&
    incomeFromCentrelink?.owner?.includes("partner")
      ? true
      : false;

  return CenterlinkData;
}

function Will(will, user) {
  let CenterlinkData = {
    [user + "Will"]: will?.owner.includes(user) ? "Yes" : "No",
    [user + "WillYearSetUp"]: will?.[user]?.yearSetUp || "",
    [user + "WillsCurrent"]: will?.[user]?.willsCurrent || "",
    [user + "ExecutorItems"]:
      will?.[user]?.executor.map((item, index) => {
        return {
          executorName: item?.name || "",
          executerRelationship: item?.relationshipStatus || "",
        };
      }) || [],
    [user + "EnduringGuardianship"]: will?.[user]?.enduringGuardianship || "",

    [user + "EstatePlanningRadio"]: will?.[user]?.estatePlanningRadio || "",
    [user + "description"]: will?.[user]?.estatePlanningdescription || "",
  };

  return CenterlinkData;
}

function INCOME_AND_EXPENSES(allQuestions, CRState, user) {
  const EmploymentIncome =
    CRState.incomeFromOwnBusiness == "Yes"
      ? parseMoney(
          allQuestions?.incomeFromOwnBusiness?.[user + "Total"] || "$0",
        )
      : 0;

  const NetBusinessIncome =
    (CRState.incomeFromSoleTrader == "Yes"
      ? parseMoney(allQuestions?.incomeFromSoleTrader?.[user + "Total"] || "$0")
      : 0) +
    (CRState.incomeFromPartnership == "Yes"
      ? parseMoney(
          allQuestions?.incomeFromPartnership?.[user + "Total"] || "$0",
        )
      : 0);

  const SuperPensionPayment =
    (CRState.accountBasedPensionIssues == "Yes"
      ? allQuestions?.accountBasedPensionIssues?.[user].reduce(
          (t, e) =>
            t +
            parseFloat((e.pensionPayment || "$0").replace(/[^0-9.-]+/g, "")),
          0,
        )
      : 0) +
    (CRState.SMSFPensionPhase == "Yes"
      ? allQuestions?.SMSFPensionPhase?.[user].reduce((Total, e) => {
          const clientSum = e?.pensionBenefitsTotalArray?.reduce(
            (benefitTotal, benefit) =>
              benefitTotal + parseMoney(benefit?.pensionPayment || "$0"),
            0,
          );

          return Total + clientSum;
        }, 0)
      : 0);

  const LifeTimePensionPayment =
    CRState.incomeFromSuperPayment == "Yes"
      ? parseMoney(
          allQuestions?.incomeFromSuperPayment?.[user + "Total"] || "$0",
        )
      : 0;

  const OverseasPensionPayment =
    CRState.incomeFromOverseasPension == "Yes"
      ? parseMoney(
          allQuestions?.incomeFromOverseasPension?.[user + "Total"] || "$0",
        )
      : 0;

  const CenterlinkPension =
    CRState.incomeFromCentrelink == "Yes"
      ? parseMoney(allQuestions?.incomeFromCentrelink?.[user + "Total"] || "$0")
      : 0;

  const RentalIncome =
    CRState?.investmentPropertyDetails == "Yes"
      ? parseMoney(
          allQuestions?.investmentPropertyDetails?.client.reduce(
            (t, e) =>
              t +
              parseMoney(e.weeklyRentalIncome || "$0") *
                52 *
                (parseMoney(e?.[user + "Ownership"] || "0%") / 100),
            0,
          ),
        )
      : 0;

  const Interest =
    ((CRState.bankAccountFinance == "Yes"
      ? parseMoney(allQuestions?.bankAccountFinance?.[user + "Total"] || "$0")
      : 0) +
      (CRState.termDepositsFinance == "Yes"
        ? parseMoney(
            allQuestions?.termDepositsFinance?.[user + "Total"] || "$0",
          )
        : 0)) *
    0.03;

  const DividendIncome =
    ((CRState.australianShareMarket == "Yes"
      ? parseMoney(
          allQuestions?.australianShareMarket?.[user + "Total"] || "$0",
        )
      : 0) +
      (CRState.managedFund == "Yes"
        ? parseMoney(allQuestions?.managedFund?.[user + "Total"] || "$0")
        : 0)) *
    0.035;

  const AnnutiesIncome =
    CRState.annuitiesIssues == "Yes"
      ? allQuestions?.annuitiesIssues?.[user]?.reduce(
          (t, e) => t + parseMoney(e.annualAnnuityPayment || "$0"),
          0,
        )
      : 0;

  //following are just clientside expenses, partner side expenses are not included in document as of now
  const GeneralLivingExpensesTotal =
    CRState.incomeFromRegularLivingExpenses == "Yes"
      ? parseMoney(
          allQuestions?.generalLivingExpenses?.generalLivingExpensesTotal ||
            "$0",
        )
      : 0;

  const FamilyHome =
    CRState.familyHome == "Yes"
      ? parseMoney(
          allQuestions?.familyHome?.HomeLoanModal?.annualRepayments || "$0",
        )
      : 0;

  const InvestmentProperty =
    CRState.investmentPropertyDetails == "Yes"
      ? allQuestions?.investmentPropertyDetails?.[user]?.reduce(
          (t, e) => t + parseMoney(e.incomeExpenses || "$0"),
          0,
        )
      : 0;

  const InvestmentPropertyLoan =
    CRState.investmentPropertyDetails == "Yes"
      ? allQuestions?.investmentPropertyDetails?.[user]?.reduce(
          (t, e) =>
            t +
            parseMoney(
              e?.propertyLoanDetailsArray[0]?.AnnualRepayments || "$0",
            ),
          0,
        )
      : 0;

  const PersonalLoan =
    CRState.personalLoans == "Yes"
      ? allQuestions?.personalLoans?.[user]?.reduce(
          (t, e) => t + parseMoney(e.AnnualRepayments || "$0"),
          0,
        )
      : 0;

  const CreditCards =
    CRState.creditCards == "Yes"
      ? allQuestions?.creditCards?.[user]?.reduce(
          (t, e) => t + parseMoney(e.AnnualRepayments || "$0"),
          0,
        )
      : 0;

  const InvestmentLoan =
    (CRState.managedFundsLOC == "Yes"
      ? parseMoney(
          allQuestions?.managedFundsLOC?.client?.repaymentsAmount || "$0",
        ) +
        parseMoney(
          allQuestions?.managedFundsLOC?.partner?.repaymentsAmount || "$0",
        ) +
        parseMoney(
          allQuestions?.managedFundsLOC?.joint?.repaymentsAmount || "$0",
        )
      : 0) +
    (CRState.managedFundsMarginLoan == "Yes"
      ? parseMoney(
          allQuestions?.managedFundsMarginLoan?.client?.annualLoan || "$0",
        ) +
        parseMoney(
          allQuestions?.managedFundsMarginLoan?.partner?.annualLoan || "$0",
        ) +
        parseMoney(
          allQuestions?.managedFundsMarginLoan?.joint?.annualLoan || "$0",
        )
      : 0);

  const SuperContributions =
    CRState.incomeFromOwnBusiness == "Yes"
      ? parseMoney(
          allQuestions?.incomeFromOwnBusiness?.client?.SalaryPackageModal
            ?.salarySacrificeContributions || "$0",
        ) +
        parseMoney(
          allQuestions?.incomeFromOwnBusiness?.client?.SalaryPackageModal
            ?.afterTaxContributions || "$0",
        ) +
        parseMoney(
          allQuestions?.incomeFromOwnBusiness?.partner?.SalaryPackageModal
            ?.salarySacrificeContributions || "$0",
        ) +
        parseMoney(
          allQuestions?.incomeFromOwnBusiness?.partner?.SalaryPackageModal
            ?.afterTaxContributions || "$0",
        )
      : 0;

  let INCOME_AND_EXPENSES_Data = {
    [user + "EmploymentIncome"]: toCommaAndDollar(EmploymentIncome),
    [user + "NetBusinessIncome"]: toCommaAndDollar(NetBusinessIncome),
    [user + "SuperPensionPayment"]: toCommaAndDollar(SuperPensionPayment),
    [user + "LifeTimePensionPayment"]: toCommaAndDollar(LifeTimePensionPayment),
    [user + "OverseasPensionPayment"]: toCommaAndDollar(OverseasPensionPayment),
    [user + "CenterlinkPension"]: toCommaAndDollar(CenterlinkPension),
    [user + "RentalIncome"]: toCommaAndDollar(RentalIncome),
    [user + "Interest"]: toCommaAndDollar(Interest),
    [user + "DividendIncome"]: toCommaAndDollar(DividendIncome),
    [user + "AnnutiesIncome"]: toCommaAndDollar(AnnutiesIncome),

    // these are just for client's
    ...(user === "client" && {
      [user + "GeneralLivingExpensesTotal"]: toCommaAndDollar(
        GeneralLivingExpensesTotal,
      ),
      [user + "FamilyHome"]: toCommaAndDollar(FamilyHome),
      [user + "InvestmentProperty"]: toCommaAndDollar(InvestmentProperty),
      [user + "InvestmentPropertyLoan"]: toCommaAndDollar(
        InvestmentPropertyLoan,
      ),
      [user + "PersonalLoan"]: toCommaAndDollar(PersonalLoan),
      [user + "CreditCards"]: toCommaAndDollar(CreditCards),
      [user + "InvestmentLoan"]: toCommaAndDollar(InvestmentLoan),
      [user + "SuperContributions"]: toCommaAndDollar(SuperContributions),
    }), // if user is client then only include these expenses

    [user + "LessEstimatedTax"]: "", // need Varification
  };

  return INCOME_AND_EXPENSES_Data;
}

const GeneraDocument = async (id) => {
  try {
    console.log("Document generation started for ID:", id);

    const defaultUrl = getDefaultUrl();

    let personalDetails = getUserDetail();
    let allQuestions = getQuestionDetail();
    let goalsAndObjective = getGoalsDetail();
    let LoggedInUser = getLoggedInUserData();
    let GQState = getGQState();
    let CRState = getCRState();
    let bankDetailObj = getBankDetail();

    let Banks = bankDetailObj.FinancialInstitutions.map((elem) => ({
      [elem._id]: elem.platformName,
    })).reduce((acc, obj) => ({ ...acc, ...obj }), {});

    let platformBank = bankDetailObj.InvestmentPlatforms.map((elem) => ({
      [elem._id]: elem.platformName,
    })).reduce((acc, obj) => ({ ...acc, ...obj }), {});

    let InvestmentBondsBank = bankDetailObj.InvestmentBonds.map((elem) => ({
      [elem._id]: elem.platformName,
    })).reduce((acc, obj) => ({ ...acc, ...obj }), {});

    let SuperannuationFundsBank = bankDetailObj.SuperannuationFunds.map(
      (elem) => ({
        [elem._id]: elem.platformName,
      }),
    ).reduce((acc, obj) => ({ ...acc, ...obj }), {});

    let AccountBasedPensionsBank = bankDetailObj.AccountBasedPensions.map(
      (elem) => ({
        [elem._id]: elem.platformName,
      }),
    ).reduce((acc, obj) => ({ ...acc, ...obj }), {});

    let AnnuitiesBank = bankDetailObj.Annuities.map((elem) => ({
      [elem._id]: elem.platformName,
    })).reduce((acc, obj) => ({ ...acc, ...obj }), {});

    console.log(
      "Recoil values →",
      "PersonalDetail:",
      personalDetails,
      "Questions:",
      allQuestions,
      "Goals:",
      goalsAndObjective,
      "GQState:",
      GQState.clientFK,
    );

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

    // console.log(isEmptyObject(CRState), CRState.clientFK === id);

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

    // console.log(isEmptyObject(GQState), GQState.clientFK === id);

    // Goals & Objectives
    if (isEmptyObject(GQState) || GQState.clientFK !== id) {
      requests.push(
        GetAxios(`${defaultUrl}/api/goalsQuestions/getByClient/${id}`).then(
          (res) => {
            if (!isEmptyObject(res)) GQState = res;
          },
        ),
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
      platformBank: platformBank || {},
      InvestmentPlatforms: bankDetailObj.InvestmentPlatforms || {},
      InvestmentBonds: bankDetailObj.InvestmentBonds || {},
      InvestmentBondsBank: InvestmentBondsBank || {},
    });

    let adviserName =
      LoggedInUser &&
      typeof LoggedInUser === "object" &&
      Object.keys(LoggedInUser).length > 0
        ? `${toSentenceCase(LoggedInUser.firstName || "")} ${toSentenceCase(
            LoggedInUser.lastName || "",
          )}`.trim()
        : "Guest";

    const expenseTypes = [
      { name: "Rent", id: "houseHoldRent" },
      { name: "Gas", id: "houseHoldGas" },
      { name: "Electricity", id: "houseHoldElectricity" },
      { name: "Water Rates", id: "houseHoldWaterRates" },
      { name: "Council Rates", id: "houseHoldCouncilRates" },
      { name: "Phone", id: "houseHoldPhone" },
      { name: "Food", id: "houseHoldFood" },
      { name: "Internet", id: "houseHoldInternet" },
      { name: "Other", id: "houseHoldOthers" },
    ];

    const personalExpenses = [
      { name: "Clothing", id: "personalClothing" },
      { name: "Cigarettes", id: "personalCigarettes" },
      { name: "Alcohol", id: "personalAlcohol" },
      { name: "Subscription Fees", id: "personalSubscriptionFees" },
      { name: "Memberships & Clubs", id: "personalClubMemberships" },
      { name: "Holidays", id: "personalHolidays" },
      { name: "Dining Out", id: "personalDiningOut" },
      { name: "Mobile Phone", id: "personalMobilePhone" },
      { name: "Medical Expenses", id: "personalMedicalExpenses" },
      { name: "Other", id: "personalOthers" },
    ];

    const transportExpenses = [
      { name: "Petrol", id: "transportPetrol" },
      { name: "Car Maintenance", id: "transportCarRepair" },
      { name: "Car Registration", id: "transportCarRegistration" },
      { name: "Public Transport", id: "publicTransport" },
      { name: "Other", id: "transportOthers" },
    ];

    const insuranceExpenses = [
      { name: "Home And Contents", id: "insuranceHomeContents" },
      { name: "Car", id: "insuranceCar" },
      { name: "Private Health", id: "insurancePrivateHealth" },
      { name: "Life/TPD/Trauma", id: "insuranceLife" },
      { name: "Income Protection", id: "insuranceIncomeProtection" },
      { name: "Other", id: "insuranceOthers" },
    ];

    const partnerEmploymentIncome =
      CRState.incomeFromOwnBusiness == "Yes"
        ? parseMoney(allQuestions?.incomeFromOwnBusiness?.partnerTotal || "$0")
        : 0;

    const partnerNetBusinessIncome =
      (CRState.incomeFromSoleTrader == "Yes"
        ? parseMoney(allQuestions?.incomeFromSoleTrader?.partnerTotal || "$0")
        : 0) +
      (CRState.incomeFromPartnership == "Yes"
        ? parseMoney(allQuestions?.incomeFromPartnership?.partnerTotal || "$0")
        : 0);

    const partnerSuperPensionPayment =
      (CRState.accountBasedPensionIssues == "Yes"
        ? allQuestions?.accountBasedPensionIssues?.partner.reduce(
            (t, e) =>
              t +
              parseFloat((e.pensionPayment || "$0").replace(/[^0-9.-]+/g, "")),
            0,
          )
        : 0) +
      (CRState.SMSFPensionPhase == "Yes"
        ? allQuestions?.SMSFPensionPhase?.partner.reduce(
            (partnerTotal, partner) => {
              const partnerSum = partner.pensionBenefitsTotalArray?.reduce(
                (benefitTotal, benefit) =>
                  benefitTotal + parseMoney(benefit?.pensionPayment || "$0"),
                0,
              );

              return partnerTotal + partnerSum;
            },
            0,
          )
        : 0);

    const partnerLifeTimePensionPayment =
      CRState.incomeFromSuperPayment == "Yes"
        ? parseMoney(allQuestions?.incomeFromSuperPayment?.partnerTotal || "$0")
        : 0;

    const partnerOverseasPensionPayment =
      CRState.incomeFromOverseasPension == "Yes"
        ? parseMoney(
            allQuestions?.incomeFromOverseasPension?.partnerTotal || "$0",
          )
        : 0;

    const partnerCenterlinkPension =
      CRState.incomeFromCentrelink == "Yes"
        ? parseMoney(allQuestions?.incomeFromCentrelink?.partnerTotal || "$0")
        : 0;

    const partnerRentalIncome =
      CRState?.investmentPropertyDetails == "Yes"
        ? parseMoney(
            allQuestions?.investmentPropertyDetails?.client.reduce(
              (t, e) =>
                t +
                parseMoney(e.weeklyRentalIncome || "$0") *
                  52 *
                  (parseMoney(e.partnerOwnership || "0%") / 100),
              0,
            ),
          )
        : 0;

    const partnerInterest =
      ((CRState.bankAccountFinance == "Yes"
        ? parseMoney(allQuestions?.bankAccountFinance?.partnerTotal || "$0")
        : 0) +
        (CRState.termDepositsFinance == "Yes"
          ? parseMoney(allQuestions?.termDepositsFinance?.partnerTotal || "$0")
          : 0)) *
      0.03;

    const partnerDividendIncome =
      ((CRState.australianShareMarket == "Yes"
        ? parseMoney(allQuestions?.australianShareMarket?.partnerTotal || "$0")
        : 0) +
        (CRState.managedFund == "Yes"
          ? parseMoney(allQuestions?.managedFund?.partnerTotal || "$0")
          : 0)) *
      0.035;

    const partnerAnnutiesIncome =
      CRState.annuitiesIssues == "Yes"
        ? allQuestions?.annuitiesIssues?.partner?.reduce(
            (t, e) => t + parseMoney(e.annualAnnuityPayment || "$0"),
            0,
          )
        : 0;

    const clientSMSFCurrentBalance = (allQuestions, CRState) => {
      try {
        const parseNum = (val) =>
          val && typeof val === "string"
            ? parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0
            : typeof val === "number"
              ? val
              : 0;

        // Generic extractor: SMSFTotal → propertyPortfolio → totalDebt → client/partner/joint totals
        const pickTotal = (
          obj,
          prefer = [
            "SMSFTotal",
            "propertyPortfolio",
            "totalDebt",
            "clientTotal",
            "partnerTotal",
            "jointTotal",
          ],
        ) => {
          if (!obj) return 0;
          for (const field of prefer) {
            if (obj[field] !== undefined && obj[field] !== null) {
              return parseNum(obj[field]);
            }
          }
          return 0;
        };

        // -----------------------------
        // ✔ ASSET SECTIONS
        // -----------------------------
        const assetKeys = [
          // "SMSFAccumulationDetails",
          // "SMSFPensionPhase",
          "SMSFBank",
          "SMSFTermDeposits",
          "SMSFAustralianShares",
          "SMSFManagedFunds",
          "SMSFInvestmentProperties", // propertyPortfolio (asset)
          "SMSFOtherInvestment",
        ];

        // -----------------------------
        // ✔ LIABILITY SECTIONS
        // -----------------------------
        const liabilityKeys = [
          "SMSFInvestmentLoan",
          "SMSFInvestmentProperties", // totalDebt (liability)
        ];

        // -----------------------------
        // SUM ALL ASSETS
        // -----------------------------
        const assetsSum = assetKeys.reduce((acc, key) => {
          return (
            acc +
            pickTotal(CRState?.[key] === "Yes" ? allQuestions?.[key] : "$0")
          );
        }, 0);

        // -----------------------------
        // SUM ALL LIABILITIES
        // -----------------------------
        const liabilitiesSum = liabilityKeys.reduce((acc, key) => {
          return (
            acc +
            pickTotal(CRState?.[key] === "Yes" ? allQuestions?.[key] : "$0", [
              "totalDebt",
              "SMSFTotal",
              "propertyPortfolio",
            ])
          );
        }, 0);

        const netTotal = assetsSum - liabilitiesSum;

        return toCommaAndDollar(netTotal);
      } catch (error) {
        console.error("Error calculating SMSF totals:", error);
        return "$0";
      }
    };

    const clientInvestmentTrustCurrentBalance = (questionDetail, CRObject) => {
      {
        try {
          const parseNum = (val) =>
            val && typeof val === "string"
              ? parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0
              : typeof val === "number"
                ? val
                : 0;

          // helper: picks trustTotal → propertyPortfolio → totalDebt → clientTotal → partnerTotal → jointTotal
          const pickTotal = (
            obj,
            prefer = [
              "trustTotal",
              "propertyPortfolio",
              "totalDebt",
              "clientTotal",
              "partnerTotal",
              "jointTotal",
            ],
          ) => {
            if (!obj) return 0;
            for (const field of prefer) {
              if (obj[field] !== undefined && obj[field] !== null) {
                return parseNum(obj[field]);
              }
            }
            return 0;
          };

          // assets sections
          const assetKeys = [
            "familyBank",
            "familyTermDeposit",
            "familyAustralianShare",
            "familyMangedFunds",
            "familyInvestmentProperties", // propertyPortfolio is asset
            "familyOtherInvestment",
          ];

          // liability sections
          const liabilityKeys = [
            "familyInvestmentHomeLoan",
            "familyInvestmentProperties", // totalDebt is liability
          ];

          // sum assets
          const assetsSum = assetKeys.reduce((acc, key) => {
            return (
              acc +
              pickTotal(
                CRObject?.[key] === "Yes" ? questionDetail?.[key] : "$0",
              )
            );
          }, 0);

          // sum liabilities
          const liabilitiesSum = liabilityKeys.reduce((acc, key) => {
            return (
              acc +
              pickTotal(
                CRObject?.[key] === "Yes" ? questionDetail?.[key] : "$0",
                ["totalDebt", "trustTotal", "propertyPortfolio"],
              )
            );
          }, 0);

          const netTotal = assetsSum - liabilitiesSum;
          return toCommaAndDollar(netTotal);
        } catch (error) {
          console.error("Error calculating Family total:", error);
          return "$0";
        }
      }
    };

    // 🔽 Continue document generation here
    let payload = {
      clientName: personalDetails?.client?.clientGivenName || "",
      adviserName: adviserName || "",

      downloadDate: new Date().toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),

      items: Object.values(content.GoalsAndObjectives)
        .flat()
        .filter((item) => GQState?.[item.key] === "Yes")
        .map((item) => ({
          goalName: item?.title || "",
          scopeOfAdvice:
            goalsAndObjective?.[item.key]?.scopeOfAdvice ||
            item?.scopeOfAdvice ||
            "",
          description: goalsAndObjective?.[item.key]?.description || "",
          when: goalsAndObjective?.[item.key]?.when || item?.whenScopeIs || "",
          estimatedValue: goalsAndObjective?.[item.key]?.estimatedValue || "",
        })),

      childitem:
        personalDetails?.children?.arrayOfChildren?.map((child) => ({
          childFirstName: child?.firstName || "",
          childLastName: child?.lastName || "",
          childDob: child?.dob ? convertDateAUWithDayJS(child?.dob) : "",
          childAge: child?.age || "",
          childGender: child?.gender || "",
          childRelationship: child?.relationship || "",
          childDepenantChild: child?.depenantChild || "",
        })) || [],

      //client Personal Details
      ...PerosonalDetail(personalDetails, "client"),

      //Employment Details
      ...EmpoymentDetal(allQuestions?.incomeFromOwnBusiness, "client"),

      //Centerlink Details
      ...Centerlink(allQuestions?.incomeFromCentrelink, "client"),

      //Will
      ...Will(allQuestions?.will, "client"),

      // we might need it
      // "clientTestamentaryTrust": "",
      // "clientEstatePlanningRadio": "",

      //POA
      clientPOAType: allQuestions?.POA?.client?.POAType || "",
      clientPOAYearSetUp: allQuestions?.POA?.client?.yearSetUp || "",
      clientPOANameItems:
        allQuestions?.POA?.client?.POAName.map((item, index) => {
          return {
            executorName: item?.name || "",
            executerRelationship: item?.relationshipStatus || "",
          };
        }) || [],

      // ProFessional Adviser
      clientProfessionalAdviseritems:
        allQuestions?.professionalAdviser?.client?.map((item, index) => {
          return {
            POAType: item?.POAType || "",
            adviserName: item?.adviserName || "",
            company: item?.company || "",
            phone: item?.phone || "",
            email: item?.email || "",
          };
        }) || [],

      //INCOME AND EXPENSES Table
      ...INCOME_AND_EXPENSES(allQuestions, CRState, "client"),

      //Summary of Networth
      //lifeStyle Assets
      clientCarCurrentValue: allQuestions?.car?.client?.currentValue || "$0",
      clientContentsCurrentValue:
        allQuestions?.houseHold?.client?.currentValue || "$0",
      clientBoatCurrentValue:
        allQuestions?.houseHold?.client?.currentValue || "$0",
      clientCaravanCurrentValue:
        allQuestions?.caravan?.client?.currentValue || "$0",
      clientOtherAssetsCurrentValue:
        allQuestions?.otherAssets?.client?.currentValue || "$0",

      //investment Assets
      clientBankAccountCurrentBalance:
        allQuestions?.bankAccountFinance?.clientCurrentBalance || "$0",
      clientTermDepositsCurrentBalance:
        allQuestions?.termDepositsFinance?.clientCurrentBalance || "$0",
      clientAustralianSharesCurrentBalance:
        allQuestions?.australianShareMarket?.clientCurrentBalance || "$0",
      clientPlatformInvestmentsCurrentBalance:
        allQuestions?.managedFund?.clientCurrentBalance || "$0",
      clientInvestmentBondsCurrentBalance:
        allQuestions?.investmentBondFinance?.clientCurrentBalance || "$0",

      clientSuperannuationCurrentBalance:
        allQuestions?.superAnnuationIssues?.clientCurrentBalance || "$0",
      clientAccountBasedPensionsCurrentBalance:
        allQuestions?.accountBasedPensionIssues?.clientCurrentBalance || "$0",
      clientAnnuitiesCurrentBalance:
        allQuestions?.annuitiesIssues?.clientCurrentBalance || "$0",

      ...Object.fromEntries(
        Array.from({ length: 10 }, (_, i) => [
          `clientInvestmentPropertyCurrentBalance${i + 1}`,
          allQuestions?.investmentPropertyDetails?.client?.[i]
            ?.clientOwnership == "100.00%"
            ? allQuestions?.investmentPropertyDetails?.client?.[i]?.CurrentValue
            : "$0",
        ]),
      ),

      clientTradingCompanyCurrentBalance:
        allQuestions?.BusinessAsCompanyStructure?.clientCurrentBalance || "$0",
      clientBusinessTrustCurrentBalance:
        allQuestions?.BusinessAsTrusts?.clientCurrentBalance || "$0",
      clientSMSFCurrentBalance: clientSMSFCurrentBalance(allQuestions, CRState),
      clientInvestmentTrustCurrentBalance: clientInvestmentTrustCurrentBalance(
        allQuestions,
        CRState,
      ),

      //Liabilities section
      clientLiabilityCreditCards: ["Single", "Widowed", ""].includes(
        personalDetails?.client?.clientMaritalStatus || "",
      )
        ? allQuestions?.creditCards?.clientTotal || "$0"
        : "$0",
      clientPersonalLoans: ["Single", "Widowed", ""].includes(
        personalDetails?.client?.clientMaritalStatus || "",
      )
        ? allQuestions?.personalLoans?.clientTotal || "$0"
        : "$0",

      ...Object.fromEntries(
        Array.from({ length: 10 }, (_, i) => [
          `clientInvestmentPropertyLoanBalance${i + 1}`,
          allQuestions?.investmentPropertyDetails?.client?.[i]
            ?.clientOwnership == "100.00%"
            ? allQuestions?.investmentPropertyDetails?.client?.[i]
                ?.propertyLoanDetails
            : "$0",
        ]),
      ),

      ...Object.fromEntries(
        Array.from({ length: 10 }, (_, i) => [
          `clientInvestmentPropertyaddress${i + 1}`,
          allQuestions?.investmentPropertyDetails?.client?.[i]?.PropertyAddress
            ? (allQuestions?.investmentPropertyDetails?.client?.[i]
                ?.PropertyAddress || "") +
              " (" +
              (allQuestions?.investmentPropertyDetails?.client?.[i]
                ?.postcodeSuburb || "") +
              ") "
            : "",
        ]),
      ),

      clientInvestmentLoanBalanvce:
        allQuestions?.managedFundsLOC?.client?.loanBalance || "$0",
      clientMarginLoanBalance:
        allQuestions?.managedFundsMarginLoan?.client?.loanBalance || "$0",

      clientBankAccounts:
        allQuestions?.bankAccountFinance?.client.length > 0
          ? allQuestions?.bankAccountFinance?.client.map((item, index) => {
              return {
                ...item,
                Institution: Banks?.[item.Institution],
              };
            })
          : [],

      clientTermDeposits:
        allQuestions?.termDepositsFinance?.client.length > 0
          ? allQuestions?.termDepositsFinance?.client.map((item, index) => {
              return {
                ...item,
                Institution: Banks?.[item.Institution],
              };
            })
          : [],

      clientAustralianShare: allQuestions?.australianShareMarket?.client || [],

      clientPlatFromInvestment:
        allQuestions?.managedFund?.client.length > 0
          ? allQuestions?.managedFund?.client.map((item, index) => {
              let portfolioValueArray = item.portfolioValueArray.map(
                (element, i) => {
                  let investment = bankDetailObj.InvestmentPlatforms.find(
                    (elem) => elem._id === item.platformName,
                  );

                  return {
                    ...element,
                    investmentOption:
                      investment?.arrayOfOffers &&
                      investment.arrayOfOffers.length > 0
                        ? investment.arrayOfOffers.find(
                            (elem) => elem._id === element.investmentOption,
                          ).investmentName
                        : "",
                  };
                },
              );

              return {
                ...item,
                platformName: platformBank?.[item.platformName],
                portfolioValueArray,
                owner: personalDetails?.client?.clientPreferredName || "",
              };
            })
          : [],

      clientInvestmentBond:
        allQuestions?.investmentBondFinance?.client.length > 0
          ? allQuestions?.investmentBondFinance?.client.map((item, index) => {
              let portfolioValueArray = item.portfolioValueArray.map(
                (element, i) => {
                  let investment = bankDetailObj.InvestmentBonds.find(
                    (elem) => elem._id === item.platformName,
                  );

                  return {
                    ...element,
                    investmentOption: investment.arrayOfOffers.find(
                      (elem) => elem._id === element.investmentOption,
                    ).investmentName,
                  };
                },
              );

              return {
                ...item,
                platformName: InvestmentBondsBank?.[item.platformName],
                portfolioValueArray,
                owner: personalDetails?.client?.clientPreferredName || "",
              };
            })
          : [],

      clientSuperFund:
        allQuestions?.superAnnuationIssues?.client.length > 0
          ? allQuestions?.superAnnuationIssues?.client.map((item, index) => {
              let portfolioValueArray =
                item?.balanceBenefitDetails?.portfolioValueArray &&
                item?.balanceBenefitDetails?.portfolioValueArray.length > 0
                  ? item?.balanceBenefitDetails?.portfolioValueArray.map(
                      (element, i) => {
                        let investment = bankDetailObj.SuperannuationFunds.find(
                          (elem) => elem._id === item.platformName,
                        );

                        return {
                          ...element,
                          investmentOption: investment.arrayOfOffers.find(
                            (elem) => elem._id === element.investmentOption,
                          ).investmentName,
                        };
                      },
                    )
                  : [];

              return {
                platformName:
                  SuperannuationFundsBank?.[item.platformName] || "",
                memberName: personalDetails?.client?.clientPreferredName || "",
                memberNumber: item?.memberNumber || "",
                fundType: item?.balanceBenefitDetails?.fundType || "",
                commencementDate:
                  convertDateAUWithDayJS(
                    item?.balanceBenefitDetails?.commencementDate,
                  ) || "",
                eligibleServiceDate:
                  convertDateAUWithDayJS(
                    item?.balanceBenefitDetails?.eligibleServiceDate,
                  ) || "",
                portfolioValue:
                  item?.balanceBenefitDetails?.portfolioValue || "",
                taxFreeComponent:
                  item?.balanceBenefitDetails?.taxFreeComponent || "",
                taxableComponent:
                  item?.balanceBenefitDetails?.taxableComponent || "",
                preservedAmount:
                  item?.balanceBenefitDetails?.preservedAmount || "",
                restrictedNonPreserved:
                  item?.balanceBenefitDetails?.restrictedNonPreserved || "",
                unrestrictedNonPreserved:
                  item?.balanceBenefitDetails?.unrestrictedNonPreserved || "",
                portfolioValueArray: portfolioValueArray,
                annualAdvice: item?.annualAdvice || "",
                contributionsArrayNonConcessional:
                  item?.contributionsArray &&
                  item?.contributionsArray.length > 0
                    ? item?.contributionsArray
                        ?.map((e, i) => {
                          return {
                            year: item?.contributionsStartYear + i + 1,
                            nonConcessionalContributions:
                              e.nonConcessionalContributions || "$0",
                          };
                        })
                        .slice(-3)
                    : [],
                contributionsArrayConcessional:
                  item?.contributionsArray &&
                  item?.contributionsArray.length > 0
                    ? item?.contributionsArray
                        ?.map((e, i) => {
                          return {
                            year: item?.contributionsStartYear + i + 1,
                            totalConcessional: e.totalConcessional || "$0",
                          };
                        })
                        .slice(-5)
                    : [],
                coverType: item?.groupInsuranceDetails?.coverType || "",
                coverType2: item?.groupInsuranceDetails?.coverType2 || "",
                lifeCover: item?.groupInsuranceDetails?.lifeCover || "",
                TPDCover: item?.groupInsuranceDetails?.TPDCover || "",
                monthlyIncome: item?.groupInsuranceDetails?.monthlyIncome || "",
                waitingPeriod: item?.groupInsuranceDetails?.waitingPeriod || "",
                BenefitPeriod: item?.groupInsuranceDetails?.BenefitPeriod || "",
                TotalInsuranceCost: toCommaAndDollar(
                  parseMoney(item?.groupInsuranceDetails?.lifeCover || "$0") +
                    parseMoney(item?.groupInsuranceDetails.TPDCover || "$0") +
                    parseMoney(
                      item?.groupInsuranceDetails.monthlyIncome || "$0",
                    ),
                ),
                nominationType:
                  item?.nominatedBeneficiariesDetails?.nominationType || "",
                nominatedBeneficiariesArray:
                  item?.nominatedBeneficiariesDetails
                    ?.nominatedBeneficiariesArray &&
                  item?.nominatedBeneficiariesDetails
                    ?.nominatedBeneficiariesArray.length > 0
                    ? item?.nominatedBeneficiariesDetails?.nominatedBeneficiariesArray.map(
                        (e, i) => {
                          return {
                            relationshipStatus: e.relationshipStatus || "",
                            shareBenefit: e.shareBenefit || "0.00%",
                          };
                        },
                      )
                    : [],
              };
            })
          : [],

      clientAccountBasedPensions:
        allQuestions?.accountBasedPensionIssues?.client.length > 0
          ? allQuestions?.accountBasedPensionIssues?.client.map(
              (item, index) => {
                let portfolioValueArray =
                  item?.balanceBenefitDetails?.portfolioValueArray &&
                  item?.balanceBenefitDetails?.portfolioValueArray.length > 0
                    ? item?.balanceBenefitDetails?.portfolioValueArray.map(
                        (element, i) => {
                          let investment =
                            bankDetailObj.AccountBasedPensions.find(
                              (elem) => elem._id === item.platformName,
                            );

                          return {
                            ...element,
                            investmentOption: investment.arrayOfOffers.find(
                              (elem) => elem._id === element.investmentOption,
                            ).investmentName,
                          };
                        },
                      )
                    : [];

                return {
                  platformName:
                    AccountBasedPensionsBank?.[item.platformName] || "",
                  memberName:
                    personalDetails?.client?.clientPreferredName || "",
                  memberNumber: item?.memberNumber || "",
                  fundType: item?.balanceBenefitDetails?.fundType || "",
                  commencementDate:
                    convertDateAUWithDayJS(
                      item?.balanceBenefitDetails?.commencementDate,
                    ) || "",
                  eligibleServiceDate:
                    convertDateAUWithDayJS(
                      item?.balanceBenefitDetails?.eligibleServiceDate,
                    ) || "",
                  portfolioValue:
                    item?.balanceBenefitDetails?.portfolioValue || "",
                  taxFreeComponent:
                    item?.balanceBenefitDetails?.taxFreeComponent || "",
                  taxableComponent:
                    item?.balanceBenefitDetails?.taxableComponent || "",
                  restrictedNonPreserved:
                    item?.balanceBenefitDetails?.restrictedNonPreserved || "",
                  unrestrictedNonPreserved:
                    item?.balanceBenefitDetails?.unrestrictedNonPreserved || "",
                  preservedAmount:
                    item?.balanceBenefitDetails?.preservedAmount || "",
                  purchasePrice:
                    item?.balanceBenefitDetails?.purchasePrice || "",
                  pensionPayment: item?.pensionPayment || "",
                  annualAdvice: item?.annualAdvice || "",
                  portfolioValueArray: portfolioValueArray,

                  nominationType:
                    item?.nominatedBeneficiariesDetails?.nominationType || "",
                  nominatedBeneficiariesArray:
                    item?.nominatedBeneficiariesDetails
                      ?.nominatedBeneficiariesArray &&
                    item?.nominatedBeneficiariesDetails
                      ?.nominatedBeneficiariesArray.length > 0
                      ? item?.nominatedBeneficiariesDetails?.nominatedBeneficiariesArray.map(
                          (e, i) => {
                            return {
                              relationshipStatus: e.relationshipStatus || "",
                              shareBenefit: e.shareBenefit || "0.00%",
                            };
                          },
                        )
                      : [],
                };
              },
            )
          : [],

      clientAnnuties:
        allQuestions?.annuitiesIssues?.client.length > 0
          ? allQuestions?.annuitiesIssues?.client.map((item, index) => {
              return {
                platformName: AnnuitiesBank?.[item.platformName] || "",
                memberName: personalDetails?.client?.clientPreferredName || "",
                accountNumber: item?.accountNumber || "",
                sourceFunds: item?.sourceFunds || "",
                annuityType: item?.annuityType || "",
                term: item?.term || "",
                yearsMaturity: item?.yearsMaturity || "",
                originalInvestmentAmount: item?.originalInvestmentAmount || "",
                returnCapitalValue: item?.returnCapitalValue || "",
                annualAnnuityPayment: item?.annualAnnuityPayment || "",
                annualAdvice: item?.annualAdvice || "",
                nominationType:
                  item?.nominatedBeneficiariesDetails?.nominationType || "",
                nominatedBeneficiariesArray:
                  item?.nominatedBeneficiariesDetails
                    ?.nominatedBeneficiariesArray &&
                  item?.nominatedBeneficiariesDetails
                    ?.nominatedBeneficiariesArray.length > 0
                    ? item?.nominatedBeneficiariesDetails?.nominatedBeneficiariesArray.map(
                        (e, i) => {
                          return {
                            relationshipStatus: e.relationshipStatus || "",
                            shareBenefit: e.shareBenefit || "0.00%",
                          };
                        },
                      )
                    : [],
              };
            })
          : [],

      clientAccumulationBalanceCurrentBalance:
        allQuestions?.SMSFAccumulationDetails?.client?.[0]
          ?.accumulationBenefitsArray?.[0]?.currentBalance || "",
      clientAccumulationBalanceEligibleServiceDate: allQuestions
        ?.SMSFAccumulationDetails?.client?.[0]?.accumulationBenefitsArray?.[0]
        ?.eligibleServiceDate
        ? convertDateAUWithDayJS(
            allQuestions?.SMSFAccumulationDetails?.client?.[0]
              ?.accumulationBenefitsArray?.[0]?.eligibleServiceDate,
          )
        : "",
      clientAccumulationBalanceCommencementDate: allQuestions
        ?.SMSFAccumulationDetails?.client?.[0]?.accumulationBenefitsArray?.[0]
        ?.commencementDate
        ? convertDateAUWithDayJS(
            allQuestions?.SMSFAccumulationDetails?.client?.[0]
              ?.accumulationBenefitsArray?.[0]?.commencementDate,
          )
        : "",
      clientAccumulationBalanceTaxfreeComponent:
        allQuestions?.SMSFAccumulationDetails?.client?.[0]
          ?.accumulationBenefitsArray?.[0]?.taxFreeComponent || "",
      clientAccumulationBalanceTaxableComponent:
        allQuestions?.SMSFAccumulationDetails?.client?.[0]
          ?.accumulationBenefitsArray?.[0]?.taxableComponent || "",
      clientAccumulationBalanceRestrictedNonPreserved:
        allQuestions?.SMSFAccumulationDetails?.client?.[0]
          ?.accumulationBenefitsArray?.[0]?.restrictedNonPreserved || "",
      clientAccumulationBalanceUnrestrictedNonPreserved:
        allQuestions?.SMSFAccumulationDetails?.client?.[0]
          ?.accumulationBenefitsArray?.[0]?.unRestrictedNonPreserved || "",
      clientAccumulationBalancePreservedAmount:
        allQuestions?.SMSFAccumulationDetails?.client?.[0]
          ?.accumulationBenefitsArray?.[0]?.preservedAmount || "",

      //partner
      ...(!["Single", "Widowed", ""].includes(
        personalDetails?.client?.clientMaritalStatus || "",
      )
        ? {
            //client Personal Details
            ...PerosonalDetail(personalDetails, "partner"),

            //Employment Details
            ...EmpoymentDetal(allQuestions?.incomeFromOwnBusiness, "partner"),

            //Centerlink Details
            ...Centerlink(allQuestions?.incomeFromCentrelink, "partner"),

            //Will
            ...Will(allQuestions?.will, "partner"),

            // we might need it
            // "partnerTestamentaryTrust": "",
            // "partnerEstatePlanningRadio": "",

            //POA
            partnerPOAType: allQuestions?.POA?.partner?.POAType || "",
            partnerPOAYearSetUp: allQuestions?.POA?.partner?.yearSetUp || "",
            partnerPOANameItems:
              allQuestions?.POA?.partner?.POAName.map((item, index) => {
                return {
                  executorName: item?.name || "",
                  executerRelationship: item?.relationshipStatus || "",
                };
              }) || [],

            // ProFessional Adviser
            partnerProfessionalAdviseritems:
              allQuestions?.professionalAdviser?.partner?.map((item, index) => {
                return {
                  POAType: item?.POAType || "",
                  adviserName: item?.adviserName || "",
                  company: item?.company || "",
                  phone: item?.phone || "",
                  email: item?.email || "",
                };
              }) || [],

            //INCOME AND EXPENSES Table
            ...INCOME_AND_EXPENSES(allQuestions, CRState, "partner"),

            //Summary of Networth
            //lifeStyle Assets
            partnerCarCurrentValue:
              allQuestions?.car?.partner?.currentValue || "$0",
            partnerContentsCurrentValue:
              allQuestions?.houseHold?.partner?.currentValue || "$0",
            partnerBoatCurrentValue:
              allQuestions?.houseHold?.partner?.currentValue || "$0",
            partnerCaravanCurrentValue:
              allQuestions?.caravan?.partner?.currentValue || "$0",
            partnerOtherAssetsCurrentValue:
              allQuestions?.otherAssets?.partner?.currentValue || "$0",

            //investment Assets
            partnerBankAccountCurrentBalance:
              allQuestions?.bankAccountFinance?.partnerCurrentBalance || "$0",
            partnerTermDepositsCurrentBalance:
              allQuestions?.termDepositsFinance?.partnerCurrentBalance || "$0",
            partnerAustralianSharesCurrentBalance:
              allQuestions?.australianShareMarket?.partnerCurrentBalance ||
              "$0",
            partnerPlatformInvestmentsCurrentBalance:
              allQuestions?.managedFund?.partnerCurrentBalance || "$0",
            partnerInvestmentBondsCurrentBalance:
              allQuestions?.investmentBondFinance?.partnerCurrentBalance ||
              "$0",

            partnerSuperannuationCurrentBalance:
              allQuestions?.superAnnuationIssues?.partnerCurrentBalance || "$0",
            partnerAccountBasedPensionsCurrentBalance:
              allQuestions?.accountBasedPensionIssues?.partnerCurrentBalance ||
              "$0",
            partnerAnnuitiesCurrentBalance:
              allQuestions?.annuitiesIssues?.partnerCurrentBalance || "$0",

            ...Object.fromEntries(
              Array.from({ length: 10 }, (_, i) => [
                `partnerInvestmentPropertyCurrentBalance${i + 1}`,
                allQuestions?.investmentPropertyDetails?.client?.[i]
                  ?.partnerOwnership == "100.00%"
                  ? allQuestions?.investmentPropertyDetails?.client?.[i]
                      ?.CurrentValue
                  : "$0",
              ]),
            ),

            partnerTradingCompanyCurrentBalance:
              allQuestions?.BusinessAsCompanyStructure?.partnerCurrentBalance ||
              "$0",
            partnerBusinessTrustCurrentBalance:
              allQuestions?.BusinessAsTrusts?.partnerCurrentBalance || "$0",

            ...Object.fromEntries(
              Array.from({ length: 10 }, (_, i) => [
                `partnerInvestmentPropertyLoanBalance${i + 1}`,
                allQuestions?.investmentPropertyDetails?.client?.[i]
                  ?.partnerOwnership == "100.00%"
                  ? allQuestions?.investmentPropertyDetails?.client?.[i]
                      ?.propertyLoanDetails
                  : "$0",
              ]),
            ),

            partnerInvestmentLoanBalanvce:
              allQuestions?.managedFundsLOC?.partner?.loanBalance || "$0",
            partnerMarginLoanBalance:
              allQuestions?.managedFundsMarginLoan?.partner?.loanBalance ||
              "$0",

            partnerBankAccounts:
              allQuestions?.bankAccountFinance?.partner.length > 0
                ? allQuestions?.bankAccountFinance?.partner.map(
                    (item, index) => {
                      return {
                        ...item,
                        Institution: Banks?.[item.Institution],
                      };
                    },
                  )
                : [],

            partnerTermDeposits:
              allQuestions?.termDepositsFinance?.partner.length > 0
                ? allQuestions?.termDepositsFinance?.partner.map(
                    (item, index) => {
                      return {
                        ...item,
                        Institution: Banks?.[item.Institution],
                      };
                    },
                  )
                : [],

            partnerAustralianShare:
              allQuestions?.australianShareMarket?.partner || [],

            partnerAccumulationBalanceCurrentBalance:
              allQuestions?.SMSFAccumulationDetails?.partner?.[0]
                ?.accumulationBenefitsArray?.[0]?.currentBalance || "",
            partnerAccumulationBalanceEligibleServiceDate: allQuestions
              ?.SMSFAccumulationDetails?.partner?.[0]
              ?.accumulationBenefitsArray?.[0]?.eligibleServiceDate
              ? convertDateAUWithDayJS(
                  allQuestions?.SMSFAccumulationDetails?.partner?.[0]
                    ?.accumulationBenefitsArray?.[0]?.eligibleServiceDate,
                )
              : "",
            partnerAccumulationBalanceCommencementDate: allQuestions
              ?.SMSFAccumulationDetails?.partner?.[0]
              ?.accumulationBenefitsArray?.[0]?.commencementDate
              ? convertDateAUWithDayJS(
                  allQuestions?.SMSFAccumulationDetails?.partner?.[0]
                    ?.accumulationBenefitsArray?.[0]?.commencementDate,
                )
              : "",
            partnerAccumulationBalanceTaxfreeComponent:
              allQuestions?.SMSFAccumulationDetails?.partner?.[0]
                ?.accumulationBenefitsArray?.[0]?.taxFreeComponent || "",
            partnerAccumulationBalanceTaxableComponent:
              allQuestions?.SMSFAccumulationDetails?.partner?.[0]
                ?.accumulationBenefitsArray?.[0]?.taxableComponent || "",
            partnerAccumulationBalanceRestrictedNonPreserved:
              allQuestions?.SMSFAccumulationDetails?.partner?.[0]
                ?.accumulationBenefitsArray?.[0]?.restrictedNonPreserved || "",
            partnerAccumulationBalanceUnrestrictedNonPreserved:
              allQuestions?.SMSFAccumulationDetails?.partner?.[0]
                ?.accumulationBenefitsArray?.[0]?.unRestrictedNonPreserved ||
              "",
            partnerAccumulationBalancePreservedAmount:
              allQuestions?.SMSFAccumulationDetails?.partner?.[0]
                ?.accumulationBenefitsArray?.[0]?.preservedAmount || "",

            partnerPlatFromInvestment:
              allQuestions?.managedFund?.partner.length > 0
                ? allQuestions?.managedFund?.partner.map((item, index) => {
                    let portfolioValueArray = item.portfolioValueArray.map(
                      (element, i) => {
                        let investment = bankDetailObj.InvestmentPlatforms.find(
                          (elem) => elem._id === item.platformName,
                        );
                        return {
                          ...element,
                          investmentOption: investment.arrayOfOffers.find(
                            (elem) => elem._id === element.investmentOption,
                          ).investmentName,
                        };
                      },
                    );

                    return {
                      ...item,
                      platformName: platformBank?.[item.platformName],
                      portfolioValueArray,
                      owner:
                        personalDetails?.partner?.partnerPreferredName || "",
                    };
                  })
                : [],

            partnerInvestmentBond:
              allQuestions?.investmentBondFinance?.partner.length > 0
                ? allQuestions?.investmentBondFinance?.partner.map(
                    (item, index) => {
                      let portfolioValueArray = item.portfolioValueArray.map(
                        (element, i) => {
                          let investment = bankDetailObj.InvestmentBonds.find(
                            (elem) => elem._id === item.platformName,
                          );
                          return {
                            ...element,
                            investmentOption: investment.arrayOfOffers.find(
                              (elem) => elem._id === element.investmentOption,
                            ).investmentName,
                          };
                        },
                      );

                      return {
                        ...item,
                        platformName: InvestmentBondsBank?.[item.platformName],
                        portfolioValueArray,
                        owner:
                          personalDetails?.partner?.partnerPreferredName || "",
                      };
                    },
                  )
                : [],

            partnerSuperFund:
              allQuestions?.superAnnuationIssues?.partner.length > 0
                ? allQuestions?.superAnnuationIssues?.partner.map(
                    (item, index) => {
                      let portfolioValueArray =
                        item?.balanceBenefitDetails?.portfolioValueArray &&
                        item?.balanceBenefitDetails?.portfolioValueArray
                          .length > 0
                          ? item?.balanceBenefitDetails?.portfolioValueArray.map(
                              (element, i) => {
                                let investment =
                                  bankDetailObj.SuperannuationFunds.find(
                                    (elem) => elem._id === item.platformName,
                                  );

                                return {
                                  ...element,
                                  investmentOption:
                                    investment.arrayOfOffers.find(
                                      (elem) =>
                                        elem._id === element.investmentOption,
                                    ).investmentName,
                                };
                              },
                            )
                          : [];

                      return {
                        platformName:
                          SuperannuationFundsBank?.[item.platformName] || "",
                        memberName:
                          personalDetails?.partner?.partnerPreferredName || "",
                        memberNumber: item?.memberNumber || "",
                        fundType: item?.balanceBenefitDetails?.fundType || "",
                        commencementDate:
                          convertDateAUWithDayJS(
                            item?.balanceBenefitDetails?.commencementDate,
                          ) || "",
                        eligibleServiceDate:
                          convertDateAUWithDayJS(
                            item?.balanceBenefitDetails?.eligibleServiceDate,
                          ) || "",
                        portfolioValue:
                          item?.balanceBenefitDetails?.portfolioValue || "",
                        taxFreeComponent:
                          item?.balanceBenefitDetails?.taxFreeComponent || "",
                        taxableComponent:
                          item?.balanceBenefitDetails?.taxableComponent || "",
                        preservedAmount:
                          item?.balanceBenefitDetails?.preservedAmount || "",
                        restrictedNonPreserved:
                          item?.balanceBenefitDetails?.restrictedNonPreserved ||
                          "",
                        unrestrictedNonPreserved:
                          item?.balanceBenefitDetails
                            ?.unrestrictedNonPreserved || "",
                        portfolioValueArray: portfolioValueArray,
                        annualAdvice: item?.annualAdvice || "",
                        contributionsArrayNonConcessional:
                          item?.contributionsArray &&
                          item?.contributionsArray.length > 0
                            ? item?.contributionsArray
                                ?.map((e, i) => {
                                  return {
                                    year: item?.contributionsStartYear + i,
                                    nonConcessionalContributions:
                                      e.nonConcessionalContributions || "$0",
                                  };
                                })
                                .slice(-3)
                            : [],
                        contributionsArrayConcessional:
                          item?.contributionsArray &&
                          item?.contributionsArray.length > 0
                            ? item?.contributionsArray
                                ?.map((e, i) => {
                                  return {
                                    year: item?.contributionsStartYear + i,
                                    totalConcessional:
                                      e.totalConcessional || "$0",
                                  };
                                })
                                .slice(-5)
                            : [],
                        coverType: item?.groupInsuranceDetails?.coverType || "",
                        coverType2:
                          item?.groupInsuranceDetails?.coverType2 || "",
                        lifeCover: item?.groupInsuranceDetails?.lifeCover || "",
                        TPDCover: item?.groupInsuranceDetails?.TPDCover || "",
                        monthlyIncome:
                          item?.groupInsuranceDetails?.monthlyIncome || "",
                        waitingPeriod:
                          item?.groupInsuranceDetails?.waitingPeriod || "",
                        BenefitPeriod:
                          item?.groupInsuranceDetails?.BenefitPeriod || "",
                        TotalInsuranceCost: toCommaAndDollar(
                          parseMoney(
                            item?.groupInsuranceDetails?.lifeCover || "$0",
                          ) +
                            parseMoney(
                              item?.groupInsuranceDetails.TPDCover || "$0",
                            ) +
                            parseMoney(
                              item?.groupInsuranceDetails.monthlyIncome || "$0",
                            ),
                        ),
                        nominationType:
                          item?.nominatedBeneficiariesDetails?.nominationType ||
                          "",
                        nominatedBeneficiariesArray:
                          item?.nominatedBeneficiariesDetails
                            ?.nominatedBeneficiariesArray &&
                          item?.nominatedBeneficiariesDetails
                            ?.nominatedBeneficiariesArray.length > 0
                            ? item?.nominatedBeneficiariesDetails?.nominatedBeneficiariesArray.map(
                                (e, i) => {
                                  return {
                                    relationshipStatus:
                                      e.relationshipStatus || "",
                                    shareBenefit: e.shareBenefit || "0.00%",
                                  };
                                },
                              )
                            : [],
                      };
                    },
                  )
                : [],

            partnerAccountBasedPensions:
              allQuestions?.accountBasedPensionIssues?.partner.length > 0
                ? allQuestions?.accountBasedPensionIssues?.partner.map(
                    (item, index) => {
                      let portfolioValueArray =
                        item?.balanceBenefitDetails?.portfolioValueArray &&
                        item?.balanceBenefitDetails?.portfolioValueArray
                          .length > 0
                          ? item?.balanceBenefitDetails?.portfolioValueArray.map(
                              (element, i) => {
                                let investment =
                                  bankDetailObj.AccountBasedPensions.find(
                                    (elem) => elem._id === item.platformName,
                                  );

                                return {
                                  ...element,
                                  investmentOption:
                                    investment.arrayOfOffers.find(
                                      (elem) =>
                                        elem._id === element.investmentOption,
                                    ).investmentName,
                                };
                              },
                            )
                          : [];

                      return {
                        platformName:
                          AccountBasedPensionsBank?.[item.platformName] || "",
                        memberName:
                          personalDetails?.partner?.partnerPreferredName || "",
                        memberNumber: item?.memberNumber || "",
                        fundType: item?.balanceBenefitDetails?.fundType || "",
                        commencementDate:
                          convertDateAUWithDayJS(
                            item?.balanceBenefitDetails?.commencementDate,
                          ) || "",
                        eligibleServiceDate:
                          convertDateAUWithDayJS(
                            item?.balanceBenefitDetails?.eligibleServiceDate,
                          ) || "",
                        portfolioValue:
                          item?.balanceBenefitDetails?.portfolioValue || "",
                        taxFreeComponent:
                          item?.balanceBenefitDetails?.taxFreeComponent || "",
                        taxableComponent:
                          item?.balanceBenefitDetails?.taxableComponent || "",
                        restrictedNonPreserved:
                          item?.balanceBenefitDetails?.restrictedNonPreserved ||
                          "",
                        unrestrictedNonPreserved:
                          item?.balanceBenefitDetails
                            ?.unrestrictedNonPreserved || "",
                        preservedAmount:
                          item?.balanceBenefitDetails?.preservedAmount || "",
                        purchasePrice:
                          item?.balanceBenefitDetails?.purchasePrice || "",
                        pensionPayment: item?.pensionPayment || "",
                        annualAdvice: item?.annualAdvice || "",
                        portfolioValueArray: portfolioValueArray,

                        nominationType:
                          item?.nominatedBeneficiariesDetails?.nominationType ||
                          "",
                        nominatedBeneficiariesArray:
                          item?.nominatedBeneficiariesDetails
                            ?.nominatedBeneficiariesArray &&
                          item?.nominatedBeneficiariesDetails
                            ?.nominatedBeneficiariesArray.length > 0
                            ? item?.nominatedBeneficiariesDetails?.nominatedBeneficiariesArray.map(
                                (e, i) => {
                                  return {
                                    relationshipStatus:
                                      e.relationshipStatus || "",
                                    shareBenefit: e.shareBenefit || "0.00%",
                                  };
                                },
                              )
                            : [],
                      };
                    },
                  )
                : [],

            partnerAnnuties:
              allQuestions?.annuitiesIssues?.partner.length > 0
                ? allQuestions?.annuitiesIssues?.partner.map((item, index) => {
                    return {
                      platformName: AnnuitiesBank?.[item.platformName] || "",
                      memberName:
                        personalDetails?.partner?.partnerPreferredName || "",
                      accountNumber: item?.accountNumber || "",
                      sourceFunds: item?.sourceFunds || "",
                      annuityType: item?.annuityType || "",
                      term: item?.term || "",
                      yearsMaturity: item?.yearsMaturity || "",
                      originalInvestmentAmount:
                        item?.originalInvestmentAmount || "",
                      returnCapitalValue: item?.returnCapitalValue || "",
                      annualAnnuityPayment: item?.annualAnnuityPayment || "",
                      annualAdvice: item?.annualAdvice || "",
                      nominationType:
                        item?.nominatedBeneficiariesDetails?.nominationType ||
                        "",
                      nominatedBeneficiariesArray:
                        item?.nominatedBeneficiariesDetails
                          ?.nominatedBeneficiariesArray &&
                        item?.nominatedBeneficiariesDetails
                          ?.nominatedBeneficiariesArray.length > 0
                          ? item?.nominatedBeneficiariesDetails?.nominatedBeneficiariesArray.map(
                              (e, i) => {
                                return {
                                  relationshipStatus:
                                    e.relationshipStatus || "",
                                  shareBenefit: e.shareBenefit || "0.00%",
                                };
                              },
                            )
                          : [],
                    };
                  })
                : [],
          }
        : {
            partnerAccumulationBalanceCurrentBalance: "",
            partnerAccumulationBalanceEligibleServiceDate: "",
            partnerAccumulationBalanceCommencementDate: "",
            partnerAccumulationBalanceTaxfreeComponent: "",
            partnerAccumulationBalanceTaxableComponent: "",
            partnerAccumulationBalanceRestrictedNonPreserved: "",
            partnerAccumulationBalanceUnrestrictedNonPreserved: "",
            partnerAccumulationBalancePreservedAmount: "",

            partnerBankAccounts: [],
            partnerTermDeposits: [],
            partnerAustralianShare: [],

            // Partner Data
            partnerTitle: "",
            partnerFirstName: "",
            partnerMiddleName: "",
            partnerLastName: "",
            partnerPreferred: "",
            partnerGender: "",
            partnerDob: "",
            partnerAge: "",
            partnerMarital: "",
            partnerEmployment: "",
            partnerRetAge: "",
            partnerHealth: "",
            partnerSmoker: "",
            partnerTaxRes: "",
            partnerHealthCover: "",
            partnerHelpDebt: "",

            // Contact Details
            partnerHomeAddress: "",
            partnerPostalAddress: "",
            partnerMobile: "",
            partnerHomePhone: "",
            partnerWorkPhone: "",
            partnerEmail: "",

            // Employment Details
            partnerOccupation: "",
            partnerEmploymentStatus: "",
            partnerNameOfCompany: "",
            partnerStartDate: "",
            partnerHoursWorked: "",
            partnerGrossSalary: "",
            partnerSGC: "",
            partnerSalarySacrificeContributions: "",
            partnerAfterTaxContributions: "",
            partnerChoiceOfFund: "",

            // Salary Packaging Details
            partnerEmployerFBTStatus: "",
            partnerCreditCardMortgageRepayments: "",
            partnerCostBaseOfCar: "",
            partnerFBTPaidByEmployer: "",
            partnerRunningCostsOfCar: "",

            // Leave Entitlements
            partnerAnnual: "",
            partnerSick: "",
            partnerLongService: "",

            // Centrelink Details
            partnerCRN: "",
            partnerPaymentType: "",
            partnerFortnightlyPayment: "",
            partnerAnnualPaymentAmount: "",
            partnerCentrelinkCardsHeld: "",

            //Will
            partnerWill: "",
            partnerWillYearSetUp: "",
            partnerWillsCurrent: "",
            partnerExecutorItems: [],

            partnerEnduringGuardianship: "",

            partnerEstatePlanningRadio: "",
            partnerdescription: "",

            // we might need it
            // "partnerTestamentaryTrust": "",
            // "partnerEstatePlanningRadio": "",

            //POA
            partnerPOAType: "",
            partnerPOAYearSetUp: "",
            partnerPOANameItems: [],

            // ProFessional Adviser
            partnerProfessionalAdviseritems: [],

            partnerEmploymentIncome: "$0",
            partnerNetBusinessIncome: "$0",
            partnerSuperPensionPayment: "$0",
            partnerLifeTimePensionPayment: "$0",
            partnerOverseasPensionPayment: "$0",
            partnerCenterlinkPension: "$0",
            partnerRentalIncome: "$0",
            partnerInterest: "$0",
            partnerDividendIncome: "$0",
            partnerAnnutiesIncome: "$0",

            // Summary Of NetWorth
            partnerCarCurrentValue: "$0",
            partnerContentsCurrentValue: "$0",
            partnerBoatCurrentValue: "$0",
            partnerCaravanCurrentValue: "$0",
            partnerOtherAssetsCurrentValue: "$0",

            //investment Assets
            partnerBankAccountCurrentBalance: "$0",
            partnerTermDepositsCurrentBalance: "$0",
            partnerAustralianSharesCurrentBalance: "$0",
            partnerPlatformInvestmentsCurrentBalance: "$0",
            partnerInvestmentBondsCurrentBalance: "$0",

            partnerSuperannuationCurrentBalance: "$0",
            partnerAccountBasedPensionsCurrentBalance: "$0",
            partnerAnnuitiesCurrentBalance: "$0",

            ...Array.from({ length: 10 }, (_, i) => [
              `partnerInvestmentPropertyCurrentBalance${i + 1}`,
              "$0",
            ]),

            partnerTradingCompanyCurrentBalance: "$0",
            partnerBusinessTrustCurrentBalance: "$0",

            ...Object.fromEntries(
              Array.from({ length: 10 }, (_, i) => [
                `partnerInvestmentPropertyLoanBalance${i + 1}`,
                "$0",
              ]),
            ),

            partnerInvestmentLoanBalanvce: "$0",
            partnerMarginLoanBalance: "$0",
            partnerPlatFromInvestment: [],
            partnerInvestmentBond: [],
            partnerSuperFund: [],
            partnerAccountBasedPensions: [],
            partnerAnnuties: [],
          }),

      // //joint
      ...(!["Single", "Widowed", ""].includes(
        personalDetails?.client?.clientMaritalStatus || "",
      )
        ? {
            jointBankAccounts:
              allQuestions?.bankAccountFinance?.joint.length > 0
                ? allQuestions?.bankAccountFinance?.joint.map((item, index) => {
                    return {
                      ...item,
                      Institution: Banks?.[item.Institution],
                    };
                  })
                : [],

            jointTermDeposits:
              allQuestions?.termDepositsFinance?.joint.length > 0
                ? allQuestions?.termDepositsFinance?.joint.map(
                    (item, index) => {
                      return {
                        ...item,
                        Institution: Banks?.[item.Institution],
                      };
                    },
                  )
                : [],

            jointAustralianShare:
              allQuestions?.australianShareMarket?.joint || [],

            jointPlatFromInvestment:
              allQuestions?.managedFund?.joint.length > 0
                ? allQuestions?.managedFund?.joint.map((item, index) => {
                    let portfolioValueArray = item.portfolioValueArray.map(
                      (element, i) => {
                        let investment = bankDetailObj.InvestmentPlatforms.find(
                          (elem) => elem._id === item.platformName,
                        );

                        return {
                          ...element,
                          investmentOption: investment.arrayOfOffers.find(
                            (elem) => elem._id === element.investmentOption,
                          ).investmentName,
                        };
                      },
                    );

                    return {
                      ...item,
                      platformName: platformBank?.[item.platformName],
                      portfolioValueArray,
                    };
                  })
                : [],

            jointInvestmentBond:
              allQuestions?.investmentBondFinance?.joint.length > 0
                ? allQuestions?.investmentBondFinance?.joint.map(
                    (item, index) => {
                      let portfolioValueArray = item.portfolioValueArray.map(
                        (element, i) => {
                          let investment = bankDetailObj.InvestmentBonds.find(
                            (elem) => elem._id === item.platformName,
                          );

                          return {
                            ...element,
                            investmentOption: investment.arrayOfOffers.find(
                              (elem) => elem._id === element.investmentOption,
                            ).investmentName,
                          };
                        },
                      );

                      return {
                        ...item,
                        platformName: InvestmentBondsBank?.[item.platformName],
                        portfolioValueArray,
                      };
                    },
                  )
                : [],

            jointCarCurrentValue:
              allQuestions?.car?.joint?.currentValue || "$0",
            jointContentsCurrentValue:
              allQuestions?.houseHold?.joint?.currentValue || "$0",
            jointBoatCurrentValue:
              allQuestions?.houseHold?.joint?.currentValue || "$0",
            jointCaravanCurrentValue:
              allQuestions?.caravan?.joint?.currentValue || "$0",
            jointOtherAssetsCurrentValue:
              allQuestions?.otherAssets?.joint?.currentValue || "$0",

            //investment Assets
            jointBankAccountCurrentBalance:
              allQuestions?.bankAccountFinance?.jointCurrentBalance || "$0",
            jointTermDepositsCurrentBalance:
              allQuestions?.termDepositsFinance?.jointCurrentBalance || "$0",
            jointAustralianSharesCurrentBalance:
              allQuestions?.australianShareMarket?.jointCurrentBalance || "$0",
            jointPlatformInvestmentsCurrentBalance:
              allQuestions?.managedFund?.jointCurrentBalance || "$0",
            jointInvestmentBondsCurrentBalance:
              allQuestions?.investmentBondFinance?.jointCurrentBalance || "$0",

            jointSuperannuationCurrentBalance:
              allQuestions?.superAnnuationIssues?.jointCurrentBalance || "$0",
            jointAccountBasedPensionsCurrentBalance:
              allQuestions?.accountBasedPensionIssues?.jointCurrentBalance ||
              "$0",
            jointAnnuitiesCurrentBalance:
              allQuestions?.annuitiesIssues?.jointCurrentBalance || "$0",

            ...Object.fromEntries(
              Array.from({ length: 10 }, (_, i) => [
                `jointInvestmentPropertyCurrentBalance${i + 1}`,
                allQuestions?.investmentPropertyDetails?.client?.[i]
                  ?.clientOwnership != "100.00%" &&
                allQuestions?.investmentPropertyDetails?.client?.[i]
                  ?.partnerOwnership != "100.00%"
                  ? allQuestions?.investmentPropertyDetails?.client?.[i]
                      ?.CurrentValue || "$0"
                  : "$0",
              ]),
            ),

            jointTradingCompanyCurrentBalance:
              allQuestions?.BusinessAsCompanyStructure?.jointCurrentBalance ||
              "$0",
            jointBusinessTrustCurrentBalance:
              allQuestions?.BusinessAsTrusts?.jointCurrentBalance || "$0",

            jointLiabilityCreditCards:
              allQuestions?.creditCards?.clientTotal || "$0",
            jointPersonalLoans:
              allQuestions?.personalLoans?.clientTotal || "$0",

            ...Object.fromEntries(
              Array.from({ length: 10 }, (_, i) => [
                `jointInvestmentPropertyLoanBalance${i + 1}`,
                allQuestions?.investmentPropertyDetails?.client?.[i]
                  ?.clientOwnership != "100.00%" &&
                allQuestions?.investmentPropertyDetails?.client?.[i]
                  ?.partnerOwnership != "100.00%"
                  ? allQuestions?.investmentPropertyDetails?.client?.[i]
                      ?.propertyLoanDetails || "$0"
                  : "$0",
              ]),
            ),

            jointInvestmentLoanBalanvce:
              allQuestions?.managedFundsLOC?.joint?.loanBalance || "$0",
            jointMarginLoanBalance:
              allQuestions?.managedFundsMarginLoan?.joint?.loanBalance || "$0",
          }
        : {
            jointBankAccounts: [],
            jointTermDeposits: [],
            jointAustralianShare: [],
            jointPlatFromInvestment: [],
            jointInvestmentBond: [],

            jointCarCurrentValue: "$0",
            jointContentsCurrentValue: "$0",
            jointBoatCurrentValue: "$0",
            jointCaravanCurrentValue: "$0",
            jointOtherAssetsCurrentValue: "$0",

            //investment Assets
            jointBankAccountCurrentBalance: "$0",
            jointTermDepositsCurrentBalance: "$0",
            jointAustralianSharesCurrentBalance: "$0",
            jointPlatformInvestmentsCurrentBalance: "$0",
            jointInvestmentBondsCurrentBalance: "$0",

            jointSuperannuationCurrentBalance: "$0",
            jointAccountBasedPensionsCurrentBalance: "$0",
            jointAnnuitiesCurrentBalance: "$0",

            ...Object.fromEntries(
              Array.from({ length: 10 }, (_, i) => [
                `jointInvestmentPropertyCurrentBalance${i + 1}`,
                "$0",
              ]),
            ),

            jointTradingCompanyCurrentBalance: "$0",
            jointBusinessTrustCurrentBalance: "$0",

            jointLiabilityCreditCards: "$0",
            jointPersonalLoans: "$0",
          }),

      TotalLivingExpenses:
        allQuestions?.generalLivingExpenses?.generalLivingExpensesTotal || "",

      ...expenseTypes
        .map((expense, index) => {
          const id = expense.id;

          const amount = allQuestions?.generalLivingExpenses?.[id] || "0";

          const frequency =
            allQuestions?.generalLivingExpenses?.[`${id}Type`] || "";

          const numericAmount =
            parseFloat(amount.replace(/[^0-9.-]+/g, "")) || 0;

          const total = numericAmount * parseFloat(frequency) || 0;

          let FrequencyText =
            [
              { value: 52, label: "Weekly" },
              { value: 26, label: "Fortnightly" },
              { value: 12, label: "Monthly" },
              { value: 4, label: "Quarterly" },
              { value: 2, label: "Half Yearly" },
              { value: 1, label: "Annually" },
            ].find((freq) => freq.value.toString() === frequency)?.label || "";

          return {
            [`houseHoldAmount${index + 1}`]: amount,
            [`houseHoldFrequency${index + 1}`]: FrequencyText,
            [`houseHoldTotal${index + 1}`]: toCommaAndDollar(total),
          };
        })
        .reduce((acc, obj) => ({ ...acc, ...obj }), {}),

      ...personalExpenses
        .map((expense, index) => {
          const id = expense.id;

          const amount = allQuestions?.generalLivingExpenses?.[id] || "0";

          const frequency =
            allQuestions?.generalLivingExpenses?.[`${id}Type`] || "";

          const numericAmount =
            parseFloat(amount.replace(/[^0-9.-]+/g, "")) || 0;

          const total = numericAmount * parseFloat(frequency) || 0;

          let FrequencyText =
            [
              { value: 52, label: "Weekly" },
              { value: 26, label: "Fortnightly" },
              { value: 12, label: "Monthly" },
              { value: 4, label: "Quarterly" },
              { value: 2, label: "Half Yearly" },
              { value: 1, label: "Annually" },
            ].find((freq) => freq.value.toString() === frequency)?.label || "";

          return {
            [`lifeStyleAmount${index + 1}`]: amount,
            [`lifeStyleFrequency${index + 1}`]: FrequencyText,
            [`lifeStyleTotal${index + 1}`]: toCommaAndDollar(total),
          };
        })
        .reduce((acc, obj) => ({ ...acc, ...obj }), {}),

      ...transportExpenses
        .map((expense, index) => {
          const id = expense.id;

          const amount = allQuestions?.generalLivingExpenses?.[id] || "0";

          const frequency =
            allQuestions?.generalLivingExpenses?.[`${id}Type`] || "";

          const numericAmount =
            parseFloat(amount.replace(/[^0-9.-]+/g, "")) || 0;

          const total = numericAmount * parseFloat(frequency) || 0;

          let FrequencyText =
            [
              { value: 52, label: "Weekly" },
              { value: 26, label: "Fortnightly" },
              { value: 12, label: "Monthly" },
              { value: 4, label: "Quarterly" },
              { value: 2, label: "Half Yearly" },
              { value: 1, label: "Annually" },
            ].find((freq) => freq.value.toString() === frequency)?.label || "";

          return {
            [`transportAmount${index + 1}`]: amount,
            [`transportFrequency${index + 1}`]: FrequencyText,
            [`transportTotal${index + 1}`]: toCommaAndDollar(total),
          };
        })
        .reduce((acc, obj) => ({ ...acc, ...obj }), {}),

      ...insuranceExpenses
        .map((expense, index) => {
          const id = expense.id;

          const amount = allQuestions?.generalLivingExpenses?.[id] || "0";

          const frequency =
            allQuestions?.generalLivingExpenses?.[`${id}Type`] || "";

          const numericAmount =
            parseFloat(amount.replace(/[^0-9.-]+/g, "")) || 0;

          const total = numericAmount * parseFloat(frequency) || 0;

          let FrequencyText =
            [
              { value: 52, label: "Weekly" },
              { value: 26, label: "Fortnightly" },
              { value: 12, label: "Monthly" },
              { value: 4, label: "Quarterly" },
              { value: 2, label: "Half Yearly" },
              { value: 1, label: "Annually" },
            ].find((freq) => freq.value.toString() === frequency)?.label || "";

          return {
            [`InsuranceAmount${index + 1}`]: amount,
            [`InsuranceFrequency${index + 1}`]: FrequencyText,
            [`InsuranceTotal${index + 1}`]: toCommaAndDollar(total),
          };
        })
        .reduce((acc, obj) => ({ ...acc, ...obj }), {}),

      motorVahicleYear:
        GQState?.carGoal == "Yes" ? goalsAndObjective?.carGoal?.when || "" : "",
      motorVahicleAmount:
        GQState?.carGoal == "Yes"
          ? goalsAndObjective?.carGoal?.estimatedValue || ""
          : "",
      boatYear:
        GQState?.boatGoal == "Yes"
          ? goalsAndObjective?.boatGoal?.when || ""
          : "",
      boatAmount:
        GQState?.boatGoal == "Yes"
          ? goalsAndObjective?.boatGoal?.estimatedValue || ""
          : "",
      caravanYear:
        GQState?.caravanGoal == "Yes"
          ? goalsAndObjective?.caravanGoal?.when || ""
          : "",
      caravanAmount:
        GQState?.caravanGoal == "Yes"
          ? goalsAndObjective?.caravanGoal?.estimatedValue || ""
          : "",
      otherYear:
        GQState?.familyLifeStyleGoal == "Yes"
          ? goalsAndObjective?.familyLifeStyleGoal?.when || ""
          : "",
      otherAmount:
        GQState?.familyLifeStyleGoal == "Yes"
          ? goalsAndObjective?.familyLifeStyleGoal?.estimatedValue || ""
          : "",
      homeRenovationsYear:
        GQState?.renovateFamilyHomeGoal == "Yes"
          ? goalsAndObjective?.renovateFamilyHomeGoal?.when || ""
          : "",
      homeRenovationsAmount:
        GQState?.renovateFamilyHomeGoal == "Yes"
          ? goalsAndObjective?.renovateFamilyHomeGoal?.estimatedValue || ""
          : "",
      holidayYear:
        GQState?.holidayGoal == "Yes"
          ? goalsAndObjective?.holidayGoal?.when || ""
          : "",
      holidayAmount:
        GQState?.holidayGoal == "Yes"
          ? goalsAndObjective?.holidayGoal?.estimatedValue || ""
          : "",

      //SMSF
      SMSFfundName: allQuestions?.SMSFDetails?.SMSFOwner?.fundName || "",
      SMSFABN: allQuestions?.SMSFDetails?.SMSFOwner?.ABN || "",
      SMSFRegisterOffice:
        allQuestions?.SMSFDetails?.SMSFOwner?.registeredOffice || "",
      SMSFBusinessPlace:
        allQuestions?.SMSFDetails?.SMSFOwner?.placeOfBusiness || "",
      SMSFEstablishmentdate: allQuestions?.SMSFDetails?.SMSFOwner
        ?.establishmentDate
        ? convertDateAUWithDayJS(
            allQuestions?.SMSFDetails?.SMSFOwner?.establishmentDate,
          )
        : "",
      SMSFTrusteeType: allQuestions?.SMSFDetails?.SMSFOwner?.trusteeType || "",
      SMSFTrusteeName: allQuestions?.SMSFDetails?.SMSFOwner?.trusteeName || "",
      SMSFACN: allQuestions?.SMSFDetails?.SMSFOwner?.ACN || "",
      isSMSFTrusteeTypeIsCorporateTrustee:
        allQuestions?.SMSFDetails?.SMSFOwner?.trusteeType !== "Corporate",
      directorNamesList:
        allQuestions?.SMSFDetails?.SMSFOwner?.directorsOfCorporateTrustee || [],
      isBareTrustYes: allQuestions?.SMSFDetails?.SMSFOwner?.bareTrust == "Yes",
      SMSFbareTrusteeName:
        allQuestions?.SMSFDetails?.SMSFOwner?.directorsOfBareTrust
          ?.bareTrusteeName || "",
      SMSFCAN:
        allQuestions?.SMSFDetails?.SMSFOwner?.directorsOfBareTrust?.ACN || "",

      SMSFdirectorNameArray:
        allQuestions?.SMSFDetails?.SMSFOwner?.directorsOfBareTrust?.directorNameArray.map(
          (item, index) => {
            return {
              SMSFBareTrustName: item,
            };
          },
        ) || [],

      SMSFNameOfAccountant:
        allQuestions?.SMSFDetails?.SMSFOwner?.nameOfAccountant || "",

      SMSFPensionDetailsPensionType:
        allQuestions?.SMSFPensionPhase?.SMSFOwner?.nameOfAccountant || "",
      SMSFPensionDetailsAccountBalance:
        allQuestions?.SMSFPensionPhase?.SMSFOwner?.nameOfAccountant || "",
      SMSFPensionDetailsCommencementDate:
        allQuestions?.SMSFPensionPhase?.SMSFOwner?.nameOfAccountant || "",
      SMSFPensionDetailsEligibleServiceDate:
        allQuestions?.SMSFPensionPhase?.SMSFOwner?.nameOfAccountant || "",
      SMSFPensionDetailsPurchasePrice:
        allQuestions?.SMSFPensionPhase?.SMSFOwner?.nameOfAccountant || "",
      SMSFPensionDetailsTaxFreeComponent:
        allQuestions?.SMSFPensionPhase?.SMSFOwner?.nameOfAccountant || "",
      SMSFPensionDetailsTaxableComponent:
        allQuestions?.SMSFPensionPhase?.SMSFOwner?.nameOfAccountant || "",
      SMSFPensionDetailsUnrestrictedNonPreserved:
        allQuestions?.SMSFPensionPhase?.SMSFOwner?.nameOfAccountant || "",
      SMSFPensionDetailsRestrictedNonPreserved:
        allQuestions?.SMSFPensionPhase?.SMSFOwner?.nameOfAccountant || "",
      SMSFPensionDetailsPreservedAmount:
        allQuestions?.SMSFPensionPhase?.SMSFOwner?.nameOfAccountant || "",
      SMSFPensionDetailsAnnualPensionPayment:
        allQuestions?.SMSFPensionPhase?.SMSFOwner?.nameOfAccountant || "",

      SMSFBankCurrentBalance:
        allQuestions?.SMSFBank?.SMSFCurrentBalance || "$0",
      SMSFTermCurrentBalance:
        allQuestions?.SMSFTermDeposits?.SMSFCurrentBalance || "$0",
      SMSFAustralianCurrentBalance:
        allQuestions?.SMSFAustralianShares?.SMSFCurrentBalance || "$0",
      SMSFPlatfromCurrentBalance:
        allQuestions?.SMSFManagedFunds?.SMSFCurrentBalance || "$0",
      SMSFOtherCurrentBalance:
        allQuestions?.SMSFOtherInvestment?.clientTotal || "$0",

      ...Object.fromEntries(
        Array.from({ length: 5 }, (_, i) => [
          `SMSFInvestmentCurrentBalance${i + 1}`,
          allQuestions?.SMSFInvestmentProperties.SMSF?.[i]?.CurrentValue ||
            "$0",
        ]),
      ),

      ...Object.fromEntries(
        Array.from({ length: 5 }, (_, i) => [
          `SMSFInvestmentpropertyloan${i + 1}`,
          allQuestions?.SMSFInvestmentProperties.SMSF?.[i]
            ?.propertyLoanDetailsArray?.[0]?.LoanBalance || "$0",
        ]),
      ),

      SMSFInvestmentloan: allQuestions?.SMSFInvestmentLoan?.SMSFTotal || "$0",

      SMSFBankAccounts:
        allQuestions?.SMSFBank?.SMSF.length > 0
          ? allQuestions?.SMSFBank?.SMSF.map((item, index) => {
              return {
                ...item,
                Institution: Banks?.[item.Institution],
              };
            })
          : [],

      SMSFTermDeposits:
        allQuestions?.SMSFTermDeposits?.SMSF.length > 0
          ? allQuestions?.SMSFTermDeposits?.SMSF.map((item, index) => {
              return {
                ...item,
                Institution: Banks?.[item.Institution],
              };
            })
          : [],

      SMSFAustralianShare:
        allQuestions?.SMSFAustralianShares?.SMSF.length > 0
          ? allQuestions?.SMSFAustralianShares?.SMSF
          : [],

      //Family Trust
      FamilyTrustTrustName:
        allQuestions?.familyDetails?.familyTrustOwner?.trustName || "",
      FamilyTrustABN: allQuestions?.familyDetails?.familyTrustOwner?.ABN || "",
      FamilyTrustRegisteredOffice:
        allQuestions?.familyDetails?.familyTrustOwner?.registeredOffice || "",
      FamilyTrustPlaceOfBusiness:
        allQuestions?.familyDetails?.familyTrustOwner?.placeOfBusiness || "",
      FamilyTrustEstablishmentDate:
        allQuestions?.familyDetails?.familyTrustOwner?.establishmentDate || "",
      FamilyTrustTrusteeType:
        allQuestions?.familyDetails?.familyTrustOwner?.trusteeType || "",
      FamilyTrustDirectorNamesList:
        allQuestions?.familyDetails?.familyTrustOwner
          ?.directorsOfCorporateTrustee || [],
      FamilyTrustACN: allQuestions?.familyDetails?.familyTrustOwner?.ACN || "",
      FamilyTrustTrusteeName:
        allQuestions?.familyDetails?.familyTrustOwner?.trusteeName || "",

      isFamilyTrustTrusteeTypeCorporate:
        allQuestions?.familyDetails?.familyTrustOwner?.trusteeType ==
        "Corporate",
      FamilyTrustNameOfAccountant:
        allQuestions?.familyDetails?.familyTrustOwner?.nameOfAccountant || "",

      FamilyTrustBankCurrentBalance:
        allQuestions?.familyBank?.trustCurrentBalance || "",
      FamilyTrustTermCurrentBalance:
        allQuestions?.familyTermDeposit?.trustCurrentBalance || "",
      FamilyTrustAustralianCurrentBalance:
        allQuestions?.familyAustralianShare?.trustCurrentBalance || "",
      FamilyTrustPlatfromCurrentBalance:
        allQuestions?.familyMangedFunds?.trustCurrentBalance || "",
      FamilyTrustOtherCurrentBalance:
        allQuestions?.familyOtherInvestment?.clientTotal || "",

      FamilyTrustInvestmentCurrentBalance:
        allQuestions?.familyDetails?.clientTotal || "",

      ...Object.fromEntries(
        Array.from({ length: 5 }, (_, i) => [
          `FamilyTrustInvestmentCurrentBalance${i + 1}`,
          allQuestions?.familyInvestmentProperties.trust?.[i]?.CurrentValue ||
            "$0",
        ]),
      ),

      ...Object.fromEntries(
        Array.from({ length: 5 }, (_, i) => [
          `FamilyTrustInvestmentpropertyloan${i + 1}`,
          allQuestions?.familyInvestmentProperties.trust?.[i]
            ?.propertyLoanDetailsArray?.[0]?.LoanBalance || "$0",
        ]),
      ),

      FamilyTrustInvestmentloan:
        allQuestions?.familyInvestmentHomeLoan?.trust?.loanBalance || "",

      FamilyTrustBankAccounts:
        allQuestions?.familyBank?.trust.length > 0
          ? allQuestions?.familyBank?.trust.map((item, index) => {
              return {
                ...item,
                Institution: Banks?.[item.Institution],
              };
            })
          : [],

      FamilyTrustTermDeposits:
        allQuestions?.familyTermDeposit?.trust.length > 0
          ? allQuestions?.familyTermDeposit?.trust.map((item, index) => {
              return {
                ...item,
                Institution: Banks?.[item.Institution],
              };
            })
          : [],

      FamilyTrustAustralianShare:
        allQuestions?.familyAustralianShare?.trust.length > 0
          ? allQuestions?.familyAustralianShare?.trust
          : [],

      ...buildPoliciesObject(
        allQuestions?.personalInsurance?.client?.PersonalInsurance,
        allQuestions?.personalInsurance?.client?.PersonalInsurance.length,
      ),
    };

    const sumByPrefix = (prefix) => {
      return Object.keys(payload)
        .filter((key) => key.startsWith(prefix))
        .reduce((total, key) => {
          const value = parseMoney(payload[key]) || 0;
          return total + value;
        }, 0);
    };

    payload.houseHoldTotal = toCommaAndDollar(sumByPrefix("houseHoldTotal"));
    payload.lifeStyleTotal = toCommaAndDollar(sumByPrefix("lifeStyleTotal"));
    payload.transportTotal = toCommaAndDollar(sumByPrefix("transportTotal"));
    payload.InsuranceTotal = toCommaAndDollar(sumByPrefix("InsuranceTotal"));

    //Summary of NetWorth Total
    payload.clientLifestyleTotal = toCommaAndDollar(
      parseMoney(payload?.clientCarCurrentValue || "$0") +
        parseMoney(payload?.clientContentsCurrentValue || "$0") +
        parseMoney(payload?.clientBoatCurrentValue || "$0") +
        parseMoney(payload?.clientCaravanCurrentValue || "$0") +
        parseMoney(payload?.clientOtherAssetsCurrentValue || "$0"),
    );

    payload.partnerLifestyleTotal = !["Single", "Widowed", ""].includes(
      personalDetails?.client?.clientMaritalStatus || "",
    )
      ? toCommaAndDollar(
          parseMoney(payload?.partnerCarCurrentValue || "$0") +
            parseMoney(payload?.partnerContentsCurrentValue || "$0") +
            parseMoney(payload?.partnerBoatCurrentValue || "$0") +
            parseMoney(payload?.partnerCaravanCurrentValue || "$0") +
            parseMoney(payload?.partnerOtherAssetsCurrentValue || "$0"),
        )
      : "$0";

    payload.jointLifestyleTotal = !["Single", "Widowed", ""].includes(
      personalDetails?.client?.clientMaritalStatus || "",
    )
      ? toCommaAndDollar(
          parseMoney(payload?.jointCarCurrentValue || "$0") +
            parseMoney(payload?.jointContentsCurrentValue || "$0") +
            parseMoney(payload?.jointBoatCurrentValue || "$0") +
            parseMoney(payload?.jointCaravanCurrentValue || "$0") +
            parseMoney(payload?.jointOtherAssetsCurrentValue || "$0"),
        )
      : "$0";

    payload.clientInvestmentAssetsTotal = toCommaAndDollar(
      parseMoney(payload?.clientBankAccountCurrentBalance || "$0") +
        parseMoney(payload?.clientTermDepositsCurrentBalance || "$0") +
        parseMoney(payload?.clientAustralianSharesCurrentBalance || "$0") +
        parseMoney(payload?.clientPlatformInvestmentsCurrentBalance || "$0") +
        parseMoney(payload?.clientInvestmentBondsCurrentBalance || "$0") +
        parseMoney(payload?.clientSuperannuationCurrentBalance || "$0") +
        parseMoney(payload?.clientAccountBasedPensionsCurrentBalance || "$0") +
        parseMoney(payload?.clientAnnuitiesCurrentBalance || "$0") +
        parseMoney(payload?.clientInvestmentPropertyCurrentBalance1 || "$0") +
        parseMoney(payload?.clientInvestmentPropertyCurrentBalance2 || "$0") +
        parseMoney(payload?.clientInvestmentPropertyCurrentBalance3 || "$0") +
        parseMoney(payload?.clientInvestmentPropertyCurrentBalance4 || "$0") +
        parseMoney(payload?.clientInvestmentPropertyCurrentBalance5 || "$0") +
        parseMoney(payload?.clientInvestmentPropertyCurrentBalance6 || "$0") +
        parseMoney(payload?.clientInvestmentPropertyCurrentBalance7 || "$0") +
        parseMoney(payload?.clientInvestmentPropertyCurrentBalance8 || "$0") +
        parseMoney(payload?.clientInvestmentPropertyCurrentBalance9 || "$0") +
        parseMoney(payload?.clientInvestmentPropertyCurrentBalance10 || "$0"),
    );

    payload.partnerInvestmentAssetsTotal = !["Single", "Widowed", ""].includes(
      personalDetails?.client?.clientMaritalStatus || "",
    )
      ? toCommaAndDollar(
          parseMoney(payload?.partnerBankAccountCurrentBalance || "$0") +
            parseMoney(payload?.partnerTermDepositsCurrentBalance || "$0") +
            parseMoney(payload?.partnerAustralianSharesCurrentBalance || "$0") +
            parseMoney(
              payload?.partnerPlatformInvestmentsCurrentBalance || "$0",
            ) +
            parseMoney(payload?.partnerInvestmentBondsCurrentBalance || "$0") +
            parseMoney(payload?.partnerSuperannuationCurrentBalance || "$0") +
            parseMoney(
              payload?.partnerAccountBasedPensionsCurrentBalance || "$0",
            ) +
            parseMoney(payload?.partnerAnnuitiesCurrentBalance || "$0") +
            parseMoney(
              payload?.partnerInvestmentPropertyCurrentBalance1 || "$0",
            ) +
            parseMoney(
              payload?.partnerInvestmentPropertyCurrentBalance2 || "$0",
            ) +
            parseMoney(
              payload?.partnerInvestmentPropertyCurrentBalance3 || "$0",
            ) +
            parseMoney(
              payload?.partnerInvestmentPropertyCurrentBalance4 || "$0",
            ) +
            parseMoney(
              payload?.partnerInvestmentPropertyCurrentBalance5 || "$0",
            ) +
            parseMoney(
              payload?.partnerInvestmentPropertyCurrentBalance6 || "$0",
            ) +
            parseMoney(
              payload?.partnerInvestmentPropertyCurrentBalance7 || "$0",
            ) +
            parseMoney(
              payload?.partnerInvestmentPropertyCurrentBalance8 || "$0",
            ) +
            parseMoney(
              payload?.partnerInvestmentPropertyCurrentBalance9 || "$0",
            ) +
            parseMoney(
              payload?.partnerInvestmentPropertyCurrentBalance10 || "$0",
            ),
        )
      : "$0";

    payload.jointInvestmentAssetsTotal = !["Single", "Widowed", ""].includes(
      personalDetails?.client?.clientMaritalStatus || "",
    )
      ? toCommaAndDollar(
          parseMoney(payload?.jointBankAccountCurrentBalance || "$0") +
            parseMoney(payload?.jointTermDepositsCurrentBalance || "$0") +
            parseMoney(payload?.jointAustralianSharesCurrentBalance || "$0") +
            parseMoney(
              payload?.jointPlatformInvestmentsCurrentBalance || "$0",
            ) +
            parseMoney(payload?.jointInvestmentBondsCurrentBalance || "$0") +
            parseMoney(payload?.jointSuperannuationCurrentBalance || "$0") +
            parseMoney(
              payload?.jointAccountBasedPensionsCurrentBalance || "$0",
            ) +
            parseMoney(payload?.jointAnnuitiesCurrentBalance || "$0") +
            parseMoney(
              payload?.jointInvestmentPropertyCurrentBalance1 || "$0",
            ) +
            parseMoney(
              payload?.jointInvestmentPropertyCurrentBalance2 || "$0",
            ) +
            parseMoney(
              payload?.jointInvestmentPropertyCurrentBalance3 || "$0",
            ) +
            parseMoney(
              payload?.jointInvestmentPropertyCurrentBalance4 || "$0",
            ) +
            parseMoney(
              payload?.jointInvestmentPropertyCurrentBalance5 || "$0",
            ) +
            parseMoney(
              payload?.jointInvestmentPropertyCurrentBalance6 || "$0",
            ) +
            parseMoney(
              payload?.jointInvestmentPropertyCurrentBalance7 || "$0",
            ) +
            parseMoney(
              payload?.jointInvestmentPropertyCurrentBalance8 || "$0",
            ) +
            parseMoney(
              payload?.jointInvestmentPropertyCurrentBalance9 || "$0",
            ) +
            parseMoney(
              payload?.jointInvestmentPropertyCurrentBalance10 || "$0",
            ),
        )
      : "$0";

    payload.clientBusinessAssetsCurrentBalance = toCommaAndDollar(
      parseMoney(payload?.clientTradingCompanyCurrentBalance || "$0") +
        parseMoney(payload?.clientBusinessTrustCurrentBalance || "$0") +
        parseMoney(payload?.clientSMSFCurrentBalance || "$0") +
        parseMoney(payload?.clientInvestmentTrustCurrentBalance || "$0"),
    );

    payload.partnerBusinessAssetsCurrentBalance = ![
      "Single",
      "Widowed",
      "",
    ].includes(personalDetails?.client?.clientMaritalStatus || "")
      ? toCommaAndDollar(
          parseMoney(payload?.partnerTradingCompanyCurrentBalance || "$0") +
            parseMoney(payload?.partnerBusinessTrustCurrentBalance || "$0"),
        )
      : "$0";

    payload.jointBusinessAssetsCurrentBalance = ![
      "Single",
      "Widowed",
      "",
    ].includes(personalDetails?.client?.clientMaritalStatus || "")
      ? toCommaAndDollar(
          parseMoney(payload?.jointTradingCompanyCurrentBalance || "$0") +
            parseMoney(payload?.jointBusinessTrustCurrentBalance || "$0"),
        )
      : "$0";

    payload.totalCombinedAssets = toCommaAndDollar(
      parseMoney(payload?.clientLifestyleTotal || "$0") +
        parseMoney(payload?.partnerLifestyleTotal || "$0") +
        parseMoney(payload?.jointLifestyleTotal || "$0") +
        parseMoney(payload?.clientInvestmentAssetsTotal || "$0") +
        parseMoney(payload?.partnerInvestmentAssetsTotal || "$0") +
        parseMoney(payload?.jointInvestmentAssetsTotal || "$0") +
        parseMoney(payload?.clientBusinessAssetsCurrentBalance || "$0") +
        parseMoney(payload?.partnerBusinessAssetsCurrentBalance || "$0") +
        parseMoney(payload?.jointBusinessAssetsCurrentBalance || "$0"),
    );

    payload.partnerLiabilitiesTotal = !["Single", "Widowed", ""].includes(
      personalDetails?.client?.clientMaritalStatus || "",
    )
      ? toCommaAndDollar(
          parseMoney(payload.partnerLiabilityCreditCards || "$0") +
            parseMoney(payload.partnerPersonalLoans || "$0") +
            parseMoney(payload.partnerInvestmentPropertyLoanBalance1 || "$0") +
            parseMoney(payload.partnerInvestmentPropertyLoanBalance2 || "$0") +
            parseMoney(payload.partnerInvestmentPropertyLoanBalance3 || "$0") +
            parseMoney(payload.partnerInvestmentPropertyLoanBalance4 || "$0") +
            parseMoney(payload.partnerInvestmentPropertyLoanBalance5 || "$0") +
            parseMoney(payload.partnerInvestmentPropertyLoanBalance6 || "$0") +
            parseMoney(payload.partnerInvestmentPropertyLoanBalance7 || "$0") +
            parseMoney(payload.partnerInvestmentPropertyLoanBalance8 || "$0") +
            parseMoney(payload.partnerInvestmentPropertyLoanBalance9 || "$0") +
            parseMoney(payload.partnerInvestmentPropertyLoanBalance10 || "$0") +
            parseMoney(payload.partnerInvestmentLoanBalanvce || "$0") +
            parseMoney(payload.partnerMarginLoanBalance || "$0"),
        )
      : "$0";

    payload.jointLiabilitiesTotal = !["Single", "Widowed", ""].includes(
      personalDetails?.client?.clientMaritalStatus || "",
    )
      ? toCommaAndDollar(
          parseMoney(payload.jointLiabilityCreditCards || "$0") +
            parseMoney(payload.jointPersonalLoans || "$0") +
            parseMoney(payload.jointInvestmentPropertyLoanBalance1 || "$0") +
            parseMoney(payload.jointInvestmentPropertyLoanBalance2 || "$0") +
            parseMoney(payload.jointInvestmentPropertyLoanBalance3 || "$0") +
            parseMoney(payload.jointInvestmentPropertyLoanBalance4 || "$0") +
            parseMoney(payload.jointInvestmentPropertyLoanBalance5 || "$0") +
            parseMoney(payload.jointInvestmentPropertyLoanBalance6 || "$0") +
            parseMoney(payload.jointInvestmentPropertyLoanBalance7 || "$0") +
            parseMoney(payload.jointInvestmentPropertyLoanBalance8 || "$0") +
            parseMoney(payload.jointInvestmentPropertyLoanBalance9 || "$0") +
            parseMoney(payload.jointInvestmentPropertyLoanBalance10 || "$0") +
            parseMoney(payload.jointInvestmentLoanBalanvce || "$0") +
            parseMoney(payload.jointMarginLoanBalance || "$0"),
        )
      : "$0";

    payload.clientLiabilitiesTotal = toCommaAndDollar(
      parseMoney(payload.clientLiabilityCreditCards || "$0") +
        parseMoney(payload.clientPersonalLoans || "$0") +
        parseMoney(payload.clientInvestmentPropertyLoanBalance1 || "$0") +
        parseMoney(payload.clientInvestmentPropertyLoanBalance2 || "$0") +
        parseMoney(payload.clientInvestmentPropertyLoanBalance3 || "$0") +
        parseMoney(payload.clientInvestmentPropertyLoanBalance4 || "$0") +
        parseMoney(payload.clientInvestmentPropertyLoanBalance5 || "$0") +
        parseMoney(payload.clientInvestmentPropertyLoanBalance6 || "$0") +
        parseMoney(payload.clientInvestmentPropertyLoanBalance7 || "$0") +
        parseMoney(payload.clientInvestmentPropertyLoanBalance8 || "$0") +
        parseMoney(payload.clientInvestmentPropertyLoanBalance9 || "$0") +
        parseMoney(payload.clientInvestmentPropertyLoanBalance10 || "$0") +
        parseMoney(payload.clientInvestmentLoanBalanvce || "$0") +
        parseMoney(payload.clientMarginLoanBalance || "$0"),
    );

    payload.totalCombinedLiabilities = toCommaAndDollar(
      parseMoney(payload.partnerLiabilitiesTotal || "$0") +
        parseMoney(payload.jointLiabilitiesTotal || "$0") +
        parseMoney(payload.clientLiabilitiesTotal || "$0"),
    );

    payload.netWorth = toCommaAndDollar(
      parseMoney(payload.totalCombinedAssets || "$0") -
        parseMoney(payload.totalCombinedLiabilities || "$0"),
    );

    payload.SMSFAssetsTotal = toCommaAndDollar(
      parseMoney(payload.SMSFBankCurrentBalance || "$0") +
        parseMoney(payload.SMSFTermCurrentBalance || "$0") +
        parseMoney(payload.SMSFAustralianCurrentBalance || "$0") +
        parseMoney(payload.SMSFPlatfromCurrentBalance || "$0") +
        parseMoney(payload.SMSFOtherCurrentBalance || "$0") +
        parseMoney(payload.SMSFInvestmentCurrentBalance1 || "$0") +
        parseMoney(payload.SMSFInvestmentCurrentBalance2 || "$0") +
        parseMoney(payload.SMSFInvestmentCurrentBalance3 || "$0") +
        parseMoney(payload.SMSFInvestmentCurrentBalance4 || "$0") +
        parseMoney(payload.SMSFInvestmentCurrentBalance5 || "$0"),
    );

    payload.SMSFLiabilitiesTotal = toCommaAndDollar(
      parseMoney(payload.SMSFInvestmentloan || "$0") +
        parseMoney(payload.SMSFInvestmentpropertyloan1 || "$0") +
        parseMoney(payload.SMSFInvestmentpropertyloan2 || "$0") +
        parseMoney(payload.SMSFInvestmentpropertyloan3 || "$0") +
        parseMoney(payload.SMSFInvestmentpropertyloan4 || "$0") +
        parseMoney(payload.SMSFInvestmentpropertyloan5 || "$0"),
    );

    payload.SMSFNetWorth = toCommaAndDollar(
      parseMoney(payload.SMSFAssetsTotal || "$0") -
        parseMoney(payload.SMSFLiabilitiesTotal || "$0"),
    );

    payload.FamilyTrustAssetTotal = toCommaAndDollar(
      parseMoney(payload.FamilyTrustBankCurrentBalance || "$0") +
        parseMoney(payload.FamilyTrustTermCurrentBalance || "$0") +
        parseMoney(payload.FamilyTrustAustralianCurrentBalance || "$0") +
        parseMoney(payload.FamilyTrustPlatfromCurrentBalance || "$0") +
        parseMoney(payload.FamilyTrustOtherCurrentBalance || "$0") +
        parseMoney(payload.FamilyTrustInvestmentCurrentBalance1 || "$0") +
        parseMoney(payload.FamilyTrustInvestmentCurrentBalance2 || "$0") +
        parseMoney(payload.FamilyTrustInvestmentCurrentBalance3 || "$0") +
        parseMoney(payload.FamilyTrustInvestmentCurrentBalance4 || "$0") +
        parseMoney(payload.FamilyTrustInvestmentCurrentBalance5 || "$0"),
    );

    payload.FamilyTrustLibilities = toCommaAndDollar(
      parseMoney(payload.FamilyTrustInvestmentloan || "$0") +
        parseMoney(payload.FamilyTrustInvestmentpropertyloan1 || "$0") +
        parseMoney(payload.FamilyTrustInvestmentpropertyloan2 || "$0") +
        parseMoney(payload.FamilyTrustInvestmentpropertyloan3 || "$0") +
        parseMoney(payload.FamilyTrustInvestmentpropertyloan4 || "$0") +
        parseMoney(payload.FamilyTrustInvestmentpropertyloan5 || "$0"),
    );

    payload.FamilyTrustNetWorth = toCommaAndDollar(
      parseMoney(payload.FamilyTrustAssetTotal || "$0") -
        parseMoney(payload.FamilyTrustLibilities || "$0"),
    );

    if (Array.isArray(payload?.clientSuperFund)) {
      payload.clientSuperFund.forEach((fund) => {
        // Fix Non-Concessional (min 3)
        if (
          Array.isArray(fund?.contributionsArrayNonConcessional) &&
          fund.contributionsArrayNonConcessional.length < 3
        ) {
          const missing = 3 - fund.contributionsArrayNonConcessional.length;

          for (let i = 0; i < missing; i++) {
            fund.contributionsArrayNonConcessional.unshift({
              nonConcessionalContributions: "$0",
              year:
                fund.contributionsArrayNonConcessional[0]?.year - 1 ||
                new Date().getFullYear() - 1,
            });
          }
        }

        // Fix Concessional (min 5)
        if (
          Array.isArray(fund?.contributionsArrayConcessional) &&
          fund.contributionsArrayConcessional.length < 6
        ) {
          const missing = 6 - fund.contributionsArrayConcessional.length;

          for (let i = 0; i < missing; i++) {
            fund.contributionsArrayConcessional.unshift({
              totalConcessional: "$0",
              year:
                fund.contributionsArrayConcessional[0]?.year - 1 ||
                new Date().getFullYear() - 1,
            });
          }
        }
      });
    }

    let SMSFContributionsArray =
      allQuestions?.SMSFAccumulationDetails?.client?.[0]?.contributionsArray ||
      [];

    if (
      SMSFContributionsArray.length > 0 &&
      SMSFContributionsArray.length < 6
    ) {
      for (let i = SMSFContributionsArray.length; i < 6; i++) {
        SMSFContributionsArray.unshift({
          totalConcessional: "$0",
          nonConcessionalContributions: "$0",
        });
      }
    }

    payload.clientSumOfNCCSuperAndSMSF1 = toCommaAndDollar(
      (payload?.clientSuperFund || []).reduce((sum, item) => {
        return (
          sum +
          (parseMoney(
            item?.contributionsArrayNonConcessional?.[0]
              ?.nonConcessionalContributions,
          ) || 0)
        );
      }, 0) +
        parseMoney(
          SMSFContributionsArray?.at(-3)?.nonConcessionalContributions || "$0",
        ),
    );

    payload.clientSumOfNCCSuperAndSMSF2 = toCommaAndDollar(
      (payload?.clientSuperFund || []).reduce((sum, item) => {
        return (
          sum +
          (parseMoney(
            item?.contributionsArrayNonConcessional?.[1]
              ?.nonConcessionalContributions,
          ) || 0)
        );
      }, 0) +
        parseMoney(
          SMSFContributionsArray?.at(-2)?.nonConcessionalContributions || "$0",
        ),
    );

    payload.clientSumOfNCCSuperAndSMSF3 = toCommaAndDollar(
      (payload?.clientSuperFund || []).reduce((sum, item) => {
        return (
          sum +
          (parseMoney(
            item?.contributionsArrayNonConcessional?.[2]
              ?.nonConcessionalContributions,
          ) || 0)
        );
      }, 0) +
        parseMoney(
          SMSFContributionsArray?.at(-1)?.nonConcessionalContributions || "$0",
        ),
    );

    payload.clientSumOfCCSuperAndSMSF1 = toCommaAndDollar(
      (payload?.clientSuperFund || []).reduce((sum, item) => {
        return (
          sum +
          (parseMoney(
            item?.contributionsArrayConcessional?.[0]?.totalConcessional,
          ) || 0)
        );
      }, 0) +
        parseMoney(SMSFContributionsArray?.at(-6)?.totalConcessional || "$0"),
    );

    payload.clientSumOfCCSuperAndSMSF2 = toCommaAndDollar(
      (payload?.clientSuperFund || []).reduce((sum, item) => {
        return (
          sum +
          (parseMoney(
            item?.contributionsArrayConcessional?.[1]?.totalConcessional,
          ) || 0)
        );
      }, 0) +
        parseMoney(SMSFContributionsArray?.at(-5)?.totalConcessional || "$0"),
    );

    payload.clientSumOfCCSuperAndSMSF3 = toCommaAndDollar(
      (payload?.clientSuperFund || []).reduce((sum, item) => {
        return (
          sum +
          (parseMoney(
            item?.contributionsArrayConcessional?.[2]?.totalConcessional,
          ) || 0)
        );
      }, 0) +
        parseMoney(SMSFContributionsArray?.at(-4)?.totalConcessional || "$0"),
    );

    payload.clientSumOfCCSuperAndSMSF4 = toCommaAndDollar(
      (payload?.clientSuperFund || []).reduce((sum, item) => {
        return (
          sum +
          (parseMoney(
            item?.contributionsArrayConcessional?.[3]?.totalConcessional,
          ) || 0)
        );
      }, 0) +
        parseMoney(SMSFContributionsArray?.at(-3)?.totalConcessional || "$0"),
    );

    payload.clientSumOfCCSuperAndSMSF5 = toCommaAndDollar(
      (payload?.clientSuperFund || []).reduce((sum, item) => {
        return (
          sum +
          (parseMoney(
            item?.contributionsArrayConcessional?.[4]?.totalConcessional,
          ) || 0)
        );
      }, 0) +
        parseMoney(SMSFContributionsArray?.at(-2)?.totalConcessional || "$0"),
    );

    payload.clientSumOfCCSuperAndSMSF6 = toCommaAndDollar(
      (payload?.clientSuperFund || []).reduce((sum, item) => {
        return (
          sum +
          (parseMoney(
            item?.contributionsArrayConcessional?.[5]?.totalConcessional,
          ) || 0)
        );
      }, 0) +
        parseMoney(SMSFContributionsArray?.at(-1)?.totalConcessional || "$0"),
    );

    if (
      !["Single", "Widowed", ""].includes(
        personalDetails?.client?.clientMaritalStatus,
      )
    ) {
      if (Array.isArray(payload?.partnerSuperFund)) {
        payload.partnerSuperFund.forEach((fund) => {
          // Fix Non-Concessional (min 3)
          if (
            Array.isArray(fund?.contributionsArrayNonConcessional) &&
            fund.contributionsArrayNonConcessional.length < 3
          ) {
            const missing = 3 - fund.contributionsArrayNonConcessional.length;

            for (let i = 0; i < missing; i++) {
              fund.contributionsArrayNonConcessional.unshift({
                nonConcessionalContributions: "$0",
                year:
                  fund.contributionsArrayNonConcessional[0]?.year - 1 ||
                  new Date().getFullYear() - i,
              });
            }
          }

          // Fix Concessional (min 5)
          if (
            Array.isArray(fund?.contributionsArrayConcessional) &&
            fund.contributionsArrayConcessional.length < 6
          ) {
            const missing = 6 - fund.contributionsArrayConcessional.length;

            for (let i = 0; i < missing; i++) {
              fund.contributionsArrayConcessional.unshift({
                totalConcessional: "$0",
                year:
                  fund.contributionsArrayConcessional[0]?.year - 1 ||
                  new Date().getFullYear() - i,
              });
            }
          }
        });
      }

      let SMSFContributionsArray =
        allQuestions?.SMSFAccumulationDetails?.partner?.[0]
          ?.contributionsArray || [];

      if (
        SMSFContributionsArray.length > 0 &&
        SMSFContributionsArray.length < 6
      ) {
        for (let i = SMSFContributionsArray.length; i < 6; i++) {
          SMSFContributionsArray.unshift({
            totalConcessional: "$0",
            nonConcessionalContributions: "$0",
          });
        }
      }

      payload.partnerSumOfNCCSuperAndSMSF1 = toCommaAndDollar(
        (payload?.partnerSuperFund || []).reduce((sum, item) => {
          return (
            sum +
            (parseMoney(
              item?.contributionsArrayNonConcessional?.[0]
                ?.nonConcessionalContributions,
            ) || 0)
          );
        }, 0) +
          parseMoney(
            SMSFContributionsArray?.at(-3)?.nonConcessionalContributions ||
              "$0",
          ),
      );

      payload.partnerSumOfNCCSuperAndSMSF2 = toCommaAndDollar(
        (payload?.partnerSuperFund || []).reduce((sum, item) => {
          return (
            sum +
            (parseMoney(
              item?.contributionsArrayNonConcessional?.[1]
                ?.nonConcessionalContributions,
            ) || 0)
          );
        }, 0) +
          parseMoney(
            SMSFContributionsArray?.at(-2)?.nonConcessionalContributions ||
              "$0",
          ),
      );

      payload.partnerSumOfNCCSuperAndSMSF3 = toCommaAndDollar(
        (payload?.partnerSuperFund || []).reduce((sum, item) => {
          return (
            sum +
            (parseMoney(
              item?.contributionsArrayNonConcessional?.[2]
                ?.nonConcessionalContributions,
            ) || 0)
          );
        }, 0) +
          parseMoney(
            SMSFContributionsArray?.at(-1)?.nonConcessionalContributions ||
              "$0",
          ),
      );

      payload.partnerSumOfCCSuperAndSMSF1 = toCommaAndDollar(
        (payload?.partnerSuperFund || []).reduce((sum, item) => {
          return (
            sum +
            (parseMoney(
              item?.contributionsArrayConcessional?.[0]?.totalConcessional,
            ) || 0)
          );
        }, 0) +
          parseMoney(SMSFContributionsArray?.at(-6)?.totalConcessional || "$0"),
      );

      payload.partnerSumOfCCSuperAndSMSF2 = toCommaAndDollar(
        (payload?.partnerSuperFund || []).reduce((sum, item) => {
          return (
            sum +
            (parseMoney(
              item?.contributionsArrayConcessional?.[1]?.totalConcessional,
            ) || 0)
          );
        }, 0) +
          parseMoney(SMSFContributionsArray?.at(-5)?.totalConcessional || "$0"),
      );

      payload.partnerSumOfCCSuperAndSMSF3 = toCommaAndDollar(
        (payload?.partnerSuperFund || []).reduce((sum, item) => {
          return (
            sum +
            (parseMoney(
              item?.contributionsArrayConcessional?.[2]?.totalConcessional,
            ) || 0)
          );
        }, 0) +
          parseMoney(SMSFContributionsArray?.at(-4)?.totalConcessional || "$0"),
      );

      payload.partnerSumOfCCSuperAndSMSF4 = toCommaAndDollar(
        (payload?.partnerSuperFund || []).reduce((sum, item) => {
          return (
            sum +
            (parseMoney(
              item?.contributionsArrayConcessional?.[3]?.totalConcessional,
            ) || 0)
          );
        }, 0) +
          parseMoney(SMSFContributionsArray?.at(-3)?.totalConcessional || "$0"),
      );

      payload.partnerSumOfCCSuperAndSMSF5 = toCommaAndDollar(
        (payload?.partnerSuperFund || []).reduce((sum, item) => {
          return (
            sum +
            (parseMoney(
              item?.contributionsArrayConcessional?.[4]?.totalConcessional,
            ) || 0)
          );
        }, 0) +
          parseMoney(SMSFContributionsArray?.at(-2)?.totalConcessional || "$0"),
      );

      payload.partnerSumOfCCSuperAndSMSF6 = toCommaAndDollar(
        (payload?.partnerSuperFund || []).reduce((sum, item) => {
          return (
            sum +
            (parseMoney(
              item?.contributionsArrayConcessional?.[5]?.totalConcessional,
            ) || 0)
          );
        }, 0) +
          parseMoney(SMSFContributionsArray?.at(-1)?.totalConcessional || "$0"),
      );
    }

    for (
      let i =
        allQuestions?.personalInsurance?.client?.PersonalInsurance.length + 1;
      i <= 10;
      i++
    ) {
      payload[`showPolicy${i}`] = false;
    }

    console.log("Document Payload:", payload);

    await generateDocumentFromTemplate(
      payload,
      "template.docx",
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

export { GeneraDocument };
