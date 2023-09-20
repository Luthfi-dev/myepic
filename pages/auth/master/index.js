// pages/login.js
import AuthMasterLogin from "@/components/AuthMaster/Login";
import AuthMasterLoginv2 from "@/components/AuthMaster/Loginv2";
import React from "react";
import { UserLayout } from "@/components/User/UserLayout";

const PageKontak = () => {
  return (
    <div>
      {/* desktop */}
      <div className="d-none d-md-block">
        <AuthMasterLogin />
      </div>
      {/* mobile */}
      <div className="d-md-none">
        <AuthMasterLoginv2 />
      </div>
    </div>
  );
};

export default PageKontak;
