"use client";

import { useForm, SubmitHandler } from "react-hook-form";

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
};

const UnmarriedVistVisa = () => {
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
      yesNoQuestion: "",
      RelationshipWithSponsor: "",
      metWithSponsor: "",
      ApplicantSourceOfIncome: "",
      SponsorSourceOfIncome: "",
      incomeRange: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="flex flex-col items-center">
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
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
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
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
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
            htmlFor="yesNoQuestion"
            className="text-sm font-medium text-gray-700"
          >
            Are you applying with a Sponsor?
          </label>
          <select
            id="yesNoQuestion"
            placeholder="Select an Option"
            className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-sky-300"
            {...register("yesNoQuestion", { required: true })}
          >
            <option disabled defaultValue={""}>
              Select an Option
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        {watch("yesNoQuestion") === "yes" ? (
          <div className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="RelationshipWithSponsor"
                className="text-sm font-medium text-gray-700"
              >
                What's your relationship with the Sponsor?
              </label>
              <select
                id="RelationshipWithSponsor"
                placeholder="Select an Option"
                {...register("RelationshipWithSponsor", { required: true })}
                className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-sky-300"
              >
                <option value="Family">Family</option>
                <option value="Partner">Partner</option>
                <option value="Friends">Friends</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="metWithSponsor"
                className="text-sm font-medium text-gray-700"
              >
                Have you already met the Sponsor in person?
              </label>
              <select
                id="metWithSponsor"
                placeholder="Select an Option"
                {...register("metWithSponsor", { required: true })}
                className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-sky-300"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="ApplicantSourceOfIncome"
                className="text-sm font-medium text-gray-700"
              >
                What's your source of income?
              </label>
              <select
                id="ApplicantSourceOfIncome"
                placeholder="Select an Option"
                {...register("ApplicantSourceOfIncome", { required: true })}
                className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-sky-300"
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
              <label
                htmlFor="SponsorSourceOfIncome"
                className="text-sm font-medium text-gray-700"
              >
                What's your Sponsor's source of income?
              </label>
              <select
                id="SponsorSourceOfIncome"
                placeholder="Select an Option"
                {...register("SponsorSourceOfIncome", { required: true })}
                className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-sky-300"
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
        ) : watch("yesNoQuestion") === "no" ? (
          <>
            <div className="flex flex-col">
              <label
                htmlFor="incomeRange"
                className="text-sm font-medium text-gray-700"
              >
                What's your income range?
              </label>
              <select
                id="incomeRange"
                placeholder="Select an Option"
                {...register("incomeRange", { required: true })}
                className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-sky-300"
              >
                <option value="₱10,000-₱20,000">₱10,000-₱20,000</option>
                <option value="₱21,000-₱40,000">₱21,000-₱40,000</option>
                <option value="₱40,000 above">₱40,000 above</option>
              </select>
            </div>
          </>
        ) : null}

        <button
          type="submit"
          className="w-auto px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UnmarriedVistVisa;
