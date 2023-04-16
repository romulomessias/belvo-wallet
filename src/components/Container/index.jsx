import classNames from "classnames";
import { createElement } from "react";

import "./styles.scss";

export const Container = ({ as = "div", className, children, ...props }) => {
  const rootClass = classNames(className, "container");
  return createElement(as, { className: rootClass, ...props }, children);
};
