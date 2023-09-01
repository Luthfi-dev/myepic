// AdminContentProses.js

import React, { useState } from "react";
// import QuillEditor from "../Dynamic/TextArea";
// import QuillEditor from "../Dynamic/QuilText";
import FileUploadCard from "../uploadFile";

import dynamic from "next/dynamic";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const MyForm = () => {
  const [formData, setFormData] = useState({
    judul: "",
    kategori: "",
    media: "",
    quillContent: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Input berubah:", name, value, formData);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuillChange = (value) => {
    const i_foto = document.getElementById("n_foto");
    console.log("Input berubah:", value, formData);
    setFormData((prevData) => ({
      ...prevData,
      quillContent: value,
      media: i_foto.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan proses penyimpanan data di sini, termasuk formData.quillContent
    console.log("Data yang akan disimpan:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xxl-12 col-md-12">
          <div className="card info-card sales-card">
            <div className="filter">
              <div
                className="btn btn-states rounded mr-2"
                title="Simpan Sebagai Draf"
              >
                <i className="bi bi-cloud-check">
                  {" "}
                  <span className="d-none-md"></span>
                </i>
              </div>
              <button
                type="submit"
                className="btn btn-primary rounded"
                title="Publish Artikel"
              >
                <i className="ri-send-plane-fill">
                  {" "}
                  <span className="d-none-md">Publish</span>
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-xxl-12 col-md-12">
          <div className="card info-card sales-card p-2">
            <input
              type="text"
              name="judul"
              className="form-control"
              placeholder="Masukkan Judul"
              value={formData.judul}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9">
          <div className="row">
            <div className="col-xxl-12 col-md-12">
              <div className="card info-card sales-card p-0">
                <input
                  type="hidden"
                  name="media"
                  id="n_foto"
                  value={formData.foto}
                  onChange={handleChange}
                />
                <FileUploadCard />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xxl-12 col-md-12">
              <div
                className="card info-card sales-card p-1"
                style={{ height: "550px" }}
              >
                <QuillEditor
                  value={formData.quillContent}
                  onChange={handleQuillChange}
                  style={{
                    height: "500px",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    padding: "10px",
                    maxHeight: "500px",
                    scrollbarColor: "darkgray lightgray",
                    scrollbarWidth: "thin",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="col-xxl-12 col-md-12">
            <div className="card info-card sales-card p-2">
              <h4>Kategori</h4>
              <hr />
              <div className="row">
                <div className="col-lg-2">
                  <label>Pilih</label>
                </div>
                <div className="col-lg-10">
                  <select
                    name="kategori"
                    id="kategori"
                    className="form-control"
                    value={formData.kategori}
                    onChange={handleChange}
                  >
                    <option value="Foto">Foto</option>
                    <option value="Flayer">Flayer</option>
                    <option value="Video">Video</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-12 col-md-12">
            <div className="card info-card sales-card p-2">
              <h4>Keterangan</h4>
              <hr />
              <div className="card">
                Draf : <b>Tersimpan</b>
              </div>
              <div className="card">
                Visibilitas : <b>Private</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MyForm;
