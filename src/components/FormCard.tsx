import React from "react";
import Link from "next/link";
import Image from "next/image";

interface FormCardProps {
  formId: number;
  title: string;
  description: string;
  imagePath: string | undefined;
}

const FormCard: React.FC<FormCardProps> = ({
  formId,
  title,
  description,
  imagePath,
}) => {
  return (
    <div className="p-4 m-4 bg-white rounded shadow-lg w-96 hover:opacity-75 font-mono">
      <Link className="flex flex-col" href={`/forms/${formId}`} passHref>
        {imagePath && (
          <Image
            src={imagePath}
            alt={title}
            width={1920}
            height={1080}
            className="rounded-md relative w-full h-auto mb-4 overflow-hidden hover:shadow-lg"
          />
        )}
        <h2 className="text-xl font-semibold mt-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </Link>
    </div>
  );
};

export default FormCard;
