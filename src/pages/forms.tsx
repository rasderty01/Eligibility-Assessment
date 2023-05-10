//Data of each Form card component

"use client";

import FormCard from "../components/FormCard";

const forms = [
  {
    id: 1,
    title: "Visit Visa",
    description: "Apply for a visit visa.",
    imagePath: "/images/visit-visa.jpg",
  },
  {
    id: 2,
    title: "Fiance Visa",
    description: "Apply for a fiance visa.",
    imagePath: "/images/fiance-visa.jpg",
  },
  {
    id: 3,
    title: "Spousal Visa",
    description: "Apply for a spousal visa.",
    imagePath: "/images/spousal-visa.jpg",
  },
  {
    id: 4,
    title: "Marriage Visa",
    description: "Apply for a marriage visa.",
    imagePath: "/images/marriage-visa.jpg",
  },
  {
    id: 5,
    title: "Unmarried Visit Visa",
    description: "Apply for an unmarried visit visa.",
    imagePath: "/images/unmarried-visit-visa.jpg",
  },
];

const FormsPage = () => {
  return (
    <div className="min-h-screen text-center items-center dark:bg-gray-900">
      <div className="mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6 dark:text-blue-300 text-blue-950 text">
          Eligibility Assessment Forms
        </h1>
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
    </div>
  );
};

export default FormsPage;
