



import React, { useState } from "react";
import MedicineForm from "./Components/MedicineForm";
import MedicineList from "./Components/MedicineList";
import Cart from "./Components/Cart";

const App = () => {
  const initialMedicines = [
    {
      name: "Paracetamol",
      description: "Used for fever",
      price: 5,
      quantity: 100,
    },
    {
      name: "Ibuprofen",
      description: "Pain reliever",
      price: 10,
      quantity: 50,
    },
    {
      name: "Aspirin",
      description: "Reduces pain and fever",
      price: 8,
      quantity: 5,
    },
    {
      name: "Cough Syrup",
      description: "Relieves cough",
      price: 15,
      quantity: 40,
    },
    {
      name: "Antacid",
      description: "Relieves heartburn",
      price: 6,
      quantity: 60,
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
    <div className="App">
      <h1>Medicine Shop Management</h1>
      <MedicineForm addMedicine={addMedicine} />
      <MedicineList medicines={medicines} addToCart={addToCart} />
      <Cart cart={cart} />
    </div>
  );
};

export default App;