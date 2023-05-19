//Data of each Form card component

"use client";

import { useRouter } from "next/router";
import FormCard from "../components/FormCard";
import { backButton } from "@/utils/formstyles";
import { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";

const forms = [
  {
    id: 1,
    title: "Visit Visa",
    description: "Apply for a Visit Visa.",
    imagePath: "/images/Visit Visa.png",
  },
  {
    id: 2,
    title: "Fiance Visa",
    description: "Apply for a Fiance Visa.",
    imagePath: "/images/Fiance Visa.png",
  },
  {
    id: 3,
    title: "Spousal Visa",
    description: "Apply for a Spousal Visa.",
    imagePath: "/images/Spousal Visa.jpeg",
  },
  {
    id: 4,
    title: "Marriage Visa",
    description: "Apply for a Marriage Visa.",
    imagePath: "/images/Marriage Visa.png",
  },
  {
    id: 5,
    title: "Unmarried Visit Visa",
    description: "Apply for an Unmarried Visit Visa.",
    imagePath: "/images/Unmarried Visit Visa.png",
  },
  {
    id: 6,
    title: "Same-sex Partner Visa",
    description: "Apply for a Same-sex Partner Visa.",
    imagePath: "/images/Same Sex.png",
  },
];

const FormsPage = () => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const backtomain = () => {
    router.push("https://mgiukgroup.com");
  };

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000); // 1000ms or 1 second, adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen text-center flex dark:bg-gray-900 items-center justify-center">
      {initialLoading ? (
        <BarLoader color="#36d7b7" height={10} width={200} className="my-10" />
      ) : (
        <div className="mx-auto">
          <div className="mx-auto py-5 pl-5 flex justify-start">
            <button
              name="backButton"
              aria-label="backButton"
              id="backButton"
              type="button"
              onClick={backtomain}
              className={backButton}
            >
              Back to mgiukgroup.com
            </button>
          </div>
          <h1 className="text-3xl font-bold mb-6 dark:text-blue-300 text-blue-500 text">
            Eligibility Assessment Forms
          </h1>

          <div className="mb-3 border-l-4 border-yellow-400 bg-white dark:bg-white mx-auto rounded p-4 text-left xs:px-3 xs:py-1 xs:text-xs xs:max-w-xs sm:px-4 sm:py-2 sm:text-sm sm:max-w-sm md:px-5 md:py-3 md:text-base md:max-w-md lg:px-5 lg:py-3 lg:text-lg lg:max-w-lg 2xl:px-6 2xl:py-4 2xl:text-xl 2xl:max-w-2xl ">
            <p className="font-bold">Important Notice:</p>
            <p>
              <br />
              Please note that we will be collecting information from you to
              assess your eligibility for our services. It is important that you
              provide accurate and up-to-date information to ensure that we can
              make an informed decision.
            </p>
            <p>
              <br />
              Please be aware that we are not responsible for any inaccuracies
              or errors in the data provided by you, and this may affect your
              eligibility for our services.
            </p>
          </div>

          <div className="flex flex-wrap justify-center">
            {forms.map((form, index) => (
              <FormCard
                key={index}
                formId={form.id}
                title={form.title}
                description={form.description}
                imagePath={form.imagePath}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormsPage;
