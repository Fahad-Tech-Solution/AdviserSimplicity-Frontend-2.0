import React, { useEffect } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";
import {
  CashFlowData,
  CashFlowReCalculateLoading,
  defaultUrl,
} from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openNotificationSuccess,
  PostAxios,
  toCommaAndDollar,
} from "../../Components/Assets/Api/Api";

const RCV = (props) => {
  let DefaultUrl = useRecoilValue(defaultUrl);
  let cashFlowData = useRecoilValue(CashFlowData);
  let [cashFlowReCalculateLoading, setCashFlowReCalculateLoading] =
    useRecoilState(CashFlowReCalculateLoading);

  let initialValues = {
    RCV: "",
    RCVOther: "",
    communicationEndTerm: "",
  };

  let fillInitialValues = (setFieldValue) => {
    if (props.modalObject.values[props.modalObject.key]) {
      let SubObj = props.modalObject.values[props.modalObject.key];
      if (SubObj) {
        setFieldValue("RCV", SubObj.RCV);
        setFieldValue("RCVOther", SubObj.RCVOther);
        setFieldValue("communicationEndTerm", SubObj.communicationEndTerm);
      }
    }
  };

  let onSubmit = (values) => {
    console.log(JSON.stringify(values));

    props.setFieldValue(props.modalObject.key,values);

    // Reset the flag state if necessary
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  let rowConfig = [
    {
      type: "plainText",
      text: props.modalObject.stakeHolder.replace(".", ""),
      styleSet: { fontWeight: "800", fontSize: "16px" },
    },
    {
      name: "RCV",
      type: "number-toPercent",
      placeholder: "RCV",
    },
    {
      name: "RCVOther",
      type: "number-toComma",
      placeholder: "RCV Other",
      disabled: true,
    },
    {
      name: "communicationEndTerm",
      type: "number-toComma",
      placeholder: "Communication at End of Term",
    },
  ];

  let handleChildButtonClick = async (values, setFieldValue) => {
    try {
      let obj = JSON.parse(JSON.stringify(cashFlowData));

      obj.cf_annuities = props.modalObject.values;
      obj.cf_annuities[props.modalObject.stakeHolder.replace(".", "")][
        props.modalObject.key + "Obj"
      ] = values;

      console.log(
        JSON.stringify(
          obj.cf_annuities[props.modalObject.stakeHolder.replace(".", "")]
        )
      );

      // throw new Error("API call not implemented yet");

      let res = await PostAxios(
        `${DefaultUrl}/api/cal/financialInvestment/INPUTS_Annuities`,
        obj
      );

      if (res) {
        console.log(res);

        let { cf_annuities } = res.data;

        setFieldValue(
          "RCVOther",
          toCommaAndDollar(
            cf_annuities[props.modalObject.stakeHolder.replace(".", "")]
              .RCVOther
          )
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
        }, []);

        return (
          <Form>
            <Row>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="mt-4">
                    <Table striped bordered responsive hover>
                      <thead>
                        <tr>
                          <th>Owner</th>
                          <th>RCV</th>
                          <th>RCV Other</th>
                          <th>Communication at End of Term</th>
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
                      Hidden
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

export default RCV;
