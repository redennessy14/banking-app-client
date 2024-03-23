import React from "react";
// import style from "../../styles/Balance.module.scss";

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
      <h2>Общий баланс</h2>
      <p>${calculateTotalBalance(cards)}</p>
    </>
  );
};

export default Balance;
