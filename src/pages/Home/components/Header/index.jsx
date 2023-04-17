import styles from "./styles.module.scss";
import { Avatar, Typography } from "@mui/material";
import { useContext } from "react";

import { Container } from "../../../../components/container";
import { GlobalStateContext } from "../../../../components/GlobalStateProvider";

export const Header = () => {
  const { userData } = useContext(GlobalStateContext);
  return (
    <Container className={styles["header"]} as="header">
      <Avatar sx={{ width: 24, height: 24 }} />
      <Typography className={styles["header__title"]} variant="body1">
        Hi, {userData.name}
      </Typography>
    </Container>
  );
};
