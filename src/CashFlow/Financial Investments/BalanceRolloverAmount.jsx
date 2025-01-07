import React, { useEffect, useState } from 'react'
import DynamicTableRow from '../../Components/Assets/Dynamic/DynamicTableRow';
import { Form, Formik } from 'formik';
import { Row, Table } from 'react-bootstrap';
import InnerModal from '../../Components/Questions/FinancialInvestments/QuestionsDetail/InnerModal';
import ApplyDeeming from './ApplyDeeming';

const BalanceRolloverAmount = (props) => {

    let [disabledFlag, setDisabledFlag] = useState(true);
    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    let initialValues = {
        pensionType: "",
        commencePensionYear: "",
        applyDeeming: "",
        applyDeemingObj: {},
        totalSuperAnnuationBenefits: "",
        nominatedRolloverAmountType: "No",
        nominatedRolloverAmount: "",
        taxFreeComponent: "",
    }

    let fillInitialValues = (setFieldValue) => {
        console.log(props.modalObject);
        if (props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]) {
            let SubObj = props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]
            if (SubObj[props.modalObject.key + "Obj"]) {
                let Data = SubObj[props.modalObject.key + "Obj"];
                setFieldValue("pensionType", Data.pensionType);
                setFieldValue("commencePensionYear", Data.commencePensionYear);
                setFieldValue("applyDeeming", Data.applyDeeming);
                setFieldValue("applyDeemingObj", Data.applyDeemingObj);
                setFieldValue("totalSuperAnnuationBenefits", Data.totalSuperAnnuationBenefits);
                setFieldValue("nominatedRolloverAmountType", Data.nominatedRolloverAmountType);
                setFieldValue("nominatedRolloverAmount", Data.nominatedRolloverAmount);
                setFieldValue("taxFreeComponent", Data.taxFreeComponent);
            }
        }
    }

    let onSubmit = (values) => {

        console.log(JSON.stringify(values));

        props.setFieldValue(props.modalObject.stakeHolder + props.modalObject.key, values.taxFreeComponent)
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

    const nominatedRolloverAmountTypeOptions = [
        { value: "Partial", label: "Partial", },
        { value: "No", label: "No", },
        { value: "Full ", label: "Full ", }
    ]

    const pensionTypeOptions = [
        { value: "Account Based", label: "Account Based", },
        { value: "TTR", label: "TTR", }
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

    let nominatedRolloverAmountDisableHandle = (values, setFieldValue, CurrentInput, stakeHolder) => {
        if (CurrentInput.value === "Partial") {
            setDisabledFlag(false);
        }
        else {
            setDisabledFlag(true);
        }
    };

    let rowConfig = [
        {
            type: "plainText",
            text: props.modalObject.stakeHolder.replace(".", ""),
            styleSet: { fontWeight: "800", fontSize: "16px" }
        },
        {
            name: "pensionType",
            type: "select",
            options: pensionTypeOptions,
            placeholder: "Pension Type"
        },
        {

            name: "commencePensionYear",
            type: "select",
            options: yearsIncludedArray,
            placeholder: "Commence Pension in Year"
        },
        {
            name: "applyDeeming",
            type: "yesnoModal",
            placeholder: "Apply Deeming",
            callBack: true,
            key: "applyDeeming",
            innerModalTitle: "Apply Deeming",
            func: handleInnerModal,
        },
        {
            name: "totalSuperAnnuationBenefits",
            type: "number-toComma",
            placeholder: "Total Superannuation Benefits",
            disabled: true,
        },
        {
            name: "nominatedRolloverAmountType",
            type: "select",
            options: nominatedRolloverAmountTypeOptions,
            placeholder: "Nominated Rollover Amount",
            styleSet: { minWidth: "10vw" },
            callBack: true,
            func: nominatedRolloverAmountDisableHandle
        },
        {
            name: "nominatedRolloverAmount",
            type: "number-toComma",
            placeholder: "Nominated Rollover Amount",
            disabled: disabledFlag
        },
        {
            name: "taxFreeComponent",
            type: "number-toComma",
            placeholder: "Tax-free Component",
        },
    ]

    const componentMapping = {
        "Apply Deeming": <ApplyDeeming />,
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
                                                    <th>Pension Type</th>
                                                    <th>Commence Pension in Year</th>
                                                    <th>Apply Deeming</th>
                                                    <th>Total Superannuation Benefits</th>
                                                    <th colSpan={2}>Nominated Rollover amount</th>
                                                    <th>Tax-free Component</th>
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

export default BalanceRolloverAmount