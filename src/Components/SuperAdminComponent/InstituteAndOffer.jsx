import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import "yup-phone";
import * as Yup from "yup";
import Add from "../Questions/svgs/add-circle-solid-svgrepo-com.svg";
import ModalComponent from "../Questions/FinancialInvestments/ModalComponent";
import InsittuteFom from "./InsittuteFom";
import OfferFom from "./OfferFom";
import { Pagination, Tooltip, List, Skeleton, Modal } from "antd";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { HiOutlinePlus } from "react-icons/hi";
import { useRecoilState, useRecoilValue } from "recoil";
import { BankDetail, defaultUrl, Loading } from "../../Store/Store";
import {
  GetAxios,
  openNotificationSuccess,
  PatchAxios,
} from "../Assets/Api/Api";
import { SimpleSelectField } from "../Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField";
import { Collapse } from "antd";
const { Panel } = Collapse;

const InstituteAndOffer = (props) => {
  let { Data } = props;
  let bankDetailObj = useRecoilValue(BankDetail);
  let [bankDetailObj2, setBankDetailObj] = useRecoilState(BankDetail);
  let [loading, setLoading] = useRecoilState(Loading);
  let DefaultUrl = useRecoilValue(defaultUrl);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      console.log("Fetching data from:", `${DefaultUrl}/api/investmentoffer/`);
      const res = await GetAxios(`${DefaultUrl}/api/investmentoffer/`);
      console.log("API response:", res);
      if (res) {
        setBankDetailObj(res || {});
        setInitLoading(false);
        openNotificationSuccess(
          "success",
          "topRight",
          "Data Loaded",
          "Platform data loaded successfully"
        );
      } else {
        console.warn("No data returned from API");
        setInitLoading(false);
      }
    } catch (error) {
      console.error("Error fetching questions:", error.message, error.response);
      setInitLoading(false);
      openNotificationSuccess(
        "error",
        "topRight",
        "Error Fetching Data",
        "Failed to load platform data. Please try again later."
      );
    }
  }

  let [flagState, setFlagState] = useState(false);
  let [investmentFieldSearch, setInvestmentFieldSearch] = useState("");
  let [modalObject, setModalObject] = useState({
    title: "Platform",
    Input: "Name",
  });

  let OpenOffer = (elem, oppration, index) => {
    setModalObject({
      title: elem.platformName + " Investment",
      fullBank: elem,
      oppration,
      index,
    });
    setFlagState(true);
  };

  let OpenInstitute = (operation, data) => {
    setModalObject({
      title: "Platform",
      operation,
      data,
      key: Data.key,
    });
    setFlagState(true);
  };

  let DeleteOffer = async (elem, operation, Offerindex, OfferElem) => {
    if (window.confirm("Confirm investment Delete")) {
      try {
        let data = await PatchAxios(
          DefaultUrl + "/api/investmentoffer/Delete",
          OfferElem
        );
        if (data) {
          let index = bankDetailObj.findIndex((item) => item._id === elem._id);
          let Obj = JSON.parse(JSON.stringify(bankDetailObj));
          Obj[index].arrayOfOffers.splice(Offerindex, 1);
          setBankDetailObj(Obj);
          openNotificationSuccess(
            "success",
            "topRight",
            "Investment Deleted",
            "Investment is Delete successfull"
          );
        }
      } catch (error) {
        console.log(error);
        openNotificationSuccess(
          "error",
          "topRight",
          "Error Notification",
          "Some thing went wrong Please Try Later"
        );
      }
    }
  };
  
  let { confirm } = Modal;
  let DeleteBank = (elem, operation, index) => {
    
    confirm({
      
      title: "Are you sure you want to delete this Platform?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: async () => {
        try {
          setLoading(true);
          let res = await PatchAxios(DefaultUrl + "/api/platform/Delete", elem);
          if (res) {
            setBankDetailObj((prevData) => {
              const updatedData = JSON.parse(JSON.stringify({ ...prevData }));
              const section = elem.section;

              if (updatedData[section]) {
                updatedData[section] = updatedData[section].filter(
                  (item) => item._id !== elem._id
                );
                return updatedData;
              } else {
                console.error("Section not found for delete operation.");
                return prevData;
              }
            });

            openNotificationSuccess(
              "success",
              "topRight",
              "Platform Deleted",
              "Platform is successfully deleted"
            );
          }
        } catch (error) {
          console.error(error);
          openNotificationSuccess(
            "error",
            "topRight",
            "Delete Failed",
            "An error occurred while deleting the platform."
          );
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const generateOptions = (bankDetailObj, platformName) => {
    const InstituteOptions = [];
    if (Array.isArray(bankDetailObj) && bankDetailObj.length > 0) {
      bankDetailObj.forEach((elem) => {
        if (platformName === elem._id) {
          if (
            Array.isArray(elem.arrayOfOffers) &&
            elem.arrayOfOffers.length > 0
          ) {
            elem.arrayOfOffers.forEach((offerElem) => {
              InstituteOptions.push({
                value: offerElem._id,
                label: `${offerElem.investmentName} (${offerElem.investmentCode})`,
              });
            });
          }
        }
      });
    }
    return InstituteOptions;
  };

  let handleSubmitRegularIncome = (values) => {
    setInvestmentFieldSearch(values.SearchInvestment);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderRows = (
    currentPage,
    setFieldValue,
    values,
    handleChange,
    renderArray,
    index,
    fullBank
  ) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const searchValue = values[`SearchInvestment${index}`];
    if (searchValue && searchValue !== "") {
      const matchingOffer = renderArray.find(
        (OfferElem) => OfferElem._id === searchValue
      );
      if (matchingOffer) {
        return (
          <tr key={matchingOffer._id}>
            <td>{matchingOffer.investmentName}</td>
            <td>{matchingOffer.investmentCode}</td>
            <td>
              <Tooltip placement="top" title={"Edit"}>
                <BiSolidEdit
                  style={{ fontSize: "18px", cursor: "pointer" }}
                  onClick={() => {
                    OpenOffer(fullBank, "edit", index);
                  }}
                />
              </Tooltip>
              &nbsp;&nbsp;/&nbsp;&nbsp;
              <Tooltip placement="top" title={"Delete"}>
                <RiDeleteBinLine
                  style={{ color: "red", fontSize: "18px", cursor: "pointer" }}
                  onClick={() => {
                    DeleteOffer(fullBank, "delete", index, matchingOffer);
                  }}
                />
              </Tooltip>
            </td>
          </tr>
        );
      }
      return null;
    }
    return renderArray
      .slice(startIndex, endIndex)
      .map((OfferElem, Offerindex) => {
        return (
          <tr key={Offerindex}>
            <td>{OfferElem.investmentName}</td>
            <td>{OfferElem.investmentCode}</td>
            <td>
              <Tooltip placement="top" title={"Edit"}>
                <BiSolidEdit
                  style={{ fontSize: "18px", cursor: "pointer" }}
                  onClick={() => {
                    OpenOffer(fullBank, "edit", Offerindex);
                  }}
                />
              </Tooltip>
              &nbsp;&nbsp;/&nbsp;&nbsp;
              <Tooltip placement="top" title={"Delete"}>
                <RiDeleteBinLine
                  style={{ color: "red", fontSize: "18px", cursor: "pointer" }}
                  onClick={() => {
                    DeleteOffer(fullBank, "delete", Offerindex, OfferElem);
                  }}
                />
              </Tooltip>
            </td>
          </tr>
        );
      });
  };

  let listArray = ["FinancialInstitutions", "Annuities", "PersonalInsurances"];

  return (
    <div
      className="container-fluid"
      style={{ paddingTop: "3.8rem", minHeight: "89vh" }}
    >
      <Row className="justify-content-center overflow-x-hidden">
        <ModalComponent
          modalObject={modalObject}
          setFlagState={setFlagState}
          flagState={flagState}
        >
          {modalObject.title === "Platform" ? <InsittuteFom /> : <OfferFom />}
        </ModalComponent>
        <div className="col-md-12">
          <div>
            <h2 className="text-center text-green">
              {Data.subTitle} Platform{" "}
              {!listArray.includes(Data.key) && "and Investment"}
            </h2>
            <div
              className="QuestionIcon p-3 curser-pointer"
              onClick={() => {
                OpenInstitute("new");
              }}
            >
              <img className="img-fluid min-w-25" src={Add} alt="" />
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-3">
          <Row>
            {!listArray.includes(Data.key) ? (
              <div className="row">
                <div className={`col-md-12 superAdminAccordian mb-4 fw-bold`}>
                  <Collapse
                    accordion
                    className="superAdminCollapse"
                    expandIconPosition="right"
                    bordered={false}
                    styles={{

                      header: {
                        background: "#36b446",
                      },
                    }}
                  >
                    {bankDetailObj[`${Data.key}`]?.map((elem, index) => (
                      <Panel
                        header={elem.platformName}
                        key={index}
                        styles={{
                          header: {
                            background: "#36b446",
                            color: "white",
                          },
                          body: {
                            border: "1px solid #36b446",
                            borderTop: "none",
                            paddingTop: "1rem",
                          },
                        }}
                      >
                        <div className="row">
                          <div className="col-md-4">
                            <div className="customCard">
                              <h4 className="d-flex justify-content-between">
                                {elem.platformName}
                                <Tooltip placement="top" title="Edit">
                                  <BiSolidEdit
                                    style={{
                                      fontSize: "18px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => OpenInstitute("edit", elem)}
                                  />
                                </Tooltip>
                              </h4>
                              <h6
                                className="d-flex justify-content-between"
                                style={{ fontSize: "17px" }}
                              >
                                Total Investment
                                {elem.arrayOfOffers.length > 1
                                  ? `s ${elem.arrayOfOffers.length}`
                                  : ` ${elem.arrayOfOffers.length}`}
                                <Tooltip placement="top" title="Delete">
                                  <RiDeleteBinLine
                                    style={{
                                      color: "red",
                                      fontSize: "18px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      DeleteBank(elem, "delete", index)
                                    }
                                  />
                                </Tooltip>
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 my-2 m-md-0">
                            <Button
                              type="submit"
                              className="w-100 h-100 CSVBtn m-0"
                              onClick={() => OpenOffer(elem, "CSV")}
                            >
                              <HiOutlinePlus
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "3px",
                                }}
                              />{" "}
                              Add From CSV / Excel File
                            </Button>
                          </div>
                          <div className="col-md-4">
                            <Button
                              type="submit"
                              className="w-100 h-100 bgColor modalBtn m-0"
                              onClick={() => OpenOffer(elem, "new")}
                            >
                              <HiOutlinePlus
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "3px",
                                }}
                              />{" "}
                              Add Investment Manually
                            </Button>
                          </div>
                          <Formik
                            initialValues={{}}
                            onSubmit={handleSubmitRegularIncome}
                            enableReinitialize
                          >
                            {({ values, setFieldValue, handleChange }) => (
                              <Form>
                                <div className="col-md-12 mt-3">
                                  <div className="row justify-content-between">
                                    <div className="col-md-6">
                                      <h2 className="m-0 p-0">Investment</h2>
                                    </div>
                                    <div className="col-md-3">
                                      <Field
                                        type="text"
                                        name={`SearchInvestment${index}`}
                                        component={SimpleSelectField}
                                        label="Multi Select Field"
                                        options={generateOptions(
                                          bankDetailObj,
                                          elem._id
                                        )}
                                        onChange={(selectedOption) => {
                                          const isIdPresent =
                                            elem.arrayOfOffers.some(
                                              (offer) =>
                                                offer._id === selectedOption.value
                                            );
                                          if (!isIdPresent) {
                                            openNotificationSuccess(
                                              "error",
                                              "topRight",
                                              "Error Notification",
                                              "No Investment Found"
                                            );
                                            setFieldValue(
                                              `SearchInvestment${index}`,
                                              ""
                                            );
                                          }
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 mt-3">
                                  <Table striped bordered responsive hover>
                                    <thead>
                                      <tr>
                                        <th>Investment Name</th>
                                        <th>Investment Code</th>
                                        <th>Options</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {elem.arrayOfOffers.length <= 0 && (
                                        <tr>
                                          <td colSpan={4}>No Investment Added</td>
                                        </tr>
                                      )}
                                      {renderRows(
                                        currentPage,
                                        setFieldValue,
                                        values,
                                        handleChange,
                                        elem.arrayOfOffers,
                                        index,
                                        elem
                                      )}
                                    </tbody>
                                  </Table>
                                </div>
                                {elem.arrayOfOffers.length >= 10 && (
                                  <div className="w-100 CustomPaginantion d-flex justify-content-center">
                                    <Pagination
                                      align="start"
                                      defaultCurrent={1}
                                      current={currentPage}
                                      total={elem.arrayOfOffers.length}
                                      pageSize={pageSize}
                                      onChange={handlePageChange}
                                      showSizeChanger={false}
                                    />
                                  </div>
                                )}
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </Panel>
                    ))}
                  </Collapse>
                </div>
              </div>
            ) : (
              <div className="row">
                <card
                  bordered={false}
                  className="custom-card"
                >
                  {/* Custom header row */}
                  <div className="InstitudeAndOfferCustomHeader">
                    <span style={{ flex: 2, textAlign: "start" }}>Name</span>
                    <span className="flex-fill text-end" >Actions</span>
                  </div>

                  <List
                    className="custom-list"
                    loading={initLoading}
                    itemLayout="horizontal"
                    dataSource={bankDetailObj[`${Data.key}`] || []}
                    renderItem={(elem, index) => (
                      <List.Item className="custom-list-item">
                        <Skeleton loading={initLoading} active paragraph={false}>
                          <div className="d-flex w-100 align-items-center justify-content-between"
                           
                          >
                            {/* Name */}
                            <span className="flex-fill fs-6 fw-medium">
                              {elem.platformName}
                            </span>

                            {/* Actions (Edit + Delete together) */}
                            <div  className="flex-fill text-end"
                            >
                              <Tooltip placement="top" title="Edit">
                                <BiSolidEdit className="fs-5 text-secondary me-3" role="button" 
                                  onClick={() => OpenInstitute("edit", elem)}
                                />
                              </Tooltip>
                              <Tooltip placement="top" title="Delete">
                                <RiDeleteBinLine
                                  className="delete-icon fs-5 text-danger" role="button"
                                  onClick={() => DeleteBank(elem, "delete", index)}
                                />
                              </Tooltip>
                            </div>
                          </div>
                        </Skeleton>
                      </List.Item>
                    )}
                  />


                </card>




              </div>
            )}
          </Row>
        </div>
      </Row>
    </div>
  );
};

export default InstituteAndOffer;