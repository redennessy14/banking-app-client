import React from "react";

const Balance = ({ cards }) => {
  const calculateTotalBalance = (cards) => {
    let totalBalance = 0;
    cards.forEach((card) => {
      totalBalance += parseFloat(card.balance);
    });
    return totalBalance.toFixed(2);
  };
  return (
    <>
      <h3>Общий баланс</h3>
      <p>${calculateTotalBalance(cards)}</p>
    </>
  );
};

export default Balance;
