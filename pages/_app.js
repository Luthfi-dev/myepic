import { useEffect } from "react";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";

import "../public/assets/vendor/bootstrap/css/bootstrap.min.css";
import "../public/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../public/assets/vendor/boxicons/css/boxicons.min.css";
import "../public/assets/vendor/quill/quill.snow.css";
import "../public/assets/vendor/quill/quill.bubble.css";
import "../public/assets/vendor/remixicon/remixicon.css";
import "../public/assets/vendor/simple-datatables/style.css";
import "../public/assets/css/warna.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  //   useEffect(() => {
  //     const handleRouteChangeStart = (url) => {
  //       // Tampilkan indikator loading saat rute berubah
  //       NextNProgress.start();
  //     };

  //     const handleRouteChangeComplete = () => {
  //       // Sembunyikan indikator loading saat rute selesai dimuat
  //       NextNProgress.done();
  //     };

  //     router.events.on("routeChangeStart", handleRouteChangeStart);
  //     router.events.on("routeChangeComplete", handleRouteChangeComplete);

  //     // Membersihkan event listener saat komponen dimatikan
  //     return () => {
  //       router.events.off("routeChangeStart", handleRouteChangeStart);
  //       router.events.off("routeChangeComplete", handleRouteChangeComplete);
  //     };
  //   }, [router.events]);

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
