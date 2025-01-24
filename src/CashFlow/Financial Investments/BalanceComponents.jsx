import React, { useEffect, useState } from 'react'
import DynamicTableRow from '../../Components/Assets/Dynamic/DynamicTableRow';
import { Form, Formik } from 'formik';
import { Row, Table } from 'react-bootstrap';
import { toCommaAndDollar } from '../../Components/Assets/Api/Api';

const BalanceComponents = (props) => {

    let [doubleRowFLag, setDoubleRowFlag] = useState(false);

    let initialValues = {}

    let fillInitialValues = (setFieldValue) => {
        console.log(props.modalObject.DiscoveryObj);
        let Double = false;
        let DiscoveryObj = props.modalObject.DiscoveryObj;

        if (DiscoveryObj[props.modalObject.stakeHolder.replace(".", "")]) {
            let DiscoveryObjArray = DiscoveryObj[props.modalObject.stakeHolder.replace(".", "")];
            let totalOfAnnualAdvice = DiscoveryObjArray.reduce((total, entry) => total + parseFloat((entry.annualAdvice).replace(/[^0-9.-]+/g, "")), 0)

            let taxFreeComponentTotal = DiscoveryObjArray.reduce((total, entry) => total + parseFloat((entry.balanceBenefitDetailsArray[0].taxFreeComponent).replace(/[^0-9.-]+/g, "")), 0)

            setFieldValue("currentBalance", toCommaAndDollar(totalOfAnnualAdvice))
            setFieldValue("taxFreeComponent", toCommaAndDollar(taxFreeComponentTotal))
            // alert(DiscoveryObjArray.length)
            if (DiscoveryObjArray.length > 1) {
                Double = true;
                setFieldValue("currentBalance1", toCommaAndDollar(totalOfAnnualAdvice))
                setFieldValue("taxFreeComponent1", toCommaAndDollar(taxFreeComponentTotal))
                setDoubleRowFlag(Double);
            }

        }

        if (props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]) {
            let SubObj = props.modalObject.values[props.modalObject.stakeHolder.replace(".", "")]
            if (SubObj[props.modalObject.key + "Obj"]) {
                let Data = SubObj[props.modalObject.key + "Obj"];

                setFieldValue("currentBalance", Data.currentBalance)
                setFieldValue("taxFreeComponent", Data.taxFreeComponent)
                setFieldValue("pensionRollback", Data.pensionRollback)
                setFieldValue("taxFreeComponentPension", Data.taxFreeComponentPension)
                setFieldValue("totalTaxFreeComponent", Data.totalTaxFreeComponent)
                setFieldValue("taxableComponent", Data.taxableComponent)

                if (Double) {
                    setFieldValue("currentBalance1", Data.currentBalance1)
                    setFieldValue("taxFreeComponent1", Data.taxFreeComponent1)
                    setFieldValue("pensionRollback1", Data.pensionRollback1)
                    setFieldValue("taxFreeComponentPension1", Data.taxFreeComponentPension1)
                    setFieldValue("totalTaxFreeComponent1", Data.totalTaxFreeComponent1)
                    setFieldValue("taxableComponent1", Data.taxableComponent1)
                }
            }
        }

    }

    let onSubmit = (values) => {

        props.setFieldValue(props.modalObject.stakeHolder + props.modalObject.key, doubleRowFLag ? toCommaAndDollar(parseFloat(values.currentBalance1.replace(/[^0-9.-]+/g, "")) + parseFloat(values.currentBalance.replace(/[^0-9.-]+/g, ""))) : values.currentBalance)
        props.setFieldValue(props.modalObject.stakeHolder + props.modalObject.key + "Obj", values)

        // Reset the flag state if necessary
        if (props.flagState) {
            props.setFlagState(false);
        }
    }

    let rowConfig = [
        {
            name: "index",
            type: "plainText2.0",
            value: "1"
        },
        {
            name: "currentBalance",
            type: "number-toComma",
            placeholder: "Current Balance",
        },
        {
            name: "taxFreeComponent",
            type: "number-toComma",
            placeholder: "Tax-Free Component",
        },
        {
            name: "pensionRollback",
            type: "number-toComma",
            placeholder: "Pension Rollback (Year 1 Only)",
        },
        {
            name: "taxFreeComponentPension",
            type: "number-toComma",
            placeholder: "Tax-Free Component of Pension",
        },
        {
            name: "totalTaxFreeComponent",
            type: "number-toComma",
            placeholder: "Tax-Free Component",
            disabled: true
        },
        {
            name: "taxableComponent",
            type: "number-toComma",
            placeholder: "Taxable Component",
            disabled: true
        },
    ]

    let rowConfig2 = [
        {
            name: "index",
            type: "plainText2.0",
            value: "2"
        },
        {
            name: "currentBalance1",
            type: "number-toComma",
            placeholder: "Current Balance",
        },
        {
            name: "taxFreeComponent1",
            type: "number-toComma",
            placeholder: "Tax-Free Component",
        },
        {
            name: "pensionRollback1",
            type: "number-toComma",
            placeholder: "Pension Rollback (Year 1 Only)",
        },
        {
            name: "taxFreeComponentPension1",
            type: "number-toComma",
            placeholder: "Tax-Free Component of Pension",
        },
        {
            name: "totalTaxFreeComponent1",
            type: "number-toComma",
            placeholder: "Tax-Free Component",
            disabled: true
        },
        {
            name: "taxableComponent1",
            type: "number-toComma",
            placeholder: "Taxable Component",
            disabled: true
        },
    ]


    let handleChildButtonClick = async (values, setFieldValue) => {
        alert("ma chala");
        // try {
        //     let obj = {
        //         values: props.modalObject.values,
        //         AllCashFlowData: cashFlowData,
        //     };

        //     obj.values[props.modalObject.key + "Obj"] = values;
        //     obj.values[props.modalObject.key] = values.costBaseExisting;

        //     // let res = await PostAxios(`${defaultUrl}/api/Calculate/Overseas`, obj);
        //     // console.log(res, "res");
        //     // if (res) {
        //     //     console.log(res);

        //     // }
        //     openNotificationSuccess("success", "topRight", "Success Notification", 'Data of "' + props.modalObject.title + '" is Saved');
        // } catch (error) {
        //     console.error("Error occurred while making API call:", error);
        //     openNotificationSuccess("error", "topRight", "Error Notification", 'Data of "' + props.modalObject.title + '" is not Saved Please! try again');
        // }
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
                            <div className="col-md-12">
                                <div className="row justify-content-center">
                                    <div className="mt-4">
                                        <Table striped bordered responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Fund</th>
                                                    <th>Current Balance</th>
                                                    <th>Tax-Free Component</th>
                                                    <th>Pension Rollback (Year 1 Only)</th>
                                                    <th>Tax-Free Component of Pension</th>
                                                    <th>Tax-Free Component</th>
                                                    <th>Taxable Component</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <DynamicTableRow
                                                    rowConfig={rowConfig}
                                                    values={values}
                                                    setFieldValue={setFieldValue}
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                />
                                                {doubleRowFLag &&
                                                    <DynamicTableRow
                                                        rowConfig={rowConfig2}
                                                        values={values}
                                                        setFieldValue={setFieldValue}
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                    />
                                                }
                                            </tbody>
                                        </Table>
                                        
                                        <button
                                            ref={props.childButtonRef}
                                            onClick={() => { handleChildButtonClick(values, setFieldValue) }}
                                            style={{ display: "none" }} // Hidden button
                                            type="button"
                                        >
                                            Hidden Child Button
                                        </button>
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

export default BalanceComponents