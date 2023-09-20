import { useEffect } from "react";
import { useRouter } from "next/router";

const reLogin = () => {
  const router = useRouter();

  useEffect(() => {
    // Cek apakah kode dijalankan di sisi klien (browser)
    if (typeof window !== "undefined") {
      // Redirect ke halaman login di sisi klien
      window.location.href = "/super-admin";
    } else {
      // Jika dijalankan di sisi server, gunakan Next.js router untuk mengarahkan pengguna
      router.push("/super-admin");
    }
  }, []);

  return null; // Komponen ini tidak memiliki tampilan, sehingga return null
};

export default reLogin;
