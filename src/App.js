import React from "react";
import MedicineForm from "./Components/Medicine/MedicineForm";
import MedicineList from "./Components/Medicine/MedicineList";
import Cart from "./Components/Cart/Cart";
import { MedicineProvider } from "./Components/Medicine/MedicineContext";
import "./App.css"; // Import the CSS file

const App = () => {
  return (
    <MedicineProvider>
      <div>
        <h1 className="header_text">Sanjeev Drug Agency </h1>
        <h2>
        
          <p className="address">Near Shyama Picture Palace,Sheohar Bihar</p>
        </h2>
        <MedicineForm />
        <div className="content">
          <div className="medicine-list-container">
            <MedicineList />
          </div>
          <div className="cart-container">
            <Cart />
          </div>
        </div>
      </div>
    </MedicineProvider>
  );
};

export default App;
