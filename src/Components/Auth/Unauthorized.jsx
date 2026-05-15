import React from "react";
import unAuth from "../Questions/svgs/401 Error Unauthorized-rafiki.svg";
import { Image } from "react-bootstrap";

const Unauthorized = () => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-10">
          <div className="d-flex justify-content-center align-items-center">
            <Image src={unAuth} fluid width={"50%"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
