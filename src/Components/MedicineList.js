import React, { useContext } from "react";
import MedicineContext from "./MedicineContext";
import "./MedicineList.css"; // Ensure this line imports the CSS file where the `.out-of-stock` class is defined

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
              {medicine.quantity > 0 ? (
                medicine.quantity
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </p>
            <p>
              <strong>Image:</strong>{" "}
              <img
                src={medicine.image}
                alt={medicine.name}
                style={{ width: "100px" }}
              />
            </p>
            <p>
              <strong>Storage Location:</strong> {medicine.floor},{" "}
              {medicine.rack}
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
