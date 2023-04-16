import styles from "./styles.module.scss";
import { Avatar, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Container } from "../../../../components/container";
import { AuthContext } from "../../../../components/Auth";

export const Header = () => {
  const { userData } = useContext(AuthContext);
  return (
    <Container className={styles["header"]} as="header">
      <Avatar sx={{ width: 24, height: 24 }} />
      <Typography className={styles['header__title']} variant="body1">Hi, {userData.name}</Typography>
    </Container>
  );
};
