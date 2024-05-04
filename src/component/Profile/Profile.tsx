import { PaperClipIcon } from "@heroicons/react/20/solid";
import styles from "./Profile.module.css";
import { ProfileRecentMatches } from "./ProfileRecentMatches";
import { useAppDispatch } from "../../store";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  authenticateAndGetUserProfile,
  editUserDetailsApi,
} from "../../actions/userProfileActions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { dialogService } from "../Services/dialog-service";
import { ProfileSummaryDialog } from "../Dialogs/ProfileSummaryDialog";
import { useSelector } from "react-redux";

export interface IUserDetails {
  _id: string;
  avatar: string;
  createdAt: string;
  email: string;
  membershipType: string;
  name: string;
  payment: string;
  pickelBallRating: string;
  playerInfo: {
    gear: string;
    leftyOrRighty: string;
    playingStyle: string;
  };
  profileEditedAt: string;
  season: string;
  tennisRating: string;
  trial: boolean;
}

export const Profile = () => {
  // const userProfile = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  const userAuth = useSelector((state: any) => state?.userAuth);

  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null); // Initialize userDetails state
  const [editMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    tennisRating: Yup.string(),
    pickelBallRating: Yup.string(),
    "playerInfo.gear": Yup.string(),
    "playerInfo.leftyOrRighty": Yup.string(),
    "playerInfo.playingStyle": Yup.string(),
  });

  const [editedName, setEditedName] = useState(null);

  const initialValues = {
    name: editedName,
    email: null,
    playerInfo: {
      gear: null,
      leftyOrRighty: null,
      playingStyle: null,
    },
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      // Submit logic here
      console.log(values);
      setIsSubmitting(false);
    },
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const userProfileData = dispatch(
      authenticateAndGetUserProfile({ token: authToken })
    );
    if (userAuth.isAuthenticated) {
      userProfileData.then(
        (res: any) => {
          if (res && res.payload) {
            console.log("user profile data res ", res);

            const parsedRes = JSON.parse(res?.payload);
            setUserDetails(parsedRes.data);
          }
        },
        (err: any) => {
          console.log("user profile data err ", err);
        }
      );
    } else {
      // localStorage.clear();
      navigateTo("/landing");
    }
  }, [dispatch, userAuth.isAuthenticated]);

  const handleInputChange = (label: any, newValue: any) => {
    // Handle the change and update the userDetails object
    // For example, you could use setUserDetails to update the state
    console.log("handle input change");
    console.log("handle input change label: ", label);
    console.log("handle input change newValue: ", newValue);
  };
  const onSubmitForm = () => {
    // Handle the change and update the userDetails object
    // For example, you could use setUserDetails to update the state
    console.log("handle input change ", formik);
    dispatch(editUserDetailsApi(formik.values));
  };

  return (
    <>
      {userDetails && (
        <div
          className={
            styles.profileContainer +
            " profileContainer overflow-hidden bg-white shadow sm:rounded-lg"
          }
        >
          <>
            <div
              className="sm:px-6"
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px",
              }}
            >
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Profile Information
              </h3>
              <div className="flex flex-row-reverse gap-[12px]">
                {editMode && (
                  <button
                    type="submit"
                    className={`${styles.saveBtn} editBtn`}
                    onClick={() => {
                      dialogService.openDialog(
                        ProfileSummaryDialog,
                        formik.values
                      );
                    }}
                    disabled={!formik.dirty || !formik.isValid || isSubmitting}
                    style={{
                      background:
                        formik.dirty || !formik.isValid || isSubmitting
                          ? ""
                          : "lightgrey",
                    }}
                  >
                    Save
                  </button>
                )}

                <button
                  type="button"
                  className={styles.editBtn + " editBtn"}
                  onClick={toggleEditMode}
                >
                  {!editMode ? "Edit" : "Cancel"}
                </button>
              </div>
            </div>
            <div className="border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div
                  className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  style={{ padding: "12px" }}
                >
                  <dt className="text-sm font-medium text-gray-900">
                    Full name
                  </dt>
                  {!editMode && (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {userDetails?.name ?? ""}
                    </dd>
                  )}
                  {editMode && (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <input
                        className={
                          styles.inputFieldsStyle + " inputFieldsStyle "
                        }
                        id="name"
                        type="text"
                        value={formik.values.name ?? userDetails?.name}
                        onChange={formik.handleChange}
                      />
                    </dd>
                  )}
                </div>
                <div
                  className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  style={{ padding: "12px" }}
                >
                  <dt className="text-sm font-medium text-gray-900">Email</dt>
                  {!editMode && (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {userDetails?.email ?? ""}
                    </dd>
                  )}
                  {editMode && (
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      <input
                        className={
                          styles.inputFieldsStyle + " inputFieldsStyle "
                        }
                        id="email"
                        type="text"
                        value={formik.values.email ?? userDetails?.email}
                        onChange={formik.handleChange}
                      />
                    </dd>
                  )}
                </div>

                <div
                  className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  style={{ padding: "12px" }}
                >
                  <dt className="text-sm font-medium text-gray-900">
                    Tennis Rating
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {userDetails?.tennisRating ?? ""}
                  </dd>
                </div>

                <div
                  className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  style={{ padding: "12px" }}
                >
                  <dt className="text-sm font-medium text-gray-900">
                    PickleBall Rating
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {userDetails?.pickelBallRating ?? ""}
                  </dd>
                </div>
                <div
                  className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  style={{ padding: "12px" }}
                >
                  <dt className="text-sm font-medium text-gray-900">Plan</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {userDetails?.membershipType}
                  </dd>
                </div>

                <div
                  className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  style={{ padding: "12px" }}
                >
                  <dt className="text-sm font-medium text-gray-900">
                    Little bits
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <div className={styles.extraInfo + " extraInfo"}>
                      {!editMode && (
                        <span>
                          <b>Gear:</b> {userDetails?.playerInfo.gear}
                        </span>
                      )}
                      {editMode && (
                        <span>
                          <b>Gear:</b>{" "}
                          <input
                            className={
                              styles.inputFieldsStyle + " inputFieldsStyle "
                            }
                            id="playerInfo.gear"
                            type="text"
                            value={
                              formik.values.playerInfo.gear ??
                              userDetails?.playerInfo.gear
                            }
                            onChange={formik.handleChange}
                          />
                        </span>
                      )}
                      {!editMode && (
                        <span>
                          <b>Handedness:</b>{" "}
                          {userDetails?.playerInfo.leftyOrRighty}
                        </span>
                      )}
                      {editMode && (
                        <span>
                          <b>Handedness:</b>{" "}
                          <input
                            className={
                              styles.inputFieldsStyle + " inputFieldsStyle "
                            }
                            id="playerInfo.leftyOrRighty"
                            type="text"
                            value={
                              formik.values.playerInfo.leftyOrRighty ??
                              userDetails?.playerInfo.leftyOrRighty
                            }
                            onChange={formik.handleChange}
                          />
                        </span>
                      )}
                      {!editMode && (
                        <span>
                          <b>Style:</b> {userDetails?.playerInfo.playingStyle}
                        </span>
                      )}
                      {editMode && (
                        <span>
                          <b>Style:</b>{" "}
                          <input
                            className={
                              styles.inputFieldsStyle + " inputFieldsStyle "
                            }
                            id="playerInfo.playingStyle"
                            type="text"
                            value={
                              formik.values.playerInfo.playingStyle ??
                              userDetails?.playerInfo.playingStyle
                            }
                            onChange={formik.handleChange}
                          />
                        </span>
                      )}
                    </div>
                  </dd>
                </div>

                <div className="recent-match " style={{ padding: "12px" }}>
                  <ProfileRecentMatches />
                </div>
              </dl>
            </div>
          </>
          
        </div>
      )}
    </>
  );
};
