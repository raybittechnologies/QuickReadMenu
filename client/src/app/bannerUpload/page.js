"use client";

import { useState, useEffect } from "react";

export default function BannerUpload({ banner, setBanner, onComplete }) {
  const [previewUrl, setPreviewUrl] = useState(banner || null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setPreviewUrl(base64);
      setBanner(base64);
      localStorage.setItem("customBanner", base64);
    };
    reader.readAsDataURL(file);
  };

  const useDefaultBanner = () => {
    const defaultBanner =
      "https://img.freepik.com/free-vector/vintage-restaurant-menu_23-2147491098.jpg?ga=GA1.1.364166860.1747116538&semt=ais_hybrid&w=740";
    setPreviewUrl(defaultBanner);
    setBanner(defaultBanner);
    localStorage.removeItem("customBanner");
  };

  useEffect(() => {
    const stored = localStorage.getItem("customBanner");
    if (stored) {
      setPreviewUrl(stored);
      setBanner(stored);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Upload Your Banner</h2>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Banner Preview"
            className="h-24 object-contain mb-4"
          />
        ) : (
          <div className="text-gray-400 mb-4">No banner selected</div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block mb-2"
        />
        <button
          onClick={useDefaultBanner}
          className="text-blue-500 underline text-sm"
        >
          Use default banner
        </button>
      </div>

      {onComplete && (
        <button
          onClick={onComplete}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Continue
        </button>
      )}
    </div>
  );
}
