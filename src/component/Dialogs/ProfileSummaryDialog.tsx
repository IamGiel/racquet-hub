import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react'
import styles from './ProposeComponent.dialog.module.css'

export const ProfileSummaryDialog = ({ close, data = {} }: any)=> {
  return (
    <div className={styles.confirm + " confirm bg-white shadow rounded-lg"}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Confirmation</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>
           You are about to change your profile information.  Please confirm your changes.
          </p>
        </div>

        <div className="mt-5">
          <pre>{JSON.stringify(data,null,4)}</pre>
        </div>


        <div className="mt-5">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Change plan
          </button>
        </div>
      </div>
    </div>
  )
}
