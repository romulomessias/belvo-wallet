import styles from "./styles.module.scss";

import { useContext } from "react";
import { Chip, Typography } from "@mui/material";

import arrowUp from "/arrow-up.svg";
import arrowDown from "/arrow-down.svg";

import { Container } from "../../../../components/Container";
import { GlobalStateContext } from "../../../../components/GlobalStateProvider";

export const Transactions = ({ transactions = [] }) => {
  const recentTransactions = transactions.slice(0, 5);

  return (
    <Container as="section">
      <Typography variant="h4">Last transactions</Typography>
      <ul className={styles["transactions"]}>
        {recentTransactions.map((transaction, index) => (
          <Transaction key={index} transaction={transaction} />
        ))}
      </ul>
    </Container>
  );
};

const transactionTypeMapper = {
  sent: {
    icon: arrowUp,
    responsible: "receiver",
    description: "Sent",
  },
  received: {
    icon: arrowDown,
    responsible: "sender",
    description: "Received",
  },
};

const Transaction = ({ transaction }) => {
  const { userData, contacts = [] } = useContext(GlobalStateContext);

  const transactionType =
    userData.email === transaction.sender ? "sent" : "received";

  const { icon, responsible, description } =
    transactionTypeMapper[transactionType];

  const contact = contacts.find(
    (contact) => contact.email === transaction[responsible]
  );

  return (
    <li className={styles["transaction"]}>
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
