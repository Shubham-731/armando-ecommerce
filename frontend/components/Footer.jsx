import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  return (
    <div className="w-full py-4 bg-gray-500">
      <p className="text-white text-center">
        Copyright &#169;{" "}
        <a href="/" className="transition hover:text-pink-400">
          www.example.com
        </a>{" "}
        - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
