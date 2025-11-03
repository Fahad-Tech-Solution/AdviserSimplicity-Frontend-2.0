import { Field, Form, Formik } from "formik";
import React, { useEffect, useState, useMemo } from "react";
import { Button, InputGroup, Row, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { defaultUrl, QuestionDetail } from "../../../Store/Store";
import {
  openNotificationSuccess,
  PatchAxios,
  PostAxios,
  RenderName,
  toCommaAndDollar,
} from "../../Assets/Api/Api";
import InnerModal from "../FinancialInvestments/QuestionsDetail/InnerModal";
import DynamicYesNo from "../FinancialInvestments/QuestionsDetail/DynamicYesNo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import Beneficiaries from "../FinancialInvestments/QuestionsDetail/Beneficiaries";
import AccumulationBenefits from "./AccumulationBenefits";
import Contributions from "../FinancialInvestments/QuestionsDetail/Contributions";
import {
  AntdCreatableMultiSelect,
  CreatableMultiSelectField,
} from "../FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import DynamicTableForInputsSection from "../../Assets/Table/DynamicTableForInputsSection";

const SmsfAccumulationDetails = (props) => {
  let questionDetail = useRecoilValue(QuestionDetail);
  let [questionDetailObj, setQuestionDetail] = useRecoilState(QuestionDetail);
  let [ShowError, setShowError] = useState({});

  let [UserStatus] = useState(localStorage.getItem("UserStatus"));

  let [nameSet] = useState(() => {
    if (props.modalObject.Input === "client") {
      return localStorage.getItem("UserName");
    } else if (props.modalObject.Input === "partner") {
      return localStorage.getItem("PartnerName");
    } else if (props.modalObject.Input === "joint") {
      return (
        localStorage.getItem("UserName") +
        " & " +
        localStorage.getItem("PartnerName")
      );
    }
  });
  const AntDTableHOC = DynamicTableForInputsSection("antd");

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let SMSFAccumulationDetails =
    Object.keys(questionDetail.SMSFAccumulationDetails).length > 0
      ? questionDetail.SMSFAccumulationDetails
      : {
          client: [],
          partner: [],
          joint: [],
        }; // Use an empty object as default if SMSFAccumulationDetails is undefined

  let initialValues = {
    member: [],
  };

  // const fillInitialValues = (setFieldValue) => {
  //   try {
  //     console.log(
  //       SMSFAccumulationDetails,
  //       "fillInitialValues SMSFAccumulationDetails"
  //     );

  //     if (SMSFAccumulationDetails.member) {
  //       console.log(SMSFAccumulationDetails.member, "member array");
  //       setFieldValue("member", SMSFAccumulationDetails.member || []);

  //       const clientIndex = SMSFAccumulationDetails.member.includes("client")
  //         ? SMSFAccumulationDetails.member.indexOf("client")
  //         : -1;
  //       // console.log(clientIndex, "client index");
  //       const partnerIndex = SMSFAccumulationDetails.member.includes("partner")
  //         ? SMSFAccumulationDetails.member.indexOf("partner")
  //         : -1;

  //       Array.from({ length: SMSFAccumulationDetails.member.length }).map(
  //         (_, i) => {
  //           if (clientIndex === i) {
  //             SMSFAccumulationDetails.client.forEach((element) => {
  //               setFieldValue(
  //                 "accumulationBenefits" + i,
  //                 element.accumulationBenefits
  //               );
  //               setFieldValue(
  //                 "accumulationBenefitsarray" + i,
  //                 element.accumulationBenefitsarray
  //               );
  //               setFieldValue("contributions" + i, element.contributions);
  //               setFieldValue(
  //                 "contributionsArray" + i,
  //                 element.contributionsArray
  //               );
  //               setFieldValue(
  //                 "nominatedBeneficiaries" + i,
  //                 element.nominatedBeneficiaries
  //               );
  //               setFieldValue(
  //                 "beneficiariesArray" + i,
  //                 element.beneficiariesArray
  //               );
  //             });
  //           } else if (partnerIndex === i) {
  //             SMSFAccumulationDetails.partner.forEach((element) => {
  //               setFieldValue(
  //                 "accumulationBenefits" + i,
  //                 element.accumulationBenefits
  //               );
  //               setFieldValue(
  //                 "accumulationBenefitsarray" + i,
  //                 element.accumulationBenefitsarray
  //               );
  //               setFieldValue("contributions" + i, element.contributions);
  //               setFieldValue(
  //                 "contributionsArray" + i,
  //                 element.contributionsArray
  //               );
  //               setFieldValue(
  //                 "nominatedBeneficiaries" + i,
  //                 element.nominatedBeneficiaries
  //               );
  //               setFieldValue(
  //                 "beneficiariesArray" + i,
  //                 element.beneficiariesArray
  //               );
  //             });
  //           }
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.error(
  //       "An error occurred while initializing values in fillInitialValues:",
  //       error
  //     );
  //   }
  // };
const fillInitialValues = (setFieldValue) => {
  try {
    console.log(SMSFAccumulationDetails, "fillInitialValues SMSFAccumulationDetails");

    // 1️⃣ Set members array first
    if (SMSFAccumulationDetails.member) {
      setFieldValue("member", SMSFAccumulationDetails.member);
    }

    // 2️⃣ Set client fields (if available)
    if (SMSFAccumulationDetails.client && SMSFAccumulationDetails.client.length > 0) {
      const clientData = SMSFAccumulationDetails.client[0];

      setFieldValue("client.accumulationBenefits", clientData.accumulationBenefits || "");
      setFieldValue("client.contributions", clientData.contributions || "");
      setFieldValue("client.nominatedBeneficiaries", clientData.nominatedBeneficiaries || "");
      setFieldValue("client.accumulationBenefitsarray", clientData.accumulationBenefitsarray || "");
    }

    // 3️⃣ Set partner fields (if available)
    if (SMSFAccumulationDetails.partner && SMSFAccumulationDetails.partner.length > 0) {
      const partnerData = SMSFAccumulationDetails.partner[0];

      setFieldValue("partner.accumulationBenefits", partnerData.accumulationBenefits || "");
      setFieldValue("partner.contributions", partnerData.contributions || "");
      setFieldValue("partner.nominatedBeneficiaries", partnerData.nominatedBeneficiaries || "");
    }

    // (Optional) If you have joint data
    if (SMSFAccumulationDetails.joint && SMSFAccumulationDetails.joint.length > 0) {
      const jointData = SMSFAccumulationDetails.joint[0];

      setFieldValue("joint.accumulationBenefits", jointData.accumulationBenefits || "");
      setFieldValue("joint.contributions", jointData.contributions || "");
      setFieldValue("joint.nominatedBeneficiaries", jointData.nominatedBeneficiaries || "");
    }
  } catch (error) {
    console.error("Error in fillInitialValues:", error);
  }
};


  let handleInnerModal = (title, values, key, stakeHolder) => {
    console.log(values);
    // setModalObject({
    //   title,
    //   question,
    //   key,
    //   mainKey,
    //   key3,
    //   editArray: editArray || [],
    //   index,
    //   values,
    // });

    setModalObject({
      title,
      // question,
      key,
      stakeHolder,
      values,
    });

    setFlagState(true);
  };

  let DefaultUrl = useRecoilValue(defaultUrl);

//   const onSubmit = async (values) => {
//   try {
//     console.log("Submitted Formik Values:", values);

//     const formattedData = {
//       clientFK: values.clientFK || "",
//       member: values.member || [],

//       client: values.member?.includes("client")
//         ? [
//             {
//               accumulationBenefits: values.client?.accumulationBenefits || "",
//               accumulationBenefitsarray: {
//                 commencementDate: values.client?.accumulationBenefitsarray?.commencementDate || "",
//                 currentBalance: values.client?.accumulationBenefitsarray?.currentBalance || "",
//                 eligibleServiceDate: values.client?.accumulationBenefitsarray?.eligibleServiceDate || "",
//                 preservedAmount: values.client?.accumulationBenefitsarray?.preservedAmount || "",
//                 restrictedNonPreserved: values.client?.accumulationBenefitsarray?.restrictedNonPreserved || "",
//                 taxFreeComponent: values.client?.accumulationBenefitsarray?.taxFreeComponent || "",
//                 taxableComponent: values.client?.accumulationBenefitsarray?.taxableComponent || "",
//                 unRestrictedNonPreserved: values.client?.accumulationBenefitsarray?.unRestrictedNonPreserved || "",
//               },
//               beneficiariesArray: values.client?.beneficiariesArray || "",
//               contributions: values.client?.contributions || "",
//               contributionsArray: values.client?.contributionsArray || "",
//               nominatedBeneficiaries: values.client?.nominatedBeneficiaries || "",
//             },
//           ]
//         : [],

//       partner: values.member?.includes("partner")
//         ? [
//             {
//               accumulationBenefits: values.partner?.accumulationBenefits || "",
//               accumulationBenefitsarray: {
//                 commencementDate: values.partner?.accumulationBenefitsarray?.commencementDate || "",
//                 currentBalance: values.partner?.accumulationBenefitsarray?.currentBalance || "",
//                 eligibleServiceDate: values.partner?.accumulationBenefitsarray?.eligibleServiceDate || "",
//                 preservedAmount: values.partner?.accumulationBenefitsarray?.preservedAmount || "",
//                 restrictedNonPreserved: values.partner?.accumulationBenefitsarray?.restrictedNonPreserved || "",
//                 taxFreeComponent: values.partner?.accumulationBenefitsarray?.taxFreeComponent || "",
//                 taxableComponent: values.partner?.accumulationBenefitsarray?.taxableComponent || "",
//                 unRestrictedNonPreserved: values.partner?.accumulationBenefitsarray?.unRestrictedNonPreserved || "",
//               },
//               beneficiariesArray: values.partner?.beneficiariesArray || "",
//               contributions: values.partner?.contributions || "",
//               contributionsArray: values.partner?.contributionsArray || "",
//               nominatedBeneficiaries: values.partner?.nominatedBeneficiaries || "",
//             },
//           ]
//         : [],

//       // Optional totals
//       clientTotal: values.clientTotal || "",
//       partnerTotal: values.partnerTotal || "",
//     };

//     console.log("Formatted Data to Send:", formattedData);

//     await axios.patch(`/api/updateSMSF/${values._id}`, formattedData);
//     alert("Data updated successfully!");
//   } catch (error) {
//     console.error("Error in onSubmit:", error);
//   }
// };


let onSubmit = async (values) => {
  console.log("Submitted Values:", JSON.stringify(values, null, 2));

  // Start final object
  let obj = {
    clientFK: localStorage.getItem("UserID"),
    member: values.member || [],
  };

  // Handle client
  if (values.member.includes("client") && values.client) {
    obj.client = [
      {
        accumulationBenefits: values.client.accumulationBenefits || "",
        accumulationBenefitsarray: values.client.accumulationBenefitsarray || {},
        contributions: values.client.contributions || "",
        contributionsArray: values.client.contributionsArray || "",
        nominatedBeneficiaries: values.client.nominatedBeneficiaries || "",
        beneficiariesArray: values.client.beneficiariesArray || "",
      },
    ];

    obj.clientTotal = toCommaAndDollar(
      obj.client.reduce((total, entry) => {
        const val = parseFloat(
          entry.accumulationBenefits.replace(/[^0-9.-]+/g, "")
        );
        return total + (isNaN(val) ? 0 : val);
      }, 0)
    );
  }

  // Handle partner
  if (values.member.includes("partner") && values.partner) {
    obj.partner = [
      {
        accumulationBenefits: values.partner.accumulationBenefits || "",
        accumulationBenefitsarray: values.partner.accumulationBenefitsarray || {},
        contributions: values.partner.contributions || "",
        contributionsArray: values.partner.contributionsArray || "",
        nominatedBeneficiaries: values.partner.nominatedBeneficiaries || "",
        beneficiariesArray: values.partner.beneficiariesArray || "",
      },
    ];

    obj.partnerTotal = toCommaAndDollar(
      obj.partner.reduce((total, entry) => {
        const val = parseFloat(
          entry.accumulationBenefits.replace(/[^0-9.-]+/g, "")
        );
        return total + (isNaN(val) ? 0 : val);
      }, 0)
    );
  }


  console.log("✅ Final Obj to Send:", JSON.stringify(obj, null, 2));
// return ("final object")
  try {
    const hasRecord = SMSFAccumulationDetails?._id;
    let res;

    if (hasRecord) {
      obj._id = SMSFAccumulationDetails._id;
      res = await PatchAxios(`${DefaultUrl}/api/SMSFAccumulationDetails/Update`, obj);
    } else {
      res = await PostAxios(`${DefaultUrl}/api/SMSFAccumulationDetails/Add`, obj);
    }

    if (res) {
      const updatedData = { ...questionDetail, SMSFAccumulationDetails: res };
      setQuestionDetail(updatedData);
      openNotificationSuccess(
        "success",
        "topRight",
        "Success Notification",
        `Data of "${props.modalObject.title}" is Saved`
      );
      if (props.flagState) props.setFlagState(false);
    }
  } catch (error) {
    console.error("Error occurred while making API call:", error);
    openNotificationSuccess(
      "error",
      "topRight",
      "Error Notification",
      `Data of "${props.modalObject.title}" is not Saved. Please try again!`
    );
  }
};


  let CheckInputValue = (values, setFieldValue, currentInput, index) => {
    // console.log(values, setFieldValue, currentInput);
    let accumulationBenefitsarray = values[`accumulationBenefitsarray${index}`];

    let ExpectedSum = parseFloat(
      accumulationBenefitsarray.taxFreeComponent.replace(/[^0-9.-]+/g, ""),
      0
    );
    let data = parseFloat(currentInput.value.replace(/[^0-9.-]+/g, ""));

    console.log(ExpectedSum, data, currentInput.name, ShowError);

    if (ExpectedSum !== data) {
      setShowError((prevState) => ({
        ...prevState,
        [`${currentInput.name}Error`]: true,
        [`${currentInput.name}Message`]:
          "Total must be equal to the sum of all Investment value filled in the popup. The sum is " +
          toCommaAndDollar(ExpectedSum),
      }));
    } else {
      setShowError((prevState) => ({
        ...prevState,
        [`${currentInput.name}Error`]: false,
        [`${currentInput.name}Message`]: "",
      }));
    }
  };

  let options =
    UserStatus !== "Single"
      ? [
          { value: "client", label: RenderName("client") },
          { value: "partner", label: RenderName("partner") },
          // { value: "joint", label: RenderName("joint") }
        ]
      : [{ value: "client", label: RenderName("client") }];

  const columns = [
    {
      title: "Member",
      dataIndex: "owner",
      key: "owner",
      type: "text", // simple static text or could be DynamicFormField if editable
      placeholder: "Enter member Name",
      width: 150,
    },

    {
      title: "Accumulation Benefits",
      dataIndex: "accumulationBenefits",
      key: "accumulationBenefits",
      type: "number-toComma-Modal",
      placeholder: "Accumulation Benefits",
      width: 200,
      func: handleInnerModal,
      innerModalTitle: "Accumulations Benefits",
    },
    {
      title: "Contributions",
      dataIndex: "contributions",
      key: "contributions",
      type: "yesnoModal", // yes/no with modal
      width: 170,
      callBack: true,
      func: handleInnerModal,
      handleInnerModal: handleInnerModal,
      innerModalTitle: "Contributions",
    },
    {
      title: "Nominated Beneficiaries",
      dataIndex: "nominatedBeneficiaries",
      key: "nominatedBeneficiaries",
      type: "yesnoModal", // yes/no with modal
      width: 170,
      callBack: true,
      func: handleInnerModal,
      handleInnerModal: handleInnerModal,
      innerModalTitle: "Nominated Beneficiaries",
    },
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
        const tableData = useMemo(() => {
          // console.log(values, "values in table data");
          const rows = [];

          if (values.member.includes("client")) {
            rows.push({
              key: "client",
              stakeHolder: "client", // 🔥 pass this to renderCell
              owner: RenderName("client"),

              ...values.client,
            });
          }

          if (values.member.includes("partner")) {
            rows.push({
              key: "partner",
              stakeHolder: "partner", // 🔥 pass this to renderCell
              owner: RenderName("partner"),
              ...values.partner,
            });
          }

          return rows;
        }, [values]);

        return (
          <Form>
            <Row>
              <InnerModal
                modalObject={modalObject}
                setFieldValue={setFieldValue}
                setFlagState={setFlagState}
                flagState={flagState}
              >
                {modalObject.key === "accumulationBenefits" ? (
                  <AccumulationBenefits />
                ) : modalObject.key === "contributions" ? (
                  <Contributions />
                ) : modalObject.key === "nominatedBeneficiaries" ? (
                  <Beneficiaries />
                ) : (
                  ""
                )}
              </InnerModal>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                    <label
                      htmlFor=""
                      className="text-end "
                      onClick={() => {
                        console.log(values);
                      }}
                    >
                      Members of SMSF{" "}
                      {questionDetail?.SMSFDetails?.SMSFOwner?.fundName}
                    </label>

                    {/* <div style={{ minWidth: "25%" }}>
                      <Field
                        name={`member`}
                        component={CreatableMultiSelectField}
                        label="Multi Select Field"
                        options={option}
                      />
                    </div> */}

                    <div style={{ minWidth: "200px" }}>
                      <Field
                        name={`member`}
                        component={AntdCreatableMultiSelect}
                        options={options}
                        onChangefun={() => {}}
                      />
                    </div>
                  </div>
                  {values.member.length > 0 && (
                    // <div className="mt-4">
                    //   <Table striped bordered responsive hover>
                    //     <thead>
                    //       <tr>
                    //         <th
                    //           onClick={() => {
                    //             console.log(values);
                    //           }}
                    //         >
                    //           Member
                    //         </th>
                    //         <th>Accumulation Benefits</th>
                    //         <th>Contributions</th>
                    //         <th>Nominated Beneficiaries</th>
                    //       </tr>
                    //     </thead>
                    //     <tbody>
                    //       {Array.from({ length: values.member.length }).map((_, i) => {
                    //         return (
                    //           <tr key={i}>
                    //             <td>
                    //               {RenderName(values.member[i])}
                    //             </td>
                    //             <td style={{ width: "11rem" }}>
                    //               <InputGroup className={`mb-3 ${ShowError[`accumulationBenefits${i}Error`] === true ? "is-invalid" : ""}`}>
                    //                 <Field
                    //                   type="text"
                    //                   placeholder="Accumulation Benefits"
                    //                   id={`accumulationBenefits${i}`}
                    //                   name={`accumulationBenefits${i}`}
                    //                   className={`form-control inputDesignDoubleInput ${ShowError[`accumulationBenefits${i}Error`] === true ? "is-invalid" : ""}`}
                    //                   onChange={(e) => {
                    //                     setFieldValue(e.target.name,
                    //                       toCommaAndDollar(e.target.value.replace(/[^0-9.-]+/g, "")));
                    //                     CheckInputValue(values, setFieldValue, e.target, i)
                    //                   }}
                    //                 />
                    //                 <Button
                    //                   className="btn bgColor modalBtn border-0"
                    //                   id="button-addon2"
                    //                   onClick={() => {
                    //                     handleInnerModal(
                    //                       "Accumulations Benefits", //title
                    //                       `How many Accumulations Benefits do ${nameSet} have :`, //Question
                    //                       "accumulationBenefitsarray", //key
                    //                       "accumulationBenefits", //mainKey
                    //                       "totalPortfolioCost", // key3
                    //                       values[`accumulationBenefitsarray${i}`], //editarray
                    //                       i, //index
                    //                       values // all form Values
                    //                     );
                    //                   }}
                    //                 >
                    //                   <FontAwesomeIcon
                    //                     icon={faArrowUpRightFromSquare}
                    //                   />
                    //                 </Button>
                    //               </InputGroup>
                    //               <div className="invalid-feedback">
                    //                 {ShowError[`accumulationBenefits${i}Message`]}
                    //               </div>
                    //             </td>

                    //             <td>
                    //               <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                    //                 <DynamicYesNo
                    //                   name={`contributions${i}`}
                    //                   values={values}
                    //                   handleChange={handleChange}
                    //                 />
                    //                 {values[`contributions${i}`] ===
                    //                   "Yes" && (
                    //                     <Button
                    //                       className="btn bgColor modalBtn border-0"
                    //                       id="button-addon2"
                    //                       onClick={() => {
                    //                         handleInnerModal(
                    //                           "Contributions",
                    //                           `How many financial years to ${nameSet} want to display?`,
                    //                           "contributionsArray",
                    //                           "",
                    //                           "",
                    //                           values[`contributionsArray${i}`],
                    //                           i
                    //                         );
                    //                       }}
                    //                     >
                    //                       <FontAwesomeIcon
                    //                         icon={faArrowUpRightFromSquare}
                    //                       />
                    //                     </Button>
                    //                   )}
                    //               </div>
                    //             </td>
                    //             <td>
                    //               <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                    //                 <DynamicYesNo
                    //                   name={`nominatedBeneficiaries${i}`}
                    //                   values={values}
                    //                   handleChange={handleChange}
                    //                 />
                    //                 {values[`nominatedBeneficiaries${i}`] ===
                    //                   "Yes" && (
                    //                     <Button
                    //                       className="btn bgColor modalBtn border-0"
                    //                       id="button-addon2"
                    //                       onClick={() => {
                    //                         handleInnerModal(
                    //                           "Beneficiaries",
                    //                           `How many beneficiaries do ${nameSet} have :`,
                    //                           "beneficiariesArray",
                    //                           "",
                    //                           "",
                    //                           values[`beneficiariesArray${i}`],
                    //                           i
                    //                         );
                    //                       }}
                    //                     >
                    //                       <FontAwesomeIcon
                    //                         icon={faArrowUpRightFromSquare}
                    //                       />
                    //                     </Button>
                    //                   )}
                    //               </div>
                    //             </td>
                    //           </tr>
                    //         );
                    //       })}
                    //     </tbody>
                    //   </Table>
                    // </div>

                    <div className="mt-4 All_Client reportSection">
                      <AntDTableHOC
                        columns={columns}
                        data={tableData}
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        isEditing={props?.isEditing}
                        setIsEditing={props?.setIsEditing}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SmsfAccumulationDetails;
