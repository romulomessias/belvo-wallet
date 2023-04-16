import styles from "./style.module.scss";

export const PageContainer = ({ children, ...props }) => {
  return (
    <article {...props} className={styles["root"]}>
      {children}
    </article>
  );
};
