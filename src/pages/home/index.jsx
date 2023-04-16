import styles from "./styles.module.scss";
import { Header } from "./components/Header";
import { Container } from "../../components/container";
import { useEffect, useState } from "react";
import { getWallet } from "../../services";
import { CircularProgress } from "@mui/material";
import { Wallets } from "./components/Wallets";
import { Auth } from "../../components/Auth";

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

  return (
    <Auth>
      {!walletData && (
        <Container className={styles["root__loader"]}>
          <CircularProgress />
        </Container>
      )}
      {walletData && (
        <>
          <Header />
          <Wallets balance={walletData.balance} />
        </>
      )}
    </Auth>
  );
};
