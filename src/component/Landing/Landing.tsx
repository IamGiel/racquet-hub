import { Fragment, useEffect, useState } from "react";
// import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import styles from "./Landing.module.css";
import Avatar from "boring-avatars";
import { getAllProposals } from "../../apis/fetch";
import ProposalListv2 from "./ProposalListv2";
import { IconTennisMatch } from "../../assets/svgs/🦆 icon _tennis match_";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store";
import { ICredentials, logout } from "../../reducers/userAuthSlice";
import { dialogService } from "../Services/dialog-service";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { useNavigate } from "react-router-dom";
import {
  authenticateAndGetUserProfile,
} from "../../actions/userProfileActions";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
// const navigation = [
// { name: "Dashboard", href: "#", current: true },
// { name: "Doubles", href: "#", current: false },
// { name: "Singles", href: "#", current: false },
// { name: "Random", href: "#", current: false },
// ];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
  { name: "Sign in", href: "#" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function Landing() {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [proposalList, setProposalList] = useState([]);
  const [credentials, setCredentials] = useState<any>(null);

  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  const userAuth = useSelector((state:any) => state?.userAuth);

  const appName = "Racquet Hub";


  const fetchData = async () => {
    try {
      await getAllProposals()
        .then((response) => response.json())
        .then((result) => {
          // console.log(result);
          // console.log(typeof result);
          setProposalList(result);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      // Handle errors, e.g., log the error or show a user-friendly message
      console.error("Error fetching proposals:", error);
    }
  };

  const callToAuth = (actionToCall: any) => {
    console.log("action to call ", actionToCall);
    if (actionToCall === "logout") {
      dispatch(logout()); // Dispatch the logout action
    }
    if (actionToCall === "login") {
      dialogService.openDialog(Login);
      // dispatch(login()); // Dispatch the login action
    }
  };

  useEffect(() => {
    // fetchData();
    // if(!userAuth.isAuthenticated){
    //   dispatch(logout())
    // }
  }, []);

  return (
    <>
      {/* <pre>test</pre> */}
      <div className="min-h-full">
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* <h1 className="main-page-title text-3xl font-bold leadi g-tight tracking-tight text-gray-900" style={{display:'flex'}}>
                Proposals
              </h1> */}
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              {/* Your content */}
              <span>proposals </span>

              {proposalList && proposalList.length > 0 && (
                // <ProposalList proposals={proposalList}/>
                <div className="content-container">
                  <ProposalListv2 proposals={proposalList} />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Landing;
