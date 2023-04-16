import styles from "./styles.module.scss";
import { Header } from "./components/Header";
import { Container } from "../../components/container";
import { useEffect, useState } from "react";
import { getWallet } from "../../services";
import { CircularProgress } from "@mui/material";
import { Wallets } from "./components/Wallets";

export const Home = () => {
  const [walletData, setWalletData] = useState();

  useEffect(() => {
    getWallet()
      .then((data) => {
        console.log(data);
        setWalletData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!walletData) {
    return (
      <Container className={styles["root__loader"]}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Wallets balance={walletData.balance} />
    </>
  );
};
