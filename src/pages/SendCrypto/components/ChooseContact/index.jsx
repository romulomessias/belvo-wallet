import styles from "./style.module.scss";

import { useContext } from "react";
import { Avatar, Button, Typography } from "@mui/material";

import { GlobalStateContext } from "../../../../components/GlobalStateProvider";

const mock = [
  { email: "pablo@belvo.com", name: "Pablo" },
  { email: "uri@belvo.com", name: "Uri" },
  { email: "maria@belvo.com", name: "Maria" },
  { email: "isabel@belvo.com", name: "Isa" },
];

export const ChooseContact = ({ handleNextStep, updatePayload }) => {
  const { userData, balance, contacts = mock } = useContext(GlobalStateContext);

  const handleContactClick = (contact) => () => {
    updatePayload({ receiver: contact.email });
    handleNextStep();
  };

  return (
    <div className={styles["choose-contacts"]}>
      <Typography variant="h4">Contacts</Typography>
      <Typography>Choose a contact to send crypto</Typography>
      <ul className={styles["choose-contacts__list"]}>
        {mock.map((contact) => (
          <ContactCard
            key={contact.email}
            contact={contact}
            onClick={handleContactClick(contact)}
          />
        ))}
      </ul>
    </div>
  );
};

const ContactCard = ({ contact, onClick }) => {
  return (
    <li>
      <Button
        data-contact={contact.name}
        className={styles["choose-contacts__contact"]}
        onClick={onClick}
        fullWidth
      >
        <Avatar>{contact.name[0]}</Avatar>
        <section>
          <Typography>{contact.name}</Typography>
          <Typography variant="caption">{contact.email}</Typography>
        </section>
      </Button>
    </li>
  );
};
