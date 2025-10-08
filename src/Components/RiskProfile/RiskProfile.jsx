import React, { useEffect, useState } from "react";
import "./riskProfile.css";
import axios from "axios";
import { Card } from "react-bootstrap";
import { defaultUrl } from "../../Store/Store";
import { useRecoilValue } from "recoil";

const RiskProfile = () => {

  let DefaultUrl = useRecoilValue(defaultUrl)

  let [QuestionStep, setQuestionStep] = useState(1);

  const [selectedValue1, setSelectedValue1] = useState("1");
  const [selectedValue2, setSelectedValue2] = useState("1");
  const [selectedValue3, setSelectedValue3] = useState("1");
  const [selectedValue4, setSelectedValue4] = useState("1");
  const [selectedValue5, setSelectedValue5] = useState("1");
  const [selectedValue6, setSelectedValue6] = useState("1");
  const [selectedValue7, setSelectedValue7] = useState("1");
  const [selectedValue8, setSelectedValue8] = useState("1");

  const [selectedValue11, setSelectedValue11] = useState("1");
  const [selectedValue22, setSelectedValue22] = useState("1");
  const [selectedValue33, setSelectedValue33] = useState("1");
  const [selectedValue44, setSelectedValue44] = useState("1");
  const [selectedValue55, setSelectedValue55] = useState("1");
  const [selectedValue66, setSelectedValue66] = useState("1");
  const [selectedValue77, setSelectedValue77] = useState("1");
  const [selectedValue88, setSelectedValue88] = useState("1");

  const [ProfileEdit, setProfileEdit] = useState(true);

  const [isJoined, setIsJoined] = useState("Yes");

  let Email = localStorage.getItem("Email");
  
  useEffect(() => {
    axios
      .get(`${DefaultUrl}/api/Client-RiskProfile`)
      .then((res) => {
        let childObj = res.data;
        let childFilterObj = childObj.filter((item) => item.Email == Email);

        if (childFilterObj.length === 1) {
          setProfileEdit(false);
          setSelectedValue1(childObj[0].Question1.toString());
          setSelectedValue2(childObj[0].Question2.toString());
          setSelectedValue3(childObj[0].Question3.toString());
          setSelectedValue4(childObj[0].Question4.toString());
          setSelectedValue5(childObj[0].Question5.toString());
          setSelectedValue6(childObj[0].Question6.toString());
          setSelectedValue7(childObj[0].Question7.toString());
          setSelectedValue8(childObj[0].Question8.toString());

          console.log("client data get successfully");
          console.log(childObj);
        } else {
          console.log("client data is Empty");
        }
      });

    axios
      .get(`${DefaultUrl}/api/Partner-RiskProfile`)
      .then((res) => {
        let childObj = res.data;
        let childFilterObj = childObj.filter((item) => item.Email == Email);

        if (childFilterObj.length === 1) {
          setSelectedValue11(childObj[0].PartnerQuestion1.toString());
          setSelectedValue22(childObj[0].PartnerQuestion2.toString());
          setSelectedValue33(childObj[0].PartnerQuestion3.toString());
          setSelectedValue44(childObj[0].PartnerQuestion4.toString());
          setSelectedValue55(childObj[0].PartnerQuestion5.toString());
          setSelectedValue66(childObj[0].PartnerQuestion6.toString());
          setSelectedValue77(childObj[0].PartnerQuestion7.toString());
          setSelectedValue88(childObj[0].PartnerQuestion8.toString());
          setIsJoined("No");
          console.log("Partner data get successfully");
          console.log(childFilterObj);
        } else {
          console.log("Partner data is Empty");
        }
      });
  }, []);

  const handleChange = (event) => {
    setIsJoined(event.target.value);
  };

  const handleChange1 = (event) => {
    setSelectedValue1(event.target.value);
  };
  const handleChange2 = (event) => {
    setSelectedValue2(event.target.value);
  };
  const handleChange3 = (event) => {
    setSelectedValue3(event.target.value);
  };

  const handleChange4 = (event) => {
    setSelectedValue4(event.target.value);
  };
  const handleChange5 = (event) => {
    setSelectedValue5(event.target.value);
  };
  const handleChange6 = (event) => {
    setSelectedValue6(event.target.value);
  };
  const handleChange7 = (event) => {
    setSelectedValue7(event.target.value);
  };
  const handleChange8 = (event) => {
    setSelectedValue8(event.target.value);
  };

  // partnered

  const handleChange11 = (event) => {
    setSelectedValue11(event.target.value);
  };
  const handleChange22 = (event) => {
    setSelectedValue22(event.target.value);
  };
  const handleChange33 = (event) => {
    setSelectedValue33(event.target.value);
  };

  const handleChange44 = (event) => {
    setSelectedValue44(event.target.value);
  };
  const handleChange55 = (event) => {
    setSelectedValue55(event.target.value);
  };
  const handleChange66 = (event) => {
    setSelectedValue66(event.target.value);
  };
  const handleChange77 = (event) => {
    setSelectedValue77(event.target.value);
  };
  const handleChange88 = (event) => {
    setSelectedValue88(event.target.value);
  };

  let submitHandler = () => {
    let clientData = {
      Email: localStorage.getItem("Email"),
      Question1: parseFloat(selectedValue1),
      Question2: parseFloat(selectedValue2),
      Question3: parseFloat(selectedValue3),
      Question4: parseFloat(selectedValue4),
      Question5: parseFloat(selectedValue5),
      Question6: parseFloat(selectedValue6),
      Question7: parseFloat(selectedValue7),
      Question8: parseFloat(selectedValue8),
    };

    let partnerData = {
      Email: localStorage.getItem("Email"),
      PartnerQuestion1: parseFloat(selectedValue11),
      PartnerQuestion2: parseFloat(selectedValue22),
      PartnerQuestion3: parseFloat(selectedValue33),
      PartnerQuestion4: parseFloat(selectedValue44),
      PartnerQuestion5: parseFloat(selectedValue55),
      PartnerQuestion6: parseFloat(selectedValue66),
      PartnerQuestion7: parseFloat(selectedValue77),
      PartnerQuestion8: parseFloat(selectedValue88),
    };

    if (isJoined === "Yes") {
      if (ProfileEdit) {
        axios
          .post(
            `${DefaultUrl}/api/Client-RiskProfile/Add-Client-RiskProfile`,
            clientData
          )
          .then((res) => console.log("Client Added Successfully!"));
        console.log(clientData);
        setProfileEdit(false);
      } else {
        axios
          .patch(
            `${DefaultUrl}/api/Client-RiskProfile/Update-Client-RiskProfile/${localStorage.getItem(
              "Email"
            )}`,
            clientData
          )
          .then((res) => console.log("Client Update Successfully!"));
      }
    } else {
      if (ProfileEdit) {
        axios
          .post(
            `${DefaultUrl}/api/Client-RiskProfile/Add-Client-RiskProfile`,
            clientData
          )
          .then((res) => console.log("Client Added Successfully!"));

        axios
          .post(
            `${DefaultUrl}/api/Partner-RiskProfile/Add-Partner-RiskProfile`,
            partnerData
          )
          .then((res) => console.log("Partner Added Successfully!"));

        setProfileEdit(false);
      } else {
        axios
          .patch(
            `${DefaultUrl}/api/Client-RiskProfile/Update-Client-RiskProfile/${localStorage.getItem(
              "Email"
            )}`,
            clientData
          )
          .then((res) => console.log("Client Updated Successfully!"));

        axios
          .get(
            `${DefaultUrl}/api/Partner-RiskProfile`
          )
          .then((res) => {
            let childObj = res.data;
            let childFilterObj = childObj.filter((item) => item.Email == Email);

            if (childFilterObj.length === 1) {
              axios
                .patch(
                  `${DefaultUrl}/api/Partner-RiskProfile/Update-Partner-RiskProfile/${localStorage.getItem(
                    "Email"
                  )}`,
                  partnerData
                )
                .then((res) => console.log("Partner Updated Successfully!"));
            } else {
              axios
                .post(
                  `${DefaultUrl}/api/Partner-RiskProfile/Add-Partner-RiskProfile`,
                  partnerData
                )
                .then((res) => console.log("Partner Added Successfully!"));
            }
          });
      }

      console.log(clientData);
      console.log(partnerData);
    }
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row px-0 m-0">
          <div className="col-md-12">

            <Card className="shadow py-4 px-4 my-3">
              <h3 className="text-center mainHeading">
                <b>Risk Profile</b>
              </h3>

              {/* question  */}
              <div className="mb-3">
                <label className="form-label">Joined Profile ?</label>
                {/* switch button style */}
                <div className="form-check form-switch m-0 p-0 ">
                  <div className="radiobutton">
                    <input
                      type="radio"
                      name="expectingInheritancesradio"
                      id="expectingInheritancesopt1"
                      onChange={handleChange}
                      value="Yes"
                      checked={isJoined == "Yes"}
                    />
                    <label
                      htmlFor="expectingInheritancesopt1"
                      className="label1"
                    >
                      <span>YES</span>
                    </label>
                    <input
                      type="radio"
                      name="expectingInheritancesradio"
                      id="expectingInheritancesopt2"
                      onChange={handleChange}
                      value="No"
                      checked={isJoined == "No"}
                    />
                    <label
                      htmlFor="expectingInheritancesopt2"
                      className="label2"
                    >
                      <span>NO</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* question */}

              <div className="row mt-5">
                {/* Client risk profile */}

                <div className="col-md-12">
                  <div>
                    <h4 className=" mainHeading">
                      <b>Client Risk Profile</b>
                    </h4>
                    {/* question 1 */}
                    {QuestionStep == 1 && (
                      <div className="my-3 Risk-fade-in-fwd ">
                        <h5 className="my-3">
                          <b>
                            Q 1. Keeping in mind your primary financial goals,
                            in approximately how many years would you expect to
                            need this money?
                          </b>
                        </h5>
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="1"
                            checked={selectedValue1 === "1"}
                            onChange={handleChange1}
                          />
                          Less than 1 year
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="2"
                            checked={selectedValue1 === "2"}
                            onChange={handleChange1}
                          />
                          1 – 3 years
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="3"
                            checked={selectedValue1 === "3"}
                            onChange={handleChange1}
                          />
                          3 – 7 years
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="4"
                            checked={selectedValue1 === "4"}
                            onChange={handleChange1}
                          />
                          More than 7 years
                        </label>
                      </div>
                    )}
                    {/* question 1 */}

                    {/* question 2 */}
                    {QuestionStep == 2 && (
                      <div className="my-3 Risk-fade-in-fwd ">
                        <h5 className="my-3">
                          <b>
                            {" "}
                            Q 2 . Keeping in mind the fact that to achieve a
                            higher return a greater risk need to be taken,
                            approximately what annual rate of return would you
                            need to meet you goals?
                          </b>
                        </h5>
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="1"
                            checked={selectedValue2 === "1"}
                            onChange={handleChange2}
                          />
                          Less than 5%
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="2"
                            checked={selectedValue2 === "2"}
                            onChange={handleChange2}
                          />
                          5% to 10%
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="3"
                            checked={selectedValue2 === "3"}
                            onChange={handleChange2}
                          />
                          above 10%
                        </label>{" "}
                        <br />
                      </div>
                    )}
                    {/* question 2 */}

                    {/* question 3 */}
                    {QuestionStep == 3 && (
                      <div className="my-3 Risk-fade-in-fwd ">
                        <h5 className="my-3">
                          <b>
                            Q 3 . Assuming you have an amount of money to
                            invest, how would you invest it?
                          </b>
                        </h5>
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="1"
                            checked={selectedValue3 === "1"}
                            onChange={handleChange3}
                          />
                          The safety of my money is my primary objective. I
                          would rather have a low rate of return than risk the
                          loss of any part of my capital.
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="2"
                            checked={selectedValue3 === "2"}
                            onChange={handleChange3}
                          />
                          I want my investment to produce the current income I
                          need and my capital should remain relatively stable.
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="3"
                            checked={selectedValue3 === "3"}
                            onChange={handleChange3}
                          />
                          I am willing to accept some fluctuation in my capital
                          over the short term in exchange for higher returns
                          over the long term.
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="4"
                            checked={selectedValue3 === "4"}
                            onChange={handleChange3}
                          />
                          In order to receive the maximum return on my
                          investment, I am willing to accept a higher degree of
                          risk.
                        </label>
                      </div>
                    )}
                    {/* question 3 */}

                    {/* question 4 */}
                    {QuestionStep == 4 && (
                      <div className="my-3 Risk-fade-in-fwd ">
                        <h5 className="my-3">
                          <b>
                            Q 4 . With regard to your attitude to tax, what
                            level of taxation are you prepared to accept in
                            order to meet your goals?
                          </b>
                        </h5>
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="1"
                            checked={selectedValue4 === "1"}
                            onChange={handleChange4}
                          />
                          I do not want to derive tax savings by purchasing
                          investments which may put my capital at risk.
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="2"
                            checked={selectedValue4 === "2"}
                            onChange={handleChange4}
                          />
                          I would prefer stable, reliable capital value and
                          returns with some tax savings if possible.
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="3"
                            checked={selectedValue4 === "3"}
                            onChange={handleChange4}
                          />
                          I can accept a small reduction in value from time to
                          time, in exchange for a tax advantage income.
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="4"
                            checked={selectedValue4 === "4"}
                            onChange={handleChange4}
                          />
                          My main aim is to minimise tax and I am prepared to
                          risk my capital to achieve this aim.
                        </label>
                      </div>
                    )}
                    {/* question 4 */}

                    {/* question 5 */}
                    {QuestionStep == 5 && (
                      <div className="my-3 Risk-fade-in-fwd ">
                        <h5 className="my-3">
                          <b>
                            Q 5 . How concerned are you that the earnings on you
                            savings and investment dollars can exceed the rate
                            of inflation?
                          </b>
                        </h5>
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="1"
                            checked={selectedValue5 === "1"}
                            onChange={handleChange5}
                          />
                          Not concerned
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="2"
                            checked={selectedValue5 === "2"}
                            onChange={handleChange5}
                          />
                          Slightly concerned
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="3"
                            checked={selectedValue5 === "3"}
                            onChange={handleChange5}
                          />
                          Moderately concerned
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="4"
                            checked={selectedValue5 === "4"}
                            onChange={handleChange5}
                          />
                          Highly concerned
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="5"
                            checked={selectedValue5 === "5"}
                            onChange={handleChange5}
                          />
                          Very highly concerned
                        </label>
                      </div>
                    )}
                    {/* question 5 */}

                    {/* question 6 */}
                    {QuestionStep == 6 && (
                      <div className="my-3 Risk-fade-in-fwd ">
                        <h5 className="my-3">
                          <b>
                            Q 6 . Have you ever invested in shares, Government
                            bonds or managed funds before?
                          </b>
                        </h5>
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="1"
                            checked={selectedValue6 === "1"}
                            onChange={handleChange6}
                          />
                          No, but if I had, the fluctuations would make me
                          uncomfortable.
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="2"
                            checked={selectedValue6 === "2"}
                            onChange={handleChange6}
                          />
                          No, but if I had, I would be comfortable with the
                          fluctuations in order to receive the potential for
                          higher returns.
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="3"
                            checked={selectedValue6 === "3"}
                            onChange={handleChange6}
                          />
                          Yes I have, but I was uncomfortable with the
                          fluctuations, despite the potential for higher
                          returns.
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="4"
                            checked={selectedValue6 === "4"}
                            onChange={handleChange6}
                          />
                          Yes I have, and I felt comfortable with the
                          fluctuations, in order to receive the potential for
                          higher returns.
                        </label>
                      </div>
                    )}
                    {/* question 6 */}

                    {/* question 7 */}
                    {QuestionStep == 7 && (
                      <div className="my-3 Risk-fade-in-fwd ">
                        <h5 className="my-3">
                          <b>
                            Q 7 . How would you react if your long-term
                            investments declined by 10% in one year?
                          </b>
                        </h5>
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="1"
                            checked={selectedValue7 === "1"}
                            onChange={handleChange7}
                          />
                          I can’t accept any declines in the value of my
                          investments.
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="2"
                            checked={selectedValue7 === "2"}
                            onChange={handleChange7}
                          />
                          If the income I received didn’t change, I would not be
                          too concerned about my capital declining in the short
                          term.
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="3"
                            checked={selectedValue7 === "3"}
                            onChange={handleChange7}
                          />
                          I generally invest for the long term, but would be
                          concerned with this decline.
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="4"
                            checked={selectedValue7 === "4"}
                            onChange={handleChange7}
                          />
                          I invest for the long term and would accept these
                          fluctuations due to short term market influences.
                        </label>
                      </div>
                    )}
                    {/* question 7 */}

                    {/* question 8 */}
                    {QuestionStep == 8 && (
                      <div className="my-3 Risk-fade-in-fwd ">
                        <h5 className="my-3">
                          <b>
                            Q 8 . Which one of the following statements
                            describes your feelings towards choosing an
                            investment?
                          </b>
                        </h5>
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="1"
                            checked={selectedValue8 === "1"}
                            onChange={handleChange8}
                          />
                          I would select investments that have a low degree of
                          risk associated with them.
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="2"
                            checked={selectedValue8 === "2"}
                            onChange={handleChange8}
                          />
                          I prefer to diversify with a mix of investments which
                          have an emphasis on low risk. I am happy to have a
                          small proportion of the portfolio invested in assets
                          which have a higher degree of risk in order to achieve
                          a slightly higher return. I am happy to accept a
                          negative investment return of 1 in 9 years.
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="3"
                            checked={selectedValue8 === "3"}
                            onChange={handleChange8}
                          />
                          I prefer to have a spread of investments in a balanced
                          portfolio. I am happy to have a negative return of 1
                          in 7 years.
                        </label>{" "}
                        <br />
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="4"
                            checked={selectedValue8 === "4"}
                            onChange={handleChange8}
                          />
                          I prefer to diversify my investments with an emphasis
                          on more investments which have higher returns, but
                          still having a small amount of low risk investments. I
                          am happy to accept a negative return of 1 in 5 years.
                        </label>
                        <label className="myLabel my-1">
                          <input
                            className="mx-2"
                            type="radio"
                            value="5"
                            checked={selectedValue8 === "5"}
                            onChange={handleChange8}
                          />
                          I would only select investments which have a higher
                          degree of investment price fluctuation so that I can
                          earn higher long term returns. I am happy to accept a
                          negative return of 1 in 3 years in order to achieve
                          this goal.
                        </label>
                      </div>
                    )}
                    {/* question 8 */}
                  </div>
                </div>

                {/* Partnered risk profile*/}
                {isJoined == "No" ? (
                  <div className="col-md-12">
                    <div className="">
                      <hr />
                      <h4 className=" mainHeading">
                        <b>Partner Risk Profile</b>
                      </h4>
                      {/* question 1 */}
                      {QuestionStep == 1 && (
                        <div className="my-3 Risk-fade-in-fwd ">
                          <h5 className="my-3">
                            <b>
                              Q 1. Keeping in mind your primary financial goals,
                              in approximately how many years would you expect
                              to need this money?
                            </b>
                          </h5>
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="1"
                              checked={selectedValue11 === "1"}
                              onChange={handleChange11}
                            />
                            Less than 1 year
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="2"
                              checked={selectedValue11 === "2"}
                              onChange={handleChange11}
                            />
                            1 – 3 years
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="3"
                              checked={selectedValue11 === "3"}
                              onChange={handleChange11}
                            />
                            3 – 7 years
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="4"
                              checked={selectedValue11 === "4"}
                              onChange={handleChange11}
                            />
                            More than 7 years
                          </label>
                        </div>
                      )}
                      {/* question 1 */}

                      {/* question 2 */}
                      {QuestionStep == 2 && (
                        <div className="my-3 Risk-fade-in-fwd ">
                          <h5 className="my-3">
                            <b>
                              {" "}
                              Q 2 . Keeping in mind the fact that to achieve a
                              higher return a greater risk need to be taken,
                              approximately what annual rate of return would you
                              need to meet you goals?
                            </b>
                          </h5>
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="1"
                              checked={selectedValue22 === "1"}
                              onChange={handleChange22}
                            />
                            Less than 5%
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="2"
                              checked={selectedValue22 === "2"}
                              onChange={handleChange22}
                            />
                            5% to 10%
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="3"
                              checked={selectedValue22 === "3"}
                              onChange={handleChange22}
                            />
                            above 10%
                          </label>{" "}
                          <br />
                        </div>
                      )}
                      {/* question 2 */}

                      {/* question 3 */}
                      {QuestionStep == 3 && (
                        <div className="my-3 Risk-fade-in-fwd ">
                          <h5 className="my-3">
                            <b>
                              Q 3 . Assuming you have an amount of money to
                              invest, how would you invest it?
                            </b>
                          </h5>
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="1"
                              checked={selectedValue33 === "1"}
                              onChange={handleChange33}
                            />
                            The safety of my money is my primary objective. I
                            would rather have a low rate of return than risk the
                            loss of any part of my capital.
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="2"
                              checked={selectedValue33 === "2"}
                              onChange={handleChange33}
                            />
                            I want my investment to produce the current income I
                            need and my capital should remain relatively stable.
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="3"
                              checked={selectedValue33 === "3"}
                              onChange={handleChange33}
                            />
                            I am willing to accept some fluctuation in my
                            capital over the short term in exchange for higher
                            returns over the long term.
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="4"
                              checked={selectedValue33 === "4"}
                              onChange={handleChange33}
                            />
                            In order to receive the maximum return on my
                            investment, I am willing to accept a higher degree
                            of risk.
                          </label>
                        </div>
                      )}
                      {/* question 3 */}

                      {/* question 4 */}
                      {QuestionStep == 4 && (
                        <div className="my-3 Risk-fade-in-fwd ">
                          <h5 className="my-3">
                            <b>
                              Q 4 . With regard to your attitude to tax, what
                              level of taxation are you prepared to accept in
                              order to meet your goals?
                            </b>
                          </h5>
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="1"
                              checked={selectedValue44 === "1"}
                              onChange={handleChange44}
                            />
                            I do not want to derive tax savings by purchasing
                            investments which may put my capital at risk.
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="2"
                              checked={selectedValue44 === "2"}
                              onChange={handleChange44}
                            />
                            I would prefer stable, reliable capital value and
                            returns with some tax savings if possible.
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="3"
                              checked={selectedValue44 === "3"}
                              onChange={handleChange44}
                            />
                            I can accept a small reduction in value from time to
                            time, in exchange for a tax advantage income.
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="4"
                              checked={selectedValue44 === "4"}
                              onChange={handleChange44}
                            />
                            My main aim is to minimise tax and I am prepared to
                            risk my capital to achieve this aim.
                          </label>
                        </div>
                      )}
                      {/* question 4 */}

                      {/* question 5 */}
                      {QuestionStep == 5 && (
                        <div className="my-3 Risk-fade-in-fwd ">
                          <h5 className="my-3">
                            <b>
                              Q 5 . How concerned are you that the earnings on
                              you savings and investment dollars can exceed the
                              rate of inflation?
                            </b>
                          </h5>
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="1"
                              checked={selectedValue55 === "1"}
                              onChange={handleChange55}
                            />
                            Not concerned
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="2"
                              checked={selectedValue55 === "2"}
                              onChange={handleChange55}
                            />
                            Slightly concerned
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="3"
                              checked={selectedValue55 === "3"}
                              onChange={handleChange55}
                            />
                            Moderately concerned
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="4"
                              checked={selectedValue55 === "4"}
                              onChange={handleChange55}
                            />
                            Highly concerned
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="5"
                              checked={selectedValue55 === "5"}
                              onChange={handleChange55}
                            />
                            Very highly concerned
                          </label>
                        </div>
                      )}
                      {/* question 5 */}

                      {/* question 6 */}
                      {QuestionStep == 6 && (
                        <div className="my-3 Risk-fade-in-fwd ">
                          <h5 className="my-3">
                            <b>
                              Q 6 . Have you ever invested in shares, Government
                              bonds or managed funds before?
                            </b>
                          </h5>
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="1"
                              checked={selectedValue66 === "1"}
                              onChange={handleChange66}
                            />
                            No, but if I had, the fluctuations would make me
                            uncomfortable.
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="2"
                              checked={selectedValue66 === "2"}
                              onChange={handleChange66}
                            />
                            No, but if I had, I would be comfortable with the
                            fluctuations in order to receive the potential for
                            higher returns.
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="3"
                              checked={selectedValue66 === "3"}
                              onChange={handleChange66}
                            />
                            Yes I have, but I was uncomfortable with the
                            fluctuations, despite the potential for higher
                            returns.
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="4"
                              checked={selectedValue66 === "4"}
                              onChange={handleChange66}
                            />
                            Yes I have, and I felt comfortable with the
                            fluctuations, in order to receive the potential for
                            higher returns.
                          </label>
                        </div>
                      )}
                      {/* question 6 */}

                      {/* question 7 */}
                      {QuestionStep == 7 && (
                        <div className="my-3 Risk-fade-in-fwd ">
                          <h5 className="my-3">
                            <b>
                              Q 7 . How would you react if your long-term
                              investments declined by 10% in one year?
                            </b>
                          </h5>
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="1"
                              checked={selectedValue77 === "1"}
                              onChange={handleChange77}
                            />
                            I can’t accept any declines in the value of my
                            investments.
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="2"
                              checked={selectedValue77 === "2"}
                              onChange={handleChange77}
                            />
                            If the income I received didn’t change, I would not
                            be too concerned about my capital declining in the
                            short term.
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="3"
                              checked={selectedValue77 === "3"}
                              onChange={handleChange77}
                            />
                            I generally invest for the long term, but would be
                            concerned with this decline.
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="4"
                              checked={selectedValue77 === "4"}
                              onChange={handleChange77}
                            />
                            I invest for the long term and would accept these
                            fluctuations due to short term market influences.
                          </label>
                        </div>
                      )}
                      {/* question 7 */}

                      {/* question 8 */}
                      {QuestionStep == 8 && (
                        <div className="my-3 Risk-fade-in-fwd ">
                          <h5 className="my-3">
                            <b>
                              Q 8 . Which one of the following statements
                              describes your feelings towards choosing an
                              investment?
                            </b>
                          </h5>
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="1"
                              checked={selectedValue88 === "1"}
                              onChange={handleChange88}
                            />
                            I would select investments that have a low degree of
                            risk associated with them.
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="2"
                              checked={selectedValue88 === "2"}
                              onChange={handleChange88}
                            />
                            I prefer to diversify with a mix of investments
                            which have an emphasis on low risk. I am happy to
                            have a small proportion of the portfolio invested in
                            assets which have a higher degree of risk in order
                            to achieve a slightly higher return. I am happy to
                            accept a negative investment return of 1 in 9 years.
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="3"
                              checked={selectedValue88 === "3"}
                              onChange={handleChange88}
                            />
                            I prefer to have a spread of investments in a
                            balanced portfolio. I am happy to have a negative
                            return of 1 in 7 years.
                          </label>{" "}
                          <br />
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="4"
                              checked={selectedValue88 === "4"}
                              onChange={handleChange88}
                            />
                            I prefer to diversify my investments with an
                            emphasis on more investments which have higher
                            returns, but still having a small amount of low risk
                            investments. I am happy to accept a negative return
                            of 1 in 5 years.
                          </label>
                          <label className="myLabel my-1">
                            <input
                              className="mx-2"
                              type="radio"
                              value="5"
                              checked={selectedValue88 === "5"}
                              onChange={handleChange88}
                            />
                            I would only select investments which have a higher
                            degree of investment price fluctuation so that I can
                            earn higher long term returns. I am happy to accept
                            a negative return of 1 in 3 years in order to
                            achieve this goal.
                          </label>
                        </div>
                      )}
                      {/* question 8 */}
                    </div>
                  </div>
                ) : (
                  <span></span>
                )}
                <div>
                  {QuestionStep == 8 && (
                    <button
                      className="float-end btn w-25  bgColor modalBtn "
                      onClick={submitHandler}
                    >
                      Submit
                    </button>
                  )}

                  {QuestionStep != 8 && (
                    <button
                      className="float-end btn w-25  bgColor modalBtn"
                      onClick={() => setQuestionStep(QuestionStep + 1)}
                    >
                      Next
                    </button>
                  )}

                  {QuestionStep != 1 && (
                    <button
                      className="float-end btn w-25  btn-outline  backBtn mx-3"
                      onClick={() => setQuestionStep(QuestionStep - 1)}
                    >
                      Back
                    </button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RiskProfile;
