import styles from "./styles.module.scss";

import { useContext, useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import { Container } from "../../../../components/Container";
import { GlobalStateContext } from "../../../../components/GlobalStateProvider";
import { transactionTypeMapper } from "../../../../constants";
import { TransactionDetail } from "../../../../components/TransactionDetail";
import { useNavigate } from "react-router-dom";
import { TransactionModal } from "../../../../components/TransactionDetailModal";
import { TransactionCard } from "../../../../components/TransactionCard/indes";

export const Transactions = ({ transactions = [] }) => {
  const navigate = useNavigate();
  const recentTransactions = transactions.slice(0, 5);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const handleTransactionClick = (transaction) => () => {
    setCurrentTransaction(transaction);
  };

  const handleCloseModal = () => {
    setCurrentTransaction(null);
  };

  const handleSeeAllButtonClick = () => {
    navigate("/transactions");
  };

  return (
    <>
      <TransactionModal
        currentTransaction={currentTransaction}
        onClose={handleCloseModal}
      />
      <Container as="section">
        <Typography variant="h4">Last transactions</Typography>
        <ul className={styles["transactions"]}>
          {recentTransactions.map((transaction, index) => (
            <TransactionCard
              key={index}
              transaction={transaction}
              onClick={handleTransactionClick(transaction)}
            />
          ))}
        </ul>
        <section className={styles["transactions__button"]}>
          <Button fullWidth onClick={handleSeeAllButtonClick}>
            See all
          </Button>
        </section>
      </Container>
    </>
  );
};
