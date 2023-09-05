import React from "react";
import { publicApi } from "../../utils/globals";
import Image from "next/image";
import Head from "next/head";

const HomeIndex = () => {
  return (
    <>
      <Image
        src={`${publicApi}/default/coming-soon.png`}
        alt="Foto A"
        width={500}
        height={300}
        layout="responsive"
      />
    </>
  );
};

export default HomeIndex;
