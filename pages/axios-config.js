// axios-config.js

import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CryptoJS from "crypto-js";
import { showDynamicAlert } from "@/Contents/showDynamicAlert";

// Fungsi untuk mengatur token akses
const setAccessToken = (axiosInstance, token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Hapus header otorisasi jika token tidak ada
    // delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const configureAxios = () => {
  const axiosInstance = axios.create();

  const router = useRouter();

  // Fungsi untuk menangani respons dari server
  const handleResponse = async (response) => {
    // console.log("ini hasil respon", response);
    if (response === undefined) {
      router.push("/auth/re-login");
      return;
    }

    if (response && response.status === 403) {
      // Jika respons adalah Unauthorized (401), redirect ke halaman login
      if (typeof window !== "undefined") {
        // Hanya melakukan redirect di sisi klien
        router.push("/");
        showDynamicAlert("Akses Dilarang ke halaman ini!", "errorTime");
        return; // Hentikan eksekusi kode di sini
      }
    } else if (response && response.status === 401) {
      // Jika respons adalah Unauthorized (401), redirect ke halaman login
      if (typeof window !== "undefined") {
        // Hanya melakukan redirect di sisi klien
        showDynamicAlert("Sesi Berakhir Silahkan Login Kembali!", "errorTime");
        router.push("/auth/re-login");
        return; // Hentikan eksekusi kode di sini
      }
    }
  };

  if (typeof window !== "undefined") {
    // Dapatkan semua cookie jika dijalankan di sisi klien
    const allCookies = document.cookie || "";

    if (allCookies) {
      // Parse (urai) cookie menjadi objek
      const cookiesArray = allCookies.split("; ");

      // Inisialisasi variabel untuk menyimpan nilai cookie yang diinginkan
      let accessTokenPicValue = null;

      // Loop melalui array cookie
      for (const cookie of cookiesArray) {
        const [name, value] = cookie.split("=");
        if (name.trim() === "accessTokenPic") {
          accessTokenPicValue = value;
          break;
        }
      }

      // deskripsi token
      // Fungsi untuk mendekripsi data
      const secretKey =
        "020bf63cbf793694ec956cc3673306c38eb75647738ee0e857f8c7b6d37e1498fd7fc27106263e90c331542a1a36955416bfa8f4e2c40f88d881a9b07700e48a";
      const decryptData = (ciphertext, secretKey) => {
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
      };

      const nilaiToken = decryptData(accessTokenPicValue, secretKey);

      // Set token akses jika ada
      setAccessToken(axiosInstance, nilaiToken);
      // console.log("ini header", axiosInstance, nilaiToken);
    }
  }

  // Berlangganan untuk menangani respons di seluruh aplikasi
  axiosInstance.interceptors.response.use(
    (response) => {
      // console.log(response);
      handleResponse(response);
      return response;
    },
    (error) => {
      handleResponse(error.response);
      throw error;
    }
  );

  return axiosInstance;
};

export default configureAxios;
