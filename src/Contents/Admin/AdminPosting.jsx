

import Image from "next/image";
import React from "react";
import AdminContentProses from "./Proses/AdminContentProses"

const AdminPosting = () => {
    return (
        <>
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item active">Posting</li>
            </ol>
          </nav>
        </div>

        {/* section content */}

        {/* PROSES */}
        <AdminContentProses />
            
        </>
    )
}

export default AdminPosting;
