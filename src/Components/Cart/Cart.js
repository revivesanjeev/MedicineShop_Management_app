import React, { useState, useContext, useRef } from "react";
import MedicineContext from "../Medicine/MedicineContext";
import "./Cart.css";
import ReactToPrint from "react-to-print";
import CartItem from "./CartItem";
import CouponSection from "./CouponSection";
import CartSummary from "./CartSummary";
import CartToPrint from "./CartToPrint";




const Cart = () => {
  const { cart, removeFromCart } = useContext(MedicineContext);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  // Creates a reference to be attached to the CartToPrint component.
  // This reference allows ReactToPrint to access the component for printing.
  const componentRef = useRef();


  // .reduce is an array method used to reduce an array to a single value by applying a function to each element of the array.when each element of cart is evaluated then it will return final value.intial total value is 0.
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const applyCoupon = () => {
    if (couponCode === "MAY24") {
      setDiscount(0.1); // 10% discount for MAY24 coupon
    } else if (couponCode === "FIRST100") {
      setDiscount(0.2); // 20% discount for FIRST100 coupon
    } else {
      setDiscount(0); // No discount if coupon code is invalid
    }
  };

  //calculating discount price
  const discountedPrice = totalPrice - totalPrice * discount;


  return (
    //not understand this code snnipet
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <CartItem key={index} item={item} onRemove={removeFromCart} />
        ))}
      </ul>
      <CouponSection
        //this controlled component and it's logic is written in parent components and UI is maintained by CouponSection.when applyCoupon clicked in child component then apply component will triggered in parent component.
        couponCode={couponCode}
        onChange={setCouponCode}
        onApply={applyCoupon}
      />
      <CartSummary
        couponCode={couponCode}
        totalPrice={totalPrice}
        discount={discount}
        discountedPrice={discountedPrice}
      />
      {/* This library component is used to trigger printing of a specific component in a React application. */}
      <ReactToPrint
        trigger={() => <button>Checkout</button>}
        content={() => componentRef.current}
      />
      <div style={{ display: "none" }}>
        {/* The CartToPrint component is rendered within a div with display: none.This ensures it does not appear on the screen but is still available in the DOM for printing.*/}
        <CartToPrint
          ref={componentRef}
          cart={cart}
          couponCode={couponCode}
          totalPrice={totalPrice}
          discount={discount}
          discountedPrice={discountedPrice}
          isPrinting={true}
        />
      </div>
    </div>
  );
};

export default Cart;
