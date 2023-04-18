import styles from "./style.module.scss";

import { Container } from "../../components/Container";
import { AuthProvider } from "../../components/Auth";
import { GlobalStateContext } from "../../components/GlobalStateProvider";
import { useContext, useState } from "react";

import { Box, Button, MobileStepper, Paper, Typography } from "@mui/material";
import { ChooseContact } from "./components/ChooseContact";
import { ChooseWallet } from "./components/ChooseWallet";
import { ChooseAmount } from "./components/ChooseAmount";
import { Summary } from "./components/Summary";

const steps = [ChooseContact, ChooseWallet, ChooseAmount, Summary];

const SendCryptoBase = () => {
  const {} = useContext(GlobalStateContext);
  const [sendCryptoPayload, setSendCryptoPayload] = useState({
    amount: 0,
    currency: "ETH",
    description: "",
    receiver: "",
  });
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;
  const Component = steps[activeStep];

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handlePreviousStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updatePayload = (payload) => {
    setSendCryptoPayload({
      ...sendCryptoPayload,
      ...payload,
    });
  };

  return (
    <AuthProvider>
      <Container className={styles["contacts"]}>
        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={<div />}
          backButton={
            <Button
              variant="outlined"
              size="small"
              onClick={handlePreviousStep}
              disabled={activeStep === 0}
            >
              Back
            </Button>
          }
        />
        <Component
          handleNextStep={handleNextStep}
          updatePayload={updatePayload}
          payload={sendCryptoPayload}
        />
      </Container>
    </AuthProvider>
  );
};

export const SendCrypto = SendCryptoBase;
