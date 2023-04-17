import styles from "./style.module.scss";

import { useContext } from "react";
import { Avatar, Button, Typography } from "@mui/material";

import { GlobalStateContext } from "../../../../components/GlobalStateProvider";
import { walletTypeMap } from "../../../../constants";

const mock = {};

export const ChooseWallet = ({ handleNextStep, updatePayload }) => {
  const { userData, balance } = useContext(GlobalStateContext);

  const handleContactClick = (currency) => () => {
    updatePayload({ currency: currency });
    handleNextStep();
  };

  return (
    <div className={styles["choose-wallet"]}>
      <Typography variant="h4">Wallets</Typography>
      <Typography>Choose a wallet to send crypto</Typography>
      <ul className={styles["choose-wallet__list"]}>
        {Object.entries(balance).map(([currency, balance]) => (
          <WalletCard
            key={currency}
            currency={currency}
            balance={balance}
            onClick={handleContactClick(currency)}
          />
        ))}
      </ul>
    </div>
  );
};

const WalletCard = ({ currency, balance = 0, onClick }) => {
  const { name, logo } = walletTypeMap[currency];
  return (
    <Button
      className={styles["choose-wallet__wallet"]}
      disabled={balance === 0}
      onClick={onClick}
    >
      <img
        className={styles["choose-wallet__wallet__logo"]}
        src={logo}
        alt={`${name} logo`}
      />
      <section>
        <Typography>{name}</Typography>
        <div className={styles["choose-wallet__wallet__balance"]}>
          {balance.toFixed(6)}
        </div>
      </section>
    </Button>
  );
};
