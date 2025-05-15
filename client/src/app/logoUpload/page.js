/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";

export default function LogoUpload({ logo, setLogo, onComplete }) {
  const [previewUrl, setPreviewUrl] = useState(logo || null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setPreviewUrl(base64);
      setLogo(base64);
      localStorage.setItem("customLogo", base64);
    };
    reader.readAsDataURL(file);
  };

  const useDefaultLogo = () => {
    const defaultLogo = "/default-logo.png"; // Update path if needed
    setPreviewUrl(defaultLogo);
    setLogo(defaultLogo);
    localStorage.removeItem("customLogo");
  };

  useEffect(() => {
    const stored = localStorage.getItem("customLogo");
    if (stored) {
      setPreviewUrl(stored);
      setLogo(stored);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Upload Your Logo</h2>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Logo Preview"
            className="h-24 object-contain mb-4"
          />
        ) : (
          <div className="text-gray-400 mb-4">No logo selected</div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block mb-2"
        />
        <button
          onClick={useDefaultLogo}
          className="text-blue-500 underline text-sm"
        >
          Use default logo
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
