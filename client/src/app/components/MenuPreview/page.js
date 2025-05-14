"use client";
import React from "react";

const bannerImages = {
  restaurant:
    "https://img.freepik.com/free-photo/coworking-coffee-shop-owner-barista_1098-20960.jpg?ga=GA1.1.364166860.1747116538&semt=ais_hybrid&w=740",
  cafe: "https://img.freepik.com/free-photo/bar-with-coffee_23-2147821222.jpg?ga=GA1.1.364166860.1747116538&semt=ais_hybrid&w=740",
  bakery:
    "https://img.freepik.com/free-photo/delicious-donut-shop-ai-generated_23-2150694730.jpg?ga=GA1.1.364166860.1747116538&semt=ais_hybrid&w=740",
  beauty_salon:
    "https://img.freepik.com/free-photo/interior-latino-hair-salon_23-2150555185.jpg?ga=GA1.1.364166860.1747116538&semt=ais_hybrid&w=740",
  food_truck:
    "https://img.freepik.com/free-photo/people-ramadan-celebration_23-2151344679.jpg?ga=GA1.1.364166860.1747116538&semt=ais_hybrid&w=740",
};

const defaultLogo =
  "https://img.freepik.com/free-vector/vintage-restaurant-menu_23-2147491098.jpg?ga=GA1.1.364166860.1747116538&semt=ais_hybrid&w=740";

const MenuPreview = ({
  businessType,
  items,
  language,
  footerDetails,
  logo,
}) => {
  const banner =
    bannerImages[businessType] ||
    "https://images.unsplash.com/photo-1513757378314-e46255f6ed16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFubmVyfGVufDB8fDB8fHww";

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-sm">
        <div className="bg-black rounded-3xl border-4  border-gray-800 p-2 relative w-[320px] h-[600px] scale-70 overflow-hidden">
          <div className="bg-white h-full w-full rounded-xl overflow-y-auto">
            {/* Header with logo and banner */}
            <div className="relative w-full h-32">
              <img
                src={banner}
                alt="Banner"
                className="w-full h-full object-cover rounded-t-xl"
              />

              {logo && (
                <img
                  src={logo || defaultLogo}
                  alt="Business Logo"
                  className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full border-4 border-white bg-white"
                />
              )}
            </div>

            {/* Business Name and Description */}
            <div className="mt-8 px-4 text-center">
              <h2 className="text-lg font-bold text-gray-800 capitalize">
                {businessType}
              </h2>
              <p className="text-sm text-gray-500">Sample Menu Preview</p>
            </div>
            {language && (
              <p className="text-xs text-gray-400">
                Language: <span className="font-medium">{language}</span>
              </p>
            )}
            {/* Menu Items */}
            <div className="p-4 space-y-4">
              {items && items.length > 0 ? (
                items.map((item, index) => (
                  <div key={index} className="border-b pb-2 border-gray-200">
                    <div className="font-medium text-gray-800">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.description}
                    </div>
                    <div className="text-sm text-blue-600 font-semibold">
                      ₹{item.price}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 mt-20">No items yet</p>
              )}
            </div>
            {footerDetails && (
              <footer className="mt-6 border-t pt-3 text-sm text-gray-600">
                {footerDetails.address}, {footerDetails.city},{" "}
                {footerDetails.pincode}, {footerDetails.country}
              </footer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPreview;
