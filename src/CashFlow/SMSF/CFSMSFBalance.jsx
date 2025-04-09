import React, { useEffect, useState, useCallback } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";
import InnerModal from "../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal";
import ApplyDeeming from "../Financial Investments/ApplyDeeming";
import {
  openNotificationSuccess,
  PostAxios,
  PostAxiosBlob,
  RenderName,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";
import {
  CashFlowData,
  CashFlowDownloading,
  CashFlowReCalculateLoading,
  defaultUrl,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";

const CFSMSFBalance = (props) => {
  const [disabledFlag, setDisabledFlag] = useState(true);
  const [flagState, setFlagState] = useState(false);
  const [modalObject, setModalObject] = useState({});

  let DefaultUrl = useRecoilValue(defaultUrl);
  let cashFlowData = useRecoilValue(CashFlowData);
  let [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);
  let [cashFlowDownloading, setCashFlowDownloading] =
    useRecoilState(CashFlowDownloading);

  const initialValues = {
    pensionType: "",
    commencePensionYear: "",
    applyDeeming: "",
    applyDeemingObj: {},
    totalSuperannuationBenefits: "",
    nominatedRolloverAmount: "No",
    nominatedRolloverAmountValue: "",
    taxFreeComponent: "",
  };

  const fillInitialValues = useCallback(
    (setFieldValue) => {
      if (
        props.modalObject?.values?.[
          props.modalObject.stakeHolder?.replace(".", "")
        ]
      ) {
        const SubObj =
          props.modalObject.values[
            props.modalObject.stakeHolder.replace(".", "")
          ];
        if (SubObj?.[`${props.modalObject.key}Obj`]) {
          const Data = SubObj[`${props.modalObject.key}Obj`];
          setFieldValue("pensionType", Data.pensionType || "");
          setFieldValue(
            "commencePensionYear",
            Data.commencePensionYear ? String(Data.commencePensionYear) : ""
          );
          setFieldValue("applyDeeming", Data.applyDeeming || "");
          setFieldValue("applyDeemingObj", Data.applyDeemingObj || {});
          setFieldValue(
            "totalSuperannuationBenefits",
            Data.totalSuperannuationBenefits || ""
          );
          setFieldValue(
            "nominatedRolloverAmount",
            Data.nominatedRolloverAmount || "No"
          );
          setFieldValue(
            "nominatedRolloverAmountValue",
            Data.nominatedRolloverAmountValue || ""
          );
          setFieldValue("taxFreeComponent", Data.taxFreeComponent || "");
        }
      }
    },
    [props.modalObject]
  );

  const onSubmit = (values) => {
    const { stakeHolder, key } = props.modalObject || {};
    if (stakeHolder && key) {
      props.setFieldValue(`${stakeHolder}${key}`, values.taxFreeComponent);
      props.setFieldValue(`${stakeHolder}${key}Obj`, values);
    }

    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  const yearsIncludedArray = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Year ${i + 1}`,
  }));

  const pensionTypeOptions = [
    { value: "Account-Based", label: "Account-Based" },
    { value: "Transition to Retirement", label: "Transition to Retirement" },
    { value: "Defined Benefit", label: "Defined Benefit" },
  ];

  const nominatedRolloverAmountOptions = [
    { value: "Partial", label: "Partial" },
    { value: "No", label: "No" },
    { value: "Full", label: "Full" },
  ];

  const handleInnerModal = (title, values, key, stakeHolder) => {
    setModalObject({
      title,
      values,
      key,
      stakeHolder,
      sourceObj: props.modalObject,
    });
    setFlagState(true);
  };

  const handleSelectInput = (values, setFieldValue, CurrentInput) => {
    if (CurrentInput?.value === "Partial") {
      setDisabledFlag(false);
    } else {
      setDisabledFlag(true);
      setFieldValue("nominatedRolloverAmountValue", "");
    }
  };

  const rowConfig = [
    {
      type: "plainText",
      text: props.modalObject?.stakeHolder?.replace(".", "") || "",
      styleSet: { fontWeight: "800", fontSize: "16px" },
    },
    {
      name: "pensionType",
      type: "select",
      options: pensionTypeOptions,
      placeholder: "Pension Type",
    },
    {
      name: "commencePensionYear",
      type: "select",
      options: yearsIncludedArray,
      placeholder: "Commence Pension in Year",
    },
    {
      name: "applyDeeming",
      type: "yesnoModal",
      placeholder: "Apply Deeming",
      callBack: true,
      innerModalTitle: "Apply Deeming",
      key: "applyDeeming",
      func: handleInnerModal,
    },
    {
      name: "totalSuperannuationBenefits",
      type: "number-toComma",
      placeholder: "Total Superannuation Benefits",
      disabled: true,
    },
    {
      name: "nominatedRolloverAmount",
      type: "select",
      placeholder: "Nominated Rollover amount",
      options: nominatedRolloverAmountOptions,
      callBack: true,
      func: handleSelectInput,
    },
    {
      name: "nominatedRolloverAmountValue",
      type: "number-toComma",
      placeholder: "Nominated Rollover amount",
      disabled: disabledFlag,
    },
    {
      name: "taxFreeComponent",
      type: "number-toComma",
      placeholder: "Tax-free Component",
    },
  ];

  const componentMapping = {
    "Apply Deeming": <ApplyDeeming />,
  };

  const ModalContent = (obj) => {
    return componentMapping[obj.title] || <div>No content available</div>;
  };

  let handleChildButtonClick = async (values, setFieldValue) => {
    try {
      let obj = JSON.parse(JSON.stringify(cashFlowData));

      obj.cf_SMSFPensionAccountDetails = props.modalObject.values;
      obj.cf_SMSFPensionAccountDetails[
        props.modalObject.stakeHolder.replace(".", "")
      ][props.modalObject.key + "Obj"] = values;

      console.log(
        JSON.stringify(
          obj.cf_SMSFPensionAccountDetails[
            props.modalObject.stakeHolder.replace(".", "")
          ][props.modalObject.key + "Obj"]
        )
      );

      // throw new Error("API call not implemented yet");

      let res = await PostAxios(
        `${DefaultUrl}/api/cal/SMSF/INPUTS_SMSF_Member_Balances`,
        obj
      );

      if (res) {
        console.log(res);

        let { cf_SMSFPensionAccountDetails } = res.data;

        let Data =
          cf_SMSFPensionAccountDetails?.[
            props.modalObject.stakeHolder.replace(".", "")
          ];

        console.log(Data);

        setFieldValue(
          "totalSuperannuationBenefits",
          Data.totalSuperannuationBenefits
        );

        setCashFlowReCalculateLoading(false);
        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          'Data of "' + props.modalObject.title + '" is Saved'
        );
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
      setCashFlowReCalculateLoading(false);
    }
  };

  let handleChildButtonDownloadClick = async (values, setFieldValue) => {
    try {
      let obj = JSON.parse(JSON.stringify(cashFlowData));

      obj.cf_SMSFPensionAccountDetails = props.modalObject.values;
      obj.cf_SMSFPensionAccountDetails[
        props.modalObject.stakeHolder.replace(".", "")
      ][props.modalObject.key + "Obj"] = values;

      console.log(
        JSON.stringify(
          obj.cf_SMSFPensionAccountDetails[
            props.modalObject.stakeHolder.replace(".", "")
          ][props.modalObject.key + "Obj"]
        )
      );

      try {
        const response = await PostAxiosBlob(
          `${DefaultUrl}/api/cal/workBookDownload`,
          obj
        );

        const fileName = `UpdatedWorkbook_of_${RenderName("client")}.xlsx`;

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        openNotificationSuccess(
          "success",
          "topRight",
          "Success Notification",
          `Excel file "${fileName}" is downloaded.`
        );
      } catch (error) {
        console.error("Download Error:", error);
        openNotificationSuccess(
          "error",
          "topRight",
          "Download Failed",
          "Something went wrong while downloading the Excel file."
        );
      } finally {
        setCashFlowDownloading(false); // Always hide loading spinner
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
      setCashFlowReCalculateLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {({ values, handleChange, setFieldValue, handleBlur }) => {
        useEffect(() => {
          fillInitialValues(setFieldValue);
        }, [fillInitialValues]);

        return (
          <Form>
            <Row>
              <InnerModal
                modalObject={modalObject}
                setFieldValue={setFieldValue}
                setFlagState={setFlagState}
                flagState={flagState}
              >
                {ModalContent(modalObject)}
              </InnerModal>

              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4">
                    <Table striped bordered responsive hover>
                      <thead>
                        <tr>
                          <th>Owner</th>
                          <th>Pension Type</th>
                          <th>Commence Pension in Year</th>
                          <th>Apply Deeming</th>
                          <th>Total Superannuation Benefits</th>
                          <th colSpan={2}>Nominated Rollover amount</th>
                          <th>Tax-free Component</th>
                        </tr>
                      </thead>
                      <tbody>
                        <DynamicTableRow
                          rowConfig={rowConfig}
                          values={values}
                          setFieldValue={setFieldValue}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                        />
                      </tbody>
                    </Table>
                    <button
                      ref={props.childButtonRef}
                      onClick={() => {
                        handleChildButtonClick(values, setFieldValue);
                      }}
                      style={{ display: "none" }} // Hidden button
                      type="button"
                    >
                      Hidden Child Button
                    </button>
                    <button
                      ref={props.childButtonDownloadRef}
                      onClick={() => {
                        handleChildButtonDownloadClick(values, setFieldValue);
                      }}
                      style={{ display: "none" }} // Hidden button
                      type="button"
                    >
                      Hidden Child Button Download
                    </button>
                  </div>
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CFSMSFBalance;
