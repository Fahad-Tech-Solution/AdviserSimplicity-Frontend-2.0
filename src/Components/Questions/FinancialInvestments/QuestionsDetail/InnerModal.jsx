import React, { useEffect, useRef } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { scroller, Element } from 'react-scroll';

const InnerModal = (props) => {

    const formRef = useRef(null);  // Create a ref to store the form instance

    const handleOk = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();  // Trigger Formik's handleSubmit
        }
    };

    let flagState = props.flagState;
    let setFieldValue = props.setFieldValue;
    let setFlagState = props.setFlagState;
    let modalObject = props.modalObject;
    let setQuestionChange = props.setQuestionChange;


    const xlTitles = ["Member Number & Details","Insurances Attached"]; // Add other titles that should use "xl" here

    const size = xlTitles.includes(props.modalObject.title) ? "xl" : "lg";

    return (
        <div>
            <Modal size={size} backdrop="static" keyboard={false} centered show={props.flagState} onHide={() => { props.setFlagState(false) }}>

                <Element id="modal-container">
                </Element>
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalObject.title}</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    {props.children ? (
                        React.cloneElement(props.children, { formRef, flagState, setFlagState, modalObject, setQuestionChange, setFieldValue })
                    ) : "no Child exist"}
                </Modal.Body>

                <Modal.Footer>

                    <Button variant="secondary" style={{ width: "12.5%" }} onClick={() => props.setFlagState(false)}>
                        Close
                    </Button>
                    <button type='button' className='btn bgColor modalBtn' style={{ width: "12.5%" }} onClick={handleOk}>
                        Submit
                    </button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default InnerModal

// {props.Question ? Question : "Submit"}