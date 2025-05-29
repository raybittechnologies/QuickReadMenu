"use client";
import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaUtensils,
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaFolderOpen,
  FaEdit,
  FaArrowDown,
  FaUserCog,
  FaCreditCard,
  FaFile,
  FaCloud,
  FaGlobe,
  FaBalanceScale,
} from "react-icons/fa";
import Button from "../components/Button/page";
import {
  addNewCategory,
  addNewProduct,
  deleteCategory,
  getCategories,
  getMyQr,
  getPublished,
  getQrMenu,
} from "../utils/api";
import AddCategoryModal from "../components/Modals/categorymodal";
import AddProductModal from "../components/Modals/addProductModal";
import { BASE_URI } from "../utils/constants";
import { useRouter } from "next/navigation";
import LogoutConfirmationModal from "../components/Modals/logoutModal";
// import { BASE_URI } from "../utils/constants";

const tabs = [
  { id: "home", label: "Home", icon: FaHome },
  {
    id: "menu",
    label: "Menu",
    icon: FaUtensils,
    subOptions: [
      { id: "add-category", label: "Add Category", icon: FaPlus },
      { id: "add-product", label: "Add Product", icon: FaFolderOpen },
      { id: "customize", label: "Customize", icon: FaEdit },
    ],
  },

  { id: "settings", label: "Settings", icon: FaCog },
  { id: "logout", label: "Log Out", icon: FaSignOutAlt },
];
const settingsOptions = [
  {
    title: "General",
    description: "View and update your store details",
    icon: <FaCog className="w-5 h-5 text-[#6220fb]" />,
  },
  {
    title: "Plan and permissions",
    description:
      "View plan information and manage what staff can see or do in your store",
    icon: <FaUserCog className="w-5 h-5 text-[#6220fb]" />,
  },
  {
    title: "Payments",
    description: "Enable and manage your store's payment providers",
    icon: <FaCreditCard className="w-5 h-5 text-[#6220fb]" />,
  },
  {
    title: "Files",
    description: "Upload images, videos and documents",
    icon: <FaFile className="w-5 h-5 text-[#6220fb]" />,
  },
  {
    title: "Backups",
    description: "Check your last backups",
    icon: <FaCloud className="w-5 h-5 text-[#6220fb]" />,
  },
  {
    title: "Store languages",
    description: "Manage the languages your customers can view on your store",
    icon: <FaGlobe className="w-5 h-5 text-[#6220fb]" />,
  },
  {
    title: "Legal",
    description: "Manage your store's legal pages",
    icon: <FaBalanceScale className="w-5 h-5 text-[#6220fb]" />,
  },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [expandedTab, setExpandedTab] = useState(null);
  const [selectedSubOption, setSelectedSubOption] = useState(null);
  const [addCategoryView, setAddCategoryView] = useState(false);
  const [selected, setSelected] = useState("Edit categories");
  const [categories, setCategories] = useState([]);
  const [qr, setQr] = useState(null);
  const [qrDetails, setQRDetails] = useState(true);
  const [publish, setPublish] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await getCategories(qrDetails.business_id);
      setCategories(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery)
  );

  const addCategory = async (categoryName) => {
    try {
      const payload = {
        name: categoryName,
        business_id: qrDetails.business_id,
      };

      await addNewCategory(payload);
      await fetchCategories();
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to add category", error);
    }
  };

  const addProduct = async (product) => {
    try {
      const payload = {
        name: product.name,
        price: product.price,
        description: product.description,
        category_id: product.categoryId,
        business_id: qrDetails.business_id,
      };

      await addNewProduct(payload);
      await fetchProducts();
      setProductModalOpen(false);
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      await fetchCategories();
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  useEffect(() => {
    const getMyQrs = async () => {
      try {
        const response = await getMyQr();
        console.log(response.data);
        const fullQrUrl = `${BASE_URI}${response.data.business.qrcode}`;
        setQr(fullQrUrl);
        setQRDetails(response.data);
        // console.log(response.data.business_id);
      } catch (error) {
        console.error("Failed to fetch qr", error);
      }
    };

    getMyQrs();
  }, []);

  const handlePublished = async () => {
    try {
      const response = await getPublished(qrDetails.business_id);
      console.log(qrDetails);

      if (response.status === 200) {
        setPublish(true);
      } else {
        setPublish(false);
      }

      console.log("Publish status:", response?.data?.is_published);
    } catch (error) {
      console.error("Failed to fetch published", error);
    }
  };

  // const options = ["Add categories", "Add products", "Edit business profile"];

  const handleSelect = (option) => {
    setSelected(option === selected ? "" : option);
  };

  const handleTabClick = (id, hasSubOptions) => {
    if (id === "logout") {
      setShowLogoutModal(true);
      return;
    }
    if (hasSubOptions) {
      setExpandedTab(expandedTab === id ? null : id);
      setActiveTab(id);
    } else {
      setActiveTab(id);
      setExpandedTab(null);
      setSelectedSubOption(null);
      setAddCategoryView(false);
    }
  };

  const handleLogout = async () => {
    console.log("Logout clicked");
    try {
      localStorage.removeItem("token");
      sessionStorage.clear();
      setShowLogoutModal(false);
      router.push("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6">
            <span className="uppercase text-xl font-semibold">{activeTab}</span>
            {/* Go Pro */}
            <div className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row items-center gap-4 mt-4">
              <img
                src="https://img.freepik.com/free-vector/access-code-handprint-scanner-secure-entry-individual-sign-system-security-personal-parole-male-computer-user-cartoon-character_335657-2573.jpg"
                alt="No Ads"
                className="w-20 h-20"
              />
              <div className="flex-1 space-y-4">
                <h2 className="font-semibold text-lg">
                  Go Pro – No Ads, Full Control!
                </h2>
                <p className="text-sm text-gray-600">
                  Enhance your menus with a clean, ad-free experience. Keep
                  customers focused on your offerings and strengthen your brand
                  image.
                </p>
                <Button text="Upgrade at $9/month" />
              </div>
            </div>

            {/* Google Connect */}
            <div className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row items-start gap-4">
              <img
                src="https://img.freepik.com/free-vector/real-estate-searching-illustration_23-2148655466.jpg"
                alt="Google Connect"
                className="w-20 h-20 mx-auto"
              />
              <div className="flex-1 space-y-4">
                <h2 className="font-semibold text-lg">
                  Get More Customers with Google!
                </h2>
                <p className="text-sm text-gray-600">
                  Link your menus to Google My Business to appear in local
                  searches, attract more customers, and boost your online
                  visibility effortlessly.
                </p>
                <Button text="Connect now →" variant="secondary" />
              </div>
            </div>

            {/* QR Section */}
            {qr ? (
              <div className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                {qr ? (
                  <img src={qr} alt="QR Code" className="w-28 h-28" />
                ) : (
                  <p>Loading QR...</p>
                )}
                <div className="flex-1 md:text-left">
                  <p className="text-sm text-gray-600 mb-4">
                    This is the QR code that links to your menu’s home page with
                    categories.
                  </p>
                  {!publish && (
                    <Button
                      text="Publish"
                      variant="secondary"
                      onClick={handlePublished}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between">
                <p className="text-gray-700 text-sm">
                  You haven't created your business yet.
                </p>
                <Button
                  text="Get Started"
                  variant="primary"
                  onClick={() => router.push("/getStarted")}
                />
              </div>
            )}

            {/* Checklist */}
            {/* <div className="bg-white shadow rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-4">
                You are off to a great start
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  {options.map((option) => (
                    <div key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selected === option}
                        onChange={() => handleSelect(option)}
                      />
                      <span className="text-sm">{option}</span>
                    </div>
                  ))}
                </div>
                <Button
                  text={selected ? selected : "Select an action"}
                  className="w-full"
                />
              </div>
            </div> */}
          </div>
        );
      case "menu":
        switch (selectedSubOption) {
          case "Add Category":
            return (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 justify-between">
                  <h2 className="text-lg font-semibold">Categories</h2>
                  <Button
                    text="Add Category"
                    variant="primary"
                    onClick={() => setModalOpen(true)}
                  />
                  <AddCategoryModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSubmit={addCategory}
                  />
                </div>

                <div className="flex space-x-4 pb-2">
                  {["All", "Active"].map((tab) => (
                    <button
                      key={tab}
                      className={`text-md ${
                        tab === "All"
                          ? "border-b-2 border-[#6220fb] text-[#6220fb] font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="bg-white shadow rounded-lg overflow-x-auto">
                  <div className="p-4">
                    <input
                      type="text"
                      placeholder="Search for categories"
                      value={searchQuery}
                      onChange={(e) =>
                        setSearchQuery(e.target.value.toLowerCase())
                      }
                      className="border px-3 py-2 rounded-md text-sm w-full md:w-1/2"
                    />
                  </div>
                  <table className="min-w-full text-md">
                    <thead>
                      <tr className="border-b border-[#6220fb] bg-gray-50 text-gray-600 text-left">
                        <th className="p-4">Categories</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCategories.map((category) => (
                        <tr key={category.id} className=" hover:bg-gray-50">
                          <td className="p-4 flex items-center gap-2">
                            <span className="text-md font-semibold">
                              {category.name}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                              Active
                            </span>
                          </td>
                          <td className="p-4">
                            <span
                              onClick={() => handleDelete(category.id)}
                              className="bg-red-100 cursor-pointer text-red-700 text-xs px-2 py-1 rounded-full"
                            >
                              Delete
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );

          case "Add Product":
            return (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex items-center">
                      <Button text="Import" variant="secondary" />
                      <Button text="Export" variant="secondary" />
                    </div>
                    <Button
                      text="Add Product"
                      variant="primary"
                      onClick={() => setModalOpen(true)}
                    />
                    <AddProductModal
                      isOpen={isModalOpen}
                      onClose={() => setModalOpen(false)}
                      onSubmit={addProduct}
                      categories={categories}
                    />
                  </div>
                </div>

                <div className="flex space-x-6 text-sm">
                  {["All", "Active", "Draft"].map((tab, index) => (
                    <button
                      key={tab}
                      className={`pb-2 ${
                        index === 0
                          ? "border-b-2 border-[#6220fb] text-[#6220fb] font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <select className="border text-sm px-3 py-2 rounded-md">
                    <option value="">All categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Search"
                    className="border px-3 py-2 rounded-md text-sm flex-1 w-full"
                  />
                </div>

                <div className="bg-white shadow rounded-lg overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left border-b border-[#6220fb] bg-gray-50 text-gray-600">
                        <th className="p-4">
                          <input type="checkbox" />
                        </th>
                        <th className="p-4">Products</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) =>
                        category.Items?.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="p-4">
                              <input type="checkbox" />
                            </td>
                            <td className="p-4 flex items-center gap-3">
                              <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-xs text-gray-500">
                                  ₹ {item.price}
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                Active
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );

          case "Customize":
            return (
              <div className="space-y-8">
                <span className="text-xl">{selectedSubOption}</span>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-white shadow rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Logo</h3>
                      <img
                        src="https://raybittechnologies.com/wp-content/uploads/2024/03/logoraybit-new.png"
                        alt="logo"
                        className="w-auto h-20 mb-4"
                      />
                      <Button text="Edit & Replace" variant="secondary" />
                    </div>
                    <div className="bg-white shadow rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Main banner</h3>
                      <img
                        src="https://raybittechnologies.com/wp-content/uploads/2024/03/logoraybit-new.png"
                        alt="logo"
                        className="w-auto h-20 mb-4"
                      />
                      <Button text="Edit & Replace" variant="secondary" />
                    </div>
                  </div>

                  <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Social Media</h3>
                    {[
                      "Twitter",
                      "Facebook",
                      "Instagram",
                      "Pinterest",
                      "YouTube",
                      "Trip Advisor",
                    ].map((platform) => (
                      <div key={platform} className="mb-3">
                        <label className="block text-sm font-medium mb-1">
                          {platform}
                        </label>
                        <input
                          type="text"
                          placeholder={`${platform.toLowerCase()} profile`}
                          className="w-full border px-3 py-2 rounded text-sm"
                        />
                      </div>
                    ))}
                    <Button text="Save" variant="primary" />
                  </div>
                </div>
              </div>
            );

          default:
            return (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Menu Management</h2>
                <p className="text-sm text-gray-500">
                  Please select an option from the submenu.
                </p>
              </div>
            );
        }

      case "settings":
        return (
          <div className="">
            <h2 className="text-2xl font-semibold mb-6">Settings</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {settingsOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-[#6220fb]/10 rounded-lg p-4 hover:bg-[#6220fb]/20 transition-colors cursor-pointer shadow-sm"
                >
                  <div className="mt-2">{option.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#6220fb]">
                      {option.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Choose a tab</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col bg-white text-gray-700 w-[5rem] md:w-[20rem] flex-shrink-0 h-[100vh] overflow-hidden justify-between">
        <div>
          <input
            type="text"
            placeholder="https://qrmenu.com/menus/raybit-technologies"
            className="hidden md:block w-[19rem] p-2 border border-gray-300 text-xs text-center rounded-md m-2"
          />
          <div className="w-[5rem] md:w-full flex flex-col justify-start p-2">
            {tabs
              .filter((t) => t.id !== "settings" && t.id !== "logout")
              .map(({ id, label, icon: Icon, badge, subOptions }) => (
                <React.Fragment key={id}>
                  <button
                    onClick={() => handleTabClick(id, !!subOptions)}
                    className={`flex items-center justify-center md:justify-start w-full md:w-auto p-3 md:rounded-lg text-start transition-all hover:bg-blue-50 hover:text-[#6220fb] ${
                      activeTab === id ? "bg-blue-50 text-[#6220fb]" : ""
                    }`}
                  >
                    <div className="grid place-items-center mr-0 md:mr-4">
                      <Icon />
                    </div>
                    <div className="hidden md:flex items-center justify-between w-full">
                      <span>{label}</span>
                      {subOptions && (
                        <FaArrowDown
                          className={`ml-2 h-3 w-3 transition-transform duration-200 ${
                            expandedTab === id ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                    {badge && (
                      <div className="ml-auto hidden md:flex">
                        <span className="bg-blue-500/20 text-blue-900 px-2 py-1 text-xs rounded-full font-bold">
                          {badge}
                        </span>
                      </div>
                    )}
                  </button>

                  {/* Sub-options */}
                  {expandedTab === id &&
                    subOptions?.map(
                      ({ id: subId, label: subLabel, icon: SubIcon }) => (
                        <button
                          key={subId}
                          onClick={() => {
                            setActiveTab("menu");
                            setSelectedSubOption(subLabel);
                            fetchCategories();

                            setAddCategoryView(subLabel === "Add Category");
                          }}
                          className="ml-4 flex items-center gap-4 text-left text-sm text-gray-600 hover:text-[#6220fb] py-2"
                        >
                          <SubIcon className="h-4 w-4" />
                          <span className="hidden md:inline">{subLabel}</span>
                        </button>
                      )
                    )}
                </React.Fragment>
              ))}
          </div>
        </div>

        {/* Bottom items */}
        <div className="w-[3rem] md:w-full flex flex-col p-2 border-t border-gray-200">
          {tabs
            .filter((t) => t.id === "settings" || t.id === "logout")
            .map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleTabClick(id)}
                className={`flex items-center justify-center md:justify-start w-full md:w-auto p-3 md:rounded-lg text-start transition-all hover:bg-blue-50 hover:text-[#6220fb] ${
                  activeTab === id ? "bg-blue-50 text-[#6220fb]" : ""
                }`}
              >
                <div className="grid place-items-center mr-0 md:mr-4">
                  <Icon />
                </div>
                <span className="hidden md:inline">{label}</span>
              </button>
            ))}
        </div>
        <LogoutConfirmationModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;
