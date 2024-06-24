import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firestoreDB } from "./firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./GalleryPage.css";

const GalleryPage = () => {
  const [imgData, setImgData] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch image metadata from Firestore
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
    <div className="container mt-5">
      <div className="row">
        {imgData.map((data, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img src={data.url} className="img-fluid" alt={`Image ${index}`} />
              <div className="card-body">
                <h5 className="card-title">{data.name}</h5>
                <p className="card-text">{data.description}</p>
                <button type="button" className="btn btn-light">
                  <Link to="/details">
                    <div>Click to show details</div>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;