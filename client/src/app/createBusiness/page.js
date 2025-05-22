"use client"; // Only needed in app router

import { useEffect } from "react";
import axios from "axios";
import { register } from "../utils/api";

export default function createBusiness() {
  const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
  };

  useEffect(() => {
    const generateAndSend = async () => {
      const payload = {};
      payload.type = sessionStorage.getItem("selectedType");
      payload.country = sessionStorage.getItem("selectedCountry");
      payload.language = sessionStorage.getItem("selectedLanguage");
      payload.business = JSON.parse(sessionStorage.getItem("selectedBusiness"));
      payload.details = JSON.parse(sessionStorage.getItem("businessDetails"));
      payload.storedLogo = sessionStorage.getItem("customLogo");
      payload.storedBanner = sessionStorage.getItem("customBanner");
      payload.storedCategories = JSON.parse(
        sessionStorage.getItem("menuCategories")
      );
      payload.items = JSON.parse(sessionStorage.getItem("items"));
      const asliPayload = {};
      asliPayload.businessName = payload.business.name;
      asliPayload.businessType = payload.type;
      asliPayload.country = payload.details.country;
      asliPayload.language = payload.language;
      asliPayload.address = payload.details.address;
      asliPayload.add_city = payload.details.city;
      asliPayload.add_country = payload.details.country;
      asliPayload.add_zip = payload.details.pincode;
      asliPayload.add_phone = "9906990600";
      asliPayload.logo = payload.storedLogo;
      asliPayload.banner = payload.storedBanner;
      asliPayload.categories = payload.storedCategories;
      asliPayload.items = payload.items;
      console.log(asliPayload);

      const formData = new FormData();
      // Add simple fields
      for (const key in asliPayload) {
        if (
          key !== "items" &&
          key !== "categories" &&
          key !== "logo" &&
          key !== "banner"
        ) {
          formData.append(key, asliPayload[key]);
        }
      }

      const logoFile = await urlToFile(
        payload.storedLogo,
        "logo.png",
        "image/png"
      );
      const bannerFile = await urlToFile(
        payload.storedBanner,
        "banner.png",
        "image/png"
      );

      formData.append("logo", logoFile);
      formData.append("banner", bannerFile);

      // Handle categories array
      asliPayload.categories.forEach((category, index) => {
        formData.append(`categories[${index}]`, category);
      });

      // Handle nested items object
      for (const category in asliPayload.items) {
        console.log(category);
        asliPayload.items[category].forEach((item, index) => {
          console.log(item);
          formData.append(`items[${category}][${index}][name]`, item.name);
          formData.append(`items[${category}][${index}][price]`, item.price);
          formData.append(
            `items[${category}][${index}][description]`,
            item.description
          );
        });
      }
      // Debug output (for dev use only)
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      register(formData)
        .then((res) => {
          console.log("Response:", res.data);
          // Handle success (e.g., redirect or show a message)
        })
        .catch((err) => {
          console.error("Error:", err);
          // Handle error (e.g., show an error message)
        });
    };

    // Only run in browser (where sessionStorage is available)
    if (typeof window !== "undefined") {
      generateAndSend();
    }
  }, []);

  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}
