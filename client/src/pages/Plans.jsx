import React from 'react';
import { plans } from '../utils'
import { Card } from 'antd';
import PricePlaneListModal from '../components/ServicesListModal';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const Plans = () => {


  return (
    <Card title="Plans">
      {/* <Card.Grid style={gridStyle}>Content</Card.Grid> */}

      {
        plans.map((plan, index) => (
          <Card.Grid style={gridStyle} key={index} >
            <div>
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p className='my-4'>{plan.price} days</p>
              <p className='my-4'>{plan.description}</p>
              {/* <button className="mt-4 bg-white text-black px-3 py-1 rounded-full hover:bg-gray-300 transition">
                            SIGN UP
                        </button> */}
              <PricePlaneListModal selectedPlan={plan} />
            </div>
          </Card.Grid>
        ))
      }
    </Card>
  );
}
export default Plans;