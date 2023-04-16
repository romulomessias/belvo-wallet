import styles from "./styles.module.scss";
import { Avatar, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Container } from "../../../../components/container";

export const Header = () => {
  return (
    <Container className={styles["root"]} as="header">
      <Avatar sx={{ width: 24, height: 24 }} />
      <Typography variant="body1">Hi, Vicky</Typography>
      {styles["root"]}
    </Container>
  );
};
