import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedPage = (props) => {
  const { userSession, children } = props;
  if (!userSession) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedPage;
