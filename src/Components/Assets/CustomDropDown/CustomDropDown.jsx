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
import { defaultUrl } from '../../../Store/Store';
import { useRecoilValue } from 'recoil';

const CustomDropDown = (props) => {

  let DefaultUrl = useRecoilValue(defaultUrl)

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
    Navigate('/PersonalDetail#' + props.Data.Email);
  };


  async function DeleteFun() {

    if (props.Data.clientMaritalStatus !== "Single" &&
      props.Data.clientMaritalStatus !== "Widowed") {

      axios.delete(DefaultUrl + "/api/Partner/Delete-Partner/" + props.Data.Email).then((res) => {
        console.log("Partner Deleted");
        if (res.data) {
          // /api/Partner/Delete-Partner/guki@mailinator.com
          axios.delete(DefaultUrl + "/api/Client/Delete-Client/" + props.Data._id).then((res) => {
            if (res.data) {
              console.log("All Client is Delete !");
              window.location.reload();
            }
          })
        }
      })
    }
    else {
      axios.delete(DefaultUrl + "/api/Client/Delete-Client/" + props.Data._id).then((res) => {
        if (res.data) {
          console.log("All Client is Delete !");
          window.location.reload();
        }
      })
    }

  }


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
