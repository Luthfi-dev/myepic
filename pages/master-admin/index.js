// pages/admin.js

import React from "react";
import Head from "next/head";
import { MasterAdminLayout } from "../../src/components/MasterAdmin/MasterAdminLayout";
import MasterAdminContent from "../../src/Contents/MasterAdmin/MasterAdminContent";

const pageMasterAdmin = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Thinkepic CMS</title>
      </Head>

      <MasterAdminLayout>
        <MasterAdminContent />
      </MasterAdminLayout>
    </>
  );
};

export default pageMasterAdmin;
