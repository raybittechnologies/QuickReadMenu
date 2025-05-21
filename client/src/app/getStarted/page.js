"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/page";
import MenuPreview from "../components/MenuPreview/page";
import CountryLanguageSelect from "../countryLanguage/page";
import BusinessSetup from "../Select_Business/page";
import BusinessSearch from "../BusinessLocation/page";
import AddressForm from "../AddressForm/page";
import LogoUpload from "../logoUpload/page";
import BannerUpload from "../bannerUpload/page";
import { bannerImages } from "../utils/constants";
import MenuCategoryManager from "../MenuCategories/page";
import CategoryItemsManager from "../CategoryItems/page";

const steps = [
  "Business Type",
  "Country",
  "Search Business",
  "Confirm Address",
  "Upload Logo",
  "Upload Banner",
  "Add Categories",
  "Add Items",
];

export default function Home() {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businessDetails, setBusinessDetails] = useState(null);
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);

  const defaultLogo =
    "https://img.freepik.com/free-vector/vintage-restaurant-menu_23-2147491098.jpg?ga=GA1.1.364166860.1747116538&semt=ais_hybrid&w=740";
  const defaultBanner =
    "https://img.freepik.com/free-vector/vintage-restaurant-menu_23-2147491098.jpg?ga=GA1.1.364166860.1747116538&semt=ais_hybrid&w=740";

  useEffect(() => {
    const savedStep = parseInt(sessionStorage.getItem("step") || "1");
    const type = sessionStorage.getItem("selectedType");
    const country = sessionStorage.getItem("selectedCountry");
    const language = sessionStorage.getItem("selectedLanguage");
    const business = sessionStorage.getItem("selectedBusiness");
    const details = sessionStorage.getItem("businessDetails");
    const storedLogo = sessionStorage.getItem("customLogo");
    const storedBanner = sessionStorage.getItem("customBanner");
    const storedCategories = sessionStorage.getItem("menuCategories");

    setStep(savedStep);
    if (type) setSelectedType(type);
    if (country) setSelectedCountry(country);
    if (language) setSelectedLanguage(language);
    if (business) setSelectedBusiness(JSON.parse(business));
    if (details) setBusinessDetails(JSON.parse(details));
    setLogo(storedLogo || defaultLogo);
    setBanner(storedBanner || bannerImages[type] || defaultBanner);
    if (storedCategories) setCategories(JSON.parse(storedCategories));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("step", step.toString());
    sessionStorage.setItem("selectedType", selectedType || "");
    sessionStorage.setItem("selectedCountry", selectedCountry || "");
    sessionStorage.setItem("selectedLanguage", selectedLanguage || "");
    sessionStorage.setItem(
      "selectedBusiness",
      JSON.stringify(selectedBusiness || {})
    );
    sessionStorage.setItem(
      "businessDetails",
      JSON.stringify(businessDetails || {})
    );
    if (logo) sessionStorage.setItem("customLogo", logo);
    if (banner) sessionStorage.setItem("customBanner", banner);
    sessionStorage.setItem("menuCategories", JSON.stringify(categories || []));
  }, [
    step,
    selectedType,
    selectedCountry,
    selectedLanguage,
    selectedBusiness,
    businessDetails,
    logo,
    banner,
    categories,
  ]);

  const goToNext = () => setStep((prev) => prev + 1);

  const goToPrev = () => {
    setStep((prev) => {
      const newStep = Math.max(prev - 1, 1);

      switch (prev) {
        case 2:
          setSelectedType(null);
          break;
        case 3:
          setSelectedCountry(null);
          setSelectedLanguage(null);
          break;
        case 4:
          setSelectedBusiness(null);
          break;
        case 5:
          setBusinessDetails(null);
          break;
        case 6:
          setLogo(defaultLogo);
          sessionStorage.removeItem("customLogo");
          break;
        case 7:
          setBanner(defaultBanner);
          sessionStorage.removeItem("customBanner");
          break;
        case 8:
          setCategories([]);
          sessionStorage.removeItem("menuCategories");
          break;
        default:
          break;
      }

      return newStep;
    });
  };

  return (
    <>
      <Navbar />

      {/* Stepper UI */}
      <div className="w-full overflow-x-auto">
        <div className="max-w-3xl md:mx-8 px-4 py-4 min-w-[500px] sm:min-w-0">
          <div className="flex justify-between items-center mb-8 relative space-x-4">
            {steps.map((label, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center relative min-w-[60px]"
              >
                {/* Step Circle */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold z-10 ${
                    index + 1 <= step ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </div>

                {/* Label */}
                <span className="text-[8px] md:text-xs text-center mt-1 whitespace-nowrap">
                  {label}
                </span>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-4 left-1/2 w-full h-0.5 bg-gray-300 z-0 -translate-x-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex max-w-7xl mx-auto px-6 pb-12 gap-10">
        <div className="flex-1">
          {step === 1 && (
            <BusinessSetup
              selectedType={selectedType}
              setBanner={setBanner}
              setSelectedType={(type) => {
                setSelectedType(type);
                goToNext();
              }}
            />
          )}

          {step === 2 && (
            <CountryLanguageSelect
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              onNext={goToNext}
            />
          )}

          {step === 3 && (
            <BusinessSearch
              onSelect={(business) => {
                setSelectedBusiness(business);
                goToNext();
              }}
            />
          )}

          {step === 4 && selectedBusiness && (
            <AddressForm
              business={selectedBusiness}
              onComplete={(details) => {
                setBusinessDetails(details);
                goToNext();
              }}
            />
          )}

          {step === 5 && (
            <LogoUpload logo={logo} setLogo={setLogo} onComplete={goToNext} />
          )}

          {step === 6 && (
            <BannerUpload
              banner={banner}
              setBanner={setBanner}
              onComplete={goToNext}
            />
          )}
          {step === 7 && (
            <MenuCategoryManager
              categories={categories}
              setCategories={setCategories}
              onNext={goToNext}
            />
          )}
          {step === 8 && (
            <CategoryItemsManager
              categories={categories}
              setCategories={setCategories}
            />
          )}
          {step > 1 && (
            <div className="max-w-7xl mt-8 mx-auto pb-8">
              <button
                onClick={goToPrev}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Back
              </button>
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="w-[390px] hidden md:block">
          <MenuPreview
            businessType={selectedType}
            country={selectedCountry}
            language={selectedLanguage}
            businessInfo={selectedBusiness}
            footerDetails={businessDetails}
            logo={logo}
            bannerProp={banner}
            categories={categories}
          />
        </div>
      </div>
    </>
  );
}
