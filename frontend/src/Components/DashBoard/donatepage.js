import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/donationStyle.css";

function DonationPage() {
  const [donations, setDonations] = useState([]);
  const [totalDonated, setTotalDonated] = useState(0);
  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: 1, // Default quantity
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    fetchPrograms();
  }, []);
  // Fetch programs data
  const fetchPrograms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/program/getAllprograms"
      );
      setPrograms(response.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/users/checkout",
  //       { items: [formData] } // Assuming formData contains item details
  //     );

  //     if (response.status === 200) {
  //       // Redirect to Stripe checkout

  //       window.location.href = response.data.url;
  //     } else {
  //       // Display success message
  //       alert(response.data.error);
  //     }
  //   } catch (error) {
  //     alert(error.response.data.error);
  //     console.error("Error creating donation:", error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create donation
      const createDonationResponse = await axios.post(
        "http://localhost:3000/donate/adddonation",
        {
          username: "Super Help", // Replace with actual username retrieval method
          programOrEventName: formData.name, // Assuming formData.name corresponds to the selected program name
          amount: formData.price, // Assuming price corresponds to the donation amount
        }
      );

      if (createDonationResponse.status === 201) {
        // Donation created successfully

        // Proceed with Stripe payment
        const stripeResponse = await axios.post(
          "http://localhost:3000/users/checkout",
          { items: [formData] } // Assuming formData contains item details
        );

        if (stripeResponse.status === 200) {
          // Redirect to Stripe checkout
          window.location.href = stripeResponse.data.url;
        } else {
          // Display error message
          alert(stripeResponse.data.error);
        }
      }
    } catch (error) {
      console.error(
        "Error creating donation and proceeding with payment:",
        error
      );
    }
  };
  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    const totalAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);
    setTotalDonated(totalAmount);
  }, [donations]);

  const fetchDonations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/donate/getalldonations"
      );
      setDonations(response.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  return (
    <div className="min-h-screen py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
          Donations
        </h2>

        <div className="flex justify-between items-center mb-10">
          {/* Total Donated */}
          <div className="flex flex-col text-white bg-blue-400  rounded-md shadow-lg p-4 w-96 h-24">
            <p className="text-xl font-medium">Total Donated:</p>
            <p className="text-2xl font-bold">${totalDonated}</p>
          </div>
          {/* Radial Progress Bar */}
          <div className="flex justify-end w-full relative">
            <div
              className="radial-progress"
              style={{
                "--value": `${(totalDonated / 1000) * 100}`,
                "--size": "12rem",
                "--thickness": "2rem",
              }}
              role="progressbar"
            >
              {((totalDonated / 1000) * 100).toFixed(2)}%
            </div>
          </div>
        </div>

        {/*! form of Donations !*/}
        <form onSubmit={handleSubmit} className="mb-8 ">
          <div className="flex items-center justify-center w-full bg-blue-300 rounded-md shadow-md py-1">
            {/* Select Program */}
            <select
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mr-2 rounded-md p-2 w-48 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            >
              <option value="" className="bg-blue-400">
                Select Program
              </option>
              {programs.map((program) => (
                <option
                  key={program._id}
                  value={program.name}
                  className="bg-blue-500"
                >
                  {program.name}
                </option>
              ))}
            </select>

            {/* Price Input */}
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="mr-2 rounded-md p-2 w-48 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />

            {/* Donate Button */}
            <button
              type="submit"
              className="btn-donate bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg border-none"
            >
              Donate
            </button>
          </div>
        </form>
        {/* Donation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 cdD">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white shadow overflow-hidden sm:rounded-lg crdDonate"
            >
              <div className="px-4 py-5 mx-auto my-auto sm:px-6 bg-white">
                <h3 className="text-lg font-medium text-gray-900 text-center uppercase">
                  {donation.username}
                </h3>
                <p className="mt-1 text-sm text-gray-500 text-center">
                  {donation.programOrEventName}
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0 partDown">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="flex justify-between items-center py-4">
                    <div className="text-left ml-8">
                      <dt className="text-lg font-medium text-gray-500">
                        Amount
                      </dt>
                      <dd className="mt-1 text-base text-white">
                        ${donation.amount}
                      </dd>
                    </div>
                    <div className="text-left mt-4 mr-8 sm:mt-0">
                      <dt className="text-lg font-medium text-gray-500">
                        Date
                      </dt>
                      <dd className="mt-1 text-base text-white">
                        {new Date(donation.eventDate).toLocaleDateString()}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DonationPage;
