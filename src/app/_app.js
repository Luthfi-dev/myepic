// pages/_app.js
import Head from "next/head";
import Header from "../components/Header"; // Gantilah dengan jalur aktual menuju komponen header Anda

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Sertakan elemen-elemen head umum dan aset di sini */}
        <link rel="stylesheet" href="/path/ke/stylesheet/anda.css" />
      </Head>
      <Header />
      <Component {...pageProps} />
      {/* Anda dapat menambahkan komponen footer umum di sini jika diperlukan */}
    </>
  );
}

export default MyApp;
