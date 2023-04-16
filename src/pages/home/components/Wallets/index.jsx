import { Container } from "../../../../components/container";
import styles from "./styles.module.scss";

import { Typography } from "@mui/material";

import btcLogo from "/btc.svg";
import ethLogo from "/eth.svg";
import dogeLogo from "/doge.svg";

const walletTypeMap = {
  ETH: {
    name: "Ethereum",
    logo: ethLogo,
  },
  DOGE: {
    name: "Dogecoin",
    logo: dogeLogo,
  },
  BTC: {
    name: "Bitcoin",
    logo: btcLogo,
  },
};

const Wallet = ({ type, balance = 0 }) => {
  const { name, logo } = walletTypeMap[type];
  return (
    <li className={styles["wallet"]}>
      <img className={styles["wallet__logo"]} src={logo} alt={`${name} logo`} />
      <div className={styles["wallet__balance"]}>{balance.toFixed(6)}</div>
      <Typography variant="caption">{name}</Typography>
    </li>
  );
};

export const Wallets = ({ balance }) => {
  return (
    <section>
      <Container>
        <Typography variant="h4">Wallets</Typography>
      </Container>
      <ul className={styles["wallets"]}>
        {Object.entries(balance).map(([type, balance]) => (
          <Wallet key={type} type={type} balance={balance} />
        ))}
      </ul>
    </section>
  );
};
