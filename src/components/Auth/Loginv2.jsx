import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import CryptoJS from 'crypto-js';
import { cekMailApi, reqTokenApi, signupApi, userApi } from "../../../utils/globals";
import { showDynamicAlert } from "@/Contents/showDynamicAlert";
import { useRouter } from "next/router";

const AuthLogin = () => {
  const { cookies } = useState(null);

    const setCookie = (name, value, maxAge) => {
      document.cookie = `${name}=${value}; Max-Age=${maxAge}; Secure; SameSite=Strict; path=/`;
    };


const router = useRouter();

  
  const [formData, setFormData] = useState({
    email: "",
    nama: "",
    password: "",
    confir_password: "",
    role: "admin",
  });

  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    nama: "",
    role: "admin"
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
    console.log("Input login:", name, value, formDataLogin);
    setFormDataLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  useEffect(() => {
    console.log("form berubah", formData,);
    console.log("form login", formDataLogin,);
  }, []);

  const handleSubmitLogin = async (event) => {
  event.preventDefault();
  showDynamicAlert("Loading..","loading");

  try {
    const postData = {"email": formDataLogin.email,"password": formDataLogin.password,"role": formDataLogin.role}
          console.log("oke")
      // Lakukan permintaan POST ke URL
      const response = await axios.post(reqTokenApi, postData, {
        headers: {
          "Content-Type": "application/json",
        }, 
      });
  
      // console.log("ini hasil data",response.data);
      // Fungsi untuk mengenkripsi data
      const secretKey = "020bf63cbf793694ec956cc3673306c38eb75647738ee0e857f8c7b6d37e1498fd7fc27106263e90c331542a1a36955416bfa8f4e2c40f88d881a9b07700e48a";
      const encryptData = (data, secretKey) => {
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
        return ciphertext;
      };

      // Fungsi untuk mendekripsi data
      // const decryptData = (ciphertext, secretKey) => {
      //   const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
      //   const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      //   return decryptedData;
      // };
      const encryptedAccessToken = encryptData(response.data.accessToken, secretKey);
      // const encryptedRefreshToken = encryptData(response.data.refreshToken, secretKey);

    setCookie('accessTokenPic', encryptedAccessToken, 30*24*60*60*1000 );
    if(response.status === 200){
        showDynamicAlert("Login Sukses", "successTime");
        router.push("/routes/user");
    } 

      // // Simpan access_token di localStorage
      // localStorage.setItem('access_token_mpic', encryptedAccessToken);
      // localStorage.setItem('refresh_token_mpic', encryptedRefreshToken);
      
      // console.log(localStorage.getItem('access_token_mpic'));
      // console.log(decryptData(localStorage.getItem('access_token_mpic'), secretKey));
      const response2 = await axios.post(reqTokenApi, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

    } catch (error) {
      // Handle error jika terjadi
      // console.error('Terjadi kesalahan:', error);
        showDynamicAlert("Username atau password Salah, Periksa Kembali!", "error");
    }
  }

const handleSubmit = async (event) => {
  event.preventDefault();
  showDynamicAlert("Loading..","loading");

  // Validasi email menggunakan regex sederhana
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(formData.email)) {
    showDynamicAlert("Format email tidak valid", "warning");
    return;
  }

  // Validasi password minimal 6 karakter
  if (formData.password.length < 6) {
    showDynamicAlert("Password harus minimal 6 karakter", "warning");
    return;
  }

  // Validasi apakah password perulangan sama
  if (formData.password !== formData.confir_password) {
    showDynamicAlert("Pengulangan Password Tidak Sama, Periksa Kembali", "warning");
    return;
  }

  // Validasi bahwa semua kolom tidak kosong
  if (!formData.email || !formData.nama || !formData.password || !formData.confir_password || !formData.role) {
    showDynamicAlert("Masih ada kolom yang belum terisi!", "warning");
    return;
  }


  const DataCek = `${cekMailApi}?email=${formData.email}&role=${formData.role}`;
  console.log(DataCek);

  try {
    // Mengeksekusi permintaan GET dengan axios
    const response = await axios.get(DataCek);

    if (response.data.length > 0) {
      showDynamicAlert(`Email sudah terdaftar sebagai ${formData.roleText}. Silahkan lakukan login.`, "warning");
    } else {
      console.log(response.data);

      // Data yang akan dikirimkan dalam permintaan POST
      const postData = {
        email: formData.email,
        nama: formData.nama,
        password: formData.password,
        role: formData.role
      };

      console.log("Data post", postData);

      if(response.data.length === 0){
        // Lakukan permintaan POST ke URL
      const postResponse = await axios.post(signupApi, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response dari server:", postResponse);

      // Handle respons di sini
      if (postResponse.status === 200) {
        // Data berhasil disimpan, lakukan tindakan yang sesuai
        showDynamicAlert("User Berhasil di Daftarkan", "successTime");
        window.location.href = `/auth/login/send-mail?email=${formData.email}`;
      } else {
        // Handle respons error dengan status lain jika diperlukan
        console.error('Terjadi kesalahan pada server:', postResponse.data.message);
      }
      }
    }
  } catch (error) {
    // Handle kesalahan jaringan atau lainnya
    console.error('Terjadi kesalahan:', error);
  }
};


  const checkPasswordLength = () => {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");
    const notifPass = document.getElementById("notif_password2");


    if (formData.password.length < 8) {
      passwordInput.style.border = "1px solid red";
      notifPass.classList.add("p-2")
      // alert("Password minimal 8 karakter");
      notifPass.innerHTML = "Password minimal 8 karakter";
    } else {
      passwordInput.style.border = "1px solid #ccc";
      notifPass.innerHTML = "";
      notifPass.classList.remove("p-2")
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
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0"
      />

      <div>
        <div className="form-structor w-100 bg-light">
            <div className="signup slide-up">
                <h2 className="form-title text-dark" style={{color:"#4352f1"}} id="signup">
                <span className="text-dark">or</span>Sign up
                </h2>
                
                <div className="form-holder">
                <input type="email" className="input" name="email" value={formData.email} onChange={handleChange} placeholder="Masukkan Email" />
                <input type="text" className="input" name="nama" value={formData.nama} onChange={handleChange} placeholder="Masukkan Nama" />
                <input type="password" className="input" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Masukkan Password" onBlur={checkPasswordLength} />
                <span className="text-light" id="notif_password2"></span>
                <input type="password" className="input" name="confir_password" id="confirm_password" value={formData.confir_password} onChange={handleChange} placeholder="Ulangi Password" onBlur={checkPasswordLength} />
                </div>
                <button className="submit-btn" onClick={handleSubmit}>Sign up</button>
                <hr />
                <center>
                <b>OR</b>
                  <div className="form__icons">
                    <img
                      className="form__icon"
                      src="/assets/svg/logo-google.svg"
                      priority={false}
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
                </center>
            </div>
            <div className="login">
                <div className="center">
                <h5 className="btn btn-app btn-sm w-100 mb-5" id="login">
                   <span></span>Sign in
                </h5>
                <center>
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
                </center>
                <div className="form-holder" style={{marginTop:"20px"}}>
                    <input type="email" className="input" placeholder="Email" name="email" value={formDataLogin.email} onChange={handleChangeLogin} />
                    <input type="password" className="input" placeholder="Password" name="password" value={formDataLogin.password} onChange={handleChangeLogin} />
                </div>
                
                <button className="submit-btn rounded" onClick={handleSubmitLogin}>Log in</button>
                   <center><Link href="/auth/reset-password" className="form__link">Forgot your password?</Link></center>
                </div>
            </div>
            </div>

      <style jsx>{`
@import url("https://fonts.googleapis.com/css?family=Fira+Sans");
html, body {
  position: relative;
  min-height: 100vh;
  background-color: #E1E8EE;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Fira Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}

body {
  overflow: hidden; /* Mencegah scroll pada laman */
}

.form__icon{
			opacity: 1;
			transition: 0.15s;
			cursor: pointer;
	}

.form-structor {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  
}
.form-structor::after {
  content: "";
  opacity: 0.2;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: cover;
  background-image: url("/assets/svg/bg-1.svg");
}
.form-structor .signup {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  width: 65%;
  z-index: 5;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup.slide-up {
  top: 5%;
  -webkit-transform: translate(-50%, 0%);
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup.slide-up .form-holder, .form-structor .signup.slide-up .submit-btn {
  opacity: 0;
  visibility: hidden;
}
.form-structor .signup.slide-up .form-title {
  font-size: 1em;
  cursor: pointer;
}
.form-structor .signup.slide-up .form-title span {
  margin-right: 5px;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup .form-title {
  color: #4352f1;
  font-size: 1.7em;
  text-align: center;
}
.form-structor .signup .form-title span {
  color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup .form-holder {
  border-radius: 15px;
  background-color: #4352f1;
  overflow: hidden;
  margin-top: 50px;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup .form-holder .input {
  border: 0;
  outline: none;
  box-shadow: none;
  display: block;
  height: 50px;
  line-height: 30px;
  padding: 8px 15px;
  border-bottom: 1px solid #4352F1;
  width: 100%;
  font-size: 12px;
}
.form-structor .signup .form-holder .input:last-child {
  border-bottom: 0;
}
.form-structor .signup .form-holder .input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.4);
}
.form-structor .signup .submit-btn {
  background-color: rgba(0, 0, 0, 0.4);
  color: rgba(255, 255, 255, 0.7);
  border: 0;
  border-radius: 15px;
  display: block;
  margin: 15px auto;
  padding: 15px 45px;
  width: 100%;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup .submit-btn:hover {
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.8);
}
.form-structor .login {
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 5;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login::before {
  content: "";
  position: absolute;
  left: 50%;
  top: -20px;
  -webkit-transform: translate(-50%, 0);
  background-color: #fff;
  width: 200%;
  height: 250px;
  border-radius: 50%;
  z-index: 4;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login .center {
  position: absolute;
  top: calc(50% - 10%);
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  width: 65%;
  z-index: 5;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login .center .form-title {
  color: #000;
  font-size: 1.7em;
  text-align: center;
}
.form-structor .login .center .form-title span {
  color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login .center .form-holder {
  border-radius: 15px;
  background-color: #fff;
  border: 1px solid #eee;
  overflow: hidden;
  margin-top: 50px;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login .center .form-holder .input {
  border: 0;
  outline: none;
  box-shadow: none;
  display: block;
  height: 50px;
  line-height: 30px;
  padding: 8px 15px;
  border-bottom: 1px solid #eee;
  width: 100%;
  font-size: 12px;
}
.form-structor .login .center .form-holder .input:last-child {
  border-bottom: 0;
}
.form-structor .login .center .form-holder .input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.4);
}
.form-structor .login .center .submit-btn {
  background-color: #6B92A4;
  color: rgba(255, 255, 255, 0.7);
  border: 0;
  border-radius: 15px;
  display: block;
  margin: 15px auto;
  padding: 15px 45px;
  width: 100%;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login .center .submit-btn:hover {
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.8);
}
.form-structor .login.slide-up {
  top: 90%;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login.slide-up .center {
  top: 10%;
  -webkit-transform: translate(-50%, 0%);
  -webkit-transition: all 0.3s ease;
}
.form-structor .login.slide-up .form-holder, .form-structor .login.slide-up .submit-btn {
  opacity: 0;
  visibility: hidden;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login.slide-up .form-title {
  font-size: 1em;
  margin: 0;
  padding: 0;
  cursor: pointer;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login.slide-up .form-title span {
  margin-right: 5px;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}`}
</style>

      <script src="/assets/custom/login/loginv2.js" async></script>
      </div>

    </>
  );
};

export default AuthLogin;
