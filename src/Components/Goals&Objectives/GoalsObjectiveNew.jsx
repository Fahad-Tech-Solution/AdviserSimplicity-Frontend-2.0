import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Card, InputGroup } from "react-bootstrap";

//images or SVGs import for Goals

// // import BankImg from "../Questions/svgs/bank.svg";
// import nursingcare from "../Questions/svgs/nursingcare.svg";
import Tax_Rate from "../Questions/svgs/Tax_Rate.png";
import lumpsum from "../Questions/svgs/lumpsum.png";
import CareforAgeingFamilyMember from "../Questions/svgs/CareforAgeingFamilyMember.png";
import bill from "../Questions/svgs/bill.png";
import credit from "../Questions/svgs/credit-card-refund-svgrepo-com.svg";
import FamilyProtection from "../Questions/svgs/WhatsApp Image 2023-08-11 at 19.13.12.jpg";
import beachChair from "../Questions/svgs/beach-chair.png";
import jeepCar from "../Questions/svgs/jeep-car-svgrepo-com.svg";
import briefcase from "../Questions/svgs/briefcase.png";
import clipboard from "../Questions/svgs/clipboard.png";
import home from "../Questions/svgs/home-svgrepo-com.svg";
import boat from "../Questions/svgs/boat.svg";
import caravan from "../Questions/svgs/trailer-caravan.svg";
import upgradeHome from "../Questions/svgs/upgradeHome.png";
import paintHome from "../Questions/svgs/paintHome.png";
import shiftHome from "../Questions/svgs/shift.png";
import investment from "../Questions/svgs/investment.png";
import loan from "../Questions/svgs/loan.svg";
import BuildingSmall from "../Questions/svgs/building-small-svgrepo-com.svg";
import graduationMortarboard from "../Questions/svgs/graduation-mortarboard.svg";
import timeMoney from "../Questions/svgs/time-is-money.svg";
import familySilhouette from "../Questions/svgs/family-silhouette.svg";
import inheritance from "../Questions/svgs/inheritance.png";
import shareholders from "../Questions/svgs/shareholders.png";
import gearsGear from "../Questions/svgs/gears-gear-svgrepo-com.svg";
import Questions_People from "../Questions/svgs/Questions_People.png";
import moneyBagSvgRepo from "../Questions/svgs/money-bag-svgrepo-com.svg";
import marriageRings from "../Questions/svgs/marriage-rings.svg";
import will from "../Questions/svgs/page-with-curl-svgrepo-com.svg";
import portfolio from "../Questions/svgs/portfolio copy.svg";
import investmentChart from "../Questions/svgs/investmentChart.png";
import taxCutting from "../Questions/svgs/taxCutting.png";
import piggyBank from "../Questions/svgs/piggy-bank.svg";
import piggyBankNew from "../Questions/svgs/piggy-bank-new.svg";
import businessPersonConsultant from "../Questions/svgs/business-Person-consultant.svg";
import piggyBankPNG from "../Questions/svgs/piggy-bank.png";
import piggyBankFull from "../Questions/svgs/piggy-bank-Full.png";
import insurance from "../Questions/svgs/insurance.png";
import insuranceProtection from "../Questions/svgs/insuranceProtection.png";
import insuranceSecurity from "../Questions/svgs/insurance Security.png";
import socialInsurance from "../Questions/svgs/social-insurance.png";
import savingMoney from "../Questions/svgs/saving-money.png";
import calendar from "../Questions/svgs/calendar.png";

//Goals and Objective Questions
import Add from "../Questions/svgs/add-circle-solid-svgrepo-com.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalComponent from "../Questions/FinancialInvestments/ModalComponent";
import GoalsForm from "./GoalsForm";
import { defaultUrl, GoalsDetail, GQState } from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import { GetAxios } from "../Assets/Api/Api";
import GoalsObjectivesQuestions from "./GoalsObjectivesQuestions";
import { content } from "../../Content/Content";

