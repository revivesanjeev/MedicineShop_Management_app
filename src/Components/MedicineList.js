import React, { useContext } from "react";
import MedicineContext from "./MedicineContext";

const MedicineList = () => {
  const { medicines, addToCart } = useContext(MedicineContext);

  const handleAddToCart = (medicine) => {
    if (medicine.quantity > 0) {
      addToCart({ ...medicine, quantity: 1 });
    }
  };

  return (
    <div>
      <h2>Medicines Available</h2>
      <ul>
        {medicines.map((medicine, index) => (
          <li key={index}>
            <p>
              <strong>Name:</strong> {medicine.name}
            </p>
            <p>
              <strong>Description:</strong> {medicine.description}
            </p>
            <p>
              <strong>Price:</strong> ${medicine.price}
            </p>
            <p>
              <strong>Quantity Available:</strong>{" "}
              {medicine.quantity > 0 ? medicine.quantity : "Out of Stock"}
            </p>
            <button
              onClick={() => handleAddToCart(medicine)}
              disabled={medicine.quantity <= 0}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineList;
