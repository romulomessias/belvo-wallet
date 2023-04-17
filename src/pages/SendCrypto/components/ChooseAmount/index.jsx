import styles from "./styles.module.scss";

import { Button, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { GlobalStateContext } from "../../../../components/GlobalStateProvider";
import { walletTypeMap } from "../../../../constants";

export const ChooseAmount = ({
  payload = {},
  updatePayload,
  handleNextStep,
}) => {
  const { balance } = useContext(GlobalStateContext);
  const { currency } = payload;

  const isAmountValid = payload.amount <= balance[currency];

  const handleAmountChange = (e) => {
    const amount = e.target.valueAsNumber;
    updatePayload({ amount });
  };

  const handleDescriptionChange = (e) => {
    const description = e.target.value;
    updatePayload({ description });
  };

  const handleFormsSubmit = (event) => {
    event.preventDefault();
    handleNextStep();
  };

  return (
    <div className={styles["choose-amount"]}>
      <Typography variant="h4">
        How many {walletTypeMap[payload.currency].name}
      </Typography>
      <Typography>
        You have{" "}
        <strong>
          {balance[currency].toFixed(6)} {payload.currency}
        </strong>{" "}
        in your balance
      </Typography>
      <form
        onSubmit={handleFormsSubmit}
        className={styles["choose-amount__form"]}
      >
        <TextField
          label="Amount"
          type="number"
          size="small"
          placeholder="0.001"
          error={!isAmountValid}
          helperText={
            !isAmountValid ? "The value is greater than your balance" : " "
          }
          value={payload.amount}
          inputProps={{
            type: "number",
          }}
          onChange={handleAmountChange}
        />

        <TextField
          label="Description"
          placeholder="Write some message"
          size="small"
          multiline
          rows={4}
          value={payload.description}
          onChange={handleDescriptionChange}
        />
        <Button
          type="submit"
          disableElevation
          disabled={!isAmountValid || payload.amount === 0}
          variant="contained"
        >
          Next
        </Button>
      </form>
    </div>
  );
};
