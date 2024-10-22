import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card, InputGroup, Row, Table } from 'react-bootstrap'

import "yup-phone";
import * as Yup from 'yup';

import Add from "../Questions/svgs/add-circle-solid-svgrepo-com.svg";
import ModalComponent from '../Questions/FinancialInvestments/ModalComponent';
import InsittuteFom from './InsittuteFom';

import OfferFom from './OfferFom';
import { Pagination, Tooltip } from 'antd';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiSolidEdit } from 'react-icons/bi';
import { HiOutlinePlus } from 'react-icons/hi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl } from '../../Store/Store';
import { GetAxios, openNotificationSuccess, PatchAxios } from '../Assets/Api/Api';
import { SimpleSelectField } from '../Questions/FinancialInvestments/QuestionsDetail/CreatableMultiSelectField';


const InstituteAndOffer = (props) => {

    let { Data } = props

    let bankDetailObj = useRecoilValue(BankDetail)

    let [bankDetailObj2, setBankDetailObj] = useRecoilState(BankDetail);
    let DefaultUrl = useRecoilValue(defaultUrl)

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Number of rows per page

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const res = await GetAxios(`${DefaultUrl}/api/investmentoffer/`);
            if (res) {
                // console.log(JSON.stringify(res))
                setBankDetailObj(res)
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }

    let [flagState, setFlagState] = useState(false);
    let [investmentFieldSearch, setInvestmentFieldSearch] = useState("");

    let [modalObject, setModalObject] = useState({
        title: "Platform",
        Input: "Name"
    });

    let OpenOffer = (elem, oppration, index) => {
        setModalObject({
            title: elem.platformName + " Investment",
            fullBank: elem,
            oppration,
            index
        })
        setFlagState(true)
    }

    let OpenInstitute = (operation, data) => {

        setModalObject({
            title: "Platform",
            operation,
            data,
            key: Data.key
        });
        setFlagState(true);
    }

    let DeleteOffer = async (elem, operation, Offerindex, OfferElem) => {
        console.log(OfferElem);
        // return (false)
        if (window.confirm("Confirm investment Delete")) {

            try {
                let data = await PatchAxios(DefaultUrl + "/api/investmentoffer/Delete", OfferElem)

                if (data) {

                    let index = bankDetailObj.findIndex(
                        (item) => item._id === elem._id
                    );

                    let Obj = JSON.parse(JSON.stringify(bankDetailObj));

                    Obj[index].arrayOfOffers.splice(Offerindex, 1);

                    setBankDetailObj(Obj);

                    let type = "success";
                    let placement = "topRight"
                    let message = "Investment Deleted"
                    let description = "Investment is Delete successfull"
                    openNotificationSuccess(type, placement, message, description)
                }
            }
            catch (error) {
                console.log(error);
                let type = "error";
                let placement = "topRight"
                let message = "Error Notification"
                let description = "Some thing went wrong Please Try Later"
                openNotificationSuccess(type, placement, message, description)
            }

        }

    }

    let DeleteBank = async (elem, operation, index) => {
        console.log(elem);
        // return (false)
        if (window.confirm("Confirm Platform Delete")) {

            try {
                let res = await PatchAxios(DefaultUrl + "/api/platform/Delete", elem)

                if (res) {

                    let Obj = JSON.parse(JSON.stringify(bankDetailObj));

                    let Data = Obj.filter((item) => item._id !== elem._id)

                    setBankDetailObj(Data);

                    let type = "success";
                    let placement = "topRight"
                    let message = "Platform Deleted"
                    let description = "Platform is Delete successfull"
                    openNotificationSuccess(type, placement, message, description)
                }
            }
            catch (error) {
                console.log(error);
                let type = "error";
                let placement = "topRight"
                let message = "Error Notification"
                let description = "Some thing went wrong Please Try Later"
                openNotificationSuccess(type, placement, message, description)
            }

        }

    }

    const generateOptions = (bankDetailObj, platformName) => {
        const InstituteOptions = [];

        if (Array.isArray(bankDetailObj) && bankDetailObj.length > 0) {
            bankDetailObj.forEach((elem) => {
                // Check if the platform name matches
                if (platformName === elem._id) {
                    // Add the main option for the element

                    // Add InstituteOptions from arrayOfOffers if available
                    if (Array.isArray(elem.arrayOfOffers) && elem.arrayOfOffers.length > 0) {
                        elem.arrayOfOffers.forEach((offerElem) => {
                            InstituteOptions.push({ value: offerElem._id, label: `${offerElem.investmentName} (${offerElem.investmentCode})` });
                        });
                    }
                }
            });
        }


        // console.log(InstituteOptions, bankDetailObj, platformName, "data")

        return InstituteOptions;
    };


    let handleSubmitRegularIncome = (values) => {

        console.log(values);

        setInvestmentFieldSearch(values.SearchInvestment);

    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderRows = (currentPage, setFieldValue, values, handleChange, renderArray, index, fullBank) => {
        const pageSize = 10;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        // If a search value exists, find the matching OfferElem
        const searchValue = values[`SearchInvestment${index}`];

        // If a search is active, find the matching offer
        if (searchValue && searchValue !== "") {
            const matchingOffer = renderArray.find((OfferElem) => OfferElem._id === searchValue);

            // If a matching offer is found, display it directly (ignore pagination)
            if (matchingOffer) {
                return (
                    <tr key={matchingOffer._id}>
                        <td>{matchingOffer.investmentName}</td>
                        <td>{matchingOffer.investmentCode}</td>
                        <td>
                            <Tooltip placement="top" title={"Edit"}>
                                <BiSolidEdit
                                    style={{ fontSize: '18px', cursor: 'pointer' }}
                                    onClick={() => { OpenOffer(fullBank, "edit", index); }}
                                />
                            </Tooltip>
                            &nbsp;&nbsp;/&nbsp;&nbsp;
                            <Tooltip placement="top" title={"Delete"}>
                                <RiDeleteBinLine style={{ color: "red", fontSize: '18px', cursor: 'pointer' }}
                                    onClick={() => { DeleteOffer(fullBank, "delete", index, matchingOffer); }}
                                />
                            </Tooltip>
                        </td>
                    </tr>
                );
            }

            // If no matching offer is found, return null
            return null;
        }

        // If no search is active, display paginated results
        return renderArray
            .slice(startIndex, endIndex) // Only show items for the current page
            .map((OfferElem, Offerindex) => {
                return (
                    <tr key={Offerindex}>
                        <td>{OfferElem.investmentName}</td>
                        <td>{OfferElem.investmentCode}</td>
                        <td>
                            <Tooltip placement="top" title={"Edit"}>
                                <BiSolidEdit
                                    style={{ fontSize: '18px', cursor: 'pointer' }}
                                    onClick={() => { OpenOffer(fullBank, "edit", Offerindex); }}
                                />
                            </Tooltip>
                            &nbsp;&nbsp;/&nbsp;&nbsp;
                            <Tooltip placement="top" title={"Delete"}>
                                <RiDeleteBinLine style={{ color: "red", fontSize: '18px', cursor: 'pointer' }}
                                    onClick={() => { DeleteOffer(fullBank, "delete", Offerindex, OfferElem); }}
                                />
                            </Tooltip>
                        </td>
                    </tr>
                );
            });
    };

    let listArray = ["FinancialInstitutions", "Annuities", "PersonalInsurances"]
    return (
        <div className='container-fluid' style={{ paddingTop: "3.8rem", minHeight: "89vh" }}>

            <Row className='justify-content-center overflow-x-hidden'>


                <ModalComponent modalObject={modalObject} setFlagState={setFlagState} flagState={flagState}>
                    {modalObject.title === "Platform" ? <InsittuteFom /> : <OfferFom />}
                </ModalComponent>

                <div className='col-md-12'>
                    <div>
                        <h2 className='text-center text-green'>{Data.subTitle} Platform {!listArray.includes(Data.key) && "and Investment"} </h2>
                        <div className="QuestionIcon p-3 curser-pointer" onClick={() => { OpenInstitute("new") }}
                        >
                            <img className="img-fluid min-w-25" src={Add} alt="" />
                        </div>
                    </div>
                </div>
                <div className='col-md-12 mt-3'>
                    <Row>
                        {!listArray.includes(Data.key) ?
                            <div className={`col-md-12 superAdminAccordian   mb-4`}>
                                <Accordion defaultActiveKey="0">
                                    {bankDetailObj[`${Data.key}`]?.map((elem, index) => {
                                        return (
                                            <Accordion.Item eventKey={index} key={index}>
                                                <Accordion.Header onClick={() => { setInvestmentFieldSearch("") }}>{elem.platformName}</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className='row'>
                                                        <div className='col-md-4'>
                                                            <div className='customCard'>
                                                                <h4 className='d-flex  justify-content-between'>{elem.platformName}

                                                                    <Tooltip placement="top" title={"Edit"}>
                                                                        <BiSolidEdit
                                                                            style={{ fontSize: '18px', cursor: 'pointer' }}
                                                                            onClick={() => { OpenInstitute("edit", elem) }}
                                                                        />
                                                                    </Tooltip>
                                                                </h4>

                                                                <h6 className='d-flex  justify-content-between' style={{ fontSize: "17px" }}> Total Investment{elem.arrayOfOffers.length > 1 ? `s ${elem.arrayOfOffers.length}` : ` ${elem.arrayOfOffers.length}`}

                                                                    <Tooltip placement="top" title={"Delete"}>
                                                                        <RiDeleteBinLine style={{ color: "red", fontSize: '18px', cursor: 'pointer', }}
                                                                            onClick={() => { DeleteBank(elem, "delete", index) }}
                                                                        />
                                                                    </Tooltip>
                                                                </h6>
                                                            </div>
                                                        </div>

                                                        {!listArray.includes(Data.key) && <React.Fragment>
                                                            <div className='col-md-4 my-2 m-md-0 '>
                                                                <Button type='submit' className='w-100 h-100 CSVBtn m-0' onClick={() => { OpenOffer(elem, "CSV") }}>  <HiOutlinePlus style={{ fontSize: '18px', margin: "0px 0px 3px 0px" }} /> Add From CSV / Excel File</Button>
                                                            </div>
                                                            <div className='col-md-4'>
                                                                <Button type='submit' className='w-100 h-100 bgColor modalBtn m-0' onClick={() => { OpenOffer(elem, "new") }}>  <HiOutlinePlus style={{ fontSize: '18px', margin: "0px 0px 3px 0px" }} /> Add Investment Manually</Button>
                                                            </div>
                                                            <Formik
                                                                initialValues={{}}
                                                                onSubmit={handleSubmitRegularIncome}
                                                                enableReinitialize
                                                            >
                                                                {({ values, setFieldValue, handleChange }) => {
                                                                    return (<Form>
                                                                        <div className='col-md-12 mt-3'>
                                                                            <div className='row justify-content-between '>
                                                                                <div className='col-md-6 '><h2 className='m-0 p-0'>Investment</h2></div>
                                                                                <div className='col-md-3'>
                                                                                    <div className='d-flex justify-content-between align-item-center'>
                                                                                        <div
                                                                                            style={{ width: "100%" }}
                                                                                        >
                                                                                            <Field type="text"
                                                                                                name={`SearchInvestment` + index}
                                                                                                component={SimpleSelectField}
                                                                                                label="Multi Select Field"
                                                                                                options={generateOptions(bankDetailObj, elem._id)}
                                                                                                onChange={(selectedOption) => {

                                                                                                    console.log(selectedOption)

                                                                                                    const isIdPresent = elem.arrayOfOffers.some(offer => offer._id === selectedOption.value);

                                                                                                    if (!isIdPresent) {
                                                                                                        let type = "error";
                                                                                                        let placement = "topRight"
                                                                                                        let message = "Error Notification"
                                                                                                        let description = "No Investment Found"
                                                                                                        openNotificationSuccess(type, placement, message, description)
                                                                                                        setFieldValue(`SearchInvestment` + index, "");
                                                                                                    }

                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className='col-md-12 mt-3'>


                                                                            <Table striped bordered responsive hover>
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th>Investment Name</th>
                                                                                        <th>Investment Code</th>
                                                                                        <th>Options</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {elem.arrayOfOffers.length <= 0 &&
                                                                                        <tr>
                                                                                            <td colSpan={4}>No Investment Added</td>
                                                                                        </tr>
                                                                                    }
                                                                                    {renderRows(currentPage, setFieldValue, values, handleChange, elem.arrayOfOffers, index, elem)}
                                                                                </tbody>
                                                                            </Table>
                                                                        </div>
                                                                        {elem.arrayOfOffers.length >= 10 && (
                                                                            <div className='w-100 CustomPaginantion d-flex justify-content-center'>
                                                                                <Pagination
                                                                                    align="start"
                                                                                    defaultCurrent={1}
                                                                                    current={currentPage}
                                                                                    total={elem.arrayOfOffers.length}
                                                                                    pageSize={pageSize}
                                                                                    onChange={handlePageChange}
                                                                                    showSizeChanger={false} // Optional, you can allow page size change if needed
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </Form>)
                                                                }}
                                                            </Formik>
                                                        </React.Fragment>}

                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    })}
                                </Accordion>
                            </div>
                            :
                            <div className='row'>
                                {bankDetailObj[`${Data.key}`]?.map((elem, index) => {
                                    return (
                                        <div className='col-md-3 col-sm-6 mb-0' key={index}> {/* 4 per row with 25% width */}
                                            <div className='customCardList'>
                                                <h4 className='d-flex justify-content-between m-0 p-0'>
                                                    {elem.platformName}
                                                    <div className='d-flex gap-3 pt-1'>
                                                        <Tooltip placement="top" title={"Edit"}>
                                                            <BiSolidEdit
                                                                style={{ fontSize: '18px', cursor: 'pointer' }}
                                                                onClick={() => { OpenInstitute("edit", elem) }}
                                                            />
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={"Delete"}>
                                                            <RiDeleteBinLine style={{ color: "red", fontSize: '18px', cursor: 'pointer', }}
                                                                onClick={() => { DeleteBank(elem, "delete", index) }}
                                                            />
                                                        </Tooltip>
                                                    </div>
                                                </h4>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        }

                    </Row>
                </div>
            </Row >
        </div >
    )

}

export default InstituteAndOffer


