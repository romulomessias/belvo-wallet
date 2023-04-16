import styles from "./styles.module.scss";

export const Button = ({ children, ...props }) => (
  <button {...props} className={styles["root"]}>
    {children}
  </button>
);
