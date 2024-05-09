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
import EmptyList from "./EmptyList";
import { ProposalListv3 } from "./ProposalListV3";

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

function Landing({authStatus}:any) {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [proposalList, setProposalList] = useState<any>({});
  const [credentials, setCredentials] = useState<any>(null);

  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  const userAuth = useSelector((state: any) => state?.userAuth);
  // const proposals = useSelector((state:any) => state?.proposalList);

  const appName = "Racquet Hub";

  const fetchData = async () => {
    console.log("fetchdta");

    await getAllProposals()
      .then((response) => {
        console.log("response get all proposals", response);
        setProposalList(response);
      })

      .catch((error) => {
        console.error("some error on get all proposals ", error);
        setProposalList(null);
        navigateTo("/");
      });
  };
  const [refetchProposals, setRefetchProposals] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("token in landing ", token);
    fetchData();
  }, [authStatus, refetchProposals]);




  const handleRefetch = (refetchVal:boolean) => {
    console.log('refetchVal ', String(refetchVal))
    if(refetchVal){

      setRefetchProposals(!refetchProposals)
    }
  }

  return (
    <>
      {/* <pre>test</pre> */}
     
      <div className="min-h-full">
        <div className="py-10">
         
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 min-h-[800px]">
              {/* Your content */}
              {proposalList &&
                proposalList?.proposals &&
                proposalList?.proposals?.length > 0 && (
                  <div className="content-container">
                    <ProposalListv2 proposals={proposalList.proposals} onRefetch={handleRefetch}/>
                    {/* <ProposalListv3 proposalList={proposalList.proposals}/> */}
                  </div>
                )}

              {!proposalList && <EmptyList />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Landing;
