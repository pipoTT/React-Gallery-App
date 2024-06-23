import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { imageDB } from "./firebase/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import "./GalleryPage.css";
const GalleryPage = () => {
  const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesRef = ref(imageDB, "files");
        const imageList = await listAll(imagesRef);
        const urlsPromises = imageList.items.map((itemRef) =>
          getDownloadURL(itemRef)
        );
        const urls = await Promise.all(urlsPromises);
        setImgUrl(urls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {imgUrl.map((url, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div class="card">
              <img src={url} className="img-fluid" alt={`Image ${index}`} />
              <button type="button" className="btn btn-light">
                <Link to="/details">
                  <div>Click to show details</div>
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
