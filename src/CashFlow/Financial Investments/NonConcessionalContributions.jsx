import React, { useEffect, useState } from 'react'
import DynamicTableRow from '../../Components/Assets/Dynamic/DynamicTableRow';
import { Form, Formik } from 'formik';
import { Row, Table } from 'react-bootstrap';
import InnerModal from '../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal';
import ContributionSplittingInner from './ContributionSplittingInner';
import OtherPercentageAmount from './OtherPercentageAmount';
import LumpsumNonConcessionalNonConcessional from './LumpsumNonConcessionalNonConcessional';
import DownSizerContributionNonConcessional from "./DownSizerContributionNonConcessional";
import ApplySpouseContribution from "./ApplySpouseContribution";

const NonConcessionalContributions = (props) => {

    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let initialValues = {
        lumpsumNonConcessionalYearOne: "",
        contributionsToFund: "",
        lumpsumNonConcessional: "",
        lumpsumNonConcessionalObj: {},
        regularNonConcessional: "",
        yearCommence: "",
        yearsInclude: "",
        contributionsFund: "",
        governmentCoContribution: "",
        // downSizerContribution: "",
        // downSizerContributionObj: {},
        applySpouseContribution: "",
        applySpouseContributionObj: {},
    }

    let fillInitialValues = (setFieldValue) => {
        console.log(props.modalObject);
        if (props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]) {
            let SubObj = props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]
            if (SubObj[props.modalObject.key + "Obj"]) {
                let Data = SubObj[props.modalObject.key + "Obj"];
                setFieldValue("lumpsumNonConcessionalYearOne", Data.lumpsumNonConcessionalYearOne);
                setFieldValue("contributionsToFund", Data.contributionsToFund);
                setFieldValue("lumpsumNonConcessional", Data.lumpsumNonConcessional);
                setFieldValue("lumpsumNonConcessionalObj", Data.lumpsumNonConcessionalObj);
                setFieldValue("regularNonConcessional", Data.regularNonConcessional);
                setFieldValue("yearCommence", Data.yearCommence);
                setFieldValue("yearsInclude", Data.yearsInclude);
                setFieldValue("contributionsFund", Data.contributionsFund);
                setFieldValue("governmentCoContribution", Data.governmentCoContribution);
                // setFieldValue("downSizerContribution", Data.downSizerContribution);
                // setFieldValue("downSizerContributionObj", Data.downSizerContributionObj);
                setFieldValue("applySpouseContribution", Data.applySpouseContribution);
                setFieldValue("applySpouseContributionObj", Data.applySpouseContributionObj);
            }
        }
    }

    let onSubmit = (values) => {

        console.log(JSON.stringify(values));

        props.setFieldValue(props.modalObject.stakeHolder + props.modalObject.key + "Obj", values)

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    }

    const yearsIncludedArray = Array.from({ length: 30 }, (_, i) => {
        return ({
            value: (i + 1).toString(),
            label: ("Year " + (i + 1)).toString(),
        })
    });

    const contributionsFundOptions = [
        { value: "1", label: "1", },
        { value: "2", label: "2", },
        { value: "SMSF", label: "SMSF", }
    ]

    const contributionsToFundOptions = [
        { value: "1", label: "1", },
        { value: "SMSF", label: "SMSF", }
    ]

    let handleInnerModal = (title, values, key, stakeHolder) => {
        console.log(title, values, key, stakeHolder);
        setModalObject({
            title,
            values,
            key,
            stakeHolder: props.modalObject.stakeHolder,
        });
        setFlagState(true);
    };

    let rowConfig = [
        {
            type: "plainText",
            text: props.modalObject.stakeHolder.replace(".", ""),
            styleSet: { fontWeight: "800", fontSize: "16px" }
        },
        {
            name: "lumpsumNonConcessionalYearOne",
            type: "number-toComma",
            placeholder: "Lumpsum Non - Concessional(Year 1 only)"
        },
        {
            name: "contributionsToFund",
            type: "select",
            options: contributionsToFundOptions,
            placeholder: "Contributions To Fund"
        },
        {
            name: "lumpsumNonConcessional",
            type: "yesnoModal",
            placeholder: "Lumpsum Non - Concessional",
            callBack: true,
            key: "lumpsumNonConcessional",
            innerModalTitle: "Lumpsum Non - Concessional",
            func: handleInnerModal,
        },
        {
            name: "regularNonConcessional",
            type: "number-toComma",
            placeholder: "Regular Non - Concessional"
        },
        {
            name: "yearCommence",
            type: "select",
            options: yearsIncludedArray,
            placeholder: "Year to Commence"
        },
        {
            name: "yearsInclude",
            type: "select",
            options: yearsIncludedArray,
            placeholder: "Years to Include"
        },
        {
            name: "contributionsFund",
            type: "select",
            options: contributionsFundOptions,
            placeholder: "Contributions To Fund"
        },
        {
            name: "governmentCoContribution",
            type: "select",
            options: contributionsToFundOptions,
            placeholder: "Government Co - contribution to"
        },
        {
            name: "downSizerContribution",
            type: "yesnoModal",
            placeholder: "Downsizer contribution",
            callBack: true,
            key: "downSizerContribution",
            innerModalTitle: "Downsizer contribution",
            func: handleInnerModal,
        },
        {
            name: "applySpouseContribution",
            type: "yesnoModal",
            placeholder: "Apply Spouse Contribution",
            callBack: true,
            key: "applySpouseContribution",
            innerModalTitle: "Apply Spouse Contribution",
            func: handleInnerModal,
        },
    ]

    const componentMapping = {
        "Lumpsum Non - Concessional": <LumpsumNonConcessionalNonConcessional />,
        "Downsizer contribution": <DownSizerContributionNonConcessional />,
        "Apply Spouse Contribution": <ApplySpouseContribution />,
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
                        <Row>
                            <InnerModal
                                modalObject={modalObject}
                                setFieldValue={setFieldValue}
                                setFlagState={setFlagState}
                                flagState={flagState}
                            >
                                {ModalContent(modalObject)}
                            </InnerModal>

                            <div className="col-md-12" >
                                <div className="row justify-content-center">
                                    <div className="mt-4">
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Owner</th>
                                                    <th>Lumpsum Non-Concessional (Year 1 only)</th>
                                                    <th>Contributions To Fund</th>
                                                    <th>Lumpsum Non-Concessional</th>
                                                    <th>Regular Non-Concessional</th>
                                                    <th>Year to Commence</th>
                                                    <th>Years to Include</th>
                                                    <th>Contributions To Fund</th>
                                                    <th>Government Co-contribution to</th>
                                                    <th>Downsizer contribution</th>
                                                    <th>Apply Spouse Contribution</th>
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

export default NonConcessionalContributions