import { useEffect, useState } from "react";
import Cart from "./Cart";
import Link from "next/link";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [menuIcon, setMenuIcon] = useState(false);
  const [cart, setCart] = useState(false);
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      setJwt(token);
    }
  }, []);

  const openCart = () => {
    setCart(true);
  };

  const closeCart = () => {
    setCart(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setJwt(null);
  };

  return (
    <>
      <nav className="sticky top-0 left-0 z-10 md:px-4 px-0 bg-slate-200">
        {/* Top bar */}
        <div className="w-full flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <button
              className="relative w-8 h-8 md:hidden border-none"
              onClick={() => {
                setOpenMenu(!openMenu);
                setMenuIcon(!menuIcon);
              }}
            >
              {menuIcon ? (
                <img src="/images/svgs/close.svg" alt="Menu" />
              ) : (
                <img src="/images/svgs/menu.svg" alt="Menu" />
              )}
            </button>

            <button>
              {/* <img src="" alt="" /> */}
              <Link href="/">LOGO</Link>
            </button>
          </div>

          {/* Search bar */}
          {/* <div className="relative flex items-center flex-row-reverse bg-pink-400 rounded-full px-2 pr-0 py-0 md:w-80">
            <input
              type="search"
              className="px-3 py-1 border placeholder:text-gray-400 max-w-sm w-full outline-none rounded-r-full"
              placeholder="Search articles..."
            />
            <button className="relative w-6 h-6 mr-1">
              <img
                src="/images/svgs/search.svg"
                alt="Search articles"
                className="invert"
              />
            </button>
          </div> */}

          {/* Menu (desktop) */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-8">
              <li className="list-none">
                <Link
                  href="/"
                  className=" hover:text-pink-400 transition flex items-center gap-2"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </span>
                  <span>Home</span>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  href="#"
                  className=" hover:text-pink-400 transition flex items-center gap-2"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                      />
                    </svg>
                  </span>
                  <span>Orders</span>
                </Link>
              </li>
              <li className="list-none">
                <button
                  onClick={openCart}
                  className=" hover:text-pink-400 transition flex items-center gap-2"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </span>
                  <span>Cart</span>
                  <span className="bg-pink-400 text-white text-sm rounded-full p-2 py-0">
                    2
                  </span>
                </button>
              </li>
              <li className="list-none">
                {jwt === null ? (
                  <Link
                    href="/auth/login"
                    className=" hover:text-pink-400 transition flex items-center gap-2"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </span>
                    <span>Login</span>
                  </Link>
                ) : (
                  <button
                    className="flex items-center gap-2 hover:text-pink-400 transition"
                    onClick={handleLogout}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                        />
                      </svg>
                    </span>
                    <span>Logout</span>
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          className={`absolute bg-white top-[64px] left-0 p-4 border max-w-xs w-full md:hidden shadow-md rounded-md transition-all ${
            openMenu
              ? "pointer-events-auto visible scale-1"
              : "pointer-events-none invisible scale-0"
          }`}
        >
          <ul className="flex flex-col gap-4">
            <li
              className="list-none"
              onClick={() => {
                setOpenMenu(false);
                setMenuIcon(false);
              }}
            >
              <Link
                href="/"
                className=" hover:text-pink-400 transition flex items-center gap-2"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </span>
                <span>Home</span>
              </Link>
            </li>
            <li
              className="list-none"
              onClick={() => {
                setOpenMenu(false);
                setMenuIcon(false);
              }}
            >
              <Link
                href="/orders"
                className=" hover:text-pink-400 transition flex items-center gap-2"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                    />
                  </svg>
                </span>
                <span>Orders</span>
              </Link>
            </li>
            <li
              className="list-none"
              onClick={() => {
                setOpenMenu(false);
                setMenuIcon(false);
              }}
            >
              <button
                onClick={openCart}
                className=" hover:text-pink-400 transition flex items-center gap-2"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </span>
                <span>Cart</span>
                <span className="bg-pink-400 text-white text-sm rounded-full p-2 py-0">
                  2
                </span>
              </button>
            </li>
            <li
              className="list-none"
              onClick={() => {
                setOpenMenu(false);
                setMenuIcon(false);
              }}
            >
              {jwt === null ? (
                <Link
                  href="/auth/login"
                  className=" hover:text-pink-400 transition flex items-center gap-2"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </span>
                  <span>Login</span>
                </Link>
              ) : (
                <button
                  className="flex items-center gap-2 hover:text-pink-400 transition"
                  onClick={handleLogout}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                  </span>
                  <span>Logout</span>
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <Cart open={cart} handleClose={closeCart} />
    </>
  );
};

export default Navbar;
