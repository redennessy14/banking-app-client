import React, { useEffect, useState } from "react";
import { fetchCards } from "../../redux/slices/cards";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import style from "../../styles/TransferPage.module.scss";

export const TransferPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const cards = useSelector((state) => state.cards);
  const [selectedCard, setSelectedCard] = useState("");

  useEffect(() => {
    if (userData) {
      dispatch(fetchCards(userData._id));
    } else {
      dispatch(fetchCards());
    }
  }, [userData]);

  const handleCardChange = (event) => {
    setSelectedCard(event.target.value);
    console.log("selectedcard", selectedCard);
  };

  return (
    <div className={style.container}>
      <h2>Выполнить перевод</h2>
      <select
        className={style.select}
        name="cards"
        onChange={handleCardChange}
        value={selectedCard}
      >
        <option value={""}>Выберите карту ...</option>
        {cards.items.length > 0 &&
          cards.items.map((item) => (
            <option key={item._id} value={item._id}>
              {item.cardNumber}
            </option>
          ))}
      </select>
      {selectedCard !== "" && (
        <div className={style.card}>
          {" "}
          <Cards
            key={selectedCard}
            {...cards.items.find((item) => item._id === selectedCard)}
          />
        </div>
      )}
    </div>
  );
};

export default TransferPage;
