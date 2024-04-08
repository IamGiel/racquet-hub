import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { InputSelection } from "../Form/InputSelection";
import { sportCategoryFilters, sportTypeFilters } from "../Configs/Options";
import { ListBoxOptions } from "../Form/ListBoxOptions";
import { DatePicker } from "../Form/DatePicker";
import { GenPurposePopover } from "../Popovers/GenPurposePopover";
import moment from "moment";
import styles from './ProposeComponent.dialog.module.css';

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
    setEventDate(moment(dateSelected[0]).format('dddd, MMM D YYYY'))
  }

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
                className="w-full h-[550px] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                style={{ overflowY: "scroll" }}
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
                  <form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <div className="input-for-sportType">
                      <ListBoxOptions
                        label="Select a Sport"
                        selections={sportTypeFilters}
                      />
                    </div>
                    <div className="input-for-sportType">
                      <ListBoxOptions
                        label="Select a Category"
                        selections={sportCategoryFilters}
                      />
                    </div>
                    <div className="input-for-sportType flex gap-[12px]">
                      <GenPurposePopover
                        openPopover={showDatePickerFunc}
                        key={"datePicker"}
                        popoverBtnLabel={`Select a date`}
                      >
                        {<DatePicker onSelectDate={handleSelectedDate}/>}
                      </GenPurposePopover>
                      <div className={styles.eventDate + " date-selectedLabel"}>{eventDate}</div>
                    </div>
                  </form>
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
                    type="button"
                    className={styles.submitBtn + " subitBtn"}
                    onClick={(event) => {
                      handleSubmitProposal(event);
                    }}
                  >
                    Submit
                  </button>
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
