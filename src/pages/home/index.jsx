import styles from "./styles.module.scss";
import { Header } from "./components/Header";
import { Container } from "../../components/container";
import { useContext, useEffect, useState } from "react";
import { getWallet } from "../../services";
import { CircularProgress } from "@mui/material";
import { Wallets } from "./components/Wallets";
import { AuthProvider, AuthContext } from "../../components/Auth";
import { Transactions } from "./components/Transactions";

const HomeBase = () => {
  const [walletData, setWalletData] = useState();
  const { userData, updateUserData } = useContext(AuthContext);

  useEffect(() => {
    getWallet()
      .then((data) => {
        setWalletData(data);
        updateUserData({
          ...userData,
          email: data.email,
        });
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {!walletData && (
        <Container className={styles["root__loader"]}>
          <CircularProgress />
        </Container>
      )}
      {walletData && (
        <>
          <Header />
          <Wallets balance={walletData.balance} />
          <Transactions transactions={walletData.transactions} />
        </>
      )}
    </>
  );
};

export const Home = () => (
  <AuthProvider>
    <HomeBase />
  </AuthProvider>
);
