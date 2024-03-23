import React, { useState } from "react";
import style from "../../styles/CardPage.module.scss";
import { useSelector } from "react-redux";

import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const CardPage = () => {
  const [selectedCard, setSelectedCard] = useState("");
  const userData = useSelector((state) => state.auth.data);
  const navigate = useNavigate();

  const handleCardChange = (event) => {
    setSelectedCard(event.target.value);
  };

  const handleCreate = async () => {
    try {
      const values = {
        cardType: selectedCard,
        cardholderName: userData.fullName,
        userId: userData._id,
        avatarUrl: userData.avatarUrl,
      };
      const { data } = await axios.post("/cards", values);
      navigate("/");
      alert(`Карточка ${selectedCard} успешно создана `);
      return data;
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className={style.container}>
        <h2>Выберите тип карточки:</h2>
        <label className={`${style.cardButton}`}>
          <input
            type="radio"
            value="Platinum"
            checked={selectedCard === "Platinum"}
            onChange={handleCardChange}
          />
          Platinum
        </label>
        <label className={`${style.cardButton} ${style.gold}`}>
          <input
            type="radio"
            value="Gold"
            checked={selectedCard === "Gold"}
            onChange={handleCardChange}
          />
          Gold
        </label>
        <label className={`${style.cardButton} ${style.standard}`}>
          <input
            type="radio"
            value="Standard"
            checked={selectedCard === "Standard"}
            onChange={handleCardChange}
          />
          Standard
        </label>
        {selectedCard && <p>Выбранная карточка: {selectedCard}</p>}
        <button onClick={handleCreate} className={style.cardButton}>
          Создать кредитную карту
        </button>
      </div>
    </>
  );
};

export default CardPage;
