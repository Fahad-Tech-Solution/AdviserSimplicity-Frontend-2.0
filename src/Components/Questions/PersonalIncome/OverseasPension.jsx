import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { openNotificationSuccess, PatchAxios, PostAxios, RenderName } from "../../Assets/Api/Api";
import DynamicTableRow from "../../Assets/Dynamic/DynamicTableRow";
import { CreatableMultiSelectField } from "../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
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

  let initialValues = {
    owner: []
  };

  const fillInitialValues = (setFieldValue) => {
    console.log(incomeFromOverseasPension, "data");
    let data = incomeFromOverseasPension || "";

    if (data && data._id) {
      setFieldValue(`owner`, data.owner || "");

      // Handle client-related conditions
      if (data.owner.includes("client")) {
        if (data?.client && Object.keys(data.client).length) {
          setFieldValue(`client.regularIncomePA`, data.client.regularIncomePA || "");
          setFieldValue(`client.country`, data.client.country || "");
        }
      }

      // Handle partner-related conditions
      if (UserStatus === "Married" && data.owner.includes("partner")) {
        if (data?.partner && Object.keys(data.partner).length) {
          setFieldValue(`partner.regularIncomePA`, data.partner.regularIncomePA || "");
          setFieldValue(`partner.country`, data.partner.country || "");
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

    // Handle client-related conditions
    if (values.owner.includes("client")) {
      obj.clientTotal = values.client.regularIncomePA;
      console.log("Client total set");
    } else {
      obj.client = {};
      obj.clientTotal = "";
      console.log("Client data cleared");
    }

    // Handle partner-related conditions
    if (values.owner.includes("partner") && UserStatus === "Married") {
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

      openNotificationSuccess("success", "topRight", "Success Notification", "Data of \"" + props.modalObject.title + "\" is Saved");

      // Reset the flag state if necessary
      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess("error", "topRight", "Error Notification", "Data of \"" + props.modalObject.title + "\" is not Saved Please! try again");
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



  const options = (UserStatus !== "Single") ? [
    { value: "client", label: RenderName("client") },
    { value: "partner", label: RenderName("partner") }] :
    [{ value: "client", label: RenderName("client") },];




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

                      <div style={{ minWidth: "25%" }}>
                        <Field
                          name={`owner`}
                          component={CreatableMultiSelectField}
                          label="Multi Select Field"
                          options={options}
                        />
                      </div>
                    </div>
                  </div>
                  {values.owner.length > 0 && (
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
                          {(values.owner.includes("client")) && (
                            <DynamicTableRow
                              rowConfig={rowConfig}
                              values={values}
                              setFieldValue={setFieldValue}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              // handleInnerModal={handleInnerModal}
                              stakeHolder="client."
                            />
                          )}

                          {(values.owner.includes("partner") && UserStatus === "Married") && (
                            <DynamicTableRow
                              rowConfig={rowConfig}
                              values={values}
                              setFieldValue={setFieldValue}
                              handleChange={handleChange}
                              handleBlur={handleBlur}
                              // handleInnerModal={handleInnerModal}
                              stakeHolder="partner."
                            />
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

