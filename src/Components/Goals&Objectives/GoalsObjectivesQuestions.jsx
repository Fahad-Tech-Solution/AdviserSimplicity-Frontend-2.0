import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, GQState } from "../../Store/Store";
import { Form, Formik } from "formik";
import { PatchAxios, PostAxios } from "../Assets/Api/Api";
import { Image, Row } from "react-bootstrap";

const GoalsObjectivesQuestions = (props) => {
  let [GQObject, setGQObject] = useRecoilState(GQState);
  let DefaultUrl = useRecoilValue(defaultUrl);

  const handleResponse = (values) => {
    setGQObject(values);
  };

  const onSubmit = async (values) => {
    let obj = JSON.parse(JSON.stringify(values));
    obj.clientFK = localStorage.getItem("UserID") || "";
    console.log(obj, "FinalOBject");
    try {
      if (!GQObject.clientFK) {
        const PostRes = await PostAxios(
          `${DefaultUrl}/api/goalsQuestions/Add`,
          obj
        );
        if (PostRes) {
          if (props.flagState) {
            props.setFlagState(false);
          }
          handleResponse(PostRes);
        }
      } else {
        obj.__v = undefined;
        const PatchRes = await PatchAxios(
          `${DefaultUrl}/api/goalsQuestions/Update`,
          obj
        );
        if (PatchRes) {
          if (props.flagState) {
            props.setFlagState(false);
          }
          handleResponse(PatchRes);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const goalsClick = (index, elem, values, setFieldValue) => {
    console.log("image clicked in goals", index, elem.key, values);
    if (values[elem.key] == "No") {
      setFieldValue(elem.key, "Yes");
    }
    if (values[elem.key] == "Yes") {
      setFieldValue(elem.key, "No");
    }
  };
  return (
    <div className="container-fluid">
      <div className="row m-0">
        <Formik
          initialValues={GQObject}
          onSubmit={onSubmit}
          enableReinitialize
          innerRef={props.formRef}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <div className="col-md-12 text-center">
                <Row className="justify-content-center">
                  {props.modalObject.allGoals.map((elem, index) => {
                    return (
                      <div className="col-md-4 px-2 pb-3 d-flex ">
                        <div className=" flex-grow-1 d-flex">
                          <div
                            className={`${values[elem.key] == "Yes" ? "customBorder p-3" : "border p-3"
                              }  flex-grow-1`}
                            onClick={() =>
                              goalsClick(index, elem, values, setFieldValue)
                            }
                          >
                            <div className="text-center">
                              <div className="mx-auto" style={{ width: "20%" }}>
                                <Image src={elem.img} fluid />
                              </div>
                            </div>
                            <label htmlFor={elem.key} className="form-label">
                              {elem.title}
                            </label>
                          </div>
                         
                        </div>
                      </div>
                    );
                  })}
                </Row>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default GoalsObjectivesQuestions;
