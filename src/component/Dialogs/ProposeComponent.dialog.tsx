import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
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
      commodityName: "", // Empty string as initial value
      modeOfTransport: "", // Empty string
      origin: "", // Empty string
      destination: "", // Empty string
      childForm: "",
      isChildFormValid: false,
      isTHCOriginIncluded: false,
      isTHCDestinationIncluded: false,
    },
    validationSchema: Yup.object({
      modeOfTransport: Yup.string()
        .typeError("Please select a mode of transport")
        .required("Mode of transport is required"),
      origin: Yup.object()
        .shape({
          name: Yup.string().required("Please select from options"),
          type: Yup.string(),
          longitude: Yup.string(),
          latitude: Yup.string(),
          "country-name": Yup.string(),
          "country-code": Yup.string(),
          code: Yup.string(),
        })
        .required("Please select from the list"),
      destination: Yup.object()
        .shape({
          name: Yup.string().required("Please select from options"),
          type: Yup.string(),
          longitude: Yup.string(),
          latitude: Yup.string(),
          "country-name": Yup.string(),
          "country-code": Yup.string(),
          code: Yup.string(),
        })
        .required("Please select from the list"),
      isChildFormValid: Yup.boolean()
        .default(true)
        .typeError(
          "The selected mode of transport has provided new questions - please provide missing information"
        )
        .required(
          "Please complete the form associated with the mode of trasnport you selected"
        ),
    }),
    onSubmit(values, { resetForm }) {
      console.log("ONSUBMIT FORM Form values:", values);

      // Revalidate the form if it's dirty
      if (formik.dirty) {
        formik.validateForm();
      }
    },
  });

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
                      />
                    </div>
                    <div className="input-for-sportType">
                      <InputText
                        id="location"
                        type="text"
                        label="Provide a location"
                      />
                    </div>
                    <div className="input-for-sportType">
                      <ListBoxOptions
                        id="categoryType"
                        label="Select a Category"
                        selections={sportCategoryFilters}
                      />
                    </div>
                    <div className="input-for-sportType flex gap-[12px]" style={{display:'flex', flexDirection:'column'}}>
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
                        {/* {eventDate} */}
                        <input
                              type="text"
                              className={styles.proposalDateInput + ' proposalDateInput'}
                              placeholder={eventDate??'Select a date'}
                            />
                      </div>
                    </div>
                    <div className="mt-4 flex flex-row gap-[12px] justify-center absolute bottom-[12px]">
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
