import React from "react";
import "./CartToPrint.css"; // Import the CSS file

const CartToPrint = React.forwardRef((props, ref) => {
  const { cart, totalPrice, discount, discountedPrice, isPrinting } = props;
  return (
    <div ref={ref} className="cart-to-print">
      <h2 className="title">{isPrinting ? "Sanjeev Drug Agency" : "Cart"}</h2>
      {isPrinting && (
        <div className="print-details">
          <h4>Contact Details:</h4>
          <p>
            <strong>Address:</strong> Near Shyama Picture Palace,Sheohar Bihar
          </p>
          <p>
            <strong>Phone:</strong> +91 8407074141
          </p>
          <p>
            <strong>Email:</strong> sanjeevdrugagency@gmail.com
          </p>
          <p>
            <strong>Website:</strong> www.sanjeevdrugagency.com
          </p>
         
        </div>
      )}
      <ul className="cart-items">
        {cart.map((item, index) => (
          <li key={index} className="cart-item">
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
      <div className="total-section">
        <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
        {discount > 0 && (
          <h3>Discounted Price: ₹{discountedPrice.toFixed(2)}</h3>
        )}
        {discount > 0 && (
          <p>You saved ₹{(totalPrice * discount).toFixed(2)} with coupon!</p>
        )}
      </div>
    </div>
  );
});

export default CartToPrint;
