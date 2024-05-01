// ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(
    (state:any) => state.userAuth.isAuthenticated
  );
  return <Route path="/" />;
};

export default ProtectedRoute;
