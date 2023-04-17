import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";
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
