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
    <div className="p-4 m-4 bg-white rounded shadow-sm shadow-slate-300  font-mono w-96 transition-all ease-in-out duration-500">
      <Link className="flex flex-col" href={`/forms/${formId}`} passHref>
        {imagePath && (
          <Image
            src={imagePath}
            alt={title}
            width={500}
            height={500}
            className="rounded-md relative w-auto h-auto mb-4 overflow-hidden hover:shadow-lg"
          />
        )}
        <h2 className="text-xl font-semibold mt-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </Link>
    </div>
  );
};

export default FormCard;
