import { useEffect, useState } from "react";

import {
  Row,
  Col,
  Card,
  Button,
  Descriptions,
  Avatar,
} from "antd";

import BgProfile from "../assets/images/bg-profile.jpg";
import Main from "../components/layout/Main";
import { useCallApi } from "../context/CallApiAndUpdateState";

import axios from "axios"
import { authHeaders, GET_USER_API, GET_USER_SERVICES_PURCHASES_API, URL } from "../constant"



import { Table, Typography } from 'antd';
import EditUserInfo from "../components/EditUserInfo";

const { Title } = Typography;


const PurchaseTable = ({ purchases, setPurchases, userId }) => {
  const columns = [
    {
      title: "SERVICE PLAN",
      dataIndex: "servicePlan",
      key: "servicePlan",
      width: 200,
      render: (servicePlan) => (
        <div className="p-2">
          <Title level={5} className="text-base md:text-lg">
            {servicePlan?.name}
          </Title>
          <p className="text-xs md:text-sm text-gray-500">
            {servicePlan?.description}
          </p>
        </div>
      ),
    },
    {
      title: "PURCHASE DATE",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      width: 150,
      render: (purchaseDate) => (
        <span className="text-sm md:text-base">
          {new Date(purchaseDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: "EXPIRY DATE",
      dataIndex: "expiryDate",
      key: "expiryDate",
      width: 150,
      render: (expiryDate) => (
        <span className="text-sm md:text-base">
          {new Date(expiryDate).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const userPurchases = async () => {
    if (!userId) return;

    try {
      const response = await axios.get(
        `${URL}${GET_USER_SERVICES_PURCHASES_API}/${userId}`,
        authHeaders
      );
      const purchases = response.data;
      setPurchases(purchases);
    } catch (error) {
      console.log("Error fetching purchases:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      userPurchases();
    }
  }, [userId]);

  return (
    <div className="overflow-x-auto p-4 md:p-6">
      <Table
        columns={columns}
        dataSource={purchases}
        rowKey={(record) => record._id}
        scroll={{ x: 600 }}
        className="w-full bg-white rounded-lg shadow-sm"
      />
    </div>
  );
};




function Profile() {
  // const { getUser, user } = useCallApi()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [purchases, setPurchases] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get(`${URL}${GET_USER_API}`, authHeaders);
      const user = response.data.user;
      console.log("User Data:", user);  // Log user data
      setUserId(user._id);
      setUser(user);
    } catch (error) {
      console.log('Error fetching user:', error);
      setError(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const userPurchases = async () => {
    if (!userId) return; // Only proceed if userId is available

    try {
      console.log("Fetching purchases for userId:", userId);  // Log userId

      const response = await axios.get(`${URL}${GET_USER_SERVICES_PURCHASES_API}/${userId}`, authHeaders);
      const purchases = response.data;

      console.log("Purchases Data:", purchases);  // Log API response for purchases
      setPurchases(purchases)
      if (purchases.length === 0) {
        console.log('No purchases found for this user');
      }
    } catch (error) {
      console.log('Error fetching purchases:', error);
      setError(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    // setInterval(() => {
    if (userId) {
      userPurchases();
    }
    // }, 1000)
  }, [userId]);


  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];


  return (
    <Main loading={loading} error={error} >
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={user?.profile_picture} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{user?.username}</h4>
                  {/* <p>CEO / Co-Founder</p> */}
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={<EditUserInfo icon={pencil} user={user} userId={userId} getUser={getUser} />}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <hr className="my-25" />
            <Descriptions title="">
              <Descriptions.Item label="Full Name" span={3}>
                {user?.username}
              </Descriptions.Item>
              <Descriptions.Item label="Company Name" span={3}>
                {user?.company_name}
              </Descriptions.Item>
              <Descriptions.Item label="Contact Person" span={3}>
                {user?.contact_person}
              </Descriptions.Item>
              <Descriptions.Item label="Official Email" span={3}>
                {user?.official_email}
              </Descriptions.Item>
              <Descriptions.Item label="Personal Email" span={3}>
                {user?.personal_email}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                {user?.phone_number}
              </Descriptions.Item>
              <Descriptions.Item label="Address" span={3}>
                {user?.address}
              </Descriptions.Item>
              <Descriptions.Item label="Website" span={3}>
                {user?.website_url}
              </Descriptions.Item>
              <Descriptions.Item label="Industry" span={3}>
                {user?.industry}
              </Descriptions.Item>
            </Descriptions>
          </Card>

        </Col>
        {/* <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Conversations</h6>}
            className="header-solid h-full"
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              split={false}
              className="conversations-list"
              renderItem={(item) => (
                <List.Item actions={[<Button type="link">REPLY</Button>]}>
                  <List.Item.Meta
                    avatar={
                      <Avatar shape="square" size={48} src={item.avatar} />
                    }
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col> */}
      </Row>
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">Buy Plan</h6>
            {/* <p>Architects design houses</p> */}
          </>
        }
      >


        <div>
          <PurchaseTable setPurchases={setPurchases} userId={userId} purchases={purchases} />
        </div>
      </Card>
    </Main>
  );
}

export default Profile;













// ----------------------------------------------------------------------



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
              <PurchaseTable />
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
}
