import { addBusiness } from "../utils/api";
import { bannerImages } from "../utils/constants";

const BusinessSetup = ({ selectedType, setSelectedType, setBanner }) => {
  // const [buisnessType, setBusinessType] = useState("");
  const handleAddBusiness = (e) => {
    const value = e.target.value;
    console.log(value);
    setSelectedType(value);
    addBusiness({ businesstype: value });

    const defaultBanner = bannerImages[value];
    if (defaultBanner) {
      setBanner(defaultBanner);
      localStorage.setItem("customBanner", defaultBanner);
      localStorage.setItem("customBannerUploaded", "false");
    }
  };

  const businessTypes = [
    { label: "Restaurant", value: "restaurant" },
    { label: "Café", value: "cafe" },
    { label: "Bakery", value: "bakery" },
    { label: "Food Truck", value: "food_truck" },
    { label: "Beauty Salon", value: "beauty_salon" },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Select Your Business Type
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {businessTypes.map((type) => (
          <button
            key={type.value}
            onClick={handleAddBusiness}
            value={type.value}
            className={` rounded-lg p-6 text-center transition-all duration-150 shadow-[2px_2px_14px_2px_#55c2c350] hover:scale-101 ${
              selectedType === type.value
                ? "bg-blue-100 border-blue-600 text-blue-800 font-semibold"
                : "bg-white border-gray-300 hover:border-blue-500"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default BusinessSetup;
