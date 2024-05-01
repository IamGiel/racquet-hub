import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react'

export const ProfileSummaryDialog = ({ close, data = {} }: any)=> {
  return (
    <Dialog
    as="div"
    className={"help-modal-resizable"}
    onClose={() => {
      close();
    }}
  >
    {" "}
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black/25" />
    </Transition.Child>
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel
            className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            style={{ overflowY: "scroll", minHeight: "800px" }}
          >
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Profile Changes
            </Dialog.Title>
            

        
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
  )
}
