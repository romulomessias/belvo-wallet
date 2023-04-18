import styles from './styles.module.scss';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Container } from "../Container";
import { TransactionDetail } from '../TransactionDetail';

export const TransactionModal = ({ currentTransaction, onClose }) => {
  return (
    <Dialog
      fullScreen
      open={currentTransaction !== null}
      onClose={onClose}
    >
      <DialogTitle sx={{ pl: 0, pr: 0 }} id="alert-dialog-title">
        <Container className={styles["modal__header"]}>
          <Typography variant="h4">Transaction</Typography>
          <Button
            variant="outlined"
            className="button"
            name="Close"
            onClick={onClose}
          >
            Close
          </Button>
        </Container>
      </DialogTitle>
      <DialogContent sx={{ pl: 0, pr: 0 }}>
        <Container>
          {currentTransaction && (
            <TransactionDetail transaction={currentTransaction} />
          )}
        </Container>
      </DialogContent>
    </Dialog>
  );
};
