//

import { useRouter } from "next/router";
import VisitVisaForm from "../../components/VisitVisaForm";
import { useEffect, useState } from "react";
import FianceVisa from "@/components/FianceVisa";
import SpousalVisa from "@/components/SpousalVisa";
import MarriageVisa from "@/components/MarriageVisa";
import UnmarriedVistVisa from "@/components/UnmarriedVisitVisa";
import { backButton, h1element } from "@/utils/formstyles";
import { BarLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import Countdown from "@/components/ui/redirect";
import { useCountdown } from "@/components/ui/CountdownContext";
import SameSex from "@/components/SameSex";

const formMapping = {
  "1": {
    title: "Visit Visa",
    component: VisitVisaForm,
  },
  "2": {
    title: "Fiancé Visa",
    component: FianceVisa,
  },
  "3": {
    title: "Spousal Visa",
    component: SpousalVisa,
  },
  "4": {
    title: "Marriage Visit Visa",
    component: MarriageVisa,
  },
  "5": {
    title: "Unmarried Partner Visa",
    component: UnmarriedVistVisa,
  },
  "6": {
    title: "Same-sex Partner Visa",
    component: SameSex,
  },
};

const FormPage = () => {
  const router = useRouter();
  const { formId } = router.query;
  const { showCountdown } = useCountdown();

  const [formDetails, setFormDetails] = useState<{
    title: string;
    component: React.ComponentType;
  } | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    const hide =
      typeof window !== "undefined" ? document.getElementById("tohide") : null;

    if (hide !== null) {
      if (isOpen === true) {
        hide.classList.add("hidden");
      } else {
        hide.classList.remove("hidden");
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (formId) {
      setFormDetails(formMapping[formId as keyof typeof formMapping] ?? null);
    }
  }, [formId]);

  const renderForm = () => {
    if (!formDetails) return null;
    const FormComponent = formDetails.component;
    return <FormComponent />;
  };

  const BacktoMainPage = () => {
    router.push("/");
  };

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000); // 1000ms or 1 second, adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      {initialLoading ? (
        <BarLoader color="#36d7b7" height={10} width={200} className="my-10" />
      ) : (
        <>
          {showCountdown && <Countdown redirectTo="/booking" />}
          {!showCountdown && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-white dark:bg-gray-700 p-8 transition-all ease-in-out duration-500 rounded-lg shadow-md w-full xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 2xl:max-w-2xl mx-auto my-10"
            >
              <button
                name="backButton"
                aria-label="backButton"
                id="backButton"
                type="button"
                onClick={BacktoMainPage}
                className={backButton}
              >
                Back to Main
              </button>

              <div className="mb-3 border-l-4 border-yellow-400 dark:bg-white mx-auto rounded p-4 text-left text-sm">
                <p className="font-bold">Data Privacy Notice:</p>
                <br />
                <p id="tohide">
                  {
                    'MGIUKGLOBAL ("we" or "us" or "our") respects the privacy of our users... '
                  }
                  <button
                    onClick={toggleOpen}
                    className="underline text-blue-600"
                  >
                    Read More
                  </button>
                </p>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p>
                        {
                          'MGIUKGLOBAL ("we" or "us" or "our") respects the privacy of our users ("user" or "you"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you submit forms on our website. Please read this policy carefully. By submitting a form, you signify your understanding of, and agreement to these terms. If you do not agree with our policies andpractices, do not use our services or submit any personal information.'
                        }
                      </p>
                      <p>
                        <br />
                        We collect personal information that you voluntarily
                        provide to us when you express an interest in obtaining
                        information about us or our products and services, when
                        you participate in activities on our website or
                        otherwise when you contact us. We only ask for personal
                        information when we truly need it to provide a service
                        to you. We collect it by fair and lawful means, with
                        your knowledge and consent.
                      </p>
                      <p>
                        <br />
                        {
                          "We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification."
                        }
                      </p>
                      <p>
                        <br />
                        In accordance with the Data Privacy Act of 2012, we are
                        committed to safeguarding your data. We have implemented
                        physical, technical, and organizational measures
                        designed to protect your information against
                        unauthorized access, theft, and loss. We strictly
                        enforce this policy and continuously update and improve
                        our security measures as new technology becomes
                        available.
                      </p>
                      <br />
                      <button
                        onClick={toggleOpen}
                        className="underline text-blue-600"
                      >
                        Close
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <h1 className={h1element}>{formDetails?.title} Form</h1>
              {renderForm()}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default FormPage;
