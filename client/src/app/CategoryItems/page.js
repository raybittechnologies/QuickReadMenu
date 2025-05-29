"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button/page";

export default function CategoryItemsManager({
  categories,
  // setCategories,
  createdItems,
  setCreatedItems,
}) {
  const router = useRouter();
  const handleContinue = () => {
    const token = localStorage.getItem("token");
    router.push(token ? `/createBusiness/${token}` : "/Login");
    // router.push("/createBusiness");
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const resetForm = () => {
    setItemName("");
    setPrice("");
    setDescription("");
    setEditIndex(null);
  };

  const updateItemsInCategory = () => {
    if (!itemName || !price) return;

    const newItem = {
      name: itemName,
      price,
      description,
    };

    setCreatedItems((prev) => {
      const prevBeta = { ...prev };

      const arr = [...prevBeta[selectedCategory]];
      arr.push(newItem);
      prevBeta[selectedCategory] = arr;

      return prevBeta;
    });

    resetForm();
  };

  console.log("createdItems", createdItems);
  const handleEdit = (index) => {
    const item = createdItems[selectedCategory]?.[index];

    if (item) {
      setItemName(item.name);
      setPrice(item.price);
      setDescription(item.description);
      setEditIndex(index);
    }
  };

  const handleDelete = (index) => {
    setCreatedItems((prev) => {
      const updated = { ...prev };
      const items = [...(updated[selectedCategory] || [])];
      items.splice(index, 1);
      updated[selectedCategory] = items;
      return updated;
    });

    resetForm();
  };

  // useEffect(() => {}, [createdItems]);

  useEffect(() => {
    categories.map((el) =>
      setCreatedItems((prev) => {
        const prevBeta = { ...prev };
        return { ...prevBeta, [el]: [] };
      })
    );
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add/Edit Items in Category</h2>

      {/* Category Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Select Category
        </label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            resetForm();
          }}
        >
          <option value="" className="text-red-800">
            -- Select --
          </option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Item Form */}
      {selectedCategory && (
        <>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Item Name *
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="e.g., Margherita Pizza"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Price (₹) *
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ""))}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="e.g., 249"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Optional"
            />
          </div>

          <Button
            onClick={updateItemsInCategory}
            text={` ${editIndex !== null ? "Update Item" : "Add Item"}`}
            variant="secondary"
          />

          {editIndex !== null && (
            <button
              onClick={resetForm}
              className="ml-2 text-gray-600 underline"
            >
              Cancel Edit
            </button>
          )}
        </>
      )}

      {/* Item List */}
      {selectedCategory && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            Items in {selectedCategory}
          </h3>
          <ul className="space-y-2">
            {
              // (
              //   categories.find((c) => c.name === selectedCategory)?.items || []
              // )
              createdItems[selectedCategory].map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-start bg-gray-50 p-3 rounded border"
                >
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">
                      ₹{item.price}{" "}
                      {item.description && `- ${item.description}`}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-500 underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      )}
      {selectedCategory && createdItems && (
        <Button onClick={handleContinue} text="Continue" />
      )}
    </div>
  );
}
