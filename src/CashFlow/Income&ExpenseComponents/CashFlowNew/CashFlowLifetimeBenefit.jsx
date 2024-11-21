import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CreatableMultiSelectField } from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import {
  openNotificationSuccess,
  RenderName,
  toCommaAndDollar,
} from "../../../Components/Assets/Api/Api";
import { Row, Table } from "react-bootstrap";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { useRecoilValue } from "recoil";

const CashFlowLifetimeBenefit = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let DefaultUrl = useRecoilValue(defaultUrl);

  let incomeFromSuperPayment =
    Object.keys(questionDetail.incomeFromSuperPayment || {}).length > 0
      ? questionDetail.incomeFromSuperPayment
      : {
          client: [],
          partner: [],
          joint: [],
        };


  let initialValues = {
    owner: [],
    client: {
      includeFromYear: 1,
      upUntillYear: 30,
      indexation: "2.50%",
    },
    partner: {
      includeFromYear: 1,
      upUntillYear: 30,
      indexation: "2.50%",
    },
  };

  const fillInitialValues = (setFieldValue) => {
   
console.log( "incomeFromSuperPayment: ",incomeFromSuperPayment)
   


    if (incomeFromSuperPayment && incomeFromSuperPayment._id) {
      setFieldValue(`owner`, incomeFromSuperPayment.owner || "");

      // Handle client-related conditions
      if (incomeFromSuperPayment.owner.includes("client")) {
        if (
          incomeFromSuperPayment?.client &&
          Object.keys(incomeFromSuperPayment.client).length
        ) {
          setFieldValue(`client.taxFree`, incomeFromSuperPayment.client.isPension);
          setFieldValue(`client.lifetimePensionIncome`, incomeFromSuperPayment.client.regularIncomePA);
          setFieldValue(`client.CentrelinkDeductibleAmount`, incomeFromSuperPayment.client.centrelinkDeductibleAmount);
    
        }
       

      }

      // Handle partner-related conditions
      if (
        UserStatus === "Married" &&
        incomeFromSuperPayment.owner.includes("partner")
      ) {
        if (
          incomeFromSuperPayment?.partner &&
          Object.keys(incomeFromSuperPayment.partner).length
        ) {
          setFieldValue(`partner.taxFree`, incomeFromSuperPayment.partner.isPension);
          setFieldValue(`partner.lifetimePensionIncome`, incomeFromSuperPayment.partner.regularIncomePA);
          setFieldValue(`partner.CentrelinkDeductibleAmount`, incomeFromSuperPayment.partner.centrelinkDeductibleAmount);
    
        }
      }
    }

  };

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
    const bankAccountArray = incomeFromSuperPayment.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/incomeFromSuperPayment/Add`,
          obj
        );
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/incomeFromSuperPayment/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = {
          ...questionDetail,
          incomeFromSuperPayment: res,
        };
        setQuestionDetail(updatedData);
      }

      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        'Data of "' + props.modalObject.title + '" is Saved'
      );

      // Reset the flag state if necessary
      if (props.flagState) {
        props.setFlagState(false);
      }
    } catch (error) {
      console.error("Error occurred while making API call:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        'Data of "' +
          props.modalObject.title +
          '" is not Saved Please! try again'
      );
    }
  };

  const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    label: ("Year " + (i + 1)).toString(),
  }));

  const indexation = Array.from({ length: 21 }, (_, i) => ({
    value: (i * 0.5).toFixed(2) + "%",
    label: (i * 0.5).toFixed(2) + "%",
  }));

  const options =
    UserStatus !== "Single"
      ? [
          { value: "client", label: RenderName("client") },
          { value: "partner", label: RenderName("partner") },
        ]
      : [{ value: "client", label: RenderName("client") }];

  const rowConfig = [
    {
      name: "lifetimePensionIncome",
      type: "number-toComma",
      placeholder: "Lifetime Pension Income",
    },
    {
      name: "includeFromYear",
      type: "select",
      options: loanTermOptions,
    },
    {
      name: "upUntillYear",
      type: "select",
      options: loanTermOptions,
    },
    {
      name: "indexation",
      type: "select",
      options: indexation,
    },
    {
      name: "taxFree",
      type: "yesno",
    
    },

    {
      name: "CentrelinkDeductibleAmount",
      type: "number-toPercent",
      placeholder: "Centrelink Deductible Amount",
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
                        <th>Lifetime Pension Income</th>
                        <th>Include From Year:</th>
                        <th>Up Until Year:</th>
                        <th>Indexation</th>
                        <th>Tax-Free</th>
                        <th>Centrelink Deductible Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.owner.includes("client") && (
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

                      {values.owner.includes("partner") &&
                        UserStatus === "Married" && (
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
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowLifetimeBenefit;
