import React from "react";
import {
  CalendarDaysIcon,
  CreditCardIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { LocationIcon } from "../../assets/svgs/Location";

// import { CalendarDaysIcon, CreditCardIcon, UserCircleIcon } from '@heroicons/react/20/solid'

export const ProposalStatus = ({statusDetails = {}}) => {
  // dummy test
  const playersLists = [
    { id: 1, name: "Alex Curren", usta:'3.5', utr: '5.77' },
    { id: 2, name: "John Doe", usta:'3.5', utr: '5.57' },
  ];
  const statusDetailsLocal = {
    status:'open',
    playersNeeded:3,
    playersList: playersLists,
    playersCommitted:0,
    date:'April 15, 2024',
    time: '5 pm',
    location: 'Pullen Park'

  }

  return (
    <div className="lg:col-start-3 lg:row-end-1">
      <h2 className="sr-only">Summary</h2>
      <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5 pb-[24px]">
        <dl className="flex flex-wrap">
          <div className="flex-auto pl-6 pt-6">
            <dt className="text-sm font-semibold leading-6 text-gray-900">
              Proposal Status
            </dt>
            {statusDetailsLocal.playersNeeded === 0 && statusDetailsLocal.status==='closed' && <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
              {statusDetailsLocal.playersNeeded === 0 ? `Ready for match` : ''}
            </dd>}
            {statusDetailsLocal.playersNeeded > 0 && <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
             {statusDetailsLocal.playersNeeded > 1 ? `${statusDetailsLocal.playersNeeded} players needed` : '1 player needed'}
            </dd>}
          </div>
          <div className="flex-none self-end px-6 pt-4">
            <dt className="sr-only">{statusDetailsLocal.status}</dt>
            <dd className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset ${statusDetailsLocal.status === 'open' ? " bg-green-50 text-green-700 ring-green-600/20 " : " bg-red-50 text-red-700 ring-red-600/20 " }`}>
              {statusDetailsLocal.status}
            </dd>
          </div>
          <div className="players-list border-t border-b border-gray-900/5 mt-4 mb-4 pt-4 pb-4">
            {statusDetailsLocal.playersList.map((player) => (
              <div
                key={player.id} // Ensure each item has a unique key
                className="flex w-full flex-none px-6 gap-[12px]"
              >
                <dt className="flex-none">
                  <span className="sr-only">Client</span>
                  <UserCircleIcon
                    className="h-6 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd className="text-sm font-medium leading-6 text-gray-900">
                  {player.name}
                </dd>
              </div>
            ))}
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Date</span>
              <CalendarDaysIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              <time dateTime="2023-01-31">January 31, 2023</time>
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Status</span>
              <LocationIcon height="24px" width="24px" fill="grey"/>
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              Pullen Park
            </dd>
          </div>
        </dl>
       
      </div>
    </div>
  );
};
