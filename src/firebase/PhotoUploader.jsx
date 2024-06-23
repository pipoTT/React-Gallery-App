import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { imageDB, firestoreDB } from "./firebase";

import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import "../App.css";
import "../PhotoUpload.css";
import "bootstrap/dist/css/bootstrap.css";

function PhotoUploader() {
  const [img, setImg] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgData, setImgData] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  const handleClick = async () => {
    if (img && name && description) {
      const imgRef = ref(imageDB, `files/${uuidv4()}`);
      try {
        const snapshot = await uploadBytes(imgRef, img);
        const url = await getDownloadURL(snapshot.ref);
        await addDoc(collection(firestoreDB, "images"), {
          name: name,
          description: description,
          url: url,
          createdAt: new Date(),
        });
        setImgData((prevData) => [...prevData, { name, description, url }]);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      alert("Please provide name, description, and select an image.");
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestoreDB, "images"));
        const images = [];
        querySnapshot.forEach((doc) => {
          images.push(doc.data());
        });
        setImgData(images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="App">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card text-center">
              <div className="card-body">
                <h2 className="card-title mb-4">Upload Image</h2>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <br />
                <div className="form-group">
                  <label>Choose Image:</label>
                  <input
                    type="file"
                    className="form-control-file"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                </div>
                <br />
                <br />
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Upload 📸
                </button>
                <br />
                <br />
                <button type="button" className="btn btn-secondary">
                  <Link to="/gallery" className="btnchange">
                    Go to Gallery
                  </Link>
                </button>
                <div className="outer-grid">
                  {imgData.map((image, index) => (
                    <div key={index} className="inner-grid">
                      <img
                        src={image.url}
                        alt={`Uploaded ${index}`}
                        height="100px"
                        width="200px"
                      />
                      <p>
                        <strong>Name:</strong> {image.name}
                      </p>
                      <p>
                        <strong>Description:</strong> {image.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoUploader;
