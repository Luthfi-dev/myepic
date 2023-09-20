import React from "react";
import { useEffect } from "react";
import { publicApi } from "../../utils/globals";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import DashboardApp from "@/Contents/RootApp/dashboard";

const HomeIndex = () => {
  const router = useRouter();

  // useEffect(() => {
  //   // Dapatkan semua cookie
  //   const allCookies = document.cookie;

  //   // Parse (urai) cookie menjadi objek
  //   const cookiesArray = allCookies.split("; ");

  //   // Inisialisasi variabel untuk menyimpan nilai cookie yang diinginkan
  //   let accessTokenPicValue = null;

  //   // Loop melalui array cookie
  //   for (const cookie of cookiesArray) {
  //     const [name, value] = cookie.split("=");
  //     if (name === "accessTokenPic") {
  //       accessTokenPicValue = value;
  //       break; // Hentikan loop jika cookie yang diinginkan ditemukan
  //     }
  //   }

  //   // Sekarang Anda memiliki nilai cookie accessTokenPic dalam accessTokenPicValue
  //   console.log(accessTokenPicValue);
  // }, []);

  // function linkKe(link) {
  //   router.push(link);
  // }

  return (
    // <>
    //   <DashboardApp />
    // </>
    <>
      <Image
        src={`${publicApi}/default/coming-soon.png`}
        alt="Foto A"
        width={500}
        height={300}
        layout="responsive"
      />
      <div className="row mt-3">
        <center>
          <button
            className="btn btn-app"
            style={{ zIndex: "99", width: "200px", marginTop: "-200px" }}
            onClick={() => linkKe("/admin")}
          >
            Dashboard Admin
          </button>
        </center>
      </div>
    </>
  );
};

export default HomeIndex;

{
  /* <Image
        src={`${publicApi}/default/coming-soon.png`}
        alt="Foto A"
        width={500}
        height={300}
        layout="responsive"
      />
      <div className="row mt-3">
        <center>
          <button
            className="btn btn-app"
            style={{ zIndex: "99", width: "200px", marginTop: "-200px" }}
            onClick={() => linkKe("/admin")}
          >
            Dashboard Admin
          </button>
        </center>
      </div> */
}
