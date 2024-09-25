import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card, Row, Table } from 'react-bootstrap'

import "yup-phone";
import * as Yup from 'yup';

import Add from "../Questions/svgs/add-circle-solid-svgrepo-com.svg";
import ModalComponent from '../Questions/FinancialInvestments/ModalComponent';
import InsittuteFom from './InsittuteFom';

import BankImg from "../Questions/svgs/bank.svg";
import OfferFom from './OfferFom';
import { Tooltip } from 'antd';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BiAddToQueue, BiSolidEdit } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import { HiOutlinePlus } from 'react-icons/hi';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BankDetail, defaultUrl } from '../../Store/Store';
import { GetAxios, openNotificationSuccess, PatchAxios } from '../Assets/Api/Api';


const InstituteAndOffer = () => {

    let bankDetailObj = useRecoilValue(BankDetail)

    let [bankDetailObj2, setBankDetailObj] = useRecoilState(BankDetail);
    let DefaultUrl = useRecoilValue(defaultUrl)


    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const res = await GetAxios(`${DefaultUrl}/api/offer/`);
            if (res) {
                console.log(JSON.stringify(res))
                setBankDetailObj(res)
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }



    let [flagState, setFlagState] = useState(false);

    let [modalObject, setModalObject] = useState({
        title: "Institutes",
        Input: "Name"
    });

    let OpenOffer = (elem, oppration, index) => {
        setModalObject({
            title: elem.name + " Investment",
            fullBank: elem,
            oppration,
            index
        })
        setFlagState(true)
    }

    let OpenInstitute = (operation, data) => {

        setModalObject({
            title: "Institutes",
            operation,
            data

        });
        setFlagState(true);
    }


    let DeleteOffer = async (elem, operation, Offerindex, OfferElem) => {
        console.log(OfferElem);
        // return (false)
        try {
            let data = await PatchAxios(DefaultUrl + "/api/offer/Delete", OfferElem)

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

    let DeleteBank = async (elem, operation, index) => {
        console.log(elem);
        // return (false)
        try {
            let res = await PatchAxios(DefaultUrl + "/api/institute/Delete", elem)

            if (res) {

                let Obj = JSON.parse(JSON.stringify(bankDetailObj));

                let Data = Obj.filter((item) => item._id !== elem._id)

                setBankDetailObj(Data);

                let type = "success";
                let placement = "topRight"
                let message = "Institute Deleted"
                let description = "Institute is Delete successfull"
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



    return (
        <div className='container-fluid' style={{ paddingTop: "3.8rem", minHeight: "89vh" }}>

            <Row className='justify-content-center overflow-x-hidden'>


                <ModalComponent modalObject={modalObject} setFlagState={setFlagState} flagState={flagState}>
                    {modalObject.title === "Institutes" ? <InsittuteFom /> : <OfferFom />}
                </ModalComponent>

                <div className='col-md-12'>
                    <div>
                        <h2 className='text-center text-green'>Platform and Investment</h2>
                        <div className="QuestionIcon p-3 curser-pointer" onClick={() => { OpenInstitute("new") }}
                        >
                            <img className="img-fluid min-w-25" src={Add} alt="" />
                        </div>
                    </div>
                </div>
                <div className='col-md-12 mt-3'>
                    <Row>
                        <div className={`col-md-12 superAdminAccordian   mb-4`}>
                            <Accordion defaultActiveKey="0">
                                {bankDetailObj?.map((elem, index) => {
                                    return (
                                        <Accordion.Item eventKey={index} key={index}>
                                            <Accordion.Header>{elem.name}</Accordion.Header>
                                            <Accordion.Body>
                                                <div className='row'>
                                                    <div className='col-md-4'>
                                                        <div className='customCard'>
                                                            <h4 className='d-flex  justify-content-between'>{elem.name}

                                                                <Tooltip placement="top" title={"Edit"}>
                                                                    <BiSolidEdit
                                                                        style={{ fontSize: '18px', cursor: 'pointer' }}
                                                                        onClick={() => { OpenInstitute("edit", elem) }}
                                                                    />
                                                                </Tooltip>
                                                            </h4>

                                                            <h4 className='d-flex  justify-content-between'> Total Investments {elem.arrayOfOffers.length}

                                                                <Tooltip placement="top" title={"Delete"}>
                                                                    <RiDeleteBinLine style={{ color: "red", fontSize: '18px', cursor: 'pointer', }}
                                                                        onClick={() => { DeleteBank(elem, "delete", index) }}
                                                                    />
                                                                </Tooltip>
                                                            </h4>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-4'>

                                                    </div>
                                                    <div className='col-md-4'>
                                                        <Button type='submit' className='w-100 bgColor modalBtn m-0' onClick={() => { OpenOffer(elem, "new") }}>  <HiOutlinePlus style={{ fontSize: '18px', margin: "0px 0px 3px 0px" }} /> Add New Investment</Button>
                                                    </div>

                                                    <div className='col-md-12 mt-3'>
                                                        <div className='row justify-content-between '>
                                                            <div className='col-md-6'><h2 className='m-0 p-0'>Investment</h2></div>
                                                            <div className='col-md-2'>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-12 mt-3'>


                                                        <Table striped bordered responsive hover>
                                                            <thead>
                                                                <tr>
                                                                    <th>No#</th>
                                                                    <th>Code</th>
                                                                    <th>Name</th>
                                                                    <th>Additional Details</th>
                                                                    <th>Options</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {elem.arrayOfOffers.length <= 0 &&
                                                                    <tr>
                                                                        <td colSpan={4}>No Investment Added</td>
                                                                    </tr>
                                                                }

                                                                {elem.arrayOfOffers.map((OfferElem, Offerindex) => {
                                                                    return (<tr key={Offerindex}>
                                                                        <td>{Offerindex + 1}</td>
                                                                        <td>{OfferElem.code}</td>
                                                                        <td>{OfferElem.name}</td>
                                                                        <td>{OfferElem.additionalDetails}</td>
                                                                        <td>
                                                                            <Tooltip placement="top" title={"Edit"}>
                                                                                <BiSolidEdit
                                                                                    style={{ fontSize: '18px', cursor: 'pointer' }}
                                                                                    onClick={() => { OpenOffer(elem, "edit", Offerindex,) }}
                                                                                />
                                                                            </Tooltip>
                                                                            &nbsp;&nbsp;
                                                                            /
                                                                            &nbsp;&nbsp;
                                                                            <Tooltip placement="top" title={"Delete"}>
                                                                                <RiDeleteBinLine style={{ color: "red", fontSize: '18px', cursor: 'pointer' }}
                                                                                    onClick={() => { DeleteOffer(elem, "delete", Offerindex, OfferElem) }}
                                                                                />
                                                                            </Tooltip>

                                                                        </td>
                                                                    </tr>);
                                                                })}
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )
                                })}
                            </Accordion>
                        </div>
                    </Row>
                </div>
            </Row>
        </div>
    )
}

export default InstituteAndOffer

