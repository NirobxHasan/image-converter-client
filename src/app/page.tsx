"use client"
import Image from "next/image";
import { useState } from 'react';
import axios from 'axios';


export default function Home() {


  const [images, setImages] = useState([]);
  const [quality, setQuality] = useState(50);
  const [zipUrl, setZipUrl] = useState(null);

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
  };


  const handleQualityChange = (event) => {
    setQuality(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('quality', quality);

    try {
      const response = await axios.post('http://localhost:8000/convert_to_webp-batch/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/zip' });
      const zipUrl = URL.createObjectURL(blob);
      setZipUrl(zipUrl);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };




  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
<div>
      <h1 className="text-2xl font-bold mb-4">Image to WebP Converter</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Select Images:
          </label>
          <input type="file" id="images" name="images" multiple accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="mb-4">
          <label htmlFor="quality" className="block text-sm font-medium text-gray-700">
            Quality (1-100):
          </label>
          <input className="text-black" type="number" id="quality" name="quality" min="1" max="100" value={quality} onChange={handleQualityChange} />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Convert to WebP
        </button>
      </form>
      {zipUrl && (
        <div className="mt-4">
          <a href={zipUrl} download="converted_images.zip" className="text-blue-500 hover:underline">Download Converted Images</a>
        </div>
      )}
    </div>
      
    </main>
  );
}
