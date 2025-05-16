"use client";
import { bannerImages, fallbackBanner } from "@/app/utils/constants";
import React from "react";

const MenuPreview = ({
  businessType,
  items,
  language,
  footerDetails,
  logo,
  bannerProp,
  categories = [],
}) => {
  const selectedBanner =
    bannerProp || bannerImages[businessType] || fallbackBanner;
  return (
    <div className="w-full flex justify-center relative -top-40">
      <div className=" w-[350px] h-[667px] bg-black rounded-[50px] border-[14px] border-black scale-75 shadow-xl">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-38 h-4 bg-black rounded-b-[10px] z-10"></div>

        <div className="w-full h-full bg-white overflow-y-auto scrollbar-hide rounded-[36px]">
          <div className="relative w-full h-42 rounded-t-[36px] overflow-hidden">
            <img
              src={bannerProp || bannerImages[businessType] || fallbackBanner}
              alt="Banner"
              className="w-full h-full object-cover"
            />
            {logo && (
              <img
                src={logo}
                alt="Business Logo"
                className="absolute bottom-[0px] left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full border-2 border-white bg-white"
              />
            )}
          </div>

          {/* Business Info */}
          <div className="mt-4 px-2 text-center">
            <h2 className="text-lg font-bold text-gray-800 capitalize">
              {footerDetails?.name || businessType}
            </h2>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500 font-medium">
                Sample Menu Preview
              </p>
              {language && (
                <p className="text-sm text-gray-400">
                  Language:{" "}
                  <span className="font-medium text-gray-500">{language}</span>
                </p>
              )}
            </div>
          </div>
          <div className="p-4 space-y-6 h-1/2 overflow-y-auto scrollbar-hide">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-md font-semibold text-blue-800 mb-2">
                    {category.name}
                  </h3>

                  {category.items && category.items.length > 0 ? (
                    <ul className="space-y-2">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-700">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-gray-500">
                            {item.description}
                          </div>
                          <div className="text-blue-600 font-semibold">
                            ₹{item.price}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <h3 className="text-md font-semibold text-blue-800 mb-2">
                        {category}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        No items added yet
                      </p>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 mt-20">
                No categories yet
              </p>
            )}
          </div>

          {/* Menu Items */}
          {/* <div className="p-4 space-y-4">
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
          </div> */}

          {/* Footer */}
          {footerDetails && (
            <footer className="mt-2 border-t pt-3 text-sm text-gray-600 px-4 pb-6">
              {footerDetails.address} {footerDetails.city}{" "}
              {footerDetails.pincode} {footerDetails.country}
            </footer>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPreview;
