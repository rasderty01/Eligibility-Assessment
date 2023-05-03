"use client";
import React, { useState } from "react";

const VisitVisaForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      email,
      whatsAppNumber,
    };
    console.log(formData);
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="space-y-4 w-96 justify-center">
        <div className="flex flex-col ">
          <label
            htmlFor="firstName"
            className="text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="lastName"
            className="text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="whatsappNumber"
            className="text-sm font-medium text-gray-700"
          >
            WhatsApp Number
          </label>
          <input
            id="whatsappNumber"
            name="whatsappNumber"
            type="text"
            value={whatsAppNumber}
            onChange={(e) => setWhatsAppNumber(e.target.value)}
            className="px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="country"
            className="text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <select
            id="country"
            name="country"
            className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          >
            <option value="PH">PH</option>
            <option value="UK">UK</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default VisitVisaForm;
