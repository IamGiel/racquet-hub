// RoutesComponent.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import Landing from "../Landing/Landing";
import { Profile } from "../Profile/Profile";
import ProtectedRoute from "./ProtectedRoutes";
import { useAppDispatch, useAppSelector } from "../../store";
import { authenticateAndGetUserProfile } from "../../actions/userProfileActions";
import { useSelector } from "react-redux";
import { ProposalDetails } from "../Proposals/ProposalDetails";

const RoutesComponent = () => {
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  const userAuth = useSelector((state: any) => state?.userAuth);
  const [authStatus, setAuthStatus] = useState<any>(null)
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    dispatch(authenticateAndGetUserProfile({ token: authToken }));
  }, [dispatch, navigateTo]);

  useEffect(() => {
    if (userAuth.isAuthenticated === false) {
      console.log("user auth ", userAuth);
      navigateTo("/");
    }
  }, [userAuth]);

  const handleSuccessAuth =(auth:any) => {
    console.log('handled success auth ', auth)
    setAuthStatus(auth)
  }

  return (
    <div className="route-component-container">
      <Header loginStatus={userAuth.isAuthenticated} onSuccessAuth={handleSuccessAuth}/>
      {/* <span>TESTING USER: {isAuthenticated ? 'is authenticated' : 'is NOT authenticated'}</span> */}
      {/* <Routes>
        <Route path="/" element={<Landing />} />
        <ProtectedRoute path="/profile" element={<Profile />} />
      </Routes> */}

      <div className="main-container min-h-800px">
        <Routes>
          <Route index element={<Landing authStatus={authStatus}/>} />
          {userAuth.isAuthenticated === true && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/proposal/:id/:type" element={<ProposalDetails />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default RoutesComponent;
