import React, { useEffect, useRef, useState } from 'react'
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


    const xlTitles = ["Member Number & Details",
        "Insurances Attached",
        "Pension Benefits",
        "Balance & Benefit Details",
        "Salary Package",
        "Home Loan",
        "Australian Shares/ETFs Detail",
        "Managed Funds Detail",
        "Super Funds Detail",
        "Investment Bond Detail",
        // "Account Based Pension Detail",
        "Invested in Annuities Detail",
        "Property Loan Details",
        "Risk Goals",
        "Business as Company Structure Detail",
        "Business as Trusts",
        "Pension Benefits Details",
        "SMSF Australian Shares/ETFs Detail",
        "Family Trust Platform Investments Detail",
        "Family Trust Australian Shares/ETFs Detail",
        // "Portfolio Value"
        // "Bank Accounts Detail"
    ]; // Add other titles that should use "xl" here

    const xlKeys = ["balanceBenefitDetailsArray",
        "groupInsuranceArray",
        "premiumsDetails",
        "sumInsured",
        "beneficiariesArray",
        // "ContributionsArray"
        // "Bank Accounts Detail"
    ]; // Add other titles that should use "xl" here


    let fullTitles = ["Platform Investments Detail",
        "Balance & Benefit Details",
        "Annuities Detail",
        "Property Loan Details",
        "Expense Details",
        "Super Funds Detail",
        "Account Based Pension Detail",
        "SMSF Accumulation Details",
        "Accumulations Benefits",
        "Pension Benefits",
        // "Pension Benefits Details",
        "SMSF Platform Investments Detail",

    ]


    let [size, setSize] = useState("md");

    useEffect(() => {
        // console.log(props.modalObject, "inner Modal"); // Log the modalObject

        // Check if modalObject is defined and has a title
        if (props.modalObject && props.modalObject.title) {
            let currentTitle = props.modalObject.title;

            // Check if the title contains an underscore
            if (currentTitle.includes('_')) {
                currentTitle = (currentTitle.split('_').slice(1))[0];

            }

            console.log(currentTitle, "currentTitle"); // Log the modalObject

            let modalSize = fullTitles.includes(currentTitle)
                ? "xxl"
                : xlTitles.includes(currentTitle)
                    ? "xl"
                    : xlKeys.includes(props.modalObject.key)
                        ? "xl"
                        : "lg";

            setSize(modalSize);

        }
    }, [props.modalObject]);




    return (
        <div>
            <Modal dialogClassName={size === "xxl" && "modal-90w"} size={size === "xxl" ? "" : size} backdrop="static" keyboard={false} centered show={props.flagState} onHide={() => { props.setFlagState(false) }}>
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
                    <Button variant="secondary" style={{ width: "12.5%", minWidth: "fit-content" }} onClick={() => props.setFlagState(false)}>
                        Close
                    </Button>
                    <button type='button' className='btn bgColor modalBtn' style={{ width: "12.5%", minWidth: "fit-content" }} onClick={handleOk}>
                        Submit
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default InnerModal

// {props.Question ? Question : "Submit"}