import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import styles from "./ProposeComponent.dialog.module.css";
import { updateUserDetails } from "../../apis/fetch";
import { selectIsAuthenticated, selectUser, setUser } from "../../reducers/authReducer";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";

export const ProfileSummaryDialog = ({ close, data = {} }: any) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleConfirmSubmit = (event:any) => {
    event.preventDefault()
    console.log('handle confirm submit event ', event.target)
    console.log('handle confirm submit data ', JSON.stringify(data))
    console.log('user reducer info in ', JSON.stringify(user.data._id))
    // loading handles here
    // updateUserDetails(data, user?.data?._id)
    // updateUserDetails({ ...user?.data, ...data }, user?.data?._id)
    updateUserDetails({ ...data }, user?.data?._id)
    .then((res: Response) => {
      if (res.ok) {
        // If the response is successful (status code 200-299),
        // parse the JSON response body
        return res.json();
      } else {
        // If the response is not successful, throw an error
        throw new Error(`Failed to update user details: ${res.statusText}`);
      }
    })
    .then((jsonData: any) => {
      // Handle the parsed JSON data here
      console.log('Response data:', jsonData);
      // Dispatch setUser action or perform any other actions
      dispatch(setUser({data:jsonData.response}));
      // Close the modal or perform any other UI updates
      close();
    })
    .catch((error: any) => {
      // Handle any errors that occur during the fetch or parsing process
      console.error('Error updating user details:', error);
      // Optionally, display an error message to the user
    });
  
  }
  return (
    <div className={styles.confirm + " confirm bg-white shadow rounded-lg"}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Confirmation
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            You are about to change your profile information. Please confirm
            your changes.
          </p>
        </div>

        <div className="mt-5">
          <div
            className="infoSummary"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {Object.keys(data).map((item, itemID) => {
              return (
                <div
                  className="itemEntry"
                  style={{ display: "flex", flexDirection: "row" }}
                  key={itemID}
                >
                  <div className="actualLabel">
                    {typeof data[item] === "object" ? (
                      <div className="actualValue">
                        {Object.keys(data[item]).map(
                          (nestedItem, nestedItemID) => (
                            <div key={nestedItemID}>
                              <span
                                className={
                                  styles.userDetailLabel +
                                  " usrDetail-label capitalize"
                                }
                              >
                                {nestedItem}:
                              </span>{" "}
                              <span
                                className={
                                  styles.userDetailValue + " userDetailValue"
                                }
                              >
                                {data[item][nestedItem]}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="actualValue">
                        <span
                          className={
                            styles.userDetailLabel +
                            " usrDetail-label capitalize"
                          }
                        >
                          {item}:
                        </span>{" "}
                        <span
                          className={
                            styles.userDetailValue + " userDetailValue"
                          }
                        >
                          {data[item]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <button
            type="button"
            className="inline-flex items-center rounded-[6px] bg-[#013047] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#013047] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={handleConfirmSubmit}
          >
            Confirm to Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};
