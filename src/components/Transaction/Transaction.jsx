import React from "react";
import style from "../../styles/Transaction.module.scss";
import { useSelector } from "react-redux";

const Transaction = ({
  senderName,
  recipientName,
  amount,
  date,
  senderAvatar,
  recipientAvatar,
}) => {
  const userData = useSelector((state) => state.auth.data);
  const isRecipient = userData && userData.fullName === recipientName;
  const sign = isRecipient ? "+" : "-";

  const formattedDate = new Date(date);

  const dateString = formattedDate.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const timeString = formattedDate.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      className={`${style.transaction} ${
        isRecipient ? style.recipient : style.sender
      }`}
    >
      {" "}
      {isRecipient ? (
        <>
          <img className={style.avatar} src={senderAvatar} alt="" />
          <p className={style.senderName}> {senderName}</p>
        </>
      ) : (
        ""
      )}
      {!isRecipient ? (
        <>
          {" "}
          <img className={style.avatar} src={recipientAvatar} alt="" />
          <p className={style.recipientName}>{recipientName}</p>
        </>
      ) : (
        ""
      )}
      <p className={style.amount}>
        {sign}${amount}
      </p>
      {/* <p className={style.dateString}> {dateString}</p>
      <p className={style.timeString}>{timeString}</p> */}
    </div>
  );
};

export default Transaction;
