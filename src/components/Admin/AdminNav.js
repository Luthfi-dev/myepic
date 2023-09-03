import React from "react";

const AdminNav = () => {
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <a className="nav-link " href="/admin">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </a>
          </li>
          {/* <!-- End Dashboard Nav --> */}

          {/* <!-- End Components Nav --> */}

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#forms-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-journal-text"></i>
              <span>Postingan</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="forms-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <a href="/admin/posting">
                  <span>
                    <i
                      className="ri-add-circle-line"
                      style={{ fontSize: "12pt" }}
                    ></i>{" "}
                    Artikel
                  </span>
                </a>
              </li>

              <li>
                <a href="/admin/category">
                  <span>
                    <i
                      className="ri-add-circle-fill"
                      style={{ fontSize: "12pt" }}
                    ></i>{" "}
                    Kategori
                  </span>
                </a>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="/admin/media">
              <i className="bi bi-bank"></i>
              <span>Media</span>
            </a>
          </li>
          {/* <!-- End Forms Nav --> */}

          <li className="nav-heading">Settings</li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="users-profile.html">
              <i className="bi bi-person"></i>
              <span>Profile</span>
            </a>
          </li>
          {/* <!-- End Profile Page Nav --> */}

          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <i className="bi bi-box-arrow-in-right"></i>
              <span>LogOut</span>
            </a>
          </li>
          {/* <!-- End Login Page Nav --> */}
        </ul>
      </aside>
    </>
  );
};

export default AdminNav;
