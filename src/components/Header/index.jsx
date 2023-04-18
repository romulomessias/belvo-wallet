import styles from "./styles.module.scss";
import { Avatar, Button, Typography } from "@mui/material";
import { useContext } from "react";

import { Container } from "../Container";
import { GlobalStateContext } from "../GlobalStateProvider";
import { useNavigate } from "react-router-dom";

export const Header = ({ showBackButton = false }) => {
  const { userData } = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <Container className={styles["header"]} as="header">
      {showBackButton && (
        <Button
          className="button"
          variant="outlined"
          onClick={handleBackButtonClick}
        >
          Back
        </Button>
      )}
      <Avatar sx={{ width: 24, height: 24 }} />
      <Typography
        aria-label="greeting user"
        className={styles["header__title"]}
        variant="body1"
      >
        {`Hi, ${userData.name}`}
      </Typography>
    </Container>
  );
};
