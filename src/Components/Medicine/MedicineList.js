import React, { useContext, useState, useEffect } from "react";
import MedicineContext from "./MedicineContext";
import "./MedicineList.css";




const MedicineList = () => {


  const { medicines, addToCart } = useContext(MedicineContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState(medicines);



//whenever searchterm or medicines changage then useeffect will run and that will display only those medicine that recieved by filtered medicine 
  useEffect(() => {
    setFilteredMedicines(
      medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, medicines]);// passing the function and dependencies for useEffect hooks




//here we are increasing the value of quantity and passing value through addtocart
  const handleAddToCart = (medicine) => {
    if (medicine.quantity > 0) {
      addToCart({ ...medicine, quantity: 1 });
    }
  };





  return (
    <div className="medicine-list">
      <h2>Medicines Available</h2>
      <input
        type="text"
        placeholder="Search medicine..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredMedicines.map((medicine, index) => (
          <li key={index}>
            <p>
              <strong>Name:</strong> {medicine.name}
            </p>
            <p>
              <strong>Description:</strong> {medicine.description}
            </p>
            <p>
              <strong>Price:</strong> ₹{medicine.price}
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
              <strong>Storage Location:</strong> {medicine.storageLocation}
            </p>
            <button
              onClick={() => handleAddToCart(medicine)}
              disabled={medicine.quantity <= 0}
              className={medicine.quantity <= 0 ? "disabled" : ""}
              // set cursor: not-allowed;
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
