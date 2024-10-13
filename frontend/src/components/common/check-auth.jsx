import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  // CONDITION 01- IF USER IS NOT AUTHENTICATED AND TRY TO ACCESS PAGES OTHER THAN REGISTER OR LOGIN

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to={"/auth/login"} />;
  }

  // CONDITION 02 - IF USER IS AUTHENTICATED AND STILL TRY TO ACCESS LOGIN OR REGISTER PAGE, THEN REDIRECT TO ADMIN OR SHOP PAGE AS PER THEIR ROLE

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return <Navigate to={"/shop/home"} />;
    }
  }

  // CONDITION 03 - IF USER IS AUTHENTICATED AND ROLE OF A USER IS NOT AN ADMIN BUT TRY TO ACCESS ADMIN ROUTES

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to={"/unauth"} />;
  }

  // CONDITION 04 - IF USER IS AUTHENTICATED AND ROLE OF A USER IS AN ADMIN BUT TRY TO ACCESS NON-ADMIN ROUTES

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  return <>{children}</>;
};

export default CheckAuth;
