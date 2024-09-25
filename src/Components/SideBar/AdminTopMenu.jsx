import { faBars, faCircleUser, faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AdminTopMenu = (props) => {


    let [currentPCLassSwitch, setCurrentPCLassSwitch] = useState("Admin Panel");

    let [currentTabName, setCurrentTabName] = useState("Admin Panel");

    return (
        <div className="container-fluid position-relative" id="OptionsBar">
            <div className="container-fluid" style={{ marginLeft: "0.1rem" }}>

                <div className="row pe-2">
                    <div className="col-md-12 p-0">
                        <div className="Top_Nav">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <Breadcrumb className="BreadcrumbCustom">
                                        <Breadcrumb.Item active linkAs={Link} linkProps={{ to: '/' }} className="p-0 m-0 LeagueSpartanFamily">Dashboard</Breadcrumb.Item>
                                        <Breadcrumb.Item active linkAs={Link} linkProps={{ to: '/' }} className="p-0 m-0 LeagueSpartanFamily">{currentPCLassSwitch}</Breadcrumb.Item>
                                    </Breadcrumb>
                                    <h5 className="Page LeagueSpartanFamily">{currentTabName || "Dashboard"}</h5>
                                </div>
                                <div className="rightBlock">
                                    <FontAwesomeIcon icon={faBars} role='button' className="" onClick={() => { props.setCollapsed(!props.collapsed) }} style={{ fontSize: "30px", }} />
                                    <FontAwesomeIcon icon={faCircleUser} className="user" role='button' style={{ fontSize: "35px" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminTopMenu
