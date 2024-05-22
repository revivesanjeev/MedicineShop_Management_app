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


// Yes, your understanding is correct. Here’s a breakdown to confirm your explanation:

// Context Setup: You created a MedicineContext that holds the state and functions: medicines, cart, addMedicine, addToCart, and removeFromCart.

// Provider Usage: In the App component (or another top-level component), you wrap the relevant parts of your application with MedicineContext.Provider. This makes the context values (medicines, cart, addMedicine, addToCart, removeFromCart) available to all child components within this wrapper.

// Consuming Context: Inside any component that needs access to these values or functions, you use the useContext(MedicineContext) hook. This allows the component to read the current context value and interact with the provided state and functions.

// State and Function Updates: When a component calls one of the functions (e.g., addToCart, removeFromCart), these functions are executed. They update the state inside the MedicineContext provider. React's state management then ensures that all components that consume this context are re-rendered with the updated state.

// So, your explanation aligns perfectly with how React context works for state management and data flow.









// Yes, you are correct. Here’s a more detailed flow to reinforce your understanding:

// Context Setup:

// You define the MedicineContext and the MedicineProvider which includes the state variables (medicines, cart) and functions (addMedicine, addToCart, removeFromCart) to manipulate these states.
// Provider Usage:

// You wrap your application (or specific parts of it) in the MedicineProvider. This makes the context values and functions available to all components within this provider.
// Consuming Context:

// Inside a component, you use the useContext(MedicineContext) hook to access the state and functions provided by the context. This hook returns the current context value, which includes the medicines, cart, addMedicine, addToCart, and removeFromCart.
// Performing Updates:

// When a component needs to update the state, it calls one of the context functions (e.g., addToCart).
// This function updates the state within the MedicineProvider.
// State Update and Re-render:

// The state update triggers React's state management mechanism.
// All components that consume this context will re-render to reflect the updated state.
// Example Flow:
// Initial Setup:

// MedicineProvider initializes the context with state and functions.
// The App component (or another top-level component) is wrapped with MedicineProvider.
// Context Consumption:

// A component (e.g., Cart) uses useContext(MedicineContext) to access the context values.
// Action Trigger:

// The user triggers an action (e.g., clicking "Add to Cart" or "Remove from Cart").
// Function Execution:

// The component calls the relevant function from the context (e.g., removeFromCart).
// State Update:

// The function updates the state within MedicineProvider.
// Re-render:

// The state change triggers React to re-render components that consume the context, reflecting the updated state in the UI.