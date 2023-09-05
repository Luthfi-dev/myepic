import { useEffect, useState } from 'react';
import Image from 'next/image';
import { linkApi, publicApi } from '../../../utils/globals';

const AdminContent = ({kData, modal}) => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  // const [mediaData, setMediaData] = useState({ images: [], videos: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('image');
  const [totalMedia, setTotalMedia] = useState(0);
  const [dataAll, setDataAll] = useState([]);

  const handleMediaClick = (imageName) => {
    kData.media = imageName;
    modal(false);
    console.log(kData);
  };

  console.log(publicApi);
    // GET DATA API
  const fetchData = async () => {
    let mediaType = activeTab === 'image' ? 'image' : 'video';

    const countResponse = await fetch(`${linkApi}?page=${currentPage}&type=${mediaType}`);
    const countData = await countResponse.json();
    const totalCount = countData.total;

    setTotalMedia(totalCount);

    const response = await fetch(`${linkApi}?page=${currentPage}&type=${mediaType}`);
    const dataAmbil = await response.json();
    setDataAll(dataAmbil.data);
    console.log(response,dataAmbil.data)

};


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
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
      formData.append('nama', file);
    });
    formData.append('user_id', '1');

    try {
      const response = await fetch(`${linkApi}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Gambar berhasil diunggah ke API');
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
      const response = await fetch(`${linkApi}/${mediaId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Media berhasil dihapus.');
        fetchData();
      } else {
        console.error('Gagal menghapus media.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, activeTab]);

  // PAGENASI
const renderPagination = () => {
  const totalPages = Math.ceil(totalMedia / 5);

  if (totalPages <= 1) {
    return null;
  }

  const currentPageIndex = currentPage - 1;

  const renderPageButton = (pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
      className={`page-link rounded-circle ${currentPage === pageNumber ? 'active' : ''}`}
    >
      {pageNumber}
    </button>
  );

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {currentPage > 1 && (
            <>
              <li className="btn btn-light bordered" onClick={() => handlePageChange(1)}>previous</li>
              {currentPage > 2 && <span className="ellipsis">...</span>}
            </>
          )}

          {currentPage > 1 && renderPageButton(currentPage - 1)}

          {renderPageButton(currentPage)}

          {currentPage < totalPages && renderPageButton(currentPage + 1)}

          {currentPage < totalPages - 1 && <span className="ellipsis">...</span>}
          {currentPage < totalPages - 1 && renderPageButton(totalPages)}

          {currentPage < totalPages && (
            <li className="btn btn-light bordered" onClick={() => handlePageChange(totalPages)}>Next</li>
          )}
        </ul>
      </nav>
    </>
  );
};



  return (
    <>
      <section className="row">
        <div className="col-xxl-12 col-md-12">
          <div className="card info-card sales-card p-2">
            <div className="card-body">
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
                  <div className="row">
                    {dataAll.map((image) => (
                      <div key={image.id} className="col-md-3 mb-3">
                        <div className="d-flex flex-column align-items-center">
                          <Image src={`https://ex.luth.my.id/media/${image.nama}`} alt={image.id} width={200} height={200} objectFit="cover" onClick={() => handleMediaClick(image.nama)} />
                          <button onClick={() => deleteMedia(image.id)} className="btn btn-danger mt-2"><i className='bi bi-trash'></i></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {renderPagination()} 
                </div>
                <div className={`tab-pane fade ${activeTab === 'video' ? 'active show' : ''}`} id="bordered-justified-profile" role="tabpanel" aria-labelledby="videos-tab">
                  <div className="row">
                    {dataAll.map((video) => (
                      <div key={video.id} className="col-md-3 mb-3">
                        <video controls width="250" height="300">
                          <source src={`${publicApi}/${video.nama}`} onClick={() => handleMediaClick(video.nama)} />
                          Maaf, browser Anda tidak mendukung video ini.
                        </video>
                        <button onClick={() => deleteMedia(video.id)} className="btn btn-danger mt-2 btn-sm"><i className='bi bi-trash'></i> Media</button>
                        <button onClick={() => handleMediaClick(video.nama)} className="btn btn-primary mt-2 btn-sm" style={{backgroundColor:"#6776F4",color:"white"}}><i className='bi bi-check'></i> Pilih</button>
                      </div>
                    ))}
                  </div>
                  {renderPagination()} 
                </div>
                <div className="tab-pane fade" id="bordered-justified-contact" role="tabpanel" aria-labelledby="upload-tab">
                  <div className="container mt-5">
                    <div className="row justify-content-center">
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-body">
                            <div className="text-center mb-3">
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
