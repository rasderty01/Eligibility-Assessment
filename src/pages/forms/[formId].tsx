import { useRouter } from "next/router";
import VisitVisaForm from "../../components/VisitVisaForm";
import { useEffect, useState } from "react";
import FianceVisa from "@/components/FianceVisa";
import SpousalVisa from "@/components/SpousalVisa";
import MarriageVisa from "@/components/MarriageVisa";
import UnmarriedVistVisa from "@/components/UnmarriedVisitVisa";

const formMapping = {
  "1": {
    title: "Visit Visa",
    component: VisitVisaForm,
  },
  "2": {
    title: "Fiañce Visa",
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

  // Add other forms here
};

const FormPage = () => {
  const router = useRouter();
  const { formId } = router.query;

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

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {formDetails?.title} Form
        </h1>
        {renderForm()}
      </div>
    </div>
  );
};

export default FormPage;
