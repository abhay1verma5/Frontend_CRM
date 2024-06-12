import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Customer = () => {
  const [totalSpends, setTotalSpends] = useState('');
  const [numberOfVisits, setNumberOfVisits] = useState('');
  const [id, setId] = useState(localStorage.getItem('userId'));

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/customers`, {
        totalSpends,
         maxVisits:numberOfVisits,
         customerId: id
      });

      if (response.data.message === "Already_Exist") {
        toast.error("Customer already exists");
      } else {
        toast.success("Customer saved successfully");
      }
    } catch (error) {
      console.error('Error sending data:', error);
      toast.error("Error sending data");
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit} className="w-1/3 bg-gray-900 p-6 rounded-lg">
        <div className='text-center text-2xl text-gray-900 dark:text-white'> Customer </div>
        <div className="mb-5">
          <label
            htmlFor="totalSpends-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Total Spends
          </label>
          <input
            type="number"
            id="totalSpends-input"
            value={totalSpends}
            onChange={(e) => setTotalSpends(e.target.value)}
            className="w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="numberOfVisits-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Number Of Visits
          </label>
          <input
            type="number"
            id="numberOfVisits-input"
            value={numberOfVisits}
            onChange={(e) => setNumberOfVisits(e.target.value)}
            className="w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Customer;
