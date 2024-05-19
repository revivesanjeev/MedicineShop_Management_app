import React from "react";
import MedicineForm from "./Components/MedicineForm";
import MedicineList from "./Components/MedicineList";
import Cart from "./Components/Cart";
import { MedicineProvider } from "./Components/MedicineContext";

const App = () => {
  return (
    <MedicineProvider>
      <div className="App">
        <h1>Medicine Shop Management</h1>
        <MedicineForm />
        <MedicineList />
        <Cart />
      </div>
    </MedicineProvider>
  );
};

export default App;
