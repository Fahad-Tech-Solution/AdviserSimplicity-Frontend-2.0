import React, { useEffect, useState } from "react";
import DynamicTableRow from "../../Components/Assets/Dynamic/DynamicTableRow";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Row, Table } from "react-bootstrap";
import { Advisers, defaultUrl, Roles, Subscriptions } from "../../Store/Store";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
} from "../Assets/Api/Api";

const RoleForm = (props) => {
  let initialValues = {
    roleName: "",
    description: "",
  };

  let DefaultUrl = useRecoilValue(defaultUrl);
  let [advisers, setAdvisers] = useRecoilState(Advisers);
  let [roles, setRoles] = useRecoilState(Roles);

  let [isDisabled, setIsdisabled] = useState(false);

  let fillInitialValues = (setFieldValue) => {
    // console.log(props.modalObject);
    if (props.modalObject.Action.toLowerCase() == "edit") {
      let Data = props.modalObject.row;
      setFieldValue("roleName", Data.roleName);
      setFieldValue("description", Data.description);
      setFieldValue(
        "factFind",
        Data.permissions.includes("fact find") ? "Yes" : "No"
      );
      setFieldValue(
        "cashFlow",
        Data.permissions.includes("cashflow") ? "Yes" : "No"
      );
      setFieldValue(
        "prospects",
        Data.permissions.includes("prospects") ? "Yes" : "No"
      );
    } else if (props.modalObject.Action.toLowerCase() == "view") {
      let Data = props.modalObject.row;
      setFieldValue("roleName", Data.roleName);
      setFieldValue("description", Data.description);
      setFieldValue(
        "factFind",
        Data.permissions.includes("fact find") ? "Yes" : "No"
      );
      setFieldValue(
        "cashFlow",
        Data.permissions.includes("cashflow") ? "Yes" : "No"
      );
      setFieldValue(
        "prospects",
        Data.permissions.includes("prospects") ? "Yes" : "No"
      );
      setIsdisabled(true);
    }
  };

  let onSubmit = async (values, { resetForm }) => {
    try {
      let res = "";
      let Obj = {
        roleName: values.roleName,
        description: values.description,
        permissions: [],
      };

      // Mapping of keys in `values` → module names
      const permissionsMap = {
        factFind: "fact find",
        cashFlow: "cashflow",
        prospects: "prospects",
      };

      // Loop over the permission keys
      for (const [key, moduleName] of Object.entries(permissionsMap)) {
        if (values[key] && values[key].toLowerCase() === "yes") {
          Obj.permissions.push(moduleName);
        }
      }

      if (props.modalObject.Action.toLowerCase() == "newrole") {
        res = await PostAxios(DefaultUrl + "/api/role/Add", Obj);
        if (res) {
          setRoles((prev) => [...prev, res]);
          openNotificationSuccess(
            "success",
            "topRight",
            "New Role Added",
            "New user role is added"
          );
        }
      } else if (props.modalObject.Action.toLowerCase() == "edit") {
        Obj._id = props.modalObject.row._id;
        res = await PatchAxios(DefaultUrl + "/api/role/Update", Obj);
        if (res) {
          setRoles((prev) =>
            prev.map((item) =>
              item._id === props.modalObject.row._id ? res : item
            )
          );
          openNotificationSuccess(
            "success",
            "topRight",
            "Role is Updated",
            "User role is updated"
          );
        }
      }
    } catch (error) {
      console.log("Something went wrong:", error);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Notification",
        error?.response?.data?.error || "Some thing went wrong"
      );
    } finally {
      resetForm();
      if (props.flagState) {
        props.setFlagState(false);
      }
    }
  };

  const rowConfig = [
    {
      name: "roleName",
      type: "text",
      placeholder: "Role Name",
      disabled: isDisabled,
    },
    {
      name: "description",
      type: "text",
      placeholder: "Description",
      disabled: isDisabled,
    },
    {
      name: "factFind",
      type: "yesno",
      disabled: isDisabled,
    },
    {
      name: "cashFlow",
      type: "yesno",
      disabled: isDisabled,
    },
    {
      name: "prospects",
      type: "yesno",
      disabled: isDisabled,
    },
  ];

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
              <div className="col-md-12 All_Client reportSection">
                <div className="row justify-content-center mt-4">
                  <Table striped bordered responsive hover>
                    <thead>
                      <tr>
                        <th
                          onClick={() => {
                            console.log(isDisabled);
                          }}
                        >
                          Role Name
                        </th>
                        <th>Description</th>
                        <th>Fact Find</th>
                        <th>Cash Flow</th>
                        <th>Prospects</th>
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
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RoleForm;
