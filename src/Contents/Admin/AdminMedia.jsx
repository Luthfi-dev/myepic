import { useEffect, useState } from 'react';
import Image from 'next/image';

const AdminContent = () => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mediaData, setMediaData] = useState({ images: [], videos: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState('image'); // Default tab aktif adalah 'image'

  // Definisikan fungsi isImage untuk memeriksa apakah media adalah gambar berdasarkan ekstensinya
  const isImage = (media) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    const fileExtension = media.nama.substring(media.nama.lastIndexOf('.')).toLowerCase();
    return imageExtensions.includes(fileExtension);
  };

  // Definisikan fungsi isVideo untuk memeriksa apakah media adalah video berdasarkan ekstensinya
  const isVideo = (media) => {
    const videoExtensions = ['.mp4', '.avi', '.mkv', '.mov', '.wmv'];
    const fileExtension = media.nama.substring(media.nama.lastIndexOf('.')).toLowerCase();
    return videoExtensions.includes(fileExtension);
  };

  // Fungsi untuk mengubah tab aktif
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Fungsi untuk menghitung indeks awal dan akhir untuk paginasi
  const calculatePagination = () => {
    const itemsPerPage = 9; // Ubah sesuai kebutuhan Anda
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return { startIdx, endIdx, itemsPerPage };
  };

  // Definisikan fetchData di atas penggunaan pertama kali
  const fetchData = async () => {
    try {
      const { startIdx, endIdx, itemsPerPage } = calculatePagination();
      const response = await fetch(`https://ex.luth.my.id/api/media?page=${currentPage}`);
      const data = await response.json();

      // Pisahkan data menjadi image dan video
      const images = data.filter((media) => isImage(media)); // Fungsi isImage harus Anda definisikan
      const videos = data.filter((media) => isVideo(media)); // Fungsi isVideo harus Anda definisikan

      // Ambil data gambar atau video untuk halaman saat ini sesuai dengan tab yang aktif
      let currentMedia = [];
      let totalMediaPages = 1;

      if (activeTab === 'image') {
        currentMedia = images.slice(startIdx, endIdx);
        totalMediaPages = Math.ceil(images.length / itemsPerPage);
      } else if (activeTab === 'video') {
        currentMedia = videos.slice(startIdx, endIdx);
        totalMediaPages = Math.ceil(videos.length / itemsPerPage);
      }

      // Set data media ke dalam state
      setMediaData({ images: currentMedia, videos: currentMedia });
      setTotalPages(totalMediaPages);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data:', error);
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    setIsFileSelected(files.length > 0);
    setSelectedFiles([...files]);
  };

  const handleFileUpload = async () => {
    if (!selectedFiles.length) {
      alert('Pilih file terlebih dahulu');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('nama', file); // Menggunakan 'file' sebagai nama field
    });
    formData.append('user_id', '1');

    try {
      const response = await fetch('https://ex.luth.my.id/api/media', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Gambar berhasil diunggah ke API');
        console.log(response);
        // Refresh daftar media setelah mengunggah
        fetchData();
      } else {
        alert('Terjadi kesalahan saat mengunggah gambar');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  const deleteMedia = async (mediaId) => {
    try {
      const response = await fetch(`https://ex.luth.my.id/api/media/${mediaId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Media berhasil dihapus.');
        // Refresh daftar media setelah menghapus
        fetchData();
      } else {
        console.error('Gagal menghapus media.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  // Panggil fetchData saat komponen dimuat atau currentPage atau activeTab berubah
  useEffect(() => {
    fetchData();
  }, [currentPage, activeTab]);

  return (
    <>
      <div className="pagetitle">
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active">Media</li>
          </ol>
        </nav>
      </div>
      {/* section kontent */}
      <section className="row">
        <div className="col-xxl-12 col-md-12">
          <div className="card info-card sales-card p-2">
            <div className="card-body">
              {/* <!-- Bordered Tabs Justified --> */}
              <ul className="nav nav-tabs nav-tabs-bordered d-flex" id="borderedTabJustified" role="tablist">
                <li className="nav-item flex-fill" role="presentation">
                  <button
                    className={`nav-link w-100 ${activeTab === 'image' ? 'active' : ''}`}
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#bordered-justified-home"
                    type="button"
                    role="tab"
                    aria-controls="image"
                    aria-selected={activeTab === 'image'}
                    onClick={() => handleTabChange('image')}
                  >
                    Image
                  </button>
                </li>
                <li className="nav-item flex-fill" role="presentation">
                  <button
                    className={`nav-link w-100 ${activeTab === 'video' ? 'active' : ''}`}
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#bordered-justified-profile"
                    type="button"
                    role="tab"
                    aria-controls="videos"
                    aria-selected={activeTab === 'video'}
                    onClick={() => handleTabChange('video')}
                  >
                    Videos
                  </button>
                </li>
                <li className="nav-item flex-fill" role="presentation">
                  <button className="nav-link w-100" id="contact-tab" data-bs-toggle="tab" data-bs-target="#bordered-justified-contact" type="button" role="tab" aria-controls="upload" aria-selected="false" tabIndex="-1">Upload</button>
                </li>
              </ul>
              <div className="tab-content pt-2" id="borderedTabJustifiedContent">
                <div className={`tab-pane fade ${activeTab === 'image' ? 'active show' : ''}`} id="bordered-justified-home" role="tabpanel" aria-labelledby="image-tab">
                  {/* TAMPIL MEDIA IMAGE DISINI */}
                  <div className="row">
                    {mediaData.images.map((image) => (
                      <div key={image.id} className="col-md-3 mb-3">
                        <div className="d-flex flex-column align-items-center">
                          <Image src={`https://ex.luth.my.id/media/${image.nama}`} alt={image.nama} width={200} height={200} objectFit="cover" />
                          <button onClick={() => deleteMedia(image.id)} className="btn btn-danger mt-2"><i className='bi bi-trash'></i></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Tombol paginasi */}
                  <div className="pagination">
                    {currentPage > 1 && (
                      <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                    )}
                    {currentPage < totalPages && (
                      <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    )}
                  </div>
                </div>
                <div className={`tab-pane fade ${activeTab === 'video' ? 'active show' : ''}`} id="bordered-justified-profile" role="tabpanel" aria-labelledby="videos-tab">
                  {/* TAMPIL MEDIA VIDEO DISINI */}
                  <div className="row">
                    {mediaData.videos.map((video) => (
                      <div key={video.id} className="col-md-3 mb-3">
                        <video controls width="250">
                          <source src={`https://ex.luth.my.id/media/${video.nama}`} type={video.mimetype} />
                          Maaf, browser Anda tidak mendukung video ini.
                        </video>
                        <button onClick={() => deleteMedia(video.id)} className="btn btn-danger mt-2">Hapus Media</button>
                      </div>
                    ))}
                  </div>
                  {/* Tombol paginasi */}
                  <div className="pagination">
                    {currentPage > 1 && (
                      <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                    )}
                    {currentPage < totalPages && (
                      <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    )}
                  </div>
                </div>
                <div className="tab-pane fade" id="bordered-justified-contact" role="tabpanel" aria-labelledby="upload-tab">
                  <div className="container mt-5">
                    <div className="row justify-content-center">
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-body">
                            <div className="text-center mb-3">
                              {/* Logo Upload */}
                              <Image src="/assets/img/logos-upload.png" width={200} height={200} objectFit="contain" alt="Logo Upload" className="img-fluid" />
                            </div>
                            <form>
                              <div className="mb-3">
                                <input type="file" name="nama" className="btn form-control btn-light" id="media" multiple onChange={handleFileChange} />
                              </div>
                              <button type="button" className="btn btn-dark w-100" onClick={handleFileUpload} disabled={!isFileSelected}>Upload</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminContent;
