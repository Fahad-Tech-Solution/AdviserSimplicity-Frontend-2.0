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

const CashFlowCenterLink = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));
  let DefaultUrl = useRecoilValue(defaultUrl);

  let incomeFromCentrelink =
    Object.keys(questionDetail.incomeFromCentrelink || {}).length > 0
      ? questionDetail.incomeFromCentrelink
      : {
          client: [],
          partner: [],
          joint: [],
        };

  let initialValues = {
    owner: [],
    client: {

      includeFromYear: 1,
      allowCarerAllowance: ["No"],
      isClientRenting: ["No"],
      applySeparatedByIllness:"No"
    },
    partner: {
      includeFromYear: 1,
      allowCarerAllowance: ["No"],
      isClientRenting: ["No"],
      applySeparatedByIllness:"No"
    },
  };

  const fillInitialValues = (setFieldValue) => {
    console.log("incomeFromCentrelink: ", incomeFromCentrelink);
    console.log(
      "incomeFromCentrelink.client.paymentType: ",
      incomeFromCentrelink.client.paymentType
    );

    if (incomeFromCentrelink && incomeFromCentrelink._id) {
      setFieldValue(`owner`, incomeFromCentrelink.owner || "");

      // Handle client-related conditions
      if (incomeFromCentrelink.owner.includes("client")) {
        if (
          incomeFromCentrelink?.client &&
          Object.keys(incomeFromCentrelink.client).length
        ) {
          setFieldValue("client.centrelinkPayment", [
            ...incomeFromCentrelink.client.paymentType,
          ]);

          // setFieldValue(`client.centrelinkPayment`, incomeFromCentrelink.client.paymentType);
          setFieldValue(
            `client.allowCarerAllowance`,
            incomeFromCentrelink.client.paymentType
          );
          setFieldValue(
            `client.isClientRenting`,
            incomeFromCentrelink.client.paymentType
          );
        }
      }

      // Handle partner-related conditions
      if (
        UserStatus === "Married" &&
        incomeFromCentrelink.owner.includes("partner")
      ) {
        if (
          incomeFromCentrelink?.partner &&
          Object.keys(incomeFromCentrelink.partner).length
        ) {
          setFieldValue(
            `partner.centrelinkPayment`,
            incomeFromCentrelink.partner.paymentType
          );
          setFieldValue(
            `partner.allowCarerAllowance`,
            incomeFromCentrelink.partner.paymentType
          );
          setFieldValue(
            `partner.isClientRenting`,
            incomeFromCentrelink.partner.paymentType
          );
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
    const bankAccountArray = incomeFromCentrelink.clientFK || "";

    try {
      let res;
      if (!bankAccountArray) {
        res = await PostAxios(
          `${DefaultUrl}/api/incomeFromCentrelink/Add`,
          obj
        );
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/incomeFromCentrelink/Update`,
          obj
        );
      }

      if (res) {
        console.log(res);
        const updatedData = {
          ...questionDetail,
          incomeFromCentrelink: res,
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

  let paymentType = [
 
    { value: "Age Pension", label: "Age Pension" },
    { value: "Disability Pension", label: "Disability Pension" },
    { value: "Carer Payment", label: "Carer Payment" },
    { value: "Carer Allowance", label: "Carer Allowance" },
    { value: "Jobseeker", label: "Jobseeker" },
    { value: "Family Tax Benefit A", label: "Family Tax Benefit A" },
    { value: "Family Tax Benefit B", label: "Family Tax Benefit B" },
    { value: "Rent Assistance", label: "Rent Assistance" },
    { value: "No", label: "No" },
  ];


  let CheckMultiSelect = (value, setFieldValue, currentInput) => {
    let selectedArray = currentInput.value;

    // console.log(selectedArray);

    // Check if "No" is selected
    const hasNoValue = selectedArray.some((item) => item.value === "No");
    const noIndex = selectedArray.findIndex((item) => item.value === "No");

    // If only "No" is selected or if "No" is the last selection, set only ["No"]
    if (
      (selectedArray.length === 1 && hasNoValue) ||
      (selectedArray.length === 2 && hasNoValue && noIndex === 1)
    ) {
      setFieldValue(currentInput.name, ["No"]);
      return;
    }

    if (hasNoValue && selectedArray.length > 2) {
      // If "No" is present in a larger selection, prioritize it and set only ["No"]
      setFieldValue(currentInput.name, ["No"]);
    } else {
      // Filter out any "No" values and use the remaining selected items
      const filtered = selectedArray
        .filter((item) => item.value !== "No")
        .map((item) => item.value);
      setFieldValue(currentInput.name, filtered);
    }
  };

  const rowConfig = [
    {
      name: "centrelinkPayment",
      type: "select-multi",
      options: paymentType,
    },
    {
      name: "includeFromYear",
      type: "select",
      options: loanTermOptions,
    },
    {
      name: "allowCarerAllowance",
      type: "select-multi",
      options: paymentType,
      callBack: true,
      func: CheckMultiSelect,
    },
    {
      name: "isClientRenting",
      type: "select-multi",
      options: paymentType,
      callBack: true,
      func: CheckMultiSelect,
    },
    {
      name: "applySeparatedByIllness",
      type: "yesno",
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
                        <th>Centrelink Payment</th>
                        <th>Include From Year:</th>
                        <th>Allow Carer Allowance</th>
                        <th>Is Client Renting</th>
                        <th>Apply Separated By illness</th>
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

export default CashFlowCenterLink;
