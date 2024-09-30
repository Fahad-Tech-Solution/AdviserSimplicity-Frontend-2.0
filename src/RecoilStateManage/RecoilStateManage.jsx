import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { CRState, CurrentPage } from "../Store/Store";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


const RecoilStateManage = () => {
  let [CRObject, setCRObject] = useRecoilState(CRState); // eslint-disable-line no-unused-vars
  let [CurrentP, setCurrentP] = useRecoilState(CurrentPage); // eslint-disable-line no-unused-vars
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


  return <div className="p-0 m-0"></div>;
};

export default RecoilStateManage;
