// "use client";
// import { useEffect, useState } from "react";

// const AddressForm = ({ business, onComplete }) => {
//   const [formData, setFormData] = useState({
//     name: business.description || "",
//     address: "",
//     city: "",
//     country: "",
//     pincode: "",
//   });

//   useEffect(() => {
//     if (business?.description) {
//       setFormData((prev) => ({
//         ...prev,
//         address: business.description,
//       }));
//     }
//   }, [business]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onComplete(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 mt-6">
//       <h2 className="text-xl font-semibold text-gray-800">
//         Enter Business Details
//       </h2>

//       <input
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         placeholder="Business Name"
//         className="w-full p-2 border rounded"
//         required
//       />

//       <div className="flex gap-4">
//         <input
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//           placeholder="City"
//           className="flex-1 p-2 border rounded"
//           required
//         />
//         <input
//           name="country"
//           value={formData.country}
//           onChange={handleChange}
//           placeholder="Country"
//           className="flex-1 p-2 border rounded"
//           required
//         />
//         <input
//           name="pincode"
//           value={formData.pincode}
//           onChange={handleChange}
//           placeholder="Pincode"
//           className="flex-1 p-2 border rounded"
//           required
//         />
//       </div>

//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Save & Continue
//       </button>
//     </form>
//   );
// };

// export default AddressForm;

"use client";

import { useEffect, useState } from "react";

export default function AddressForm({ business, onComplete }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (business) {
      setName(business.name || "");
      setAddress(business.description || "");
      setCity(business.city || "");
      setPincode(business.pincode || "");
      setCountry(business.country || "");
    }
  }, [business]);

  const handleSubmit = () => {
    onComplete({
      name,
      address,
      city,
      pincode,
      country,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold">Business Name</label>
        <input
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold">Address</label>
        <input
          className="w-full p-2 border rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold">City</label>
        <input
          className="w-full p-2 border rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold">Pincode</label>
        <input
          className="w-full p-2 border rounded"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold">Country</label>
        <input
          className="w-full p-2 border rounded"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Continue
      </button>
    </div>
  );
}
