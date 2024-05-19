import React, { useState, useContext } from "react";
import MedicineContext from "./MedicineContext";
import "./MedicineForm.css"; // Import the CSS file

const MedicineForm = () => {
  const { addMedicine } = useContext(MedicineContext);
  const [medicine, setMedicine] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine({ ...medicine, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMedicine(medicine);
    setMedicine({ name: "", description: "", price: "", quantity: "" });
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
