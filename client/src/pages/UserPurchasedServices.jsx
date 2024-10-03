import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table, Avatar, Typography, Button } from 'antd';
import React from "react";
import { Row, Col, Card } from "antd";
import Main from '../components/layout/Main';
import { authHeaders, checkToken, SERVICE_PURCHASE_API, URL } from '../constant';
import AddNewService from '../components/AddNewService';

const { Title } = Typography;

const PurchaseTable = () => {
  const [purchaseData, setPurchaseData] = useState([]);

  useEffect(() => {
    // Fetch purchase data from your API
    const fetchPurchaseData = async () => {
      try {
        const response = await axios.get(`${URL}${SERVICE_PURCHASE_API}`, authHeaders); // Replace with your API endpoint
        console.log(response)
        setPurchaseData(response.data);
      } catch (error) {
        console.error("Error fetching purchase data:", error);
      }
    };

    fetchPurchaseData();
  }, []);

  // Table columns configuration
  const columns = [
    {
      title: "USER",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
            src={user.profilePic || 'default-avatar.jpg'}
          />
          <div className="avatar-info">
            <Title level={5}>{user.name}</Title>
            <p>{user.email}</p>
          </div>
        </Avatar.Group>
      ),
    },
    {
      title: "SERVICE PLAN",
      dataIndex: "servicePlan",
      key: "servicePlan",
      render: (servicePlan) => (
        <>
          <div className="service-info">
            <Title level={5}>{servicePlan.name}</Title>
            <p>{servicePlan.description}</p>
          </div>
        </>
      ),
    },
    {
      title: "EXPIRY DATE",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (expiryDate) => (
        <>
          <span>{new Date(expiryDate).toLocaleDateString()}</span>
        </>
      ),
    },
  ];

  return (
    <div className="table-container">
      <Table
        columns={columns}
        dataSource={purchaseData}
        rowKey={(record) => record._id} // Assuming each record has a unique _id
      />
    </div>
  );
};

// const UsersTable = () => {
//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     // Fetch purchase data from your API
//     const fetchPurchaseData = async () => {
//       try {
//         const response = await axios.get(`${URL}${SERVICE_PURCHASE_API}`); // Replace with your API endpoint
//         console.log(response)
//         setPurchaseData(response.data);
//       } catch (error) {
//         console.error("Error fetching purchase data:", error);
//       }
//     };

//     fetchPurchaseData();
//   }, []);

//   // Table columns configuration
//   const columns = [
//     {
//       title: "USER",
//       dataIndex: "user",
//       key: "user",
//       render: (user) => (
//         <Avatar.Group>
//           <Avatar
//             className="shape-avatar"
//             shape="square"
//             size={40}
//             src={user.profilePic || 'default-avatar.jpg'}
//           />
//           <div className="avatar-info">
//             <Title level={5}>{user.name}</Title>
//             <p>{user.email}</p>
//           </div>
//         </Avatar.Group>
//       ),
//     },
//     {
//       title: "SERVICE PLAN",
//       dataIndex: "servicePlan",
//       key: "servicePlan",
//       render: (servicePlan) => (
//         <>
//           <div className="service-info">
//             <Title level={5}>{servicePlan.name}</Title>
//             <p>{servicePlan.description}</p>
//           </div>
//         </>
//       ),
//     },
//     {
//       title: "EXPIRY DATE",
//       dataIndex: "expiryDate",
//       key: "expiryDate",
//       render: (expiryDate) => (
//         <>
//           <span>{new Date(expiryDate).toLocaleDateString()}</span>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div className="table-container">
//       <Table
//         columns={columns}
//         dataSource={userData}
//         rowKey={(record) => record._id} // Assuming each record has a unique _id
//       />
//     </div>
//   );
// };



function Tables() {
  return (
    <Main>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            {/* Purchase Table */}
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Purchased Services"
            >
              <PurchaseTable /> {/* Render the PurchaseTable component */}
            </Card>

            {/* <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Purchased Services"
            >
              <PurchaseTable />
            </Card> */}

          </Col>
        </Row>
      </div>
    </Main>
  );
}

export default Tables;
