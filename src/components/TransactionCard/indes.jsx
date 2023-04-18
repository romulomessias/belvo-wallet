import styles from "./styles.module.scss";

import { useContext } from "react";
import { GlobalStateContext } from "../GlobalStateProvider";
import { transactionTypeMapper } from "../../constants";
import { Chip, Typography } from "@mui/material";

export const TransactionCard = ({ transaction, onClick }) => {
  const { userData, contacts = [] } = useContext(GlobalStateContext);

  const transactionType =
    userData.email === transaction.sender ? "sent" : "received";

  const { icon, responsible, description } =
    transactionTypeMapper[transactionType];

  const contact = contacts.find(
    (contact) => contact.email === transaction[responsible]
  );

  return (
    <li className={styles["transaction"]} onClick={onClick}>
      <img className={styles["transaction__icon"]} src={icon} />
      <section>
        <Typography variant="body">
          {contact ? contact.name : transaction[responsible]}
        </Typography>
        <Typography>
          {description} {transaction.amount} {transaction.currency}
        </Typography>
      </section>
      <Chip label={transaction.status} size="small" />
    </li>
  );
};
