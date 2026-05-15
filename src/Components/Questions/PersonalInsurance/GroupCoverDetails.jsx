import React, { useEffect, useMemo, useState } from "react";
import { Formik, Form } from "formik";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";
import { RenderName, toCommaAndDollar } from "../../Assets/Api/Api";

import { Grid } from "antd";
import { BankDetail } from "../../../Store/Store";
import { useRecoilValue } from "recoil";
const { useBreakpoint } = Grid;
const AntdTable = DynamicTableForInputsSection("antd");

const GroupCoverDetails = (props) => {
  const [UserStatus] = useState(localStorage.getItem("UserStatus"));

  const screens = useBreakpoint();
  const BankDetailObj = useRecoilValue(BankDetail);
  // let index = parseFloat(
  //   props.modalObject.stakeHolder.replace(/[^0-9-]+/g, "")
  // );
  // let BaseKey = props.modalObject.stakeHolder.split(".").map((item, idx) => {
  //   return item.replace(/[^a-zA-Z]+/g, "");
  // });

  const existingData = props?.modalObject?.groupCoverValues || {};

  const initialValues = {
    lifeInsured:
      RenderName(props?.modalObject?.stakeHolder.split(".")[0]) || "",
  };

  // Prefill initial values and ensure at least one row exists
  const fillInitialValues = (setFieldValue) => {
    // If no existing data, create one empty row
    if (Object.keys(existingData).length) {
      // Object.keys(existingData).forEach((field) => {
      //   setFieldValue(field, existingData[field] || "");
      // });
      setFieldValue("provider", existingData?.platformName || "");
      setFieldValue("policyNo", existingData?.memberNumber || "");
      setFieldValue(
        "life",
        existingData?.groupInsuranceDetails?.lifeCover || "$0"
      );
      setFieldValue(
        "tpd",
        existingData?.groupInsuranceDetails?.TPDCover || "$0"
      );

      console.log(
        "ip value is :",
        existingData?.groupInsuranceDetails?.monthlyIncome
      );
      
      let ip =
        existingData?.groupInsuranceDetails?.monthlyIncome &&
        existingData?.groupInsuranceDetails?.monthlyIncome !== "$0"
          ? (existingData?.groupInsuranceDetails?.monthlyIncome || "$0") +
            "/" +
            (existingData?.groupInsuranceDetails?.waitingPeriod || "30") +
            " Days/" +
            (existingData?.groupInsuranceDetails?.BenefitPeriod || "2 Years")
          : "$0";

      setFieldValue("ip", ip || "$0");
      setFieldValue("groupOwner", "Super Trustee");
      setFieldValue("loadingExclusion", "No");

      const toNumber = (val) =>
        Number(String(val || "$0").replace(/[^0-9.-]+/g, "")) || 0;

      const total =
        toNumber(existingData?.groupInsuranceDetails?.cost) +
        toNumber(existingData?.groupInsuranceDetails?.cost2);

      setFieldValue("premiumPA", toCommaAndDollar(total));
    }
  };

  const columns = [
    {
      title: "No#",
      dataIndex: "index",
      key: "index",
      render: (_, __, i) => i + 1,
      justText: true,
      width: 60,
    },
    // {
    //   title: "Life Insured",
    //   dataIndex: "lifeInsured",
    //   key: "lifeInsured",
    //   selectedOptionValue: true,
    //   justText: true,
    //   type: "select-antd",
    // },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
      type: "select",
      placeholder: "Provider",
      width: 150,
      selectedOptionValue: true,
      options:
        BankDetailObj?.SuperannuationFunds?.map((elem) => ({
          value: elem._id,
          label: elem.platformName,
        })) || [],
    },
    {
      title: "Policy no",
      dataIndex: "policyNo",
      key: "policyNo",
      type: "text",
      placeholder: "Policy No",
      width: 150,
    },
    {
      title: "Owner",
      dataIndex: "groupOwner",
      key: "groupOwner",
      type: "select-antd",
      placeholder: "Select Owner",
      options: [
        { value: "Client", label: RenderName("client") },
        ...(UserStatus !== "Single"
          ? [{ value: "Partner", label: RenderName("partner") }]
          : []),
        { value: "SMSF", label: "SMSF" },
        { value: "Super Trustees", label: "Super Trustees" },
        { value: "Company (Pty Ltd)", label: "Company (Pty Ltd)" },
        { value: "Family Trust", label: "Family Trust" },
        { value: "Other", label: "Other" },
      ],
      width: 180,
    },
    {
      title: "Life",
      dataIndex: "life",
      key: "life",
      type: "number-toComma",
      placeholder: "Life",
      width: 120,
    },
    {
      title: "TPD",
      dataIndex: "tpd",
      key: "tpd",
      type: "number-toComma",
      placeholder: "TPD",
      width: 120,
    },
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
      type: "text",
      placeholder: "IP",
      width: 120,
    },
    {
      title: "Premium $ p.a",
      dataIndex: "premiumPA",
      key: "premiumPA",
      type: "number-toComma",
      placeholder: "Premium",
      width: 150,
    },
    {
      title: "Loading/ Exclusion",
      dataIndex: "loadingExclusion",
      key: "loadingExclusion",
      type: "yesno",
      width: screens.xxl ? 132 : 120,
    },
  ];

  const onSubmit = (values) => {
    console.log(values);
    props.setFieldValue(
      props.modalObject.stakeHolder + props.modalObject.key,
      values
    );
    if (props.flagState) {
      props.setFlagState(false);
      props.setIsEditing?.((prev) => !prev);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      innerRef={props.formRef}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleBlur, handleChange }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, []);

        const tableRows = useMemo(() => {
          // If we have existing data, use it
          if (Object.keys(values).length > 0) {
            return [
              {
                key: "SuperFundGroupInsuranceDetails",
                ...values,
              },
            ];
          }

          // Otherwise, create one empty row
          return [
            {
              key: 0,
              provider: "",
              policyNo: "",
              groupOwner: "",
              startDate: "",
              smoker: "No",
              life: "",
              tpd: "",
              trauma: "",
              ip: "",
              premiumPA: "",
              loadingExclusion: "No",
              beneficiary: "No",
            },
          ];
        }, [values]);

        return (
          <Form>
            <div className="mt-4 All_Client reportSection">
              <AntdTable
                columns={columns}
                data={tableRows}
                values={values}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isEditing={props.isEditing}
                setIsEditing={props.setIsEditing}
              />
            </div>

            <button type="submit" style={{ display: "none" }}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default GroupCoverDetails;
