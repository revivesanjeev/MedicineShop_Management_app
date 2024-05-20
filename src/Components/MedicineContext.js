import React, { createContext, useState } from "react";

const MedicineContext = createContext();

export const MedicineProvider = ({ children }) => {
  const initialMedicines = [
    {
      name: "Paracetamol",
      description: "Used for fever",
      price: 5,
      quantity: 100,
      image: "paracetamol.jpg",
      storageLocation: "5th floor, rack 1-10",
    },
    {
      name: "Ibuprofen",
      description: "Pain reliever",
      price: 10,
      quantity: 50,
      image: "ibuprofen.jpg",
      storageLocation: "5th floor, rack 1-10",
    },
    {
      name: "Aspirin",
      description: "Reduces pain and fever",
      price: 8,
      quantity: 5,
      image: "aspirin.jpg",
      storageLocation: "5th floor, rack 1-10",
    },
    {
      name: "Cough Syrup",
      description: "Relieves cough",
      price: 15,
      quantity: 40,
      image: "cough_syrup.jpg",
      storageLocation: "5th floor, rack 1-10",
    },
    {
      name: "Antacid",
      description: "Relieves heartburn",
      price: 6,
      quantity: 60,
      image: "antacid.jpg",
      storageLocation: "5th floor, rack 1-10",
    },
  ];

  const [medicines, setMedicines] = useState(initialMedicines);
  const [cart, setCart] = useState([]);

  const addMedicine = (medicine) => {
    setMedicines((prevMedicines) => {
      const index = prevMedicines.findIndex((m) => m.name === medicine.name);
      if (index !== -1) {
        prevMedicines[index].quantity += parseInt(medicine.quantity, 10);
        return [...prevMedicines];
      } else {
        return [...prevMedicines, medicine];
      }
    });
  };

  const addToCart = (medicine) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.name === medicine.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      if (!updatedCart.some((item) => item.name === medicine.name)) {
        updatedCart.push({ ...medicine, quantity: 1 });
      }
      return updatedCart;
    });

    setMedicines((prevMedicines) =>
      prevMedicines.map((item) =>
        item.name === medicine.name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <MedicineContext.Provider
      value={{ medicines, cart, addMedicine, addToCart }}
    >
      {children}
    </MedicineContext.Provider>
  );
};

export default MedicineContext;
