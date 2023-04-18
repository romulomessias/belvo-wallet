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

export const Transactions = ({ transactions = [] }) => {
  const recentTransactions = transactions.slice(0, 5);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const handleTransactionClick = (transaction) => () => {
    setCurrentTransaction(transaction);
  };

  const handleCloseAlert = () => {
    setCurrentTransaction(null);
  };

  return (
    <>
      <Dialog
        fullScreen
        open={currentTransaction !== null}
        onClose={handleCloseAlert}
      >
        <DialogTitle id="alert-dialog-title">
          <Container className={styles["transactions__modal"]}>
            <Typography variant="h4">Transaction</Typography>
            <Button name="Close" onClick={handleCloseAlert}>
              Close
            </Button>
          </Container>
        </DialogTitle>
        <DialogContent>
          <Container>
            {currentTransaction && (
              <TransactionDetail transaction={currentTransaction} />
            )}
          </Container>
        </DialogContent>
      </Dialog>
      <Container as="section">
        <Typography variant="h4">Last transactions</Typography>
        <ul className={styles["transactions"]}>
          {recentTransactions.map((transaction, index) => (
            <Transaction
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

const Transaction = ({ transaction, onClick }) => {
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
