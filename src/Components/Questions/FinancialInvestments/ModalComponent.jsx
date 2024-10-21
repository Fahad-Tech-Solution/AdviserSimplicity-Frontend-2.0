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


    const xlTitles = [
        "Questions",
        "Employement Income",
        // "Australian Shares",
        // "Managed Funds",
        // "Investment Bond",
        "Investment Loan",
        "Margin Loan",
        "Personal Loan",
        "Credit Card",
        "Home Loan",
        "Own a Family Home",
        "Holiday Home",
        "Holiday Home Loan",
        "Investment Property Details",
        "Investment Property Loan",
        // "Super Funds",
        // "Account Based Pension",
        // "invested in Annuities",
        "Wills",
        "Power of Attorneys",
        "Professional Advisers",
        "Centerlink Payments",
        "Sole Trader",
        "Partnership",
        "SMSF Details",
        "SMSF Investment Loan",
        "Investment Home Loan",
        // "Business as Company Structure",
        // "Business as Trusts",
        "Family Trust Details",
        "Family Trust Investment Loan",
        "Goals and Objectives Questions",
        "Set up a Budget",
        "Pay off Credit Card/Debt",
        "Protect my Lifestyle & Family",
        "Take a Holiday",
        "Buy a Car",
        "Accumulate Emergency Fund",
        "Regular Savings Plan",
        "Buy a House",
        "Buy a Boat",
        "Buy a Carvan",
        "Upgrade Family Home",
        "Renovate Family Home",
        "Downsize Family Home",
        "Buy an Investment Property",
        "Pay off Home Loan",
        "Start a Business",
        "Save for Children’s Education",
        "Plan for Retirement",
        "Start a Family",
        "Care for Ageing Family Member",
        "Receive an Inheritance",
        "Leave an Inheritance",
        "Eligibility to Centrelink",
        "Set up a Family Trust",
        "Set up an SMSF",
        "Save for a Wedding",
        "Estate Planning",
        "Set up an Investment Portfolio",
        "Review Investment Portfolio",
        "Pay Less Tax",
        "Ongoing Financial Advice",
        "Review my Super",
        "Combine my Super into One",
        "Contribute Money into Super",
        "Generate a Retirement Income Stream",
        "Set up a Super Income Stream",
        "Review your Current Personal Insurance Cover",
        "Analysis of your Personal Insurance needs",
        "Retain Current Personal Insurances as is",
        "Reduce my Current Personal Insurance Cover",
        "Advice on Surplus Income",
        "Investment Home",
        "Investment Home Loan",
        "Investment Home Expanse",
        "Family Investment Home",
        "Family Investment Home Loan",
        "Family Investment Home Expanse",
        // "Life Insurance",
        // "Risk Goals"

    ]; // Add other titles that should use "xl" here

    let fullTitles = ["Life Insurance", "Personal Insurance", "Investment Loan", "Margin Loan"]

    const size = fullTitles.includes(props.modalObject.title) ? "xxl" : xlTitles.includes(props.modalObject.title) ? "xl" : "lg";



    return (
        <div>

            <Modal dialogClassName={size === "xxl" && "modal-90w"} size={size === "xxl" ? "" : size} backdrop="static" keyboard={false} centered show={props.flagState} onHide={() => { props.setFlagState(false) }}>
                <Element id="modal-container">
                </Element>
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalObject.title === "Regular Living Expenses" ? props.modalObject.title2 : props.modalObject.title}</Modal.Title>
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