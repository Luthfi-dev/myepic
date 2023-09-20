// pages/login.js
import AuthLogin from "@/components/Auth/Login";
import AuthLoginv2 from "@/components/Auth/Loginv2";
import React from "react";
import { UserLayout } from "@/components/User/UserLayout";

const PageKontak = () => {
  return (
    <div>
      {/* desktop */}
      <div className="d-none d-md-block">
        <AuthLogin />
      </div>
      {/* mobile */}
      <div className="d-md-none">
        <AuthLoginv2 />
      </div>
    </div>
  );
};

export default PageKontak;
