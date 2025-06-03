import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DynamicTableRow from "../Assets/Dynamic/DynamicTableRow";
import AntTableDynamicReportTable from "../Assets/Table/AntTableDynamicReportTable";
import { FaCircleCheck, FaCircleXmark, FaGear } from "react-icons/fa6";
import DropDownOptions from "../Assets/DropDownOptions/DropDownOptions";
import { FaClock, FaEdit, FaInfoCircle } from "react-icons/fa";
import ModalComponent from "../Questions/FinancialInvestments/ModalComponent";
import CDFForm from "./CDFForm";
import { Tag } from "antd";
import { icon } from "@fortawesome/fontawesome-svg-core";

const CDFclients = () => {
  const menuItems = [
    {
      action: "Approved",
      category: "success",
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginLeft: 13,
          }}
          className="fw-bold"
        >
          <FaCircleCheck /> Approved
        </div>
      ),
      onClick: (heading, row) => CallBack(heading, row, "Approved"),
    },
    {
      action: "Rejected",
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginLeft: 13,
          }}
          className="fw-bold"
        >
          <FaCircleXmark /> Rejected
        </div>
      ),
      category: "danger",
      onClick: (heading, row) => CallBack(heading, row, "Rejected"),
    },
  ];

  let columns = [
    {
      title: <div className="w-100">Name</div>,
      key: "preferredName",
      render: (text, row, index) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: '"Inter", sans-serif',
          }}
        >
          {row?.client?.preferredName || "--"}
          {row?.client?.relationshipStatus !== "Single" &&
            ` & ${row?.partner?.preferredName || "--"}`}{" "}
          <FaInfoCircle
            onClick={() => {
              OpenModel(text, row, index);
            }}
          />
        </div>
      ),
    },
    {
      title: "Date of Birth",
      key: "DOB",
      render: (text, row) => row?.client?.dateOfBirth || "--",
    },
    {
      title: "Phone Number",
      key: "phoneNumber",
      render: (text, row) => row?.client?.phoneNumber || "--",
    },
    {
      title: "Relationship Status",
      key: "relationshipStatus",
      render: (text, row) => row?.client?.relationshipStatus || "--",
    },
    {
      title: "Email",
      key: "email",
      render: (text, row) => row?.client?.email || "--",
    },
    {
      title: "Status",
      attribute: "status",
      render: (row) => {
        const status = row.status?.toLowerCase() || "pending";

        const statusMap = {
          pending: {
            color: "orange",
            text: "Pending",
            icon: <FaClock />,
          },
          complete: {
            color: "green",
            text: "Approved",
            icon: <FaCircleCheck />,
          },
          canceled: {
            color: "red",
            text: "Canceled",
            icon: <FaCircleXmark />,
          },
        };

        const tag = statusMap[status] || statusMap["pending"];

        return (
          <Tag
            color={tag.color}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {tag.icon} {tag.text}
          </Tag>
        );
      },
    },
    {
      title: "Operation",
      key: "operation",
      render: (text, row, index) => (
        <DropDownOptions
          menuItems={menuItems}
          CallBack={(heading, row, status) => {}}
          heading={row}
          row={row} // ✅ Proper row data
        />
      ),
    },
  ];

  let data = [
    {
      status: "Pending",
      client: {
        firstName: "John",
        surname: "Doe",
        preferredName: "Johnny",
        gender: "Male",
        dateOfBirth: "1985-03-14",
        email: "john.doe@example.com",
        phoneNumber: "0412345678",
        relationshipStatus: "Married",
        occupation: "Software Engineer",

        employmentIncome: "95000",
        businessIncome: "0",
        centrelinkPayments: "0",
        superannuationPayments: "5000",

        personalAssets: {
          cars: "Honda Civic",
          householdItems: "Furniture, TV",
          boat: "",
          caravan: "",
          creditCards: "2000",
          personalLoan: "5000",
        },

        financialAssets: {
          bankAccounts: "ANZ: $15,000",
          shares: "Tech stocks: $8,000",
          managedFunds: "Vanguard: $12,000",
          super: "AustralianSuper: $35,000",
          pension: "0",
        },
      },

      partner: {
        firstName: "Emma",
        surname: "Doe",
        preferredName: "Em",
        gender: "Female",
        dateOfBirth: "1988-11-22",
        email: "emma.doe@example.com",
        phoneNumber: "0498765432",
        relationshipStatus: "Married",
        occupation: "Teacher",

        employmentIncome: "70000",
        businessIncome: "0",
        centrelinkPayments: "0",
        superannuationPayments: "4000",

        personalAssets: {
          cars: "Mazda CX-5",
          householdItems: "Appliances",
          boat: "",
          caravan: "",
          creditCards: "1500",
          personalLoan: "0",
        },

        financialAssets: {
          bankAccounts: "CBA: $10,000",
          shares: "Education sector: $4,000",
          managedFunds: "Rest: $6,000",
          super: "HostPlus: $30,000",
          pension: "0",
        },
      },

      childrenData: {
        hasChildren: true,
        childrenList: [
          {
            name: "Liam",
            gender: "Male",
            dateOfBirth: "2015-05-01",
          },
          {
            name: "Olivia",
            gender: "Female",
            dateOfBirth: "2018-08-12",
          },
        ],
      },

      home: {
        propertyValue: "750000",
        loanBalance: "350000",
        rentReceived: "0",
        rentFrequency: "N/A",
      },

      otherProperties: {
        hasOtherProperties: false,
        propertyList: [],
      },

      areaOfAdvice: {
        buyAProperty: "No",
        payOffHomeLoan: "Yes",
        incomeProtectionInsurance: "Yes",
        buildSuperannuation: "Yes",
        retirementPlanning: "Yes",
        centrelinkEligibility: "No",
        investing: "Yes",
        moneyManagement: "Yes",
        taxMinimization: "Yes",
        inheritancePlanning: "No",
        agedCare: "No",
        selfManagedSuperFund: "No",
      },
    },
    {
      status: "complete",
      client: {
        firstName: "John",
        surname: "Doe",
        preferredName: "Johnny",
        gender: "Male",
        dateOfBirth: "1985-03-14",
        email: "john.doe@example.com",
        phoneNumber: "0412345678",
        relationshipStatus: "Married",
        occupation: "Software Engineer",

        employmentIncome: "95000",
        businessIncome: "0",
        centrelinkPayments: "0",
        superannuationPayments: "5000",

        personalAssets: {
          cars: "Honda Civic",
          householdItems: "Furniture, TV",
          boat: "",
          caravan: "",
          creditCards: "2000",
          personalLoan: "5000",
        },

        financialAssets: {
          bankAccounts: "ANZ: $15,000",
          shares: "Tech stocks: $8,000",
          managedFunds: "Vanguard: $12,000",
          super: "AustralianSuper: $35,000",
          pension: "0",
        },
      },

      partner: {
        firstName: "Emma",
        surname: "Doe",
        preferredName: "Em",
        gender: "Female",
        dateOfBirth: "1988-11-22",
        email: "emma.doe@example.com",
        phoneNumber: "0498765432",
        relationshipStatus: "Married",
        occupation: "Teacher",

        employmentIncome: "70000",
        businessIncome: "0",
        centrelinkPayments: "0",
        superannuationPayments: "4000",

        personalAssets: {
          cars: "Mazda CX-5",
          householdItems: "Appliances",
          boat: "",
          caravan: "",
          creditCards: "1500",
          personalLoan: "0",
        },

        financialAssets: {
          bankAccounts: "CBA: $10,000",
          shares: "Education sector: $4,000",
          managedFunds: "Rest: $6,000",
          super: "HostPlus: $30,000",
          pension: "0",
        },
      },

      childrenData: {
        hasChildren: true,
        childrenList: [
          {
            name: "Liam",
            gender: "Male",
            dateOfBirth: "2015-05-01",
          },
          {
            name: "Olivia",
            gender: "Female",
            dateOfBirth: "2018-08-12",
          },
        ],
      },

      home: {
        propertyValue: "750000",
        loanBalance: "350000",
        rentReceived: "0",
        rentFrequency: "N/A",
      },

      otherProperties: {
        hasOtherProperties: false,
        propertyList: [],
      },

      areaOfAdvice: {
        buyAProperty: "No",
        payOffHomeLoan: "Yes",
        incomeProtectionInsurance: "Yes",
        buildSuperannuation: "Yes",
        retirementPlanning: "Yes",
        centrelinkEligibility: "No",
        investing: "Yes",
        moneyManagement: "Yes",
        taxMinimization: "Yes",
        inheritancePlanning: "No",
        agedCare: "No",
        selfManagedSuperFund: "No",
      },
    },
    {
      status: "canceled",
      client: {
        firstName: "John",
        surname: "Doe",
        preferredName: "Johnny",
        gender: "Male",
        dateOfBirth: "1985-03-14",
        email: "john.doe@example.com",
        phoneNumber: "0412345678",
        relationshipStatus: "Married",
        occupation: "Software Engineer",

        employmentIncome: "95000",
        businessIncome: "0",
        centrelinkPayments: "0",
        superannuationPayments: "5000",

        personalAssets: {
          cars: "Honda Civic",
          householdItems: "Furniture, TV",
          boat: "",
          caravan: "",
          creditCards: "2000",
          personalLoan: "5000",
        },

        financialAssets: {
          bankAccounts: "ANZ: $15,000",
          shares: "Tech stocks: $8,000",
          managedFunds: "Vanguard: $12,000",
          super: "AustralianSuper: $35,000",
          pension: "0",
        },
      },

      partner: {
        firstName: "Emma",
        surname: "Doe",
        preferredName: "Em",
        gender: "Female",
        dateOfBirth: "1988-11-22",
        email: "emma.doe@example.com",
        phoneNumber: "0498765432",
        relationshipStatus: "Married",
        occupation: "Teacher",

        employmentIncome: "70000",
        businessIncome: "0",
        centrelinkPayments: "0",
        superannuationPayments: "4000",

        personalAssets: {
          cars: "Mazda CX-5",
          householdItems: "Appliances",
          boat: "",
          caravan: "",
          creditCards: "1500",
          personalLoan: "0",
        },

        financialAssets: {
          bankAccounts: "CBA: $10,000",
          shares: "Education sector: $4,000",
          managedFunds: "Rest: $6,000",
          super: "HostPlus: $30,000",
          pension: "0",
        },
      },

      childrenData: {
        hasChildren: true,
        childrenList: [
          {
            name: "Liam",
            gender: "Male",
            dateOfBirth: "2015-05-01",
          },
          {
            name: "Olivia",
            gender: "Female",
            dateOfBirth: "2018-08-12",
          },
        ],
      },

      home: {
        propertyValue: "750000",
        loanBalance: "350000",
        rentReceived: "0",
        rentFrequency: "N/A",
      },

      otherProperties: {
        hasOtherProperties: false,
        propertyList: [],
      },

      areaOfAdvice: {
        buyAProperty: "No",
        payOffHomeLoan: "Yes",
        incomeProtectionInsurance: "Yes",
        buildSuperannuation: "Yes",
        retirementPlanning: "Yes",
        centrelinkEligibility: "No",
        investing: "Yes",
        moneyManagement: "Yes",
        taxMinimization: "Yes",
        inheritancePlanning: "No",
        agedCare: "No",
        selfManagedSuperFund: "No",
      },
    },
  ];

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  let OpenModel = (text, row, index) => {
    // console.log("Row data:", row);

    setModalObject({
      title: "CDF Details",
      row,
    });
    setFlagState(true);
  };

  return (
    <Container fluid>
      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        <CDFForm />
      </ModalComponent>
      <Row>
        <Col md={12} style={{ minHeight: "20vh" }}></Col>
        <Col md={12} style={{ minHeight: "80vh" }}>
          <Row className="justify-content-amount align-items-center reportSection">
            <Col md={12}>
              <AntTableDynamicReportTable
                title={"CDF Clients"}
                dataSource={data}
                columns={columns}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CDFclients;
