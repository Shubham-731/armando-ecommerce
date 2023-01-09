import { useFormik } from "formik";
import axios from "axios";
// import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import "react-toastify/dist/ReactToastify.css";
import toastOptions from "../../utility/toastOptions";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const callbackUrl = router.query.callbackurl;

  const signUp = async (values) => {
    try {
      const serverUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_HOST}/api/auth/local/register`;

      const res = await axios.post(serverUrl, values, {
        headers: {
          "content-type": "application/json",
        },
      });

      if (res.status === 400) {
        toast.error(res.data.error.message, toastOptions);
      } else {
        toast.success("Successfully registered!", toastOptions);
        localStorage.setItem("jwt", res.data.jwt);

        if (callbackUrl) {
          router.replace(callbackUrl);
        } else {
          router.replace("/");
        }
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data.error.message, toastOptions);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      username: "",
      password: "",
    },
    /* validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .min(3, "Too Short!")
        .max(20, "Too Long!")
        .required("Required"),
      lastName: Yup.string()
        .min(3, "Too Short!")
        .max(20, "Too Long!")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(3, "Too Short!").required("Required"),
    }), */
    onSubmit: (values) => {
      signUp(values);
    },
  });

  return (
    <section className="w-full h-screen space-y-4 flex items-center justify-center flex-col">
      <h2 className="text-3xl font-semibold mb-4">Create New Account</h2>

      <div className="border border-slate-100 shadow-lg w-full max-w-sm px-4 rounded-md py-2">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center flex-col gap-3 mb-3">
            <div className="w-full">
              <input
                type="text"
                className="px-3 py-2 border rounded placeholder:text-gray-400 max-w-sm w-full outline-pink-300"
                placeholder="First name"
                name="firstName"
                id="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />

              {/* {formik.errors.firstName && formik.touched.firstName ? (
                <p className="text-sm text-red-600">
                  {formik.errors.firstName}
                </p>
              ) : null} */}
            </div>
            <div className="w-full">
              <input
                type="text"
                className="px-3 py-2 border rounded placeholder:text-gray-400 max-w-sm w-full outline-pink-300"
                placeholder="Last name"
                name="lastName"
                id="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              {/* {formik.errors.firstName && formik.touched.firstName ? (
                <p className="text-sm text-red-600">
                  {formik.errors.firstName}
                </p>
              ) : null} */}
            </div>
            <div className="w-full">
              <input
                type="text"
                className="px-3 py-2 border rounded placeholder:text-gray-400 max-w-sm w-full outline-pink-300"
                placeholder="Email Address"
                name="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {/* {formik.errors.firstName && formik.touched.firstName ? (
                <p className="text-sm text-red-600">
                  {formik.errors.firstName}
                </p>
              ) : null} */}
            </div>
            <div className="w-full">
              <input
                type="text"
                className="px-3 py-2 border rounded placeholder:text-gray-400 max-w-sm w-full outline-pink-300"
                placeholder="Phone number"
                name="phone"
                id="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              {/* {formik.errors.firstName && formik.touched.firstName ? (
                <p className="text-sm text-red-600">
                  {formik.errors.firstName}
                </p>
              ) : null} */}
            </div>
            <div className="w-full">
              <input
                type="text"
                className="px-3 py-2 border rounded placeholder:text-gray-400 max-w-sm w-full outline-pink-300"
                placeholder="Username"
                name="username"
                id="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
            </div>
            <div className="w-full">
              <input
                type="password"
                className="px-3 py-2 border rounded placeholder:text-gray-400 max-w-sm w-full outline-pink-300"
                placeholder="Create password"
                name="password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {/* {formik.errors.firstName && formik.touched.firstName ? (
                <p className="text-sm text-red-600">
                  {formik.errors.firstName}
                </p>
              ) : null} */}
            </div>
          </div>

          <button
            className={`w-full max-w-sm bg-pink-400 p-2 rounded cursor-pointer active:bg-pink-500 text-white font-semibold`}
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <div className="text-right text-sm flex items-center justify-between w-full">
          <Link href="/auth/login" className="text-blue-400">
            Already have an account ?
          </Link>
        </div>
      </div>
    </section>
  );
};

Signup.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

export default Signup;
