import React, {useEffect, useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup";                      //? don't Remove it you might need it later
// import { useNavigate } from "react-router-dom"; //? don't Remove it you might need it later
import axios from "axios";
import dollarBag from "../images/dollarBag.svg";
import single from "../../Svgs/single-2.svg";
import couple from "../../Svgs/couple-2.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { ClientName, PartnerName, defaultUrl } from "../../../Store/Store";
import { Card } from "react-bootstrap";
import CustomDropDown from "../../Assets/CustomDropDown/CustomDropDown";

const OtherTaxable = () => {
  
  let DefaultUrl = useRecoilValue(defaultUrl)

  const [clientData, setClientData] = useState([]);
  const [partnerData, setPartnerData] = useState([]);
  const [clientFlag, setClientFlag] = useState(false);
  const [partnerFlag, setPartnerFlag] = useState(false);

  const [showTable, setShowTable] = useState(true);

  const [ClientNameGet] = useRecoilState(ClientName);
  const [PartnerNameGet] = useRecoilState(PartnerName);
  useEffect(() => {

    let email = localStorage.getItem("Email");
    if (email) {
      GetApiFunction(email);
    }
  }, []);

  let GetApiFunction = async(email) => {
    try {
      
      let ClientOther = await axios.get(`${DefaultUrl}/api/Client-Income-Other`);
      ClientOther = ClientOther.data;
      ClientOther = ClientOther.filter((item) => item.Email === email);
    
      console.log(ClientOther);
      if (ClientOther[0].clientOtherAmount !== undefined) {
        setShowTable(false);
      }
      setClientData({ ...ClientOther[0] })
      if(ClientOther[0].clientOtherOwner==='Partner'){
        let PartnerOther = await axios.get(`${DefaultUrl}/api/Partner-Income-Other`);
        PartnerOther = PartnerOther.data;
        PartnerOther = PartnerOther.filter((item) => item.Email === email);
        setPartnerData({...PartnerOther[0]})
      }
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  let otherOperation = (Option, elem, deleteData) => {
    if (Option === 1) {
      // alert("Update is Clicked");
      setClientFlag(true);
      setPartnerFlag(true);
      setShowTable(true);
    } else if (Option === 2) {
      // alert("Delete is clicked");
      deleteOperation(elem,deleteData);
    }
  };

  let deleteOperation=(elem,deleteData)=>{
    if(deleteData==='client'){
      axios.delete(`${DefaultUrl}/api/Client-Income-Other/Delete/${elem.Email}`)
      .then((res)=>{
        console.log('Client Has Been Deleted');
        setClientFlag(false);
        setClientData([]);
      })
    }else if(deleteData==='partner'){
      axios.delete(`${DefaultUrl}/api/Partner-Income-Other/Delete/${elem.Email}`)
      .then((res)=>{
        console.log('Partner is Deleted');
        setPartnerFlag(false);
        setPartnerData([]);
      })
    }
  }

  let initialValues = {
    clientOtherOwner: "",
    clientOtherIncomeType: "",
    clientOtherAmount: "",
    partnerOtherOwner: "",
    partnerOtherIncomeType: "",
    partnerOtherAmount: "",
  };

  let onSubmit = (values,{resetForm}) => {
    setShowTable(false);
    let clientObj = {
      Email: localStorage.getItem("Email"),
      clientOtherOwner: values.clientOtherOwner,
      clientOtherIncomeType: values.clientOtherIncomeType,
      clientOtherAmount: values.clientOtherAmount,
    };
    // console.log(clientObj);
    let partnerObj = {
      Email: localStorage.getItem("Email"),
      // partnerOtherOwner: values.partnerOtherOwner,
      partnerOtherIncomeType: values.partnerOtherIncomeType,
      partnerOtherAmount: values.partnerOtherAmount,
    };
    
    
    if(clientFlag===true){
      // patch
      axios.patch(`${DefaultUrl}/api/Client-Income-Other/Update/${clientObj.Email}`,clientObj)
      .then((res)=>{
        setClientData(clientObj);
        console.log('Client Has Been Updated');
      })
    }else{
      // post
      console.log(clientObj);
      // alert('komail is king')
      axios.post(`${DefaultUrl}/api/Client-Income-Other/Add`,clientObj)
      .then((res)=>{
        setClientData(clientObj);
        console.log('Client Has Been Added');
      })
    }
    if(values.clientOtherOwner==='Partner'){
      if(partnerFlag===true){
        // patch
        axios.patch(`${DefaultUrl}/api/Partner-Income-Other/Update/${partnerObj.Email}`,partnerObj)
        .then((res)=>{console.log('Partner Has Been Updated');
        setPartnerData(partnerObj);
      })
      }else{
        // Post
        axios.post(`${DefaultUrl}/api/Partner-Income-Other/Add`,partnerObj)
        .then((res)=>{console.log('Partner Has Been Added');
        setPartnerData(partnerObj);
      })
      }
    }



    resetForm()
  };

  return (
    <div className="row my-3">
      <div className="col-md-12">
          <Formik
            initialValues={initialValues}
            //  validationSchema={isPartnered ? validationSchema : singleValidationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({
              values,
              setFieldValue,
              setValues,
              handleChange,
              handleBlur,
            }) => (
              <Form>
                <div className="row">
                  <div className="col-md-12">
                    {showTable ? (
                      <Card className="shadow px-4 py-4 borderOverAll">
                        <h3 className="">
                          Other Income
                          <div className="iconContainerLg">
                            <img className="img-fluid" src={dollarBag} alt="" />
                          </div>
                        </h3>

                        <div className="row">
                          <div className="col-4"></div>
                          <div className="col-4 text-center">
                            <label htmlFor="" className="form-label">
                              Client
                              <div className="iconContainerLg">
                                <img
                                  src={single}
                                  alt="single svg"
                                  className="w-50 "
                                />
                              </div>
                            </label>
                          </div>
                          {values.clientOtherOwner === "Partner" && (
                            <div className="col-4 text-center">
                              <label htmlFor="" className="form-label">
                                Partner
                                <div className="iconContainerLg">
                                  <img
                                    src={couple}
                                    alt="single svg"
                                    className="w-50 "
                                  />
                                </div>
                              </label>
                            </div>
                          )}
                        </div>
                        <div className="row">
                          <div className="col-4 mb-3">
                            <label
                              htmlFor="clientOtherOwner"
                              className="form-label"
                            >
                              Owner
                            </label>
                          </div>
                          <div className="col-4 mb-3">
                            <Field
                              as="select"
                              className="form-control inputDesign shadow form-select"
                              id="clientOtherOwner"
                              name="clientOtherOwner"
                              placeholder="client Other Owner "
                            >
                              <option value="">Select</option>
                              <option value="Client">Client</option>
                              <option value="Partner">Partner </option>
                            </Field>
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="clientOtherOwner"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4 mb-3">
                            <label
                              htmlFor="clientOtherIncomeType"
                              className="form-label"
                            >
                              Income Type
                            </label>
                          </div>
                          <div className="col-4 mb-3">
                            <Field
                              as="select"
                              className="form-control inputDesign shadow form-select"
                              id="clientOtherIncomeType"
                              name="clientOtherIncomeType"
                              placeholder="client Other Income Type"
                            >
                              <option value="">Select</option>
                              <option value="lifeTime ">Lifetime </option>
                              <option value="pensionOverseas">
                                Pension/Overseas
                              </option>
                              <option value="pensionOther">
                                Pension/Other
                              </option>
                              <option value="taxableIncome ">
                                Taxable income
                              </option>
                            </Field>
                            <ErrorMessage
                              component="div"
                              className="text-danger fw-bold"
                              name="clientOtherIncomeType"
                            />
                          </div>
                          {values.clientOtherOwner === "Partner" && (
                            <div className="col-4">
                              <Field
                                as="select"
                                className="form-control inputDesign shadow form-select"
                                id="partnerOtherIncomeType"
                                name="partnerOtherIncomeType"
                                placeholder="partner Other Income Type"
                              >
                                <option value="">Select</option>
                                <option value="lifeTime ">Lifetime </option>
                                <option value="pensionOverseas">
                                  Pension/Overseas
                                </option>
                                <option value="pensionOther">
                                  Pension/Other
                                </option>
                                <option value="taxableIncome ">
                                  Taxable income
                                </option>
                              </Field>
                              <ErrorMessage
                                component="div"
                                className="text-danger fw-bold"
                                name="partnerOtherIncomeType"
                              />
                            </div>
                          )}
                        </div>
                        <div className="row">
                          <div className="col-4">
                            <label
                              htmlFor="clientOtherAmount"
                              className="form-label"
                            >
                              Amount
                            </label>
                          </div>

                          <div className="col-4">
                            <div className="mb-3">
                              <Field
                                type="number"
                                className="form-control
                 inputDesign shadow"
                                id="clientOtherAmount"
                                name="clientOtherAmount"
                                placeholder="How much you have the ability to salary sacrifice?"
                              />
                              <ErrorMessage
                                name="clientOtherAmount"
                                component="div"
                                className="text-danger fw-bold"
                              />
                            </div>
                          </div>
                          {values.clientOtherOwner === "Partner" && (
                            <div className="col-4">
                              <div className="mb-3">
                                <Field
                                  type="number"
                                  className="form-control
              inputDesign shadow"
                                  id="partnerOtherAmount"
                                  name="partnerOtherAmount"
                                  placeholder="How much you have the ability to salary sacrifice?"
                                />
                                <ErrorMessage
                                  name="partnerOtherAmount"
                                  component="div"
                                  className="text-danger fw-bold"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="row mt-5">
                        <div className="col-md-12">
                          <button
                            type="submit"
                            className="float-end btn w-25  bgColor modalBtn"
                            // onClick={nextbuttonHandler}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                      </Card>
                    ) : (
                      <div className="row">
                        <div className="col-12">
                          <Card className="shadow  px-4 py-4 borderOverAll">
                            <h3 className="heading text-center">
                              Other Income
                              <div className="iconContainerLg">
                                <img
                                  className="img-fluid"
                                  src={dollarBag}
                                  alt=""
                                />
                              </div>
                            </h3>
                            <div className="row">
                              {/*  table  */}

                              <div
                                className="table-responsive my-3"
                                id="childTable"
                              >
                                <table className="table table-bordered table-hover text-center">
                                  <thead className="text-light" id="tableHead">
                                    <tr>
                                      <th>Name</th>
                                      <th>Income Type</th>
                                      <th>Annual Amount</th>
                                      <th>Opt</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {((clientData.clientOtherAmount !== "")&&(clientData.clientOtherAmount !== undefined)) && (
                                      <tr>
                                        <td>{ClientNameGet}</td>
                                        <td>
                                          {clientData.clientOtherIncomeType}
                                        </td>
                                        <td>{clientData.clientOtherAmount}</td>
                                        <td>
                                          <CustomDropDown
                                            Operations={otherOperation}
                                            Delete={"client"}
                                            Data={clientData}
                                            FormikFun={setValues}
                                          />
                                        </td>
                                      </tr>
                                    )}
                                    {((partnerData.partnerOtherAmount !== "")&&(partnerData.partnerOtherAmount !==undefined) )&& (
                                      <tr>
                                        <td>{PartnerNameGet}</td>
                                        <td>
                                          {partnerData.partnerOtherIncomeType}
                                        </td>
                                        <td>
                                          {partnerData.partnerOtherAmount}
                                        </td>
                                        <td>
                                          <CustomDropDown
                                            Operations={otherOperation}
                                            Delete={"partner"}
                                            Data={{
                                              ...partnerData,
                                              ...clientData,
                                            }}
                                            FormikFun={setValues}
                                          />
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>

                              {/*  table  */}
                            </div>

                            <div className="row mt-5">
                        <div className="col-md-12">
                          <button
                            type="button" onClick={()=>{setShowTable(true)}}
                            className="float-end btn w-25  bgColor modalBtn"
                            // onClick={nextbuttonHandler}
                          >
                            Add New
                          </button>
                        </div>
                      </div>
                          </Card>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
      </div>
    </div>
  );
};

export default OtherTaxable;
