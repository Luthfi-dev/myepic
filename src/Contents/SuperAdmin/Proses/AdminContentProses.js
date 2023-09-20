// AdminContentProses.js

import React, { useState, useEffect } from "react";
const axios = require("axios");
import { v4 as uuidv4 } from "uuid";
import FileUploadCard from "../SuperUploadFile";
import {
  artikelApi,
  artikelPageApi,
  kategoriApi,
} from "../../../../utils/globals";
import TagInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import dynamic from "next/dynamic";
import configureAxios from "../../../../pages/axios-config";
import { DataUser } from "@/components/DataUser";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const MyForm = () => {
  const [addCardClass, setAddCardClass] = useState(false);
  const [tags, setTags] = useState([]); // State untuk menyimpan tags

  const fifiAxios = configureAxios();
  const myUser = DataUser();
  const UserId = myUser !== null ? myUser.id_user : null;

  useEffect(() => {
    // Fungsi untuk menangani peristiwa scroll
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setAddCardClass(true);
      } else {
        setAddCardClass(false);
      }
    };

    // Tambahkan event listener untuk mendengarkan peristiwa scroll
    window.addEventListener("scroll", handleScroll);

    // Jangan lupa untuk menghapus event listener saat komponen unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [formData, setFormData] = useState({
    id: uuidv4(),
    judul: "",
    type_konten: "",
    kategori: "",
    media: "",
    tags: [],
    slugg: "",
    quillContent: "",
  });

  // BAGIAN MENGHANDLE slugs

  // Fungsi untuk mengambil data dari API berdasarkan judul
  async function fetchDataFromApi(judul) {
    try {
      const response = await fifiAxios.get(artikelApi);
      const data = response.data;

      // Mengumpulkan semua slug dari data API ke dalam array
      const slugs = data.map((item) => item.slug);

      // Memeriksa apakah judul sudah ada dalam slug yang ada
      const slugFromTitle = createSlug(judul);

      if (slugs.includes(slugFromTitle)) {
        // Jika slug sudah ada, buat slug unik
        const uniqueSlug = makeSlugUnique(slugFromTitle, slugs);
        return uniqueSlug;
      } else {
        // Jika slug belum ada, gunakan slug dari judul
        return slugFromTitle;
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data dari API:", error);
      // Handle kesalahan sesuai kebutuhan Anda
    }
  }

  // Fungsi untuk mengubah judul menjadi slug
  function createSlug(title) {
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    return slug;
  }

  // Fungsi untuk membuat slug menjadi unik
  function makeSlugUnique(slug, existingSlugs) {
    let uniqueSlug = slug;
    let counter = 1;

    while (existingSlugs.includes(uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return uniqueSlug;
  }

  // END BAGIAN SLUGS

  useEffect(() => {
    // console.log("form berubah", formData);
  }, [formData]);

  const handleTagsChange = (newTags) => {
    setTags(newTags); // Update state tags saat tags berubah
    setFormData((prevData) => ({
      ...prevData,
      tags: newTags, // Perbarui formData.tags dengan nilai terbaru
    }));
    // console.log(formData.tags); // Tampilkan nilai terbaru dari tags
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    // console.log("Input berubah:", name, value, formData);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "judul") {
      const result = await fetchDataFromApi(value);
      document.querySelector("#slugg").value = result;
      // Gunakan fungsi setFormData lagi untuk memperbarui formData
      setFormData((prevData) => ({
        ...prevData,
        slugg: result,
      }));
    }
  };

  const handleQuillChange = (value) => {
    const i_foto = document.getElementById("n_foto");
    // console.log("Input berubah:", value, formData);
    setFormData((prevData) => ({
      ...prevData,
      quillContent: value,
    }));
  };

  // bagian handle kategori
  const [dataKategori, setDataKategori] = useState([]);
  const ktg = async () => {
    if (myUser !== null) {
      try {
        const response = await fifiAxios.get(kategoriApi);
        const categoryData = response.data;
        setDataKategori(categoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    ktg();
  }, [myUser]);

  // FUNGSI onBlur
  const tidaFokuslagi = async () => {
    try {
      const response = await fifiAxios.get(artikelApi);
      const hasilData = response.data;

      // UPDATE INFO DRAF
      // Ambil elemen dengan ID "drafInfo"
      const drafInfoElement = document.getElementById("drafInfo");
      drafInfoElement.innerHTML = "draf tersimpan";
      // Set timeout selama 3 detik untuk mengosongkan elemen drafInfo
      setTimeout(() => {
        // Mengosongkan innerHTML elemen drafInfo
        drafInfoElement.innerHTML = "";
      }, 3000);
      // END DRAF INFO

      // Update keterangan Draf
      document.querySelector("#ketDraf").innerHTML = "Tersimpan";

      const adaYangSama = hasilData.some((item) => item.id === formData.id);
      // console.log("samaa", adaYangSama);

      if (adaYangSama) {
        // Update keterangan public
        document.querySelector("#ketPublic").innerHTML = "Private (Draf)";
        // sebelum di put cek dulu status artikelnya
        const responseStatus = await fifiAxios.get(
          `${artikelPageApi}?id=${formData.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const statusBaru = responseStatus.data;
        const dataBaruFix = statusBaru.data[0].status;
        // Contoh penggunaan
        const dataToSend = {
          id: formData.id,
          judul: formData.judul,
          type_konten: formData.type_konten,
          media: formData.media,
          kategori: formData.kategori,
          isi: formData.quillContent,
          tags: `${formData.tags}`,
          slug: formData.slugg,
          user_id: UserId,
          status: dataBaruFix,
        };
        const response = await fifiAxios.put(
          `${artikelApi}/${formData.id}`,
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("update", response);
        return true;
      } else {
        // Contoh penggunaan
        const dataToSend = {
          id: formData.id,
          judul: formData.judul,
          type_konten: formData.type_konten,
          media: formData.media,
          kategori: formData.kategori,
          isi: formData.quillContent,
          tags: `${formData.tags}`,
          slug: formData.slugg,
          user_id: UserId,
          status: "draf",
        };
        const response = await fifiAxios.post(artikelApi, dataToSend, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log("post", response);
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tidakFokus = await tidaFokuslagi();
    // console.log(tidakFokus);

    // update ket public
    document.querySelector("#ketPublic").innerHTML = "Private (OnReview)";

    // Contoh penggunaan
    const dataToSend = {
      id: formData.id,
      judul: formData.judul,
      type_konten: formData.type_konten,
      media: formData.media,
      kategori: formData.kategori,
      isi: formData.quillContent,
      tags: `${formData.tags}`,
      slug: formData.slugg,
      user_id: UserId,
      status: "proses",
    };

    // hentikan post jika data kosong
    if (
      formData.judul == "" ||
      formData.quillContent == "" ||
      formData.tags == ""
    ) {
      alert("kolom judul, isi postingan dan tags tidak boleh kosong");
      return;
    }

    let apiMethod = "post"; // Default method
    let link = artikelApi;

    if (tidakFokus) {
      apiMethod = "put";
      link = `${artikelApi}/${formData.id}`;
    }

    // Fungsi untuk mengirim data ke API
    async function postDataToAPI(data) {
      try {
        const response = await fifiAxios[apiMethod](link, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          alert(
            `Data berhasil ${
              apiMethod === "post" ? "disimpan" : "diupdate"
            } ke API`
          );
        } else {
          throw new Error("Gagal mengirim data ke API");
        }

        return response.data;
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
      }
    }

    postDataToAPI(dataToSend);
    // console.log(dataToSend);

    // END MENYIMPAN DATA KE API
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        id="headPosting"
        className={`row ${addCardClass ? "card" : ""}`}
        style={{
          position: "sticky",
          top: "60px",
          zIndex: "99",
          paddingTop: "10px",
          marginRight: "-0",
          marginLeft: "0px",
        }}
      >
        <div className="col-xxl-12 col-md-12">
          <div className="info-card sales-card">
            <div className="d-flex justify-content-between align-items-center">
              <div
                className="btn btn-states rounded mr-2"
                title="Simpan Sebagai Draf"
              >
                <i className="bi bi-cloud-check">
                  {" "}
                  <span className="d-none-md"></span>
                </i>
                <i
                  className="text-success"
                  id="drafInfo"
                  style={{ fontSize: "12px" }}
                ></i>
              </div>
              <button
                type="submit"
                className="btn btn-primary rounded"
                title="Publish Artikel"
                style={{ backgroundColor: "#6776F4", color: "white" }}
              >
                <i className="ri-send-plane-fill">
                  {" "}
                  <span className="d-none-md">Submit</span>
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
              onBlur={tidaFokuslagi}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9">
          <div className="row">
            <div className="col-xxl-12 col-md-12">
              <div className="card info-card sales-card p-0">
                <FileUploadCard formData={formData} />
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
                  modules={modules}
                  value={formData.quillContent}
                  onChange={handleQuillChange}
                  onBlur={tidaFokuslagi}
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
              <h4>Tipe Konten</h4>
              <hr />
              <div className="row">
                <div className="col-lg-2">
                  <label>Pilih</label>
                </div>
                <div className="col-lg-10">
                  <select
                    name="type_konten"
                    id="type_konten"
                    className="form-control"
                    value={formData.type_konten}
                    onChange={handleChange}
                    onBlur={tidaFokuslagi}
                  >
                    <option readOnly>--Pilih Tipe--</option>
                    <option value="teks">Teks</option>
                    <option value="foto">Foto</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-12 col-md-12">
            <div className="card info-card sales-card p-2">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <b>Tags</b>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <TagInput
                        id="Tags"
                        className="form-control"
                        value={tags}
                        onChange={handleTagsChange}
                        onBlur={tidaFokuslagi}
                      />
                      <span
                        className="text-success"
                        style={{
                          position: "absolute",
                          fontSize: "8pt",
                          marginTop: "0px",
                        }}
                      >
                        <i>Tekan enter untuk add Tag</i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-12 col-md-12">
            <div className="card info-card sales-card p-2">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      <b>Slug</b>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <input id="slugg" className="form-control" readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-12 col-md-12">
            <div className="card info-card sales-card p-2">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      <b>Kategori</b>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
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
                            onBlur={tidaFokuslagi}
                          >
                            <option readOnly>--Pilih Kategori--</option>
                            {dataKategori.map((item) => (
                              <option
                                key={item.id_kategori}
                                value={item.nama_kategori}
                              >
                                {item.nama_kategori}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-12 col-md-12">
            <div className="card info-card sales-card p-2">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse3"
                      aria-expanded="true"
                      aria-controls="collapse3"
                    >
                      <b>Keterangan</b>
                    </button>
                  </h2>
                  <div
                    id="collapse3"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="container mt-2">
                        Draf : <b id="ketDraf">Belum Tersimpan</b>
                      </div>
                      <div className="container mt-2">
                        Visibilitas : <b id="ketPublic">Private</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MyForm;
