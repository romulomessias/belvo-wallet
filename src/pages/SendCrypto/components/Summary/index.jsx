import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import styles from "./styles.module.scss";
import { GlobalStateContext } from "../../../../components/GlobalStateProvider";
import { useContext, useState } from "react";
import { sendCrypto } from "../../../../services";
import { useNavigate } from "react-router-dom";

export const Summary = ({ payload }) => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [isSendingCrypto, setIsSendingCrypto] = useState(false);
  const { contacts, transactions, updateTransactions } =
    useContext(GlobalStateContext);

  const receiver = contacts.find(
    (contact) => contact.email === payload.receiver
  );

  const handleCloseAlert = () => {
    setOpenAlert(false);
    navigate("/");
  };

  const handleSendButtonCLick = () => {
    setIsSendingCrypto(true);
    sendCrypto(payload)
      .then(({ data }) => {
        setOpenAlert(true);
        updateTransactions([data, ...transactions]);
      })
      .then(console.error)
      .finally(() => setIsSendingCrypto(false));
  };
  return (
    <>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Crypto sucessfully sent!
        </DialogTitle>

        <DialogActions>
          <Button name="Close" onClick={handleCloseAlert}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div className={styles["summary"]}>
        <Typography variant="h4">Summary</Typography>
        <Typography>Review before sending</Typography>

        <Paper className={styles["summary__resume"]} variant="outlined">
          <section className={styles["summary__resume__field"]}>
            <Typography variant="caption">Receiver</Typography>
            <Typography data-receiver>{receiver && receiver.name}</Typography>
            <Typography>{payload.receiver}</Typography>
          </section>
          <section className={styles["summary__resume__field"]}>
            <Typography variant="caption">Amount</Typography>
            <Typography data-amount>
              {payload.amount} {payload.currency}
            </Typography>
          </section>
          {payload.description !== "" && (
            <section className={styles["summary__resume__field"]}>
              <Typography variant="caption">Description</Typography>
              <Typography data-description>{payload.description}</Typography>
            </section>
          )}
        </Paper>

        <Button
          className="button"
          name="Send"
          variant="contained"
          disableElevation
          onClick={handleSendButtonCLick}
          disabled={isSendingCrypto}
        >
          Send
        </Button>
      </div>
    </>
  );
};
