import React from "react";
import MedicineForm from "./Components/MedicineForm";
import MedicineList from "./Components/MedicineList";
import Cart from "./Components/Cart";
import { MedicineProvider } from "./Components/MedicineContext";
import "./App.css"; // Import the CSS file

const App = () => {
  return (
    <MedicineProvider>
      <div>
        <h1>Medicine Shop Management</h1>
        <MedicineForm />
        <div className="content">
          <MedicineList />
          <Cart />
        </div>
      </div>
    </MedicineProvider>
  );
};

export default App;
