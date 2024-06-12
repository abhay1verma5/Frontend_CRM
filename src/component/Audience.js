import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Audience = () => {
  const [audiences, setAudiences] = useState("");

  const navigate = useNavigate();
    const fetchAudiences = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/audience`);
        setAudiences(response.data);
        console.log(response.data,"sd")
      } catch (error) {
        console.error('Error fetching audience data:', error);
      }
    };
    const handleNavigate = () => {
      navigate('/campaign');
    };
  

  return (
    <div className="flex justify-center items-center h-screen">
     
        <div  className="p-8 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
         
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Audience Size Checking</h5>
           
            
            <p className="mb-3 font-semibold text-xl text-gray-700 dark:text-gray-400">Size:  {audiences}</p>
            
           <div className='flex flex-row'>
           <button type="button" onClick={fetchAudiences } class=" mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Audience</button>
           <button type="button" onClick={handleNavigate} class=" mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Campaign</button>
           </div>
                  </div>
     
    </div>
  );
};

export default Audience;
