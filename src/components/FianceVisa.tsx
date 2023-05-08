/* eslint-disable react/no-unescaped-entities */
"use client";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { BeatLoader, GridLoader } from "react-spinners";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  whatsappNumber: string;
  MaritalStatus: string;
  RelationshipWithSponsor?: string;
  metWithSponsor?: string;
  FianceFinancialRequirement?: string;
  FianceSponsorMaritalStatus?: string;
  FianceSponsorSourceOfIncome?: string;
};

const FianceVisa = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000); // 1000ms or 1 second, adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      whatsappNumber: "",
      MaritalStatus: "",
      RelationshipWithSponsor: "",
      metWithSponsor: "",
      FianceFinancialRequirement: "",
      FianceSponsorMaritalStatus: "",
      FianceSponsorSourceOfIncome: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    try {
      const createcontact = await axios.post("/api/submitForm", data);
      const contactId = createcontact.data.id;
      const withID = { ...data, contactId };
      const createtask = await axios.post("/api/createTask", withID);
      toast.success("Sucessfully submitted the form!");
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to submit the form. Please try again.");
      setIsLoading(false);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="flex flex-col items-center">
      {initialLoading ? (
        <GridLoader
          color="#36d7b7"
          className="flex justify-center m-auto w-96 h-96"
        />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-96 justify-center"
        >
          <div className="flex flex-col ">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              {...register("firstName", {
                required: "First name is required",
              })}
              className={`px-4 py-2 mt-1 text-sm border ${
                errors.firstName ? "border-red-600" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-sky-300`}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.firstName.message}
              </p>
            )}
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
              type="text"
              placeholder="Last Name"
              {...register("lastName", {
                required: "Last name is required",
              })}
              className={`px-4 py-2 mt-1 text-sm border ${
                errors.lastName ? "border-red-600" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-sky-300`}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`px-4 py-2 mt-1 text-sm border ${
                errors.email ? "border-red-600" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-sky-300`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
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
              type="number"
              placeholder="WhatsApp Number"
              {...register("whatsappNumber", {
                required: "WhatsApp Number is required",
              })}
              className={`px-4 py-2 mt-1 text-sm border ${
                errors.whatsappNumber ? "border-red-600" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-sky-300`}
            />
            {errors.whatsappNumber && (
              <p className="mt-1 text-xs text-red-600">
                {errors.whatsappNumber.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="MaritalStatus"
              className="text-sm font-medium text-gray-700"
            >
              What's your Marital Status?
            </label>
            <select
              id="MaritalStatus"
              placeholder="Select an Option"
              className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-sky-300"
              {...register("MaritalStatus", { required: true })}
            >
              <option disabled defaultValue={""}>
                Select an Option
              </option>
              <option value="Single">Single</option>
              <option value="Divorce/Anulled">Divorce/Anulled</option>
              <option value="Married">Married</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="metWithSponsor"
              className="text-sm font-medium text-gray-700"
            >
              Have you met your sponsor in person?
            </label>
            <select
              id="metWithSponsor"
              placeholder="Select an Option"
              className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-sky-300"
              {...register("metWithSponsor", { required: true })}
            >
              <option disabled defaultValue={""}>
                Select an Option
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="FianceFinancialRequirement"
              className="text-sm font-medium text-gray-700"
            >
              Have you met the financial requirement of £18,600?
            </label>
            <select
              id="FianceFinancialRequirement"
              placeholder="Select an Option"
              className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-sky-300"
              {...register("FianceFinancialRequirement", { required: true })}
            >
              <option disabled defaultValue={""}>
                Select an Option
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="FianceSponsorMaritalStatus"
              className="text-sm font-medium text-gray-700"
            >
              What's the Sponsor's Marital Status?
            </label>
            <select
              id="FianceSponsorMaritalStatus"
              placeholder="Select an Option"
              className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-sky-300"
              {...register("FianceSponsorMaritalStatus", { required: true })}
            >
              <option disabled defaultValue={""}>
                Select an Option
              </option>
              <option value="Single">Single</option>
              <option value="Divorce/Anulled">Divorce/Anulled</option>
              <option value="Married">Married</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="FianceSponsorSourceOfIncome"
              className="text-sm font-medium text-gray-700"
            >
              What's the Sponsor's Source of Income?
            </label>
            <select
              id="FianceSponsorSourceOfIncome"
              placeholder="Select an Option"
              className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-sky-300"
              {...register("FianceSponsorSourceOfIncome", { required: true })}
            >
              <option disabled defaultValue={""}>
                Select an Option
              </option>
              <option value="Pension">Pension</option>
              <option value="Employment">Employment</option>
              <option value="Business/Self-employed">
                Business/Self-employed
              </option>
              <option value="On Benefits">On Benefits</option>
            </select>
          </div>
          {isLoading ? (
            <BeatLoader size={10} color="#123abc" loading={isLoading} />
          ) : (
            <button
              type="submit"
              className="w-auto px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Submit
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default FianceVisa;
