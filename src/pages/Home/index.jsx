import styles from "./styles.module.scss";
import { Container } from "../../components/Container";
import { useContext, useEffect, useState } from "react";
import { getContacts, getWallet } from "../../services";
import { Button, CircularProgress } from "@mui/material";
import { Wallets } from "./components/Wallets";
import { AuthProvider } from "../../components/Auth";
import { Transactions } from "./components/Transactions";
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from "../../components/GlobalStateProvider";
import { Header } from "../../components/Header";

const HomeBase = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const {
    userData,
    balance,
    transactions,
    updateUserData,
    updateBalance,
    updateTransactions,
    updateContacts,
  } = useContext(GlobalStateContext);
  console.log(userData);

  const handleSentCryptoClick = () => {
    navigate("/send-crypto");
  };

  useEffect(() => {
    setIsLoading(true);

    Promise.all([getWallet(), getContacts()])
      .then((responses) => {
        console.log(responses);
        const [summary, contacts] = responses;
        updateUserData({
          ...userData,
          email: summary.email,
        });
        updateBalance(summary.balance);
        updateTransactions(summary.transactions.reverse());
        updateContacts(contacts);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <article className={styles["home"]}>
      {isLoading && (
        <Container className={styles["home__loader"]}>
          <CircularProgress />
        </Container>
      )}
      {!isLoading && (
        <>
          <Header />
          <Wallets balance={balance} />
          <Transactions transactions={transactions} />
          <Container as="section" className={styles["home__footer"]}>
            <Button
              className="button"
              name="Send crypto"
              disableElevation
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSentCryptoClick}
            >
              Send crypto
            </Button>
          </Container>
        </>
      )}
    </article>
  );
};

export const Home = () => (
  <AuthProvider>
    <HomeBase />
  </AuthProvider>
);
