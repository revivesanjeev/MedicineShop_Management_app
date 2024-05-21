import React from "react";

const CartToPrint = React.forwardRef((props, ref) => {
  const { cart, totalPrice, discount, discountedPrice, isPrinting } = props;
  return (
    <div ref={ref}>
      <h2>{isPrinting ? "Sanjeev Drug Agency" : "Cart"}</h2>
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
      {discount > 0 && <h3>Discounted Price: ₹{discountedPrice.toFixed(2)}</h3>}
      {discount > 0 && (
        <p>You saved ₹{(totalPrice * discount).toFixed(2)} with coupon!</p>
      )}
    </div>
  );
});

export default CartToPrint;
