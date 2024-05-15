// RoutesComponent.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Landing from "../component/Landing/Landing";
import ProposalListv2 from "../component/Landing/ProposalListv2";
import { ProposalDetails } from "../component/Proposals/ProposalDetails";
import { Profile } from "../component/Profile/Profile";
import { useSelector } from "react-redux";
import { reauthenticateUser, selectIsAuthenticated, selectUser } from "../reducers/authReducer";
import { Header } from "../component/Header/Header";
import { useAppDispatch } from "../store";
import { Sandbox } from "../sandbox/sandbox";
// import { Profile } from "../Profile/Profile";
// import ProtectedRoute from "./ProtectedRoutes";
// import { useAppDispatch, useAppSelector } from "../../store";
// import { authenticateAndGetUserProfile } from "../../actions/userProfileActions";
// import { useSelector } from "react-redux";
// import { ProposalDetails } from "../Proposals/ProposalDetails";
// import { reauthenticateUser, selectIsAuthenticated, selectUser } from "../../reducers/authReducer";

const RoutesComponent = () => {
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  // const userAuth = useSelector((state: any) => state?.userAuth);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  // Listen for route changes and reload the page if the user is not authenticated
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!isAuthenticated && authToken) {
      navigateTo("/", { replace: true });
      // window.location.reload(); // Reload the page
    }
  }, [isAuthenticated, navigateTo]);


  useEffect(() => {
    // Dispatch the reauthenticateUser action when the component mounts
    console.log('DISPATCH RE_AUTHENTICATE USER ', user)
    dispatch(reauthenticateUser());
  }, [dispatch]);

  const handleSuccessAuth =(auth:any) => {
    console.log('handled success auth ', auth)
  }

  return (
    <div className="route-component-container">
      <Header loginStatus={isAuthenticated} onSuccessAuth={handleSuccessAuth}/>

      <div className="main-container min-h-800px">
        <Routes>
          <Route index element={<Landing authStatus={isAuthenticated}/>} />
          {isAuthenticated === true && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/proposal/:id/:type" element={<ProposalDetails />} />
              <Route path="/proposals" element={<ProposalListv2 />} />
              <Route path="/sandbox" element={<Sandbox />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default RoutesComponent;
