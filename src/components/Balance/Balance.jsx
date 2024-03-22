import React from "react";
import style from "../../styles/Balance.module.scss";

const Balance = ({ cards }) => {
  const calculateTotalBalance = (cards) => {
    let totalBalance = 0;
    cards.forEach((card) => {
      totalBalance += parseFloat(card.balance);
    });
    return totalBalance.toFixed(2);
  };
  return (
    <div className={style.balance}>
      <h2>Общий баланс</h2>
      <p>${calculateTotalBalance(cards)}</p>
    </div>
  );
};

export default Balance;
