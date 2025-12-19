import React from "react";
import { FaRing } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import { MdMale, MdCake, MdFemale } from "react-icons/md";
import defaultAvatar from "../../Components/Questions/svgs/avatar-boy-(1).png";
import { Card, Image } from "react-bootstrap";
import { List } from "antd";
import {
  AiOutlineCalendar,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import dayjs from "dayjs";

export const CashFlowUserDetailsCard = ({ data, dataOf }) => {
  const fullName = [
    data?.[dataOf + "Title"],
    data?.[dataOf + "FirstName"],
    data?.[dataOf + "MiddleName"],
    data?.[dataOf + "LastName"],
  ]
    .filter(Boolean)
    .join(" ");

  const dobFormatted = data?.[dataOf + "DOB"]
    ? dayjs(data?.[dataOf + "DOB"], ["DD/MM/YYYY", "YYYY-MM-DD"]).format(
        "DD/MM/YYYY"
      )
    : "N/A";

  return (
    <div style={{ width: "38%" }}>
      <Card
        className="shadow-sm h-100 p-3 w-100"
        style={{ borderRadius: "12px", fontFamily: "Inter, sans-serif" }}
      >
        <div
          className="d-flex justify-content-center mb-3"
          onClick={() => {
            console.log(data);
          }}
        >
          <Image
            src={data?.image?.url || defaultAvatar}
            alt={`${dataOf} profile`}
            roundedCircle
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />
        </div>
        <Card.Title className="text-center mb-1">{fullName}</Card.Title>
        <Card.Subtitle
          className="text-center text-muted mb-3"
          style={{ fontSize: "0.9rem" }}
        >
          ({data?.[dataOf + "PreferredName"] || "No Nickname"})
        </Card.Subtitle>
        <div className="d-flex justify-content-center align-items-top">
          <div className="w-50">
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  icon: <AiOutlineCalendar color="#36b446" size={20} />,
                  text: `${dobFormatted} (${data?.[dataOf + "Age"] || "N/A"})`,
                },
                {
                  icon: <AiOutlinePhone color="#36b446" size={20} />,
                  text: data?.[dataOf + "WorkPhone"] || "N/A",
                },
              ]}
              renderItem={(item) => (
                <List.Item style={{ border: "none", padding: "8px 0" }}>
                  <div className="d-flex align-items-center">
                    <span className="me-2">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                </List.Item>
              )}
            />
          </div>
          <div className="w-50">
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  icon:
                    data?.[dataOf + "Gender"] == "Male" ? (
                      <MdMale color="#36b446" size={20} />
                    ) : (
                      <MdFemale color="#36b446" size={20} />
                    ),
                  text: `${data?.[dataOf + "Gender"] || "N/A"}`,
                },
                {
                  icon: <AiOutlineMail color="#36b446" size={20} />,
                  text:
                    data?.[dataOf == "client" ? "Email" : dataOf + "Email"] ||
                    "N/A",
                },
              ]}
              renderItem={(item) => (
                <List.Item style={{ border: "none", padding: "8px 0" }}>
                  <div className="d-flex align-items-center">
                    <span className="me-2">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

// <div className="col-md-6">
//     <div className="card w-100 rounded shadow-sm bg-Custom-green text-dark p-4">
//       <div className="row g-3">
//         {/* Client Column 1 */}
//         <div className="col-12 col-md-8">
//           <div className="row align-items-center">
//             <div className="col-2">
//               <img
//                 alt="Single"
//                 className="img-fluid"
//                 src={single} // Update this to the image source
//                 style={{ height: "18px", width: "18px" }}
//               />
//             </div>
//             <div className="col fw-bold">{data?.[`${dataOf}GivenName`]}</div>
//           </div>
//           <div className="row align-items-center mt-2">
//             <div className="col-2">
//               <MdMale size={20} />
//             </div>
//             <div className="col fw-bold">{data?.[`${dataOf}Gender`]}</div>
//           </div>
//           <div className="row align-items-center mt-2">
//             <div className="col-2">
//               <MdCake size={20} />
//             </div>
//             <div className="col fw-bold">
//               {ConvertDate(data?.[`${dataOf}DOB`])}
//             </div>
//           </div>
//         </div>

//         {/* Client Column 2 */}
//         <div className="col-12 col-md-4">
//           <div className="row align-items-center">
//             <div className="col-2">
//               <FaArrowRotateRight size={20} />
//             </div>
//             <div className="col fw-bold">{data?.[`${dataOf}Age`]}</div>
//           </div>
//           <div className="row align-items-center mt-2">
//             <div className="col-2">
//               <FaRing size={20} />
//             </div>
//             <div className="col fw-bold">
//               {data?.[`${dataOf}MaritalStatus`]}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
