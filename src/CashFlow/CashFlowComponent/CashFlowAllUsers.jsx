
import React, { useEffect, useState } from 'react'
import { Accordion, Card, Table } from 'react-bootstrap'
import Options from '../../Components/Options'

import single from "../../Components/Svgs/single-2.svg";
import couple from "../../Components/Svgs/couple-2.svg";
import { MdCake, MdMale } from 'react-icons/md'
import { FaArrowRotateRight, FaGear } from 'react-icons/fa6'
import { FaRing } from 'react-icons/fa'
import { useRecoilState, useRecoilValue } from 'recoil';
import { GetAxios } from '../../Components/Assets/Api/Api';
import { AllUsers, defaultUrl } from '../../Store/Store';
import AccordionItems from './AccordionItems';
import ModalComponent from '../../Components/Questions/FinancialInvestments/ModalComponent';
import ScenarioForm from './ScenarioForm';

const CashFlowAllUsers = (props) => {

    const [PersonalDetail2, setPersonalDetail] = useRecoilState(AllUsers);
    let DefaultUrl = useRecoilValue(defaultUrl);


    let [flagState, setFlagState] = useState(false);
    let [modalObject, setModalObject] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (!PersonalDetail2 || PersonalDetail2.length <= 0) {
                try {
                    let res = await GetAxios(`${DefaultUrl}/api/personalDetails`);
                    if (res) {
                        setPersonalDetail(res);
                    }
                    console.log(JSON.stringify(res[0]), "Cash Grow Work");
                } catch (error) {
                    console.error("Error fetching personal details:", error);
                }
            }
        };

        fetchData();
    }, [PersonalDetail2]);



    let OpenModal = (UserData,action) => {
        // console.log(UserData);

        setModalObject({
            title: "Add Scenario",
            Data: UserData,
            action
        })
        setFlagState(true);
    }




    return (
        <div className='container-fluid  ps-4 position-relative '>

            <ModalComponent modalObject={modalObject} setFlagState={setFlagState} flagState={flagState} >
                <ScenarioForm />
            </ModalComponent>

            <Options opt={props.switchState} SidebarSwitch={props.sideSwitchMenu} />

            <div className='row' style={{ marginTop: "7rem" }}>
                <div className='col-md-12 '>
                    <Card className="shadow cashFlowAllUsers "><Card.Body>
                        <h5 className="cashFlowCardHead LeagueSpartanFamily">Users List</h5>
                        <Accordion defaultActiveKey="0">
                            {PersonalDetail2.map((elem, index) => {
                                return (<AccordionItems CallBack={OpenModal} fullData={elem} client={elem.client} partner={elem.partner} tableData={[]} index={index} />)
                            })}
                        </Accordion>
                    </Card.Body></Card>
                </div>
            </div>
        </div>
    )
}

export default CashFlowAllUsers
