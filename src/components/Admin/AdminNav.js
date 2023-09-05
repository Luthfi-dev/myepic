import React from "react";
import Link from "next/link";

const AdminNav = () => {
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link href="/admin">
              <a className="nav-link ">
                <i className="bi bi-grid"></i>
                <span>Dashboard</span>
              </a>
            </Link>
          </li>
          {/* <!-- End Dashboard Nav --> */}

          {/* <!-- End Components Nav --> */}

          <li className="nav-item">
            <Link href="#">
              <a
                className="nav-link collapsed"
                data-bs-target="#forms-nav"
                data-bs-toggle="collapse"
              >
                <i className="bi bi-journal-text"></i>
                <span>Postingan</span>
                <i className="bi bi-chevron-down ms-auto"></i>
              </a>
            </Link>
            <ul
              id="forms-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="/admin/posting">
                  <a>
                    <span>
                      <i
                        className="ri-add-circle-line"
                        style={{ fontSize: "12pt" }}
                      ></i>{" "}
                      Artikel
                    </span>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/admin/category">
                  <a>
                    <span>
                      <i
                        className="ri-add-circle-fill"
                        style={{ fontSize: "12pt" }}
                      ></i>{" "}
                      Kategori
                    </span>
                  </a>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link href="/admin/media">
              <a className="nav-link collapsed">
                <i className="bi bi-bank"></i>
                <span>Media</span>
              </a>
            </Link>
          </li>
          {/* <!-- End Forms Nav --> */}

          <li className="nav-heading">Settings</li>

          <li className="nav-item">
            <Link href="users-profile.html">
              <a className="nav-link collapsed">
                <i className="bi bi-person"></i>
                <span>Profile</span>
              </a>
            </Link>
          </li>
          {/* <!-- End Profile Page Nav --> */}

          <li className="nav-item">
            <Link href="#">
              <a className="nav-link collapsed">
                <i className="bi bi-box-arrow-in-right"></i>
                <span>LogOut</span>
              </a>
            </Link>
          </li>
          {/* <!-- End Login Page Nav --> */}
        </ul>
      </aside>
    </>
  );
};

export default AdminNav;
