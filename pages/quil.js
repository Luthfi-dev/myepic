import React, { useState } from "react";
import dynamic from "next/dynamic";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const App = () => {
  const [value, setValue] = useState("");

  const handleChange = (value) => {
    setValue(value);
    console.log(value);
  };

  return (
    <div>
      <QuillEditor
        value={value}
        onChange={handleChange}
        style={{
          height: "500px",
          backgroundColor: "white",
          borderRadius: "5px",
          padding: "10px",
          maxHeight: "500px",
          // overflow: 'auto',
          // Menambahkan properti CSS untuk kustomisasi thumb scroll
          scrollbarColor: "darkgray lightgray", // Warna thumb dan track
          scrollbarWidth: "thin", // Lebar thumb
          // Efek 3D pada thumb scroll
          // overflowY: 'scroll', // Memaksa thumb scroll tampil selalu
          // boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)', // Efek 3D
        }}
      />
    </div>
  );
};

export default App;
