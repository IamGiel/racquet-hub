import React, { Fragment, useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../store/";
import { useNavigate } from "react-router";
import Avatar from "boring-avatars";
import { Login } from "../Login/Login";
import { dialogService } from "../Services/dialog-service";
import { login, logout } from "../../reducers/userAuthSlice";
import { IconTennisMatch } from "../../../src/assets/svgs/🦆 icon _tennis match_";
import { Register } from "../Login/Register";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  clearUser,
  selectIsAuthenticated,
  selectUser,
} from "../../reducers/authReducer";
import { IUserDetails } from "../Profile/Profile";

export const Header = ({ loginStatus, onSuccessAuth }: any) => {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [openToolTip, setOpenToolTip] = useState(false);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null); // Initialize userDetails state

  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  // const userAuth = useSelector((state:any) => state);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const handleLoginDialogClose = (data: any) => {
    // Handle the received data here

    onSuccessAuth(data);
  };

  const callToAuth = (actionToCall: any) => {
    if (actionToCall === "logout") {
      localStorage.removeItem("authToken");
      dispatch(logout());
    }
    if (actionToCall === "login") {
      dispatch(login());
      dialogService.openDialog(Login, null, handleLoginDialogClose);
      // dispatch(login()); // Dispatch the login action
    }
  };
  const appName = "Racquet Hub";
  const location = useLocation();

  useEffect(() => {
    if (user && user.data) {
      setUserDetails(user.data);
    } else {
      // localStorage.clear();
      dispatch(clearUser());
      navigateTo("/");
    }
  }, [user, userDetails]);

  return (
    <Disclosure
      as="nav"
      className="border-b border-gray-200 bg-white"
      style={{ padding: "12px 0px" }}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              {/* <pre>isAuthenticated {String(isAuthenticated)}</pre> */}
              <div
                className="flex gap-[12px] cursor-pointer"
                onClick={() => {
                  if (!userDetails) {
                    dispatch(logout());
                  }
                  navigateTo("/");
                }}
              >
                <div className="flex flex-shrink-0 items-center">
                  <IconTennisMatch height={`64px`} width={`64px`} />
                </div>
                <div className={styles.playPal + " playPal appName"}>
                  {appName}
                  <span
                    className={
                      styles.badgeStyle +
                      " badgeStyle inline-flex items-center gap-x-1.5 rounded-full px-1 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200"
                    }
                    onMouseEnter={() => setOpenToolTip(true)}
                    onMouseLeave={() => setOpenToolTip(false)}
                  >
                    <svg
                      className={`h-1.5 w-1.5 ${
                        userDetails ? "fill-green-500" : "fill-red-500"
                      }`}
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx={3} cy={3} r={3} />
                    </svg>

                    {openToolTip && (
                      <p className="absolute w-48 px-5 py-3 text-center text-gray-600 truncate -translate-x-1/2 bg-white rounded-lg shadow-lg -bottom-12 left-1/2 dark:shadow-none shadow-gray-200 dark:bg-gray-800 dark:text-white">
                        {userDetails ? "Your logged in" : "Please login"}
                      </p>
                    )}
                  </span>
                </div>
              </div>
              {/* {userDetails?.email === "allqa@aricent.com" && (
                <button
                  type="button"
                  className={styles.adminsSandbox + " adminsSandbox "} 
                  onClick={(e)=>{
                    e?.preventDefault()
                    navigateTo('/sandbox')
                  }}
                >
                  <span className="admins-sandbox">admin's sandbox</span>
                </button>
              )} */}
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex gap-[12px] max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {/* <img
                      className="h-8 w-8 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    /> */}
                      <Avatar
                        size={40}
                        name="Maria Mitchell"
                        variant="ring"
                        square={false}
                        colors={[
                          "#95aa61",
                          "#121310",
                          "#F6F8FE",
                          "#D6E68A",
                          "#899752",
                        ]}
                      />
                      {userDetails && userDetails && (
                        <span>Welcome, {userDetails.name}</span>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userDetails && (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={(event) => {
                                event.preventDefault();

                                setActiveLink("profile");
                                navigateTo("/profile");
                              }}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Profile
                            </a>
                          )}
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href={`#`}
                            onClick={() => {
                              setActiveLink(
                                `${
                                  isAuthenticated === true ? "logout" : "login"
                                }`
                              );
                              callToAuth(
                                `${
                                  isAuthenticated === true ? "logout" : "login"
                                }`
                              );
                            }}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {`${
                              isAuthenticated === true
                                ? "logout"
                                : "Your Logged out - login"
                            }`}
                          </a>
                        )}
                      </Menu.Item>
                      {!userDetails && (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={(event) => {
                                event.preventDefault();

                                // setActiveLink("profile")
                                dialogService.openDialog(Register);
                              }}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              style={{ cursor: "pointer" }}
                            >
                              Register
                            </a>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};
