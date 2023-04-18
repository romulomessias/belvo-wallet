import { Paper, Typography } from "@mui/material";
import styles from "./styles.module.scss";

import { useContext } from "react";
import { GlobalStateContext } from "../GlobalStateProvider";

export const TransactionDetail = ({ transaction }) => {
  const { userData, contacts } = useContext(GlobalStateContext);

  const getContactData = (email) => {
    if (!email) return null;

    if (email === userData.email) return userData;

    return contacts.find((contact) => contact.email === transaction.receiver);
  };

  const receiver = getContactData(transaction.receiver);
  const sender = getContactData(transaction?.sender);

  return (
    <Paper className={styles["transaction-detail"]} variant="outlined">
      {sender && (
        <section className={styles["transaction-detail__field"]}>
          <Typography variant="caption">Sender</Typography>
          <Typography data-receiver>{sender && sender.name}</Typography>
          <Typography>{transaction.sender}</Typography>
        </section>
      )}
      <section className={styles["transaction-detail__field"]}>
        <Typography variant="caption">Receiver</Typography>
        <Typography data-receiver>{receiver && receiver.name}</Typography>
        <Typography>{transaction.receiver}</Typography>
      </section>
      <section className={styles["transaction-detail__field"]}>
        <Typography variant="caption">Amount</Typography>
        <Typography data-amount>
          {transaction.amount} {transaction.currency}
        </Typography>
      </section>
      {transaction.description !== "" && (
        <section className={styles["transaction-detail__description"]}>
          <Typography variant="caption">Description</Typography>
          <Typography data-description>{transaction.description}</Typography>
        </section>
      )}
    </Paper>
  );
};
