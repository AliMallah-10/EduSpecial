import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/donationStyle.css";

function DonationPage() {
  const [donations, setDonations] = useState([]);
  const [totalDonated, setTotalDonated] = useState(0);

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
          <div className="flex flex-col text-white">
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
