import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { addAccessTokenToRequest } from "./axiosAuth"; // Sesuaikan dengan path menuju file auth.js Anda
import NextNProgress from "nextjs-progressbar";

import "../public/assets/vendor/bootstrap/css/bootstrap.min.css";
import "../public/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../public/assets/vendor/boxicons/css/boxicons.min.css";
import "../public/assets/vendor/quill/quill.snow.css";
import "../public/assets/vendor/quill/quill.bubble.css";
import "../public/assets/vendor/remixicon/remixicon.css";
import "../public/assets/vendor/simple-datatables/style.css";
import "../public/assets/css/warna.css";
// custom css
import "../public/assets/custom/font/myfont.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  console.log(addAccessTokenToRequest);

  return (
    <>
      <NextNProgress
        color="#4352EF"
        startPosition={0.3}
        stopDelayMs={1000}
        height={3}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
