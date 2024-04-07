import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useState } from "react";

interface IGenPurposePopover {
  popoverBtnLabel: string;
  openPopover: any;
  children: any;
}

export const GenPurposePopover = ({ popoverBtnLabel, openPopover, children }: IGenPurposePopover) => {
  return (
    <Popover>
      <Popover.Button className="popoverBtn inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span>{popoverBtnLabel}</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 flex w-[350px] -translate-x-1/2 pb-[45px]">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            {children}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
