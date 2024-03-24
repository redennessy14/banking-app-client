import React, { useEffect } from "react";
import Cards from "../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../redux/slices/cards";
import style from "../styles/Home.module.scss";
import { fetchTransactions } from "../redux/slices/transaction";
import { Link } from "react-router-dom";
import MoneyTransfer from "../components/MoneyTransfer/MoneyTransfer";
import Balance from "../components/Balance/Balance";
import Transaction from "../components/Transaction/Transaction";

export const Home = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);
  const userData = useSelector((state) => state.auth.data);
  const transactions = useSelector((state) => state.transactions.items);
  const isCardsLoading = cards.status === "loading";
  const lastSixTransactions = transactions.slice(-6);

  useEffect(() => {
    if (userData) {
      dispatch(fetchCards(userData._id));
    } else {
      dispatch(fetchCards());
    }
  }, [userData]);

  useEffect(() => {
    if (cards.items.length > 0) {
      cards.items.forEach((card) => {
        dispatch(fetchTransactions(card._id));
      });
    }
  }, [cards.items, userData]);

  return (
    <div className={style.home}>
      <div className={style.cardBlock}>
        {!isCardsLoading &&
          cards.items.map((item) => (
            <Cards
              key={item._id}
              cardType={item.cardType}
              cardNumber={item.cardNumber}
              balance={item.balance}
              cardholderName={item.cardholderName}
              expirationDate={item.expirationDate}
            />
          ))}
        <Link to="/card">
          <button className={style.button}>Создать новую карту</button>{" "}
        </Link>
      </div>
      <div className={style.transactionBlock}>
        <h2>История транзакций</h2>
        {lastSixTransactions.length > 0 ? (
          lastSixTransactions.map((transaction) => (
            <Transaction
              key={transaction._id}
              senderName={transaction.senderName}
              senderAvatar={transaction.senderAvatar}
              recipientName={transaction.recipientName}
              recipientAvatar={transaction.recipientAvatar}
              amount={transaction.amount}
              date={transaction.date}
            />
          ))
        ) : (
          <p>Нет истории транзакций</p>
        )}
      </div>
      <div className={style.dashboard}>
        <div className={style.balance}>
          {" "}
          <Balance cards={cards.items} />
        </div>
        <MoneyTransfer transfers={transactions} />
      </div>
    </div>
  );
};
