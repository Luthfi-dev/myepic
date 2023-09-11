import React, { useEffect,useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import CryptoJS from 'crypto-js';
import { cekMailApi, reqTokenApi, userApi } from "../../../utils/globals";
import "/public/assets/custom/login/index.scss";
import { FALSE } from "sass";

const AuthLogin = () => {

  
  const [formData, setFormData] = useState({
    email: "",
    nama: "",
    password: "",
    confir_password: "",
    role: "",
  });

  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    nama: "",
    password: "",
    confir_password: "",
    role: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log("Input berubah:", name, value, formData);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleChangeLogin = async (e) => {
    const { name, value } = e.target;
    console.log("Input berubah:", name, value, formData);
    setFormDataLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  useEffect(() => {
    console.log("form berubah", formData,);
    console.log("form berubah", formDataLogin,);
  }, [formData,formDataLogin]);

  const handleSubmitLogin = async (event) => {
  event.preventDefault();
  try {
    const postData = {"email": "fiilut5@gmail.com","password": "12345678","role": "user"}
          console.log("oke")
      // Lakukan permintaan POST ke URL
      const response = await axios.post(reqTokenApi, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      console.log(response.data);
      // Fungsi untuk mengenkripsi data
      const secretKey = "020bf63cbf793694ec956cc3673306c38eb75647738ee0e857f8c7b6d37e1498fd7fc27106263e90c331542a1a36955416bfa8f4e2c40f88d881a9b07700e48a";
      const encryptData = (data, secretKey) => {
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
        return ciphertext;
      };

      // Fungsi untuk mendekripsi data
      const decryptData = (ciphertext, secretKey) => {
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
      };
      const encryptedAccessToken = encryptData(response.data.accessToken, secretKey);
      const encryptedRefreshToken = encryptData(response.data.refreshToken, secretKey);

      // Simpan access_token di localStorage
      localStorage.setItem('access_token_mpic', encryptedAccessToken);
      localStorage.setItem('refresh_token_mpic', encryptedRefreshToken);
      
      console.log(localStorage.getItem('access_token_mpic'));
      console.log(decryptData(localStorage.getItem('access_token_mpic'), secretKey));


    } catch (error) {
      // Handle error jika terjadi
      console.error('Terjadi kesalahan:', error);
    }
  }

const handleSubmit = async (event) => {
  event.preventDefault();

  // cek apakah password perulangan sama
  if (formData.password !== formData.confir_password) {
    alert("Pengulangan Password TIdak Sama Periksa Kembali");
    return; // Menghentikan eksekusi di sini jika kondisi tidak terpenuhi
  }

  // mengecek kolom tidak ada yang kosong
  if (!formData.email || !formData.nama || !formData.password || !formData.confir_password || !formData.role) {
    alert("Masih ada kolom yang belum terisi!");
    return; // Menghentikan eksekusi di sini jika kondisi tidak terpenuhi
  }

  // uraikan role
  let roleName = '';
  let roleNameText = '';
  if (formData.role === "2") {
    roleName = "admin";
    roleNameText = "penulis"
  } else if (formData.role === "1") {
    roleName = "user";
    roleNameText = "pembaca";
  } else {
    alert("pilih dengan benar kolom sebagai");
    return; // Menghentikan eksekusi di sini jika kondisi tidak terpenuhi
  }

  const DataCek = `${cekMailApi}?email=${formData.email}&role=${roleName}`;
  console.log(DataCek);
  
  // Mengeksekusi permintaan GET dengan axios
  try {
    const response = await axios.get(DataCek);

    if (response.data.length > 0) {
      alert(`email sudah terdaftar sebagai ${roleNameText}, silahkan lakukan login`);
      return; // Menghentikan eksekusi di sini jika kondisi tidak terpenuhi
    }

    console.log(response.data);

    // Data yang akan dikirimkan dalam permintaan POST
    const postData = {
      email: formData.email,
      nama: formData.nama,
      password: formData.password,
      role: roleName,
    };

    console.log("data psot", postData)

    try {
      // Lakukan permintaan POST ke URL
      const response = await axios.post(userApi, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle respons di sini
      console.log('Respon dari server:', response.data);
      window.location.href = `/auth/login/send-mail?email=${formData.email}`;
    } catch (error) {
      // Handle error jika terjadi
      console.error('Terjadi kesalahan:', error);
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
};


  const checkPasswordLength = () => {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");
    const notifPass = document.getElementById("notif_password");


    if (formData.password.length < 8) {
      passwordInput.style.border = "1px solid red";
      // alert("Password minimal 8 karakter");
      notifPass.innerHTML = "Password minimal 8 karakter";
    } else {
      passwordInput.style.border = "1px solid #ccc";
      notifPass.innerHTML = "";
    }

    // Juga periksa konfirmasi password jika diperlukan
    if (formData.confir_password.length < 8) {
      confirmPasswordInput.style.border = "1px solid red";
    } else {
      confirmPasswordInput.style.border = "1px solid #ccc";
    }
  };
  

  return (
    <>
      <div className="main">
        <div className="container a-container" id="a-container">
          <form className="form" id="a-form" method="" action="">
            <h2 className="form_title title">Create Account</h2>
            <div className="form__icons">
              <img
                className="form__icon"
                src="/assets/svg/logo-google.svg"
                width={50}
                height={50}
                objectFit="cover"
                alt="icon logo gmail"
                title="Sig Up with Gmail"
                style={{ width: "50px" }}
              />
              <img
                className="form__icon"
                src="/assets/svg/logo-ms.svg"
                width={50}
                height={50}
                objectFit="cover"
                alt="icon logo gmail"
                title="Sig Up with Microsoft"
                style={{ width: "50px" }}
              />
            </div>
            <span className="form__span">or use email for registration</span>
            <input className="form__input" type="email" name="email" placeholder="Masukkan email" value={formData.email} onChange={handleChange} />
            <input className="form__input" type="text" name="nama" placeholder="Masukkan nama" value={formData.nama} onChange={handleChange} />
            <input className="form__input" type="password" name="password" id="password" placeholder="Masukkan password" value={formData.password} onChange={handleChange} onBlur={checkPasswordLength} />
            <span className="text-danger" id="notif_password"></span>
            <input className="form__input" type="password" name="confir_password" id="confirm_password" placeholder="Ulangi Password" value={formData.confir_password} onChange={handleChange} onBlur={checkPasswordLength} />
            <select name="role" value={formData.roll} onChange={handleChange} className="form__input">
                  <option>pilih sebagai</option>
                  <option value="1">Pembaca</option>
                  <option value="2">Penulis</option>
            </select>
            <button className="form__button button submit" onClick={handleSubmit}>SIGN UP</button>
          </form>
        </div>
        <div className="container b-container" id="b-container">
          <form className="form" id="b-form" method="" action="">
            <h2 className="form_title title">Sign in to Website</h2>
            <div className="form__icons">
              <img
                className="form__icon"
                src="/assets/svg/logo-google.svg"
                width={50}
                height={50}
                objectFit="cover"
                alt="icon logo gmail"
                title="Sig Up with Gmail"
                style={{ width: "50px" }}
              />
              <img
                className="form__icon"
                src="/assets/svg/logo-ms.svg"
                width={50}
                height={50}
                objectFit="cover"
                alt="icon logo gmail"
                title="Sig Up with Microsoft"
                style={{ width: "50px" }}
              />
            </div>
            <span className="form__span">or use your email account</span>
            <input className="form__input" type="text" placeholder="Email" />
            <input
              className="form__input"
              type="password"
              placeholder="Password"
            />
            <Link href="/auth/reset-password" className="form__link">Forgot your password?</Link>
            <button className="form__button button submit" onClick={handleSubmitLogin}>SIGN IN</button>
          </form>
        </div>
        <div className="switch" id="switch-cnt">
          <img className="switch__circle" src="/assets/svg/illustrasi-1.svg" />
          <img
            className="switch__circle switch__circle--t"
            src="/assets/svg/illustrasi-2.svg"
            style={{ margin: "90px", marginLeft: "-170px" }}
          />
          <div className="switch__container" id="switch-c1">
            <img className="" width={150} src="/assets/svg/bg-1.svg" />
            <h2 className="switch__title title">Welcome Back !</h2>
            <p className="switch__description description">
              To stay connected with us, kindly log in using your unique
              identification.
            </p>
            <button className="switch__button button switch-btn">
              SIGN IN
            </button>
          </div>
          <div className="switch__container is-hidden" id="switch-c2">
            <h2 className="switch__title title">
              {" "}
              <img width={150} />
            </h2>
            <p className="switch__description description">
              Unlock access to our services by providing your personal details.
            </p>
            <button className="switch__button button switch-btn">
              SIGN UP
            </button>
          </div>
        </div>
      <script src="/assets/custom/login/login.js" async></script>
      </div>

    </>
  );
};

export default AuthLogin;
