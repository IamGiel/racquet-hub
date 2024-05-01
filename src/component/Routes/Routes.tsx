// RoutesComponent.tsx
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import Landing from "../Landing/Landing";
import { Profile } from "../Profile/Profile";
import ProtectedRoute from "./ProtectedRoutes";
import { useAppDispatch, useAppSelector } from "../../store";
import { authenticateAndGetUserProfile } from "../../actions/userProfileActions";

const RoutesComponent = () => {
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  const isAuthenticated = useAppSelector(
    (state) => state.userAuth.isAuthenticated
  );  
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    dispatch(authenticateAndGetUserProfile({ token: authToken }));
    if(!isAuthenticated){
      navigateTo('/')
    }
  }, [isAuthenticated]);
  return (
    <div className="route-component-container">
      <Header loginStatus={isAuthenticated}/>
      {/* <span>TESTING USER: {isAuthenticated ? 'is authenticated' : 'is NOT authenticated'}</span> */}
      {/* <Routes>
        <Route path="/" element={<Landing />} />
        <ProtectedRoute path="/profile" element={<Profile />} />
      </Routes> */}
      <Routes>
        <Route index element={<Landing />} />
        {isAuthenticated && <Route path="/profile" element={<Profile />} />}
      </Routes>
    </div>
  );
};

export default RoutesComponent;
