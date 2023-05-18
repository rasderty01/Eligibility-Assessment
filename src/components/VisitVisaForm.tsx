"use client";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useRef, useState } from "react";
import { BeatLoader, BarLoader } from "react-spinners";
import { useForm, SubmitHandler } from "react-hook-form";
import getFormDataWithLabels from "@/utils/getFormDataWithLabels";
import {
  PerrorClass,
  buttonClass,
  inputBaseClass,
  inputErrorClass,
  labelClass,
} from "@/utils/formstyles";
import { useCountdown } from "./ui/CountdownContext";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  whatsappNumber: string;
  yesNoQuestion: string;
  RelationshipWithSponsor?: string;
  metWithSponsor?: string;
  ApplicantSourceOfIncome?: string;
  SponsorSourceOfIncome?: string;
  incomeRange?: string;
  typeofVisa: string;
};

const VisitVisaForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { startCountdown } = useCountdown();

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
      yesNoQuestion: "No Data",
      RelationshipWithSponsor: "No Data",
      metWithSponsor: "No Data",
      ApplicantSourceOfIncome: "No Data",
      SponsorSourceOfIncome: "No Data",
      incomeRange: "No Data",
      typeofVisa: "Visit Visa",
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
      toast.success("Successfully submitted the form!");
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
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="w-full mx-auto space-y-4 items-center ">
          <div className="flex-col hidden">
            <label htmlFor="typeofVisa" className={labelClass}>
              Type of Visa
            </label>

            <input
              id="typeofVisa"
              type="text"
              defaultValue="Visit Visa"
              {...register("typeofVisa")}
            />
          </div>
          <div className="flex flex-col">
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
              className={`${inputBaseClass}  ${
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
            <label htmlFor="yesNoQuestion" className={labelClass}>
              Are you applying with a Sponsor?
            </label>
            <select
              id="yesNoQuestion"
              placeholder="Select an Option"
              className={inputBaseClass}
              {...register("yesNoQuestion", { required: true })}
            >
              <option disabled defaultValue={""}>
                Select an Option
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {watch("yesNoQuestion") === "Yes" ? (
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="RelationshipWithSponsor" className={labelClass}>
                  {"What's your relationship with the Sponsor?"}
                </label>
                <select
                  id="RelationshipWithSponsor"
                  placeholder="Select an Option"
                  {...register("RelationshipWithSponsor", { required: true })}
                  className={inputBaseClass}
                >
                  <option value="Family">Family</option>
                  <option value="Partner">Partner</option>
                  <option value="Friends">Friends</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="metWithSponsor" className={labelClass}>
                  Have you already met the Sponsor in person?
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
                  {"What's your source of income?"}
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
            </div>
          ) : watch("yesNoQuestion") === "No" ? (
            <>
              <div className="flex flex-col">
                <label htmlFor="incomeRange" className={labelClass}>
                  {"What's your income range?"}
                </label>
                <select
                  id="incomeRange"
                  placeholder="Select an Option"
                  {...register("incomeRange", { required: true })}
                  className={inputBaseClass}
                >
                  <option value="₱10,000-₱20,000">₱10,000-₱20,000</option>
                  <option value="₱21,000-₱40,000">₱21,000-₱40,000</option>
                  <option value="₱40,000 above">₱40,000 above</option>
                </select>
              </div>
            </>
          ) : null}

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

export default VisitVisaForm;
