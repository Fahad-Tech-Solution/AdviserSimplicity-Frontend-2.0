import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, GQState } from "../../Store/Store";
import { Field, Form, Formik } from "formik";
import { PatchAxios, PostAxios } from "../Assets/Api/Api";
import { Image, Row } from "react-bootstrap";
import { CreatableMultiSelectField } from "../Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";

const GoalsObjectivesQuestions = (props) => {
  let [GQObject, setGQObject] = useRecoilState(GQState);

  let DefaultUrl = useRecoilValue(defaultUrl);

  const handleResponse = (values) => {
    setGQObject(values);
  };

  const onSubmit = async (values) => {
    let obj = JSON.parse(JSON.stringify(values));
    obj.clientFK = localStorage.getItem("UserID") || "";
    console.log(obj, "FinalOBject");
    try {
      if (!GQObject.clientFK) {
        const PostRes = await PostAxios(
          `${DefaultUrl}/api/goalsQuestions/Add`,
          obj
        );
        if (PostRes) {
          if (props.flagState) {
            props.setFlagState(false);
          }
          handleResponse(PostRes);
        }
      } else {
        obj.__v = undefined;
        const PatchRes = await PatchAxios(
          `${DefaultUrl}/api/goalsQuestions/Update`,
          obj
        );
        if (PatchRes) {
          if (props.flagState) {
            props.setFlagState(false);
          }
          handleResponse(PatchRes);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const goalsClick = (index, elem, values, setFieldValue) => {
    // console.log("image clicked in goals", index, elem.key, values);
    if (values[elem.key] == "No") {
      setFieldValue(elem.key, "Yes");
    }
    if (values[elem.key] == "Yes") {
      setFieldValue(elem.key, "No");
    }
  };

  const options = [
    { value: "", label: "Select" },
    { value: "All Areas", label: "All Areas" },
    { value: "Age Care", label: "Age Care" },
    { value: "Cashflow", label: "Cashflow" },
    { value: "Centrelink", label: "Centrelink" },
    { value: "Debt Management", label: "Debt Management" },
    { value: "Estate Planning", label: "Estate Planning" },
    { value: "Investment", label: "Investment" },
    { value: "Other", label: "Other" },
    { value: "Personal Insurance", label: "Personal Insurance" },
    { value: "Retirement Planning", label: "Retirement Planning" },
    { value: "Superannuation", label: "Superannuation" },
  ];

  return (
    <div className="container-fluid">
      <div className="row m-0">
        <Formik
          initialValues={GQObject}
          onSubmit={onSubmit}
          enableReinitialize
          innerRef={props.formRef}
        >
          {({ values, handleChange, setFieldValue }) => {
            // Reset hidden goals whenever scope changes
            useEffect(() => {
              if (
                !values.scope ||
                values.scope.length === 0 ||
                values.scope.includes("")
              ) {
                // No scope selected → reset ALL goals
                Object.values(props.modalObject.allGoals)
                  .flat()
                  .forEach((goal) => {
                    setFieldValue(goal.key, "No");
                  });
              } else {
                // Reset goals not included in selected scope(s)
                Object.values(props.modalObject.allGoals)
                  .flat()
                  .forEach((goal) => {
                    if (
                      !values.scope.includes("All Areas") &&
                      !values.scope.includes(goal.scopeOfAdvice)
                    ) {
                      setFieldValue(goal.key, "No");
                    }
                  });
              }
            }, [values.scope, setFieldValue, props.modalObject.allGoals]);

            return (
              <Form>
                <div className="col-md-12 text-center">
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2 my-3">
                    <label htmlFor="" className="">
                     Scope of Advice :
                    </label>

                    <div style={{ minWidth: "30%" }}>
                      <Field
                        name={`scope`}
                        component={CreatableMultiSelectField}
                        label="Multi Select Field"
                        options={options}
                      />
                    </div>
                  </div>

                  <Row className="justify-content-center">
                    {Object.entries(props.modalObject.allGoals).map(
                      ([category, goals]) => {
                        return (
                          <React.Fragment>
                            {goals.map((elem, index) => {
                              if (
                                values.scope &&
                                values.scope.length > 0 &&
                                values.scope.includes("All Areas")
                              ) {
                                return (
                                  <div className="col-md-4 px-2 pb-3 d-flex ">
                                    <div className=" flex-grow-1 d-flex">
                                      <div
                                        className={`${
                                          values[elem.key] == "Yes"
                                            ? "customBorder p-3"
                                            : "border p-3"
                                        }  flex-grow-1`}
                                        onClick={() =>
                                          goalsClick(
                                            index,
                                            elem,
                                            values,
                                            setFieldValue
                                          )
                                        }
                                      >
                                        <div className="text-center">
                                          <div
                                            className="mx-auto"
                                            style={{ width: "20%" }}
                                          >
                                            <Image src={elem.img} fluid />
                                          </div>
                                        </div>
                                        <label
                                          htmlFor={elem.key}
                                          className="form-label"
                                        >
                                          {elem.title}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                );
                              } else if (
                                values.scope &&
                                values.scope.length > 0 &&
                                values.scope.includes(elem.scopeOfAdvice)
                              ) {
                                return (
                                  <div className="col-md-4 px-2 pb-3 d-flex ">
                                    <div className=" flex-grow-1 d-flex">
                                      <div
                                        className={`${
                                          values[elem.key] == "Yes"
                                            ? "customBorder p-3"
                                            : "border p-3"
                                        }  flex-grow-1`}
                                        onClick={() =>
                                          goalsClick(
                                            index,
                                            elem,
                                            values,
                                            setFieldValue
                                          )
                                        }
                                      >
                                        <div className="text-center">
                                          <div
                                            className="mx-auto"
                                            style={{ width: "20%" }}
                                          >
                                            <Image src={elem.img} fluid />
                                          </div>
                                        </div>
                                        <label
                                          htmlFor={elem.key}
                                          className="form-label"
                                        >
                                          {elem.title}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </React.Fragment>
                        );
                      }
                    )}
                  </Row>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default GoalsObjectivesQuestions;
