import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DynamicTableRow from "../Assets/Dynamic/DynamicTableRow";
import AntTableDynamicReportTable from "../Assets/Table/AntTableDynamicReportTable";
import { FaCircleCheck, FaCircleXmark, FaGear } from "react-icons/fa6";
import DropDownOptions from "../Assets/DropDownOptions/DropDownOptions";
import { FaClock, FaEdit, FaInfoCircle, FaRegFileAlt } from "react-icons/fa";
import ModalComponent from "../Questions/FinancialInvestments/ModalComponent";
import CDFForm from "./CDFForm";
import { Tag } from "antd";
import { icon } from "@fortawesome/fontawesome-svg-core";
import CDFViewForm from "./CDFViewForm";

const CDFclients = () => {
  const menuItems = [
    {
      action: "View",
      category: "",
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
          <FaRegFileAlt /> View
        </div>
      ),
      onClick: (heading, row) => CallBack(heading, row, "View"),
    },
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
      fixed: "left",
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
          CallBack={OpenModel}
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
      status: "pending",
      client: {
        firstName: "Alice",
        surname: "Walker",
        preferredName: "Ali",
        gender: "Female",
        dateOfBirth: "1982-07-15",
        email: "alice.walker@example.com",
        phoneNumber: "0400111222",
        relationshipStatus: "Married",
        occupation: "Project Manager",
        employmentIncome: "98000",
        businessIncome: "0",
        centrelinkPayments: "0",
        superannuationPayments: "6500",
        personalAssets: {
          cars: "Toyota Corolla",
          householdItems: "Electronics, Furniture",
          boat: "",
          caravan: "",
          creditCards: "3000",
          personalLoan: "10000",
        },
        financialAssets: {
          bankAccounts: "NAB: $20,000",
          shares: "Healthcare: $10,000",
          managedFunds: "Vanguard: $18,000",
          super: "REST Super: $50,000",
          pension: "0",
        },
      },
      partner: {
        firstName: "Tom",
        surname: "Walker",
        preferredName: "Tommy",
        gender: "Male",
        dateOfBirth: "1980-10-05",
        email: "tom.walker@example.com",
        phoneNumber: "0400999888",
        relationshipStatus: "Married",
        occupation: "Civil Engineer",
        employmentIncome: "120000",
        businessIncome: "0",
        centrelinkPayments: "0",
        superannuationPayments: "8000",
        personalAssets: {
          cars: "Hyundai i30",
          householdItems: "Appliances, Decor",
          boat: "",
          caravan: "",
          creditCards: "4000",
          personalLoan: "5000",
        },
        financialAssets: {
          bankAccounts: "Westpac: $15,000",
          shares: "Energy: $6,000",
          managedFunds: "BT: $5,000",
          super: "AustralianSuper: $70,000",
          pension: "0",
        },
      },
      childrenData: {
        hasChildren: true,
        childrenList: [
          { name: "Ella", gender: "Female", dateOfBirth: "2010-09-25" },
          { name: "Max", gender: "Male", dateOfBirth: "2013-03-14" },
        ],
      },
      home: {
        propertyValue: "850000",
        loanBalance: "450000",
        rentReceived: "0",
        rentFrequency: "N/A",
      },
      otherProperties: {
        hasOtherProperties: true,
        propertyList: [
          {
            marketValue: "500000",
            loanBalance: "200000",
            rentReceived: "22000",
            rentFrequency: "Annually",
            rentReceivedMain: "22000",
            frequencyOfRentMain: "Yearly",
            annualExpenses: "3000",
          },
        ],
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
        selfManagedSuperFund: "Yes",
      },
    },
    {
      status: "complete",
      client: {
        firstName: "Marcus",
        surname: "Nguyen",
        preferredName: "Marc",
        gender: "Male",
        dateOfBirth: "1990-04-18",
        email: "marcus.nguyen@example.com",
        phoneNumber: "0411222333",
        relationshipStatus: "Single",
        occupation: "Retail Manager",
        employmentIncome: "56000",
        businessIncome: "0",
        centrelinkPayments: "7000",
        superannuationPayments: "3000",
        personalAssets: {
          cars: "Kia Rio",
          householdItems: "Basic furnishings",
          boat: "",
          caravan: "",
          creditCards: "500",
          personalLoan: "2000",
        },
        financialAssets: {
          bankAccounts: "CBA: $4,500",
          shares: "",
          managedFunds: "",
          super: "HostPlus: $25,000",
          pension: "0",
        },
      },
      partner: {},
      childrenData: {
        hasChildren: true,
        childrenList: [
          { name: "Jayden", gender: "Male", dateOfBirth: "2017-02-10" },
        ],
      },
      home: {
        propertyValue: "450000",
        loanBalance: "200000",
        rentReceived: "0",
        rentFrequency: "N/A",
      },
      otherProperties: {
        hasOtherProperties: false,
        propertyList: [],
      },
      areaOfAdvice: {
        buyAProperty: "Yes",
        payOffHomeLoan: "No",
        incomeProtectionInsurance: "Yes",
        buildSuperannuation: "Yes",
        retirementPlanning: "No",
        centrelinkEligibility: "Yes",
        investing: "No",
        moneyManagement: "Yes",
        taxMinimization: "No",
        inheritancePlanning: "No",
        agedCare: "No",
        selfManagedSuperFund: "No",
      },
    },
    {
      status: "canceled",
      client: {
        firstName: "Graham",
        surname: "Taylor",
        preferredName: "Gray",
        gender: "Male",
        dateOfBirth: "1950-01-01",
        email: "graham.taylor@example.com",
        phoneNumber: "0422333444",
        relationshipStatus: "Married",
        occupation: "Retired",
        employmentIncome: "0",
        businessIncome: "0",
        centrelinkPayments: "12000",
        superannuationPayments: "10000",
        personalAssets: {
          cars: "Lexus RX",
          householdItems: "Antiques, Luxury items",
          boat: "Fishing Boat",
          caravan: "Jayco Camper",
          creditCards: "1000",
          personalLoan: "0",
        },
        financialAssets: {
          bankAccounts: "BOQ: $40,000",
          shares: "Blue-chip: $20,000",
          managedFunds: "Platinum: $30,000",
          super: "QSuper: $100,000",
          pension: "35000",
        },
      },
      partner: {
        firstName: "Margaret",
        surname: "Taylor",
        preferredName: "Maggie",
        gender: "Female",
        dateOfBirth: "1952-06-22",
        email: "margaret.taylor@example.com",
        phoneNumber: "0422666777",
        relationshipStatus: "Married",
        occupation: "Retired",
        employmentIncome: "0",
        businessIncome: "0",
        centrelinkPayments: "12000",
        superannuationPayments: "8000",
        personalAssets: {
          cars: "Mercedes B-Class",
          householdItems: "Jewelry, Appliances",
          boat: "",
          caravan: "",
          creditCards: "2500",
          personalLoan: "0",
        },
        financialAssets: {
          bankAccounts: "Suncorp: $30,000",
          shares: "ETFs: $15,000",
          managedFunds: "AMP: $20,000",
          super: "SunSuper: $90,000",
          pension: "30000",
        },
      },
      childrenData: {
        hasChildren: false,
        childrenList: [],
      },
      home: {
        propertyValue: "1200000",
        loanBalance: "0",
        rentReceived: "0",
        rentFrequency: "N/A",
      },
      otherProperties: {
        hasOtherProperties: true,
        propertyList: [
          {
            marketValue: "800000",
            loanBalance: "150000",
            rentReceived: "32000",
            rentFrequency: "Annually",
            rentReceivedMain: "32000",
            frequencyOfRentMain: "Yearly",
            annualExpenses: "5000",
          },
        ],
      },
      areaOfAdvice: {
        buyAProperty: "No",
        payOffHomeLoan: "No",
        incomeProtectionInsurance: "No",
        buildSuperannuation: "No",
        retirementPlanning: "Yes",
        centrelinkEligibility: "Yes",
        investing: "Yes",
        moneyManagement: "No",
        taxMinimization: "Yes",
        inheritancePlanning: "Yes",
        agedCare: "Yes",
        selfManagedSuperFund: "No",
      },
    },
  ];

  let [flagState, setFlagState] = useState(false);
  let [modalObject, setModalObject] = useState({});

  var OpenModel = (text, row, index) => {
    if (index === "View") {
      setModalObject({
        title: "CDF View Details",
        row,
      });
    } else {
      setModalObject({
        title: "CDF Details",
        row,
      });
    }

    setFlagState(true);
  };

  return (
    <Container fluid>
      <ModalComponent
        modalObject={modalObject}
        setFlagState={setFlagState}
        flagState={flagState}
      >
        {modalObject.title === "CDF Details" ? (
          <CDFForm />
        ) : modalObject.title === "CDF View Details" ? (
          <CDFViewForm />
        ) : (
          ""
        )}
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
