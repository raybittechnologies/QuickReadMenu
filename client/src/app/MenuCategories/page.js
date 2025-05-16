"use client";

import { useState } from "react";

const MenuCategoryManager = ({ categories = [], setCategories, onNext }) => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    const updated = [...categories, newCategory.trim()];
    setCategories(updated);
    console.log(updated);
    setNewCategory("");
  };
  // const handleAddCategory = () => {
  //   if (!newCategory.trim()) return;

  //   const updated = [...categories, { name: newCategory.trim(), items: [] }];

  //   setCategories(updated);
  //   setNewCategory("");
  // };

  const handleDeleteCategory = (index) => {
    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
  };

  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Menu Categories
      </h3>

      <div className="flex gap-2 mb-4">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border border-blue-200 px-3 py-2 rounded w-full"
          placeholder="e.g: Starters"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2 mb-6">
        {categories.map((cat, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
          >
            <span className="capitalize text-gray-700">{cat}</span>
            <button
              onClick={() => handleDeleteCategory(index)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {categories.length > 0 && (
        <div className="">
          <button
            onClick={onNext}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuCategoryManager;
