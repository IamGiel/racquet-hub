import { Field, Form, useFormik } from "formik";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { createProposal, deleteProposal, editProposal } from "../../apis/fetch";

import styles from "./ProposalDetails.module.css";
import { ListBoxOptions } from "../Form/ListBoxOptions";
import { sportCategoryFilters, sportTypeFilters } from "../Configs/Options";
import { InputText } from "../Form/InputText";
import { ReactDatePicker } from "../Form/ReactDatePicker/ReactDatePicker";

export const ProposalDetails = () => {
  const params = useParams();
  const { state } = useLocation();
  const navigateTo = useNavigate()

  let [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // == state OBJ from useLocation ==

  // {
  //   "_id": { "$oid": "663706dae299f6066996e627" },
  //   "createdAt": { "$date": "2024-05-05T04:11:06.656Z" },
  //   "eventStatus": { "status": "open" },
  //   "location": { "distance": 12, "location": "Knightdale" },
  //   "playTime": "2024-05-08T19:00:00.000Z",
  //   "sport": "Pickleball",
  //   "type": "Doubles",
  //   "user_details": {
  //     "email": "Chester_d@mail.com",
  //     "name": "Chester D",
  //     "user_id": "662f0d9dad764031d9a2574d"
  //   }
  // }

  const formik = useFormik({
    initialValues: {
      sportType: state?.sport,
      categoryType: state?.type,
      location: state?.location,
      date: state?.playTime,
    },
    validationSchema: Yup.object({
      sportType: Yup.string()
        .typeError("Please select a sport type")
        .required("Sport type is required"),
      categoryType: Yup.string()
        .typeError("Please select a category type")
        .required("Category type is required"),
      location: Yup.string()
        .typeError("Please select a location")
        .required("Location type is required"),
      date: Yup.string()
        .typeError("Please select a date and time")
        .required("Date and time is required"),
    }),
    onSubmit(values, { resetForm }) {
      console.log("ONSUBMIT FORM Form values:", JSON.stringify(values));
      setIsLoading(true);
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
      createProposal(payload)
        .then((res) => {
          console.log("create proposal res ", res);
          // if (res.error) {
          //   setErrorMsg(res.error);

          //   return false;
          // }

          setIsLoading(false);
        })
        .catch((err: any) => {
          console.log("create proposal err ", err);
          setIsLoading(false);
          // if error is is 400s reroute to landing
          const errorThrown = JSON.stringify(err);
          setErrorMsg(String(errorThrown)); // Convert errorThrown to a string explicitly if necessary
          return false;
        });

      // Revalidate the form if it's dirty
      if (formik.dirty) {
        // This line should be changed
        formik.validateForm(); // This line should be changed
      }
    },
  });

  function handleFieldChange(selection: any, fieldName: any) {
    console.log("sporttype here ", selection);
    console.log("fieldName here ", fieldName);
    formik.setFieldValue(fieldName, selection);
  }

  return (
    <div
      className={styles.proposalDetailContainer + " proposalDetailContainer"}
    >
      {/* <p>ProposalDetails</p>
      <p>{JSON.stringify(params)}</p>
      <p>{JSON.stringify(state)}</p> */}
      <h4>Update proposal</h4>
      <form className="proposal-form m-[30px 12px 30px 12px]">
        <div className="input-for-sportType m-[12px]">
          <ListBoxOptions
            id="sportType"
            label={`Select a sport:`}
            selections={sportTypeFilters}
            onSelect={(item: any) => {
              console.log(item);
              handleFieldChange(item?.name, "sportType");
            }}
            placeholder={formik.values.sportType}
          />
          {formik.errors.sportType && formik.touched.sportType && (
            <p className={styles.errorMessge + " sportype-err-msg"}>
              {String(formik.errors.sportType)}
            </p>
          )}
        </div>
        <div className="input-for-sportType m-[12px]">
          <ListBoxOptions
            id="categoryType"
            label="Select a category"
            selections={sportCategoryFilters}
            onSelect={(item: any) => {
              console.log(item);
              handleFieldChange(item?.name, "categoryType");
            }}
            placeholder={formik.values.categoryType}
          />
          {formik.errors.categoryType && formik.touched.categoryType && (
            <p className={styles.errorMessge + " sportype-err-msg"}>
              {String(formik.errors.sportType)}
            </p>
          )}
        </div>
        <div className="input-for-sportType m-[12px]">
          <InputText
            id="location"
            type="text"
            label="Provide a location"
            placeholder={formik.values.location.location ?? 'Select a location'}
            onChange={(item: any) => {
              console.log(item);
              handleFieldChange(item, "location");
            }}
          />
          {formik.errors.location && formik.touched.location && (
            <p className={styles.errorMessge + " sportype-err-msg"}>
              {String(formik.errors.location)}
            </p>
          )}
        </div>
        <div className="input-for-sportType m-[12px]">
          <ReactDatePicker
            onDateSelect={(item: any) => {
              console.log(item);
              handleFieldChange(item, "date");
            }}
            prevValue={formik.values.date}
          />
          {/* <DatePicker onSelectDate={handleSelectedDateTime} /> */}
          {formik.errors.date && formik.touched.date && (
            <p className={styles.errorMessge + " sportype-err-msg"}>
              {String(formik.errors.date)}
            </p>
          )}
        </div>
        <div className="my-8 flex flex-row justify-end gap-[12px] relative bottom-[12px]">
          <button
            type="button"
            className={styles.cancelBtn + ` cancelBtn`}
            onClick={(event: any) => {
              event.preventDefault();
              console.log('cancel proposal clicked submit')
              navigateTo('/')
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.deleteBtn + ` deleteBtn`}
            onClick={(event: any) => {
              event.preventDefault();
              console.log('delete proposal clicked submit ', state)
              // deleteProposal(state?.id).then((successRes)=>{
              deleteProposal(state?._id?.$oid).then((successRes)=>{
                console.log('success res ', successRes)
                navigateTo('/')
              }).catch(error=>{
                console.log('catch error ', error)
                navigateTo('/')
              })
              
            }}
          >
            Delete
          </button>
          <button
            type="submit"
            className={formik.isValid && formik.dirty ? `${styles.submitValid}` : `${styles.submitInValid}`}
            disabled={formik.isValid === false || formik.dirty == false}
            onClick={(event: any) => {
              event.preventDefault();
              console.log('edit proposal clicked submit')
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
              // editProposal(payload, state.id).then((response) => response.text())
              editProposal(payload, state?._id?.$oid).then((response) => response.text())
              .then((result) => {
                console.log(result)
                navigateTo('/')
              })
              .catch((error) => console.error(error));
            }}
          >
            Update
          </button>
        </div>
      </form>
      <hr />
      {/* <pre>{JSON.stringify(state, null, 4)}</pre> */}
    </div>
  );
};
