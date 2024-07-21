import "./ChadPanelLayout.scss";

import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import { verifyToken } from "@/api";

export const ChadPanelLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkToken();
  }, [location.pathname, localStorage.getItem("token")]);

  const path = location.pathname
    .split("/")
    .filter((i) => i.length)
    .reverse()[0]
    .toLowerCase();

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    const tokenValid = token ? await verifyToken(token) : false;
    if (token === null || !tokenValid) {
      navigate("/czadowyPanel/login");
    } else if (path === "czadowypanel" || path === "login") {
      navigate("/czadowyPanel/settings");
    }
  };

  return (
    <div className="chadpanel-main">
      <h1>Czadowy panel Reussa</h1>
      <Outlet />
    </div>
  );
};
