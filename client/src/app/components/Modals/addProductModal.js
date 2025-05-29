"use client";

import { useState } from "react";
import Button from "../Button/page";

export default function AddProductModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
}) {
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!categoryId || !name.trim() || !price.trim()) return;

    const product = {
      name: name.trim(),
      price: parseFloat(price),
      description: description.trim(),
      categoryId,
    };

    onSubmit(product);
    setCategoryId("");
    setName("");
    setPrice("");
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add Product</h2>

        <div className="space-y-3">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-between gap-2 mt-4">
          <Button text="Cancel" variant="secondary" onClick={onClose} />
          <Button text="Add" variant="primary" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
