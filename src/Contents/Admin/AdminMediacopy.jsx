import { useEffect, useState } from 'react';
import Image from 'next/image';

const AdminContent = () => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mediaData, setMediaData] = useState({ images: [], videos: [] }); 

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
      formData.append('file', file); // Menggunakan 'file' sebagai nama field
    });
    formData.append('user_id', '1');

    try {
      const response = await fetch('http://localhost:9000/api/media', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Gambar berhasil diunggah ke API');
        console.log(response);
      } else {
        alert('Terjadi kesalahan saat mengunggah gambar');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/media');
        const data = await response.json();

        // Pisahkan data menjadi image dan video
        const images = data.filter((media) => media.type === 'image');
        const videos = data.filter((media) => media.type === 'video');

        console.log(images, videos);

        // Set data media ke dalam state
        setMediaData({ images, videos });
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data:', error);
      }
    };

    fetchData();
  }, []);


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
                  <button className="nav-link w-100 active" id="home-tab" data-bs-toggle="tab" data-bs-target="#bordered-justified-home" type="button" role="tab" aria-controls="image" aria-selected="true">Image</button>
                </li>
                <li className="nav-item flex-fill" role="presentation">
                  <button className="nav-link w-100" id="profile-tab" data-bs-toggle="tab" data-bs-target="#bordered-justified-profile" type="button" role="tab" aria-controls="videos" aria-selected="false" tabIndex="-1">Videos</button>
                </li>
                <li className="nav-item flex-fill" role="presentation">
                  <button className="nav-link w-100" id="contact-tab" data-bs-toggle="tab" data-bs-target="#bordered-justified-contact" type="button" role="tab" aria-controls="upload" aria-selected="false" tabIndex="-1">Upload</button>
                </li>
              </ul>
              <div className="tab-content pt-2" id="borderedTabJustifiedContent">
                <div className="tab-pane fade active show" id="bordered-justified-home" role="tabpanel" aria-labelledby="image-tab">
                  {/* TAMPIL MEDIA IMAGE DISINI */}
                  <div className="row">
                    {mediaData.images.map((image) => (
                      <div key={image.id} className="col-md-3 mb-3">
                        <img src={`http://localhost:9000/media/${image.nama}`} alt={image.nama} width={200} height={200} objectFit="cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="tab-pane fade" id="bordered-justified-profile" role="tabpanel" aria-labelledby="videos-tab">
                  {/* TAMPIL MEDIA VIDEO DISINI */}
                  <div className="row">
                    {mediaData.videos.map((video) => (
                      <div key={video.id} className="col-md-3 mb-3">
                        <video controls width="300">
                          <source src={`http://localhost:9000/media/${video.nama}`} type={video.mimetype} />
                          Maaf, browser Anda tidak mendukung video ini.
                        </video>
                      </div>
                    ))}
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

              {/* </div><!-- End Bordered Tabs Justified --> */}

            </div>
          </div>
          </div>
        </div>
    </section>
    </>
  );
}

export default AdminContent;

