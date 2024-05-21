


import React from "react";

const CouponSection = ({ couponCode, onChange, onApply }) => {
  return (
    <div className="coupon-section">
      <input
        type="text"
        placeholder="Enter coupon code"
        value={couponCode}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={onApply}>Apply Coupon</button>
    </div>
  );
};

export default CouponSection;
