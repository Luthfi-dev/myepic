// pages/login.js
import AuthAdminLogin from "@/components/AuthAdmin/Login";
import AuthAdminLoginv2 from "@/components/AuthAdmin/Loginv2";
import React from "react";
import { UserLayout } from "@/components/User/UserLayout";

const PageKontak = () => {
  return (
    <div>
      {/* desktop */}
      <div className="d-none d-md-block">
        <AuthAdminLogin />
      </div>
      {/* mobile */}
      <div className="d-md-none">
        <AuthAdminLoginv2 />
      </div>
    </div>
  );
};

export default PageKontak;
