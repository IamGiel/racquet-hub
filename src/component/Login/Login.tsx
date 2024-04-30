import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../store";
import { ICredentials, getSession, login } from "../../reducers/userAuthSlice";
import styles from './Login.module.css';
import { dialogService } from "../Services/dialog-service";
import { Register } from "./Register";
import { IconTennisMatch } from "../../assets/svgs/🦆 icon _tennis match_";
import { useFormik } from "formik";
import * as Yup from "yup";
import { error } from "console";

export const Login = () => {
  const [open, setOpen] = useState(true);
  const [failedLogin, setFailedLogin] = useState<any>(null);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.userAuth.isAuthenticated
  );
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('event ', event)
    event.preventDefault(); // Prevent the default form submission behavior
    // dispatch(login()); // Dispatch the login action

    const data:ICredentials = {
      email:formik.values.email,
      password:formik.values.password,
      date:formik.values.date
    }

    console.log('data ', data)
    handleLogin(data)
    setOpen(false)
  };

  const handleLogin = async (data: any) => {
    setOpen(true);
    try {
      const loginResponse = await dispatch(getSession(data));
      console.log('login response typeof', typeof loginResponse.payload);
      // Check if the login was successful before closing the dialog

      const loginResponsePayload = JSON.parse(loginResponse.payload)
      if (loginResponsePayload && loginResponsePayload.token) {
        setOpen(false); // Close the dialog only if login was successful
      } else {
        setOpen(true);
        setFailedLogin(loginResponsePayload)
       
      }
    } catch (error:any) {
      console.log('error on Login ', error);
      setFailedLogin(error)
      setOpen(true); // Keep the dialog open if there's an error during login
    } 
  }
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      date:`${new Date()}`
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .typeError("Please enter your email")
        .required("Email is required"),
      password: Yup.string()
        .typeError("Please enter your password")
        .required("Password required"),
    }),
    onSubmit(values, { resetForm }) {
      console.log("ONSUBMIT FORM Form values:", values);

      // Revalidate the form if it's dirty
      if (formik.dirty) {
        // This line should be changed
        formik.validateForm(); // This line should be changed
      }
    },
  });

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel>
                <div
                  className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
                  style={{ background: "#fff", minWidth:'450px' }}
                >
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <div className="flex flex-shrink-0 items-center justify-center">
                      <IconTennisMatch height={`64px`} width={`64px`} />
                    </div>
                    <h2 className="mt-[12px] text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      Sign in to your account
                    </h2>
                  </div>

                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm text-left font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="off"
                            value={formik.values.email} // Add value attribute
                            onChange={formik.handleChange} // Add onChange handler
                            required
                            className={styles.loginInput + " loginInput block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Password
                          </label>
                          {/* <div className="text-sm">
                            <a
                              href="#"
                              className="font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                              Forgot password?
                            </a>
                          </div> */}
                        </div>
                        <div className="mt-2">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="off"
                            value={formik.values.password} // Add value attribute
                            onChange={formik.handleChange} // Add onChange handler
                            required
                            className={styles.loginInput + " loginInput block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                          />
                        </div>
                      </div>

                      {failedLogin && <div className="mt-2">
                        {failedLogin?.error}
                      </div>}

                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                       >
                          Sign in
                        </button>
                      </div>
                    </form>


                    <p className="mt-10 text-center text-sm text-gray-500">
                      Not a member?{" "}
                      <a
                        href="#"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        onClick={()=>{
                          dialogService.openDialog(Register)
                          setOpen(false)
                        }}
                      >
                        Register here
                      </a>
                    </p>
                  </div>
                  {/* <pre>{JSON.stringify(formik,null,4)}</pre> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
