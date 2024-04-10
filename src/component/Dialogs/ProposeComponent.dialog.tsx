import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { InputSelection } from "../Form/InputSelection";
import { sportCategoryFilters, sportTypeFilters } from "../Configs/Options";
import { ListBoxOptions } from "../Form/ListBoxOptions";
import { DatePicker } from "../Form/DatePicker";
import { GenPurposePopover } from "../Popovers/GenPurposePopover";
import moment from "moment";
import styles from "./ProposeComponent.dialog.module.css";
import StepperComponent from "../Stepper/StepperComponent";
import { InputText } from "../Form/InputText";

import { useFormik } from "formik";
import * as Yup from "yup";
import _ from 'lodash';

import { FlatPickerDate } from "../Form/FlatPicker/FlatPickerDate";
import { getZipcode } from "../../apis/fetch";

interface IValues {
  sportType: string;
  SportCategory: string;
  location: string;
  date: string;
  time: string;
}

export const ProposeComponent = ({ close, data }: any) => {
  let [isOpen, setIsOpen] = useState(true);
  let [showDatePicker, setShowDatePicker] = useState(false);
  let [eventDate, setEventDate] = useState<any>(null);

  function showDatePickerFunc(val: boolean) {
    // e.preventDefault()
    setShowDatePicker(val);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleSubmitProposal(event: any) {
    event.preventDefault();
    console.log("submitting proposal ");
  }
  function handleSelectedDate(dateSelected: any) {
    console.log("dateSelected  ", dateSelected);
    setEventDate(moment(dateSelected[0]).format("dddd, MMM D YYYY"));
  }

  const formik = useFormik({
    initialValues: {
      sportType: "", // Empty string as initial value
      categoryType: "", // Empty string
      location: "", // Empty string
      date: "", // Empty string
    },
    validationSchema: Yup.object({
      sportType: Yup.string()
        .typeError("Please select a sport type")
        .required("Sport type is required"),
      categoryType: Yup.string()
        .typeError("Please select a category type")
        .required("Category type is required"),
      location: Yup.string()
        .typeError("Please select a location type")
        .required("Location type is required"),
      date: Yup.string()
        .typeError("Please select a date")
        .required("Date is required"),
     
    }),
    onSubmit(values, { resetForm }) {
      console.log("ONSUBMIT FORM Form values:", values);

      // Revalidate the form if it's dirty
      if (formik.dirty) {
        formik.validateForm();
      }
    },
  });

  function handleSelectedSportType(selection:any) {
    console.log('sporttype here ', selection)
    formik.setFieldValue('sportType', selection?.name)
  }
  function handleSelectedCategoryType(selection:any) {
    console.log('category here ', selection)
    formik.setFieldValue('categoryType',  selection?.name)
  }
  function handleSelectedDateTime(dateTime:any) {
    console.log('dateTime here ', dateTime)
    formik.setFieldValue('date',  dateTime)
  }

  const debouncedHandleLocationChange = _.debounce((loc: string) => {
    console.log('location here ', loc);
    if(loc.length >= 2) {
      formik.setFieldValue('location', loc);
    }
    
  }, 3000); // Adjust the debounce delay as needed (e.g., 500 milliseconds)
  
  const handleLocationChange = (loc: string) => {
    debouncedHandleLocationChange(loc);
  };

  useEffect(() => {
    getZipcode(formik?.values?.location)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
      console.log('formik ', formik)
  }, [formik?.values?.location]);

  return (
    <>
      {/* <Transition appear show={isOpen} as={Fragment}> */}
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
                  Propose an Event
                </Dialog.Title>
                <div className="mt-2">
                  <p className={styles.proposalIntro + " porposalIntro"}>
                    Select the sport, location, day and time.
                  </p>
                </div>

                <div className="form-container mt-4 flex flex-col gap-[12px] justify-center ">
                  <StepperComponent />
                  <form
                    onSubmit={formik.handleSubmit}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <div className="input-for-sportType">
                      <ListBoxOptions
                        id="sportType"
                        label="Select a Sport"
                        selections={sportTypeFilters}
                        onSelect={handleSelectedSportType}
                      />
                    </div>
                    <div className="input-for-sportType">
                      <ListBoxOptions
                        id="categoryType"
                        label="Select a Category"
                        selections={sportCategoryFilters}
                        onSelect={handleSelectedCategoryType}
                      />
                    </div>
                    <div className="input-for-sportType">
                      <InputText
                        id="location"
                        type="text"
                        label="Provide a location"
                        placeholder="Provide a location"
                        onChange={handleLocationChange}
                      />
                    </div>
                    <div className="input-for-sportType">
                      <FlatPickerDate onDateSelect={handleSelectedDateTime} />
                    </div>

                    <pre>{JSON.stringify(formik,null,4)}</pre>

                    {/* <div
                      className="input-for-sportType flex gap-[12px]"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <GenPurposePopover
                        openPopover={showDatePickerFunc}
                        key={"datePicker"}
                        popoverBtnLabel={`Select a date`}
                      >
                        {
                          <>
                            <DatePicker
                              id={`date`}
                              onSelectDate={handleSelectedDate}
                            />
                          </>
                        }
                      </GenPurposePopover>
                      <div className={styles.eventDate + " date-selectedLabel"}>
                        <input
                          type="text"
                          className={
                            styles.proposalDateInput + " proposalDateInput"
                          }
                          placeholder={eventDate ?? "Select a date"}
                          readOnly
                        />
                      </div>
                    </div> */}

                    <div className="my-8 flex flex-row gap-[12px] justify-center relative bottom-[12px]">
                      <button
                        type="button"
                        className={styles.cancelBtn + ` cancelBtn`}
                        onClick={(event: any) => {
                          event.preventDefault();
                          close();
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={styles.submitBtn + " subitBtn"}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
      {/* </Transition> */}
    </>
  );
};
