import React, { useEffect, useRef } from "react";
// import $ from "jquery"; // Import jQuery

// const DataTable = ({ data }) => {
//   const tableRef = useRef(null);

//   useEffect(() => {
//     // Inisialisasi datatables
//     $(tableRef.current).DataTable();
//   }, []);

//   return (
//     <table ref={tableRef} className="display">
//       <thead>
//         <tr>
//           <th>Email</th>
//           <th>Nama</th>
//           <th>Status Active</th>
//           <th>Status Login</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((user, index) => (
//           <tr key={index}>
//             <td>{user.email}</td>
//             <td>{user.nama}</td>
//             <td>{user.status_active}</td>
//             <td>{user.status_login}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// const data = [
//   {
//     email: "email1@example.com",
//     nama: "Nama 1",
//     status_active: "Active",
//     status_login: "Yes",
//   },
//   {
//     email: "email2@example.com",
//     nama: "Nama 2",
//     status_active: "Deactive",
//     status_login: "Not",
//   },
//   // ...Tambahkan data lainnya
// ];

const App = () => {
  return (
    <div>
      <h1>Data Pengguna</h1>
      {/* <DataTable data={data} /> */}
    </div>
  );
};

export default App;
