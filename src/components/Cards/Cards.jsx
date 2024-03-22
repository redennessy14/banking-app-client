import style from "../../styles/Cards.module.scss";
import VISA from "../../images/visa_white.png";

const Cards = ({
  cardType,
  cardholderName,
  cardNumber,
  expirationDate,
  balance,
}) => {
  const cardTypeClass = cardType.toLowerCase();
  const cardTypeName = `${style.creditCard} ${style[cardTypeClass]}`;
  return (
    <>
      <div className={cardTypeName}>
        <div className={style.cardLogo}>
          <img src={VISA} alt="" />
        </div>
        <div className={style.cardNumber}>{cardNumber}</div>
        <div className={style.cardExpiration}>{expirationDate}</div>
        <div className={style.balance}>${balance}</div>
        <div className={style.cardHolder}>{cardholderName}</div>
        <div className={style.cardType}>{cardType}</div>
      </div>
    </>
  );
};

export default Cards;
