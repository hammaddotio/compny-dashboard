import { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import BgProfile from "../assets/images/bg-profile.jpg";
import Main from '../components/layout/Main';
import { URL, ALL_PLANS_API, authHeaders, checkToken, checkUserRole, DELETE_SERVICE_API, UPDATE_SERVICE_API } from './../constant';
import axios from "axios";
import ServicesListModal from './../components/ServicesListModal';
import AddNewService from './../components/AddNewService';
import { useCallApi } from "../context/CallApiAndUpdateState";
import UpdateService from './../components/UpdateService';

const PlansList = () => {
  const { getUser } = useCallApi();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch plans data from the API
  const fetchServicePlans = async () => {
    try {
      const response = await axios.get(`${URL}${ALL_PLANS_API}`);
      setPlans(response.data); // Assuming the API returns an array of plans
      setLoading(false);
      // getUser();
    } catch (error) {
      setError('Failed to load plans.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicePlans();
  }, []); // Plans as a dependency to ensure re-fetching when plans are updated

  // Handle delete
  const handleDelete = async (planId) => {
    try {
      await axios.delete(`${URL}${DELETE_SERVICE_API}/${planId}`, authHeaders);
      fetchServicePlans(); // Refetch the plans after delete operation
      console.log('deleted')
    } catch (error) {
      setError('Failed to delete the plan.');
    }
  };

  // Handle update
  const handleUpdate = async (updatedPlan) => {
    try {
      await axios.put(`${URL}${UPDATE_SERVICE_API}/${updatedPlan._id}`, updatedPlan, authHeaders);
      fetchServicePlans(); // Refetch plans after update
    } catch (error) {
      setError('Failed to update the plan.');
    }
  };

  // Render loading or error state
  // if (loading) return <p>Loading plans...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <Main loading={loading} error={error}>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-bold text-center text-3xl mt-6">SERVICES PLANS</h6>
            {
              checkToken && checkUserRole === 'AD' &&
              <div className="flex justify-end">
                <AddNewService fetchServicePlans={fetchServicePlans} />
              </div>
            }
          </>
        }
      >
        <Row gutter={[24, 24]} className="justify-center">
          {plans.map((p, index) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
              key={index}
              className="border space-y-10 p-4"
            >
              <Card
                bordered={false}
                className="card-project"
              >
                <h5>{p.name}</h5>
                <div className="card-tag">{p.description}</div>
                <p>${p.price}/month</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    {/* Modal to display details */}
                    <ServicesListModal selectedPlan={p} />
                  </Col>
                  {
                    checkToken && checkUserRole === 'AD' && (
                      <Col span={12} className="flex justify-end gap-2">
                        {/* <Button
                          icon={<EditOutlined />}
                          onClick={() => handleUpdate(p)}
                          size="small"
                        /> */}
                        <UpdateService fetchServicePlans={fetchServicePlans} selectedPlan={p} />
                        <Button
                          icon={<DeleteOutlined />}
                          onClick={() => handleDelete(p._id)}
                          size="middle"
                          danger
                        />
                      </Col>
                    )
                  }
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </Main>
  );
};

export default PlansList;
