"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const BusinessSearch = ({ onSelect }) => {
  const inputRef = useRef(null);

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const initializeAutocomplete = () => {
      if (!window.google || !inputRef.current) return;

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["establishment"],
          fields: [
            "place_id",
            "geometry",
            "name",
            "formatted_address",
            "address_components",
          ],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        const { lat, lng } = place.geometry.location;

        let city = "",
          pincode = "",
          country = "";
        const addressComponents = place.address_components || [];

        for (const component of addressComponents) {
          const types = component.types;
          if (types.includes("locality")) city = component.long_name;
          if (types.includes("postal_code")) pincode = component.long_name;
          if (types.includes("country")) country = component.long_name;
        }

        onSelect({
          name: place.name || "",
          description: place.formatted_address || "",
          lat: lat(),
          lng: lng(),
          city,
          pincode,
          country,
        });
      });
    };

    // 👇 Call the function after it's declared
    if (window.google && window.google.maps) {
      initializeAutocomplete();
    } else if (isScriptLoaded) {
      initializeAutocomplete();
    }
  }, [isScriptLoaded]);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCfdv9Fo_Mxst5ASKrWXGh74YTskTlsHZ4&libraries=places`}
        strategy="afterInteractive"
        onLoad={() => setIsScriptLoaded(true)}
      />
      <div className="mt-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Search Your Business
        </label>
        <input
          ref={inputRef}
          className="border p-2 w-full rounded"
          placeholder="Search by name or address"
        />
      </div>
    </>
  );
};

export default BusinessSearch;
