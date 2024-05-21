import React, { useState, useContext, useRef } from "react";
import MedicineContext from "./MedicineContext";
import "./Cart.css";
import ReactToPrint from "react-to-print";

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
      <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
      {discount > 0 && (
        <h3> Discounted Price: ₹{discountedPrice.toFixed(2)}</h3>
      )}
      {discount > 0 && (
        <p>You saved ₹{(totalPrice * discount).toFixed(2)} with coupon!</p>
      )}

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
          isPrinting={true} // Add this prop
        />
      </div>
    </div>
  );
};

const CartToPrint = React.forwardRef((props, ref) => {
  const { cart, totalPrice, discount, discountedPrice, isPrinting } = props;
  return (
    <div ref={ref}>
      <h2>{isPrinting ? "Sanjeev Drug Agency" : "Cart"}</h2>{" "}
      {/* Conditional rendering */}
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
          </li>
        ))}
      </ul>
      <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
      {discount > 0 && (
        <h3> Discounted Price: ₹{discountedPrice.toFixed(2)}</h3>
      )}
      {discount > 0 && (
        <p>You saved ₹{(totalPrice * discount).toFixed(2)} with coupon!</p>
      )}
    </div>
  );
});


export default Cart;
