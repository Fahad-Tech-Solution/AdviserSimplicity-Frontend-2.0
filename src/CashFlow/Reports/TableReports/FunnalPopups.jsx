import { Field, Form, Formik } from "formik";
import React from "react";
import { List } from "antd";

const FunnalPopups = (props) => {
  const initialValues = {};

  const onSubmit = async (values) => {
    if (props.flagState) {
      props.setFlagState(false);
    }
  };

  // Safe access to props
  const { modalObject = {} } = props;
  const { item = {}, yearSelected = 1 } = modalObject;
  const popupArray = item.popupArray || [];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      innerRef={props.formRef}
    >
      {() => (
        <Form>
          <div className="px-2 d-flex justify-content-between align-items-center ">
            <div className="fw-bold" style={{ fontSize: 15 }}>
              Investment Metric
            </div>
            <div className="fw-bold" style={{ fontSize: 15 }}>
              Details / Allocation
            </div>
          </div>
          <List
            size="small"
            dataSource={popupArray}
            locale={{ emptyText: "No records available." }}
            renderItem={(entry) => {
              const rawValue = entry[`year${yearSelected}`] || "$0";
              if (props.modalObject?.Style2) {
                return (
                  <List.Item
                    style={{
                      padding: "0px 12px 6px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 15,
                      margin: "15px 0px 0px 0px",
                    }}
                  >
                    <div>{entry.investment || "-"}</div>
                    <div>{entry.details || "-"}</div>
                  </List.Item>
                );
              }
              if (rawValue !== "$0") {
                return (
                  <List.Item
                    style={{
                      padding: "0px 12px 6px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 15,
                      margin: "15px 0px 0px 0px",
                    }}
                  >
                    <div>{entry.type || "-"}</div>
                    <div>{rawValue}</div>
                  </List.Item>
                );
              }
            }}
          />
          {item?.amount && (
            <div
              style={{
                borderTop: "1px solid #f0f0f0",
                marginTop: 12,
                paddingTop: 10,
                textAlign: "right",
                fontWeight: 600,
                fontSize: 16,
                display: "flex",
                justifyContent: "space-between",
              }}
              className="text-green fw-bold"
            >
              <div>Total:</div> <div>{item.amount || "$0"}</div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default FunnalPopups;
