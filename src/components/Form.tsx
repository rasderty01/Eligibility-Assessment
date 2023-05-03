import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  whatsappNumber: Yup.string().required("Required"),
});

const FormComponent = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        whatsappNumber: "",
      }}
      validationSchema={FormSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {() => (
        <Form>
          <div className="flex flex-col items-center mt-5">
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <Field
              id="firstName"
              name="firstName"
              type="text"
              className="px-4 py-2 my-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-96"
            />
            <ErrorMessage
              name="firstName"
              className="text-xs text-red-500"
              component="div"
            />
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <Field
              id="lastName"
              name="lastName"
              type="text"
              className="px-4 py-2 my-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-96"
            />
            <ErrorMessage
              name="lastName"
              className="text-xs text-red-500"
              component="div"
            />
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              className="px-4 py-2 my-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-96"
            />
            <ErrorMessage
              name="email"
              className="text-xs text-red-500"
              component="div"
            />
            <label
              htmlFor="whatsappNumber"
              className="text-sm font-medium text-gray-700"
            >
              WhatsApp Number
            </label>
            <Field
              id="whatsappNumber"
              name="whatsappNumber"
              type="text"
              className="px-4 py-2 my-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-96"
            />
            <ErrorMessage
              name="whatsappNumber"
              className="text-xs text-red-500"
              component="div"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
