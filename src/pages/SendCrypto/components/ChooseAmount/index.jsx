import styles from "./styles.module.scss";

import { Button, FormHelperText, TextField, Typography } from "@mui/material";
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
        <section>
          <TextField
            label="Amount"
            name="Amount"
            id="amount"
            type="number"
            size="small"
            placeholder="0.001"
            error={!isAmountValid}
            value={payload.amount}
            inputProps={{
              type: "number",
            }}
            onChange={handleAmountChange}
          />
          <FormHelperText error={true}  id="component-error-text" aria-label="amount input error massage">
            {!isAmountValid ? "The value is greater than your balance" : " "}
          </FormHelperText>
        </section>
        <TextField
          label="Description"
          name="Description"
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
