import React, { Fragment, useState } from 'react'
import styles from './Header.module.css'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '../../store/'
import { useNavigate } from 'react-router'
import Avatar from 'boring-avatars'
import { Login } from '../Login/Login'
import { dialogService } from '../Services/dialog-service'
import { logout } from '../../reducers/userAuthSlice'
import { IconTennisMatch } from '../../../src/assets/svgs/🦆 icon _tennis match_'
import { Register } from '../Login/Register'

export const Header = () => {
  const [activeLink, setActiveLink] = useState("Dashboard");

  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  const isAuthenticated = useAppSelector(
    (state) => state.userAuth.isAuthenticated
  );
  
  const callToAuth = (actionToCall:any) => {
    console.log('action to call ', actionToCall)
    if(actionToCall === 'logout'){
      localStorage.removeItem('authToken')
      dispatch(logout())
    }
    if(actionToCall === 'login'){
      dialogService.openDialog(Login)
      // dispatch(login()); // Dispatch the login action
    }
  }
  const appName = "Racquet Hub";
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
            <div className="flex gap-[12px] cursor-pointer" onClick={()=>navigateTo("/")} style={{opacity:isAuthenticated ? '1' : '0.7'}}>
              <div className="flex flex-shrink-0 items-center">
                <IconTennisMatch height={`64px`} width={`64px`} />
              </div>
              <div className={styles.playPal + " playPal appName"} >
                {appName}
              </div>

              {/* <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setActiveLink(item.name)}
                    className={classNames(
                      item.name === activeLink
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                    )}
                    aria-current={
                      item.name === activeLink ? "page" : undefined
                    }
                  >
                    {item.name}
                  </a>
                ))}
              </div> */}
            </div>
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
                  <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
                    {isAuthenticated && <Menu.Item>
                      {({ active }) => (
                        <a
                          
                          onClick={(event) => {
                            event.preventDefault()
                            console.log('open it here')
                            setActiveLink("profile")
                            navigateTo('/profile')
                          }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Profile
                        </a>
                      )}
                    </Menu.Item>}
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href={`#`}
                          onClick={() => {
                            setActiveLink(`${isAuthenticated === true ? 'logout' : 'login'}` )
                            callToAuth(`${isAuthenticated === true ? 'logout' : 'login'}` )
                          }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          {`${isAuthenticated === true ? 'logout' : 'Your Logged out - login'}`}
                        </a>
                        
                      )}
                    </Menu.Item>
                    {!isAuthenticated && <Menu.Item>
                      {({ active }) => (
                        <a
                          
                          onClick={(event) => {
                            event.preventDefault()
                            console.log('open it here')
                            // setActiveLink("profile")
                            dialogService.openDialog(Register)
                          }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                          style={{cursor:'pointer'}}
                        >
                          Register
                        </a>
                      )}
                    </Menu.Item>}
                  
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
                  <XMarkIcon
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                ) : (
                  <Bars3Icon
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                )}
              </Disclosure.Button>
            </div>
          </div>
        </div>
      </>
    )}
  </Disclosure>
  )
}
