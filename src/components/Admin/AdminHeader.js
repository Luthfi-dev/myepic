import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AdminHeader = () => {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Fungsi untuk menampilkan atau menyembunyikan sidebar
  function tampilkanToggleSidebar() {
    setSidebarOpen(!isSidebarOpen);
  }

  // Efek ini akan dipanggil setiap kali URL berubah
  useEffect(() => {
    // Tutup sidebar saat URL berubah
    setSidebarOpen(false);
  }, [router.asPath]); // Memantau perubahan URL

  // Set class pada body sesuai dengan status sidebar
  useEffect(() => {
    const body = document.body;
    if (isSidebarOpen) {
      body.classList.add("toggle-sidebar");
    } else {
      body.classList.remove("toggle-sidebar");
    }
  }, [isSidebarOpen]);

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="index.html" className="logo d-flex align-items-center">
          <Image src="/assets/img/logo.png" alt="" width={40} height={50} />
          <span className="d-none d-lg-block">Thinkepic</span>
        </a>
        <i
          className="bi bi-list toggle-sidebar-btn"
          onClick={tampilkanToggleSidebar}
        ></i>
      </div>
      {/* <!-- End Logo --> */}

      {/* <div className="search-bar">
        <form
          className="search-form d-flex align-items-center"
          method="POST"
          action="#"
        >
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div> */}
      {/* <!-- End Search Bar --> */}

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          {/* <li className="nav-item d-block d-lg-none">
            <a
              className="nav-link nav-icon search-bar-toggle "
              href="#mysearch"
            >
              <i className="bi bi-search"></i>
            </a>
          </li> */}
          {/* <!-- End Search Icon--> */}

          <li className="nav-item dropdown">
            <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
              <i className="bi bi-bell"></i>
              <span className="badge bg-primary badge-number">4</span>
            </a>
            {/* <!-- End Notification Icon --> */}

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                Kamu punya 3 notifikasi baru
                <a href="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-exclamation-circle text-warning"></i>
                <div>
                  <h4>Proses</h4>
                  <p>Postingan kamu dalam proses oleh team reviewer</p>
                  <p>30 min. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-x-circle text-danger"></i>
                <div>
                  <h4>Ditolak</h4>
                  <p>Postingan kamu di ditolak oleh reviewer</p>
                  <p>1 hr. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li className="notification-item">
                <i className="bi bi-check-circle text-success"></i>
                <div>
                  <h4>Disetujui</h4>
                  <p>Postingan kamu di setujui oleh reviewer</p>
                  <p>2 hrs. ago</p>
                </div>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>
              <li className="dropdown-footer">
                <a href="#">Show all notifications</a>
              </li>
            </ul>
            {/* <!-- End Notification Dropdown Items --> */}
          </li>
          {/* <!-- End Notification Nav --> */}

          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <Image
                width={40}
                height={50}
                src="/assets/img/profile-img.jpg"
                alt="Profile"
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                Luthfi
              </span>
            </a>
            {/* <!-- End Profile Iamge Icon --> */}

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>Luthfi-dev</h6>
                <span>Fullstack</span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="users-profile.html"
                >
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="users-profile.html"
                >
                  <i className="bi bi-gear"></i>
                  <span>Account Settings</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="pages-faq.html"
                >
                  <i className="bi bi-question-circle"></i>
                  <span>Need Help?</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
            {/* <!-- End Profile Dropdown Items --> */}
          </li>
          {/* <!-- End Profile Nav --> */}
        </ul>
      </nav>
      {/* <!-- End Icons Navigation --> */}
    </header>
  );
};

export default AdminHeader;
