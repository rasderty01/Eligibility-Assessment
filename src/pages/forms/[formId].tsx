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
import { motion } from "framer-motion";
import Countdown from "@/components/ui/redirect";
import { useCountdown } from "@/components/ui/CountdownContext";

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
    title: "Marriage Visa",
    component: MarriageVisa,
  },
  "5": {
    title: "Unmarried Visit Visa",
    component: UnmarriedVistVisa,
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
              className="bg-white dark:bg-gray-700 p-8 transition-all ease-in-out duration-500 rounded-lg shadow-md w-full xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 2xl:max-w-2xl mx-auto "
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
