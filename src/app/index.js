import React from "react";
import { useEffect, useState } from "react";
import { kategoriApiUser, publicApi } from "../../utils/globals";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import ImageCarousel from "@/components/RootApp/carausel";
import TabScroll from "@/components/RootApp/NavCategory";
import CardArtikel from "@/components/RootApp/CardArtikel";
import CardArtikelText from "@/components/RootApp/CardArtikelText";
import { CardVideo } from "@/components/RootApp/CardVideo";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import CardPopuler from "@/components/RootApp/CardPopuler";

const HomeIndex = () => {
  const router = useRouter();
  const [pilihKategori, setPilihKategori] = useState(0);
  const [categories, setCategories] = useState(["all"]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${kategoriApiUser}`);
      const dataK = response.data;
      console.log("Data Kategori:", dataK);

      // Extract unique categories from the data
      const uniqueCategories = Array.from(
        new Set(dataK.map((item) => item.nama_kategori))
      );

      console.log("Kategori Unik:", uniqueCategories);

      // Tambahkan "all" di awal array
      const categoriesWithAll = ["all", ...uniqueCategories];

      setCategories(categoriesWithAll);

      // Tampilkan categories setelah pembaruan state
      console.log("Categories setelah pembaruan:", uniqueCategories);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil data dari API:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container-fluid col-md-8 p-0">
        <ImageCarousel />
        <hr
          style={{ color: "#4352EF", margin: "0", border: "2px solid #4352EF" }}
        />
        <TabScroll pKategori={setPilihKategori} categories={categories} />
        <div className="row">
          <div className="col-lg-8 mt-2 bordered">
            <CardArtikel
              categories={categories}
              pKategori={pilihKategori}
              sx={{ height: "100%" }}
            />
            <hr />
            <CardVideo sx={{ height: "100%" }} />
          </div>
          <div className="col-lg-4 mt-2 bordered">
            <CardArtikelText sx={{ height: "100%" }} />
            <CardPopuler className="mt-2" />
          </div>
        </div>
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
