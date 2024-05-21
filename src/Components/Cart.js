import React, { useState, useContext } from "react";
import MedicineContext from "./MedicineContext";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart } = useContext(MedicineContext);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const applyCoupon = () => {
    if (couponCode === "MAY24") {
      setDiscount(0.1); // 10% discount for MAY24 coupon
    } else if (couponCode === "FIRST100") {
      setDiscount(0.2); // 20% discount for First100 coupon
    } else {
      setDiscount(0); // No discount if coupon code is invalid
    }
  };

  const discountedPrice = totalPrice - totalPrice * discount;

  const handleCheckout = () => {
    // Print cart items with prices and coupon
    console.log("Cart Items:");
    cart.forEach((item) => {
      console.log(
        `${item.name} - Price: ₹${item.price} - Quantity: ${item.quantity}`
      );
    });

    // Print bill
    console.log(`Total Price: ₹${discountedPrice.toFixed(2)}`);
    if (discount > 0) {
      console.log(
        `You saved ₹${(totalPrice * discount).toFixed(2)} with the coupon!`
      );
    }

    // Perform further checkout actions here (e.g., payment processing)
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <p>
              <strong>Name:</strong> {item.name}
            </p>
            <p>
              <strong>Description:</strong> {item.description}
            </p>
            <p>
              <strong>Price:</strong> ₹{item.price}
            </p>
            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>
            <button
              className="decrement-button"
              onClick={() => removeFromCart(item)}
            >
              -
            </button>
          </li>
        ))}
      </ul>
      <div className="coupon-section">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button onClick={applyCoupon}>Apply Coupon</button>
      </div>
      <h3>Total Price: ₹{discountedPrice.toFixed(2)}</h3>
      {discount > 0 && (
        <p>You saved ₹{(totalPrice * discount).toFixed(2)} with the coupon!</p>
      )}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
