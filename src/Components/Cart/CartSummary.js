import React from "react";




const CartSummary = ({ totalPrice, discount, discountedPrice, couponCode }) => {
  return (
    <div>
      <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
      {discount > 0 && couponCode && (
        <>
          <h3>Discounted Price: ₹{discountedPrice.toFixed(2)}</h3>
          <p>You saved ₹{(totalPrice * discount).toFixed(2)} with coupon!</p>
        </>
      )}
    </div>
  );
};

export default CartSummary;
