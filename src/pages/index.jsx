import { createBrowserRouter } from "react-router-dom";
import { Home } from "./home";
import { Login } from "./login";
import { SendCrypto } from "./SendCrypto";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "send-crypto",
    element: <SendCrypto />,
  },
]);
