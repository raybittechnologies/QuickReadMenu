"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/page";
import MenuPreview from "./components/MenuPreview/page";
import CountryLanguageSelect from "./countryLanguage/page";
import BusinessSetup from "./Select_Business/page";
import BusinessSearch from "./BusinessLocation/page";
import AddressForm from "./AddressForm/page";
import LogoUpload from "./logoUpload/page";

const steps = ["Business Type", "Add Items", "Customize Menu", "Generate QR"];

export default function Home() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businessDetails, setBusinessDetails] = useState(null);
  const [logo, setLogo] = useState(null);

  const defaultLogo =
    "https://img.freepik.com/free-vector/vintage-restaurant-menu_23-2147491098.jpg?ga=GA1.1.364166860.1747116538&semt=ais_hybrid&w=740";
  useEffect(() => {
    const savedStep = parseInt(localStorage.getItem("step"));
    const type = localStorage.getItem("selectedType");
    const country = localStorage.getItem("selectedCountry");
    const language = localStorage.getItem("selectedLanguage");
    const business = localStorage.getItem("selectedBusiness");
    const details = localStorage.getItem("businessDetails");
    const storedLogo = localStorage.getItem("customLogo");

    if (savedStep) setStep(savedStep);
    if (type) setSelectedType(type);
    if (country) setSelectedCountry(country);
    if (language) setSelectedLanguage(language);
    if (business) setSelectedBusiness(JSON.parse(business));
    if (details) setBusinessDetails(JSON.parse(details));
    if (storedLogo) {
      setLogo(storedLogo);
    } else {
      setLogo(defaultLogo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("step", step);
    localStorage.setItem("selectedType", selectedType || "");
    localStorage.setItem("selectedCountry", selectedCountry || "");
    localStorage.setItem("selectedLanguage", selectedLanguage || "");
    localStorage.setItem(
      "selectedBusiness",
      JSON.stringify(selectedBusiness || {})
    );
    localStorage.setItem(
      "businessDetails",
      JSON.stringify(businessDetails || {})
    );
  }, [
    step,
    selectedType,
    selectedCountry,
    selectedLanguage,
    selectedBusiness,
    businessDetails,
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
          localStorage.removeItem("customLogo");
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

      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center mb-8">
          {steps.map((label, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center relative"
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold ${
                  index + 1 <= step ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>
              <span className="text-xs text-center mt-1">{label}</span>
              {index < steps.length - 1 && (
                <div className="absolute top-4 left-full w-full h-0.5 bg-gray-300 z-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto px-6 pb-12 gap-10">
        <div className="flex-1">
          {step === 1 && (
            <BusinessSetup
              selectedType={selectedType}
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
                setStep(5);
              }}
            />
          )}
          {step === 5 && (
            <LogoUpload
              logo={logo}
              setLogo={setLogo}
              onComplete={() => setStep(6)}
            />
          )}
        </div>

        <div className="w-[360px] hidden lg:block">
          <MenuPreview
            businessType={selectedType}
            country={selectedCountry}
            language={selectedLanguage}
            businessInfo={selectedBusiness}
            footerDetails={businessDetails}
            logo={logo}
          />
        </div>
      </div>

      {step > 1 && (
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <button
            onClick={goToPrev}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>
        </div>
      )}
    </>
  );
}
