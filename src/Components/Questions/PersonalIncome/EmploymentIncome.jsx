import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  defaultUrl,
  PersonalDetailsData,
  QuestionDetail,
} from "../../../Store/Store";
import {
  ConvertDate,
  ConvertDate2,
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
} from "../../Assets/Api/Api";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import SalaryPackage from "./SalaryPackage";
import LeaveEntitlementsModal from "./LeaveEntitlementsModal";
import SalaryPackaging from "./SalaryPackaging";
import {
  AntdCreatableMultiSelect,
  CreatableMultiSelectField,
} from "../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

<<<<<<< HEAD
=======
const AntDTableHOC = DynamicTableForInputsSection("antd");

>>>>>>> origin/master
const EmploymentIncome = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  const personalDetailObj = useRecoilValue(PersonalDetailsData);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));

  let incomeFromOwnBusiness =
    Object.keys(questionDetail.incomeFromOwnBusiness || {}).length > 0
      ? questionDetail.incomeFromOwnBusiness
      : {
          client: [],
          partner: [],
          joint: [],
        }; // Use an empty object as default if incomeFromOwnBusiness is undefined

  let initialValues = {
    owner: "",
  };

  const fillInitialValues = (setFieldValue) => {
    let userStatus = localStorage.getItem("UserStatus");

    if (incomeFromOwnBusiness && incomeFromOwnBusiness._id) {
      setFieldValue("owner", incomeFromOwnBusiness.owner);

      // Check for client ownership
      if (incomeFromOwnBusiness.owner.includes("client")) {
        setFieldValue(
          "client.occupation",
          incomeFromOwnBusiness.client.occupation
        );
        setFieldValue(
          "client.employmentStatus",
          incomeFromOwnBusiness.client.employmentStatus
        );
        setFieldValue(
          "client.nameOfCompany",
          incomeFromOwnBusiness.client.nameOfCompany
        );
        setFieldValue(
          "client.startDate",
          incomeFromOwnBusiness.client.startDate
        );
        setFieldValue(
          "client.hoursWorked",
          incomeFromOwnBusiness.client.hoursWorked
        );
        setFieldValue(
          "client.choiceOfFund",
          incomeFromOwnBusiness.client.choiceOfFund
        );
        setFieldValue(
          "client.SalaryPackageModal",
          incomeFromOwnBusiness.client.SalaryPackageModal
        );
        setFieldValue(
          "client.salaryPackagingRadio",
          incomeFromOwnBusiness.client.salaryPackagingRadio
        );
        setFieldValue(
          "client.SalaryPackagingModal",
          incomeFromOwnBusiness.client.SalaryPackagingModal
        );
        setFieldValue(
          "client.leaveEntitlementsRadio",
          incomeFromOwnBusiness.client.leaveEntitlementsRadio
        );
        setFieldValue(
          "client.LeaveEntitlementsModal",
          incomeFromOwnBusiness.client.LeaveEntitlementsModal
        );
      }

      // Check for partner ownership
      if (
        incomeFromOwnBusiness.owner.includes("partner") &&
        userStatus === "Married"
      ) {
        setFieldValue(
          "partner.occupation",
          incomeFromOwnBusiness.partner.occupation
        );
        setFieldValue(
          "partner.employmentStatus",
          incomeFromOwnBusiness.partner.employmentStatus
        );
        setFieldValue(
          "partner.nameOfCompany",
          incomeFromOwnBusiness.partner.nameOfCompany
        );
        setFieldValue(
          "partner.startDate",
          incomeFromOwnBusiness.partner.startDate
        );
        setFieldValue(
          "partner.hoursWorked",
          incomeFromOwnBusiness.partner.hoursWorked
        );
        setFieldValue(
          "partner.choiceOfFund",
          incomeFromOwnBusiness.partner.choiceOfFund
        );
        setFieldValue(
          "partner.SalaryPackageModal",
          incomeFromOwnBusiness.partner.SalaryPackageModal
        );
        setFieldValue(
          "partner.salaryPackagingRadio",
          incomeFromOwnBusiness.partner.salaryPackagingRadio
        );
        setFieldValue(
          "partner.SalaryPackagingModal",
          incomeFromOwnBusiness.partner.SalaryPackagingModal
        );
        setFieldValue(
          "partner.leaveEntitlementsRadio",
          incomeFromOwnBusiness.partner.leaveEntitlementsRadio
        );
        setFieldValue(
          "partner.LeaveEntitlementsModal",
          incomeFromOwnBusiness.partner.LeaveEntitlementsModal
        );
      }
    } else {
      // Optional: Handle the case where incomeFromOwnBusiness does not exist
    }
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

  let onSubmit = async (values) => {
    console.log(JSON.stringify(values));

    let userStatus = localStorage.getItem("UserStatus");
    let obj = values;

    obj.clientFK = localStorage.getItem("UserID");

    // Check for client ownership
    if (values.owner.includes("client")) {
      obj.clientTotal = obj.client.SalaryPackageModal.grossSalary;
    } else {
      obj.clientTotal = "";
      obj.client = {};
    }

    // Check for partner ownership
    if (values.owner.includes("partner")) {
      obj.partnerTotal = obj.partner.SalaryPackageModal.grossSalary;
    } else {
      obj.partnerTotal = "";
      obj.partner = {};
    }

    // Handle status condition
    if (userStatus !== "Married") {
      obj.partnerTotal = "";
      obj.partner = {};
    }

    try {
      let res;

      if (
        !questionDetail.incomeFromOwnBusiness ||
        !questionDetail.incomeFromOwnBusiness.clientFK
      ) {
        res = await PostAxios(
          `${DefaultUrl}/api/incomeFromOwnBusiness/Add`,
          obj
        );
      } else {
        res = await PatchAxios(
          `${DefaultUrl}/api/incomeFromOwnBusiness/Update`,
          obj
        );
      }

      if (res) {
<<<<<<< HEAD
        console.log(res);
=======
        // console.log(res);
>>>>>>> origin/master
        const updatedData = { ...questionDetail, incomeFromOwnBusiness: res };
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
          '" is not Saved. Please try again.'
      );
    }
  };

  // title, key, values
  let handleInnerModal = (title, values, key, parentKey) => {
    setModalObject({
      title,
      key,
      parentValues: values,
      parentKey,
    });
    setFlagState(true);
  };

<<<<<<< HEAD
  const options = ["Single", "Widowed"].includes(
=======
  const options = !["Single", "Widowed"].includes(
>>>>>>> origin/master
    personalDetailObj.client?.MaritalStatus
  )
    ? [
        {
          value: "client",
          label: personalDetailObj.client?.clientPreferredName,
        },
        {
          value: "partner",
          label: personalDetailObj.partner?.partnerPreferredName,
        },
      ]
    : [
        {
          value: "client",
          label: personalDetailObj.client?.clientPreferredName,
        },
      ];

<<<<<<< HEAD
  const AntDTableHOC = DynamicTableForInputsSection("antd");

=======
>>>>>>> origin/master
  const columns = [
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      type: "text", // simple static text or could be DynamicFormField if editable
      placeholder: "Enter Owner Name",
      width: 150,
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
      type: "text",
      placeholder: "Enter Occupation",
      width: 200,
    },
    {
      title: "Employment Status",
      dataIndex: "employmentStatus",
      key: "employmentStatus",
      type: "select",
      placeholder: "Select Employment Status",
      options: [
        { label: "Full Time", value: "Full Time" },
        { label: "Part Time", value: "Part Time" },
        { label: "Casual", value: "Casual" },
        { label: "Contract", value: "Contract" },
        { label: "On Leave", value: "OnLeave" },
      ],
      width: 200,
    },
    {
      title: "Name of Company",
      dataIndex: "nameOfCompany",
      key: "nameOfCompany",
      type: "text",
      placeholder: "Enter Company Name",
      width: 200,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      type: "antdate",
      placeholder: "dd/mm/yyyy",
      width: 200,
    },
    {
      title: "Hours Worked",
      dataIndex: "hoursWorked",
      key: "hoursWorked",
      type: "number",
      placeholder: "Enter Hours Worked",
      width: 200,
    },
    {
      title: "Salary Detail",
      dataIndex: "salaryPackage",
      key: "SalaryPackageModal",
      type: "modal", // 🔥 handled by DynamicFormField as button modal
      width: 150,
      handleInnerModal: handleInnerModal,
      innerModalTitle: "Salary Detail",
<<<<<<< HEAD
      Drawerheight: 220,
      DrawerWidth: "80%",
      PopoverContent: (
        innerModalTitle,
        values,
        all,
        stakeHolder,
        setFieldValue
      ) => {
        let modalObject = {
          title: innerModalTitle,
          key: all.key,
          parentValues: values,
          parentKey: stakeHolder,
        };
        return (
          <div
            style={{
              height: "80px",
              margin: "-20px 0px 0px 0px",
            }}
          >
            <SalaryPackage
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
            />
          </div>
        );
      },
=======
>>>>>>> origin/master
    },
    {
      title: "Salary Packaging",
      dataIndex: "salaryPackagingRadio",
      key: "SalaryPackaging",
      type: "yesnoModal", // yes/no with modal
      width: 170,
      callBack: true,
      func: handleInnerModal,
<<<<<<< HEAD
      innerModalTitle: "Salary Packaging",
      Drawerheight: 220,
      DrawerWidth: "80%",
      PopoverContent: (
        innerModalTitle,
        values,
        all,
        stakeHolder,
        setFieldValue
      ) => {
        let modalObject = {
          title: innerModalTitle,
          key: all.key,
          parentValues: values,
          parentKey: stakeHolder,
        };

        return (
          <div
            style={{
              height: "80px",
              margin: "-20px 0px 0px 0px",
            }}
          >
            <SalaryPackaging
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
            />
          </div>
        );
      },
=======
      handleInnerModal: handleInnerModal,
      innerModalTitle: "Salary Packaging",
>>>>>>> origin/master
    },
    {
      title: "Leave Entitlements",
      dataIndex: "leaveEntitlementsRadio",
      key: "LeaveEntitlementsModal",
      type: "yesnoModal",
      width: 170,
      handleInnerModal: handleInnerModal,
      callBack: true,
      func: handleInnerModal,
      innerModalTitle: "Leave entitlements",
<<<<<<< HEAD
      Drawerheight: 320,
      DrawerWidth: "60%",
      PopoverContent: (
        innerModalTitle,
        values,
        all,
        stakeHolder,
        setFieldValue
      ) => {
        let modalObject = {
          title: innerModalTitle,
          key: all.key,
          parentValues: values,
          parentKey: stakeHolder,
        };

        return (
          <div
            style={{
              height: "80px",
              margin: "-20px 0px 0px 0px",
            }}
          >
            <LeaveEntitlementsModal
              modalObject={modalObject}
              setFieldValue={setFieldValue}
              setFlagState={setFlagState}
              flagState={flagState}
            />
          </div>
        );
      },
=======
>>>>>>> origin/master
    },
    {
      title: "Choice of Fund",
      dataIndex: "choiceOfFund",
      key: "choiceOfFund",
      type: "yesno",
      width: 150,
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, setFieldValue, setValues, handleChange, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        // inside your component that has Formik's values
        const tableData = useMemo(() => {
          const rows = [];

          if (values.owner.includes("client")) {
            rows.push({
              key: "client",
              stakeHolder: "client", // 🔥 pass this to renderCell
              owner: RenderName("client"),
              occupation: values?.client?.occupation || "",
              employmentStatus: values?.client?.employmentStatus || "",
              nameOfCompany: values?.client?.nameOfCompany || "",
              startDate: values?.client?.startDate || "",
              hoursWorked: values?.client?.hoursWorked || "",
              salaryPackage:
                values?.client?.SalaryPackageModal?.grossSalary || "",
              salaryPackagingRadio: values?.client?.salaryPackagingRadio || "",
              leaveEntitlementsRadio:
                values?.client?.leaveEntitlementsRadio || "",
              choiceOfFund: values?.client?.choiceOfFund || "",
            });
          }

          if (values.owner.includes("partner")) {
            rows.push({
              key: "partner",
              stakeHolder: "partner",
              owner: RenderName("partner"),
              occupation: values?.partner?.occupation || "",
              employmentStatus: values?.partner?.employmentStatus || "",
              nameOfCompany: values?.partner?.nameOfCompany || "",
<<<<<<< HEAD
              startDate: values?.partner?.startDate
                ? ConvertDate(values.partner.startDate)
                : null,
=======
              startDate: values?.partner?.startDate || "",
>>>>>>> origin/master
              hoursWorked: values?.partner?.hoursWorked || "",
              salaryPackage:
                values?.partner?.SalaryPackageModal?.grossSalary || "",
              salaryPackagingRadio: values?.partner?.salaryPackagingRadio || "",
              leaveEntitlementsRadio:
                values?.partner?.leaveEntitlementsRadio || "",
              choiceOfFund: values?.partner?.choiceOfFund || "",
            });
          }

          return rows;
        }, [values]);

        return (
          <Form>
            <div className="row">
              <InnerModal
                modalObject={modalObject}
                setFieldValue={setFieldValue}
                setFlagState={setFlagState}
                flagState={flagState}
              >
                {modalObject.key === "SalaryPackageModal" ? (
                  <SalaryPackage />
                ) : modalObject.key === "SalaryPackaging" ? (
                  <SalaryPackaging />
                ) : modalObject.key === "LeaveEntitlementsModal" ? (
                  <LeaveEntitlementsModal />
                ) : (
                  ""
                )}
              </InnerModal>

              <div className="col-md-12">
                <div className="d-flex flex-row justify-content-center align-items-center gap-4">
                  <label
                    htmlFor=""
                    className="text-end"
                    onClick={() => {
<<<<<<< HEAD
                      console.log(options);
                    }}
                  >
                    Order
=======
                      console.log(values, props.handleOk);
                    }}
                  >
                    Owner
>>>>>>> origin/master
                  </label>

                  <div style={{ minWidth: "200px" }}>
                    <Field
                      name={`owner`}
                      component={AntdCreatableMultiSelect}
                      options={options}
                      onChangefun={() => {}}
                    />
                  </div>
                </div>
              </div>

              {values.owner.length > 0 && (
                <div className="col-md-12">
                  <div className="mt-4 All_Client reportSection">
                    <AntDTableHOC
                      columns={columns}
                      data={tableData}
                      values={values}
                      setFieldValue={setFieldValue}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
<<<<<<< HEAD
=======
                      handleSubmit={props?.handleOk}
>>>>>>> origin/master
                    />
                  </div>
                </div>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EmploymentIncome;
