/* eslint-disable react/no-unescaped-entities */
"use client";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useRef, useState } from "react";
import { BeatLoader, BarLoader } from "react-spinners";
import { useForm, SubmitHandler } from "react-hook-form";
import getFormDataWithLabels from "@/utils/getFormDataWithLabels";
import {
  labelClass,
  inputBaseClass,
  inputErrorClass,
  PerrorClass,
} from "@/utils/formstyles";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  whatsappNumber: string;
  financialRequirement: string;
  DateofMarriage: string;
  PlaceOfMarriage?: string;
  ApplicantSourceOfIncome?: string;
  SponsorSourceOfIncome?: string;
  SpousalBenefits?: string;
  typeofVisa: string;
};

const SpousalVisa = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      financialRequirement: "",
      DateofMarriage: "",
      PlaceOfMarriage: "",
      ApplicantSourceOfIncome: "",
      SponsorSourceOfIncome: "",
      SpousalBenefits: "",
      typeofVisa: "Spousal Visa",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    const dataWithLabels = getFormDataWithLabels(formRef.current);

    try {
      const createcontact = await axios.post("/api/submitForm", data);
      const contactId = createcontact.data.id;
      const withID = { ...dataWithLabels, contactId };
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
    <div className="flex flex-col items-center justify-center w-full ">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="w-full ">
        <div className="w-full mx-auto space-y-4 items-center ">
          <div className="flex-col hidden">
            <label htmlFor="typeofVisa" className={labelClass}>
              Type of Visa
            </label>

            <input
              id="typeofVisa"
              type="text"
              defaultValue="Spousal Visa"
              {...register("typeofVisa")}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="firstName" className={labelClass}>
              First Name
            </label>

            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              {...register("firstName", {
                required: "First name is required",
              })}
              {...register("firstName", { required: true })}
              className={`${inputBaseClass} ${
                errors.firstName ? inputErrorClass : "border-gray-300"
              }`}
            />

            {errors.firstName && (
              <p className={PerrorClass}>{errors.firstName.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className={labelClass}>
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              {...register("lastName", {
                required: "Last name is required",
              })}
              className={`${inputBaseClass} ${
                errors.lastName ? inputErrorClass : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <p className={PerrorClass}>{errors.lastName.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className={labelClass}>
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
              className={`${inputBaseClass} ${
                errors.email ? inputErrorClass : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className={PerrorClass}>{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="whatsappNumber" className={labelClass}>
              WhatsApp Number
            </label>
            <input
              id="whatsappNumber"
              type="number"
              placeholder="WhatsApp Number"
              {...register("whatsappNumber", {
                required: "WhatsApp Number is required",
              })}
              className={`${inputBaseClass} ${
                errors.whatsappNumber ? inputErrorClass : "border-gray-300"
              }`}
            />
            {errors.whatsappNumber && (
              <p className={PerrorClass}>{errors.whatsappNumber.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="financialRequirement" className={labelClass}>
              Have you met the financial requirement of £18,600?
            </label>
            <select
              id="financialRequirement"
              className={inputBaseClass}
              {...register("financialRequirement", { required: true })}
            >
              <option disabled defaultValue={""}>
                Select an Option
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="DateofMarriage" className={labelClass}>
              Date of Marriage
            </label>
            <input
              type="date"
              placeholder="Pick a Date"
              id="DateofMarriage"
              {...register("DateofMarriage", {
                required: "Date of Marriage is required",
              })}
              defaultValue={"Pick A Date"}
              className={inputBaseClass}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="PlaceOfMarriage"
              className="text-sm font-medium text-gray-700"
            >
              Place of Marriage
            </label>
            <input
              type="text"
              {...register("PlaceOfMarriage", {
                required: "Place of Marraige is required",
              })}
              id="PlaceOfMarriage"
              className={`${inputBaseClass} ${
                errors.PlaceOfMarriage ? inputErrorClass : "border-gray-300"
              }`}
            />
            {errors.PlaceOfMarriage && (
              <p className={PerrorClass}>{errors.PlaceOfMarriage.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="ApplicantSourceOfIncome" className={labelClass}>
              What's your source of income?
            </label>
            <select
              id="ApplicantSourceOfIncome"
              placeholder="Select an Option"
              {...register("ApplicantSourceOfIncome", { required: true })}
              className={inputBaseClass}
            >
              <option value="Employment (more than a year)">
                Employment (more than a year)
              </option>
              <option value="Employment (less than a year)">
                Employment (less than a year)
              </option>
              <option value="Business (more than a year)">
                Business (more than a year)
              </option>
              <option value="Business (less than a year)">
                Business (less than a year)
              </option>
              <option value="Unemployed/Student">Unemployed/Student</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col mt-1">
              <label htmlFor="SponsorSourceOfIncome" className={labelClass}>
                {"What's your Sponsor's source of income?"}
              </label>
              <select
                id="SponsorSourceOfIncome"
                placeholder="Select an Option"
                {...register("SponsorSourceOfIncome", { required: true })}
                className={inputBaseClass}
              >
                <option value="Pension">Pension</option>
                <option value="Employment">Employment</option>
                <option value="Business/Self-employed">
                  Business/Self-employed
                </option>
                <option value="On Benefits">On Benefits</option>
              </select>
            </div>
            {watch("SponsorSourceOfIncome") === "On Benefits" ? (
              <div className="flex flex-col mt-1">
                <label htmlFor="SpousalBenefits" className={labelClass}>
                  What type of benefits does your Sponsor receive?
                </label>
                <input
                  type="text"
                  id="SpousalBenefits"
                  {...register("SpousalBenefits", { required: true })}
                  className={inputBaseClass}
                />
              </div>
            ) : null}
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
        </div>
      </form>
    </div>
  );
};

export default SpousalVisa;
