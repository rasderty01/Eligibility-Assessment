import { useRouter } from "next/router";
import VisitVisaForm from "../../components/VisitVisaForm";

const FormPage = () => {
  const router = useRouter();
  const { formId } = router.query;

  const renderForm = () => {
    switch (formId) {
      case "1":
        return <VisitVisaForm />;
      // case 'fiance-visa':
      //   return <FianceVisaForm />;
      // Add other form components here
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">Form {formId}</h1>
        {renderForm()}
      </div>
    </div>
  );
};

export default FormPage;
