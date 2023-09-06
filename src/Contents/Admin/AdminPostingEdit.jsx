import React from "react";
import AdminContentProsesEdit from "./Proses/AdminContentProsesEdit";

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
        <AdminContentProsesEdit />
            
        </>
    )
}

export default AdminPosting;