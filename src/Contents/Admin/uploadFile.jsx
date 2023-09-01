import Image from "next/image";
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const FileUploadCard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleImageClick = (imageName) => {
    setSelectedFile(imageName);
    const inputElement = document.getElementById("n_foto");
    if (inputElement) {
        inputElement.value = imageName;
    }
    closeModal();
  };


  const handleDeleteImage = () => {
    setSelectedFile(null);
  };

  const imageList = ['1.jpg','2.jpg'];

  return (
    <div className="file-upload-card p-3 text-center">
      <label htmlFor="file-upload" className="upload-button">
        {!selectedFile && (
          <button onClick={openModal}>Pilih Media</button>
        )}
      </label>
      {selectedFile && (
        <div className="selected-image">
          <img src={`/assets/gambar/${selectedFile}`} alt={selectedFile} width={300} height={200} />
          <button
            className="close-icon"
            onClick={handleDeleteImage}
          >
            &#10006;
          </button>
          {/* <input type="text" name="media" id="n_foto" /> */}
        </div>
      )}

      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Select Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="image-list">
            {imageList.map((imageName, index) => (
            <img
              key={index}
              src={`/assets/gambar/${imageName}`}
              alt={imageName}
              className="image-item"
              onClick={() => handleImageClick(imageName)}
              width={300}
              style={{margin : "5px"}}
            />
))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .file-upload-card {
          border: 2px dashed #ccc;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .selected-image img {
          max-width: 300px;
          height: auto;
          border: 2px solid #ccc;
        }

        .close-icon {
          position: absolute;
          top: -10px;
          right: -10px;
          background-color: red;
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          font-size: 12px;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default FileUploadCard;
