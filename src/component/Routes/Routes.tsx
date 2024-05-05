// RoutesComponent.tsx
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import Landing from "../Landing/Landing";
import { Profile } from "../Profile/Profile";
import ProtectedRoute from "./ProtectedRoutes";
import { useAppDispatch, useAppSelector } from "../../store";
import { authenticateAndGetUserProfile } from "../../actions/userProfileActions";
import { useSelector } from "react-redux";

const RoutesComponent = () => {
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  const userAuth = useSelector((state:any) => state?.userAuth);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    dispatch(authenticateAndGetUserProfile({ token: authToken }));
    if(userAuth.isAuthenticated === false){
      console.log('user auth ', userAuth);
      navigateTo('/')
    }
   
  }, [dispatch]);
  return (
    <div className="route-component-container">
      <Header loginStatus={userAuth.isAuthenticated}/>
      {/* <span>TESTING USER: {isAuthenticated ? 'is authenticated' : 'is NOT authenticated'}</span> */}
      {/* <Routes>
        <Route path="/" element={<Landing />} />
        <ProtectedRoute path="/profile" element={<Profile />} />
      </Routes> */}
      <Routes>
        <Route index element={<Landing />} />
        {userAuth.isAuthenticated === true && <Route path="/profile" element={<Profile />} />}
      </Routes>
    </div>
  );
};

export default RoutesComponent;
