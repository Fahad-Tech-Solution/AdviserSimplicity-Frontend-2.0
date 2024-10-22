import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BankDetail, CRState, CurrentPage, defaultUrl } from "../Store/Store";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { GetAxios } from "../Components/Assets/Api/Api";


const RecoilStateManage = () => {
  let [CRObject, setCRObject] = useRecoilState(CRState); // eslint-disable-line no-unused-vars
  let [CurrentP, setCurrentP] = useRecoilState(CurrentPage); // eslint-disable-line no-unused-vars
  let [bankDetailObj2, setBankDetailObj] = useRecoilState(BankDetail);
  let DefaultUrl = useRecoilValue(defaultUrl)

  const location = useLocation();

  let Navigate = useNavigate();

  useEffect(() => {

    // Access the pathname from the location object
    const currentRoute = location.pathname;

    // console.log("location Data", location, "currentRoute =", currentRoute, "CurrentP=", CurrentP);

    let localRoute = localStorage.getItem("route");

    if (currentRoute !== "/") {  // it dashboard route 

      if (CurrentP === "/") {  // it stored dashboard router

        if (localRoute && localRoute !== "/") { //
          Navigate(localRoute);
          setCurrentP(localRoute);
        }
        else {
          localStorage.setItem("route", currentRoute);
          setCurrentP(currentRoute);
        }

      } else {
        localStorage.setItem("route", currentRoute);
        setCurrentP(currentRoute);
      }
    }
    else {
      localStorage.setItem("route", currentRoute);
      setCurrentP(currentRoute);
    }

  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {

    if (!bankDetailObj2?._id) {
      fetchData();
    }
  }, [])

  async function fetchData() {
    try {
      const res = await GetAxios(`${DefaultUrl}/api/investmentoffer/`);
      if (res) {
        console.log(JSON.stringify(res))
        setBankDetailObj(res)
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }




  return <div className="p-0 m-0"></div>;
};

export default RecoilStateManage;
