"use client";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  PerrorClass,
  buttonClass,
  inputBaseClass,
  inputErrorClass,
  labelClass,
} from "@/utils/formstyles";

import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Countdown from "@/components/ui/redirect";
import { useCountdown } from "@/components/ui/CountdownContext";
import {
  AlertDialogAction,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

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

const Booking = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

  const closeErrorDialog = () => {
    setIsErrorDialogOpen(false);
  };

  const facebook = () => {
    router.push("https://www.facebook.com/MGiUKGroup");
  };

  // Inside Booking component
  const { showCountdown, startCountdown, resetCountdown } = useCountdown();

  useEffect(() => {
    resetCountdown();
  }, []); // Note the empty array here

  console.log("Reset Countdown has been called", resetCountdown);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000); // 1000ms or 1 second, adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);

    try {
      const createcontact = await axios.post("/api/free15mins", data);

      toast.success("Congratulations, You're qualified!");
      startCountdown();
      console.log("StartCountdown has been called", startCountdown);
      setIsLoading(false);
    } catch (error) {
      setIsErrorDialogOpen(true);
      setIsLoading(false);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <AlertDialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle className="text-2xl font-medium text-gray-700 dark:text-gray-300">
            {"Sorry, you've already qualified for free consultation ☹️"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg font-medium text-gray-700 dark:text-gray-300">
            {"Please reach out to our Facebook page for paid consultations."}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={facebook}>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <>
        {showCountdown && (
          <Countdown redirectTo="https://meetings-eu1.hubspot.com/mgiukgroup/clone" />
        )}
        {!showCountdown && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-white dark:bg-gray-700 transition-all ease-in-out duration-500 p-8 rounded-lg shadow-md w-full xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 2xl:max-w-2xl"
          >
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {`Ready to explore UK? Find out if you qualify for a free 15-minute consultation with our expert consultants!`}
              <br></br>
              <br></br>
              {
                "Just enter your email below and let's see if we can help make your global dreams a reality."
              }
            </h1>

            <hr className="mb-3"></hr>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col mb-4 space-y-4">
                <label htmlFor="email" className={`${labelClass} 2xl:text-2xl`}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  autoComplete="email"
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
              {isLoading ? (
                <BeatLoader size={10} color="#123abc" loading={isLoading} />
              ) : (
                <button
                  type="submit"
                  className={`w-full ${buttonClass} xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 2xl:max-w-2xl`}
                >
                  Am I Qualified?
                </button>
              )}
            </form>
          </motion.div>
        )}
      </>
    </div>
  );
};

export default Booking;
