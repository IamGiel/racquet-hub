import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { Fragment, ReactElement, useState } from "react";
import styles from "./Popover.module.css";

interface IGenPurposePopover {
  popoverBtnLabel: string;
  openPopover: (someAction:any) => void; 
  children: React.ReactElement; 
  icon: React.ReactElement;
  topPosition:string;
}

export const GenPurposePopover = ({
  popoverBtnLabel,
  openPopover,
  children,
  icon,
  topPosition
}: IGenPurposePopover) => {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Popover className={styles.genPopover + ` genPopover`}>
      <Popover.Button
        className={
          styles.selectDate +
          " selectDate popoverBtn block text-sm font-medium leading-6 text-gray-900"
        }
      >
        {popoverBtnLabel}{" "}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
            fill="#444752"
          />
        </svg>{" "} */}
        {React.cloneElement(icon, {
          // Apply inline styles to change icon fill color on hover
          style: { stroke: isHovered ? 'black' : 'lightgrey' },
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
        })}      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className={"gen-pop-children-popover-panel absolute z-10 flex w-[350px] -translate-x-[400px] -translate-y-[50px]"}>
          <div className={"children-container w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5"}>
            {children}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
