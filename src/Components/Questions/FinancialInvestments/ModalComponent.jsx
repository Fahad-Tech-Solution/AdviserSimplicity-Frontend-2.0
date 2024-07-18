import React, { useEffect, useRef } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { scroller, Element } from 'react-scroll';

const ModalComponent = (props) => {

    const formRef = useRef(null);  // Create a ref to store the form instance

    const handleOk = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();  // Trigger Formik's handleSubmit
        }
    };

    let flagState = props.flagState;
    let setFlagState = props.setFlagState;
    let modalObject = props.modalObject;
    let setQuestionChange = props.setQuestionChange;

    let turnBack = () => {
        props.Question

        switch (props.Question) {
            case "income":
                setQuestionChange("FinancialInvestments");
                break;
            case "Lifestyle":
                setQuestionChange("income");
                break;
            case "Investment":
                setQuestionChange("Lifestyle");
                break;
            case "SuperAndRetirement":
                setQuestionChange("Investment");
                break;
            case "ProfessionalAdvisor":
                setQuestionChange("SuperAndRetirement");
                break;
            case "SMSF":
                setQuestionChange("ProfessionalAdvisor");
                break;
            case "InvestmentTrust":
                setQuestionChange("SMSF");
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        // console.log("Ma chala a a a ", props.Question)
        // Scroll to the header of the modal whenever props.Question changes
        scroller.scrollTo("modal-header", {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart',
            containerId: 'modal-container'
        });
    }, [props.setQuestionChange, props.Question]);


    const xlTitles = ["Australian Shares", "Managed Funds", "Investment Bond", "Investment Loan", "Margin Loan", "Personal Loan", "Credit Card", "Home Loan", "Own a Family Home", "Investment Property Details", "Investment Property Loan", "Super Funds", "Account Based Pension", "invested in Annuities", "Will"]; // Add other titles that should use "xl" here

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
                        React.cloneElement(props.children, { formRef, flagState, setFlagState, modalObject, setQuestionChange })
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

export default ModalComponent

// {props.Question ? Question : "Submit"}