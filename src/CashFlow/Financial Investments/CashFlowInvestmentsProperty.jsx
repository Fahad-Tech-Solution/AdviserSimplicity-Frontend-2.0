import React, { useEffect, useState } from 'react'
import DynamicTableRow from '../../Components/Assets/Dynamic/DynamicTableRow';
import { Form, Formik } from 'formik';
import { Row, Table } from 'react-bootstrap';
import { FaRegBuilding } from 'react-icons/fa6';
import InnerModal from '../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal';

const CashFlowInvestmentsProperty = (props) => {


    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let initialValues = {
        Contribution: "",
        RegularContributions: "",
        ContributeFromYear: "",
        ContributeUpUntil: "",
        Indexation: "",
    }

    let fillInitialValues = (setFieldValue) => {
        console.log(props.modalObject)

    }

    let onSubmit = (values) => {
        // props.setFieldValue(props.modalObject.stakeHolder + props.modalObject.key + "Obj", values)

        // // Reset the flag state if necessary
        // if (props.flagState) {
        //     props.setFlagState(false);
        // }
    }

    const loanTermOptions = Array.from({ length: 30 }, (_, i) => ({
        value: (i + 1).toString(),
        label: ("Year " + (i + 1)).toString(),
    }));

    const indexation = Array.from({ length: 21 }, (_, i) => ({
        value: (i * 0.5).toFixed(2) + "%",
        label: (i * 0.5).toFixed(2) + "%",
    }));


    let CalculatePercentage = (values, setFieldValue, CurrentInput, stakeHolder) => {
        // console.log(values, setFieldValue, CurrentInput, stakeHolder);

        let clientOwnership = values.ClientOwnership.replace(/[^0-9.]+/g, "") || 0;
        let partnerOwnership = values.PartnerOwnership.replace(/[^0-9.]+/g, "") || 0;

        switch (CurrentInput.name) {
            case "ClientOwnership":
                clientOwnership = CurrentInput.value.replace(/[^0-9.]+/g, "");
                setFieldValue("PartnerOwnership", (100 - (clientOwnership > 100 ? 100 : clientOwnership)).toFixed(2) + "%")
                break;
            case "PartnerOwnership":
                partnerOwnership = CurrentInput.value.replace(/[^0-9.]+/g, "");
                setFieldValue("ClientOwnership", (100 - (partnerOwnership > 100 ? 100 : partnerOwnership)).toFixed(2) + "%")
                break;
            default:
                console.log("Ma nahi Btao gha")
                break;
        }
    }


    let handleInnerModal = (title, values, key, stakeHolder) => {
        console.log(title, values, key);
        setModalObject({
            title,
            values,
            key,
            stakeHolder
        });
        setFlagState(true);
    };



    let rowConfig = [
        {
            value: "1",
            type: "plainText2.0",
        },
        {
            name: "StreetAddress",
            type: "text",
            placeholder: "Street Address",
        },
        {
            name: "ValueOfProperty",
            type: "number-toComma",
            placeholder: "Value of Property",
        },
        {
            name: "ClientOwnership",
            type: "number-toPercent",
            callBack: true,
            func: CalculatePercentage,
            placeholder: "Client % Ownership",

        },
        {
            name: "PartnerOwnership",
            type: "number-toPercent",
            callBack: true,
            func: CalculatePercentage,
            placeholder: "Partner % Ownership",
        },
        {
            name: "YearOfPurchase",
            type: "select",
            placeholder: "Year of Purchase",
            options: loanTermOptions,
        },
        {
            name: "TotalCostBase",
            type: "modal",
            placeholder: "Total Cost Base",
            innerModalTitle: "Total Cost Base",
            key: "TotalCostBase"
        },
        {
            name: "ExpectedGrowthRate",
            type: "number-toPercent",
            placeholder: "Expected Growth Rate",
        },
        {
            name: "LoanBalance",
            type: "yesnoModal",
            placeholder: "Loan Balance",
            innerModalTitle: "Loan Balance",
            key: "LoanBalance",
            callBack: true,
            func: handleInnerModal,
        },
        {
            name: "RentalIncome",
            type: "yesno",
            placeholder: "Rental Income",
        },
        {
            name: "SellPropertyInYear",
            type: "select",
            placeholder: "Sell Property in Year",
            options: loanTermOptions,
        },
        {
            name: "ConvertToPPRYear",
            type: "select",
            placeholder: "Convert into PPR in Year",
            options: loanTermOptions,
        },
    ];

    const componentMapping = {

    }

    const ModalContent = (obj) => {
        return componentMapping[obj.title] || null;
    };


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            innerRef={props.formRef}
        >
            {({ values, handleChange, setFieldValue, handleBlur }) => {
                useEffect(() => {
                    fillInitialValues(setFieldValue);
                }, []);

                return (
                    <Form>

                        <InnerModal
                            modalObject={modalObject}
                            setFieldValue={setFieldValue}
                            setFlagState={setFlagState}
                            flagState={flagState}
                        >
                            {ModalContent(modalObject)}
                        </InnerModal>

                        <Row>
                            <div className="col-md-12">
                                <div className="row justify-content-center">
                                    <div className="mt-4">
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>No#</th>
                                                    <th>Street Address</th>
                                                    <th>Current Value - <a href='https://www.property.com.au/' target='_blank' className='text-white'><FaRegBuilding /></a></th>
                                                    <th>Client %Ownership</th>
                                                    <th>Partner %Ownership</th>
                                                    <th>Year Of Purchase</th>
                                                    <th>Total Cost Base</th>
                                                    <th>Expected Growth Rate</th>
                                                    <th>Loan Balance</th>
                                                    <th>Rental Income</th>
                                                    <th>Sell Property in Year</th>
                                                    <th>Convert into PPR in year</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <DynamicTableRow
                                                    rowConfig={rowConfig}
                                                    values={values}
                                                    setFieldValue={setFieldValue}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    handleInnerModal={handleInnerModal}
                                                />
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default CashFlowInvestmentsProperty