import React, { useState , useEffect } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup";                     //? don't Remove it you might need it later
// import { useNavigate } from "react-router-dom";//? don't Remove it you might need it later
import axios from "axios";
import { Card } from "react-bootstrap";
import CustomDropDown from "../../Assets/CustomDropDown/CustomDropDown";
import { defaultUrl } from "../../../Store/Store";
import { useRecoilValue } from "recoil";

const PersonalAssetsLiabilities = () => {
  
  let DefaultUrl = useRecoilValue(defaultUrl)

  const [formData ,setFormData]=useState([]);
  const [showTable ,setShowTable]=useState(true);
  const [postFlag]=useState(true);  // eslint-disable-line no-unused-vars
  useEffect(() => {

    let email = localStorage.getItem("Email");
    if (email) {
      GetApiFunction(email);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let GetApiFunction = async(email) => {
    try {
      
      let ClientOther = await axios.get(`${DefaultUrl}/api/Client-PersonalAssets`);
      ClientOther = ClientOther.data;
      ClientOther = ClientOther.filter((item) => item.Email === email);
      
      console.log(ClientOther);
      if ((ClientOther[0])) {
        setShowTable(false)
      }
      setFormData({ ...ClientOther[0] })
     
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  let AssetsOperation = (Option, elem, deleteData) => {
    if (Option === 1) {
      // update
      // alert('update is clicked');
    } else if (Option === 2) {
      // delete
      // alert(deleteData+' delete is clicked');
      deleteOption(elem,deleteData);
    }
  };
  let deleteOption=(elem,deleteData)=>{
    if (deleteData==='Contents'){
      elem.ContentsPA=0;
      axios.patch(`${DefaultUrl}/api/Client-PersonalAssets/Update/${elem.Email}`,elem)
      .then((res)=>{console.log('Contents is Deleted');
      setFormData(elem);
    })
  }
  else if (deleteData==='Motor Vehicle 1'){
    elem.MotorVehicle1PA=0;
    axios.patch(`${DefaultUrl}/api/Client-PersonalAssets/Update/${elem.Email}`,elem)
    .then((res)=>{console.log('Motor Vehicle 1 is Deleted');
    setFormData(elem);
  })
}
else if (deleteData==='Motor Vehicle 2'){
  elem.MotorVehicle2PA=0;
  axios.patch(`${DefaultUrl}/api/Client-PersonalAssets/Update/${elem.Email}`,elem)
  .then((res)=>{console.log('Motor Vehicle 2 is Deleted');
  setFormData(elem);
})
}
else if (deleteData==='Boat'){
  elem.BoatPA=0;
  console.log('Boat is being deleted  ');
  axios.patch(`${DefaultUrl}/api/Client-PersonalAssets/Update/${elem.Email}`,elem)
  .then((res)=>{console.log('Boat is Deleted');
  console.log(elem);
  setFormData(elem);
})
}
else if (deleteData==='Caravan'){
  elem.CaravanPA=0;
  axios.patch(`${DefaultUrl}/api/Client-PersonalAssets/Update/${elem.Email}`,elem)
  .then((res)=>{console.log('Caravan is Deleted');
  setFormData(elem);
})
}
else if (deleteData==='Other'){
  elem.OtherPA=0;
  axios.patch(`${DefaultUrl}/api/Client-PersonalAssets/Update/${elem.Email}`,elem)
  .then((res)=>{console.log('Other is Deleted');
  setFormData(elem);
})
}

}
  const initialValues = {
    ContentsPA: "",
    MotorVehicle1PA: "",
    MotorVehicle2PA: "",
    BoatPA: "",
    CaravanPA: "",
    OtherPA: "",
  };
  let onSubmit = (values) => {
    // alert('komail');
    setShowTable(false)
    let personalAssetsObj ={
      Email: localStorage.getItem("Email"),
      ContentsPA:values.ContentsPA||0,
      MotorVehicle1PA:values.MotorVehicle1PA||0,
      MotorVehicle2PA:values.MotorVehicle2PA||0,
      BoatPA:values.BoatPA||0,
      CaravanPA:values.CaravanPA||0,
      OtherPA:values.OtherPA||0,
    }
    if(postFlag===false){
      axios.post(`${DefaultUrl}/api/Client-PersonalAssets/Update/${personalAssetsObj.Email}`,personalAssetsObj)
    .then((res)=>{
      console.log('Personal Assets Has Been Added');
      setFormData(personalAssetsObj);
    })
    }
    else {
      axios.post(`${DefaultUrl}/api/Client-PersonalAssets/Add`,personalAssetsObj)
    .then((res)=>{
      console.log('Personal Assets Has Been Added');
      setFormData(personalAssetsObj);
    })}
  };

  return (
    <div className="row my-3">
      <div className="col-md-12">
        <Card className="shadow px-4 py-4">
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
              <div>
                {/*! formik of Employment Detail */}
                <h3 className="heading">
                  Personal Assets (Cars, Boats Caravans)
                  {/* <div className="iconContainerLg">
                    <img className="img-fluid" src={businessman} alt="" />
                  </div> */}
                </h3>
                  {showTable ?
                  (
                    <div>
                       <div className="row">
                  <div className="col-4 mb-3">
                    <label htmlFor="ContentsPA" className="form-label">
                      Contents
                    </label>
                  </div>
                  <div className="col-4 mb-3">
                    <Field
                      type="number"
                      className="form-control inputDesign shadow"
                      id="ContentsPA"
                      name="ContentsPA"
                      placeholder="Contents"
                    ></Field>
                    <ErrorMessage
                      component="div"
                      className="text-danger fw-bold"
                      name="ContentsPA"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 mb-3">
                    <label htmlFor="MotorVehicle1PA" className="form-label">
                      Motor Vehicle 1
                    </label>
                  </div>
                  <div className="col-4 mb-3">
                    <Field
                      type="number"
                      className="form-control inputDesign shadow"
                      id="MotorVehicle1PA"
                      name="MotorVehicle1PA"
                      placeholder="Motor Vehicle 1"
                    ></Field>
                    <ErrorMessage
                      component="div"
                      className="text-danger fw-bold"
                      name="MotorVehicle1PA"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 mb-3">
                    <label htmlFor="MotorVehicle2PA" className="form-label">
                      Motor Vehicle 2
                    </label>
                  </div>
                  <div className="col-4 mb-3">
                    <Field
                      type="number"
                      className="form-control inputDesign shadow"
                      id="MotorVehicle2PA"
                      name="MotorVehicle2PA"
                      placeholder="Motor Vehicle 2"
                    ></Field>
                    <ErrorMessage
                      component="div"
                      className="text-danger fw-bold"
                      name="MotorVehicle2PA"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 mb-3">
                    <label htmlFor="BoatPA" className="form-label">
                      Boat
                    </label>
                  </div>
                  <div className="col-4 mb-3">
                    <Field
                      type="number"
                      className="form-control inputDesign shadow"
                      id="BoatPA"
                      name="BoatPA"
                      placeholder="Boat"
                    ></Field>
                    <ErrorMessage
                      component="div"
                      className="text-danger fw-bold"
                      name="BoatPA"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 mb-3">
                    <label htmlFor="CaravanPA" className="form-label">
                      Caravan
                    </label>
                  </div>
                  <div className="col-4 mb-3">
                    <Field
                      type="number"
                      className="form-control inputDesign shadow"
                      id="CaravanPA"
                      name="CaravanPA"
                      placeholder="Caravan"
                    ></Field>
                    <ErrorMessage
                      component="div"
                      className="text-danger fw-bold"
                      name="CaravanPA"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 mb-3">
                    <label htmlFor="OtherPA" className="form-label">
                      Other
                    </label>
                  </div>
                  <div className="col-4 mb-3">
                    <Field
                      type="number"
                      className="form-control inputDesign shadow"
                      id="OtherPA"
                      name="OtherPA"
                      placeholder="Other"
                    ></Field>
                    <ErrorMessage
                      component="div"
                      className="text-danger fw-bold"
                      name="OtherPA"
                    />
                  </div>
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
                    </div>
                  )
                  : 
                   (
                    <div>
                       {/* table */}
                <div className="row">
                  <div className="col-12">
                    <div className="  px-4 py-4 ">
                      <h3 className="heading text-center">
                        Personal Assets
                        {/* <div className="iconContainerLg">
                                <img
                                  className="img-fluid"
                                  src={noteBook}
                                  alt=""
                                />
                              </div> */}
                      </h3>
                      <div className="row">
                        {/*  table  */}

                        <div className="table-responsive my-3" id="childTable">
                          <table className="table table-bordered table-hover text-center">
                            <thead className="text-light" id="tableHead">
                              <tr>
                                <th>Description </th>
                                <th>Current Value </th>
                                <th>Opt</th>
                              </tr>
                            </thead>
                            <tbody>
                              {((formData.ContentsPA !=='')&&(formData.ContentsPA !==undefined)&&(formData.ContentsPA>0))&&(
                                <tr>
                                <td>Contents</td>
                                <td>{formData.ContentsPA}</td>
                                <td><CustomDropDown Operations ={AssetsOperation}
                                Delete ={"Contents"}
                                Data = {formData}
                                FormikFun ={setValues} /></td>
                              </tr>
                              )}
                              {((formData.MotorVehicle1PA !=='')&&(formData.MotorVehicle1PA !== undefined)&&(formData.MotorVehicle1PA>0))&&(
                              <tr>
                                <td>Motor Vehicle 1</td>
                                <td>{formData.MotorVehicle1PA}</td>
                                 <td><CustomDropDown Operations ={AssetsOperation}
                                Delete ={"Motor Vehicle 1"}
                                Data = {formData}
                                FormikFun ={setValues} /></td>
                              </tr>
                              )}
                              {((formData.MotorVehicle2PA !=='')&&(formData.MotorVehicle2PA !== undefined)&&(formData.MotorVehicle2PA>0))&&(
                              <tr>
                                <td>Motor Vehicle 2</td>
                                <td>{formData.MotorVehicle2PA}</td>
                                 <td><CustomDropDown Operations ={AssetsOperation}
                                Delete ={"Motor Vehicle 2"}
                                Data = {formData}
                                FormikFun ={setValues} /></td>
                              </tr>
                              )} 
                              {((formData.BoatPA !=='')&&(formData.BoatPA !== undefined)&&(formData.BoatPA>0))&&(
                              <tr>
                                <td>Boat</td>
                                <td>{formData.BoatPA}</td>
                                 <td><CustomDropDown Operations ={AssetsOperation}
                                Delete ={"Boat"}
                                Data = {formData}
                                FormikFun ={setValues} /></td>
                              </tr>
                              )}
                              {((formData.CaravanPA !=='')&&(formData.CaravanPA !== undefined)&&(formData.CaravanPA>0))&&(
                              <tr>
                                <td>Caravan</td>
                                <td>{formData.CaravanPA}</td>
                                 <td><CustomDropDown Operations ={AssetsOperation}
                                Delete ={"Caravan"}
                                Data = {formData}
                                FormikFun ={setValues} /></td>
                              </tr>
                              )}
                              {((formData.OtherPA !=='')&&(formData.OtherPA !== undefined)&&(formData.OtherPA>0))&&(
                              <tr>
                                <td>Other</td>
                                <td>{formData.OtherPA}</td>
                                 <td><CustomDropDown Operations ={AssetsOperation}
                                Delete ={"Other"}
                                Data = {formData}
                                FormikFun ={setValues} /></td>
                              </tr>
                              )}  
                            </tbody>
                          </table>
                        </div>

                        {/*  table  */}
                       
                      </div>
                    </div>
                  </div>
                </div>

                {/* table */}
                    </div>
                   ) 
                  }
               
               
              </div>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default PersonalAssetsLiabilities;
