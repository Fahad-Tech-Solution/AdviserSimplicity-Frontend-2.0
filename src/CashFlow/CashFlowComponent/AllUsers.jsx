import { faBars, faCircleUser, faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Accordion, Breadcrumb, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Options from '../../Components/Options'

import single from "../../Components/Svgs/single-2.svg";
import couple from "../../Components/Svgs/couple-2.svg";
import { MdCake, MdMale } from 'react-icons/md'
import { FaArrowRotateRight } from 'react-icons/fa6'
import { FaRing } from 'react-icons/fa'

const AllUsers = (props) => {
    return (
        <div className='container-fluid  ps-4 position-relative '>
            <Options opt={props.switchState} SidebarSwitch={props.sideSwitchMenu} />

            <div className='row' style={{ marginTop: "7rem" }}>
                <div className='col-md-12 '>
                    <Card className="shadow cashFlowAllUsers "><Card.Body>
                        <h5 className="cashFlowCardHead LeagueSpartanFamily">Users List</h5>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Client 1 #1</Accordion.Header>
                                <Accordion.Body>
                                    <div className='w-100'>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className="card w-100 rounded shadow-sm bg-Custom-green text-dark p-4">
                                                    <div className="row g-3">
                                                        {/* Column 1 */}
                                                        <div className="col-12 col-md-8">
                                                            <div className="row align-items-center">
                                                                <div className="col-2">
                                                                    <img
                                                                        alt="Single"
                                                                        className="img-fluid"
                                                                        src={single}
                                                                        style={{ height: "18px", width: "18px" }}
                                                                    />
                                                                </div>
                                                                <div className="col fw-bold">
                                                                    Client Name
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center mt-2">
                                                                <div className="col-2">
                                                                    <MdMale size={20} />
                                                                </div>
                                                                <div className="col fw-bold">
                                                                    Male
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center mt-2">
                                                                <div className="col-2">
                                                                    <MdCake size={20} />
                                                                </div>
                                                                <div className="col fw-bold">
                                                                    26/04/1999
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Column 2 */}
                                                        <div className="col-12 col-md-4">
                                                            <div className="row align-items-center">
                                                                <div className="col-2">
                                                                    <FaArrowRotateRight size={20} />
                                                                </div>
                                                                <div className="col fw-bold">
                                                                    25
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center mt-2">
                                                                <div className="col-2">
                                                                    <FaRing size={20} />
                                                                </div>
                                                                <div className="col fw-bold">
                                                                    Married
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                            <div className='col-md-6'>
                                                <div className="card w-100 rounded shadow-sm bg-Custom-green text-dark p-4">
                                                    <div className="row g-3">
                                                        {/* Column 1 */}
                                                        <div className="col-12 col-md-8">
                                                            <div className="row align-items-center">
                                                                <div className="col-2">
                                                                    <img
                                                                        alt="Single"
                                                                        className="img-fluid"
                                                                        src={single}
                                                                        style={{ height: "18px", width: "18px" }}
                                                                    />
                                                                </div>
                                                                <div className="col fw-bold">
                                                                    Partner Name
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center mt-2">
                                                                <div className="col-2">
                                                                    <MdMale size={20} />
                                                                </div>
                                                                <div className="col fw-bold">
                                                                    Male
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center mt-2">
                                                                <div className="col-2">
                                                                    <MdCake size={20} />
                                                                </div>
                                                                <div className="col fw-bold">
                                                                    26/04/1999
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Column 2 */}
                                                        <div className="col-12 col-md-4">
                                                            <div className="row align-items-center">
                                                                <div className="col-2">
                                                                    <FaArrowRotateRight size={20} />
                                                                </div>
                                                                <div className="col fw-bold">
                                                                    25
                                                                </div>
                                                            </div>
                                                            <div className="row align-items-center mt-2">
                                                                <div className="col-2">
                                                                    <FaRing size={20} />
                                                                </div>
                                                                <div className="col fw-bold">
                                                                    Married
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card.Body></Card>
                </div>
            </div>
        </div>
    )
}

export default AllUsers
