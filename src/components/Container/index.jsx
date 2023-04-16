import classNames from "classnames";
import { createElement } from "react";

import styles from "./styles.module.scss";

export const Container = ({ as = "div", className, children, ...props }) => {
  const rootClass = classNames(className, styles["container"]);
  return createElement(as, { className: rootClass, ...props }, children);
};
