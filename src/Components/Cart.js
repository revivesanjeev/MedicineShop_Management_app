import React from "react";

const Cart = ({ cart }) => {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
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
              <strong>Price:</strong> ${item.price}
            </p>
            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>
          </li>
        ))}
      </ul>
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
