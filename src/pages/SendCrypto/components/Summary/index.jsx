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
import { TransactionDetail } from "../../../../components/TransactionDetail";

export const Summary = ({ payload }) => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    message: "",
    type: "",
  });
  const [isSendingCrypto, setIsSendingCrypto] = useState(false);
  const { contacts, transactions, updateTransactions } =
    useContext(GlobalStateContext);

  const receiver = contacts.find(
    (contact) => contact.email === payload.receiver
  );

  const handleCloseAlert = () => {
    setOpenAlert(false);

    if (alertMessage.type === "success") {
      navigate("/");
    }
  };

  const handleSendButtonCLick = () => {
    setIsSendingCrypto(true);
    sendCrypto(payload)
      .then(({ data }) => {
        setAlertMessage({
          title: "Transaction sent",
          message: `Your transaction to ${receiver.name} was sent successfully`,
          type: "success",
        });

        updateTransactions([data, ...transactions]);
      })
      .catch(() => {
        setAlertMessage({
          title: "Ops! Something went wrong",
          message: "Your transaction couldn't be sent. Try again later",
          type: "error",
        });
      })
      .finally(() => {
        setOpenAlert(true);
        setIsSendingCrypto(false);
      });
  };
  return (
    <>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{alertMessage.title}</DialogTitle>
        <DialogContent>
          <DialogContentText
            // style={{ padding: 16 }}
            id="alert-dialog-description"
          >
            {alertMessage.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button name="Close" onClick={handleCloseAlert}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div className={styles["summary"]}>
        <Typography variant="h4">Summary</Typography>
        <Typography>Review before sending</Typography>

        <TransactionDetail transaction={payload} />

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
