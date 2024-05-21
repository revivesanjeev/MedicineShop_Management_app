import React, { createContext, useState } from "react";
import Paracetamol from "./Image/Paracetamol+Dolo-650+Uses-+Side+Effects-+Composition+and+Price.jpg";
import Ibuprofen from "./Image/ibuprofen-400-mg-bp-tablets.jpg";
import Aspirin from "./Image/aspirin-dispersible-tablets.jpg";
import CoughSyrup from "./Image/benadryl.jpeg";
import Antacid from "./Image/Antacid.jpg";

const MedicineContext = createContext();

export const MedicineProvider = ({ children }) => {
  const initialMedicines = [
    {
      name: "Paracetamol",
      description: "Used for fever",
      price: 45,
      quantity: 10,
      image: Paracetamol,
      storageLocation: "3rd floor, Rack 4",
    },
    {
      name: "Ibuprofen",
      description: "Pain reliever",
      price: 100,
      quantity: 5,
      image: Ibuprofen,
      storageLocation: "2nd floor, Rack 4",
    },
    {
      name: "Aspirin",
      description: "Reduces pain and fever",
      price: 39,
      quantity: 25,
      image: Aspirin,
      storageLocation: "4th floor, Rack 4",
    },
    {
      name: "Cough Syrup",
      description: "Relieves cough",
      price: 60,
      quantity: 20,
      image: CoughSyrup,
      storageLocation: "2nd floor, Rack 1",
    },
    {
      name: "Antacid",
      description: "Relieves heartburn",
      price: 27,
      quantity: 10,
      image: Antacid,
      storageLocation: "4th floor, Rack 4",
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






  const removeFromCart = (medicine) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.name === medicine.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      return updatedCart;
    });

    setMedicines((prevMedicines) =>
      prevMedicines.map((item) =>
        item.name === medicine.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };




  return (
    <MedicineContext.Provider
      value={{ medicines, cart, addMedicine, addToCart, removeFromCart }}
    >
      {children}
    </MedicineContext.Provider>
  );
};

export default MedicineContext;
