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
    <div className="p-10 m-4 bg-white dark:bg-gray-800 rounded hover:dark:shadow-slate-400 w-96 transition-all ease-in-out duration-300  hover:shadow">
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
        <h2 className="text-xl font-semibold mt-2 text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </Link>
    </div>
  );
};

export default FormCard;
