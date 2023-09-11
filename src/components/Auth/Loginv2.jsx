import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { userApi } from "../../../utils/globals";

const AuthLogin = () => {

  const [formData, setFormData] = useState({
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

  useEffect(() => {
    console.log("form berubah", formData,);
  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // uraikan role
    let roleName = '';
    if (formData.role === "2") {
      roleName = "admin";
    } else {
      roleName = "user";
    }
    // Data yang akan dikirimkan dalam permintaan POST
    const postData = {
      email: formData.email,
      nama: formData.nama,
      password: formData.password,
      role: roleName,
      img: '',
      status: ''
    };

    console.log("data psot", postData)

    try {
      // Lakukan permintaan POST ke URL yang sesuai
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
                <input type="password" className="input" name="password" value={formData.password} onChange={handleChange} placeholder="Masukkan Password" />
                <input type="password" className="input" name="confir_password" value={formData.confir_password} onChange={handleChange} placeholder="Ulangi Password" />
                <select name="role" value={formData.roll} onChange={handleChange} className="form-control">
                  <option>pilih sebagai</option>
                  <option value="1">Pembaca</option>
                  <option value="2">Penulis</option>
                </select>
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
                    <input type="email" className="input" placeholder="Email" />
                    <input type="password" className="input" placeholder="Password" />
                </div>
                <button className="submit-btn rounded">Log in</button>
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