const GoalsObjectiveNew = () => {
  useEffect(() => {
    GetGoals();
    GetGoalsQuestion();
  }, []);

  let DefaultUrl = useRecoilValue(defaultUrl);
  let GQSObj = useRecoilValue(GQState);

  let [GQObject, setGQObject] = useRecoilState(GQState);

  let [goalsDetail, setGoalsDetail] = useRecoilState(GoalsDetail);

  let GetGoals = async () => {
    try {
      const res = await GetAxios(
        `${DefaultUrl}/api/CombinedGoalsAndObjectives/${localStorage.getItem(
          "UserID",
        )}`,
      );
      // console.log(JSON.stringify(res))
      if (res) {
        setGoalsDetail(res);
      }
    } catch (error) {
      console.error("Error fetching Goals:", error);
    }
  };

  let GetGoalsQuestion = async () => {
    try {
      const res = await GetAxios(
        `${DefaultUrl}/api/goalsQuestions/getByClient/${localStorage.getItem(
          "UserID",
        )}`,
      );
      // console.log(JSON.stringify(res))
      if (res) {
        setGQObject(res);
      }
    } catch (error) {
      console.error("Error fetching Goals:", error);
    }
  };

  let allGoals = content.GoalsAndObjectives;

  let ReorderFunction = (goalArray) => {
    if (goalArray.length <= 1) {
      return goalArray; // If array has 0 or 1 item, no need to reorder
    }

    const categoryOrder = [
      "Now",
      "Ongoing",
      "Year 1",
      "Year 2",
      "Year 3",
      "Year 4",
      "Year 5",
      "Year 6",
      "Year 7",
      "Year 8",
      "Year 9",
      "Year 10",
    ];

    // Map to store goals by their category
    const goalsByCategory = new Map(
      categoryOrder.map((category) => [category, []]), // Initialize an array for each category
    );

    // Create a separate array for uncategorized goals
    const uncategorizedGoals = [];

    // Group goals by their time category or handle uncategorized goals
    goalArray.forEach((elem) => {
      const goalDetail = goalsDetail[elem.key];

      if (!goalDetail || Object.keys(goalDetail).length === 0) {
        // Case 1: If the key is not in goalsDetail or it's an empty object, keep the goal as uncategorized
        uncategorizedGoals.push(elem);
      } else if (goalsByCategory.has(goalDetail.when)) {
        // If the goal belongs to a known category, add it to the corresponding category
        goalsByCategory.get(goalDetail.when).push(elem);
      } else {
        // If it has a goalDetail but no recognized category, treat it as uncategorized
        uncategorizedGoals.push(elem);
      }
    });

    // Flatten the categorized goals back into a single array based on the categoryOrder
    const reorderedArray = categoryOrder
      .flatMap((category) => goalsByCategory.get(category))
      .concat(uncategorizedGoals); // Add the uncategorized goals at the end in their original order

    return reorderedArray;
  };

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let modalOpen = (Values) => {
    setModalObject(Values);
    setFlagState(true);
  };

  let modalOpenQuestions = (Values) => {
    setModalObject(Values);
    setFlagState(true);
  };

  return (
    <div className="container-fluid minheight73" style={{ marginTop: "-80px" }}>
      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        {modalObject.key !== "MainModal" ? (
          <GoalsForm />
        ) : (
          <GoalsObjectivesQuestions />
        )}
      </ModalComponent>

      <div className="row">
        <div className="col-md-12">
          <div className="pb-4 px-4 my-3">
            <h3
              className="text-center GreenColor"
              onClick={() => {
                console.log(goalsDetail);
              }}
            >
              <b>Goals & Objectives</b>
            </h3>
          </div>
        </div>

        <div className="col-md-12">
          <div className="d-flex justify-content-center ">
            <div
              role="button"
              className="QuestionIcon p-3 curser-pointer"
              style={{ marginTop: "-50px", width: "9%" }}
              onClick={() => {
                modalOpenQuestions({
                  title: "Goals and Objectives",
                  key: "MainModal",
                  allGoals,
                });
              }}
            >
              <img className="img-fluid" src={Add} alt="" />
            </div>
            {/* <h3>komail</h3> */}
          </div>
          <h3 className="text-center d-none" style={{ marginTop: "-20px" }}>
            Add Your Goals
          </h3>
          {/* <hr /> */}
        </div>
      </div>

      <div className="row justify-content-center">
        {/* object renter */}
        {Object.entries(allGoals).map(([category, goals]) => {
          let reorderdGoals = ReorderFunction(goals);

          return (
            <React.Fragment>
              {reorderdGoals.map((goal, index) => {
                if (GQSObj[goal.key] === "Yes") {
                  // count how many entries in GQSObj are "Yes" and determine even/odd
                  const yesKeys = Object.keys(GQSObj || {}).filter(
                    (k) => GQSObj[k] === "Yes",
                  );
                  const numberOfYes = yesKeys.length;
                  const isEvenNumberOfYes = numberOfYes % 2 === 0;

                  return (
                    <div
                      className={`${
                        isEvenNumberOfYes ? "col-md-3" : "col-md-4"
                      }  mb-4`}
                      key={index}
                    >
                      <Card
                        className="py-4 shadow GoalsobjectiveCard px-4"
                        style={{ borderRadius: "20px", height: "100%" }}
                      >
                        <h5
                          className="text-center mt-2 capitalize"
                          onClick={() => {
                            console.log(goalsDetail[goal.key]);
                          }}
                        >
                          {goal.title}
                        </h5>
                        <div className="QuestionIcon CardImg">
                          <img className="img-fluid" src={goal.img} alt="" />
                        </div>

                        <div className="d-flex justify-content-center align-items-center gap-3 d-none">
                          <div className="">
                            <h5
                              className="text-center mt-2 capitalize"
                              onClick={() => {
                                console.log(goalsDetail[goal.key]);
                              }}
                            >
                              {goal.title}
                            </h5>
                          </div>
                          {goal.modalBtn === "head" && (
                            <div className="">
                              <label className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer">
                                <div>
                                  <FontAwesomeIcon
                                    icon={faArrowUpRightFromSquare}
                                  />
                                </div>
                              </label>
                            </div>
                          )}
                        </div>
                        <Formik
                          initialValues={{
                            scopeOfAdvice: "",
                            when: "",
                            estimatedValue: "",
                            description: "",
                          }}
                          onSubmit={() => {}}
                          enableReinitialize
                        >
                          {({ values, setFieldValue }) => {
                            return (
                              <Form className="smallerInput">
                                <div className="row justify-content-center align-items-center my-2 ">
                                  <div className="col-12 p-0 ">
                                    <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                                      <label
                                        className=" d-block text-center"
                                        htmlFor={"scopeOfAdvice" + [goal.key]}
                                      >
                                        Scope
                                      </label>

                                      {goal.modalBtn === "label" && (
                                        <label
                                          role="button"
                                          className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer"
                                          onClick={() => {
                                            modalOpen(goal);
                                          }}
                                        >
                                          <div>
                                            <FontAwesomeIcon
                                              icon={faArrowUpRightFromSquare}
                                            />
                                          </div>
                                        </label>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="d-flex justify-content-center align-items-center">
                                  <Field
                                    type="text"
                                    className="form-control inputDesign"
                                    id={"scopeOfAdvice" + [goal.key]}
                                    placeholder="Scope of Advice"
                                    name="scopeOfAdvice"
                                    readOnly
                                    value={
                                      goalsDetail[goal.key]?.scopeOfAdvice || ""
                                    }
                                  />
                                </div>

                                <div
                                  className={`row justify-content-center align-items-center my-2 `}
                                >
                                  <div className="col-12 p-0 ">
                                    <label
                                      className=" d-block text-center"
                                      htmlFor={"estimatedValue" + [goal.key]}
                                    >
                                      Amount{" "}
                                    </label>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                  <Field
                                    type="text"
                                    className={`form-control inputDesign `}
                                    id={"estimatedValue" + [goal.key]}
                                    placeholder={"Amount"}
                                    name={"estimatedValue"}
                                    readOnly
                                    value={
                                      goalsDetail[goal.key]?.estimatedValue
                                        ? `${
                                            goalsDetail[goal.key].estimatedValue
                                          }`
                                        : ""
                                    }
                                  />
                                </div>

                                {goal.modalBtn === "button" && (
                                  <button className=" btn btn-outline-secondary w-100 mt-3">
                                    Enter Details
                                    <div className="iconContainer ms-3">
                                      {/*
                                                                    <img className="img-fluid" src={plus} alt="" />
                                                                    */}
                                      <label className="mb-0 bg-secondary rounded-circle text-light py-1 px-2 curser-pointer">
                                        <div>
                                          <FontAwesomeIcon
                                            icon={faArrowUpRightFromSquare}
                                          />
                                        </div>
                                      </label>
                                    </div>
                                  </button>
                                )}
                              </Form>
                            );
                          }}
                        </Formik>
                      </Card>
                    </div>
                  );
                }
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsObjectiveNew;
