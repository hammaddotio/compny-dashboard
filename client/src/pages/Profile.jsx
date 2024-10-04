/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useEffect, useState } from "react";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import convesionImg from "../assets/images/face-3.jpg";
import convesionImg2 from "../assets/images/face-4.jpg";
import convesionImg3 from "../assets/images/face-5.jpeg";
import convesionImg4 from "../assets/images/face-6.jpeg";
import convesionImg5 from "../assets/images/face-2.jpg";
import project1 from "../assets/images/home-decor-1.jpeg";
import project2 from "../assets/images/home-decor-2.jpeg";
import project3 from "../assets/images/home-decor-3.jpeg";
import Main from "../components/layout/Main";
import { useCallApi } from "../context/CallApiAndUpdateState";

import axios from "axios"
import { authHeaders, GET_USER_API, GET_USER_SERVICES_PURCHASES_API, URL } from "../constant"

function Profile() {
  // const { getUser, user } = useCallApi()

  const [imageURL, setImageURL] = useState(false);
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

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

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
                  <p>CEO / Co-Founder</p>
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
              {/* <Radio.Group defaultValue="a">
                <Radio.Button value="a">OVERVIEW</Radio.Button>
                <Radio.Button value="b">TEAMS</Radio.Button>
                <Radio.Button value="c">PROJECTS</Radio.Button>
              </Radio.Group> */}
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        {/* <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Platform Settings</h6>}
          >
            <ul className="list settings-list">
              <li>
                <h6 className="list-header text-sm text-muted">ACCOUNT</h6>
              </li>
              <li>
                <Switch defaultChecked />

                <span>Email me when someone follows me</span>
              </li>
              <li>
                <Switch />
                <span>Email me when someone answers me</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Email me when someone mentions me</span>
              </li>
              <li>
                <h6 className="list-header text-sm text-muted m-0">
                  APPLICATION
                </h6>
              </li>
              <li>
                <Switch defaultChecked />
                <span>New launches and projects</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Monthly product updates</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Subscribe to newsletter</span>
              </li>
            </ul>
          </Card>
        </Col> */}
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={<Button type="link">{pencil}</Button>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >

            <hr className="my-25" />
            <Descriptions title="">
              <Descriptions.Item label="Full Name" span={3}>
                {user?.username}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                {user?.phone_number}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {user?.personal_email}
              </Descriptions.Item>
              <Descriptions.Item label="Location" span={3}>
                {user?.address}
              </Descriptions.Item>
              <Descriptions.Item label="Website" span={3}>
                {user?.website}
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


        <Row gutter={[24, 24]}>
          {purchases?.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
              // cover={<img alt="example" src={p?.img} />}
              >
                {/* <div className="card-tag">{p?.titlesub}</div> */}
                <h5>{Date(p?.purchaseDate).normalize()}</h5>
                <p>{p?.expiryDate}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button type="button">VIEW PROJECT</Button>
                  </Col>
                  {/* <Col span={12} className="text-right">
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col> */}
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </Main>
  );
}

export default Profile;
