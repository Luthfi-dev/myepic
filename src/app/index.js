import React from "react";
import { publicApi } from "../../utils/globals";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const HomeIndex = () => {
  const router = useRouter();

  function linkKe(link) {
    router.push(link);
  }

  return (
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
