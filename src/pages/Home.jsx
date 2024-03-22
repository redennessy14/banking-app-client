import React, { useEffect } from "react";
import Cards from "../components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../redux/slices/cards";
import style from "../styles/Home.module.scss";
import Balance from "../components/Balance/Balance";
import { fetchTransactions } from "../redux/slices/transaction";

export const Home = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);
  const userData = useSelector((state) => state.auth.data);
  const isCardsLoading = cards.status === "loading";

  useEffect(() => {
    if (userData) {
      dispatch(fetchCards(userData._id));
    }
  }, [userData]);

  useEffect(() => {
    if (cards.items.length > 0) {
      cards.items.forEach((card) => {
        dispatch(fetchTransactions(card._id));
      });
      console.log(cards.items, "cards items");
    }
  }, [cards.items]);

  return (
    <div className={style.home}>
      <div className={style.cardBlock}>
        {!isCardsLoading &&
          cards.items.map((item, index) => (
            <Cards
              key={index}
              cardType={item.cardType}
              cardNumber={item.cardNumber}
              balance={item.balance}
              cardholderName={item.cardholderName}
              expirationDate={item.expirationDate}
            />
          ))}
        <button className={style.button}>Создать новую карту</button>
      </div>
      <div>
        {" "}
        <Balance cards={cards.items} />
      </div>
    </div>
  );
};
