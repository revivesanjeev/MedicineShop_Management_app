


import React, { useState } from "react";

const MedicineForm = ({ addMedicine }) => {
  const [medicine, setMedicine] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine({ ...medicine, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMedicine(medicine);
    setMedicine({ name: "", description: "", price: 0, quantity: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={medicine.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={medicine.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={medicine.price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={medicine.quantity}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Medicine</button>
    </form>
  );
};

export default MedicineForm;
