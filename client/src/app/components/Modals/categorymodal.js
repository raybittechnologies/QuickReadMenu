"use client";

import { useState } from "react";
import Button from "../Button/page";

export default function AddCategoryModal({ isOpen, onClose, onSubmit }) {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = () => {
    if (!categoryName.trim()) return;
    onSubmit(categoryName.trim());
    setCategoryName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          className="w-full border rounded px-3 py-2 mb-4"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <div className="flex justify-between gap-2">
          <Button text="Cancel" variant="secondary" onClick={onClose} />
          <Button text="Add" variant="primary" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
