import styles from "./styles.module.scss";

import { useContext, useState } from "react";
import { Typography } from "@mui/material";
import { GlobalStateContext } from "../../components/GlobalStateProvider";
import { Container } from "../../components/Container";
import { TransactionModal } from "../../components/TransactionDetailModal";
import { TransactionCard } from "../../components/TransactionCard/indes";
import { Header } from "../../components/Header";

export const TransactionsPage = () => {
  const { transactions } = useContext(GlobalStateContext);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const handleTransactionClick = (transaction) => () => {
    setCurrentTransaction(transaction);
  };

  const handleCloseModal = () => {
    setCurrentTransaction(null);
  };

  return (
    <>
      <TransactionModal
        currentTransaction={currentTransaction}
        onClose={handleCloseModal}
      />
      <Header showBackButton />
      <Container as="section" className={styles["transactions__container"]}>
        <Typography variant="h4" className={styles["transactions__title"]}>
          Transactions
        </Typography>
        <ul className={styles["transactions"]}>
          {transactions.map((transaction, index) => (
            <TransactionCard
              key={index}
              transaction={transaction}
              onClick={handleTransactionClick(transaction)}
            />
          ))}
        </ul>
      </Container>
    </>
  );
};
