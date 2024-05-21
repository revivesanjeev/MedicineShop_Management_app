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
  const componentRef = useRef();

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

  const discountedPrice = totalPrice - totalPrice * discount;

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <CartItem key={index} item={item} onRemove={removeFromCart} />
        ))}
      </ul>
      <CouponSection
        couponCode={couponCode}
        onChange={setCouponCode}
        onApply={applyCoupon}
      />
      <CartSummary
        totalPrice={totalPrice}
        discount={discount}
        discountedPrice={discountedPrice}
      />
      <ReactToPrint
        trigger={() => <button>Checkout</button>}
        content={() => componentRef.current}
      />
      <div style={{ display: "none" }}>
        <CartToPrint
          ref={componentRef}
          cart={cart}
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
