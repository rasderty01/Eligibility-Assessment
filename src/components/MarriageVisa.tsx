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
import { useCountdown } from "./ui/CountdownContext";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  whatsappNumber: string;
  MarriageSourceOfIncome: string;
  StrongTies?: string;
  metWithSponsor?: string;
  ApplicantSourceOfIncome?: string;
  SponsorSourceOfIncome?: string;
  MaritalStatus: string;
  MarriageSponsorMaritalStatus: string;
  SpousalBenefits?: string;
  typeofVisa: string;
};

const MarriageVisa = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { startCountdown } = useCountdown();

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
      MarriageSourceOfIncome: "",
      StrongTies: "",
      metWithSponsor: "",
      ApplicantSourceOfIncome: "",
      SponsorSourceOfIncome: "",
      MaritalStatus: "",
      MarriageSponsorMaritalStatus: "",
      SpousalBenefits: "",
      typeofVisa: "Marriage Visa",
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
      startCountdown();
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
              defaultValue="Marriage Visa"
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
              type="text"
              placeholder="+63 or +44"
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
              {"What's your Marital Status?"}
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
            <label htmlFor="MarriageSourceOfIncome" className={labelClass}>
              {"What's your source of income?"}
            </label>
            <select
              id="MarriageSourceOfIncome"
              placeholder="Select an Option"
              className={inputBaseClass}
              {...register("MarriageSourceOfIncome", { required: true })}
            >
              <option disabled defaultValue={""}>
                Select an Option
              </option>
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
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="StrongTies" className={labelClass}>
              {"Do you have strong ties?"}
            </label>
            <select
              id="StrongTies"
              placeholder="Select an Option"
              {...register("StrongTies", { required: true })}
              className={inputBaseClass}
            >
              <option value="Family">Family</option>
              <option value="Property">Property</option>
              <option value="Pet">Pet</option>
              <option value="None">None</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="metWithSponsor" className={labelClass}>
              Have you met in person?
            </label>
            <select
              id="metWithSponsor"
              placeholder="Select an Option"
              {...register("metWithSponsor", { required: true })}
              className={inputBaseClass}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="ApplicantSourceOfIncome" className={labelClass}>
              {" What's your source of income?"}
            </label>
            <select
              id="ApplicantSourceOfIncome"
              placeholder="Select an Option"
              {...register("ApplicantSourceOfIncome", { required: true })}
              className={inputBaseClass}
            >
              <option disabled defaultValue={""}>
                Select an Option
              </option>
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

          <div className="flex flex-col">
            <label
              htmlFor="MarriageSponsorMaritalStatus"
              className={labelClass}
            >
              {"What's your partner's Marital Status?"}
            </label>
            <select
              id="MarriageSponsorMaritalStatus"
              placeholder="Select an Option"
              className={inputBaseClass}
              {...register("MarriageSponsorMaritalStatus", {
                required: true,
              })}
            >
              <option disabled defaultValue={""}>
                Select an Option
              </option>
              <option value="Single">Single</option>
              <option value="Divorce/Anulled">Divorce/Anulled</option>
              <option value="Married">Married</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col mt-1">
              <label htmlFor="SponsorSourceOfIncome" className={labelClass}>
                {"What's your partner's source of income?"}
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
                  What type of benefits does your partner receive?
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
            <button type="submit" className={buttonClass}>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MarriageVisa;
