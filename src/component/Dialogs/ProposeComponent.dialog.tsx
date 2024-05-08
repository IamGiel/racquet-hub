import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { InputSelection } from "../Form/InputSelection";
import { sportCategoryFilters, sportTypeFilters } from "../Configs/Options";
import { ListBoxOptions } from "../Form/ListBoxOptions";
// import { DatePicker } from "../Form/DatePicker";
import { GenPurposePopover } from "../Popovers/GenPurposePopover";
import moment from "moment";
import styles from "./ProposeComponent.dialog.module.css";
import StepperComponent from "../Stepper/StepperComponent";

import { useFormik } from "formik";
import * as Yup from "yup";
import _ from "lodash";

import { FlatPickerDate } from "../Form/FlatPicker/FlatPickerDate";
import { createProposal, getZipcode } from "../../apis/fetch";
import { Time } from "../Form/Date/Time";
import { ReactDatePicker } from "../Form/ReactDatePicker/ReactDatePicker";
import { InputText } from "../Form/InputText";

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
  let [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
  function handleSelectedDate(dateSelected: any) {
    console.log("dateSelected  ", dateSelected);
    setEventDate(moment(dateSelected[0]).format("dddd, MMM D YYYY"));
  }

  const formik = useFormik({
    initialValues: {
      sportType: null,
      categoryType: null,
      location: null,
      date: null,
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
        .typeError("Please select a date and time")
        .required("Date and time is required"),
    }),
    onSubmit(values, { resetForm }) {
      console.log("ONSUBMIT FORM Form values:", JSON.stringify(values));
      setIsLoading(true)
      const payload = {
        sport: formik.values.sportType,
        type: formik.values.categoryType,
        eventStatus: {
          status: "open",
        },
        location: {
          location: formik.values.location,
          distance: 12,
        },
        playTime: formik.values.date,
        createdAt: "{{moment.utc().format()}}",
      };
      createProposal(payload).then((res)=>{
        console.log('create proposal res ', res)
        // if(res.error){
        //   setErrorMsg(res.error)

        //   return false
        // }
       
        // close modal 
        // show success banner
        // rerender ProposalListV2 component to show new proposal added.
        
        close()
        setIsLoading(false)
      }).catch((err)=> {
        console.log('create proposal err ', err)
        setIsLoading(false)
        // if error is is 400s reroute to landing 
        const errorThrown = JSON.stringify(err)
        setErrorMsg(String(errorThrown)); // Convert errorThrown to a string explicitly if necessary
        return false

      })

      // Revalidate the form if it's dirty
      if (formik.dirty) {
        // This line should be changed
        formik.validateForm(); // This line should be changed
      }
    },
  });

  function handleSelectedSportType(selection: any) {
    console.log("sporttype here ", selection);
    formik.setFieldValue("sportType", selection?.name);
  }
  function handleSelectedCategoryType(selection: any) {
    console.log("category here ", selection);
    formik.setFieldValue("categoryType", selection?.name);
  }
  function handleSelectedDateTime(dateTime: any) {
    console.log("dateTime here ", dateTime);
    formik.setFieldValue("date", dateTime);
  }

  const debouncedHandleLocationChange = _.debounce((loc: string) => {
    console.log("location here ", loc);
    formik.setFieldValue("location", loc);
  }, 800); // Adjust the debounce delay as needed (e.g., 500 milliseconds)

  const handleLocationChange = (loc: string) => {
    debouncedHandleLocationChange(loc);
  };

  useEffect(() => {
    getZipcode(formik?.values?.location)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    console.log("formik ", formik);
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
                  <p className={styles.proposalIntro + " porposalIntro "}>
                    Select the sport, location, day and time.
                  </p>
                </div>

                <div className="form-container mt-4 flex flex-col gap-[12px] justify-center ">
                  <StepperComponent status={formik} />
                  <form
                    onSubmit={(event)=> {
                      event.preventDefault()
                      formik.handleSubmit()
                    }}
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
                      {formik.errors.sportType && formik.touched.sportType && (
                        <p className={styles.errorMessge + " sportype-err-msg"}>
                          {formik.errors.sportType}
                        </p>
                      )}
                    </div>
                    <div className="input-for-sportType">
                      <ListBoxOptions
                        id="categoryType"
                        label="Select a category"
                        selections={sportCategoryFilters}
                        onSelect={handleSelectedCategoryType}
                      />
                      {formik.errors.categoryType &&
                        formik.touched.categoryType && (
                          <p
                            className={styles.errorMessge + " sportype-err-msg"}
                          >
                            {formik.errors.categoryType}
                          </p>
                        )}
                    </div>
                    <div className="input-for-sportType">
                      <InputText
                        id="location"
                        type="text"
                        label="Provide a location"
                        placeholder="Provide a location"
                        onChange={handleLocationChange}
                      />
                      {formik.errors.location && formik.touched.location && (
                        <p className={styles.errorMessge + " sportype-err-msg"}>
                          {formik.errors.location}
                        </p>
                      )}
                    </div>
                    {/* <div className="input-for-sportType">
                      <FlatPickerDate onDateSelect={handleSelectedDateTime} />
                      {formik.errors.date && (
                        <p className={styles.errorMessge + " sportype-err-msg"}>
                          {formik.errors.date}
                        </p>
                      )}
                    </div> */}
                    <div className="input-for-sportType">
                      <ReactDatePicker onDateSelect={handleSelectedDateTime} prevValue={formik.values.date}/>
                      {/* <DatePicker onSelectDate={handleSelectedDateTime} /> */}
                      {formik.errors.date && formik.touched.date && (
                        <p className={styles.errorMessge + " sportype-err-msg"}>
                          {formik.errors.date}
                        </p>
                      )}
                    </div>
                    {/* <pre>{JSON.stringify(formik, null, 4)}</pre> */}

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
                        className={`rounded-lg shadow-sm flex justify-center items-center font-inter font-medium text-sm px-4 py-2 ${
                          formik.isValid ? "bg-[#b5b782]" : "bg-[#dde0eb]"
                        } text-white ${
                          !formik.isValid ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={!formik.isValid}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  <span className={styles.errMsg + " errmsg mt-2"}>{errorMsg}</span>
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
