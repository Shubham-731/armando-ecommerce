import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// import "react-toastify/dist/ReactToastify.css";
import toastOptions from "../../utility/toastOptions";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  const callbackUrl = router.query.callbackurl;

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    onSubmit: (values) => {
      loginUser(values);
    },
  });

  const loginUser = async (values) => {
    try {
      const serverUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_HOST}/api/auth/local`;

      const { data } = await axios.post(serverUrl, values, {
        headers: {
          "content-type": "application/json",
        },
      });

      if (data) {
        toast.success("Successfully logged in!", toastOptions);
        localStorage.setItem("jwt", data.jwt);

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

  return (
    <section className="w-full h-screen space-y-4 flex items-center justify-center flex-col">
      <h2 className="text-3xl font-semibold mb-4">Login</h2>

      <div className="shadow-lg space-y-3 w-full max-w-sm px-4 rounded-md py-2 border border-slate-100">
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="flex items-center flex-col gap-3 mb-3">
            <input
              type="text"
              placeholder="Enter email"
              name="identifier"
              id="identifier"
              value={formik.values.identifier}
              onChange={formik.handleChange}
              className="px-3 py-2 border rounded placeholder:text-gray-400 max-w-sm w-full outline-pink-300"
            />
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="px-3 py-2 border rounded placeholder:text-gray-400 max-w-sm w-full outline-pink-300"
            />
          </div>

          <button
            className="w-full max-w-sm bg-pink-400 p-2 rounded cursor-pointer active:bg-pink-500 text-white font-semibold"
            type="submit"
          >
            Login
          </button>
        </form>

        <div className="text-right text-sm flex items-center justify-between w-full">
          <Link href="/auth/signup" className="text-blue-400">
            Don't have an account ?
          </Link>

          <Link href="#" className="text-blue-400">
            Forgot Password ?
          </Link>
        </div>
      </div>
    </section>
  );
};

Login.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

export default Login;
