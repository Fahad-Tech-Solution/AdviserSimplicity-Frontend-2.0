import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { PatchAxios, PostAxios, RenderName } from "../../Assets/Api/Api";
import DynamicTableRow from "../../Assets/Dynamic/DynamicTableRow";
// import Select from "react-select";

const OverseasPension = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);


  let [UserStatus] = useState(localStorage.getItem('UserStatus'));




  let incomeFromOverseasPension =
    Object.keys(questionDetail.incomeFromOverseasPension).length > 0
      ? questionDetail.incomeFromOverseasPension
      : {
        client: [],
        partner: [],
        joint: [],
      }; // Use an empty object as default if incomeFromOverseasPension is undefined

  let initialValues = {};

  const fillInitialValues = (setFieldValue) => {
    console.log(incomeFromOverseasPension, "data");
    let data = incomeFromOverseasPension || "";
    if (incomeFromOverseasPension && incomeFromOverseasPension._id) {
      if (data) {
        setFieldValue(`owner`, data.owner || "");

        if (data.owner === "client" || data.owner === "client+partner") {
          if (data?.client && Object.keys(data?.client).length) {

            setFieldValue(`client.regularIncomePA`, data.client.regularIncomePA || "");
            setFieldValue(`client.country`, data.client.country || "");

          }
        }

        if (UserStatus === "Married") {

          if (data.owner === "partner" || data.owner === "client+partner") {
            if (data?.partner && Object.keys(data?.partner).length) {

              setFieldValue(`partner.regularIncomePA`, data.partner.regularIncomePA || "");
              setFieldValue(`partner.country`, data.partner.country || "");
            }
          }
        }

      }
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    console.log(JSON.stringify(values));
    // return (false);

    let obj = values;
    obj.clientFK = localStorage.getItem("UserID");
    console.log(obj, "new Object");


    if (values.owner === "client" || values.owner === "client+partner") {
      obj.clientTotal = values.client.regularIncomePA;
      console.log("Client total set");
    } else {
      obj.client = {};
      obj.clientTotal = "";
      console.log("Client data cleared");
    }

    if ((values.owner === "partner" || values.owner === "client+partner") && (UserStatus === "Married")) {
      obj.partnerTotal = values.partner.regularIncomePA;
      console.log("Partner total set");
    } else {
      obj.partner = {};
      obj.partnerTotal = "";
      console.log("Partner data cleared");
    }



    console.log(obj, "final obj");
    const bankAccountArray = incomeFromOverseasPension.clientFK || "";
    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/incomeFromOverseasPension/Add`,
          obj
        );
      } else {
        // obj.collection = props.modalObject.Input;
        res = await PatchAxios(
          `${DefaultUrl}/api/incomeFromOverseasPension/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = {
          ...questionDetail,
          incomeFromOverseasPension: res,
        };
        setQuestionDetail(updatedData);
      }

      // Reset the flag state if necessary
      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
    }
  };

  const rowConfig = [
    { name: "country", type: "text", placeholder: "Country" },
    {
      name: "regularIncomePA",
      type: "number-toComma",
      placeholder: "Regular IncomePA",
    },
    // { name: "businessAddress", type: "text", placeholder: "Business Address" },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-center align-items-center gap-4">
                      <label htmlFor="" className="text-end ">
                        Owner
                      </label>

                      <div className="w-25 ">
                        <Field
                          as="select"
                          placeholder="Name of owner"
                          id={`owner`}
                          name={`owner`}
                          className="form-select inputDesignDoubleInput"
                        >
                          <option value={""}>Select</option>
                          <option value={"client"}>
                            {"Only " + RenderName("client")}
                          </option>
                          {localStorage.getItem("UserStatus") !== "Single" && (
                            <React.Fragment>
                              <option value={"partner"}>
                                {"Only " + RenderName("partner")}
                              </option>
                              <option value={"client+partner"}>
                                {"Both (" +
                                  RenderName("client") +
                                  " , " +
                                  RenderName("partner") +
                                  ")"}
                              </option>
                              {/* <option value={"joint"}>
                                {"Joint (" + RenderName("joint") + ")"}
                              </option> */}
                            </React.Fragment>
                          )}
                        </Field>
                      </div>
                    </div>
                  </div>
                  {values.owner && (
                    <div className="mt-4">
                      <Table striped bordered responsive hover>
                        <thead>
                          <tr>
                            <th
                              onClick={() => {
                                console.log(values);
                              }}
                            >
                              Owner
                            </th>
                            <th>Country</th>
                            <th>Regular Income p.a</th>
                          </tr>
                        </thead>
                        <tbody>
                          {values.owner == "client" ? (
                            <>
                              <DynamicTableRow
                                rowConfig={rowConfig}
                                values={values}
                                setFieldValue={setFieldValue}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                // handleInnerModal={handleInnerModal}
                                stakeHolder="client."
                              />
                            </>
                          ) : (
                            ""
                          )}
                          {((values.owner == "partner") && (UserStatus === "Married")) ? (
                            <>
                              <DynamicTableRow
                                rowConfig={rowConfig}
                                values={values}
                                setFieldValue={setFieldValue}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                // handleInnerModal={handleInnerModal}
                                stakeHolder="partner."
                              />
                            </>
                          ) : (
                            ""
                          )}
                          {values.owner == "client+partner" ? (
                            <>
                              <DynamicTableRow
                                rowConfig={rowConfig}
                                values={values}
                                setFieldValue={setFieldValue}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                // handleInnerModal={handleInnerModal}
                                stakeHolder="client."
                              />
                              {UserStatus === "Married" &&
                                <DynamicTableRow
                                  rowConfig={rowConfig}
                                  values={values}
                                  setFieldValue={setFieldValue}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  // handleInnerModal={handleInnerModal}
                                  stakeHolder="partner."
                                />
                              }
                            </>
                          ) : (
                            ""
                          )}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OverseasPension;

