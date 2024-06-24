import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhotoUploader from "./firebase/PhotoUploader";
import "./App.css";
import GalleryPage from "./GalleryPage";
import DetailsPage from "./DetailsPage";
const App = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<PhotoUploader />}></Route>
            <Route path="/gallery" element={<GalleryPage />}></Route>

            <Route path="/details" element={<DetailsPage />}></Route>
            {/* Add more routes for other pages if needed */}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
