import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CreatableMultiSelectField } from "../../../Components/Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableRow from "../../../Components/Assets/Dynamic/DynamicTableRow";
import {
  openNotificationSuccess,
  RenderName,
} from "../../../Components/Assets/Api/Api";
import { Row, Table } from "react-bootstrap";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import { useRecoilValue } from "recoil";

const CashFlowRegulerLiving = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let DefaultUrl = useRecoilValue(defaultUrl);

  let generalLivingExpenses =
    Object.keys(questionDetail.generalLivingExpenses || {}).length > 0
      ? questionDetail.generalLivingExpenses
      : {
          client: []
         
        }; // Use an empty object as default if generalLivingExpenses is undefined

        let initialValues = {
          client: {
            includeFromYear: 1,
            "upUntillYear": 30,
            "indexation": "2.50%",
          }
        
        };

  const fillInitialValues = (setFieldValue) => {
    console.log(generalLivingExpenses.generalLivingExpensesTotal, "data");
    if (generalLivingExpenses && generalLivingExpenses._id) {
      setFieldValue(`client.amount`, generalLivingExpenses.generalLivingExpensesTotal || "");

  };
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
    const bankAccountArray = generalLivingExpenses.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/generalLivingExpenses/Add`,
          obj
        );
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/generalLivingExpenses/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = {
          ...questionDetail,
          generalLivingExpenses: res,
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

  const optionOfExpenses = [
    "Living Expenses",
    "Reduce Living Expenses",
    "ASFS Retirement Standards",
    "Holidays",
    "Other",
    "Personal Insurance",
    "Income Protection",
    "Other Deductible"
  ];
  
  const ArrayOfExpenses = optionOfExpenses.map(key => ({
    value: key,
    label: key
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
      name: "expenses",
      type: "select",
      options: ArrayOfExpenses,
    },
    {
      name: "amount",
      type: "number-toComma",
      placeholder: "Other Taxable Income",
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
                        <th>Expenses</th>
                        <th>Amount</th>
                        <th>Include From Year:</th>
                        <th>Up Until Year:</th>
                        <th>Indexation</th>
                      </tr>
                    </thead>
                    <tbody>
                    
                        <DynamicTableRow
                          rowConfig={rowConfig}
                          values={values}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          // handleInnerModal={handleInnerModal}
                          stakeHolder="client."
                        />
                    

           
                    </tbody>
                  </Table>
                </div>
          
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CashFlowRegulerLiving;
