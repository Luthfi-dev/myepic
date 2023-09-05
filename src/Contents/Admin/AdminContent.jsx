// pages/admin.js
import Image from "next/image";
import React, { useState, useEffect }  from "react";
import { artikelPageApi, publicApi } from "../../../utils/globals";
import axios from "axios";
import Link from "next/link";

const AdminContent = () => {
    const [dataAll, setDataAll] = useState([]);

   async function fetchData() {
    try {
      const response = await axios.get(`${artikelPageApi}?jumlah=5&status=proses`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      const data = response.data;
      const postinganTeratas = data.data;
      setDataAll(postinganTeratas);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data dari API:", error);
      // Handle kesalahan sesuai kebutuhan Anda
    }
  }
  
  useEffect(() => {
    fetchData();
console.log(dataAll);
  }, [dataAll]);

  // Fungsi untuk menghasilkan elemen-elemen JSX dari dataAll
const renderDataAll = (dataAll) => {
  return dataAll.map((item, index) => {
    const { media, judul, isi } = item;

    // Mendapatkan ekstensi file foto dari nama file
    const fotoEkstensi = media ? media.split(".").pop().toLowerCase() : "";

    // Menentukan apakah ekstensi adalah gambar atau video
    const isImage = ["jpg", "jpeg", "png", "gif"].includes(fotoEkstensi);
    
    return (
      <div className="post-item clearfix" key={index}>
        {media ? (
          // Jika media terisi, lakukan pengecekan jenis media
          isImage ? (
            // Jika ekstensi adalah gambar, tampilkan gambar dari publicApi
            <Image
              width={100}
              height={50}
              objectFit="contain"
              src={`${publicApi}/${media}`}
              alt="foto thunbnail"
            />
          ) : (
            // Jika ekstensi bukan gambar, tampilkan thumbnail video dari path yang sesuai
            <Image
              width={100}
              height={50}
              objectFit="contain"
              src={`${publicApi}/default/thum_video.png`}
              alt="video  thunbnail"
            />
          )
        ) : (
          // Jika media kosong, tampilkan gambar baru
          <Image
            width={100}
            height={50}
            objectFit="contain"
            src={`${publicApi}/default/no_picture.png`}
            alt="foto thunbnail no image"
          />
        )}
        <h4>
          <a href="#">{judul}</a>
        </h4>
        <p className="text-app">
          {isi.length > 50
            ? `${isi.substring(0, 50)}...`
            : isi}
        </p>
      </div>
    );
  });
};


  return (
    <>
    <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
      </div>

      <div className="row">
        <div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots"></i>
              </a>
              
            </div>

            <div className="card-body">
              <h5 className="card-title">
                Submit <span>| Proses</span>
              </h5>

              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-clock-history"></i>
                </div>
                <div className="ps-3">
                  <h6>145</h6>
                  <span className="text-success small pt-1 fw-bold">Postingan</span>{" "}
                  <span className="text-muted small pt-2 ps-1">Diproses</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots"></i>
              </a>
              
            </div>

            <div className="card-body">
              <h5 className="card-title">
                Submit <span>| Diterima</span>
              </h5>

              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-clipboard-check"></i>
                </div>
                <div className="ps-3">
                  <h6>145</h6>
                  <span className="text-success small pt-1 fw-bold">Postingan</span>{" "}
                  <span className="text-muted small pt-2 ps-1">Diterima</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xxl-4 col-md-6">
          <div className="card info-card sales-card">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots"></i>
              </a>
              
            </div>

            <div className="card-body">
              <h5 className="card-title">
                Submit <span>| Ditolak</span>
              </h5>

              <div className="d-flex align-items-center">
                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-clipboard-x"></i>
                </div>
                <div className="ps-3">
                  <h6>145</h6>
                  <span className="text-success small pt-1 fw-bold">Postingan</span>{" "}
                  <span className="text-muted small pt-2 ps-1">Ditolak</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
      <section>
        <div className="row">
          <div className="col-xxl-8 col-md-8">
            <div className="card p-2">
              <h5 className="card-title">Postingan <span>| Teratas</span></h5>

              <div className="news m-2">
                {renderDataAll(dataAll)}
              </div>

              <div className="row mt-3">
                <center>
                  <button className="btn btn-app btn-sm">semua artikel <i className="bi bi-arrow-right"></i></button>
                </center>
              </div>
              {/* <!-- End sidebar recent posts--> */}

            </div>
          </div>
          <div className="col-xxl-4 col-md-4">
            <div className="card">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>

                <li><a className="dropdown-item" href="#">Today</a></li>
                <li><a className="dropdown-item" href="#">This ff</a></li>
                <li><a className="dropdown-item" href="#">This Year</a></li>
              </ul>
            </div>

            <div className="card-body">
              <h5 className="card-title">Recent Activity <span>| Today</span></h5>

              <div className="activity">

                <div className="activity-item d-flex">
                  <div className="activite-label">32 min</div>
                  <i className="bi bi-circle-fill activity-badge text-success align-self-start"></i>
                  <div className="activity-content">
                    Quia quae rerum <a href="#" className="fw-bold text-dark">explicabo officiis</a> beatae
                  </div>
                </div>

                <div className="activity-item d-flex">
                  <div className="activite-label">56 min</div>
                  <i className="bi bi-circle-fill activity-badge text-danger align-self-start"></i>
                  <div className="activity-content">
                    Voluptatem blanditiis blanditiis eveniet
                  </div>
                </div>

                <div className="activity-item d-flex">
                  <div className="activite-label">2 hrs</div>
                  <i className="bi bi-circle-fill activity-badge text-primary align-self-start"></i>
                  <div className="activity-content">
                    Voluptates corrupti molestias voluptatem
                  </div>
                </div>

                <div className="activity-item d-flex">
                  <div className="activite-label">1 day</div>
                  <i className="bi bi-circle-fill activity-badge text-info align-self-start"></i>
                  <div className="activity-content">
                    Tempore autem saepe <a href="#" className="fw-bold text-dark">occaecati voluptatem</a> tempore
                  </div>
                </div>

                <div className="activity-item d-flex">
                  <div className="activite-label">2 days</div>
                  <i className="bi bi-circle-fill activity-badge text-warning align-self-start"></i>
                  <div className="activity-content">
                    Est sit eum reiciendis exercitationem
                  </div>
                </div>

                <div className="activity-item d-flex">
                  <div className="activite-label">4 weeks</div>
                  <i className="bi bi-circle-fill activity-badge text-muted align-self-start"></i>
                  <div className="activity-content">
                    Dicta dolorem harum nulla eius. Ut quidem quidem sit quas
                  </div>
                </div>

              </div>

            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminContent;
