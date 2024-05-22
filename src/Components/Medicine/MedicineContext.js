import React, { createContext, useState } from "react";
import Paracetamol from "./Image/Paracetamol+Dolo-650+Uses-+Side+Effects-+Composition+and+Price.jpg";
import Ibuprofen from "./Image/ibuprofen-400-mg-bp-tablets.jpg";
import Aspirin from "./Image/aspirin-dispersible-tablets.jpg";
import Antacid from "./Image/Antacid.jpg";




const MedicineContext = createContext();

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
       name: "Antacid",
       description: "Relieves heartburn",
       price: 27,
       quantity: 10,
       image: Antacid,
       storageLocation: "4th floor, Rack 4",
     },
   ];

export const MedicineProvider = ({ children }) => {

 
   //setting value to the intial siored medicine
       const [medicines, setMedicines] = useState(initialMedicines);
       
       //set cart value to empty
       const [cart, setCart] = useState([]);


  
const addMedicine = (medicine) => {
  setMedicines((prevMedicines) => {
    const index = prevMedicines.findIndex((m) => m.name === medicine.name);
    if (index !== -1) {
      // Create a new array with the updated quantity for the existing medicine
      const updatedMedicines = prevMedicines.map((m, i) =>
        i === index
          ? { ...m, quantity: m.quantity + parseInt(medicine.quantity) } : m
      );
      return updatedMedicines;
    } else {
      // Add the new medicine to the list
      return [
        ...prevMedicines,
        { ...medicine, quantity: parseInt(medicine.quantity) },
      ];
    }
  });
};






  const addToCart = (medicine) => {
    setCart((prevCart) => {

      const updatedCart = prevCart.map((item) =>
        //if item.name is found then spread and increase quantity value by 1 else return item as it is
        item.name === medicine.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      //that unchanged item received here if any medicine does match with existing one means add as new with quantity 1
      if (!updatedCart.some((item) => item.name === medicine.name)) {
        updatedCart.push({ ...medicine, quantity: 1 });
      }
      return updatedCart;
    });
//setmedicine value and reduce it's quantity with 1
    setMedicines((prevMedicines) =>
      prevMedicines.map((item) =>
        //if item found then reduce by 1 else return item
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
        //remove all item if quantity less than 0

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
