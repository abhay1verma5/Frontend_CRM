import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/campaign`)
      .then(response => {
        setCampaigns(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the campaigns!', error);
      });
  }, []);
  const campaignHandle = async (id) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/campaign/send`, {
        logId:id 
      });
      
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Campaign ID
              </th>
              <th scope="col" className="px-6 py-3">
                Campaign Customer ID
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(campaign => (
              <tr key={campaign.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {campaign._id}
                </th>
                <td className="px-6 py-4">
                  {campaign.messages[0].customerId
                  }
                </td>
                <td className="px-6 py-4">
                  {campaign.messages[0].status}
                </td>
                
                <td className="px-6 py-4 text-right">
                  <button onClick={()=>campaignHandle(campaign._id)}className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Campaign;
