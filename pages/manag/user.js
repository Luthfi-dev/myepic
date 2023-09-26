// pages/login.js
import React from "react";
import { Helmet } from "react-helmet";
import { MasterAdminLayout } from "@/components/MasterAdmin/MasterAdminLayout";
import DataTable from "@/components/Manag/ManagUser";

const PageKontak = () => {
  return (
    <div>
      <Helmet>
        <title>Manag user</title>

        <meta
          name="description"
          content="Halaman login untuk para penulis/kontributor thinkepic."
        />
        <meta name="keywords" content="login, penulis/kontributor thinkepic" />
      </Helmet>
      {/* desktop */}
      <MasterAdminLayout>
        <DataTable />
      </MasterAdminLayout>
    </div>
  );
};

export default PageKontak;
