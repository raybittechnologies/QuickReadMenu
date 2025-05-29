"use client";

import { register } from "@/app/utils/api";
import { useSearchParams } from "next/navigation";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URI } from "@/app/utils/constants";

export default function CreateBusiness({ params }) {
  const { slug } = use(params);
  const router = useRouter();

  const urlToFile = async (url, filename, mimeType) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   const checkUserLoggedIn = async () => {
  //     if (!token) return;

  //     try {
  //       const res = await axios.get(`${BASE_URI}/api/v1/auth/login`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (res?.data?.user) {
  //         router.push("/UserProfile");
  //       }
  //     } catch (err) {
  //       console.warn("Token invalid or user not logged in.");
  //     }
  //   };

  //   checkUserLoggedIn();
  // }, []);

  useEffect(() => {
    if (slug) {
      localStorage.setItem("token", slug);
    }
  }, [slug]);

  useEffect(() => {
    const generateAndSend = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const requiredKeys = [
        "selectedType",
        "selectedCountry",
        "selectedLanguage",
        "selectedBusiness",
        "businessDetails",
        "customLogo",
        "customBanner",
        "menuCategories",
        "items",
      ];

      // Redirect if any required sessionStorage item is missing
      const isMissingData = requiredKeys.some(
        (key) => !sessionStorage.getItem(key)
      );
      if (isMissingData) {
        router.push("/UserProfile");
        return;
      }

      const payload = {
        type: sessionStorage.getItem("selectedType"),
        country: sessionStorage.getItem("selectedCountry"),
        language: sessionStorage.getItem("selectedLanguage"),
        business: JSON.parse(sessionStorage.getItem("selectedBusiness")),
        details: JSON.parse(sessionStorage.getItem("businessDetails")),
        storedLogo: sessionStorage.getItem("customLogo"),
        storedBanner: sessionStorage.getItem("customBanner"),
        storedCategories: JSON.parse(sessionStorage.getItem("menuCategories")),
        items: JSON.parse(sessionStorage.getItem("items")),
      };

      const formData = new FormData();
      const asliPayload = {
        businessName: payload.business.name,
        businessType: payload.type,
        country: payload.details.country,
        language: payload.language,
        address: payload.details.address,
        add_city: payload.details.city,
        add_country: payload.details.country,
        add_zip: payload.details.pincode,
        add_phone: "9906990600",
        logo: payload.storedLogo,
        banner: payload.storedBanner,
        categories: payload.storedCategories,
        items: payload.items,
      };

      for (const key in asliPayload) {
        if (!["items", "categories", "logo", "banner"].includes(key)) {
          formData.append(key, asliPayload[key]);
        }
      }

      if (payload.storedLogo?.startsWith("data:image")) {
        const logoFile = await urlToFile(
          payload.storedLogo,
          "logo.png",
          "image/png"
        );
        formData.append("logo", logoFile);
      }

      if (payload.storedBanner?.startsWith("data:image")) {
        const bannerFile = await urlToFile(
          payload.storedBanner,
          "banner.png",
          "image/png"
        );
        formData.append("banner", bannerFile);
      }

      asliPayload.categories.forEach((category, index) => {
        formData.append(`categories[${index}]`, category);
      });

      for (const category in asliPayload.items) {
        asliPayload.items[category].forEach((item, index) => {
          formData.append(`items[${category}][${index}][name]`, item.name);
          formData.append(`items[${category}][${index}][price]`, item.price);
          formData.append(
            `items[${category}][${index}][description]`,
            item.description
          );
        });
      }

      try {
        const res = await register(formData);
        console.log("Business created:", res.data);
        router.push("/UserProfile");
      } catch (err) {
        console.error("Business creation failed:", err);
      }
    };

    const timeout = setTimeout(() => {
      if (typeof window !== "undefined" && localStorage.getItem("token")) {
        generateAndSend();
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}
