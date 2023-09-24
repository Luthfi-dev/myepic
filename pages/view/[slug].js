import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { artikelUser, publicApi, getNamaApi } from "/utils/globals";
import { useRouter } from "next/router";
import axios from "axios";
import { Helmet } from "react-helmet";
// import CardArtikel from "@/components/RootApp/CardArtikel";
import CardPopuler from "@/components/RootApp/CardPopuler";
import { linkApi, myAppLink } from "../../utils/globals";

const ArticlePage = () => {
  const [addCardClass, setAddCardClass] = useState(false);
  const [articles, setArticles] = useState([]);
  const [media, setMedia] = useState("");
  const [namaPenulis, setNamaPenulis] = useState(null);
  const [namaEditor, setNamaEditor] = useState(null);
  const router = useRouter();

  // console.log("media", media);

  useEffect(() => {
    // Fungsi untuk menangani peristiwa scroll
    const handleScroll = () => {
      if (window.scrollY >= 50) {
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

  const { slug } = router.query;
  // console.log("benarr", slug);
  useEffect(() => {
    // Pastikan slug tidak kosong sebelum melakukan permintaan Axios
    if (slug) {
      try {
        axios
          .get(`${artikelUser}&slug=${slug}`)
          .then((response) => {
            setArticles(response.data.data[0]);
            // console.log("hh", response.data.data[0]);
            setMedia(`${publicApi}/${response.data.data[0].media}`);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    }
  }, [slug]);

  useEffect(() => {
    // Fungsi untuk mengambil nama penulis berdasarkan id_user
    const fetchNamaPenulis = async () => {
      try {
        // console.log("artikel", articles);
        const response = await axios.get(
          `${getNamaApi}?id=${articles.user_id}`
        );
        const nama = response.data[0].nama;
        // console.log("nammmmm", nama);
        setNamaPenulis(nama);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data dari API:", error);
      }
    };

    if (articles) {
      fetchNamaPenulis();
    }
  }, [articles]);

  useEffect(() => {
    // Fungsi untuk mengambil nama Editor berdasarkan id_user
    const fetchNamaEditor = async () => {
      try {
        // console.log("artikel", articles);
        const response = await axios.get(
          `${getNamaApi}?id=${articles.user_id}`
        );
        const nama = response.data[0].nama;
        // console.log("nammmmm", nama);
        setNamaEditor(nama);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data dari API:", error);
      }
    };

    if (articles) {
      fetchNamaEditor();
    }
  }, [articles]);

  // bagikan artikel
  // Fungsi untuk menangani klik tombol share
  function handleShareClick() {
    if (navigator.share) {
      let shareData = {
        title: articles.judul,
        url: `${myAppLink}/view/${articles.slug}`,
      };

      // Periksa apakah ada media (gambar) yang tersedia
      if (articles.media !== "") {
        // Tambahkan gambar pratinjau
        shareData.image = [
          // Gunakan array image jika ingin menyediakan beberapa gambar pilihan
          { src: `${linkApi}/${articles.media}` },
        ];
      }

      navigator
        .share(shareData)
        .then(() => console.log("Artikel dibagikan"))
        .catch((error) => console.error("Error berbagi artikel:", error));
    }
  }

  return (
    <>
      <Helmet>
        <title>{articles.judul}</title>

        <meta name="description" content={articles.judul} />
        <meta name="keywords" content={articles.tags} />
      </Helmet>
      <Container className="col-md-8">
        <Row className="col-md-12 mt-1">
          <Col className="col-12 col-md-8 pt-1 mb-5">
            {media !== `${publicApi}/` ? (
              <>
                {media.endsWith(".jpg") ||
                media.endsWith(".png") ||
                media.endsWith(".jpeg") ? (
                  <>
                    <h1 style={{ fontFamily: "Time New Roman, sans-serif" }}>
                      {articles.judul}
                    </h1>
                    <Image src={media} fluid alt="image artikel" />
                  </>
                ) : media.endsWith(".mp4") ? (
                  <>
                    <video controls>
                      <source src={media} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <h1 style={{ fontFamily: "Time New Roman, sans-serif" }}>
                      {articles.judul}
                    </h1>
                  </>
                ) : (
                  "Tipe media tidak didukung" // Tambahkan pesan kesalahan jika ekstensi tidak dikenali
                )}
              </>
            ) : (
              <h1 style={{ fontFamily: "Time New Roman, sans-serif" }}>
                {articles.judul}
              </h1>
            )}

            <p className="mt-3">
              <em>
                {media.endsWith(".jpg") ||
                media.endsWith(".png") ||
                media.endsWith(".jpeg")
                  ? `Penulis: ${namaPenulis} | Editor: ${namaEditor || "-"}`
                  : media.endsWith(".mp4")
                  ? `Creator: ${namaPenulis} | Editor: ${namaEditor || "-"}`
                  : `Penulis: ${namaPenulis} | Editor: ${namaEditor || "-"}`}
              </em>
            </p>

            <p
              className="mt-3"
              dangerouslySetInnerHTML={{ __html: articles.isi }}
            />
            <div className="mt-4">
              <button class="btn btn-app bordered" onClick={handleShareClick}>
                <span class="bi bi-share"></span> Bagikan
              </button>
              {/* <Button variant="success" className="mr-2">
                <Link
                  href="whatsapp://send?text=Judul%20Artikel:%20URL_Artikel"
                  target="_blank"
                  className="text-white"
                >
                  <i className="fab fa-whatsapp"></i> WhatsApp
                </Link>
              </Button>
              <Button variant="primary" className="mr-2">
                <Link
                  href="https://www.facebook.com/sharer/sharer.php?u=URL_Artikel"
                  target="_blank"
                  className="text-white"
                >
                  <i className="fab fa-facebook"></i> Facebook
                </Link>
              </Button>
              <Button variant="info" className="mr-2">
                <Link
                  href="https://telegram.me/share/url?url=URL_Artikel&text=Judul%20Artikel"
                  target="_blank"
                  className="text-white"
                >
                  <i className="fab fa-telegram"></i> Telegram
                </Link>
              </Button>
              <Button variant="secondary">
                <Link
                  href="#"
                  onClick={() => {
                    navigator.clipboard.writeText("URL_Artikel");
                  }}
                >
                  <i className="fas fa-copy"></i> Copy Link
                </Link>
              </Button> */}
            </div>
          </Col>
          <Col className="col-12 col-md-4 pt-1">
            <CardPopuler />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ArticlePage;
