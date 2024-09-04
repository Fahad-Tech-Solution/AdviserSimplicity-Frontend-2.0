import React, { useRef, useState } from 'react'
import { Overlay, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faTrashCan,
  faPenToSquare,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AllUsers, defaultUrl, QuestionDetail, StepsStatus } from '../../../Store/Store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DeleteAxios, PatchAxios } from '../Api/Api';

const CustomDropDown = (props) => {

  let DefaultUrl = useRecoilValue(defaultUrl)
  let [stepsStatus, setStepsStatus] = useRecoilState(StepsStatus); // eslint-disable-line no-unused-vars
  let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  const [personalDetail, setPersonalDetail] = useRecoilState(AllUsers);


  let View = props.View || false;

  let [gearShow, setGearShow] = useState(false);
  let [gearTarget, setGearTarget] = useState(null);

  const handleGearClick = (event) => {
    setGearShow(!gearShow);
    setGearTarget(event.target);
    // alert('hello'+gearShow);
  };

  //Overlay Popover
  const buttonRef = useRef(null);

  const handleUpdateClick = () => {
    props.Operations(1, props.Data)
    if (props.FormikFun) {
      props.FormikFun(props.Data)
    }
    setGearShow(false); // Hide the overlay after clicking
  };

  const handleDeleteClick = () => {
    if (props.Delete) {
      console.log("delete1")
      props.Operations(2, props.Data, props.Delete);
    }
    else {
      // console.log("delete2")
      //Delete Api Running 
      DeleteFun()
      props.Operations(2, props.Data)
    }
    setGearShow(false); // Hide the overlay after clicking
  };

  let Navigate = useNavigate();

  const handleView = () => {
    localStorage.setItem('UserID', props.Data._id)
    Navigate('/View-Client#' + props.Data.Email);
  };

  const handleEdit = () => {
    localStorage.setItem('UserID', props.Data._id)
    localStorage.setItem('Email', props.Data.Email)
    setQuestionDetail({})
    setStepsStatus(false);
    Navigate('/PersonalDetail#' + props.Data._id);
  };


  async function DeleteFun() {
    try {

      let res = await PatchAxios(DefaultUrl + "/api/personalDetails/softDelete/" + props.Data._id);
      if (res) {
        console.log(res)
        removeItemById(res._id)
      }
    }
    catch (error) {
      console.error("we Found an error in SoftDelete:", error);
    }

  }


  const removeItemById = (idToRemove) => {

    setPersonalDetail((prevData) =>
      prevData.filter((item) => item._id !== idToRemove)
    );

  };

  return (
    <div>
      <div ref={buttonRef}>
        <button
          type="button"
          onClick={(event) => {
            handleGearClick(event);
            event.stopPropagation();
          }}
          style={{
            borderRadius: "50%",
            border: "none",
            backgroundColor: "transparent",
          }}
        >
          <FontAwesomeIcon icon={faGear} />
        </button>
      </div>

      <Overlay
        show={gearShow}
        target={gearTarget}
        placement="bottom"
        container={document.body} // You can use document.body or any other suitable container
        containerPadding={20}
      >
        <Popover id="popover">
          {View &&
            <Popover.Header onClick={handleView}>
              <FontAwesomeIcon icon={faFileLines} /> View
            </Popover.Header>
          }
          {View &&
            <Popover.Header onClick={handleEdit}>
              <FontAwesomeIcon icon={faFileLines} /> Edit
            </Popover.Header>
          }
          {!View &&
            <Popover.Header onClick={handleUpdateClick}>
              <FontAwesomeIcon icon={faPenToSquare} /> Update
            </Popover.Header>
          }
          <Popover.Header onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={faTrashCan} /> Delete
          </Popover.Header>
        </Popover>
      </Overlay>

    </div>
  )
}

export default CustomDropDown
