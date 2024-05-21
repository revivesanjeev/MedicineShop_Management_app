import React from "react";

const CartItem = ({ item, onRemove }) => {
  return (
    <li>
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
      <button className="decrement-button" onClick={() => onRemove(item)}>
        <strong>-</strong>
      </button>
    </li>
  );
};

export default CartItem;
