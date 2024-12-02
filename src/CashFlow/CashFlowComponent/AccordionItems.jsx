import React from 'react';
import { Accordion, Button, Table } from 'react-bootstrap';
import { MdMale, MdCake, MdAdd } from 'react-icons/md';
import { FaArrowRotateRight, FaClipboardList, FaGear, FaRing } from 'react-icons/fa6'


import single from "../../Components/Svgs/single-2.svg";
import couple from "../../Components/Svgs/couple-2.svg";
import { ConvertDate } from '../../Components/Assets/Api/Api';
import { FaEdit, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { content } from '../../Content/Content';
import { useRecoilState } from 'recoil';
import { CashFlowScenarioData, CashFlowScenarioType, PersonalDetailsData, QuestionDetail } from '../../Store/Store';

const AccordionItems = ({ client, partner, tableData, index, fullData, CallBack }) => {

  let [questionDetail, setQuestionDetail] = useRecoilState(QuestionDetail);
  let [PersonalDetailObj, setPersonalDetailObj] = useRecoilState(PersonalDetailsData);
  let [cashFlowScenarioData, setCashFlowScenarioData] = useRecoilState(CashFlowScenarioData);
  let [cashFlowScenarioType, setCashFlowScenarioType] = useRecoilState(CashFlowScenarioType);

  let Nav = useNavigate()

  let { cashFlow } = content;

  function menuClicked(row, operation) {
    localStorage.setItem("ScenarioObj", JSON.stringify(row));

    setQuestionDetail({})
    setPersonalDetailObj({})
    setCashFlowScenarioData({})
    setCashFlowScenarioType("")


    switch (operation) {
      case "Edit":
      case "Update":
        if (row?.lastModuleEdited && row.lastModuleEdited !== "") {

          const route = cashFlow.find((module) => module.subTitle === row.lastModuleEdited)?.route;
          if (route) {
            Nav("/Cash-Flow" + route);
          }
          else {
            Nav("/Cash-Flow/PersonalDetail" + "#" + row._id);
          }
        }
        else {
          Nav("/Cash-Flow/PersonalDetail" + "#" + fullData._id);
        }

        break;

      default:
        break;
    }


  }


  const getMenu = (row) => (
    <Menu className='ClearDropDownSpan'>
      <Menu.Item key="1" icon={<FaEdit />} onClick={() => menuClicked(row, "Edit")}> Edit </Menu.Item>
      <Menu.Item key="3" icon={<FaClipboardList />} onClick={() => CallBack(fullData, row, "Edit")}>Update Scenario </Menu.Item>
      <Menu.Item key="4" icon={<FaTrashAlt />}>Delete</Menu.Item>
    </Menu>
  );


  return (
    <Accordion.Item eventKey={index}>
      <Accordion.Header>{client.clientGivenName}  Age#{client.clientAge}</Accordion.Header>
      <Accordion.Body>
        <div className="w-100">
          <div className="row">

            {/* Client Card */}
            <div className="col-md-6">
              <div className="card w-100 rounded shadow-sm bg-Custom-green text-dark p-4">
                <div className="row g-3">

                  {/* Client Column 1 */}
                  <div className="col-12 col-md-8">
                    <div className="row align-items-center">
                      <div className="col-2">
                        <img
                          alt="Single"
                          className="img-fluid"
                          src={single} // Update this to the image source
                          style={{ height: "18px", width: "18px" }}
                        />
                      </div>
                      <div className="col fw-bold">
                        {client.clientGivenName}
                      </div>
                    </div>
                    <div className="row align-items-center mt-2">
                      <div className="col-2">
                        <MdMale size={20} />
                      </div>
                      <div className="col fw-bold">
                        {client.clientGender}
                      </div>
                    </div>
                    <div className="row align-items-center mt-2">
                      <div className="col-2">
                        <MdCake size={20} />
                      </div>
                      <div className="col fw-bold">
                        {ConvertDate(client.clientDOB)}
                      </div>
                    </div>
                  </div>

                  {/* Client Column 2 */}
                  <div className="col-12 col-md-4">
                    <div className="row align-items-center">
                      <div className="col-2">
                        <FaArrowRotateRight size={20} />
                      </div>
                      <div className="col fw-bold">
                        {client.clientAge}
                      </div>
                    </div>
                    <div className="row align-items-center mt-2">
                      <div className="col-2">
                        <FaRing size={20} />
                      </div>
                      <div className="col fw-bold">
                        {client.clientMaritalStatus}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner Card */}
            {partner && (
              <div className="col-md-6">
                <div className="card w-100 rounded shadow-sm bg-Custom-green text-dark p-4">
                  <div className="row g-3">
                    {/* Partner Column 1 */}
                    <div className="col-12 col-md-8">
                      <div className="row align-items-center">
                        <div className="col-2">
                          <img
                            alt="Partner"
                            className="img-fluid"
                            src={couple} // Update this to the partner image source
                            style={{ height: "18px", width: "18px" }}
                          />
                        </div>
                        <div className="col fw-bold">
                          {partner.partnerGivenName}
                        </div>
                      </div>
                      <div className="row align-items-center mt-2">
                        <div className="col-2">
                          <MdMale size={20} />
                        </div>
                        <div className="col fw-bold">
                          {partner.partnerGender}
                        </div>
                      </div>
                      <div className="row align-items-center mt-2">
                        <div className="col-2">
                          <MdCake size={20} />
                        </div>
                        <div className="col fw-bold">
                          {ConvertDate(partner.partnerDOB)}
                        </div>
                      </div>
                    </div>

                    {/* Partner Column 2 */}
                    <div className="col-12 col-md-4">
                      <div className="row align-items-center">
                        <div className="col-2">
                          <FaArrowRotateRight size={20} />
                        </div>
                        <div className="col fw-bold">
                          {partner.partnerAge}
                        </div>
                      </div>
                      <div className="row align-items-center mt-2">
                        <div className="col-2">
                          <FaRing size={20} />
                        </div>
                        <div className="col fw-bold">
                          {partner.partnerMaritalStatus}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}


            <div className='col-md-12 mt-3'>
              <div className='row justify-content-between '>
                <div className='pt-2' style={{ width: "fit-content" }}>
                  <h5>Scenario List :</h5>
                </div>
                <div style={{ width: "fit-content" }}>
                  <button className='btn bgColor modalBtn' onClick={() => { CallBack(fullData, {}, "New") }} > Add New <MdAdd />  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            {tableData.length > 0 &&
              <div className="col-md-12">
                <div className="mt-4">
                  <Table striped bordered responsive hover>
                    <thead>
                      <tr>
                        <th>No#</th>
                        <th>Scenario</th>
                        <th>Last Module Edited</th>
                        <th>Date of Creation</th>
                        <th>Date of Update</th>
                        <th>Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{row.scenarioName}</td>
                          <td>{row.lastModuleEdited || "not Available"}</td>
                          <td>{ConvertDate(row.createdAt)}</td>
                          <td>{ConvertDate(row.updatedAt)}</td>
                          <td >
                            <Dropdown overlay={getMenu(row)} trigger={["click"]}
                            >
                              <FaGear />
                            </Dropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            }

          </div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default AccordionItems;
