// pages/admin.js

import React from "react";
import Head from "next/head";
import { SuperAdminLayout } from "../../src/components/SuperAdmin/SuperAdminLayout";
import SuperAdminContent from "../../src/Contents/SuperAdmin/SuperAdminContent";

const pageAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Thinkepic CMS</title>
      </Head>

      <SuperAdminLayout>
        <SuperAdminContent />
      </SuperAdminLayout>
    </>
  );
};

export default pageAdmin;
