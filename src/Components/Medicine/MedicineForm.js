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
    image: "",
    floor: "",
    rack: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine({ ...medicine, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedicine({ ...medicine, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { floor, rack, ...rest } = medicine;
    const newMedicine = {
      ...rest,
      storageLocation: `${floor}, ${rack}`,
    };
    addMedicine(newMedicine);
    setMedicine({
      name: "",
      description: "",
      price: "",
      quantity: "",
      image: "",
      floor: "",
      rack: "",
    });
    setImagePreview(null);
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
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Medicine Preview"
          style={{ width: "100px", marginTop: "10px" }}
        />
      )}
      <select
        name="floor"
        value={medicine.floor}
        onChange={handleChange}
        required
      >
        <option value="">Select Floor</option>
        <option value="1st floor">1st floor</option>
        <option value="2nd floor">2nd floor</option>
        <option value="3rd floor">3rd floor</option>
        <option value="4th floor">4th floor</option>
        <option value="5th floor">5th floor</option>
      </select>
      <select
        name="rack"
        value={medicine.rack}
        onChange={handleChange}
        required
      >
        <option value="">Select Rack</option>
        <option value="Rack 1">Rack 1</option>
        <option value="Rack 2">Rack 2</option>
        <option value="Rack 3">Rack 3</option>
        <option value="Rack 4">Rack 4</option>
        <option value="Rack 5">Rack 5</option>
      </select>
      <button type="submit">Add Medicine</button>
    </form>
  );
};

export default MedicineForm;
