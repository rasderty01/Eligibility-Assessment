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
  buttonClass,
} from "@/utils/formstyles";

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
  typeofVisa: string;
};

const FianceVisa = () => {
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
      MaritalStatus: "",
      RelationshipWithSponsor: "",
      metWithSponsor: "",
      FianceFinancialRequirement: "",
      FianceSponsorMaritalStatus: "",
      FianceSponsorSourceOfIncome: "",
      typeofVisa: "Fiance Visa",
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
              defaultValue="Fiance Visa"
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
            <label htmlFor="MaritalStatus" className={labelClass}>
              What's your Marital Status?
            </label>
            <select
              id="MaritalStatus"
              placeholder="Select an Option"
              className={inputBaseClass}
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
            <label htmlFor="metWithSponsor" className={labelClass}>
              Have you met your sponsor in person?
            </label>
            <select
              id="metWithSponsor"
              placeholder="Select an Option"
              className={inputBaseClass}
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
            <label htmlFor="FianceFinancialRequirement" className={labelClass}>
              Have you met the financial requirement of £18,600?
            </label>
            <select
              id="FianceFinancialRequirement"
              placeholder="Select an Option"
              className={inputBaseClass}
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
            <label htmlFor="FianceSponsorMaritalStatus" className={labelClass}>
              What's the Sponsor's Marital Status?
            </label>
            <select
              id="FianceSponsorMaritalStatus"
              placeholder="Select an Option"
              className={inputBaseClass}
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
            <label htmlFor="FianceSponsorSourceOfIncome" className={labelClass}>
              What's the Sponsor's Source of Income?
            </label>
            <select
              id="FianceSponsorSourceOfIncome"
              placeholder="Select an Option"
              className={inputBaseClass}
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
            <button type="submit" className={buttonClass}>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FianceVisa;
