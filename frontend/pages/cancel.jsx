import { useEffect } from "react";
import toastOptions from "../utility/toastOptions";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Cancel = () => {
  const router = useRouter();

  useEffect(() => {
    toast.error(
      "Some error occured while checkout!\nPlease try again",
      toastOptions
    );
    router.replace("/");
  }, []);

  return;
};
export default Cancel;
