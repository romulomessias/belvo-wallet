import styles from "./style.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, MobileStepper } from "@mui/material";

import { Container } from "../../components/Container";
import { AuthProvider } from "../../components/Auth";
import { ChooseContact } from "./components/ChooseContact";
import { ChooseWallet } from "./components/ChooseWallet";
import { ChooseAmount } from "./components/ChooseAmount";
import { Summary } from "./components/Summary";

const steps = [ChooseContact, ChooseWallet, ChooseAmount, Summary];

const SendCryptoBase = () => {
  const navigate = useNavigate();
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
    if (activeStep === 0) {
      navigate(-1);
      return;
    }

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
              className="button"
              variant="outlined"
              size="small"
              onClick={handlePreviousStep}
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
